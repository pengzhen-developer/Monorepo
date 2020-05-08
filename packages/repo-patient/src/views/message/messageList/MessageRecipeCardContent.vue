<template>
  <div>
    <MessageRecipeCard :diagnosis="diagnosis"
                       :drugInfo="drugInfo"
                       :visitingTime="visitingTime"
                       @onClickDetail="onClickDetail"></MessageRecipeCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageRecipeCard from './MessageRecipeCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageRecipeCard
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
  methods: {
    onClickDetail() {
      const params = peace.util.encode({
        prescribeId: this.message.content.data.recipeInfo.recipeId
      })

      this.$router.push(`/components/theRecipe/${params}`)
    }
  }
}
</script>

<style>
</style>