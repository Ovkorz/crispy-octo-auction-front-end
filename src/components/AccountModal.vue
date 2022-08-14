<script>
import { useGlobalAuthToken } from '../stores/authToken'
import { mapActions, mapState } from 'pinia'
import { computed } from '@vue/reactivity'

import LoginForm from './LoginForm.vue'
import AccountInfoModal from './AccountInfoModal.vue'

export default {
    components:{
        LoginForm, AccountInfoModal
    },
     props: {
        title: {
            type: String,
            required: true,
            default : "Untitled"
        },
    },
    setup(){
        const tokenStore = useGlobalAuthToken()

        return {tokenStore}
    },
    computed:{
        ...mapState(useGlobalAuthToken,{
            loggedIn: 'isLoggedIn',
            username: 'username',
        }),
        accountComponent(){
            if(this.loggedIn){
                return AccountInfoModal
            }
            else return LoginForm
        }
    },
    
}
</script>

<template>
  <component :is="accountComponent" />
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