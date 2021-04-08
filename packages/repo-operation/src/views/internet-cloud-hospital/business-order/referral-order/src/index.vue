<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               label-width="auto"
               label-suffix="："
               inline>
        <el-form-item label="转出医院">
          <el-input placeholder="输入转出医院"
                    v-model="search.outHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="转入医院">
          <el-input placeholder="输入转入医院"
                    v-model="search.inHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select v-model="search.order_type">
            <el-option label="全部"
                       value></el-option>
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.inquiryType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转状态">
          <el-select v-model="search.referral_status">
            <el-option :value="0"
                       label="全部"></el-option>
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.referralStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="订单编号"
                          width="250">
          <template slot-scope="scope">
            <el-button @click="getOrderInfo(scope.row.referral_no)"
                       size="mini"
                       type="text">{{ scope.row.referral_no }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单渠道"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.source }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="就诊人"
                          prop="famuly_name"></PeaceTableColumn>
        <PeaceTableColumn label="转出医院"
                          min-width="150"
                          prop="out_Hospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="转入医院"
                          min-width="150"
                          prop="in_Hospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="订单类型"
                          prop="inquiry_type">
        </PeaceTableColumn>
        <PeaceTableColumn label="转诊时间"
                          min-width="180"
                          prop="created_time"></PeaceTableColumn>
        <PeaceTableColumn label="流转状态"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.transfer_status | getEnumLable(source.referralStatus) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="问诊记录"
                          min-width="170">
          <template slot-scope="scope">
            <el-button @click="getInquiry(scope.row.inquiry_no)"
                       size="mini"
                       type="text">{{ scope.row.inquiry_no }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="问诊小结"
                          min-width="170">
          <template slot-scope="scope">
            <el-button @click="getRecordInfo(scope.row.inquiry_no)"
                       size="mini"
                       type="text">{{ scope.row.case_no }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="用药建议"
                          min-width="170">
          <template slot-scope="scope">
            <template v-if="scope.row.prescriptionNos">
              <el-button :key="'pres_' + index"
                         @click="getPres(scope.row.prescriptionIds, index)"
                         size="mini"
                         type="text"
                         v-for="(pres, index) in scope.row.prescriptionNos.split(',')">{{ pres }}
              </el-button>
            </template>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="购药订单"
                          min-width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.orderIds">
              <template v-for="(purchase, index) in scope.row.orderIds.split(',')">
                <el-button :key="'purchase_' + index"
                           @click="getPurchaseOrder(scope.row, purchase, index)"
                           size="mini"
                           type="text"
                           v-if="purchase">{{ purchase }}</el-button>
              </template>
            </template>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="infoDialogVisible"
                  title="转诊订单详情"
                  v-if="infoDialogVisible"
                  append-to-body
                  width="500px">
      <referral-order-info :info="currentReferralInfo"></referral-order-info>
    </peace-dialog>
    <!-- 问诊详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="inquiryDialogVisible"
                  class="scroll-body"
                  title="问诊记录"
                  v-if="inquiryDialogVisible"
                  append-to-body
                  width="800px">
      <inquiry-info :info="currentInquiry"></inquiry-info>
    </peace-dialog>
    <!-- 病历详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="recordDialogVisible"
                  title="病历详情"
                  v-if="recordDialogVisible"
                  append-to-body
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
      <pres-info :info="currentPres"></pres-info>
    </peace-dialog>
    <!-- 购药订单详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="purchaseDialogVisible"
                  title="购药订单详情"
                  v-if="purchaseDialogVisible"
                  append-to-body
                  width="576px">
      <purchase-order-info :info="currentPurchase"
                           @viewPres="viewPres"></purchase-order-info>
    </peace-dialog>
  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'

import ReferralOrderInfo from './components/ReferralOrderInfo'
import InquiryInfo from './components/MessageList'
import RecordInfo from './components/RecordInfo'
import PresInfo from './components/PrescriptionOrderDetail'
import PurchaseOrderInfo from './components/PurchaseOrderInfo'

export default {
  name: 'referral-order',
  data() {
    return {
      list: [],
      total: 0,
      search: {
        outHospitalName: '',
        inHospitalName: '',
        order_type: '',
        referral_status: 0,
        p: 1,
        size: 10
      },
      currentReferralInfo: '',
      currentInquiry: '',
      currentRecord: '',
      currentPres: '',
      currentPurchase: '',
      infoDialogVisible: false,
      inquiryDialogVisible: false,
      recordDialogVisible: false,
      presDialogVisible: false,
      purchaseDialogVisible: false,
      source: {
        inquiryType: Constant.ORDER_INQUIRY_TYPE,
        referralStatus: Constant.REFERRAL_STATUS
      }
    }
  },

  filters: {
    getEnumLable: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  methods: {
    fetch() {
      const fetch = Service.getList
      const params = this.search

      this.$refs.table.reloadData({ fetch, params })
    },
    // 订单信息
    getOrderInfo(id) {
      const params = { referral_no: id }
      Service.getReferralInfo(params).then((res) => {
        this.currentReferralInfo = res.data
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
          const msg = rs.data ? rs.msg : '暂无问诊记录'
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
    getPres(_id, index) {
      let id = ''
      if (_id) {
        id = _id.split(',')[index]
      }
      const params = { prescribeId: id }
      Service.getPresInfo(params).then((res) => {
        this.currentPres = res.data
        this.currentPres.prescriptionId = id
        this.presDialogVisible = true
      })
    },
    // 查看处方（购药订单子组件触发）
    viewPres(param) {
      return this.getPres(param.ids, param.idx)
    },
    // 购药订单
    getPurchaseOrder(data, orderNo, index) {
      Service.getPurchases(orderNo).then((res) => {
        this.currentPurchase = Object.assign({}, res.data, {
          presIds: data.prescriptionIds,
          $index: index
        })
        this.purchaseDialogVisible = true
      })
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  components: {
    ReferralOrderInfo,
    InquiryInfo,
    RecordInfo,
    PresInfo,
    PurchaseOrderInfo
  }
}
</script>
<style lang="scss" scoped>
</style>
