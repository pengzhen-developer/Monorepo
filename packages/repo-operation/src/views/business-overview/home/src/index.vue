<template>
  <div class="layout-route full-width full-height">
    <div class="full-width full-height">
      <div class="row q-col-gutter-x-md">
        <div class="col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <todo-list :data="todoList"
                     class="q-mb-md"></todo-list>
          <prescription-count-chart :data="preCountOfSevenDays"
                                    class="q-mb-md"></prescription-count-chart>
          <order-count-chart :data="orderNumOfSevenDays"></order-count-chart>
        </div>
        <div class="col-8 col-lg-8 col-md-6 col-sm-12 col-xs-12">
          <data-overview :data="overViewData"
                         class="q-mb-md"></data-overview>
          <ware-house-map :count="overViewData"
                          :map="mapData"></ware-house-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import PrescriptionCountChart from './components/PrescriptionCountChart'
import OrderCountChart from './components/OrderCountChart'
import DataOverview from './components/DataOverview'
import WareHouseMap from './components/WareHouseMap'

import Service from './service/index'
import OtherSerice from './service/data'
import CONSTANT from './constant'

export default {
  components: {
    WareHouseMap,
    DataOverview,
    PrescriptionCountChart,
    OrderCountChart,
    TodoList
  },

  data() {
    return {
      // 待办事项
      todoList: [],
      // 近7日处方量趋势
      preCountOfSevenDays: {
        xAxis: [],
        data: []
      },
      // 近七日订单量趋势
      orderNumOfSevenDays: {
        xAxis: [],
        data: []
      },
      // 数据总览
      overViewData: {
        prescription: 0, // 处方量
        order: 0, // 订单量
        medical: 0, // 医疗机构
        drugSupply: 0, // 药品供应机构
        store: 0, // 店配机构
        warehouse: 0 //仓配机构
      },
      // 多店云仓
      mapData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTodoList()
      this.getPreCountOfSevenDays()
      this.get7DaysOrderNum()
      this.getOverview()
      this.getMedicalNum()
      this.getPrescriptionCountOfAll()
      this.getDrugStoreList()
    })
  },

  methods: {
    // 获取待办事项列表
    getTodoList() {
      const params = {
        controlledType: 'operation-business-todo'
      }
      return Service.getControlledMenuList(params).then((res) => {
        this.todoList = res.data
      })
    },
    // 获取近7日处方量趋势
    getPreCountOfSevenDays() {
      return Service.preCountOfSevenDays().then((res) => {
        let data = res.data.list
        this.preCountOfSevenDays.xAxis = data.map((item) => item.date)
        this.preCountOfSevenDays.data = data.map((item) => item.count)
      })
    },
    // 获取近7日订单量趋势
    get7DaysOrderNum() {
      return Service.get7DaysOrderNum().then((res) => {
        let data = res.data.list
        this.orderNumOfSevenDays.xAxis = data.map((item) => item.Date)
        this.orderNumOfSevenDays.data = data.map((item) => item.Num)
      })
    },
    // 获取数据 订单量、药品供应机构、店配机构
    getOverview() {
      return Service.getOverview().then((res) => {
        this.overViewData.order = res.data.OrderNum
        this.overViewData.store = res.data.DrugShopNum
        this.overViewData.drugSupply = res.data.DrugSupplyNum
      })
    },
    // 获取数据  医疗机构、仓配机构
    getMedicalNum() {
      return OtherSerice.getMechanismCount().then((res) => {
        this.overViewData.medical = res.data.medicalInstitutionCount
        this.overViewData.warehouse = res.data.warehouseInstitutionCount
      })
    },
    // 获取处方量
    getPrescriptionCountOfAll() {
      return Service.prescriptionCountOfAll().then((res) => {
        this.overViewData.prescription = res.data
      })
    },
    // 获取多店云仓
    getDrugStoreList() {
      return Service.getDrugStoreList().then((res) => {
        this.mapData = this.convertData(res.data.list)
      })
    },
    convertData(data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const item = Object.assign({ City: '', CloudStoreNum: 0, DrugStoreNum: 0, FirstLonLat: '' }, data[i])
        const points = CONSTANT.cityData.find((city) => city.name == item.City)
        if (points) {
          res.push({
            name: item.City,
            value: [points.lng, points.lat, item.CloudStoreNum, item.DrugStoreNum]
          })
        }
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.home_bg_style {
  background: #f5f5f5 !important;
}
</style>
