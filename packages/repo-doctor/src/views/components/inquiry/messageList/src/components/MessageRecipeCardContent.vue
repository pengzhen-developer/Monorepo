<template>
  <div>
    <MessageRecipeCard :diagnosis="diagnosis"
                       :drugInfo="drugInfo"
                       :visitingTime="visitingTime"
                       @onClickDetail="onClickDetail"></MessageRecipeCard>

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
import MessageRecipeCard from './MessageRecipeCard'
import RecipeDetail from '@src/views/components/recipe/RecipeDetail'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageRecipeCard,
    RecipeDetail
  },
  computed: {
    diagnosis() {
      return this.message.content.data.recipeInfo && this.message.content.data.recipeInfo.diagnosis
    },
    drugInfo() {
      return this.message.content.data.recipeInfo && this.message.content.data.recipeInfo.drugInfo
    },
    visitingTime() {
      return this.message.content.data.recipeInfo && this.message.content.data.recipeInfo.visitingTime
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
  methods: {
    onClickDetail() {
      this.recipeDetail.visible = true
      this.recipeDetail.data = {}

      const params = {
        inquiry_no: this.message.content.data.inquiryInfo.inquiryNo,
        prescriptionId: this.message.content.data.recipeInfo.recipeId
      }
      Peace.service.prescribePrescrip.getPrescripInfo(params).then((res) => {
        this.recipeDetail.data = res.data
      })
    }
  }
}
</script>

<style>
</style>