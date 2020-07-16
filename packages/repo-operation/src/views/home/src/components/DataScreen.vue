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
          <div class="col">
            <screen-prescription-count-chart></screen-prescription-count-chart>
          </div>
          <div class="col">
            <screen-order-list></screen-order-list>
          </div>
          <div class="col-4">
            <screen-hosptail-list></screen-hosptail-list>
          </div>
          <div class="col">
            <screen-prescription-count-chart></screen-prescription-count-chart>
          </div>
        </div>
        <div class="column col-6 q-col-gutter-y-md full-height">
          aa
        </div>
        <div class="column col-3  q-col-gutter-y-md full-height">
          aa
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

Vue.use(loading)

export default {
  name: 'data-screen',
  components: {
    ScreenPrescriptionCountChart,
    ScreenOrderList,
    ScreenHosptailList
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
