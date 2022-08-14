<script>
// this component represents a page displaying details of a single autction item

import axios from 'axios'
import { mapState } from 'pinia'
import { useGlobalAuthToken } from '../stores/authToken'
import VueCountdown from '@chenfengyuan/vue-countdown';
// import { parseISO, sub, intervalToDuration, milliseconds } from 'date-fns'


export default {
    components:{
        VueCountdown
    },
    props:{
        itemId: {
          type: Number,
          default: -1,
        }
    },
    data(){
        return {
            itemDetails: {
                product: {}
            },
            newPrice:"",

            timeLeft: 0,
            countingDown: false,
        }
    },
    
    computed: {
        ...mapState(useGlobalAuthToken, {
        authHeader: 'restAuthHeader'
      }),
      calculatedPrice(){
        if(this.itemDetails.number_of_offers == 0){
            return this.itemDetails.initial_price
        }
        else return this.itemDetails.current_price
      }
    },
    mounted(){
        axios.get(`http://localhost:8000/auctions/${this.itemId}`, this.authHeader).then(
            Response =>{
                this.itemDetails = Response.data

                // intervalToDuration({
                // start: new Date(1929, 0, 15, 12, 0, 0),
                // end: new Date(1968, 3, 4, 19, 5, 0)
                // })



                let endDate = parseISO(this.itemDetails.end_date)
                
                this.timeLeft = milliseconds(
                    intervalToDuration({
                        start: Date.now(),
                        end: endDate,
                    })
                )

                this.countingDown = true;
                console.log(endDate);     

                console.log(this.itemDetails)
            }
        )
    },
    methods: {
    //   axios.get('http://localhost:8000/auctions/', this.authHeader).then(response =>{
    //   this.allAuctionsList = response.data
    //   console.log(response.data)

        postNewOffer(){
            let newOfferObject = {
                price: this.newPrice,
                auction: this.itemDetails.id,
            }

            axios.post('http://localhost:8000/auctions/offers', newOfferObject, this.authHeader).then(response =>{
                console.log(response.data)
            })

        }
    },
}
    

</script>

<template>
  <div class="item-page">
    <div class="product-info">
      <img 
        class="product-image"
        width="400"
        height="400"
        :src="itemDetails.product.image_src" 
        :alt="itemDetails.product.name"
      ><br><br>

      <span class="description">
        {{ itemDetails.product.description }}
      </span>
    </div>
    <div class="title-and-offer">
      <h1 class="title">
        {{ itemDetails.product.name }}
      </h1>
        
      <span class="price">  {{ calculatedPrice }}€ </span>
      <span class="initial-price"> initial price: {{ itemDetails.initial_price }} </span>
        
      <span>Number of offers: {{ itemDetails.number_of_offers }} </span>
      <span>End date: {{ itemDetails.end_date }}</span>

      <vue-countdown
        v-slot="{ days, hours, minutes, seconds }"
        :auto-start="countingDown"
        :time="timeLeft"
      >
        Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
      </vue-countdown>
      <div id="offer-area">
        <input
          v-model="newPrice"
          type="text"
          class="offer-input"
          placeholder="Your offer"
        >
        <button
          class="bid-button"
          type="button"
          @click="postNewOffer()"
        >
          Bid
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@1,600&display=swap');

.item-page {  
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
    "product-info title-and-offer";

    padding-top: 50px;
}

.product-info { 
    grid-area: product-info; 
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-image{
    border-radius: 15px;
}

.description{
    padding-top: 15px;
}
.title-and-offer { 
    grid-area: title-and-offer;
    display: flex;
    flex-direction: column;
    align-items: left;
}

.price{
    font-family: 'Exo 2', sans-serif;
    font-size: 30px;
    padding-top: 30px;

    width: fit-content;
}

.initial-price{
    width: fit-content;

}

.offer-input{
    padding: 10px;
    margin-top: 30px;
    font-size: 25px;
    text-align: center;
    width: 400px;
    border-radius: 15px;
}

.bid-button{
    background-color: hsla(160, 100%, 37%, 1);
    font-size: 20px;
    text-align: center;
    color: aliceblue;
    width: 150px;
    padding:10px;
    margin: 10px;
    border-radius: 15px;
}


#offer-area{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
}
</style>