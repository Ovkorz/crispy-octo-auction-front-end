<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { useGlobalAuthToken } from '../stores/authToken'

// import Datepicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'


    export default {
        components:{
            // Datepicker,
        },
        data(){
            return {
                product: {
                    description: "",
                    image_src: "",
                    name: "",
                },
                initial_price: 0,
                end_date: "2024-04-03T00:00:00.000Z" 
            }
        },
        computed:{
            ...mapState(useGlobalAuthToken, {
              authHeader: 'restAuthHeader'
            })
        },  
        methods:{
            

             postNewAuction(){
                const tempAuctionObj = {
                    product: this.product,
                    initial_price: this.initial_price,
                    end_date: this.end_date,
                }

                axios.post('http://localhost:8000/auctions/new', tempAuctionObj, this.authHeader)
                .then(response =>
                    console.log(response.data)      
                ) 
            },
        }
    }
</script>

<template>
  <div id="new-item-form-container">
    <p>
        <span>Title</span><br>
        <input v-model="product.name"><br><br>
    </p>
    
    <p>
        <span>Description</span><br>
        <input v-model="product.description"><br><br>
    </p>

    <p>
        <span>Image URL</span><br>
        <input v-model="product.image_src"><br><br>
    </p>

    <p>
        <span>Initial price</span><br>
        <input v-model="initial_price"><br><br>
    </p>

    <p>
        <span>End date</span><br>
        <!-- <input v-model="end_date"><br><br> -->
        <Datepicker v-model="end_date" range></Datepicker>
    </p>

    <a id="submit-button" @click="postNewAuction()">Submit</a>
  </div>
</template>

<style>
#new-item-form-container{
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20px;
}

#new-item-form-container > p{
    background-color: var(--vt-c-black-soft);
    width: 400px;
    display: block;

    padding: 20px;
    margin: 10px;
}

#submit-button{
    color: white;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    user-select: none;

    background-color: #dddf1a;
    padding: 8px;
    padding-left: 25px;
    padding-right: 30px;
    border-radius: 10px;

    min-width: 100px;
}

#submit-button:hover{
    background-color: #c8cc00;
    /* color: #eff300; */
    text-shadow: 0 0 7px white;
}
</style>