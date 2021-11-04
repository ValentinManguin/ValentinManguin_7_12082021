<template>
  <div class="home">
    <nav>
      <img src="../assets/icon-left-font.svg" alt="" />
      <p>
        <router-link class="redirection-home" to="/profil">
          Profil
        </router-link>
      </p>
      <p>Se déconnecter</p>
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

      <div v-for="post in posts" :key="post.id" class="affichage">
        {{ post.content }}
      </div>
    </div>
  </div>
</template>








<script>
const axios = require("axios");

export default {
  name: "Home",

  data() {
    return {
      posts: [],
      content: "",
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("coucou home");
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
    margin-bottom: 15px;
}
</style>


