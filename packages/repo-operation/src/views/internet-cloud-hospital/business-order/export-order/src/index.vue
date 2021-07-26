<template>
  <div class="export-content">
    <el-form :model="exportModel"
             label-width="68px">
      <el-form-item label="机构名称">
        <el-select v-model="exportModel.orgName"
                   clearable=""
                   placeholder="全部">
          <el-option :key="index"
                     :label="item.orgName"
                     :value="item.orgName"
                     v-for="(item, index) in orgNameList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="药    店"
                    v-if="type === 'drug'">
        <el-select v-model="exportModel.drugstore"
                   clearable=""
                   placeholder="全部">
          <el-option :key="index"
                     :label="item.drugStoreName"
                     :value="item.drugStoreName"
                     v-for="(item, index) in drugstoreList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="咨询类型"
                    v-if="type === 'inquiry'">
        <el-select v-model="exportModel.orderType"
                   clearable=""
                   placeholder="全部">
          <el-option :key="'order' + item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in inquiryType"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="配送方式"
                    v-if="type === 'drug'">
        <el-select v-model="exportModel.sendType"
                   clearable=""
                   placeholder="全部">
          <el-option :key="'order' + item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ShippingMethod"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="type === 'drug' ? '订单状态':'支付状态'">
        <el-select v-model="exportModel.orderStatus"
                   clearable=""
                   placeholder="全部"
                   v-bind:disabled="type==='drug'&&!exportModel.sendType">
          <el-option :key="'order' + item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in orderStatus"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单状态"
                    v-if="type === 'inquiry' || type ==='returnVisit'">
        <el-select v-model="exportModel.inquiryStatus"
                   clearable=""
                   placeholder="全部">
          <el-option :key="'order' + item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in inquiryStatus"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="支付类型"
                    v-if="type == 'drug'">
        <el-select v-model="exportModel.payType"
                   placeholder="请选择">
          <el-option label="全部"
                     value=""></el-option>
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in payTypeList"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="下单日期">
        <PeaceDatePicker v-model="exportModel.time"
                         type="daterange"
                         start-placeholder="开始日期"
                         end-placeholder="至今"
                         value-format="yyyy-MM-dd"
                         :picker-options="pickerOptions">
        </PeaceDatePicker>
      </el-form-item>
      <el-form-item label-width="0"
                    style="padding-top:12px; text-align: center;">
        <el-button type="primary"
                   @click="exportOrder">确认导出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'
export default {
  name: 'export-order',
  props: {
    type: {
      type: String
    },
    query: {
      type: Object
    }
  },
  data() {
    return {
      exportModel: {
        orgName: '', // 订单渠道
        orderType: '', // 咨询类型

        orderStatus: '', // 订单状态

        inquiryStatus: '', // 咨询状态

        sendType: '', //配送类型
        time: [],

        startTime: '', // 开始时间
        endTime: '', // 结束时间

        drugstore: '', // 药店
        payType: '' // 支付类型
      },
      orgNameList: [],
      drugstoreList: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },
      source: {
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: []
      }
    }
  },
  watch: {
    ['exportModel.time']() {
      this.exportModel.startTime = this.exportModel.time ? this.exportModel.time[0] : ''
      this.exportModel.endTime = this.exportModel.time ? this.exportModel.time[1] : ''
    }
  },
  computed: {
    payTypeList() {
      return Constant.PAYMENT_STATUS
    },
    inquiryType() {
      return Constant.ORDER_INQUIRY_TYPE
    },
    orderStatus() {
      if (this.type === 'inquiry' || this.type === 'returnVisit') {
        // 咨询返回订单支付状态
        return Constant.OEDER_STATUS
      } else {
        if (this.exportModel.sendType === '0') {
          //自提 订单状态
          return this.source.SelfOrderStatus
        } else if (this.exportModel.sendType === '1') {
          //配送 订单状态
          return this.source.DistributionOrderStatus
        }
        // 购药返回订单状态
        return []
      }
    },
    inquiryStatus() {
      if (this.type === 'returnVisit') {
        return Constant.RETURN_VISIT_STATUS
      } else {
        return Constant.INQUIRY_STATUS
      }
    }
  },
  async created() {
    this.getCondition()
    if (this.type === 'drug') {
      // 配送方式
      this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')
      // 购药订单状态
      this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
      this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')
    }
    this.exportModel = Object.assign({}, this.exportModel, this.query)
    if (this.type === 'drug') {
      this.exportModel.sendType = this.query.orderType
      this.exportModel.orderType = ''
    }
  },
  methods: {
    // 获取筛选条件数据
    getCondition() {
      if (this.type === 'drug') {
        Service.getCondition({}).then((res) => {
          this.orgNameList = res.data.orgInfo || []
          this.drugstoreList = res.data.drugData || []
        })
      } else {
        Service.getAllHospitalList({}).then((res) => {
          this.orgNameList = res.data || []
        })
      }
    },
    exportOrder() {
      let params = Object.assign({}, this.exportModel, { type: this.type })
      // if (this.type === 'drug' && params.orderStatus === '') {
      //   //99 查全部
      //   params.orderStatus = 99
      // }
      Service.checkOrder(params).then(() => {
        Service.exportOrder(params)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.export-content {
  padding: 10px;
}

.el-select {
  width: 100%;
}

::v-deep .el-form-item--mini .el-form-item__label {
  text-align: justify;
  text-align-last: justify;
}
//导出弹框宽度固定，故调整
.el-range-editor:not(.element-ui-default).el-range-editor--mini.el-date-editor--daterange.el-input__inner {
  width: 300px;
}
::v-deep .el-range-editor:not(.element-ui-default).el-range-editor--mini .el-range-input {
  width: 120px;
}
</style>
