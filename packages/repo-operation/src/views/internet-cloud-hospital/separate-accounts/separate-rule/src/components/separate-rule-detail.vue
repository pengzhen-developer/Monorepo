<template>
  <div>
    <el-form ref="form"
             label-width="100px"
             label-position="right"
             label-suffix="："
             size="mini">
      <el-form-item label="服务类型">
        {{detail.serviceTypeStr}}
      </el-form-item>
      <el-form-item label="机构名称"
                    prop="custCode">
        {{detail.organizationName}}
      </el-form-item>
      <el-form-item label=""
                    label-width="0"
                    v-for="(rule,index) in  detail.profitsharingRule"
                    v-bind:key="index">
        <el-divider></el-divider>
        <div class="row justify-between rule"><span class="num">规则{{toChinaNum(index+1)}}</span> </div>
        <el-form-item label="订单类型"
                      label-position="left"
                      label-width="100px">
          {{orderTypeText(rule.orderType)}}
        </el-form-item>
        <template v-if="rule.isProfitsharing==0">
          <el-form-item label="是否分账"
                        label-position="left"
                        label-width="100px">
            {{rule.isProfitsharing==1?'是':'否'}}
          </el-form-item>
        </template>
        <template v-if="rule.isProfitsharing==1">
          <el-form-item v-for="(account,acc_index) in rule.accounts"
                        :key="acc_index">
            <el-form-item label="分账人账号"
                          label-width="100px"
                          class="tow-col col-left">
              <div class="receive_name">{{account.receive_name+' '+account.receive_account}}</div>
            </el-form-item>
            <el-form-item label="分账比例"
                          label-width="100px"
                          class="tow-col col-right">
              {{account.percentage}}%
            </el-form-item>
          </el-form-item>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Util from '../util/utils'
export default {
  name: 'SeparateRuleDetail',
  props: {
    info: Object,
    orderTypes: Array
  },
  data() {
    return {
      toChinaNum: Util.toChinesNum,
      detail: {},
      source: {
        orderType: []
      }
    }
  },
  created() {
    this.detail = Object.assign({}, this.detail, this.info)
    this.source.orderType = this.orderTypes
  },

  methods: {
    orderTypeText(orderType) {
      return this.source.orderType.find((item) => item.value == orderType).label
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 10px;
  .el-form-item__label {
    color: #333;
  }
  .el-form-item__content {
    color: #666;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}

.tow-col {
  &.col-left {
    width: 69%;
    margin-right: 1%;
    .receive_name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &.col-right {
    width: 30%;
  }
  display: inline-block;
  vertical-align: middle;
}

.el-divider {
  margin: 10px 0 15px 0;
}
.rule {
  margin-bottom: 20px;
  .num {
    padding-left: 15px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    position: relative;
    &::before {
      width: 4px;
      height: 16px;
      background: var(--q-color-primary);
      border-radius: 2px 2px 0px 2px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .del {
    color: var(--q-color-primary);
    cursor: pointer;
  }
}
</style>