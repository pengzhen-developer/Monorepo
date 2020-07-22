<template>
  <div class="q-ma-md full-height">
    <el-button type="primary"
               plain
               @click="back">返回上一级</el-button>
    <div class="q-my-md text-primary">
      <i class="el-icon-s-unfold"></i>
      已开通的服务
    </div>
    <div class="no-data"
         v-if="isEmpty">
      <el-image class="image q-mr-md"
                v-bind:src="require('../assets/image/nodata.png')"> </el-image>
      <span>暂未开通任何服务</span>
    </div>
    <div v-else>
      <p class="text-grey-333 text-weight-bold">{{this.data.hospitalName}}</p>
      <div class="row q-col-gutter-md">
        <div class="col-sm-12 col-md-6 col-lg-4"
             v-for="item in list"
             v-bind:key="item.id">
          <div class="column q-pa-md service-card">
            <p class="text-grey-333 text-weight-bold">{{item.serviceName}}</p>
            <div class="row justify-between items-center">
              <div class="items-center">
                <span v-bind:style="{ color: serviceStatusTitleColor(item.isOpen), 'line-height': '26px'}">使用状态：</span>
                <span v-bind:style="{ color: serviceStatusTextColor(item.isOpen) }"
                      class="q-mr-md">{{serviceStatusText(item.isOpen)}}</span>
                <el-switch v-model="item.isOpen"
                           :active-value="2"
                           :inactive-value="1"
                           active-color="#3099A6"
                           inactive-color="#999999"
                           v-on:change="changeValue(item)"></el-switch>
              </div>
              <el-button type="text"
                         class="primary-light-1"
                         v-show="showSerice(item)"
                         @click="serviceDetail(item)">服务详情<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './../service'
import Peace from '@/src/library'

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
    },

    isEmpty() {
      return this.list.length === 0
    }
  },
  data() {
    return {
      isLoading: false,
      list: []
    }
  },

  methods: {
    changeValue(item) {
      const message = item.isOpen === 1 ? '确定禁用该服务？' : '确定开启该服务？'

      this.$confirm(message, '提示')
        .then(() => {
          const params = {
            accountId: this.data.id,
            accountServiceId: item.serviceId,
            isOpen: item.isOpen
          }

          Service.operateService(params).then((res) => {
            Peace.util.success(res.msg)
            this.getService()
          })
        })
        .catch(() => {
          item.isOpen = item.isOpen === 1 ? 2 : 1
        })
    },
    showSerice(item) {
      if (item.serviceType == 1 || item.serviceType == 2) {
        return true
      } else {
        return false
      }
    },
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
      return code == 1 ? '已禁用' : '已启用'
    },
    serviceStatusTextColor(code) {
      return code == 1 ? '#999999' : '#3099A6'
    },
    serviceStatusTitleColor(code) {
      return code == 1 ? '#999' : '#333'
    },

    serviceDetail(params) {
      const configMap = [
        { serviceName: '互联网医院管理端', serviceType: 1, tagName: '999-1' },
        { serviceName: '处方管理医院端', serviceType: 3, tagName: '999-3' },
        { serviceName: '合理用药管理', serviceType: 2, tagName: '22-1' },
        { serviceName: '药品供应管理端', serviceType: 4, tagName: '999-4' }
      ]
      const tagName = configMap.find((item) => item.serviceType == params.serviceType).tagName

      const tab = this.getTab(tagName)
      switch (params.serviceType) {
        case 1:
          tab.menuPath = tab.menuPath + `${params.hospitalId}`

          this.addTab(tab)
          break
        case 2:
          tab.menuPath = tab.menuPath + `?hospitalCode=${params.custCode}&hospitalName=${params.hospitalName}`

          this.addTab(tab)
          break
        default:
          break
      }
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
  min-width: 400px;
  border-radius: 10px;

  span {
    font-size: 12px;
  }
}

.no-data {
  width: 100% !important;
  display: flex;
  flex-direction: column;
  padding: 48px;
  text-align: center;

  .image {
    margin: 0 auto;
    width: 137px;
    height: 150px;
    margin-bottom: 24px;
  }

  span {
    font-size: 14px;
    color: var(--q-color-grey-999);
  }
}
</style>
