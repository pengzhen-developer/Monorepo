<template>
  <div class="q-pa-lg full-height service-page">
    <el-button type="primary"
               icon="el-icon-arrow-left"
               @click="back">返回上一页</el-button>
    <div class="q-my-md text-primary text-subtitle1">
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
      <p class="text-grey-333 text-weight-bold text-subtitle1">{{this.data.hospitalName}}</p>
      <div class="row q-col-gutter-md">
        <div class="col-6"
             v-for="item in list"
             v-bind:key="item.id">
          <div class="column q-pa-md service-card">

            <p class="text-grey-333 text-weight-bold text-subtitle1">{{item.serviceName}}</p>

            <div class="column q-pa-sm bg-white"
                 style="min-height: 140px;">
              <div class="row justify-between items-center q-mb-sm">

                <div class="items-center">
                  <span v-bind:style="{ color: serviceStatusTitleColor(item.isOpen), 'line-height': '26px'}">使用状态：</span>
                  <span v-bind:style="{ color: serviceStatusTextColor(item.isOpen) }"
                        class="q-mr-md">{{serviceStatusText(item.isOpen)}}</span>
                </div>

                <el-button type="text"
                           style="font-size: 16px;padding-right: 4px !important;"
                           class="primary-light-1"
                           v-on:click="editDetail(item)">设置</el-button>
              </div>

              <div v-if="serviceAccessModeArr(item.accessModeArr).length > 0"
                   class="row no-wrap items-start q-mb-sm">
                <span class="level-title-style">对接方式：</span>
                <div class="row"
                     style="width: 250px;">
                  <el-checkbox v-for="access in serviceAccessModeArr(item.accessModeArr)"
                               v-model="access.checked"
                               :true-label="1"
                               :false-label="0"
                               :key="access.id">{{access.name}}</el-checkbox>
                </div>
              </div>

              <div v-if="serviceAccessModeArr(item.serviceContentArr).length > 0"
                   class="row no-wrap items-start q-mb-xs">
                <span class="level-title-style">服务内容：</span>
                <div class="row"
                     style="width: 250px;">
                  <el-checkbox v-for="service in serviceAccessModeArr(item.serviceContentArr)"
                               size="mini"
                               class="q-mb-md"
                               v-model="service.checked"
                               :true-label="1"
                               :false-label="0"
                               :key="service.id">{{service.name}}</el-checkbox>
                </div>
              </div>

            </div>

            <el-button type="text"
                       class="service-detail-button"
                       v-on:click="serviceDetail(item)">服务详情<i class="el-icon-arrow-right el-icon--right"></i></el-button>

          </div>

        </div>
      </div>
    </div>

    <div class="payment-service">

      <div class="q-my-md text-primary text-subtitle1">
        <i class="el-icon-s-unfold"></i>
        支付服务
      </div>

      <div class="row service-table">

        <div class="row col-12 service-table-header">
          <div class="row col-3 service-table-cell">服务名称</div>
          <div class="row col-9 service-table-cell">
            <div class="col-11 offset-1 text-left">配置</div>
          </div>
        </div>

        <div class="row col-12 service-table-col">
          <div class="col-3 service-table-cell">商保</div>
          <div class="col-9 service-table-cell">
            <div class="row payment-info">
              <div class="col-3 offset-1 text-left">
                状态：
                <el-switch v-show="commercialEdit"
                           :active-value="1"
                           :inactive-value="0"
                           v-model="commercialInsurance.checked"></el-switch>
                {{commercialInsurance.checked ? '使用':'未使用'}}
              </div>
              <div class="col-6 payment-config">
                <div>已选：</div>
                <div v-show="commercialEdit">
                  <el-checkbox-group v-model="commercialInsurance.selected">
                    <el-checkbox v-for="(value, label) in CONSTANT.ENUM_COMMERICAL_CONFIG"
                                 v-bind:key="value"
                                 v-bind:label="value">{{label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-show="!commercialEdit">{{commercialText}}</div>
              </div>
              <div class="col-2">
                <el-button v-show="!commercialEdit"
                           type="primary"
                           plain
                           @click="openCommercialEdit">编辑</el-button>
                <el-button v-show="commercialEdit"
                           type="primary"
                           :loading="commercialLoading"
                           @click="updateCommercialInsuranceConfig">保存</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="row col-12 service-table-col">
          <div class="col-3 service-table-cell">医保</div>
          <div class="col-9 service-table-cell">
            <div class="row payment-info">
              <div class="col-3 offset-1 text-left">
                状态：
                <el-switch v-show="medicalEdit"
                           :active-value="1"
                           :inactive-value="0"
                           v-model="medicalInsurance.checked"></el-switch>
                {{medicalInsurance.checked ? '使用':'未使用'}}
              </div>
              <div class="col-6 payment-config">
                <div>已选：</div>
                <div v-show="medicalEdit">
                  <el-checkbox-group v-model="medicalInsurance.selected">
                    <el-checkbox v-for="(value, label) in CONSTANT.ENUM_MEDICAL_CONFIG"
                                 v-bind:key="value"
                                 v-bind:label="value">{{label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-show="!medicalEdit">{{medicalText}}</div>
              </div>
              <div class="col-2">
                <el-button v-show="!medicalEdit"
                           type="primary"
                           plain
                           @click="openMedicalEdit">编辑</el-button>
                <el-button v-show="medicalEdit"
                           type="primary"
                           :loading="medicalLoading"
                           @click="updateMedicalInsuranceConfig">保存</el-button>
              </div>
            </div>
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
import CONSTANT from '../constant'
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
      this.getPaymentConfig()
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
      return this.list.length === 0 && !this.isLoading
    },
    commercialText() {
      let arr = this.commercialInsurance.selected.map((item) => {
        return Object.keys(CONSTANT.ENUM_COMMERICAL_CONFIG).find((key) => CONSTANT.ENUM_COMMERICAL_CONFIG[key] === item)
      })
      return arr.length > 0 ? arr.join('，') : '——'
    },
    medicalText() {
      let arr = this.medicalInsurance.selected.map((item) => {
        return Object.keys(CONSTANT.ENUM_MEDICAL_CONFIG).find((key) => CONSTANT.ENUM_MEDICAL_CONFIG[key] === item)
      })
      return arr.length > 0 ? arr.join('，') : '——'
    }
  },
  data() {
    return {
      CONSTANT,

      isLoading: true,
      list: [],
      dialog: {
        visible: false,
        data: {}
      },

      // 商保配置
      commercialLoading: false,
      commercialEdit: false,
      commercialInsurance: {
        checked: 0,
        selected: []
      },
      // 医保配置
      medicalLoading: false,
      medicalEdit: false,
      medicalInsurance: {
        checked: 0,
        selected: []
      }
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
        { serviceName: '处方管理医院端', serviceType: 3, tagName: '10533' },
        { serviceName: '合理用药管理', serviceType: 2, tagName: '10528' },
        { serviceName: '药品供应管理端', serviceType: 4, tagName: '10534' }
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
        case 3:
          Peace.cache.sessionStorage.set('10533-custcode', params.custCode)
          this.addTab(tab)
          break
        case 4:
          Peace.cache.sessionStorage.set('10534-custcode', params.custCode)
          Peace.cache.sessionStorage.set('10534-role', params.role)
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
    // 获取支付服务配置
    getPaymentConfig(type = 'all') {
      let params = {
        accountId: this.data.id
      }
      Service.getPaymentConfig(params)
        .then((res) => {
          if (type === 'all' || type === 'commercial') {
            this.commercialInsurance.checked = res.data.commercialInsuranceConfig?.status ?? 0
            this.commercialInsurance.selected = res.data.commercialInsuranceConfig?.insuranceType?.split(',') ?? []
          }

          if (type === 'all' || type === 'medical') {
            this.medicalInsurance.checked = res.data.medicalInsuranceConfig?.status ?? 0
            this.medicalInsurance.selected = res.data.medicalInsuranceConfig?.insuranceType?.split(',') ?? []
          }
        })
        .finally(() => {})
    },
    // 打开商保编辑
    openCommercialEdit() {
      if (this.medicalEdit) {
        this.$message.warning('请先完成医保操作')
        return false
      }

      if (!this.medicalInsurance.checked) {
        this.commercialEdit = true
      } else {
        this.$message.warning('目前商保、医保只支持同时开通一个')
      }
    },
    // 更新商保配置
    updateCommercialInsuranceConfig() {
      if (this.medicalInsurance.checked) {
        this.$message.warning('目前商保、医保只支持同时开通一个')
        return false
      }

      if (this.commercialInsurance.checked && this.commercialInsurance.selected.length === 0) {
        this.$message.warning('必须选择一个商保服务')
        return false
      }

      this.commercialLoading = true

      let params = {
        accountId: this.data.id,
        status: this.commercialInsurance.checked, // 0未使用 1使用
        insuranceType: this.commercialInsurance.selected.join(',') //1犇思 2珮文，多选逗号隔开
      }

      Service.updateCommercialInsuranceConfig(params)
        .then((res) => {
          this.$message.success(res.msg)
        })
        .finally(() => {
          this.getPaymentConfig('commercial')
          this.commercialEdit = false
          this.commercialLoading = false
        })
    },
    // 打开医保编辑
    openMedicalEdit() {
      if (this.commercialEdit) {
        this.$message.warning('请先完成商保操作')
        return false
      }

      if (!this.commercialInsurance.checked) {
        this.medicalEdit = true
      } else {
        this.$message.warning('目前商保、医保只支持同时开通一个')
      }
    },
    // 更新医保配置
    updateMedicalInsuranceConfig() {
      if (this.commercialInsurance.checked) {
        this.$message.warning('目前商保、医保只支持同时开通一个')
        return false
      }

      if (this.medicalInsurance.checked && this.medicalInsurance.selected.length === 0) {
        this.$message.warning('必须选择一个医保服务')
        return false
      }

      this.medicalLoading = true

      let params = {
        accountId: this.data.id,
        status: this.medicalInsurance.checked, // 0未使用 1使用
        insuranceType: this.medicalInsurance.selected.join(',') // 1统筹医保 2个人医保，多选逗号隔开
      }

      Service.updateMedicalInsuranceConfig(params)
        .then((res) => {
          this.$message.success(res.msg)
        })
        .finally(() => {
          this.getPaymentConfig('medical')
          this.medicalEdit = false
          this.medicalLoading = false
        })
    },
    back() {
      this.$parent.toggleServiceDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.service-page {
  background-color: #ffffff;
}

.service-card {
  background-color: #f9f9f9;
  min-width: 400px;
  min-height: 257px;
  border-radius: 10px;

  span {
    font-size: 16px;
  }

  .level-title-style {
    flex: none;
    width: 80px;
    line-height: 22px;
    font-size: 16px;
  }

  ::v-deep .el-checkbox {
    pointer-events: none;
  }

  ::v-deep .el-checkbox__label {
    font-size: 16px;
    font-weight: 400;
    color: var(----q-color-grey-333) !important;
    opacity: 1;
  }

  .service-detail-button {
    text-align: left;
    font-size: 16px !important;
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
    font-size: 16px;
    color: var(--q-color-grey-999);
  }
}

.payment {
  &-service {
    margin-top: 28px;
    border-top: 1px solid #e8e8e8;
  }
  &-info {
    width: 100%;
  }
  &-config {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-checkbox {
      width: 120px;
      text-align: left;
      ::v-deep .el-checkbox__label {
        font-size: 16px;
      }
    }
  }
}

.service-table {
  margin-top: 20px;
  border-top: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  &-header {
    height: 54px;
    .service-table-cell {
      font-weight: 600;
    }
  }
  &-col {
    height: 132px;
  }
  &-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    font-size: 16px;
    font-weight: 400;
    color: #333;
    text-align: center;
    &.justify-start {
      justify-content: flex-start;
    }
  }
}
</style>
