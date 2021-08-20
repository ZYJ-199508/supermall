<template>
  <div class="toastclass" v-show="isshow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data(){
      return{
          message:'',
          isshow:false
      }
  },
//   props:{
//     message:{
//         type:String,
//         defalut:''
//     },
//     messageshow:{
//         type:Boolean,
//         defalut:false
//     }
//   }
  methods:{
      show(message,duration=1500){
          this.isshow = true
          this.message = message
          setTimeout(() => {
            this.isshow = false
            this.message = ''
          }, duration);
          // console.log(this.isshow);
          // console.log(this.message);
      }
  }
}
</script>

<style scoped>
  .toastclass{
      color: #fff;
      background-color: black;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 8px 10px;
      z-index: 999;
      background-color: rgba(0, 0, 0, .6);
  }

</style>