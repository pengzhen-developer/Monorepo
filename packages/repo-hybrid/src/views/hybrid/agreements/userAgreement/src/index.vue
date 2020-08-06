<template>
  <div>
    <PatientUserAgreement v-if="isPatient">

    </PatientUserAgreement>

    <DoctorUserAgreement v-else>

    </DoctorUserAgreement>
  </div>
</template>

<script>
import DoctorUserAgreement from './components/DoctorUserAgreement'
import PatientUserAgreement from './components/PatientUserAgreement'

export default {
  components: {
    DoctorUserAgreement,
    PatientUserAgreement
  },

  computed: {
    isPatient() {
      return this.$route.params.platform === 'H5' || this.$route.params.platform === 'Wechat'
    }
  }
}
</script>


<style >
</style>
