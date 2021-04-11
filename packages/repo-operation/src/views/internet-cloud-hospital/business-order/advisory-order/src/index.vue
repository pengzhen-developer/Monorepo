<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               label-width="auto"
               label-suffix="："
               inline>
        <el-form-item label="机构名称">
          <el-select v-model="search.orgName">
            <el-option label="全部"
                       value=""></el-option>
            <el-option :key="index"
                       :label="item.orgName"
                       :value="item.orgName"
                       v-for="(item, index) in orgNameList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询类型">
          <el-select v-model="search.orderType">
            <el-option label="全部"
                       value></el-option>
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.orderInquiryType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="search.orderStatus">
            <el-option value=""
                       label="全部"></el-option>
            <el-option :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.orderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="search.inquiryStatus">
            <el-option value=""
                       label="全部"></el-option>
            <el-option :key="'inquiry' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.inquiryStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input placeholder="输入订单编号"
                    v-model="search.orderNo"
                    clearable
                    style="width:260px;"></el-input>
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
      <div class="q-mb-md">
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
        <peace-table-column label="咨询医生"
                            min-width="100"
                            prop="doctor_name"></peace-table-column>
        <peace-table-column label="机构名称"
                            min-width="120"
                            prop="netHospital_name"></peace-table-column>
        <peace-table-column label="咨询类型"
                            min-width="120">
          <template slot-scope="scope">
            <div class="private">
              <span class="private-tag"
                    v-if="scope.row.isPrivateDoctor">私</span>
              <span>{{ scope.row.inquiry_type | getEnumLable(source.orderInquiryType) }}</span>
            </div>
          </template>
        </peace-table-column>
        <peace-table-column label="订单时间"
                            width="180"
                            prop="created_time"></peace-table-column>
        <peace-table-column label="订单金额（元）"
                            min-width="140"
                            prop="order_money">
          <template slot-scope="scope">
            <span>{{ scope.row.order_money }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="支付状态"
                            min-width="100"
                            prop="order_status">
          <template slot-scope="scope">
            <span>{{ scope.row.order_status | getEnumLable(source.orderStatus) }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="订单状态"
                            min-width="100"
                            prop="inquiry_status">
          <template slot-scope="scope">
            <span>{{ scope.row.inquiry_status | getEnumLable(source.inquiryStatus) }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="操作"
                            min-width="160"
                            fixed="right">
          <template slot-scope="scope">
            <template v-if="[4, 5].includes(scope.row.inquiry_status)">
              <el-button @click="getInquiry(scope.row.inquiry_no)"
                         size="mini"
                         type="text">咨询记录</el-button>
            </template>
            <template v-if="scope.row.case_no">
              <el-button @click="getRecordInfo(scope.row.inquiry_no)"
                         size="mini"
                         type="text">病历</el-button>
            </template>
          </template>
        </peace-table-column>
      </peace-table>

    </div>
    <!-- 咨询订单详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="infoDialogVisible"
                  append-to-body
                  title="咨询订单详情"
                  v-if="infoDialogVisible"
                  width="500px">
      <advisory-order-info :info="currentAdvisoryInfo"></advisory-order-info>
    </peace-dialog>
    <!-- 问诊详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="inquiryDialogVisible"
                  append-to-body
                  class="scroll-body"
                  title="咨询记录"
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
    <!-- 导出 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="exportDialogVisible"
                  append-to-body
                  title="订单导出条件"
                  v-if="exportDialogVisible"
                  width="420px">
      <export-order type="inquiry"
                    :query="search"></export-order>
    </peace-dialog>
  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'

import InquiryInfo from './components/MessageList'
import RecordInfo from './components/RecordInfo'
import AdvisoryOrderInfo from './components/AdvisoryOrderInfo'
import ExportOrder from './components/ExportOrder'

export default {
  name: 'advisory-order',
  data() {
    return {
      search: {
        orderNo: '',
        orgName: '',
        orderType: '',
        orderStatus: '',
        inquiryStatus: '',
        serviceType: 'inquiry',
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
      infoDialogVisible: false,
      inquiryDialogVisible: false,
      recordDialogVisible: false,
      exportDialogVisible: false,

      source: {
        orderInquiryType: Constant.ORDER_INQUIRY_TYPE,
        orderStatus: Constant.OEDER_STATUS,
        inquiryStatus: Constant.INQUIRY_STATUS
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
    getEnumLable: (value, ENUM) => {
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
    AdvisoryOrderInfo,
    InquiryInfo,
    RecordInfo,
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
