<script>

import { list } from "postcss";
import { provide } from "vue";
import { RouterLink, RouterView } from "vue-router";
import axios from 'axios';

import {openModal, container, popModal, closeModal, on} from "jenesius-vue-modal";
import AccountModal from "./components/AccountModal.vue"
import IconAccount from "./components/icons/IconAccount.vue";
import { useGlobalAuthToken } from "./stores/authToken";
import { mapActions, mapState } from "pinia";
import NotificationsModal from "./components/NotificationsModal.vue";
import NotificationsIcon from "./components/icons/NotificationsIcon.vue";

export default{
  components: { WidgetContainerModal: container, IconAccount, NotificationsIcon },
  data(){
    return{
      authorizationTokenObj:{
        username:"",
        token:"",
        success: false,
      },
    }
  },

  computed:{
      ...mapState(useGlobalAuthToken, {
        loggedIn: 'isLoggedIn'
      })
  },
  mounted(){
    console.log("app mounted()") 
    if(localStorage.getItem("authToken")){
      const tokenObj = JSON.parse(localStorage.getItem("authToken"))
      console.log("So this is the new object: " + JSON.stringify(tokenObj))

      if( this.setToken(tokenObj.username, tokenObj.token)){
        console.log("token set correctly")
      }
      else {
        console.log("something went wrong with that token again...")
      }
    }
  }, 
  methods:{
    objectFromId(queryId){
      if(queryId){
        // return this.itemList.find(item => {
        //   item.id === queryId;
        
        return this.itemList[1];
      }
      else return {}
    },
    displayAccountModal(){

      const accountModalObj = openModal(
        AccountModal, 
        { 
          title: "Gello uwu",
        });
    },
    displayNotificationsModal(){
      const notiModalObj = openModal(NotificationsModal)
    },
    ...mapActions(useGlobalAuthToken, ['setToken'])
  },
}


</script>

<template>
  <header class="clearfix">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="40"
      height="40"
    >

    <div class="wrapper">
      <nav>
        <RouterLink to="/data">
          Data
        </RouterLink>
        <RouterLink to="/list">
          Auctions
        </RouterLink>
        <RouterLink
          v-if="loggedIn"
          to="/new"
        >
          Post an auction
        </RouterLink>
      </nav>

      <div
        v-if="loggedIn"
        id="notifications-icon"
        class="top-bar-icon"
        @click="displayNotificationsModal()"
      >
        <NotificationsIcon />
      </div>
     
     
      <div
        id="account-icon"
        class="top-bar-icon"
        @click="displayAccountModal()"
      >
        <IconAccount :is-logged-in="loggedIn" />
      </div>
    </div>
  </header>
  <widget-container-modal />
  <div id="app-contents">
    <RouterView />
  </div>

  
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
  z-index: 0;
}

#app-contents{
  width: 100%;
  top:60px;

  padding: 20px;
  padding-top: 30px;
}

.top-bar-icon{
  width: fit-content;
  height: fit-content;
  padding: 10px;
}

header {
  background-color: #082a38;
  line-height: 1.5;
  max-height: 50vh;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height:fit-content;
  padding: 10px;
  z-index: 1;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

header .wrapper {
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 0px;
  top:0px;
  height: fit-content;
}

.logo {
  left: 5%;
  padding: 10px auto;
  float: left;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.modal-container{
  z-index: 4;
}
</style>
