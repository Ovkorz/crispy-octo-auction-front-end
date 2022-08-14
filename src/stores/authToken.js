import {ref, watch } from "vue";
import { defineStore } from "pinia";


export const useGlobalAuthToken = defineStore({
    id: 'authToken',
    // state: () => { 
        
    //     useLocalStorage("globalAuthToken", {
    //       username: "",
    //       token: "",
    //       success: false,
    //     })
      
      
    // },
    state: () => ({
      username: "",
      token: "",
      success: false,
    }),
    getters: {
      restAuthHeader(state){
        if(this.success){
          return{
            headers:{
              "Content-type": "application/json",
              "Authorization": "Token " + state.token
            }
          }
        }
        else return undefined
      },
      getUsername(state){
        return state.username
      },
      isLoggedIn(state){
        return state.success
      }
    },
    actions:{
        setToken(usrnm, tok){

            if(usrnm && tok){
                this.username = usrnm
                this.token = tok
                this.success = true
                return true
            }
            else return false
        },
        logOut(){
          this.username = ""
          this.token = ""
          this.success = false
        }
    }
  })
