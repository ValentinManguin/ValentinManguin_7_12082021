<template>
    
<div class="signup">
    <img src="../assets/icon-above-font.svg" alt="">
           
    <form v-on:submit.prevent="signup" id="signup">
        <h2>Inscription</h2>
                

                <label for="firstname">Username :</label>
                <input type="text" id="firstname" name="firstname" v-model="inputSignup.firstname" required>

                <label for="email">E-mail :</label>
                <input type="email" id="email" name="email" v-model="inputSignup.email" required>

                <label for="password"> Mot de passe :</label>
                <input type="password" id="password" name="password" v-model="inputSignup.password" required>
                <button type="submit">Inscription</button> 
     </form>
                <p>Vous avez déjà un compte ?<router-link class="redirection-singup" to="/login"> Connecter-vous</router-link></p>
                

</div>

</template>



<script>



export default {
    name: 'signup',
    data() {
        return {
            inputSignup: {
                
                firstname: "",
                email: "",
                password: ""
            }
        }
},
 methods: {
        signup() {
            let inputDatas = {
                
                "username": this.inputSignup.firstname,
                "email": this.inputSignup.email,
                "password": this.inputSignup.password
            }
            
            console.log(inputDatas)
            let url = "http://localhost:3000/api/users/signup"
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options)
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
               //     localStorage.setItem("userId", res.userId);
                //    localStorage.setItem("token", res.token); 
                //    console.log(localStorage)
                    this.$router.push("/");
                    
                })
                .catch(error => console.log(error))
        }
 }
}
</script>





<style lang="css">

.signup {
    margin-top: -100px;
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










