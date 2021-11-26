<template>
  <div>
    <nav>
      <img src="../assets/icon-left-font.svg" alt="" />
      <h3>
        <router-link class="redirection-profil" to="/home"> Home </router-link>
      </h3>
    </nav>

    <div class="profil">
      <h1>Votre Profil</h1>

      <div class="info">
        <p>Bonjour {{this.User.username}}</p>
        <p>email: {{this.User.email}}</p>


   <button v-on:click="deleteAccount">Supprimez votre compte</button>  
      </div>
    </div>
  </div>
</template>



<script>
import router from "../router";
const axios = require("axios");

export default {
  name: "Profil",

  data() {
    return {
      User: {
        username: "",
        email: "",
      },
    };
  },
  methods: {
    getOneAccount() {
      axios
        .get("http://localhost:3000/api/users/")
        .then((response) => {
          console.log("user", response.data);
          this.User = response.data.user;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteAccount() {
      axios
      .delete("http://localhost:3000/api/users/")
         .then((response) => {
            console.log(response);
             localStorage.clear();
              alert("Compte supprimé");
              router.push({ path: "Signup" });
                })

       .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted () {
this.getOneAccount();
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
</style>