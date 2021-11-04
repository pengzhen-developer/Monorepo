<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               inline
               label-width="auto"
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>

        <el-form-item label="机构名称">
          <el-select v-model="search.orgId"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in orgNameList"
                       :key="item.orgId"
                       :label="item.orgName"
                       :value="item.orgId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级科室">
          <el-select v-model="search.deptId"
                     clearable
                     :disabled="deptDisable"
                     placeholder="全部">
            <el-option v-for="item in deptList"
                       :key="item.deptId"
                       :label="item.netdeptChild"
                       :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单编号">
          <el-input placeholder="输入订单编号"
                    v-model="search.orderNo"
                    clearable
                    style="width:260px;"></el-input>
        </el-form-item>

        <el-form-item label="支付状态">
          <el-select v-model="search.orderStatus"
                     clearable=""
                     placeholder="全部">
            <el-option :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.orderStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select v-model="search.inquiryStatus"
                     clearable=""
                     placeholder="全部">
            <el-option :key="'inquiry' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.returnVisitStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下单日期">
          <PeaceDatePicker v-model="search.time"
                           type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="至今"
                           value-format="yyyy-MM-dd"
                           :picker-options="pickerOptions">
          </PeaceDatePicker>
        </el-form-item>

        <el-form-item class="search-btn">
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-lg">
        <el-button @click="exportExcel"
                   :loading="exportLoading"
                   type="primary">导出</el-button>
      </div>
      <peace-table ref="table"
                   class="table"
                   pagination>
        <peace-table-column label="订单编号"
                            width="250">
          <template slot-scope="scope">
            <el-button @click="getOrderInfo(scope.row.inquiry_no)"
                       size="mini"
                       style="white-space:normal;text-align:left;"
                       type="text">{{ scope.row.order_no}}</el-button>
          </template>
        </peace-table-column>
        <peace-table-column label="订单应用"
                            min-width="100"
                            prop="channel">
        </peace-table-column>
        <peace-table-column label="就诊人"
                            min-width="100"
                            prop="family_name"></peace-table-column>
        <peace-table-column label="医生姓名"
                            min-width="100"
                            prop="doctor_name"></peace-table-column>

        <peace-table-column label="二级科室"
                            min-width="120"
                            prop="netdeptChild"></peace-table-column>

        <peace-table-column label="机构名称"
                            min-width="180"
                            prop="netHospital_name"></peace-table-column>
        <peace-table-column label="下单时间"
                            width="180"
                            prop="created_time"></peace-table-column>
        <peace-table-column label="订单金额（元）"
                            min-width="140"
                            prop="totalMoney">
        </peace-table-column>
        <peace-table-column label="自费金额（元）"
                            min-width="140"
                            prop="orderMoney">
        </peace-table-column>
        <peace-table-column label="支付状态"
                            min-width="100"
                            prop="order_status">
          <template slot-scope="scope">
            <span>{{ scope.row.order_status | getEnumLabel(source.orderStatus) }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="支付方式"
                            min-width="160"
                            prop="payMentType">
        </peace-table-column>
        <peace-table-column label="抵扣类型"
                            min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.deductionType ||'--' }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="订单状态"
                            min-width="100"
                            prop="inquiry_status">
          <template slot-scope="scope">
            <span>{{ scope.row.inquiry_status | getEnumLabel(source.returnVisitStatus) }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="操作"
                            min-width="180"
                            fixed="right">
          <template slot-scope="scope">
            <template v-if="[3,4, 5].includes(scope.row.inquiry_status)">
              <el-button @click="getInquiry(scope.row.inquiry_no)"
                         size="mini"
                         type="text">复诊记录</el-button>
            </template>
            <template v-if="scope.row.case_no">
              <el-button @click="getRecordInfo(scope.row.case_no)"
                         size="mini"
                         type="text">病历</el-button>
            </template>
            <template v-if="scope.row.prescriptionNos">
              <el-button @click="getPres(scope.row.prescriptionIds)"
                         size="mini"
                         type="text">处方</el-button>
            </template>
          </template>
        </peace-table-column>
      </peace-table>

    </div>
    <!-- 复诊订单详情 -->
    <peace-dialog append-to-body
                  title="复诊订单详情"
                  v-if="infoDialogVisible"
                  v-bind:visible.sync="infoDialogVisible">
      <PeaceOrderInquiryDetail v-bind:data="currentAdvisoryInfo"
                               v-bind:type="'returnVisit'"></PeaceOrderInquiryDetail>
    </peace-dialog>
    <!-- 问诊详情 -->
    <peace-dialog append-to-body
                  title="复诊记录"
                  v-if="inquiryDialogVisible"
                  v-bind:visible.sync="inquiryDialogVisible">
      <PeaceIMMessageHistory v-bind:data="currentInquiry.msgInfo"
                             v-bind:messageFlowIn="currentInquiry.doctorInfo"
                             v-bind:messageFlowOut="currentInquiry.patientInfo"></PeaceIMMessageHistory>
    </peace-dialog>
    <!-- 病历详情 -->
    <peace-dialog append-to-body
                  title="病历详情"
                  v-if="recordDialogVisible"
                  v-bind:visible.sync="recordDialogVisible">
      <PeaceCaseDetail v-bind:data="currentRecord"></PeaceCaseDetail>
    </peace-dialog>
    <!-- 处方详情 -->
    <peace-dialog append-to-body
                  title="处方详情"
                  v-if="presDialogVisible"
                  v-bind:visible.sync="presDialogVisible">
      <div class="tips"
           v-if="prescriptionIds.length > 1">
        <span>共 {{prescriptionIds.length}} 张，当前第 {{prescribeIndex}} 张（{{prescribeIndex}}/{{prescriptionIds.length}}）</span>
        <div class="flex next">
          <div class="q-mr-sm"
               @click="goToPrev()">
            <i class="arrow q-mr-sm"
               style="transform: rotate(180deg);"></i>
            <span>上一张</span>
          </div>
          <div @click="goToNext()">
            <span>下一张</span>
            <i class="arrow q-ml-sm"></i>
          </div>
        </div>
      </div>

      <div class="prescribe"
           v-for="(item,index) in prescriptionIds"
           v-bind:key="'prescribe' + index + item">
        <template v-if="(index + 1) == prescribeIndex">
          <PeacePrescriptionDetail v-bind:key="item"
                                   v-bind:data="() => fetchPrescriptionDetail(item)"></PeacePrescriptionDetail>
        </template>

      </div>
    </peace-dialog>

  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'

import { PeaceIMMessageHistory, PeaceCaseDetail, PeacePrescriptionDetail, PeaceOrderInquiryDetail } from 'peace-components'

export default {
  name: 'return-visit-order',
  data() {
    return {
      search: {
        orderNo: '',
        orgId: '',
        orderType: '',
        orderStatus: '',
        inquiryStatus: '',
        serviceType: 'returnVisit',
        time: [],
        startTime: '',
        endTime: '',
        deptId: '',
        p: 1,
        size: 10
      },
      orgNameList: [],
      deptList: [],
      exportLoading: false,
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      prescriptionIds: [],
      prescribeIndex: 1,

      currentAdvisoryInfo: '',
      currentInquiry: '',
      currentRecord: '',
      currentPres: '',
      currentPurchase: '',
      infoDialogVisible: false,
      inquiryDialogVisible: false,
      recordDialogVisible: false,
      presDialogVisible: false,

      source: {
        orderStatus: Constant.ENUM_ORDER_PAY_STATUS,
        orderInquiryType: Constant.ENUM_INQUIRY_TYPE,
        returnVisitStatus: Constant.ENUM_RETURN_VISIT_STATUS
      }
    }
  },
  watch: {
    ['search.time']() {
      this.search.startTime = this.search.time ? this.search.time[0] : ''
      this.search.endTime = this.search.time ? this.search.time[1] : ''
    },
    'search.orgId': function(val, oldVal) {
      if (val !== oldVal) {
        this.search.deptId = ''
        this.deptList = []
        if (!Peace.validate.isEmpty(val)) {
          this.getDepartmentList()
        }
      }
    }
  },
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  created() {
    this.getAllHospitalList()
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  components: {
    PeaceIMMessageHistory,
    PeaceCaseDetail,
    PeacePrescriptionDetail,
    PeaceOrderInquiryDetail
  },
  computed: {
    deptDisable() {
      return Peace.validate.isEmpty(this.search.orgId)
    }
  },
  methods: {
    fetch() {
      const fetch = Service.getList
      const params = this.search

      this.$refs.table.reloadData({ fetch, params })
    },

    // 获取所有机构
    getAllHospitalList() {
      Service.getAllHospitalList({}).then((res) => {
        this.orgNameList = res.data || []
      })
    },

    /// 获取机构下的二级科室列表接口
    getDepartmentList() {
      Service.getDeptList({ orgId: this.search.orgId }).then((res) => {
        this.deptList = res.data?.list || []
      })
    },

    async fetchPrescriptionDetail(prescriptionNo) {
      const params = { prescriptionNo: prescriptionNo }
      const res = await Service.getPrescriptionDetail(params)

      return res.data
    },

    // 订单信息
    getOrderInfo(id) {
      const params = { inquiry_no: id }
      Service.getAdvisoryInfo(params).then((res) => {
        this.currentAdvisoryInfo = res.data
        this.infoDialogVisible = true
      })
    },
    // 问诊记录（会话记录）
    getInquiry(id) {
      const params = { inquiryNo: id }
      Service.getInquiryInfo(params).then((res) => {
        const rs = res.data
        if (rs.msgInfo.length > 0) {
          this.currentInquiry = rs
          this.inquiryDialogVisible = true
        } else {
          const msg = rs.msg ? rs.msg : '暂无问诊记录'
          this.$message.error(msg)
        }
      })
    },
    // 问诊小结（病历）
    getRecordInfo(caseNo) {
      const params = { caseNo: caseNo }
      const fetch = async () => {
        const res = await Service.getCaseDetail(params)
        return res.data
      }

      this.recordDialogVisible = true
      this.currentRecord = fetch
    },

    // 用药建议（处方）
    getPres(prescriptionIds) {
      this.prescribeIndex = 1
      this.presDialogVisible = true
      this.prescriptionIds = prescriptionIds.split(',')
    },

    exportExcel() {
      this.exportLoading = true
      let params = Object.assign({}, this.search, { type: 'returnVisit' })
      Service.checkOrder(params)
        .then(() => {
          Service.exportOrder(params).finally(() => {
            this.exportLoading = false
          })
        })
        .catch(() => {
          this.exportLoading = false
        })
    },

    goToPrev() {
      if (this.prescribeIndex == 1) {
        this.prescribeIndex = this.prescriptionIds.length
      } else {
        this.prescribeIndex--
      }
    },

    goToNext() {
      if (this.prescribeIndex == this.prescriptionIds.length) {
        this.prescribeIndex = 1
      } else {
        this.prescribeIndex++
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.private {
  position: relative;
  &-tag {
    position: absolute;
    top: 3px;
    left: 3px;
    margin-right: 3px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    display: inline-block;
    background-color: var(--q-color-primary);
  }
}

.tips {
  width: 100%;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  margin: 0 auto 15px;
  color: #333333;
  // padding: 0 40px;
  padding-left: 40px;
  padding-right: 13px;
  background: rgba(249, 249, 249, 1) url('./assets/images/ic_tixing.png') no-repeat;
  background-position: 13px 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .next {
    cursor: pointer;
    i.arrow {
      width: 4px;
      height: 8px;
      display: inline-block;
      background: rgba(249, 249, 249, 1) url('./assets/images/systen-Triangle.png') no-repeat;
    }
  }
}
</style>
