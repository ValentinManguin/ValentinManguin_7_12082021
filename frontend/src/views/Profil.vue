<template>
  <div>
    <nav>
      <img class="img1" src="../assets/icon-left-font-monochrome-black.png" alt="" />
      <h2>
        <router-link class="redirection-profil" to="/home"> Home </router-link>
      </h2>
    </nav>

    <div class="profil">
      <h1>Votre Profil</h1>

      <div class="info">
        <h2>Bonjour {{ this.User.username }}</h2>
        

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
  width: 70%;
}

footer {
  width: 98%;
}

.info {
  width: 67%;
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
  width: 73%;
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

.info {
  width: 77%;
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
.img1 {
  width: 70%;
}

.info {
  width: 89%;
}

}




</style>