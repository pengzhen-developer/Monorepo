<template>
  <div class="cursor-pointer">
    <MessageQuestionRecipe @onClickText="onClickText"></MessageQuestionRecipe>

    <PeaceDialog append-to-body
                 title="处方详情"
                 v-if="recipeDetail.visible"
                 v-bind:visible.sync="recipeDetail.visible">
      <RecipeDetail v-bind:data="recipeDetail.data"
                    v-on:accept="() => { recipeDetail.visible = false }"
                    v-on:reject="() => { recipeDetail.visible = false }"></RecipeDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import MessageQuestionRecipe from './MessageQuestionRecipe'
import RecipeDetail from '@src/views/components/recipe/RecipeDetail'

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

  data() {
    return {
      recipeDetail: {
        visible: false,
        data: {}
      }
    }
  },

  components: {
    MessageQuestionRecipe,
    RecipeDetail
  },

  methods: {
    onClickText() {
      this.recipeDetail.visible = true
      this.recipeDetail.data = {}

      const params = {
        prescriptionId: this.message.content.data.recipeInfo.recipeId
      }

      Peace.service.prescribePrescrip.getPrescripInfo(params).then((res) => {
        this.recipeDetail.data = res.data
      })
    }
  }
}
</script>

<style></style>
