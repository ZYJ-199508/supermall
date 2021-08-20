<template>
  <div>
      <div class="detailbase-title">
          <span>秋装女秋装女秋装女秋装女秋装女秋装女秋装女秋装女秋装女秋装女秋装女秋装女</span>
      </div>
      <div class="detailbase-price"> 
          <span style="color:red;">￥109.00</span>
          <span style="text-decoration:line-through;">￥155.72</span>
          <div class="detailbase-price-item">
              <span>今日特价</span>
          </div>
      </div>
      <div class="detailbase-info">
          <span>销量4173</span>
          <span>收藏167人</span>
          <span>72小时发货</span>
      </div>
      <div class="detailbase-benefits">
          <span>退货补运费</span>
          <span>全国包邮</span>
          <span>7天无理由退货</span>
      </div>
  </div>
</template>

<script>
export default {
  name:"DetailBaseInfo"
}
</script>

<style scoped>
  .detailbase-price{
      display:flex;
      margin-top:10px;
  }
  .detailbase-price-item{
      background-color:red;
      border-radius: 25%;
      color: #fff;
      font-size: 13px;
      padding: 3px;
  }
  .detailbase-info{
      display: flex;
      justify-content: space-between;
      padding: 0px 5px 5px;
      font-size:12px;
      margin-top:15px;
      border-bottom: 2px solid #eee;
      
  }
  .detailbase-benefits{
      display: flex;
      justify-content: space-between;
      padding: 0 5px 15px;
      margin-top: 15px;
      border-bottom: 4px solid #eee;
      font-size: 12px;
  }
</style>