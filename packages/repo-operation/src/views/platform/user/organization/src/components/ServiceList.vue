<template>
  <div class="q-ma-md full-height">
    <el-button type="primary"
               plain
               @click="back">返回上一级</el-button>
    <div class="q-my-md text-primary">
      <i class="el-icon-s-unfold"></i>
      已开通的服务
    </div>
    <p class="text-grey-333 text-weight-bold">{{this.data.hospitalName}}</p>
    <div class="row q-col-gutter-md">
      <div class="col-sm-12 col-md-6 col-lg-4"
           v-for="item in list"
           v-bind:key="item.id">
        <div class="column q-pa-md service-card">
          <p class="text-grey-333 text-weight-bold">{{item.serviceName}}</p>
          <div class="row justify-between items-center">
            <div class="items-center">
              <span v-bind:style="{ color: serviceStatusTitleColor(item.isPass), 'line-height': '26px'}">使用状态：</span>
              <span v-bind:style="{ color: serviceStatusTextColor(item.isPass) }"
                    class="q-mr-md">{{serviceStatusText(item.isPass)}}</span>
              <el-switch disabled="true"
                         v-model="item.isPass"
                         :active-value="2"
                         :inactive-value="1"
                         active-color="#3099A6"
                         inactive-color="#999999"></el-switch>
            </div>
            <el-button type="text"
                       @click="serviceDetail(item)">服务详情<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  inject: ['provideAddTab', 'provideGetTab'],

  props: {
    data: Object
  },

  filters: {},

  mounted() {
    this.$nextTick().then(() => {
      this.getService()
    })
  },

  computed: {
    addTab() {
      return this.provideAddTab
    },

    getTab() {
      return this.provideGetTab
    }
  },
  // [{
  // applyTime: "2020-07-09 19:40:32"
  // checkStatus: 3
  // checkTime: "2020-07-09 19:40:37"
  // code: 1
  // hospitalName: "的范德萨范德萨"
  // id: "vejluxpycw"
  // isPass: 2
  // role: 1
  // serviceId: "vbvbdfgdfd"
  // serviceName: "处方共享管理"
  // }]
  data() {
    return {
      isLoading: false,
      list: []
    }
  },

  methods: {
    getService() {
      this.isLoading = true
      const params = {
        accountId: this.data.id
      }

      Service.getService(params)
        .then((res) => {
          this.list = res.data.list
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    serviceStatusText(code) {
      return code == 1 ? '未开通' : '已开通'
    },
    serviceStatusTextColor(code) {
      return code == 1 ? '#999999' : '#3099A6'
    },
    serviceStatusTitleColor(code) {
      return code == 1 ? '#999' : '#333'
    },
    serviceDetail(params) {
      const tab = this.getTab('999-1')

      tab.menuPath = tab.menuPath + `${params.hospitalId}`

      this.addTab(tab)
    },
    back() {
      this.$parent.toggleServiceDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.service-card {
  background: #f4fafa;
  // height: 124px;
  min-width: 400px;
  border-radius: 10px;

  span {
    font-size: 12px;
  }
}
</style>
