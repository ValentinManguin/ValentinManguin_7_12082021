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
        <h2>Bonjour {{ this.User.username }}</h2>
        <h2>email: {{ this.User.email }}</h2>

        <button v-on:click="deleteAccount">Supprimer votre compte</button>
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
  mounted() {
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

.info {
  border-radius: 0.5rem;
  border: solid;
  width: 40%;
  height: 150%;
  box-shadow: inset 0px 0px 0px 4px orangered;
  background-color: orange;
}

.profil {

display: flex;
flex-flow: column;
align-items: center;


}


button {
    margin: auto;
    border-radius: 0.5rem;
    border: 3px solid black;
    background-color: white;
    
}
</style>