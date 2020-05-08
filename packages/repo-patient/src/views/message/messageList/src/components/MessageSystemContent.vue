<template>
  <div>
    <MessageSystem :text="text"
                   @onClickText="onClickText"></MessageSystem>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageSystem from './MessageSystem'

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
      if (this.type === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.审核处方通过) {
        const params = peace.util.encode({
          prescribeId: this.message.content.data.recipeInfo.recipeId
        })

        this.$router.push(`/components/theRecipe/${params}`)
      }
    }
  }
}
</script>

<style>
</style>