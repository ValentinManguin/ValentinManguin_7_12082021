import Vue from 'vue'
import VueRouter from 'vue-router'
import Home2 from '../views/Home2.vue'


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
    path: '/',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
