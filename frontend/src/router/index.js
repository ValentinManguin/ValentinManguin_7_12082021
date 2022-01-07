import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
  path: "/signup",
  name: "Signup",
  component: () => import("../views/Signup.vue")
},
{
  path: "/login",                                               
  name: "Login",                                 
  component: () => import("../views/Login.vue")  
},
{
  path: "/home",                                               
  name: "Home",                                 
  component: () => import("../views/Home.vue")  
},
{
  path: "/profil",                                               
  name: "Profil",                                 
  component: () => import("../views/Profil.vue")  
},
{
  path: "/comment/:postid",                                               
  name: "Comment",                                 
  component: () => import("../views/Comment.vue")  
},
  {
    path: '/',
    name: 'login2',
    component: () => import("../views/Login.vue") 
  },
 
]

const router = new VueRouter({
  routes
})

export default router
