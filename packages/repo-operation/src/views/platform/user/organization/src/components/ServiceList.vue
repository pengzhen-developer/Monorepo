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

            <div class="column q-pa-sm bg-white">
              <div class="row justify-between items-center q-mb-sm">

                <div class="items-center">
                  <span v-bind:style="{ color: serviceStatusTitleColor(item.isOpen), 'line-height': '26px'}">使用状态：</span>
                  <span v-bind:style="{ color: serviceStatusTextColor(item.isOpen) }"
                        class="q-mr-md">{{serviceStatusText(item.isOpen)}}</span>
                </div>

                <el-button type="text"
                           style="padding-right: 4px !important;"
                           class="primary-light-1"
                           v-on:click="editDetail(item)">设置</el-button>
              </div>

              <div v-if="serviceAccessModeArr(item.accessModeArr).length > 0"
                   class="row items-start q-mb-sm">
                <span class="level-title-style">对接方式：</span>
                <el-checkbox v-for="access in serviceAccessModeArr(item.accessModeArr)"
                             v-model="access.checked"
                             :true-label="1"
                             :false-label="0"
                             :key="access.id">{{access.name}}</el-checkbox>
              </div>

              <div v-if="item.serviceContentArr && item.serviceContentArr.length > 0"
                   class="row q-mb-xs">
                <span class="level-title-style">服务内容：</span>
                <el-checkbox v-for="service in serviceAccessModeArr(item.serviceContentArr)"
                             size="mini"
                             v-model="service.checked"
                             :true-label="1"
                             :false-label="0"
                             :key="service.id">{{service.name}}</el-checkbox>
              </div>

            </div>

            <el-button type="text"
                       v-show="showSerice(item)"
                       class="service-detail-button"
                       v-on:click="serviceDetail(item)">服务详情<i class="el-icon-arrow-right el-icon--right"></i></el-button>

          </div>

        </div>
      </div>
    </div>

    <edit-service @updateServiceList="getService"
                  v-model="dialog.visible"
                  v-bind:data="dialog.data"></edit-service>
  </div>
</template>

<script>
import Service from './../service'
import EditService from './EditService'

export default {
  inject: ['provideAddTab', 'provideGetTab'],

  props: {
    data: Object
  },

  components: {
    EditService
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
      list: [],
      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  methods: {
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
    serviceAccessModeArr(list) {
      const tmp = list.filter(function (item) {
        return item.checked === 1
      })
      return tmp
    },
    serviceDetail(params) {
      const configMap = [
        { serviceName: '互联网医院管理端', serviceType: 1, tagName: '10524' },
        { serviceName: '处方管理医院端', serviceType: 3, tagName: '999-3' },
        { serviceName: '合理用药管理', serviceType: 2, tagName: '10528' },
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
    editDetail(item) {
      this.dialog.visible = true
      this.dialog.data = {
        accountId: this.data.id,
        ...item
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

  .level-title-style {
    line-height: 22px;
    font-size: 12px;
  }

  ::v-deep .el-checkbox {
    pointer-events: none;
  }

  ::v-deep .el-checkbox__label {
    font-size: 12px;
    font-weight: 400;
    color: var(----q-color-grey-333) !important;
    opacity: 1;
  }

  .service-detail-button {
    text-align: left;
    font-size: 12px !important;
    margin-top: 4px;
    padding-left: 4px !important;
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
