<template>
  <div id = "home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll 
      class="content" 
      ref="scroll" 
      :probe-type = "3" 
      @scroll = "scrollContent"
      :pull-up-type="true"
      @pullingUp = "loadGoods">

      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles = titles class="tab-control" @tabClick = "tabClick"></tab-control>
      <goods-list :goods = "showGoods"></goods-list>
    </scroll>
    <back-top @click.native="clickBackTap" v-show="testScrollContent"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComponents/HomeSwiper'
  import HomeRecommendView from './childComponents/HomeRecommendView.vue'
  import FeatureView from './childComponents/FeatureView.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        titles:["流行","新款","精选"],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currenttype:"pop",
        testScrollContent:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currenttype].list
      }
    },
    created(){
      this.FgetHomeMultidata()

      this.FgetHomeGoods('pop')
      this.FgetHomeGoods('new')
      this.FgetHomeGoods('sell')
    },
    methods:{
      
      /**
       * 事件监听相关
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currenttype = 'pop'
            break
          case 1:
            this.currenttype = 'new'
            break
          case 2:
            this.currenttype = 'sell'
            break
        }
      },


      /**
       * 网络请求相关
       */
      FgetHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      //注意:[]可以变量可以常量;.针对常量
      FgetHomeGoods(type){
        const page = this.goods[type]['page'] +  1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.usefinishPullUp()
        })
      },
      clickBackTap(){
        this.$refs.scroll.useScrollTo(0,0)
      },
      scrollContent(position){
        // console.log(position.y);
        this.testScrollContent = (-position.y) > 1000
      },
      loadGoods(){
        // console.log('11111');
        this.FgetHomeGoods(this.currenttype)
        
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 144px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .tab-control{
    position:sticky;
    top: 44px;
    z-index: 9;
  }

  
  .content{
    /* 方法一：计算 */
    /*注意：像calc这种计算属性前后要加空格，不然不起作用 */
    /* height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden; */

    /* 方法二：定位 */
    overflow: hidden; 
    position:absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;

  }
</style>
