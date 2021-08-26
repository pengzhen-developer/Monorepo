// 前置审方

<template>
  <div>
    <el-empty v-if="propsError"
              description="请检查Props"></el-empty>
    <div v-loading="loading"
         style="min-height: 300px">
      <div class="q-mb-lg q-mt-sm q-pl-20 q-pt-24 flex items-center"
           v-bind:style="{'color':getSystemAuditResultsTextColor()}">

        <el-image style="width: 30px; height: 30px;"
                  v-bind:src="getIcon()"></el-image>

        <span class="text-h5 text-weight-bold q-ml-md">
          {{ rulestData.actionMsg }}
        </span>

      </div>

      <div class="card q-mb-md q-mx-sm"
           v-for="(checkItem,index) in rulestData.resultMsgs"
           v-bind:key="index">
        <div class="flex items-center text-weight-bold q-py-md q-px-lg bg-grey-2">
          <div v-bind:style="{'background':getSystemAuditResultsTextColor(checkItem.actionCode)}"
               class="relative-position"
               style="width: 4px; height: 16px; left: -24px"></div>
          <span class="q-mr-md text-subtitle2 text-weight-bolder">{{ checkItem.title }}</span>
          <span v-bind:style="{'background':getSystemAuditResultsTextColor(checkItem.actionCode)}"
                class="text-white text-caption q-py-none q-px-sm">{{ checkItem.actionName }}</span>
        </div>

        <div class="content q-px-lg q-py-md"
             v-for="actionItem in checkItem.list"
             v-bind:key="actionItem.id">
          <div class="row">
            <div class="col-2 text-weight-bold text-justify"
                 style="min-width:4.4em ;padding-right:0.4em ;">{{ actionItem.ruleMsg }}</div>
            <div class="col-1 text-weight-bold"
                 style="min-width:2.2em ;"
                 v-bind:style="{'color':getSystemAuditResultsTextColor(actionItem.actionCode)}">{{ actionItem.actionMsg }}</div>
            <div class="col q-pl-sm"
                 style="word-break: break-all;">{{ actionItem.ruleMsgText }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service'
export default {
  name: 'PrescriptionAudit',
  props: {
    data: {
      type: Object,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },

  created() {
    if (!Peace.validate.isEmpty(this.id)) {
      this.getResultInfo()
    } else if (this.data && Object.keys(this.data).length > 0) {
      this.rulestData = Object.assign({}, this.data)
    } else {
      this.propsError = true
    }
  },

  data() {
    return {
      propsError: false,
      loading: false,
      rulestData: {},
      source: {
        //系统审核结果背景色
        ADIUT_THEME_MAP: CONSTANT.ADIUT_THEME_MAP,
        SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP: CONSTANT.SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP
      }
    }
  },
  methods: {
    getIcon() {
      if (this.rulestData?.actionCode) {
        return require(`../assets/img/system_audit_status_big_${this.rulestData?.actionCode}.png`)
      } else {
        return ''
      }
    },
    //系统审方color
    getSystemAuditResultsTextColor(code = this.rulestData?.actionCode) {
      return this.source.SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP.find((item) => item.value === code)?.color
    },
    getResultInfo() {
      this.loading = true
      Service.getActionDetail({ jztClaimNo: this.id })
        .then((result) => {
          this.rulestData = result.data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
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