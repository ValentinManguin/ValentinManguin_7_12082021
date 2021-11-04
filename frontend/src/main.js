import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.interceptors.request.use(req => {

  const token = localStorage.getItem("token");
  if (token != null)
  {
    req.headers.authorization= token;
  }
return req;

});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
