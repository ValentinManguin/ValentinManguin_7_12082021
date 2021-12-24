<template>
  <div>
    <nav>
      <img src="../assets/icon-left-font.svg" alt="" />
      <h2>
        <router-link class="redirection-comment" to="/home"> Home </router-link>
      </h2>
    </nav>

    <div class="affichage">
      <div v-for="post in posts" :key="post.id">
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
      <button v-on:click="createComment">Envoyer</button>

      <div v-for="comment in comments" :key="comment.id" class="comment">
        <h3>{{ comment.User.username }} :</h3>
        {{ comment.content }}
        <button
          v-on:click="deleteComment(comment.id)"
          v-if="isAdmin == 'true' || userId == comment.UserId"
        >
          Supprimer
        </button>
      </div>
    </div>
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
        })
        .catch((error) => {
          console.log(error);
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
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -210px;
  padding: 0 25px;
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
</style>