<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <template v-if="returnVisitIsOpen === true">
        <div class="card card-search q-mb-md">
          <el-form inline
                   v-on:keyup.enter.native="getList()"
                   v-on:submit.native.prevent
                   label-width="auto"
                   label-position="left">

            <el-form-item>
              <span slot="label">
                <span>患者姓名</span>
                <span>：</span>
              </span>
              <el-input v-model.trim="model.patientName"
                        clearable
                        placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>医生姓名</span>
                <span>：</span>
              </span>
              <el-input v-model.trim="model.doctorName"
                        clearable
                        placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>订单状态</span>
                <span>：</span>
              </span>
              <el-select v-model="model.inquiryStatus"
                         clearable
                         placeholder="全部">
                <el-option :key="item.label"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in source.ENUM_RETURN_VISIT_STATUS"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>支付状态</span>
                <span>：</span>
              </span>
              <el-select v-model="model.orderStatus"
                         clearable
                         placeholder="请选择">
                <el-option :key="item.label"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in source.ENUM_ORDER_PAY_STATUS"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>下单日期</span>
                <span>：</span>
              </span>
              <peace-date-picker type="daterange"
                                 v-model="timeRange"
                                 start-placeholder="开始日期"
                                 end-placeholder="至今"
                                 :picker-options="pickerOptions"
                                 format="yyyy-MM-dd"
                                 value-format="yyyy-MM-dd"></peace-date-picker>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>复诊日期</span>
                <span>：</span>
              </span>
              <peace-date-picker type="daterange"
                                 start-placeholder="开始日期"
                                 end-placeholder="至今"
                                 v-model="bookTimeRange"
                                 :picker-options="bookPickerOptions"
                                 format="yyyy-MM-dd"
                                 value-format="yyyy-MM-dd"></peace-date-picker>
            </el-form-item>

            <el-form-item>
              <span slot="label">
                <span>二级科室</span>
                <span>：</span>
              </span>
              <el-select v-model="model.deptName"
                         clearable
                         placeholder="请选择">
                <el-option :key="item.deptId"
                           :label="item.netdeptChild"
                           :value="item.netdeptChild"
                           v-for="item in departmentList"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-button type="primary"
                         @click="getList()">查询</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="card">

          <div class="top-menu">
            <el-button type="default"
                       :loading="exportLoading"
                       @click="showExportModel">导出</el-button>
          </div>

          <PeaceTable ref="table"
                      style="width: 100%"
                      pagination>
            <PeaceTableColumn label="预约单号"
                              width="200"
                              prop="inquiryNo"></PeaceTableColumn>
            <PeaceTableColumn label="患者姓名"
                              min-width="100">
              <template slot-scope="scope">
                <span @click="toPatientPage(scope.row.familyId, scope.row.name, scope.row.patientNo	)"
                      class="primary">{{ scope.row.name	 }}</span>
              </template>
            </PeaceTableColumn>
            <PeaceTableColumn label="性别"
                              min-width="60"
                              prop="sex"></PeaceTableColumn>
            <PeaceTableColumn label="年龄"
                              min-width="90"
                              prop="age"></PeaceTableColumn>
            <PeaceTableColumn label="复诊时间"
                              min-width="185"
                              prop="returnVisitDate"></PeaceTableColumn>
            <PeaceTableColumn label="订单金额（元）"
                              min-width="135"
                              prop="orderAmount"></PeaceTableColumn>
            <PeaceTableColumn label="预约医生"
                              min-width="100"
                              prop="doctorName"></PeaceTableColumn>
            <PeaceTableColumn label="二级科室"
                              min-width="100"
                              prop="deptName"></PeaceTableColumn>
            <PeaceTableColumn label="订单状态"
                              min-width="120"
                              prop="inquiryStatus"></PeaceTableColumn>
            <PeaceTableColumn label="支付状态"
                              min-width="120"
                              prop="payStatus"></PeaceTableColumn>
            <PeaceTableColumn label="订单时间"
                              min-width="180"
                              prop="createTime"></PeaceTableColumn>
            <PeaceTableColumn fixed="right"
                              width="200"
                              label="操作">
              <template slot-scope="scope">
                <div class="align-left">
                  <el-button @click="getConsultOrderDetail(scope.row.inquiryNo)"
                             type="text">订单详情</el-button>
                  <el-button @click="getConsulRecord(scope.row.inquiryNo)"
                             type="text">问诊详情</el-button>
                </div>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>

        <!-- 复诊订单详情 -->
        <PeaceDialog :visible.sync="orderDetailDialog.visible"
                     title="复诊订单详情"
                     v-if="orderDetailDialog.visible"
                     width="500px">
          <PeaceOrderInquiryDetail v-bind:data="orderDetailDialog.data"
                                   v-bind:type="'returnVisit'"></PeaceOrderInquiryDetail>
        </PeaceDialog>
        <PeaceDialog title="复诊记录"
                     v-if="dialogVisible"
                     v-bind:visible.sync="dialogVisible">
          <PeaceIMMessageHistory v-bind:data="currentInquiry.msgInfo"
                                 v-bind:messageFlowIn="currentInquiry.doctorInfo"
                                 v-bind:messageFlowOut="currentInquiry.patientInfo"></PeaceIMMessageHistory>
        </PeaceDialog>

      </template>
      <template v-else-if="returnVisitIsOpen === false">
        <div class="bg-white full-height q-pa-lg">
          <return-visit-open></return-visit-open>
        </div>
      </template>
      <template v-else>
        <div class="flex bg-white full-height"
             :v-loading="true">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import ReturnVisitOpen from './components/ReturnVisitOpen'
import { PeaceIMMessageHistory, PeaceOrderInquiryDetail } from 'peace-components'
import Util from '@src/util'

export default {
  name: 'ReturnVisitOrder',
  components: { ReturnVisitOpen, PeaceOrderInquiryDetail, PeaceIMMessageHistory },
  data() {
    return {
      returnVisitIsOpen: null,
      model: {
        patientName: '',
        doctorName: '',
        inquiryStatus: '',
        orderStatus: '',
        startTime: '',
        endTime: '',
        bookStart: '',
        bookEnd: '',
        deptName: ''
      },
      exportLoading: false,
      departmentList: [],
      timeRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },
      bookTimeRange: [],
      bookPickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      currentInquiry: {},
      dialogVisible: false,

      // 订单详情
      orderDetailDialog: {
        visible: false,
        data: {}
      },

      source: {
        ENUM_RETURN_VISIT_STATUS: CONSTANT.ENUM_RETURN_VISIT_STATUS,
        ENUM_ORDER_PAY_STATUS: CONSTANT.ENUM_ORDER_PAY_STATUS,
        ENUM_INQUIRY_TYPE: CONSTANT.ENUM_INQUIRY_TYPE
      }
    }
  },
  watch: {
    bookTimeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.bookStart = timeRange[0] ? timeRange[0] : ''
        this.model.bookEnd = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.bookStart = ''
        this.model.bookEnd = ''
      }
    },
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.startTime = timeRange[0] ? timeRange[0] : ''
        this.model.endTime = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.startTime = ''
        this.model.endTime = ''
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  created() {
    this.getDepartmentList()
  },
  async mounted() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen()
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getList()
      })
    }
  },
  async activated() {
    let checkReturnVisitOpen = await Service.checkReturnVisitOpen({})
    let returnVisitList = checkReturnVisitOpen.data.list
    this.returnVisitIsOpen = returnVisitList.isOpen == 1 ? true : false

    if (this.returnVisitIsOpen) {
      this.$nextTick().then(() => {
        this.getList()
      })
    }
  },
  methods: {
    getList() {
      const fetch = Service.getReturnVisitOrderList
      let params = Peace.util.deepClone(this.model)
      params.startTime = params.startTime ? params.startTime + ' 00:00:00' : ''
      params.endTime = params.endTime ? params.endTime + ' 23:59:59' : ''

      params.bookStart = params.bookStart ? params.bookStart + ' 00:00:00' : ''
      params.bookEnd = params.bookEnd ? params.bookEnd + ' 23:59:59' : ''

      this.$refs.table.reloadData({ fetch, params })
    },
    // 获取科室列表
    getDepartmentList() {
      Service.getDepartmentList().then((res) => {
        this.departmentList = (res.data && res.data.list) || []
      })
    },
    // 订单信息
    getConsultOrderDetail(inquiryNo) {
      Service.getConsultOrderDetail({ inquiry_no: inquiryNo }).then((res) => {
        this.orderDetailDialog.data = res.data
        this.orderDetailDialog.visible = true
      })
    },
    getConsulRecord(id) {
      Service.getConsulRecord({ inquiryNo: id }).then((res) => {
        const data = res.data
        if (data.msgInfo.length > 0) {
          this.currentInquiry = data
          this.dialogVisible = true
        } else {
          const msg = data.msg ? data.msg : '暂无问诊记录'
          Peace.util.error(msg)
        }
      })
    },
    toPatientPage(id, name, patientNo) {
      this.$router.push({
        path: '/internet-cloud-hospital/patient-management/patient-detail',
        query: { id, patientNo, name, type: 'inquiry' }
      })
    },
    showExportModel() {
      const info = Util.user.getHospitalInfo() ?? {}

      let params = Peace.util.deepClone(this.model)
      params.type = 'returnVisit'
      params.hospitalId = info.id
      params.startTime = params.startTime ? params.startTime + ' 00:00:00' : ''
      params.endTime = params.endTime ? params.endTime + ' 23:59:59' : ''
      params.bookStart = params.bookStart ? params.bookStart + ' 00:00:00' : ''
      params.bookEnd = params.bookEnd ? params.bookEnd + ' 23:59:59' : ''

      this.exportLoading = true
      Service.isExistList(params)
        .then(() => {
          Service.exportOrder(params).finally(() => {
            this.exportLoading = false
          })
        })
        .catch(() => {
          this.exportLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}
.primary {
  color: var(--q-color-primary);
  cursor: pointer;
}
.list {
  padding-top: 0;
  .align-left {
    width: 100%;
    text-align: left;
  }
  .el-button {
    margin-right: 10px;
  }
  span {
    vertical-align: middle;
  }
}
.private {
  position: relative;
  padding: 0 20px;
  &-tag {
    position: absolute;
    top: 3px;
    left: 3px;
    margin-right: 3px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    background-color: var(--q-color-primary);
  }
}
</style>
