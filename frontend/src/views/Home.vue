<template>
  <div class="home">
    <nav>
      <img class="img1" src="../assets/icon-left-font-monochrome-black.png" alt="" />
      <button class="profil-button">
        <h2>
          <router-link class="redirection-home" to="/profil">
            Profil
          </router-link>
        </h2>
      </button>
      <button class="discon" v-on:click="disconnect">
        <h2>Se déconnecter</h2>
      </button>
    </nav>
    <div class="container-site">
      <div class="message">
        <h1>Exprimez-vous !</h1>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          placeholder="Vous pouvez écrire ici."
          v-model="content"
          required
        ></textarea>
        <input type="file" accept="image/*" @change="imageChoisi" />
        <button class="envoyer" v-on:click="createPost">Envoyer</button>
      </div>

      <div v-for="post in posts" :key="post.id" class="affichage">
        <h3>{{ post.User.username }}  :</h3>
        {{ post.content }}
        <img class="img2" v-if="post.imageUrl" :src="post.imageUrl" alt="" />
        <button
          v-on:click="deletePost(post.id)"
          v-if="isAdmin == 'true' || userId == post.UserId"
          class="suppr"
        >
          Supprimer
        </button>
        <router-link class="redirection-comment" :to="'/comment/' + post.id">
          Commenter cette publication</router-link
        >
      </div>
    </div>
    <footer>
<img class="imgfooter" src="../assets/icon-left-font-monochrome-black.png" alt="" />

    </footer>
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
      imageFile: "",
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
      let data = new FormData();
      data.append("content", this.content);
      data.append("inputFile", this.imageFile);
      axios
        .post("http://localhost:3000/api/post", data)
        .then(() => {
          this.content = "";
          this.getAllPost();
          alert("Message publié");
        })
        
        .catch((error) => {
          console.log(error);
          alert("Message trop long (255 caractères maximum)");
        });
    },

    deletePost(postId) {
      axios
        .delete("http://localhost:3000/api/post/" + postId)
        .then((response) => {
          console.log(response);
          this.getAllPost();
          alert("Post supprimé");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    imageChoisi(event) {
      this.imageFile = event.target.files[0];
    },

    disconnect() {
      localStorage.clear();
      alert("Vous êtes déconnecté");
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

body {
  background-color: whitesmoke;
}


nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -68px;
  height: 100px;
  padding: 0 25px;
  background-color: lightgrey;
}

img {
  height: 350px;
}

.redirection-home {
  text-decoration: none;
}


.container-site {
  background-color: whitesmoke;
}

.redirection-comment {
  text-decoration: none;
  border-radius: 0.5 rem;
  border: solid 3 px black;
}

textarea {
  border-radius: 0.5rem;
  border: solid;
  width: 40%;
  height: 70px;
  margin-bottom: 10px;
  margin-top: 20px;
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
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 1500px;
  margin-bottom: 60px;
  background-color: white;
}


h1 {
  background-color: linen;
  width: 20%;
  border: solid antiquewhite;
}

h3 {
  border-radius: 1.5rem;
  margin-bottom: 30px;
  width: 150px;
  background-color: lightgrey;
}

.envoyer {
  margin: 15px;
}

.suppr {
  margin: 15px;
}

footer {
  background-color: lightgrey;
  margin-top: 150px;
}

.imgfooter {
  height: 200px;
}


@media screen and (max-width: 1700px) {

.affichage{
  width: 80%;
}

}

@media screen and (max-width: 1024px) {

 .img1 {
  width: 40%;
}


  h1 {
  width: 30%;
}

 
}

@media screen and (max-width: 768px) {

  body {
    width: 98%;
  }



  .affichage {
    width: 84%;
  }

  h1 {
  width: 40%;
}
.img1 {
  width: 50%;
}

.img2 {
  width: 88%;
}

}

@media screen and (max-width: 425px) {

nav {
  width: 86%;
}
img {
  width: 50%;
}
.affichage {
  width: 96%;
}

h1 {
  width: 60%;
}
.img2 {
  width: 90%;
}
.img1 {
  display: none;
}

footer {
  width: 98%;
}

}
@media screen and (max-width: 375px) {

body {
  margin-left: 11px;
}

nav {
  width: 84%;
}
.img1 {
  display: none;
}
.affichage {
  width: 96%;
}
.img2 {
  width: 88%;
}

h1 {
  width: 60%;
}

footer {
  width: 98%;
}


}
@media screen and (max-width: 320px) {

body {
  margin-left: 5px;
}
  nav {
  width: 83%;
}
img {
  width: 50%;
}
.affichage {
  width: 96%;
}

h1 {
  width: 79%;
  
}

.profil-button {
  width: 50%;
}

.discon {
  margin-left: 23px;
}

footer {
  width: 99%;
}


}




</style>


