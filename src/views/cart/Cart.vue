<template>
  <div>
    <!-- 导航 -->
    <nav-bar  class="carts"><div slot="center">购物车({{length}})</div></nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>


    <!-- 底部汇总 -->
    <cart-list-bottom></cart-list-bottom>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList.vue'

  import { mapGetters } from 'vuex'
  import CartListBottom from './childComps/CartListBottom.vue'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartListBottom
    },
    computed:{
      //mapGetters是将getters的方法映射到compted中
      //①直接使用getters的方法
      // ...mapGetters(['cartLength'])
      //②将getters的方法改成自己定义的名字后使用
      ...mapGetters({
        length:'cartLength',
        list:'cartList'
      })
    }
  }
</script>

<style scoped>
  .carts{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>
