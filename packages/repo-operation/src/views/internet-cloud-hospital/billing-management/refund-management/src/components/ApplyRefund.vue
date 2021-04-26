<template>
  <div class="apply-refund-style">
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

          <div>
            <span>订单编号：</span>
            <span class="text-grey-999">{{result.orderNo || '——'}}</span>
          </div>

          <div>
            <span>订单类型：</span>
            <span class="text-grey-999">{{result.orderTypeTxt || '——'}}</span>
          </div>

          <div>
            <span>订单金额：</span>
            <span class="text-grey-999">{{result.orderMoney || '——'}}</span>
          </div>

          <div>
            <span>下单时间：</span>
            <span class="text-grey-999">{{result.createdTime || '——'}}</span>
          </div>

          <div>
            <span>订单状态：</span>
            <span class="text-grey-999">{{result.orderStatusTxt || '——'}}</span>
          </div>

          <div>
            <span>支付状态：</span>
            <span class="text-grey-999">{{result.payStatusTxt || '——'}}</span>
          </div>

          <div>
            <span>完单时间：</span>
            <span class="text-grey-999">{{result.completionTime || '——'}}</span>
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
                      style="width:320px;"
                      v-bind:rows="3"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary"
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
      <PeaceTable v-if="showEmptyView"></PeaceTable>
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

      // 用来标记空态页展示状态
      hasSearch: false,

      searchRules: {
        orderNo: [{ required: true, message: '请输入订单编号', trigger: 'blur' }]
      },

      applyRules: {
        remark: [{ required: true, message: '请输入退款备注', trigger: 'blur' }]
      }
    }
  },

  computed: {
    // 可以申请退款
    canApplyRefund() {
      // refundOrderStatus: 1：退款中 2：退款异常 3已退款 4退款关闭 , (undefined | null) 未退过款
      // 可退款的条件：
      // 1. this.result.completionTime != undefined
      // 2. refundOrderStatus 的值为以下 [undefined, 2退款异常, 4退款关闭]
      return (
        !Peace.validate.isEmpty(this.result.completionTime) &&
        (Peace.validate.isEmpty(this.result.refundOrderStatus) || [2, 4].includes(this.result.refundOrderStatus))
      )
    },

    showEmptyView() {
      return this.hasSearch && !this.result
    }
  },

  methods: {
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
          this.fetch()
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
  padding: 14px 24px 24px;
}

.result-table-style {
  padding: 0 16px;
  width: 481px;
  border: 1px solid rgba(#333, 0.1);

  & div {
    margin: 8px 0;
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
