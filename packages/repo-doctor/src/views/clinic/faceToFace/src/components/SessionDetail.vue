<template>
  <div>
    <PrescriptionSend v-if="showWriteRecipe"></PrescriptionSend>
    <RegisterSendPrescription v-else-if="showRegister"></RegisterSendPrescription>
    <PrescriptionList v-else></PrescriptionList>
  </div>
</template>

<script>
import RegisterSendPrescription from './RegisterSendPrescription.vue'
import PrescriptionList from './PrescriptionList.vue'
import PrescriptionSend from './PrescriptionSend.vue'
import { store } from '../store'

export default {
  components: {
    PrescriptionList,
    PrescriptionSend,
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