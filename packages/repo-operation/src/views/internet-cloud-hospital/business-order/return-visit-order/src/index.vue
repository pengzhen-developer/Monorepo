<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               label-width="auto"
               label-suffix="："
               inline>

        <el-form-item label="机构名称">
          <el-select v-model="search.orgName"
                     clearable=""
                     placeholder="全部">
            <el-option :key="index"
                       :label="item.orgName"
                       :value="item.orgName"
                       v-for="(item, index) in orgNameList"></el-option>
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
        <peace-table-column label="机构名称"
                            min-width="180"
                            prop="netHospital_name"></peace-table-column>
        <!-- <peace-table-column label="咨询类型"
                            min-width="120">
          <template slot-scope="scope">
            <div class="private">
              <span class="private-tag"
                    v-if="scope.row.isPrivateDoctor">私</span>
              <span>{{ scope.row.inquiry_type | getEnumLabel(source.orderInquiryType) }}</span>
            </div>
          </template>
        </peace-table-column> -->
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
              <el-button @click="getRecordInfo(scope.row.inquiry_no)"
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
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="infoDialogVisible"
                  append-to-body
                  title="复诊订单详情"
                  v-if="infoDialogVisible"
                  width="500px">
      <return-visit-order-info :info="currentAdvisoryInfo"></return-visit-order-info>
    </peace-dialog>
    <!-- 问诊详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="inquiryDialogVisible"
                  append-to-body
                  class="scroll-body"
                  title="复诊记录"
                  v-if="inquiryDialogVisible"
                  width="800px">
      <inquiry-info :info="currentInquiry"></inquiry-info>
    </peace-dialog>
    <!-- 病历详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="recordDialogVisible"
                  append-to-body
                  title="病历详情"
                  v-if="recordDialogVisible"
                  width="580px">
      <slot name="header"></slot>
      <record-info :info="currentRecord"></record-info>
    </peace-dialog>
    <!-- 处方详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="presDialogVisible"
                  title="处方详情"
                  v-if="presDialogVisible"
                  append-to-body
                  width="580px">
      <pres-info :info="currentPres"
                 @viewPres="viewPres"></pres-info>
    </peace-dialog>
    <!-- 购药订单详情 -->
    <!-- <peace-dialog  :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="purchaseDialogVisible"
               title="购药订单详情"
               v-if="purchaseDialogVisible"
               append-to-body
               width="576px">
      <purchase-order-info :info="currentPurchase"
                           @viewPurchase="viewPurchase"
                           @viewPres="viewPres"></purchase-order-info>
    </peace-dialog> -->
    <!-- 导出 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="exportDialogVisible"
                  append-to-body
                  title="订单导出条件"
                  v-if="exportDialogVisible"
                  width="420px">
      <export-order type="returnVisit"
                    :query="search"></export-order>
    </peace-dialog>
  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'

import InquiryInfo from './components/MessageList'
import RecordInfo from './components/RecordInfo'
import PresInfo from './components/PrescriptionOrderDetail'
import ReturnVisitOrderInfo from './components/ReturnVisitOrderInfo'
import ExportOrder from './components/ExportOrder'

export default {
  name: 'return-visit-order',
  data() {
    return {
      search: {
        orderNo: '',
        orgName: '',
        orderType: '',
        orderStatus: '',
        inquiryStatus: '',
        serviceType: 'returnVisit',
        time: [],
        startTime: '',
        endTime: '',
        p: 1,
        size: 10
      },
      orgNameList: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      currentAdvisoryInfo: '',
      currentInquiry: '',
      currentRecord: '',
      currentPres: '',
      currentPurchase: '',
      infoDialogVisible: false,
      inquiryDialogVisible: false,
      recordDialogVisible: false,
      presDialogVisible: false,
      // purchaseDialogVisible: false,
      exportDialogVisible: false,

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
    ReturnVisitOrderInfo,
    InquiryInfo,
    RecordInfo,
    PresInfo,
    ExportOrder
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
    getRecordInfo(id) {
      const params = { inquiryNo: id }
      Service.getRecordInfo(params).then((res) => {
        this.currentRecord = res.data
        this.recordDialogVisible = true
      })
    },
    // 用药建议（处方）
    getPres(_id, index, flag) {
      flag = flag || false
      let id = ''
      let total = 0
      index = index || 0
      id = _id.split(',')[index]
      total = _id.split(',').length
      const params = { prescribeId: id }
      Service.getPresInfo(params)
        .then((res) => {
          const rs = res.data
          this.currentPres = Object.assign({}, rs, {
            presIds: _id,
            prescribeIndex: index,
            total: total,
            current: flag,
            prescriptionId: id
          })
          this.presDialogVisible = true
        })
        .catch((res) => {
          this.$message.error(res.msg)
          this.presDialogVisible = false
        })
    },
    // 查看处方（购药订单子组件触发,处方详情子组件触发）
    viewPres(param) {
      return this.getPres(param.ids, param.idx, param.current)
    },
    // //查看更多购药订单
    // viewPurchase(param) {
    //   return this.getPurchaseOrder(param.$data, param.orderIds, param.idx)
    // },
    // // 购药订单
    // getPurchaseOrder(data, orderIds, index) {
    //   index = index || 0
    //   let orderNo = orderIds.split(',')[index]
    //   Service.getPurchases( orderNo).then((res) => {
    //     this.purchaseDialogVisible = true
    //     this.currentPurchase = Object.assign({}, res.data, {
    //       presIds: data.prescriptionIds,
    //       prescribeIndex: index,
    //       $data: data,
    //       orderIds: orderIds,
    //       total: orderIds.split(',').length
    //     })
    //   })
    // },
    exportExcel() {
      this.exportDialogVisible = true
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
</style>
