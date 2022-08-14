<template>
  <div class="auction_item">
    <div class="thumbnail">
      <slot name="thumbnail" />
    </div>
    <div class="title_and_rating">
      <div class="title">
        <h2>
          <slot name="title" />
        </h2>
      </div>
      <div class="rating">
        <slot name="rating" />
      </div>
    </div>
         
    <div class="description">
      <slot name="description" />
    </div>
  </div>
</template>

<style>
    .auction_item {  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr 0.8fr;
  gap: 10px 20px;
  grid-auto-flow: row;
  grid-template-areas:
    "thumbnail title_and_rating"
    "thumbnail description";

  padding:20px;
  margin-bottom: 10px;
  height: 200px;

  background-color: var(--vt-c-black-soft);
}

.auction_item:hover{
    background-color: #19303a;
}

.thumbnail { 
    grid-area: thumbnail; 
    margin-left: auto;
    margin-right: auto;
}

.title_and_rating {  
  display: flex;
  flex-direction: column;
  grid-area: title_and_rating;
}

.title {
    grid-area: title; 
    color: white;
}

.rating { grid-area: rating; }

.description { grid-area: description; }



</style>