<template>
  <div>
    <MessageRecipeCard :diagnosis="diagnosis"
                       :drugInfo="drugInfo"
                       :visitingTime="visitingTime"
                       @onClickDetail="onClickDetail"></MessageRecipeCard>
    <peace-dialog :visible.sync="recipeDetail.visible"
                  v-if="recipeDetail.visible"
                  append-to-body
                  title="处方详情">
      <RecipeDetail v-bind:data="recipeDetail.data"></RecipeDetail>
    </peace-dialog>
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
      const params = {
        inquiry_no: this.message.content.data.inquiryInfo.inquiryNo,
        prescriptionId: this.message.content.data.recipeInfo.recipeId
      }
      peace.service.prescribePrescrip.getPrescripInfo(params).then((res) => {
        this.recipeDetail.visible = true
        this.recipeDetail.data = res.data
      })
    }
  }
}
</script>

<style>
</style>