<template>
  <div class="cursor-pointer">
    <MessageQuestionRecipe @onClickText="onClickText"></MessageQuestionRecipe>
  </div>
</template>

<script>
import MessageQuestionRecipe from './MessageQuestionRecipe'

export default {
  inject: ['provideGetTab', 'provideAddTab'],

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
    MessageQuestionRecipe
  },
  computed: {
    text() {
      return this.getMessageText()
    }
  },
  methods: {
    // getMessageText() {
    //   if (this.message.content && this.message.content.data && this.message.content.data.showTextInfo) {
    //     return this.message.content.data.showTextInfo.doctorClientText
    //   }
    //
    //   if (this.message.text) {
    //     return this.message.text
    //   }
    // },
    onClickText() {
      const currentMenu = this.provideGetTab('PrescriptionDoubt')
      currentMenu.menuRoute = '/record/prescription-doubt/' + this.message.content.data.recipeInfo.recipeId
      // 跳转当前路由
      this.provideAddTab(currentMenu)
    }
  }
}
</script>

<style></style>
