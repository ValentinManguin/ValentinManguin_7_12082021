<template>
    
<div class="comment">


<div v-for="comment in comments" :key="comment.id" class="affichage">
      <h3>  {{ comment.User.username }} :  </h3>  
        {{ comment.content }}
        <button v-on:click="deleteComment(comment.id)" v-if="isAdmin == 'true' || userId==comment.UserId">Supprimer</button>
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
    .get("http://localhost:3000/api/comment")
        .then((response) => {
          console.log("comment", response.data);
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
},
createComment() {
      axios
        .post("http://localhost:3000/api/comment", { content: this.content })
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
        .delete("http://localhost:3000/api/comment/" + commentId )
        .then((response) => {
          console.log(response);
          this.getCommentsByPost();
          alert("Commentaire supprimé");
        })
        .catch((error) => {
          console.log(error);
        });
    },


},
};


</script>


<style>




</style>