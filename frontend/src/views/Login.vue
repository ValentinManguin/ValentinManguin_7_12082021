<template>
    <div class="login">
        <img src="../assets/icon-above-font.svg" alt="">
           
    <form v-on:submit.prevent="login" id="login">
                  <h2>Connexion</h2>
                <label for="email">E-mail :</label>
                <input type="email" id="email" name="email" v-model="inputEmail" required>

                <label for="password"> Mot de passe :</label>
                <input type="password" id="password" name="password" v-model="inputPassword" required>
                <button type="submit">Connexion</button> 
     </form>
                <p>Vous n'avez pas de compte ? <router-link class="redirection-singup" to="/signup">Enregistrez-vous</router-link></p>
                
</div>

</template>







<script>


import router from "../router";

export default {
    name: "Login",
    data() {
        return {
            inputEmail: "",
            inputPassword: ""
        }
    },
    methods: {
        login() {
            if ( !this.inputEmail || !this.inputPassword ) {
                    return this.isInvalid = true;
                }
             let url = "http://localhost:3000/api/users/login";
            let options = {
                method: "POST",
                body: JSON.stringify({ 
                email :     this.inputEmail,
                password:   this.inputPassword
             }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url,options)
            .then(response => response.json())
            .then(function (data) {
                localStorage.setItem("token",   data.token)
                localStorage.setItem("userId",  data.userId)
                localStorage.setItem("userName",data.userName)
                localStorage.setItem("role",    data.role)
                window.alert('connexion réussie, redirection vers la page principale')
               
                router.push({ path : 'Home'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
            })         
        }
    }
}    


</script>









<style>



</style>









