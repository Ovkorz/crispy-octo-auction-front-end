<script>
import axios from 'axios'
import { useGlobalAuthToken } from '../stores/authToken'
import { mapWritableState } from 'pinia'

    export default {
        props: {
            title: {
                type: String,
                required: true,
                default : "Without title"
            },
            loggedIn:{
                type: Boolean,
                default: false,
            },
            
        },
        setup(){
            const tokenStore = useGlobalAuthToken()

            return {tokenStore}
        },
        data(){
            return{
                userCredentials:{
                    username:'simon2',
                    password:'start',
                },
                authorizationTokenObj:{
                username: String,
                token: String,
                success: Boolean,
                },
            }
        },
        
        computed:{
           ...mapWritableState(useGlobalAuthToken, ['success','token','username'])
        },
        methods:{
            attemptLogin(){
                
                let userObjTemp= {}

                if(!this.userCredentials.username || !this.userCredentials.password){
                    userObjTemp = {
                        username: "simon2",
                        password: "start",
                    }
                }
                else userObjTemp = this.userCredentials;

                axios.post('http://localhost:8000/foo/', userObjTemp).then(response => {
                    if(response.status == 200){
                        this.authorizationTokenObj.token = response.data.token
                        this.authorizationTokenObj.username = userObjTemp.username
                        this.authorizationTokenObj.success = true
                        console.log(response.data)

                        this.tokenStore.$patch(this.authorizationTokenObj)
                        // this.$emit('login', this.authorizationTokenObj)
                    }
                    else{
                        console.log(response)
                    }
                })
            },
        },  
    }
</script>

<template>
  <div class="account">
    <div class="account-content">
      {{ userCredentials.username }} <br> 
      <br>
      <input
        v-model="userCredentials.username"
        type="text"
        name="username_input"
        placeholder="username"
        class="user-form-input"
      >
      <input
        v-model="userCredentials.password"
        type="password"
        name="password_input"
        placeholder="password"
        class="user-form-input"
      >

      <button @click="attemptLogin()">
        Log In
      </button><br>
      <!-- <button>Register</button> -->
    </div>
  </div>
</template>

<style>
    .account{
        display:block;
        position: fixed;
        top: 60px;
        right:0px;
        background-color: cadetblue;
    }

    .account-content{
        display: flex;
        flex-direction: column;
        padding: 30px;
        height: fit-content;
    }
</style>