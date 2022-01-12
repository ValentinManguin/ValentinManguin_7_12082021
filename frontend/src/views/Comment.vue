<template>
  <div>
    <nav>
      <img class="img1" src="../assets/icon-left-font-monochrome-black.png" alt="" />

      <h2>
        <router-link class="redirection-comment" to="/home"> Home </router-link>
      </h2>
    </nav>
    <div class="répondre"><h1>Répondre à un post !</h1></div>
    <div class="container-site-comm">
      <div class="affichage">
        <div class="affichage2" v-for="post in posts" :key="post.id">
          <h3>{{ post.User.username }} :</h3>
          {{ post.content }}
        </div>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          placeholder="Vous pouvez écrire ici."
          v-model="content"
          required
        ></textarea>
        <button class="envoyer" v-on:click="createComment">Envoyer</button>

        <div v-for="comment in comments" :key="comment.id" class="comment">
          <h3>{{ comment.User.username }} :</h3>
          {{ comment.content }}
          <button
            v-on:click="deleteComment(comment.id)"
            v-if="isAdmin == 'true' || userId == comment.UserId"
            class="suppr"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <footer class="commfoot">
      <img
        class="imgfooter"
        src="../assets/icon-left-font-monochrome-black.png"
        alt=""
      />
    </footer>
  </div>
</template>



<script>
const axios = require("axios");

export default {
  name: "Comment",

  data() {
    return {
      posts: [],
      comments: [],
      content: "",
      isAdmin: "false",
      userId: 0,
    };
  },
  methods: {
    getCommentsByPost() {
      axios
        .get("http://localhost:3000/api/comment/" + this.$route.params.postid)
        .then((response) => {
          console.log("comment", response.data);
          this.comments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createComment() {
      axios
        .post(
          "http://localhost:3000/api/comment/" + this.$route.params.postid,
          { content: this.content }
        )
        .then(() => {
          this.content = "";
          this.getCommentsByPost();
          alert("Commentaire publié");
        })
        .catch((error) => {
          console.log(error);
           alert("Message trop long (255 caractères maximum)");
        });
    },

    deleteComment(commentId) {
      axios
        .delete("http://localhost:3000/api/comment/" + commentId)
        .then((response) => {
          console.log(response);
          this.getCommentsByPost();
          alert("Commentaire supprimé");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOnePost() {
      axios
        .get("http://localhost:3000/api/post/" + this.$route.params.postid)
        .then((response) => {
          console.log("comment", response.data);
          this.posts = [response.data];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    this.userId = localStorage.getItem("userId");
    this.getCommentsByPost();
    this.getOnePost();
  },
};
</script>


<style>
body {
  background-color: whitesmoke;
}

img {
  height: 350px;
}

.redirection-comment {
  text-decoration: none;
}
.répondre {
  display: flex;
  flex-flow: column;
  align-items: center;
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

.affichage2 {
  display: contents;
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

button {
  margin: auto;
  border-radius: 0.5rem;
  border: 3px solid black;
  background-color: white;
}

.container-site-comm {
  margin-top: 100px;
}

.affichage {
  border: solid;
  border-radius: 3px;
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 1500px;
  background-color: white;
  margin-bottom: 60px;
}

.comment {
  border: solid;
  border-radius: 3px;
  margin-bottom: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 1000px;
  margin-top: 25px;
}

textarea {
  border-radius: 0.5rem;
  border: solid;
  width: 40%;
  height: 70px;
  margin-bottom: 10px;
  margin-top: 20px;
}

.envoyer {
  margin: 15px;
}

.suppr {
  margin: 15px;
}
.commfoot {
  background-color: lightgrey;
  margin-top: 400px;
}

.imgfooter {
  height: 200px;
}


@media screen and (max-width: 1700px) {

.affichage{
  width: 75%;
}

}

@media screen and (max-width: 1024px) {

 .img1 {
  width: 40%;
}
nav {
  width: 101%;
}

  h1 {
  width: 30%;
}

.affichage{
  width: 105%;
}
.comment {
  width: 90%;
}

 footer {
   width: 105%;
 }
}

@media screen and (max-width: 768px) {

  body {
    width: 98%;
  }
nav {
  width: 97%;
}


  .affichage {
    width: 103%;
  }

  h1 {
  width: 43%;
}
.img1 {
  width: 50%;
}

.img2 {
  width: 88%;
}
.comment {
  width: 90%;
}
footer {
   width: 105%;
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
.comment {
  width: 90%;
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
  width: 75%;
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
.comment {
  width: 90%;
}

}
@media screen and (max-width: 320px) {

body {
  margin-left: 5px;
}
  nav {
  width: 83%;
}
.img1 {
  display: none;
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
.comment {
  width: 90%;
}

}



</style>