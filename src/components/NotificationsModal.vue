<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { useGlobalAuthToken } from '../stores/authToken'
import Notification from './NotificationComponent.vue'

export default{
  components: { Notification },
  data() {
      return {
          list: [],
      };
  },
  computed: {
      ...mapState(useGlobalAuthToken, {
          authHeader: "restAuthHeader"
      }),
  },
  mounted() {
      axios.get("http://localhost:8000/auctions/notifications", this.authHeader).then(response => {
          this.list = response.data;
          console.log(response.data);
      });
  },
}
</script>

<template>
  <div id="modal-container">
    <div id="modal-content">
      <Notification
        v-for="noti in list"
        :key="noti.id"
      >
        <template #title>
          {{ noti.title }}
        </template>
        <template #content>
          {{ noti.content }}
        </template>
      </Notification>
    </div>
  </div>
</template>

<style>
#modal-container{
    display:block;
    position: fixed;
    top: 60px;
    right:0px;
    background-color: cadetblue;

    min-width: 300px;
    width: fit-content;
    height: fit-content;
}

#modal-content{
    display: flex;
    flex-direction: column;
    padding: 10px;
}

#title{
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;
}
</style>