<template>
  <div class="apply-refund-style">
    <div class="tip-card">
      <div class="title">退款注意事项：</div>
      <div class="q-mb-4">1、已完成对账结算的订单尽量避免在线退款，否则将会影响历史账单；</div>
      <div class="q-mb-4">2、与医院his进行交互的订单尽量避免在线退款，否则将会出现幂药云支付状态与医院订单支付状态账单不一致的情况；</div>
      <div class="q-mb-4">3、订单自费金额为0时，不支持发起退款；</div>
      <div>4、订单退款后，仅支付状态会更新，订单状态不会变化；</div>
    </div>
    <el-form inline
             ref="searchForm"
             label-suffix="："
             :rules="searchRules"
             v-bind:model="searchModel">

      <el-form-item label="订单编号"
                    prop="orderNo">
        <el-input v-model="searchModel.orderNo"
                  clearable
                  placeholder="请输入"
                  style="width:260px;"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary"
                   v-bind:loading="searchModel.loading"
                   v-on:click="fetch">查询
        </el-button>
      </el-form-item>
    </el-form>

    <div>

      <div v-if="result">

        <!--  订单详情      -->
        <div class="result-table-style">

          <div class="result-table-card">
            <div>
              <span class="text-grey-999">订单编号</span>
              <span>{{result.orderNo || '——'}}</span>
            </div>

            <div>
              <span class="text-grey-999">订单类型</span>
              <span>{{result.orderType | filterDictionaryFuzzy(source.orderType,'——') }}</span>
            </div>

            <div>
              <span class="text-grey-999">下单时间</span>
              <span>{{result.createdTime || '——'}}</span>
            </div>
            <template v-if="canShowPayInfo">
              <div>
                <span class="text-grey-999">支付方式</span>
                <span>{{  result.payInfo.paymentTypeTxt?result.payInfo.payModeTxt + ' - ' +result.payInfo.paymentTypeTxt :  result.payInfo.payModeTxt }}</span>
              </div>

              <div v-if="result.payInfo.deductionTypeTxt">
                <span class="text-grey-999">抵扣类型</span>
                <span>{{  result.payInfo.deductionTypeTxt }}</span>
              </div>
              <template v-if="result.payInfo.deductionType === 'yibaopay'">
                <div v-if="result.payInfo.medicalTreatmentTypetxt">
                  <span class="text-grey-999">医保类型</span>
                  <span>{{  result.payInfo.medicalTreatmentTypetxt }}</span>
                </div>
                <div v-if="result.payInfo.diseasesTxt && result.payInfo.medicalTreatmentType === 2">
                  <span class="text-grey-999">病种</span>
                  <span>{{  result.payInfo.diseasesTxt }}</span>
                </div>
              </template>

              <template v-if="result.payInfo.deductionType === 'servicePackage'">
                <div v-if="result.payInfo.servicePackageName">
                  <span class="text-grey-999">服务包名称</span>
                  <span>{{  result.payInfo.servicePackageName }}</span>
                </div>
                <div v-if="result.payInfo.equitiesName">
                  <span class="text-grey-999">服务包权益</span>
                  <span>{{  result.payInfo.equitiesName }}</span>
                </div>
              </template>
            </template>
            <div>
              <span class="text-grey-999">订单状态</span>
              <span>{{result.orderStatusTxt || '——'}}</span>
            </div>

            <div>
              <span class="text-grey-999">支付状态</span>
              <span>{{result.payStatusTxt || '——'}}</span>
            </div>

            <div v-if="result.completionTime">
              <span class="text-grey-999">完单时间</span>
              <span>{{result.completionTime || '——'}}</span>
            </div>
          </div>

          <div class="result-table-card">
            <div>
              <span class="text-grey-999">订单费用</span>
              <span>{{result.totalMoney?'￥'+ result.totalMoney: '——'}}</span>
            </div>
            <div>
              <span class="text-grey-999">自费金额</span>
              <span class="red-color">{{result.orderMoney ?'￥'+ result.orderMoney: '——'}}</span>
            </div>
          </div>
        </div>

        <!--  退款申请From      -->
        <el-form v-if="canApplyRefund"
                 ref="applyForm"
                 class="q-mt-24"
                 label-width="90px"
                 v-bind:rules="applyRules"
                 v-bind:model="applyModel">

          <el-form-item label="退款备注："
                        prop="remark">
            <el-input v-model="applyModel.remark"
                      show-word-limit
                      type="textarea"
                      maxlength="200"
                      placeholder="请输入"
                      style="width:390px;"
                      v-bind:rows="3"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary"
                       size="medium"
                       style="width:100%;"
                       v-bind:loading="applyModel.loading"
                       v-on:click="apply">申请退款
            </el-button>
          </el-form-item>
        </el-form>

        <!--  不能申请退款Tips      -->
        <!-- <div v-else
             class="tips-style text-orange">

          <i type="warn"
             class="el-icon-warning q-mt-4"></i>

          <div class="q-ml-8 column">
            <span class="text-grey-666 q-mb-8">1、当月15号前，可支持 上个月/本月、完结状态（已完成/已拒签）、 已付款状态发起退款；</span>
            <span class="text-grey-666">2、当月15号后，可支持 本月、完结状态（已完成/已拒签）、已付款状态 发起退款；</span>
          </div>
        </div> -->

      </div>

      <!-- 用来展示空态页 -->
      <PeaceTable v-if="showEmptyView"
                  emptyText="未查到符合条件的订单！"></PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'ApplyRefund',
  data() {
    return {
      searchModel: {
        orderNo: undefined,
        loading: false
      },

      applyModel: {
        orderNo: undefined,
        again: undefined,
        remark: undefined,
        loading: false
      },

      // 订单详情
      result: undefined,
      canShowApplyRefund: false,
      // 用来标记空态页展示状态
      hasSearch: false,

      searchRules: {
        orderNo: [{ required: true, message: '请输入订单编号', trigger: 'blur' }]
      },

      applyRules: {
        remark: [{ required: true, message: '请输入退款备注', trigger: 'blur' }]
      },

      source: {
        orderType: []
      }
    }
  },

  computed: {
    canShowPayInfo() {
      return this.result.appointmentStatus === undefined || this.result.appointmentStatus === 0 || (this.result.appointmentStatus > 0 && this.result.reportTime)
    },
    showEmptyView() {
      return this.hasSearch && !this.result
    }
  },

  async mounted() {
    this.source.orderType = await Peace.identity.dictionary.getList('service_order_type')
  },
  methods: {
    // 可以申请退款
    canApplyRefund() {
      // refundOrderStatus: 1：退款中 2：退款异常 3已退款 4退款关闭 , (undefined | null) 未退过款
      // 可退款的条件：
      // 1. this.result.completionTime != undefined
      // 2. refundOrderStatus 的值为以下 [undefined, 2退款异常, 4退款关闭]
      this.canShowApplyRefund =
        !Peace.validate.isEmpty(this.result.completionTime) &&
        (Peace.validate.isEmpty(this.result.refundOrderStatus) || [2, 4].includes(this.result.refundOrderStatus))
    },
    fetch() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.fetchData()
        }
      })
    },

    clearApplyModel() {
      this.hasSearch = false
      this.applyModel.orderNo = undefined
      this.applyModel.again = undefined
      this.applyModel.remark = undefined
    },

    fetchData() {
      this.clearApplyModel()
      this.searchModel.loading = true
      const orderNo = String(this.searchModel.orderNo)

      Service.searchOrder(orderNo)
        .then((res) => {
          this.result = res.data
          this.canApplyRefund()
        })
        .catch(() => {
          this.result = undefined
        })
        .finally(() => {
          this.searchModel.loading = false
          this.hasSearch = true
        })
    },

    // 点击申请退款
    apply() {
      this.$refs.applyForm.validate((valid) => {
        if (valid) {
          this.applyFetch()
        }
      })
    },

    // 申请退款
    applyFetch() {
      this.applyModel.orderNo = this.result.orderNo
      if (Peace.validate.isEmpty(this.result.refundOrderStatus)) {
        this.applyModel.again = 0
      } else {
        this.applyModel.again = 1
      }
      const params = Peace.util.deepClone(this.applyModel)
      this.applyModel.loading = true
      Service.applyRefund(params)
        .then(() => {
          //提交成功后，toast提示操作成功，回到初始页面
          Peace.util.alert('操作成功')
          this.result = undefined
          this.hasSearch = false
          this.searchModel.orderNo = ''
        })
        .finally(() => {
          this.applyModel.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// 隐藏table boder
::v-deep .el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: white;
}

.apply-refund-style {
  padding: 9px 24px 24px;
}
.red-color {
  color: #ea3930;
}
.tip-card {
  background: var(--q-color-primary-light-1);
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  .title {
    color: #ea3930;
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
}
.el-form {
  width: 480px;
}
.result-table-style {
  width: 480px;
  // border: 1px solid rgba(#333, 0.1);
  .result-table-card {
    & div {
      margin: 4px 0;
      display: flex;
      align-items: center;
      span {
        display: block;
        &:first-child {
          min-width: 4.4em;
          margin-right: 1em;
        }
      }
    }
    padding: 8px 16px;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 12px;
  }
}

// .tips-style {
//   margin-top: 24px;
//   display: flex;
//   padding: 8px 12px;
//   width: 481px;
//   background: #fffaf3;
//   border: 1px solid #ffd99e;
// }
</style>
