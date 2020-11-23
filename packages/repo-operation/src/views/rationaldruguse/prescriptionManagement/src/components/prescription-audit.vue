// 前置审方

<template>
  <div>
    <div class="header q-pl-16">系统审方结果</div>
    <div class="q-mb-lg q-mt-sm q-pl-20 q-pt-24 flex items-center"
         v-bind:style="{'color':getSystemAuditResultsTextColor()}">

      <el-image style="width: 30px; height: 30px;"
                v-bind:src="getIcon()"></el-image>

      <span class="text-h5 text-weight-bold q-ml-md">
        {{ data.actionMsg }}
      </span>

    </div>

    <div class="card q-mb-md q-mx-sm"
         v-for="checkItem in data.resultMsgs"
         v-bind:key="checkItem.productCode">
      <div class="flex items-center text-weight-bold q-py-md q-px-lg bg-grey-2">
        <div v-bind:style="{'background':getSystemAuditResultsTextColor(checkItem.actionCode)}"
             class="relative-position"
             style="width: 4px; height: 16px; left: -24px"></div>
        <span class="q-mr-md text-subtitle2 text-weight-bolder">{{ checkItem.productName }}</span>
        <span v-bind:style="{'background':getSystemAuditResultsTextColor(checkItem.actionCode)}"
              class="text-white text-caption q-py-none q-px-sm">{{ checkItem.actionMsg }}</span>
      </div>

      <div class="content q-px-lg q-py-md">
        <div class="row">
          <div class="col-2 text-weight-bold">{{ checkItem.ruleMsg }}</div>
          <div class="col-1 text-weight-bold"
               v-bind:style="{'color':getSystemAuditResultsTextColor(checkItem.actionCode)}">{{ checkItem.actionMsg }}</div>
          <div class="col q-pl-sm">{{ checkItem.ruleMsgText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'

export default {
  name: 'PrescriptionAudit',
  props: {
    data: Object
  },
  data() {
    return {
      source: {
        //系统审核结果背景色
        ADIUT_THEME_MAP: CONSTANT.ADIUT_THEME_MAP,
        SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP: CONSTANT.SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP
      }
    }
  },
  methods: {
    getIcon() {
      if (this.data?.actionCode) {
        return require(`../assets/img/system_audit_status_big_${this.data?.actionCode}.png`)
      } else {
        return ''
      }
    },
    //系统审方color
    getSystemAuditResultsTextColor(code = this.data?.actionCode) {
      return this.source.SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP.find((item) => item.value === code)?.color
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #eaf4f6;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}

.text-info {
  color: #3e96f9 !important;
}

.bg-info {
  background: #3e96f9 !important;
}

.card {
  padding: 2px;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;

  .content {
    background: #fff;
    border-radius: 4px;
  }
}
</style>