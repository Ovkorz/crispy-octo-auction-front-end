<script>
</script>

<template>
  <div class="notification-wrapper">
    <div class="notification-title">
      <slot name="title" />
    </div><br>
    <div class="notification-content">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.notification-wrapper{
    margin: 5px;
    padding: 5px;

    color: black;
    background-color: aqua;
    border-radius: 5px;
    
    display: flex;
    flex-direction: column;
    text-align: left;
}

.notification-title{
    font-weight: bold;
}

</style>
