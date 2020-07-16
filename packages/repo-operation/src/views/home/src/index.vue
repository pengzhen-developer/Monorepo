<template>
  <div class="full-width full-height">
    <div v-show="!showDataScreen" class="full-width full-height home_bg_style">
      <div class="row q-col-gutter-x-md">
        <div class="col-4 col-lg-4 col-md-6 col-sm-12">
          <todo-list class="q-mb-md"></todo-list>
          <prescription-count-chart class="q-mb-md"></prescription-count-chart>
          <order-count-chart></order-count-chart>
        </div>
        <div class="col-8 col-lg-8 col-md-6 col-sm-12 ">
          <data-overview class="q-mb-md"></data-overview>
          <ware-house-map></ware-house-map>
        </div>
      </div>
    </div>
    <data-screen v-show="showDataScreen"></data-screen>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import PrescriptionCountChart from './components/PrescriptionCountChart'
import OrderCountChart from './components/OrderCountChart'
import DataOverview from './components/DataOverview'
import WareHouseMap from './components/WareHouseMap'
import DataScreen from './components/DataScreen'

export default {
  components: {
    DataScreen,
    WareHouseMap,
    DataOverview,
    PrescriptionCountChart,
    OrderCountChart,
    TodoList,
  },

  inject: ['provideToggleDrawer'],

  data() {
    return {
      showDataScreen: false,
    }
  },

  computed: {
    toggleDrawer() {
      return this.provideToggleDrawer(false)
    },
  },

  methods: {
    toggleDataScreen() {
      this.showDataScreen = !this.showDataScreen
    },
  },
}
</script>

<style lang="scss" scoped>
.home_bg_style {
  background: #f5f5f5 !important;
}
</style>
