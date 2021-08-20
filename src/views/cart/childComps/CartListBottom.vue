<template>
  <div class="cartlist-bottom">
    <div class="cartlist-bottom-all" @click="selectAll">
        <check-button :value = "deSelectAll"></check-button>
        <span class="selectAllStyle">全选</span>
    </div>
    <div class="cartlist-total">合计:￥{{theTotal}}</div>
    <div class="cartlist-computed" @click = "calclick">去计算({{theCount}})</div>
  </div>
</template>

<script>
 
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name:'CartListBottom',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    theTotal(){
      
      return this.$store.state.cartList.filter(item=>{
          return item.checked
      }).reduce((pre,item)=>{
          return pre+item.price*item.count
      },0)
    },
    theCount(){
      return this.$store.state.cartList.filter(item=>{
          return item.checked
      }).length
    },
    deSelectAll(){
      //return后结束
      if (this.cartList.length === 0){return false}
      //①filter函数
      // return !(this.cartList.filter(item=>
      //   //!item.checked要为true才满足，才会返回东西，即item.checked为false
      //   //.length = 0，即为false，即没有不选的，所以return!false=true，即全选
      //   !item.checked
      // ).length)
      //②find函数
      // return !(this.cartList.find(item=>!item.checked))

      // 原始遍历
      for (let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }
  },
  methods:{
    selectAll(){
        // let selectAllStatus = true
        // if(this.cartList.filter(item=>{
        //     return item.checked
        // }).length==this.cartList.length){
        //     selectAllStatus = false
        // }
        // this.$store.commit('monitorSelectAll',selectAllStatus)

        let selectAllStatus = true
        if (this.deSelectAll){
          selectAllStatus = false
        }
        this.$store.commit('monitorSelectAll',selectAllStatus)
    },
    calclick(){
      if (!this.deSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .cartlist-bottom{
      height:40px;
      background-color: rgb(250, 223, 223);
      display: flex;
      font-size: 14px;

      /* justify-content: space-around; */
      /* position: relative; */
      /* bottom:40px; */
  }
  .cartlist-bottom-all{
    height: 100%;
    width: 80px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .cartlist-bottom-all img{
    border:2px solid rgb(209, 142, 142);
    border-radius: 50%;
    width: 20px;
    height:20px;
  }
  .cartlist-total{
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .cartlist-computed{
    color: #fff;
    font-weight: 200;
    background-color: red;
    height: 100%;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selectAllStyle{
    margin-left:5px;
  }
</style>