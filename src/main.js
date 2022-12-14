// import devtools from '@vue/devtools'

import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useGlobalAuthToken } from "./stores/authToken";


// import IdleVue from 'idle-vue'

// const eventsHub = new Vue()

// Vue.use(IdleVue, {
//   eventEmitter: eventsHub,
//   idleTime: 720000
// }) // sets up the idle time,i.e. time left to logout the user on no activity
// Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // if any of the routes in ./router.js has a meta named 'requiresAuth: true'
//   // then check if the user is logged in before routing to this path:
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.loggedIn) {
//       next({ name: 'login' })
//     } else {
//       next()
//     }
//   } else if (to.matched.some(record => record.meta.requiresLogged)) {
//     // else if any of the routes in ./router.js has a meta named 'requiresLogged: true'
//     // then check if the user is logged in; if true continue to home page else continue routing to the destination path
//     // this comes to play if the user is logged in and tries to access the login/register page
//     if (store.getters.loggedIn) {
//       next({ name: 'home' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

const app = createApp(App);

app.use(createPinia());
app.use(router);

// new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')

app.mount("#app");

const authToken = useGlobalAuthToken()


  
watch(
authToken,
(tokenVal) => {
    const tokenString = JSON.stringify(tokenVal)
    localStorage.setItem("authToken", tokenString)
    console.log("token updated")
}
)