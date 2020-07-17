<template>
  <div class="fullscreen screen-bg-style">
    <dv-loading class="full-height full-width"
                v-if="isLoading">Loading...</dv-loading>
    <div class="row full-height"
         v-else>
      <div class="screen-header col-1">
        <p>智药云数据大屏</p>
      </div>
      <div class="row q-col-gutter-x-md q-ma-md col">
        <div class="column col-3 q-col-gutter-y-md full-height">
          <!-- 近7日处方量统计 -->
          <div class="col">
            <screen-prescription-count-chart></screen-prescription-count-chart>
          </div>
          <!-- 近7日机构订单排名 -->
          <div class="col">
            <screen-order-list></screen-order-list>
          </div>
          <!-- 近7日机构处方排名 -->
          <div class="col-4">
            <screen-hosptail-list></screen-hosptail-list>
          </div>
          <!-- 近7日订单完成率 -->
          <div class="col">
            <screen-prescription-complite></screen-prescription-complite>
          </div>
        </div>
        <div class="column col-6 q-col-gutter-y-md full-height">
          <!-- 统计 + 地图 -->
          <div class="col-8">
            <data-screen-map></data-screen-map>
          </div>
          <!-- 订单列表 -->
          <div class="col">
            <order-list-scroll></order-list-scroll>
          </div>
        </div>
        <div class="column col-3  q-col-gutter-y-md full-height">
          <!-- 近7日处方诊断关键词 -->
          <div class="col">
            <wordcloud-chart></wordcloud-chart>
          </div>
          <!-- 近7日订单价格区间分布图 -->
          <div class="col">
            <order-price-chart></order-price-chart>
          </div>
          <!-- 近半年商品数量排名 -->
          <div class="col">
            <screen-goods-ranking></screen-goods-ranking>
          </div>
          <!-- 近半年订单销售额 -->
          <div class="col">
            <order-sales-chart></order-sales-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { loading } from '@jiaminghi/data-view'
import ScreenPrescriptionCountChart from './ScreenPrescriptionCountChart'
import ScreenOrderList from './ScreenOrderList'
import ScreenHosptailList from './ScreenHosptailList'
import ScreenPrescriptionComplite from './ScreenPrescriptionComplite'

import DataScreenMap from './DataScreenMap'
import OrderListScroll from './OrderListScroll'

import WordcloudChart from './WordcloudChart'
import OrderPriceChart from './OrderPriceChart'
import ScreenGoodsRanking from './ScreenGoodsRanking'
import OrderSalesChart from './OrderSalesChart'
Vue.use(loading)

export default {
  name: 'data-screen',
  components: {
    ScreenPrescriptionCountChart,
    ScreenOrderList,
    ScreenHosptailList,
    ScreenPrescriptionComplite,
    DataScreenMap,
    OrderListScroll,
    WordcloudChart,
    OrderPriceChart,
    ScreenGoodsRanking,
    OrderSalesChart
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.screen-bg-style {
  background: #000a3b !important;

  .screen-header {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    p {
      margin: 0 auto;
      font-size: 26px;
      font-weight: bold;
      color: rgba(1, 196, 247, 1);
      line-height: 28px;
      background: linear-gradient(0deg, rgba(4, 119, 213, 1) 0%, rgba(1, 217, 254, 1) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
