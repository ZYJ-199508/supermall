<template>
  <div class="wrapper">
    <ul class="content">
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
      <li>1级别</li>
    </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      // console.log(document.querySelector('.wrapper'));
      this.scroll = new BScroll(document.querySelector('.wrapper'),{})
    }
  } 
</script>

<style scoped>
  .wrapper{
    height: 200px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>
