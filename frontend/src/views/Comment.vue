<template>
    


<div class="affichage">
<h1> {{$route.params.postid}}</h1>

<div v-for="post in posts" :key="post.id">
  <h3>  {{ post.User.username }} :  </h3> 
  {{post.content}}
</div>
<textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          v-model="content"
          required
        ></textarea>
        <button v-on:click="createComment">Envoyer</button>

<div v-for="comment in comments" :key="comment.id" class="comment">
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
    .get("http://localhost:3000/api/comment/"+this.$route.params.postid)
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
        .post("http://localhost:3000/api/comment/"+ this.$route.params.postid, { content: this.content })
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
    getOnePost(){
      axios
      .get("http://localhost:3000/api/post/"+this.$route.params.postid)
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