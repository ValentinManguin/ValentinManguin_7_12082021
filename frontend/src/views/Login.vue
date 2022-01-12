<template>
  <div class="login">
    <img src="../assets/icon-left-font-monochrome-black.png" alt="" />

    <form v-on:submit.prevent="login" id="login">
      <h2>Connexion</h2>
      <label for="email">E-mail :</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="inputEmail"
        required
      />

      <label for="password"> Mot de passe :</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="inputPassword"
        required
      />
      <button type="submit">Connexion</button>
    </form>
    <p>
      Vous n'avez pas de compte ?
      <router-link class="redirection-singup" to="/signup"
        >Enregistrez-vous</router-link
      >
    </p>
    
  </div>
</template>







<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
    };
  },
  methods: {
    login() {
      if (!this.inputEmail || !this.inputPassword) {
        return (this.isInvalid = true);
      }
      let url = "http://localhost:3000/api/users/login";

      axios
        .post(url, {
          email: this.inputEmail,
          password: this.inputPassword,
        })
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userName", response.data.userName);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          window.alert(
            "connexion réussie, redirection vers la page principale"
          );

          router.push({ path: "Home" });
        })
        
        .catch((error) => {
          this.isInvalid = true;
          console.log(error);
          window.alert( "Mauvais mot de passe ou adresse mail invalide");
        });
    },
  },
};
</script>









<style>

body {
  background-color: whitesmoke;
}


.login {
  margin-top: -50px;
}

form {

    display: flex;
    flex-direction: column;
    align-items: center;
     border-radius: 0.5rem;
    border: 3px solid;
    width: 355px;
    margin: auto;
    height: 275px;
    box-shadow: inset 0px 0px 0px 4px orangered;
    background-color: orange;
}



img {
    height: 300px;
}

button {
    margin: auto;
    border-radius: 0.5rem;
    border: 3px solid black;
    background-color: white;
    
}

</style>









