<template>
  <div>
    <p class="q-mb-md text-subtitle1">
      您是否已经解决了患者的问题？
    </p>

    <div class="q-ml-md">

      <el-radio-group class="block"
                      v-model="state">
        <el-radio label="已解决"
                  class="block q-mb-md">已解决</el-radio>
        <el-radio label="未解决"
                  class="block q-mb-md">未解决</el-radio>
      </el-radio-group>

      <el-radio-group class="block q-ml-lg"
                      v-if="canShowMoreReason"
                      v-model="description">
        <el-radio label="不对症"
                  class="block q-mb-md">不对症</el-radio>
        <el-radio label="需面诊"
                  class="block q-mb-md">需面诊</el-radio>
        <el-radio label="其他"
                  class="block q-mb-sm">其他</el-radio>
      </el-radio-group>

      <el-input class="q-ml-lg"
                style="width: 80%;"
                placeholder="请填写15字内原因"
                type="textarea"
                maxlength="15"
                ref="quitInput"
                v-if="canShowMoreReason"
                v-model.trim="otherDescription"
                v-bind:disabled="canInput"
                v-bind:rows="3"></el-input>
    </div>

    <div style="text-align: center; margin: 10px 0 0 0;">
      <el-button v-on:click="cancel">取消</el-button>

      <el-button type="primary"
                 v-bind:disabled="submitDisable"
                 v-on:click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'
import Service from './../../service'

export default {
  data() {
    return {
      state: '',

      description: '',
      otherDescription: ''
    }
  },

  computed: {
    inquiryInfo() {
      return this.$store.state.inquiry?.session?.content?.inquiryInfo
    },

    canShowMoreReason() {
      return this.state === '未解决'
    },

    canInput() {
      return this.description !== '其他'
    },

    submitDisable() {
      if (this.state === '已解决') {
        return false
      } else if (this.description === '其他') {
        return Peace.validate.isEmpty(this.otherDescription)
      } else {
        return Peace.validate.isEmpty(this.description)
      }
    }
  },

  watch: {
    description(value) {
      this.otherDescription = ''

      if (value === '其他') {
        this.$refs.quitInput.focus()
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('close')
    },

    confirm() {
      const params = {
        inquiryNo: this.inquiryInfo.inquiryNo
      }

      if (this.state === '已解决') {
        Service.checkOverInquiry(params).then((res) => {
          // 无效会话
          if (res.data.status === 1) {
            const message = '系统检测到当前为无效会话，此时结束咨询将做退诊处理，确定退诊吗？'
            const confirmOption = { type: 'warning', confirmButtonText: '退诊' }

            Peace.util.confirm(message, undefined, confirmOption, () => {
              Service.quitInquiry(params)
                .then((res) => {
                  Peace.util.alert(res.msg)

                  Util.IM.inquiryHelper.resetInquirySession()
                  Util.IM.inquiryHelper.resetInquirySessionMessages()
                })
                .finally(() => {
                  this.cancel()
                })
            })
          }
          // 未填写病历
          else if (res.data.caseStatus === 1) {
            const message = '给用户发送病历后才能选择【已解决】，是否立即填写病历？'
            const confirmOption = { type: 'warning', confirmButtonText: '去填写' }

            Peace.util.confirm(message, undefined, confirmOption, () => {
              this.cancel()
              this.sendCase()
            })
          }
          // 正常问诊
          else if (res.data.caseStatus === 2 && res.data.status === 2) {
            Service.overInquiry(params)
              .then((res) => {
                Peace.util.alert(res.msg)

                Util.IM.inquiryHelper.resetInquirySession()
                Util.IM.inquiryHelper.resetInquirySessionMessages()
              })
              .finally(() => {
                this.cancel()
              })
          }
        })
      } else if (this.state === '未解决') {
        const description = this.description === '其他' ? this.otherDescription.trim() : this.description

        if (!description) {
          return Peace.util.warning('请选择未解决原因。')
        } else {
          params.overCause = description
        }

        const message = '未解决用户问题，此时结束咨询将做退诊处理，确定退诊吗？'
        const confirmOption = { type: 'warning', confirmButtonText: '退诊' }
        Peace.util.confirm(message, undefined, confirmOption, () => {
          Service.quitInquiry(params)
            .then((res) => {
              Peace.util.alert(res.msg)

              Util.IM.inquiryHelper.resetInquirySession()
              Util.IM.inquiryHelper.resetInquirySessionMessages()
            })
            .finally(() => {
              this.cancel()
            })
        })
      }
    }
  }
}
</script>

<style>
</style>