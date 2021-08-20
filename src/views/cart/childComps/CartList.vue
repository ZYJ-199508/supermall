<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo = "item"></cart-list-item>
    </scroll>
  </div>
</template>
 
<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import { mapGetters } from 'vuex'
import CartListItem from './CartListItem.vue'
export default {
  name:'CartList',
  components: { 
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
      this.$refs.scroll.useRefresh()
  }

}
</script>

<style scoped>
  .cart-list{
    /* height: 100%; */
    height: calc(100vh - 44px - 49px - 40px);
  }
  .wrapper{
    /* height: calc(100vh - 44px - 49px); */
    height: 100%;
    overflow: hidden;
  }
</style>