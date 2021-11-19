// 前置审方

<template>
  <div>
    <el-empty v-if="propsError"
              description="请检查Props"></el-empty>
    <div v-loading="loading"
         style="min-height: 300px">
      <div class="q-mb-22 flex items-center"
           v-bind:style="{'color':tagBackgroundColor()}">

        <el-image style="width: 30px; height: 30px;"
                  v-bind:src="getIcon()"></el-image>

        <span class="text-h5 text-weight-bold q-ml-md">
          {{ checkedResult.actionMsg }}
        </span>

      </div>

      <div v-if="showPresTranscodingResult"
           class="pre-card q-mb-8 ">
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

        <div class="card q-mb-8"
             v-for="(checkItem,index) in checkedResult.transFormArray"
             v-bind:key="index">

          <div class="flex items-center q-py-14 q-px-md"
               style="background: #F9F9F9;">
            <span class="q-mr-md text-weight-Medium"
                  style="font-size: 18px;">{{ checkItem.title }}</span>
            <!-- <span class="text-grey-6"> 50mg*6袋 </span> -->
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
import CONSTANT from './constant'
import Service from './service'
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
  watch: {
    data: {
      handler: function(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
          if (val && Object.keys(val).length > 0) {
            this.propsError = false
            this.transFormData(val)
          } else {
            this.propsError = true
          }
        }
      },
      immediate: true
    },

    id: {
      handler: function(val, oldVal) {
        if (val !== oldVal) {
          this.propsError = false
          this.getResultInfo()
        }
      },
      immediate: true
    }
  },
  created() {},

  data() {
    return {
      propsError: false,
      loading: false,
      checkedResult: {
        engineCode: '',
        actionCode: '',
        actionMsg: '',
        presTranscodingResult: [],
        transFormArray: []
      },
      source: {
        PRESCRIPTION_CHECK_RESULT: CONSTANT.PRESCRIPTION_CHECK_RESULT
      }
    }
  },

  computed: {
    showDrugRules() {
      return this.checkedResult.transFormArray && this.checkedResult.transFormArray.length > 0
    },
    showPresTranscodingResult() {
      return this.checkedResult.presTranscodingResult && this.checkedResult.presTranscodingResult.length > 0
    }
  },

  methods: {
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
        this.checkedResult = data
      } else {
        data.transFormArray = []
        this.checkedResult = data
      }
    },
    resultTipsText(items) {
      let text = ''
      for (const item of items) {
        text += item.ruleMsg + ' ' + item.ruleMsgText + ' '
      }
      return text
    },
    getIcon() {
      const code = this.checkedResult?.actionCode
      if (code && ['D', 'I', 'R', 'OK', 'FAIL', 'SERVER_ERR', 'ERR'].includes(code)) {
        return require(`./assets/img/system_audit_status_result_${code}.png`)
      } else {
        return ''
      }
    },
    tagBackgroundColor(type = this.checkedResult?.actionCode) {
      if (Peace.validate.isEmpty(type)) {
        return 'none'
      }
      return this.source.PRESCRIPTION_CHECK_RESULT[`${type}`].color
    },

    getResultInfo() {
      this.loading = true
      Service.getActionDetail({ jztClaimNo: this.id })
        .then((result) => {
          this.transFormData(result.data)
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