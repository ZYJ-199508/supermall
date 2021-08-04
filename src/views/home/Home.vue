<template>
  <div id = "home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control 
    :titles = titles 
    ref="tabControl1" 
    @tabClick = "tabClick" 
    class="tab-control"
    v-show="isTabFixed"></tab-control>

    <scroll 
      class="content" 
      ref="scroll" 
      :probe-type = "3" 
      @scroll = "scrollContent"
      :pull-up-type="true"
      @pullingUp = "loadGoods">

      <home-swiper :banners="banners" @useImgeSwi ="getImgeSwi"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>

      <tab-control 
      :titles = titles 
      ref="tabControl2" 
      @tabClick = "tabClick"></tab-control>
      <!-- <tab-control :titles = titles class="tab-control" @tabClick = "tabClick"></tab-control> -->
      
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
  import {debounce} from 'common/utils'
  
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
        testScrollContent:false,
        tabOffsetTop:10000,
        isTabFixed:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currenttype].list
      }
    },
    //created组件还没挂载完,mounted图片还没加载完
    //一般可以created用来请求首页数据,mounted用来获取组件常量,methods用来监听图片加载
    created(){
      this.FgetHomeMultidata()

      this.FgetHomeGoods('pop')
      this.FgetHomeGoods('new')
      this.FgetHomeGoods('sell')

    },
    mounted(){
      //！！特别注意:将函数debounce的return函数赋给refresh,然后不断调用refresh()
      //！！只会不断运行return部分的内容,所以let timer = null 只起一次作用
      const refresh = debounce(this.$refs.scroll.useRefresh,500)
      this.$bus.$on('imgLoadAfter',()=>{
         refresh()
      })
      
      
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
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

        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // console.log(this.isTabFixed);
      },
      loadGoods(){
        // console.log('11111');
        this.FgetHomeGoods(this.currenttype) 
      },
      getImgeSwi(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10; */
  }
  /* .tab-control{ */
    /* position:sticky;
    top: 44px;
    z-index: 9; */
  /* } */
  .tab-control{
    position: relative;
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
