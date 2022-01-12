<template>
  <div>
    <nav>
      <img src="../assets/icon-left-font-monochrome-black.png" alt="" />
      <h2>
        <router-link class="redirection-profil" to="/home"> Home </router-link>
      </h2>
    </nav>

    <div class="profil">
      <h1>Votre Profil</h1>

      <div class="info">
        <h2>Bonjour {{ this.User.username }}</h2>
        <h2>email: {{ this.User.email }}</h2>

        <button class="suppr-compte" v-on:click="deleteAccount">
          Supprimer votre compte
        </button>
      </div>
    </div>
    <footer class="footprof">
      <img
        class="imgfooter"
        src="../assets/icon-left-font-monochrome-black.png"
        alt=""
      />
    </footer>
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

.redirection-profil {
  text-decoration: none;
  
}
h1 {
  background-color: linen;
  width: 20%;
  border: solid antiquewhite;
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
  margin-top: 100px;
  margin-bottom: -99px;
}

button {
  margin: auto;
  border-radius: 0.5rem;
  border: 3px solid black;
  background-color: white;
}

.suppr-compte {
  margin-bottom: 30px;
}

.footprof {
  background-color: lightgrey;
  margin-top: 368px;
}

.imgfooter {
  height: 200px;
}



@media screen and (max-width: 711px) {

  .info {
    width: 96%;
  }
}


</style>