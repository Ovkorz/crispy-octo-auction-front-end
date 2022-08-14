<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalAuthToken } from '../stores/authToken';

export default{
    computed:{
        ...mapState(useGlobalAuthToken, ['restAuthHeader', 'isLoggedIn', 'username'])
    },
    methods:{
        ...mapActions(useGlobalAuthToken, ['logOut'])
    }
}
</script>

<template>
  <div id="container">
    <div id="content">
      Hello, {{ username }}!<br><br>
      <button
        id="logout-button"
        @click="logOut()"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<style>
#container{
    display:block;
    position: fixed;
    top: 60px;
    right:0px;
    background-color: cadetblue;
}

#content{
    display: flex;
    flex-direction: column;
    padding:15px;
}

#logout-button{
    color:#fa2f36;
}

</style>