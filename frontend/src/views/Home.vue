<template>
  <div class="home">
    <nav>
      <img src="../assets/icon-left-font.svg" alt="" />
      <button>
        <h3>
          <router-link class="redirection-home" to="/profil">
            Profil
          </router-link>
        </h3>
      </button>
      <button v-on:click="disconnect"><h3>Se déconnecter</h3></button>
    </nav>
    <div class="container site">
      <div class="message">
        <h2>Exprimez-vous !</h2>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          v-model="content"
          required
        ></textarea>
        <button v-on:click="createPost">Envoyer</button>
      </div>
      <div v-if="this.isAdmin == 'true'">je suis admin</div>
      <div v-for="post in posts" :key="post.id" class="affichage">
      <h3>  {{ post.User.username }} :  </h3>  
        {{ post.content }}
        <button v-on:click="deletePost(post.id)" v-if="isAdmin == 'true' || userId==post.UserId">Supprimer</button>
    <router-link :to="'/comment/'+ post.id">   Commenter cette publication</router-link> 
      </div>
    </div>
  </div>
</template>








<script>
import router from "../router";
const axios = require("axios");

export default {
  name: "Home",

  data() {
    return {
      posts: [],
      content: "",
      isAdmin: "false",
      userId: 0,
    };
  },
  methods: {
    getAllPost() {
      axios
        .get("http://localhost:3000/api/post")
        .then((response) => {
          console.log("post", response.data);
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createPost() {
      axios
        .post("http://localhost:3000/api/post", { content: this.content })
        .then(() => {
          this.content = "";
          this.getAllPost();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePost(postId) {
      axios
        .delete("http://localhost:3000/api/post/" + postId )
        .then((response) => {
          console.log(response);
          this.getAllPost();
          alert("Post supprimé");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    disconnect() {
      localStorage.clear();
      router.push({ path: "Login" });
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.disconnect();
      return;
    }
    console.log("coucou home");
    this.isAdmin = localStorage.getItem("isAdmin");
    this.userId = localStorage.getItem("userId");
    this.getAllPost();
  },
};
</script>









<style>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -210px;
  padding: 0 25px;
}

img {
  height: 350px;
}

textarea {
  border-radius: 0.5rem;
  border: solid;
  width: 40%;
  height: 70px;
}

.message {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 50px;
}

button {
  margin: auto;
  border-radius: 0.5rem;
  border: 3px solid black;
  background-color: white;
}

.affichage {
  border: solid;
  border-radius: 3px;
  margin-bottom: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;

}
</style>


