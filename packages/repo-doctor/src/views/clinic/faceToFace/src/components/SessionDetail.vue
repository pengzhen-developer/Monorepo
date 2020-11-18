<template>
  <div>
    <SendReceive v-if="showWriteRecipe"></SendReceive>
    <ReceiveList v-else></ReceiveList>
  </div>
</template>

<script>
import SendReceive from './SendRecipe/index'
import ReceiveList from './RecipeList/index'
import { store } from '../store'

export default {
  components: {
    SendReceive,
    ReceiveList
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