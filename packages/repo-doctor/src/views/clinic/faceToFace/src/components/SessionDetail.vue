<template>
  <div>
    <SendRecipe v-if="showWriteRecipe"></SendRecipe>
    <RegisterSendPrescription v-else-if="showRegister"></RegisterSendPrescription>
    <RecipeList v-else></RecipeList>
  </div>
</template>

<script>
import SendRecipe from './SendRecipe'
import RecipeList from './RecipeList'
import RegisterSendPrescription from './RegisterSendPrescription'
import { store } from '../store'

export default {
  components: {
    SendRecipe,
    RecipeList,
    RegisterSendPrescription
  },

  computed: {
    showWriteRecipe() {
      return store.showWriteRecipe
    },
    showRegister() {
      return store.showRegisterPatient
    }
  }
}
</script>

<style>
</style>