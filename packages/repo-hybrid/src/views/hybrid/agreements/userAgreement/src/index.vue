<template>
  <div class="q-ma-md">
    <PatientUserAgreement v-if="isPatient"></PatientUserAgreement>
    <DoctorUserAgreement v-else></DoctorUserAgreement>
  </div>
</template>

<script>
import Util from '@src/util'

import DoctorUserAgreement from './components/DoctorUserAgreement'
import PatientUserAgreement from './components/PatientUserAgreement'

export default {
  components: {
    DoctorUserAgreement,
    PatientUserAgreement
  },

  computed: {
    isPatient() {
      return Util.hybrid.getPlatform() === Util.hybrid.platformMap.H5 || Util.hybrid.getPlatform() === Util.hybrid.platformMap.Wechat
    }
  }
}
</script>


<style >
</style>
