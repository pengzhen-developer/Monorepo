


<template>
  <div class="fullscreen screen-bg-style">

    <div class="flex column full-width full-height q-pa-sm q-px-md">

      <div class="screen-header q-pa-md">
        <div class="text-center screen-title">智药云数据大屏</div>
      </div>

      <div class="col">

        <div class="flex row full-height q-col-gutter-x-md">
          <div class="col-3">
            <div class="flex column q-col-gutter-y-md full-width full-height">
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近7日处方量统计</span>
                  <ScreenPrescriptionCountChart slot="default"></ScreenPrescriptionCountChart>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近7日机构订单排名</span>
                  <ScreenOrderList slot="default"></ScreenOrderList>
                </BoxCard>
              </div>
              <div class="col-4">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近7日机构处方排名</span>
                  <ScreenHosptailList slot="default"></ScreenHosptailList>
                </BoxCard>
              </div>
              <div class="col-2">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近7日订单完成率</span>
                  <ScreenPrescriptionComplite slot="default"></ScreenPrescriptionComplite>
                </BoxCard>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="flex column q-col-gutter-y-md full-width full-height">
              <div class="col-8">
                <BoxCard class="full-width full-height q-pa-sm">
                  <DataScreenMap></DataScreenMap>
                </BoxCard>
              </div>

              <div class="col-4">
                <BoxCard class="full-width full-height q-pa-sm">
                  <OrderListScroll></OrderListScroll>
                </BoxCard>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="flex column q-col-gutter-y-md full-width full-height">
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近7日处方诊断关键字</span>
                  <WordcloudChart slot="default"></WordcloudChart>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近7日订单价格区间</span>
                  <OrderPriceChart slot="default"></OrderPriceChart>
                </BoxCard>
              </div>
              <div class="col-4">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近半年商品数量排名</span>
                  <ScreenGoodsRanking slot="default"></ScreenGoodsRanking>
                </BoxCard>
              </div>
              <div class="col-2">
                <BoxCard class="full-width full-height q-pa-sm">
                  <span slot="title">近半年订单销售额</span>
                  <OrderSalesChart slot="default"></OrderSalesChart>
                </BoxCard>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BoxCard from './BoxCard'

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

export default {
  components: {
    BoxCard,

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
  }
}
</script>

<style lang="scss" scoped>
.screen-bg-style {
  background: #000a3b !important;

  color: #fff;
}

.screen-title {
  margin: 0 auto;
  font-size: 26px;
  font-weight: bold;
  color: rgba(1, 196, 247, 1);
  line-height: 28px;
  background: linear-gradient(0deg, rgba(4, 119, 213, 1) 0%, rgba(1, 217, 254, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
