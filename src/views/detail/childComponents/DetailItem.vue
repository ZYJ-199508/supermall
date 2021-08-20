<template>
    <nav-bar>
        <div slot="left" class="back" @click="backclick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="detail-item">
          <div 
          v-for="(item,index) in navBarMessage" 
          :key = index
          class="detail-item-item" 
          @click="getClickColor(index)"
          :class="{active:index==currentIndex}">{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DetailItem',
  components:{
    NavBar
  },
  data(){
    return{
      navBarMessage:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    getClickColor(index){
      this.currentIndex = index
      this.$emit('getDetilItemIndex',index)
    },
    backclick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .detail-item{
    display: flex;
    color: var(--color-text);
    font-size: 13px;
  }
  .detail-item-item{
    flex:1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 10px;
  }
</style>