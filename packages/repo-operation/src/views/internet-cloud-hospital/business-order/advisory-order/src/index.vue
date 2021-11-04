<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               inline
               label-suffix="："
               label-width="auto"
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

        <el-form-item label="咨询类型">
          <el-select v-model="search.orderType"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.orderInquiryType"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付状态">
          <el-select v-model="search.orderStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.orderStatus"
                       :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select v-model="search.inquiryStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.inquiryStatus"
                       :key="'inquiry' + item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单编号">
          <el-input v-model="search.orderNo"
                    clearable
                    placeholder="输入订单编号"
                    style="width:260px;"></el-input>
        </el-form-item>
        <el-form-item label="下单日期">
          <PeaceDatePicker v-model="search.time"
                           :picker-options="pickerOptions"
                           end-placeholder="至今"
                           start-placeholder="开始日期"
                           type="daterange"
                           value-format="yyyy-MM-dd">
          </PeaceDatePicker>
        </el-form-item>

        <el-form-item class="search-btn">
          <el-button type="primary"
                     @click="fetch">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   :loading="exportLoading"
                   @click="exportExcel">导出
        </el-button>
      </div>
      <peace-table ref="table"
                   class="table"
                   pagination>
        <PeaceTableColumn label="订单编号"
                          width="250">
          <template slot-scope="scope">
            <el-button size="mini"
                       style="white-space:normal;text-align:left;"
                       type="text"
                       @click="getOrderInfo(scope.row.inquiry_no)">{{ scope.row.order_no }}
            </el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单应用"
                          min-width="100"
                          prop="channel">
        </PeaceTableColumn>

        <PeaceTableColumn label="就诊人"
                          min-width="100"
                          prop="family_name"></PeaceTableColumn>

        <PeaceTableColumn label="咨询医生"
                          min-width="100"
                          prop="doctor_name"></PeaceTableColumn>

        <PeaceTableColumn label="二级科室"
                          min-width="120"
                          prop="netdeptChild"></PeaceTableColumn>

        <PeaceTableColumn label="机构名称"
                          min-width="160"
                          prop="netHospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="咨询类型"
                          min-width="120">
          <template slot-scope="scope">
            <div class="private">
              <span v-if="scope.row.isPrivateDoctor"
                    class="private-tag">私</span>
              <span>{{ scope.row.inquiry_type | getEnumLabel(source.orderInquiryType) }}</span>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="下单时间"
                          prop="created_time"
                          width="180"></PeaceTableColumn>
        <PeaceTableColumn label="订单金额（元）"
                          min-width="140"
                          prop="totalMoney">
        </PeaceTableColumn>
        <PeaceTableColumn label="自费金额（元）"
                          min-width="140"
                          prop="orderMoney">
        </PeaceTableColumn>
        <PeaceTableColumn label="支付状态"
                          min-width="100"
                          prop="order_status">
          <template slot-scope="scope">
            <span>{{ scope.row.order_status | getEnumLabel(source.orderStatus) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="支付方式"
                          min-width="160"
                          prop="payMentType"></PeaceTableColumn>
        <PeaceTableColumn label="抵扣类型"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.deductionType || '--' }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="100"
                          prop="inquiry_status">
          <template slot-scope="scope">
            <span>{{ scope.row.inquiry_status | getEnumLabel(source.inquiryStatus) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          min-width="160">
          <template slot-scope="scope">
            <template v-if="[3, 4, 5].includes(scope.row.inquiry_status)">
              <el-button size="mini"
                         type="text"
                         @click="getInquiry(scope.row.inquiry_no)">咨询记录
              </el-button>
            </template>
            <template v-if="scope.row.case_no">
              <el-button size="mini"
                         type="text"
                         @click="getRecordInfo(scope.row.inquiry_no)">病历
              </el-button>
            </template>
          </template>
        </PeaceTableColumn>
      </peace-table>

    </div>
    <!-- 咨询订单详情 -->
    <peace-dialog v-if="infoDialogVisible"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="infoDialogVisible"
                  append-to-body
                  title="咨询订单详情"
                  width="500px">
      <PeaceOrderInquiryDetail :data="currentAdvisoryInfo"
                               :type="'inquiry'"></PeaceOrderInquiryDetail>
    </peace-dialog>
    <!-- 问诊详情 -->
    <peace-dialog v-if="inquiryDialogVisible"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="inquiryDialogVisible"
                  append-to-body
                  class="scroll-body"
                  title="咨询记录"
                  width="800px">
      <inquiry-info :info="currentInquiry"></inquiry-info>
    </peace-dialog>
    <!-- 病历详情 -->
    <peace-dialog v-if="recordDialogVisible"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="recordDialogVisible"
                  append-to-body
                  title="病历详情"
                  width="580px">
      <slot name="header"></slot>
      <record-info :info="currentRecord"></record-info>
    </peace-dialog>

  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'

import InquiryInfo from './components/MessageList'
import RecordInfo from './components/RecordInfo'
import { PeaceOrderInquiryDetail } from 'peace-components'

export default {
  name: 'advisory-order',
  data() {
    return {
      search: {
        orderNo: '',
        orgId: '',
        orderType: '',
        orderStatus: '',
        inquiryStatus: '',
        serviceType: 'inquiry',
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

      currentAdvisoryInfo: '',
      currentInquiry: '',
      currentRecord: '',
      infoDialogVisible: false,
      inquiryDialogVisible: false,
      recordDialogVisible: false,

      source: {
        orderInquiryType: Constant.ENUM_INQUIRY_TYPE,
        orderStatus: Constant.ENUM_ORDER_PAY_STATUS,
        inquiryStatus: Constant.ENUM_CONSULT_STATUS
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
        if (Peace.validate.isEmpty(val)) {
          this.search.deptId = ''
          this.deptList = []
        } else {
          this.getDepartmentList()
        }
      }
    }
  },
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value === value)?.label
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
    InquiryInfo,
    RecordInfo,
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
      this.exportLoading = true
      let params = Object.assign({}, this.search, { type: 'inquiry' })
      Service.checkOrder(params)
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
