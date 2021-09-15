<template>
  <div>
    <MessageSystem :text="text"
                   @onClickText="onClickText"></MessageSystem>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageSystem from './MessageSystem'
import { Dialog } from 'vant'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    MessageSystem
  },
  computed: {
    text() {
      return this.getMessageText()
    }
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    getMessageText() {
      if (this.message.content && this.message.content.data && this.message.content.data.showTextInfo) {
        return this.message.content.data.showTextInfo.patientClientText
      }

      if (this.message.text) {
        return this.message.text
      }
    },
    onClickText() {
      //去评价
      if (this.type === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示) {
        const json = peace.util.encode({
          inquiryNo: this.message.content.data.inquiryInfo.inquiryNo
        })

        this.$router.push(`/components/CommentForDoctor/${json}`)
      }
      //去购药
      else if (this.type === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.审核处方通过) {
        this.gotoRecipeDetail()
      }
      //服务包提醒
      else if (this.type === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务包提醒) {
        const params = peace.util.encode({
          doctorId: this.message.content.data.doctorInfo.doctorId
        })

        this.$router.push(`/servicePackage/list/${params}`)
      }
    },

    gotoRecipeDetail() {
      if (this.flag) {
        return
      }
      this.flag = true
      const params = peace.util.encode({
        prescribeId: this.message.content.data.recipeInfo.recipeId
      })
      //跳转前校验当前处方状态--已作废不能调转详情

      const param = { prescribeId: this.message.content.data.recipeInfo.recipeId }

      peace.service.patient
        .getPrescripInfo(param)
        .then((res) => {
          const prescriptionStatus = res.data.prescriptionStatus.key
          if (prescriptionStatus == 3 || prescriptionStatus == 4) {
            return Dialog.confirm({
              title: '温馨提示',
              message: '该处方已作废，不可查看详情',
              onfirmButtonText: '确定',
              showCancelButton: false
            })
          } else {
            this.$router.push(`/components/theRecipe/${params}`)
          }
        })
        .finally(() => {
          this.flag = false
        })
    }
  }
}
</script>

<style>
</style>