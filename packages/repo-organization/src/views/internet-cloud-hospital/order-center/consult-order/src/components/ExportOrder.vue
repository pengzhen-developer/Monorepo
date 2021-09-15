<template>
  <div class="export-content">
    <el-form :model="exportModel"
             label-width="68px">
      <el-form-item label="订单状态">
        <el-select v-model="exportModel.inquiryStatus"
                   clearable
                   placeholder="全部">
          <el-option :key="'order' + item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_CONSULT_STATUS"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付状态">
        <el-select v-model="exportModel.orderStatus"
                   clearable
                   placeholder="全部">
          <el-option :key="'order' + item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_ORDER_PAY_STATUS"></el-option>
        </el-select>
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
      type: 'inquiry',
      exportModel: {
        hospitalId: '',
        patientName: '', // 患者姓名
        docName: '', //医生姓名
        inquiryStatus: '', //咨询订单状态
        orderStatus: '',
        startTime: '', // 开始时间
        endTime: '' // 结束时间
      },
      timeRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },
      source: {
        ENUM_CONSULT_STATUS: CONSTANT.ENUM_CONSULT_STATUS,
        ENUM_ORDER_PAY_STATUS: CONSTANT.ENUM_ORDER_PAY_STATUS
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
  created() {
    let info = Util.user.getHospitalInfo() ?? {}
    this.exportModel.hospitalId = info.id

    let query = Object.assign({}, this.query)
    const startTime = query.startdate
    const endTime = query.enddate
    const docName = query.doctorname
    const patientName = query.patientname
    this.timeRange = startTime && endTime ? [startTime, endTime] : []
    this.exportModel = Object.assign({}, this.exportModel, this.query, {
      startTime,
      endTime,
      docName,
      patientName
    })
  },
  methods: {
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
