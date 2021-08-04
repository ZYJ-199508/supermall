<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
  import BScroll, { PullUpLoad } from 'better-scroll'
  export default {
    name:"Scroll",
    props:{
      ProbeType:{
        type:Number,
        default:0
      },
      PullUpType:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        scroll:null,
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.ProbeType,
        pullUpLoad:this.PullUpType,
        click:true
      })
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      useScrollTo(x, y, time = 300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      usefinishPullUp(){
        setTimeout(() => {
          this.scroll && this.scroll.finishPullUp()
        }, 1000);
      },
      useRefresh(){
        console.log('-----');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>