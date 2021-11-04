<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">

      <el-form v-bind:model="model"
               label-suffix="："
               label-width="auto"
               inline>
        <el-form-item label="完单日期">
          <PeaceDatePicker type="daterange"
                           value-format="yyyy-MM-dd"
                           v-model="model.time"
                           v-bind:picker-options="pickerOptions"></PeaceDatePicker>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="model.orderNo"
                    placeholder="请输入"
                    style="width:260px;"></el-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="model.organizationName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select v-model="model.orderType"
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="'order'+item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.orderType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款商户名称">
          <el-input v-model="model.mchName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button v-on:click="exportBillsList"
                   type="primary">导出</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          prop="number"
                          width="60px"></PeaceTableColumn>
        <PeaceTableColumn label="订单编号"
                          prop="orderNo"
                          width="250px"
                          align="left">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">{{ scope.row.orderNo }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="organizationName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="收款商户名称"
                          prop="mchName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="商户号"
                          prop="mchNo"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="订单类型"
                          min-width="100px"
                          prop="orderType">
          <template slot-scope="scope">
            {{ scope.row.orderType | filterDictionaryFuzzy(source.orderType)}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="100px"
                          prop="orderStatusTxt"></PeaceTableColumn>
        <PeaceTableColumn label="业务主体"
                          prop="servicePrincipal"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="完单时间"
                          prop="completionTime"
                          width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="订单金额"
                          prop="orderMoney"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="实付金额"
                          prop="payMoney"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="支付方式"
                          prop="payMode"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="快递费用"
                          prop="expressFee"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="分账手续费"
                          prop="serviceCharge"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="退款金额"
                          prop="refundMoney"
                          width="100px"></PeaceTableColumn>

        <div class="q-ml-xl q-px-lg q-py-md text-subtitle1"
             slot="append">
          <span>累计结算金额：</span>
          <span class="text-red">￥ {{ tableData && tableData.summation }}</span>
        </div>
      </PeaceTable>
    </div>

    <!-- 咨询订单详情 -->
    <PeaceDialog v-if="infoDialogInquiryVisible"
                 v-bind:close-on-click-modal="false"
                 v-bind:close-on-press-escape="false"
                 v-bind:visible.sync="infoDialogInquiryVisible"
                 append-to-body
                 title="咨询订单详情"
                 width="500px">
      <PeaceOrderInquiryDetail v-bind:data="currentInquiryAdvisoryInfo"
                               v-bind:type="'inquiry'"></PeaceOrderInquiryDetail>
    </PeaceDialog>

    <!-- 复诊订单详情 -->
    <PeaceDialog v-if="infoDialogReturnVisitVisible"
                 v-bind:close-on-click-modal="false"
                 v-bind:close-on-press-escape="false"
                 v-bind:visible.sync="infoDialogReturnVisitVisible"
                 title="复诊订单详情"
                 width="500px"
                 append-to-body>
      <PeaceOrderInquiryDetail v-bind:data="currentReturnVisitAdvisoryInfo"
                               v-bind:type="'returnVisit'"></PeaceOrderInquiryDetail>
    </PeaceDialog>

    <!-- 购药订单详情 -->
    <PeaceDialog v-if="purchaseDialogVisible"
                 v-bind:visible.sync="purchaseDialogVisible"
                 v-bind:close-on-click-modal="false"
                 v-bind:close-on-press-escape="false"
                 title="购药订单详情"
                 width="576px"
                 append-to-body>
      <PurchaseOrderInfo v-bind:info="currentPurchase"
                         v-on:viewPres="viewPres"></PurchaseOrderInfo>
    </PeaceDialog>

    <!-- 服务包订单详情 -->
    <PeaceDialog v-if="servicePackageDialogVisible"
                 v-bind:visible.sync="servicePackageDialogVisible"
                 v-bind:close-on-click-modal="false"
                 v-bind:close-on-press-escape="false"
                 title="服务包订单详情"
                 width="636px"
                 append-to-body>
      <ServicePackageOrderInfo v-bind:data="currentServicePackage"></ServicePackageOrderInfo>
    </PeaceDialog>

    <!-- 处方详情 -->
    <PeaceDialog append-to-body
                 title="处方详情"
                 v-if="presDialogVisible"
                 v-bind:visible.sync="presDialogVisible">
      <PeacePrescriptionDetail v-bind:data="currentPres"></PeacePrescriptionDetail>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'

import PurchaseOrderInfo from '@src/views/internet-cloud-hospital/business-order/drug-purchase-order/src/components/DrugPurchaseOrderDetail.vue'
import ServicePackageOrderInfo from '@src/views/internet-cloud-hospital/business-order/service-pack-order/src/components/OrderDetail.vue'
import { PeacePrescriptionDetail, PeaceOrderInquiryDetail } from 'peace-components'

export default {
  components: {
    PurchaseOrderInfo,
    ServicePackageOrderInfo,
    PeacePrescriptionDetail,
    PeaceOrderInquiryDetail
  },

  data() {
    return {
      model: {
        time: [],
        startTime: '',
        endTime: '',
        orderNo: '',
        organizationName: '',
        mchName: '',
        orderType: ''
      },

      source: {
        orderType: []
      },

      tableData: {},

      infoDialogInquiryVisible: false,
      infoDialogReturnVisitVisible: false,
      purchaseDialogVisible: false,
      servicePackageDialogVisible: false,
      presDialogVisible: false,

      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const s = Peace.dayjs().toDate()
              const e = Peace.dayjs().toDate()

              picker.$emit('pick', [s, e])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const s = Peace.dayjs()
                .add(-1, 'day')
                .toDate()
              const e = Peace.dayjs()
                .add(-1, 'day')
                .toDate()

              picker.$emit('pick', [s, e])
            }
          },
          {
            text: '当月',
            onClick(picker) {
              const s = Peace.dayjs()
                .startOf('month')
                .toDate()
              const e = Peace.dayjs().toDate()

              picker.$emit('pick', [s, e])
            }
          },
          {
            text: '上月',
            onClick(picker) {
              const s = Peace.dayjs()
                .add(-1, 'month')
                .startOf('month')
                .toDate()
              const e = Peace.dayjs()
                .add(-1, 'month')
                .endOf('month')
                .toDate()

              picker.$emit('pick', [s, e])
            }
          }
        ]
      }
    }
  },

  watch: {
    ['model.time'](value) {
      if (Peace.util.isArray(value) && value.length === 2) {
        this.model.startTime = Peace.dayjs(value[0]).format('YYYY-MM-DD')
        this.model.endTime = Peace.dayjs(value[1]).format('YYYY-MM-DD')
      } else {
        this.model.startTime = ''
        this.model.endTime = ''
      }
    }
  },

  created() {
    const s = Peace.dayjs()
      .startOf('month')
      .toDate()
    const e = Peace.dayjs().toDate()

    this.model.time = [s, e]
  },

  async mounted() {
    this.source.orderType = await Peace.identity.dictionary.getList('service_order_type')
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getBillsList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => (this.tableData = res.data))
    },

    exportBillsList() {
      const params = Peace.util.deepClone(this.model)

      Service.exportBillsList(params)
    },

    showDetail(row) {
      // 咨询订单
      if (row.orderType === 1) {
        this.getInquiryOrderInfo(row.inquiryNo)
      }
      // 复诊订单
      else if (row.orderType === 2) {
        this.getReturnVisitOrderInfo(row.inquiryNo)
      }
      // 购药订单
      else if (row.orderType === 3) {
        this.getPurchaseOrder(row.orderNo)
      } else if (row.orderType === 5) {
        this.getServicePackageOrder(row.orderNo)
      }
    },

    // 咨询订单
    getInquiryOrderInfo(id) {
      const params = { inquiry_no: id }
      Service.getAdvisoryInfo(params).then((res) => {
        this.infoDialogInquiryVisible = true
        this.currentInquiryAdvisoryInfo = res.data
      })
    },

    // 复诊订单
    getReturnVisitOrderInfo(id) {
      const params = { inquiry_no: id }
      Service.getAdvisoryInfo(params).then((res) => {
        this.infoDialogReturnVisitVisible = true
        this.currentReturnVisitAdvisoryInfo = res.data
      })
    },

    // 购药订单
    getPurchaseOrder(orderNo) {
      const params = { orderNo }
      Service.getPurchases(params).then((res) => {
        this.purchaseDialogVisible = true
        this.currentPurchase = res.data
      })
    },

    // 服务包订单
    getServicePackageOrder(orderNo) {
      this.servicePackageDialogVisible = true
      this.currentServicePackage = orderNo
    },

    // 用药建议（处方）
    getPres(id) {
      const fetch = async () => {
        const params = { prescriptionNo: id }
        const res = await Service.getPrescriptionDetail(params)

        return res.data
      }

      this.presDialogVisible = true
      this.currentPres = fetch
    },

    // 查看处方（购药订单子组件触发）
    viewPres(param) {
      return this.getPres(param.ids, param.idx)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-date-editor .el-range-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: 0;
  padding: 0;
  width: 43%;
  color: #666;
}
</style>