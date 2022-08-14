<script>
import { def } from "@vue/shared";
import axios from 'axios'


import AuctionListItem from "../components/AuctionListItem.vue";

import { useGlobalAuthToken } from '../stores/authToken'
import { mapState } from 'pinia'
import router from "../router";


export default{
  components: { AuctionListItem },
  data() {
      return {
          searchQuery: "",
          allAuctionsList:[],
      };
  },
  
  computed: {
    resultQuery() {
      const list = this.allAuctionsList

      if (this.searchQuery) {
        return list.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.product.name.toLowerCase().includes(v));
        });
      } else {
        return list;
      }
    },
    ...mapState(useGlobalAuthToken, {
    authHeader: 'restAuthHeader'
    }),
  },
  
  mounted(){
    this.getAuctionList();
  },
  methods:{
    getAuctionList(){
      axios.get('http://localhost:8000/auctions/', this.authHeader).then(response =>{
        this.allAuctionsList = response.data
        console.log(response.data)
      })
    },
  },
}
</script>

<template>
  <div class="title_and_search_wrapper">
    <div class="list_page_title">
      <h1>This is an auction list page</h1>
    </div>

    <div id="searchbox">
      <img
        class="icon"
        alt=""
        src="@/assets/logo.svg"
        width="20"
        height="20"
      >

      <input
        v-model="searchQuery"
        class="search_input"
        placeholder="search"
      >
    </div>
  </div>
  
  <div class="list_layout">
    <div class="list">
      <AuctionListItem
        v-for="item in resultQuery"
        :key="item.id"
        @click="$router.push({ name: 'itemPage', params: {itemId: item.id}})"
      >
        <!-- @click="router.push({ name: 'itemPage', params: {itemId: item.id}})" -->
        <template #thumbnail>
          <img
            :alt="item.product.name"
            :src="item.product.image_src"
            height="130"
            width="130"
          >
        </template>
        <template #title>
          {{ item.product.name }}
        </template>
        <template #description>
          Created by: {{ item.created_by_username }}<br>
          Initial price: {{ item.initial_price }}<br>
          Current price: <b><p v-if="item.current_price"> {{ item.current_price }}</p> 
            <p v-else> {{ item.initial_price }} </p></b><br>

          {{ item.product.description }}
        </template>
      </AuctionListItem>
    </div>
    <div class="filters">
      hello<br>what's *going* on???
    </div>
  </div>
</template>

<style>
.title_and_search_wrapper{
  width: 100%;
  height: fit-content;
  display: flex;

}

.list_page_title {
  height: fit-content;
  display: block;
  padding: 20px;
  flex-grow: 2;
}

#searchbox {
  display: grid; 
  grid-template-columns: 0.4fr 1.6fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "icon search_input"; 
  
  height: 40px;
  min-width: 150px;
  width: fit-content;

  float:right;
  right: 30px;
  margin-top: 24px;

  padding: 7px;
  font-size: 15px;
  border: black 4px solid;

  flex-grow: 1;
}

.icon { grid-area: icon; }
.search_input { 
  grid-area: search_input; 
  background-color: inherit;
  color: white;
  border: none;
  font-size: 18px;
  padding: 5px;
}

.list{
  margin-left: 20px;
  margin-right: 20px;
}

@media (min-width: 1024px) {

  .list_layout {  display: grid;
  grid-template-columns: 1.5fr 0.5fr;
  gap: 0px 25px;
  grid-auto-flow: row;
  grid-template-areas:
    "list filters";

  height: fit-content;

}

.list { grid-area: list; }
.filters {
  grid-area: filters;
  background-color: blueviolet; 
  height: 100%;  
}

}
</style>