<template>
  <div id = "detail">
    <detail-item 
      class="detail-item" 
      @getDetilItemIndex = "getDetilItemIndex"
      ref = "detailitem">
    </detail-item>
    <scroll class = "wrapper" ref="scroll" @scroll="scrollContent" :probe-type = "3">
      <detail-swiper :topImages = "topImages"></detail-swiper>
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info>
      <detail-goods-info 
        :detailInfo = "detailInfo" 
        @imageLoad = "getimgLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo = "paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo = "commentInfo" ref ="comments"></detail-comment-info>
      <goods-list :goods = "recommends" ref ="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart = "addToCart"></detail-bottom-bar>
    <back-top @click.native="clickBackTap" v-show="testScrollContent"></back-top>
    <!-- <toast :message = "dMessage" :messageshow = "dMessageshow"></toast> -->
  </div>
</template>

<script>
  import DetailItem from './childComponents/DetailItem'
  import DetailSwiper from './childComponents/DetailSwiper'
  import DetailBaseInfo from './childComponents/DetailBaseInfo'
  import DetailShopInfo from './childComponents/DetailShopInfo'
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
  import DetailParamInfo from './childComponents/DetailParamInfo'
  import DetailCommentInfo from './childComponents/DetailCommentInfo'
  import DetailBottomBar from './childComponents/DetailBottomBar'
  // import Toast from 'components/common/toast/Toast'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import { itemListenerMixin,listenerBackTop } from 'common/mixin' 
  import { getDetailData,GoodsInfo,Shop,GoodsParam,getDetailRecommendDta } from 'network/detail'
  import { debounce } from 'common/utils' 
  import { mapActions } from 'vuex'

  export default {
    name:"Detail",
    data(){
      return{
        id:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImageListener:null,
        getOffsetTop:null,
        handleOffsetTop:[],
        currentIndex:0,
        dMessage:'',
        dMessageshow:null
      }
    },
    mixins:[itemListenerMixin,listenerBackTop],
    components:{
      DetailItem,
      DetailSwiper,
      DetailBaseInfo,
      GoodsInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      // Toast,
    },
    created(){
      this.id = this.$route.params.id
      this.FgetDetailData()
      this.FgetDetailRecommendDta()
    },
    // mounted(){
    //   const refresh = debounce(this.$refs.scroll.useRefresh,500)
      
    //   this.itemImageListener = ()=>{
    //      refresh()
    //   }
    //   this.$bus.$on('imgLoadAfter',this.itemImageListener)
    // },
    destroyed(){
      this.$bus.$off('imgLoadAfter',this.itemImageListener)
    },
    methods:{
      ...mapActions(['addToCartMut']),
      //请求详情数据
      FgetDetailData(){
        getDetailData(this.id).then(res=>{
          const data = res.result
          this.topImages = res.result.itemInfo.topImages
          this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          if (data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
          this.getOffsetTop = debounce(()=>{
            this.handleOffsetTop.push(0)
            this.handleOffsetTop.push(this.$refs.params.$el.offsetTop)
            this.handleOffsetTop.push(this.$refs.comments.$el.offsetTop)
            this.handleOffsetTop.push(this.$refs.recommends.$el.offsetTop)
            // console.log(this.handleOffsetTop);
          },100)
          
        })
        
      },
      getimgLoad(){
        //对应方法1
        // this.$refs.scroll.useRefresh()

        
        //在mounted中获取不行，因为数据还没收到
        //在FgetDetailData请求完数据再获取也不行，因为DOM(布局)还没渲染
        //在FgetDetailData请求完数据，再调用$nextTick等DOM渲染完也不行，因为图片还没加载
        //只能在图片加载完再获取商品、参数、评论、推荐模块对应的offsetTop
        this.getOffsetTop()

        //对应方法2
        this.refresh

        
      },
      //商品推荐数据
      FgetDetailRecommendDta(){
        getDetailRecommendDta().then(res=>{
          this.recommends = res.data.list
          // console.log(this.recommends);
        })
      },
      getDetilItemIndex(index){


        this.$refs.scroll.useScrollTo(0,-this.handleOffsetTop[index],100)
        // console.log(index);
      },
      scrollContent(position){
        let positionY = -position.y

        const theLength = this.handleOffsetTop.length
        for (let i = 0; i < this.handleOffsetTop.length; i++) {
          //①多条件判断②给handleOffsetTop加一个很大的数number.max_value，就少做判断，会提升运行时间(空间换时间)
          if(
            this.currentIndex !=i &&
            ((i<theLength-1 && positionY>=this.handleOffsetTop[i] && positionY<this.handleOffsetTop[i+1]) || 
            (i==theLength-1) && positionY>=this.handleOffsetTop[i])
          ){
            this.currentIndex = i
            this.$refs.detailitem.currentIndex = i
          }
        }
        
        this.testScrollContent = (-position.y) > 1000

      },
      addToCart(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.id = this.id
        // console.log(product);
        
        //①将商品添加到VUEX
        // this.$store.dispatch('addToCartMut',product).then(res=>{
        //   console.log(res);
        // })

        //②将商品添加到VUEX，使用mapActions的方法
        this.addToCartMut(product).then(res=>{
          this.$toast.show(res,2000)
          // console.log(this.$toast);
        }) 
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }
  .wrapper{
    height: calc(100% - 44px - 49px);
    /* height: 100px; */
    overflow: hidden;
  }
  .detail-item{
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
</style>