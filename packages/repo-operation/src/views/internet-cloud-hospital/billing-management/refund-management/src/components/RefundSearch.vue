<template>
  <div class="q-py-14">

    <div class="search-style q-px-24">
      <!-- 查询筛选Form -->
      <el-form v-bind:model="model"
               label-suffix="："
               label-width="auto"
               inline>

        <el-form-item label="订单编号">
          <el-input v-model="model.orderNo"
                    placeholder="请输入"
                    clearable
                    style="width:270px;"></el-input>
        </el-form-item>

        <el-form-item label="退款状态">
          <el-select v-model="model.refundStatus"
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="'order'+item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.refundStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="退款方式">
          <el-select v-model="model.refundSource"
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="'order'+item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.refundSource"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="提交日期">
          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="yyyy-MM-dd"
                           v-model="model.time"></PeaceDatePicker>
        </el-form-item>

        <el-form-item label="">
          <el-button v-on:click="fetch"
                     type="primary">查询
          </el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="line-space-style q-px-24"></div>

    <!-- 退款列表 -->
    <div class="card-style q-ma-24">
      <PeaceTable ref="table"
                  pagination>

        <!-- TableColum Expand -->
        <PeaceTableColumn type="expand">
          <template slot-scope="props">
            <div class="row q-my-16">
              <div class="q-mr-30 q-ml-16">
                <span class="text-grey-333">平台退款单号：</span><span class="text-grey-999">{{ props.row.refundOrderNo || '——' }}</span>
              </div>

              <div class="q-mr-30">
                <span class="text-grey-333">微信支付订单号：</span><span class="text-grey-999">{{ props.row.transactionId  || '——' }}</span>
              </div>

              <div>
                <span class="text-grey-333">退款商户号：</span><span class="text-grey-999">{{ props.row.mchNo  || '——' }}</span>
              </div>

            </div>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="订单编号"
                          prop="orderNo"
                          width="260px"
                          align="left">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showOrder(scope.row)">{{ scope.row.orderNo }}
            </el-button>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="订单类型"
                          prop="orderTypeTxt"
                          min-width="120px"></PeaceTableColumn>

        <PeaceTableColumn label="退款金额"
                          prop="refundMoney"
                          min-width="120px"></PeaceTableColumn>

        <PeaceTableColumn label="退款状态"
                          min-width="120px">
          <template slot-scope="scope">
            <span v-bind:class="{'agin-refund': showAgainRefund(scope.row.orderStatus)}">{{ scope.row.orderStatusTxt }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="退款方式"
                          prop="refundSourceTxt"
                          min-width="120px"></PeaceTableColumn>

        <PeaceTableColumn label="操作人"
                          min-width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.operator || "——"}}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="提交时间"
                          prop="createdTime"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn label="操作"
                          fixed="right"
                          width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">查看详情</el-button>

            <el-button type="text"
                       v-if="showAgainRefund(scope.row.orderStatus)"
                       v-on:click="againRefund(scope.row)">再次退款</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 退款详情 -->
    <PeaceDialog width="376px"
                 append-to-body
                 v-if="dialog.visible"
                 title="查看详情"
                 v-bind:visible.sync="dialog.visible">
      <refund-detail v-bind:orderNo="dialog.orderNo"></refund-detail>
    </PeaceDialog>

    <!-- 咨询订单详情 -->
    <PeaceDialog append-to-body
                 title="咨询订单详情"
                 v-if="infoDialogInquiryVisible"
                 v-bind:visible.sync="infoDialogInquiryVisible">
      <PeaceOrderInquiryDetail v-bind:data="currentInquiryAdvisoryInfo"
                               v-bind:type="'inquiry'"></PeaceOrderInquiryDetail>
    </PeaceDialog>

    <!-- 复诊订单详情 -->
    <PeaceDialog append-to-body
                 title="复诊订单详情"
                 v-if="infoDialogReturnVisitVisible"
                 v-bind:visible.sync="infoDialogReturnVisitVisible">
      <PeaceOrderInquiryDetail v-bind:data="currentReturnVisitAdvisoryInfo"
                               v-bind:type="'returnVisit'"></PeaceOrderInquiryDetail>
    </PeaceDialog>

    <!-- 购药订单详情 -->
    <PeaceDialog append-to-body
                 title="购药订单详情"
                 v-if="purchaseDialogVisible"
                 v-bind:visible.sync="purchaseDialogVisible">
      <PeaceOrderDrugPruchase v-bind:data="currentPurchase"
                              v-on:viewPres="viewPres"></PeaceOrderDrugPruchase>
    </PeaceDialog>

    <!-- 挂号订单详情 -->
    <PeaceDialog append-to-body
                 title="挂号订单详情"
                 width="636px"
                 v-if="servicePackageDialogVisible"
                 v-bind:visible.sync="servicePackageDialogVisible"
                 v-bind:close-on-click-modal="false"
                 v-bind:close-on-press-escape="false">
      <RegisterOrderInfo></RegisterOrderInfo>

    </PeaceDialog>

    <!-- 服务包订单详情 -->
    <PeaceDialog append-to-body
                 title="服务包订单详情"
                 width="636px"
                 v-if="servicePackageDialogVisible"
                 v-bind:visible.sync="servicePackageDialogVisible">
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
import Service from '../service'
import CONSTANT from '../constant'
import RefundDetail from './RefundDetail.vue'
import ServicePackageOrderInfo from '@src/views/internet-cloud-hospital/business-order/service-pack-order/src/components/OrderDetail.vue'
import { PeacePrescriptionDetail, PeaceOrderInquiryDetail, PeaceOrderDrugPruchase } from 'peace-components'

export default {
  name: 'RefundSearch',
  components: {
    PeacePrescriptionDetail,
    RefundDetail,
    PeaceOrderInquiryDetail,
    PeaceOrderDrugPruchase,
    ServicePackageOrderInfo
  },
  data() {
    return {
      model: {
        time: [],
        orderNo: '',
        startTime: '',
        endTime: '',
        refundSource: '',
        refundStatus: ''
      },
      source: {
        refundStatus: CONSTANT.REFUNDSTATUS,
        refundSource: CONSTANT.REFUNDSOURCE,
        orderType: CONSTANT.ORDERTYPE
      },
      dialog: {
        visible: false,
        orderNo: undefined
      },

      presDialogVisible: false,
      infoDialogInquiryVisible: false,
      infoDialogReturnVisitVisible: false,
      purchaseDialogVisible: false,
      servicePackageDialogVisible: false
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  watch: {
    'model.time'(timeRange) {
      this.model.startTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
    }
  },

  methods: {
    fetch() {
      const fetch = Service.refundList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => (this.tableData = res.data))
    },

    // 退款详情
    showDetail(item) {
      this.dialog.orderNo = item.orderNo
      this.dialog.visible = true
    },

    showOrder(row) {
      // 1咨询 2复诊 3购药 5服务包
      if (row.orderType === 1) {
        this.getInquiryOrderInfo(row.orderNo)
      } else if (row.orderType === 2) {
        this.getReturnVisitOrderInfo(row.orderNo)
      } else if (row.orderType === 3) {
        this.getPurchaseOrder(row.orderNo)
      } else if (row.orderType === 5) {
        this.getServicePackageOrder(row.orderNo)
      }
    },

    // 咨询订单
    getInquiryOrderInfo(id) {
      const params = { orderNo: id }
      Service.getAdvisoryInfo(params).then((res) => {
        this.infoDialogInquiryVisible = true
        this.currentInquiryAdvisoryInfo = res.data
      })
    },

    // 复诊订单
    getReturnVisitOrderInfo(id) {
      const params = { orderNo: id }
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
    },

    // 再次退款
    againRefund(item) {
      this.$confirm('退款前请确认导致退款不成功的问题已解决，否则将再次导致退款失败', '再次退款', {
        confirmButtonText: '确定退款',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = { orderNo: item.orderNo, again: 1 }
          Service.applyRefund(params).then(() => {
            this.fetch()
          })
        })
        .catch(() => {})
    },

    // 是否显示再次退款按钮
    showAgainRefund(status) {
      // 2 退款异常,  4 退款关闭
      return [2, 4].includes(status)
    }
  }
}
</script>


<style lang="scss" scoped>
.line-space-style {
  height: 16px;
  background: #f5f5f5;
}

.agin-refund {
  color: #ea3930;
}

::v-deep .el-table__expanded-cell {
  padding-top: 0px;
  padding-bottom: 0px;
}

::v-deep .el-table__expand-column .cell {
  .el-table__expand-icon--expanded {
    // 修改旋转过后的箭头位置
    transform: translateX(12px) rotate(90deg);
  }

  .el-table__expand-icon {
    font-size: 20px;
    margin-top: -8px;
    .el-icon-arrow-right:before {
      // 设置箭头样式
      content: '\e791';
      height: 26px;
      color: rgba(#333333, 0.4);
    }
  }
}

.card-style {
  border-radius: 2px;
}

.search-style {
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>
