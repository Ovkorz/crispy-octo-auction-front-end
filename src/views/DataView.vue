<script>
/*eslint vue/require-v-for-key: "off" */

import axios from 'axios'
import { useGlobalAuthToken } from '../stores/authToken'
import { mapState } from 'pinia'

// import Datepicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'

// import { Datepicker } from '@mathieustan/vue-datepicker';
// import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

import Datepicker from 'vue3-datepicker';

export default{
  components:{
    Datepicker,
  },
  data(){
    return{
      dataFromServer:[],
      counter: 0,

      username: "simon2",
      password: "start",

      someDate: null,
    }
  },
  computed:
  {
    ...mapState(useGlobalAuthToken, {
      authHeader: 'restAuthHeader'
    })
  },
  methods:{
    postNewAuction(){
      const newAuctionObject = this.myAuctionList.slice(1,2)
      newAuctionObject.forEach((item,index)=>{
        axios.post('http://localhost:8000/auctions/new', item, this.authHeader).then(response =>
        console.log(response.data)
        ) 
      })
    },
    getAuctionList(){
        axios.get('http://localhost:8000/auctions/', this.authHeader).then(response =>{
          this.dataFromServer = response.data
          console.log(response.data)
        })
    },
    getUserDetails(){
      axios.get('http://localhost:8000/auctions/users/', this.authHeader).then(response =>{
        this.dataFromServer = response.data
        console.log(response.data)
      })
    },
    getNotifications(){
      axios.get('http://localhost:8000/auctions/notifications', this.authHeader).then(response =>{
        this.dataFromServer = response.data
        console.log(response.data)
      })
    }
    
  },
}

</script>

<template>

  <div id="data-page-wrapper">
  <div class="about">
    <h1>This is the data page</h1>
    Here, you can easily see raw data recieved by the browser.<br><br>
    Local token header: {{ authHeader }}
  </div>

  

  <button @click="postNewAuction()">
    post
  </button>
  <button @click="getAuctionList()">
    get
  </button>
  <br>
  <button @click="attemptLogin()">
    login
  </button>
  <button @click="getUserDetails()">
    user
  </button>
  <button @click="getNotifications()">
    notifications
  </button>
  <br><br>
  <Datepicker v-model="someDate"></Datepicker>
  <br>
  {{ someDate }}<br>
<div v-for="i in dataFromServer">
    {{ i }}<br><br>
  </div>
</div>
  <br><br>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: fit-content;
    padding: 20px;
    display: flex;
    align-items: center;
  }
}
</style>
