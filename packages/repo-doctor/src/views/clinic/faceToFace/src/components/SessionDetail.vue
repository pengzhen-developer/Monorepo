<template>
  <div>
    <SendRecipe v-if="showWriteRecipe"></SendRecipe>
    <RecipeList v-else></RecipeList>
  </div>
</template>

<script>
import SendRecipe from './SendRecipe/index'
import RecipeList from './RecipeList/index'
import { store } from '../store'

export default {
  components: {
    SendRecipe,
    RecipeList
  },

  computed: {
    showWriteRecipe() {
      return store.showWriteRecipe
    }
  }
}
</script>

<style>
</style>