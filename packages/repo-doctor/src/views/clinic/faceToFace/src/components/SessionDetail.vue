<template>
  <div>
    <SendRecipe v-if="showWriteRecipe"></SendRecipe>
    <RecipeList v-else></RecipeList>
  </div>
</template>

<script>
import SendRecipe from './SendRecipe'
import RecipeList from './RecipeList'
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