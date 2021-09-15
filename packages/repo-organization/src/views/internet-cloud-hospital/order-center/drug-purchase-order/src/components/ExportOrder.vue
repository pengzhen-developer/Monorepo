<template>
  <div class="export-content">
    <el-form :model="exportModel"
             label-width="68px">

      <el-form-item label="药    店">
        <el-select v-model="exportModel.drugstore"
                   clearable
                   placeholder="全部">
          <el-option :key="index"
                     :label="item.drugStoreName"
                     :value="item.drugStoreName"
                     v-for="(item, index) in drugstoreList"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="支付类型">
        <el-select v-model="exportModel.payType"
                   clearable
                   placeholder="全部">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_PAYMENT"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="配送类型">
        <el-select v-model="exportModel.sendType"
                   placeholder="全部"
                   v-on:change="exportModel.orderStatus = ''"
                   clearable>
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ShippingMethod"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <!-- 自提 -->
        <template v-if="exportModel.sendType === '0'">
          <el-select v-model="exportModel.orderStatus"
                     clearable
                     placeholder="全部">
            <el-option :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.SelfOrderStatus"></el-option>
          </el-select>
        </template>
        <!-- 配送 -->
        <template v-else-if="exportModel.sendType === '1'">
          <el-select v-model="exportModel.orderStatus"
                     clearable
                     placeholder="全部">
            <el-option :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.DistributionOrderStatus"></el-option>
          </el-select>
        </template>
        <!-- 未选择 -->
        <template v-else>
          <el-select v-model="exportModel.orderStatus"
                     disabled
                     placeholder="全部"></el-select>
        </template>
      </el-form-item>

      <el-form-item label="下单日期">
        <PeaceDatePicker class="export-date-range"
                         type="daterange"
                         v-model="timeRange"
                         :picker-options="pickerOptions"
                         format="yyyy-MM-dd"
                         value-format="yyyy-MM-dd"></PeaceDatePicker>
      </el-form-item>
      <el-form-item label-width="0"
                    style="text-align: center;">
        <el-button type="primary"
                   class="export"
                   @click="exportOrder">确认导出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'
import Util from '@src/util'

export default {
  name: 'ExportOrder',
  props: {
    query: {
      type: Object
    }
  },
  data() {
    return {
      type: 'drug',
      exportModel: {
        hospitalId: '',
        patientName: '', // 患者姓名
        drugstore: '', // 药店
        payType: '', // 支付类型
        orderStatus: '',
        sendType: '', // 配送类型
        startTime: '', // 开始时间
        endTime: '' // 结束时间
      },
      timeRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },
      drugstoreList: [],
      source: {
        ENUM_PAYMENT: CONSTANT.ENUM_PAYMENT,
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: []
      }
    }
  },
  watch: {
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.exportModel.startTime = timeRange[0] ? timeRange[0] : ''
        this.exportModel.endTime = timeRange[1] ? timeRange[1] : ''
      } else {
        this.exportModel.startTime = ''
        this.exportModel.endTime = ''
      }
    }
  },
  async created() {
    let info = Util.user.getHospitalInfo() ?? {}
    this.exportModel.hospitalId = info.id

    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')

    // 订单状态
    this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
    this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')

    this.getDocStoreList()
    const startTime = this.query.startTime
    const endTime = this.query.endTime
    const patientName = this.query.patientName
    this.timeRange = this.query.startTime && this.query.endTime ? [this.query.startTime, this.query.endTime] : []
    this.exportModel = Object.assign({}, this.exportModel, this.query, {
      startTime,
      endTime,
      patientName
    })
  },
  methods: {
    // 获取筛选条件数据
    getDocStoreList() {
      Service.getDocStoreList({ type: this.type }).then((res) => {
        this.drugstoreList = res.data.drugData || []
      })
    },
    exportOrder() {
      let startTime = this.exportModel.startTime ? this.exportModel.startTime + ' 00:00:00' : ''
      let endTime = this.exportModel.endTime ? this.exportModel.endTime + ' 23:59:59' : ''
      let params = Object.assign({}, this.exportModel, { type: this.type, startTime, endTime })

      Service.isExistList(params).then(() => {
        Service.exportOrder(params)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

::v-deep .el-form-item--mini .el-form-item__label {
  text-align: justify;
  text-align-last: justify;
}

.export-date-range.el-range-editor:not(.element-ui-default).el-range-editor--mini.el-range-editor.el-input__inner {
  width: 100%;
}
.export-date-range.el-range-editor:not(.element-ui-default).el-range-editor--mini ::v-deep.el-range-input {
  width: 120px;
}
</style>
