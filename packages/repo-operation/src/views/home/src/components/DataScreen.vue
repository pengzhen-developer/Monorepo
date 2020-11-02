


<template>
  <div class="fullscreen screen-bg-style"
       style="z-index: 0;">

    <div class="flex column full-width full-height q-pa-sm q-px-md">

      <div class="screen-header q-pa-md">
        <div class="text-center screen-title gradient-title">智药云数据大屏</div>
      </div>

      <div class="col">

        <div class="flex row full-height q-col-gutter-x-md">
          <div class="col-3">
            <div class="flex column q-col-gutter-y-md full-width full-height">
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近7日处方量统计</span>
                  <ScreenPrescriptionCountChart :data="preCountOfSevenDays"
                                                slot="default"></ScreenPrescriptionCountChart>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近7日机构订单排名</span>
                  <ScreenOrderList :data="orderSortOfSevenDays"
                                   slot="default"></ScreenOrderList>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近7日机构处方排名</span>
                  <ScreenHosptailList :data="PreSortOfSevenDays"
                                      slot="default"></ScreenHosptailList>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近7日订单完成率</span>
                  <ScreenPrescriptionComplite :data="orderRateOfSevenDays"
                                              slot="default"></ScreenPrescriptionComplite>
                </BoxCard>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="flex column q-col-gutter-y-md full-width full-height">
              <div class="col-8">
                <BoxCard class="full-width full-height q-pa-sm">
                  <DataScreenMap :count="countOfAllData"
                                 :map="mapData"></DataScreenMap>
                </BoxCard>
              </div>

              <div class="col-4">
                <BoxCard class="full-width full-height q-pa-sm">
                  <OrderListScroll :data="orderList"></OrderListScroll>
                </BoxCard>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="flex column q-col-gutter-y-md full-width full-height">
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近7日处方诊断关键字</span>
                  <WordcloudChart :data="PreDiagnosisKeyOfSevenDays"
                                  slot="default"></WordcloudChart>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近7日订单价格区间</span>
                  <OrderPriceChart :data="orderPriceOfSevenDays"
                                   slot="default"></OrderPriceChart>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近半年商品数量排名</span>
                  <ScreenGoodsRanking :data="goodsOfHalfYear"
                                      slot="default"></ScreenGoodsRanking>
                </BoxCard>
              </div>
              <div class="col-3">
                <BoxCard class="full-width full-height q-pa-md">
                  <span slot="title"
                        class="gradient-title">近半年订单销售额</span>
                  <OrderSalesChart :data="orderSaleOfHalfYear"
                                   slot="default"></OrderSalesChart>
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

import Axios from 'axios'
import Service from '../service/data'
import CONSTANT from '../constant'

import LibraryUtil from '@src/util'

export default {
  name: 'data-screen',
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
  },
  data() {
    return {
      // 总量数据
      countOfAllData: {
        drug: 0, // 药品总数
        prescription: 0, // 处方总量
        order: 0, // 订单总量
        medical: 0, // 医疗机构
        store: 0, // 店配机构
        warehouse: 0 //仓配机构
      },
      // 近7日处方量统计
      preCountOfSevenDays: {
        xAxis: [],
        data: []
      },
      // 近七日机构订单排名
      orderSortOfSevenDays: {
        xAxis: [],
        data: []
      },
      // 近7天机构处方排名
      PreSortOfSevenDays: {
        xAxis: [],
        data: []
      },
      // 近7日订单完成率
      orderRateOfSevenDays: {
        complete: 0,
        incomplete: 0
      },
      // 地图数据
      mapData: [],
      // 订单列表
      orderList: [],
      // 近7天处方诊断关键词
      PreDiagnosisKeyOfSevenDays: [],
      // 近7日订单价格区间
      orderPriceOfSevenDays: {
        xAxis: [],
        data: []
      },
      // 近半年商品数量排名
      goodsOfHalfYear: {
        xAxis: [],
        data: []
      },
      // 近半年订单销售额
      orderSaleOfHalfYear: {
        xAxis: [],
        data: []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let httpMap = [
        this.getPrescriptionCountOfAll(),
        this.getDrugCount(),
        this.getMechanismCount(),
        this.getMapData(),
        this.getData(),
        this.getPreCountOfSevenDays(),
        this.getPreSortOfSevenDays(),
        this.getPreDiagnosisKeyOfSevenDays()
      ]
      Axios.all(httpMap).catch((err) => {
        if (err.data.code === 201) {
          Peace.util.warning(err.data.msg)
        } else if (err.data.code === 403) {
          Peace.util.warning(err.data.msg)
          LibraryUtil.user.removeUserInfo()

          this.$router.push('/').then(() => window.location.reload())
        } else {
          Peace.util.warning('服务器异常，请稍后再试')
        }
      })
    })
  },
  methods: {
    // 平台所有处方数
    getPrescriptionCountOfAll() {
      return Service.getPrescriptionCountOfAll().then((res) => {
        this.countOfAllData.prescription = res.data
      })
    },
    // 药品总数
    getDrugCount() {
      return Service.getDrugCount().then((res) => {
        this.countOfAllData.drug = res.data
      })
    },
    // 获取医疗机构、仓配机构数量
    getMechanismCount() {
      return Service.getMechanismCount().then((res) => {
        this.countOfAllData.medical = res.data.medicalInstitutionCount
        this.countOfAllData.warehouse = res.data.warehouseInstitutionCount
      })
    },
    // 获取地图数据
    getMapData() {
      return Service.getMapData().then((res) => {
        let list = res.data
        let result = []
        for (let i = 0; i < list.length; i++) {
          let item = Object.assign({ City: '', CloudStoreNum: 0, DrugStoreNum: 0, FirstLonLat: '' }, list[i])
          let points = CONSTANT.cityData.find((city) => city.name == item.City)
          if (points) {
            result.push({
              name: item.City,
              value: [points.lng, points.lat, item.CloudStoreNum, item.DrugStoreNum]
            })
          }
        }
        this.mapData = result
      })
    },
    // 订单总量、店配机构、近7日机构订单排名、近7日订单完成率、订单列表、近7日订单价格区间、近半年商品数量排名、近半年订单销售额
    getData() {
      return Service.getData().then((res) => {
        let data = res.data.list

        this.countOfAllData.order = data.orderTotal
        this.countOfAllData.store = data.drugStoreTotal

        this.orderSortOfSevenDays = {
          xAxis: data.custOrderSorts.map((item) => item.custName),
          data: data.custOrderSorts.map((item) => item.orderNum)
        }

        this.orderRateOfSevenDays = {
          complete: data.orderCompletion.completion,
          incomplete: data.orderCompletion.incomplete
        }

        this.orderList = data.orderLists

        this.orderPriceOfSevenDays = {
          xAxis: data.orderPriceSections.map((item) => item.sectionType),
          data: data.orderPriceSections.map((item) => {
            return {
              name: item.sectionType,
              value: item.sectionNum
            }
          })
        }

        this.goodsOfHalfYear = {
          xAxis: data.orderGoodsSorts.map((item) => item.goodsName),
          data: data.orderGoodsSorts.map((item) => item.goodsNum)
        }

        this.orderSaleOfHalfYear = {
          xAxis: data.orderSales.map((item) => item.month),
          data: data.orderSales.map((item) => item.priceTotal)
        }
      })
    },
    // 近7天处方量统计
    getPreCountOfSevenDays() {
      return Service.getPreCountOfSevenDays().then((res) => {
        let xAxis = res.data.list.map((item) => item.date)
        let data = res.data.list.map((item) => item.count)
        this.preCountOfSevenDays = {
          xAxis,
          data
        }
      })
    },
    // 近7天机构处方排名
    getPreSortOfSevenDays() {
      return Service.getPreSortOfSevenDays().then((res) => {
        let xAxis = res.data.list.map((item) => item.name)
        let data = res.data.list.map((item) => item.count)
        this.PreSortOfSevenDays = {
          xAxis,
          data
        }
      })
    },
    // 近7天处方诊断关键词
    getPreDiagnosisKeyOfSevenDays() {
      return Service.getPreDiagnosisKeyOfSevenDays().then((res) => {
        let data = res.data.list.map((item) => {
          return {
            name: item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name,
            value: item.count
          }
        })
        this.PreDiagnosisKeyOfSevenDays = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-bg-style {
  background: #000a3b !important;
  color: #fff;
}

.screen-header {
  background: url('../assets/img/sreen_title_bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 1%;
}
.screen-title {
  margin: 0 auto;
  font-size: 26px;
  font-weight: bold;
  color: rgba(1, 196, 247, 1);
  line-height: 28px;
}

.gradient-title {
  background: linear-gradient(0deg, rgba(4, 119, 213, 1) 0%, rgba(1, 217, 254, 1) 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
