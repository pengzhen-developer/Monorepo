<!--
 * @Description: 审方结果
-->

<template>
  <div v-loading="loading">
    <div style="min-height: 300px"
         v-if="checkedResult?.actionCode">
      <div class="q-mb-lg q-mt-sm q-px-sm q-pt-24 flex items-center"
           v-bind:style="{'color': tagBackgroundColor()}">

        <el-image style="width: 30px; height: 30px;"
                  v-bind:src="getIcon()"></el-image>

        <span class="text-h5 text-weight-bold q-ml-md">
          {{ checkedResult.actionMsg }}
        </span>

      </div>

      <div v-if="showPresTranscodingResult"
           class="pre-card q-mb-md q-mx-sm q-mb-sm">
        <div class="content"
             v-for="(item, index) in checkedResult.presTranscodingResult"
             v-bind:key="index">
          <div class="q-ma-md">
            <div class="text-weight-Medium text-subtitle1 q-mr-md">{{item.title}}</div>
            <div class="text-grey-666"
                 style="word-break: break-all">{{ resultTipsText(item.list) }}</div>
          </div>
        </div>
      </div>

      <div v-if="showDrugRules">
        <div class="card q-mb-md q-mx-sm"
             v-for="(checkItem,index) in checkedResult.transFormArray"
             v-bind:key="index">

          <div class="flex items-center q-py-14 q-px-md"
               style="background: #F9F9F9;">
            <span class="q-mr-md text-weight-Medium"
                  style="font-size: 18px;">{{ checkItem.title }}</span>
          </div>

          <div class="content q-pl-10 q-pr-18 q-py-md"
               v-for="actionItem in checkItem.list"
               v-bind:key="actionItem.id">

            <div class="row items-center q-mb-sm">
              <div v-if="actionItem.ruleTypeText"
                   class="text-weight-Medium text-subtitle1 q-mr-sm">【{{actionItem.ruleTypeText}}】</div>

              <div v-if="actionItem.ruleMsg"
                   class="q-ml-8 text-weight-Medium text-subtitle1 q-mr-md">{{actionItem.ruleMsg}}</div>

              <span v-if="actionItem.resultType == 3"
                    class="union-tag-style">
                联合审方
              </span>

              <span :style="{'background-color': tagBackgroundColor(actionItem.actionCode)}"
                    class="item-tag-style text-white">
                {{actionItem.actionMsg}}
              </span>
            </div>

            <div class="q-ml-8 text-grey-666"
                 style="word-break: break-all">{{ actionItem.ruleMsgText }}</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const PRESCRIPTION_AUDIT_RESULT_CONFIG = {
  /** 通过 */
  ['OK']: { color: 'rgba(48, 153, 166, 1)' },
  /** 提示 */
  ['I']: { color: 'rgba(48, 153, 166, 1)' },
  /** 慎用 */
  ['R']: { color: 'rgba(240, 152, 21, 1)' },
  /** 禁用 */
  ['D']: { color: 'rgba(196, 2, 2, 1)' },
  /** 失败 */
  ['FAIL']: { color: 'rgba(51, 51, 51, 0.6)' },
  /** 错误 */
  ['ERR']: { color: 'rgba(51, 51, 51, 0.2)' },
  /** 服务调用失败 */
  ['SERVER_ERR']: { color: 'rgba(196, 2, 2, 1)' }
}

export default {
  name: 'PeacePrescriptionAuditResult',

  props: {
    data: {
      type: [Object, Function],
      required: false
    }
  },

  data() {
    return {
      loading: false,
      internalData: undefined
    }
  },

  watch: {
    data: {
      async handler() {
        this.loading = true
        this.internalData = await this.fetch()
        this.loading = false
      },
      immediate: true
    }
  },

  computed: {
    checkedResult() {
      return this.internalData && this.transFormData(this.internalData)
    },

    showDrugRules() {
      return this?.checkedResult?.transFormArray && this?.checkedResult?.transFormArray.length > 0
    },

    showPresTranscodingResult() {
      return this?.checkedResult?.presTranscodingResult && this?.checkedResult?.presTranscodingResult.length > 0
    }
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    },

    transFormData(data) {
      let tmpData = data.resultMsgs ?? []

      if (tmpData && Peace.util.isArray(tmpData) && tmpData.length > 0) {
        tmpData = tmpData.filter((item) => item.actionCode === 'FAIL')
        if (tmpData.length === 0) {
          tmpData = data.resultMsgs
        }

        const tmp = {}
        for (const item of tmpData) {
          if (tmp[item.productName]) {
            tmp[item.productName].push(item)
          } else {
            tmp[item.productName] = [].concat([item])
          }
        }
        const tmpArray = []
        for (const key in tmp) {
          tmpArray.push({
            title: key,
            list: tmp[key]
          })
        }

        data.transFormArray = tmpArray
      } else {
        data.transFormArray = []
      }

      return data
    },

    resultTipsText(items) {
      let text = ''
      for (const item of items) {
        text += item.ruleMsg + ' ' + item.ruleMsgText + ' '
      }
      return text
    },

    getIcon() {
      if (Object.keys(PRESCRIPTION_AUDIT_RESULT_CONFIG).includes(this.checkedResult?.actionCode)) {
        return require(`./assets/img/system_audit_status_result_${this.checkedResult?.actionCode}.png`)
      } else {
        return ''
      }
    },

    tagBackgroundColor(type = this.checkedResult?.actionCode) {
      if (Peace.validate.isEmpty(type)) {
        return 'none'
      }
      return PRESCRIPTION_AUDIT_RESULT_CONFIG[`${type}`].color
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #f9f9f9;
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

.item-tag-style {
  text-align: center;
  padding: 0 7px;
  min-width: 44px !important;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
}

.union-tag-style {
  text-align: center;
  color: #3099a6;
  font-size: 12px;
  width: 64px;
  height: 19px;
  border-radius: 2px;
  border: 1px solid #3099a6;
  margin-right: 16px;
}

.pre-card {
  padding: 0px;
  background: white;
  border: 1px solid rgba(245, 245, 245, 1);
  border-radius: 4px;

  .content:not(:last-child) {
    background: #fff;
    border-bottom: 1px dashed rgba(51, 51, 51, 0.2);
  }
}

.card {
  padding: 0px;
  background: rgba(245, 245, 245, 1);
  border: 1px solid rgba(245, 245, 245, 1);
  border-radius: 4px;

  .content {
    background: #fff;
    border-top: 1px dashed rgba(51, 51, 51, 0.2);
  }
}
</style>