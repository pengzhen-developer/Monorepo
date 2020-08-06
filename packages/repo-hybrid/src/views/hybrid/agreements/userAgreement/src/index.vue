<template>
  <div class="q-ma-md">
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


<style lang="scss" scoped>
p {
  margin: 10px 0;
}

.agreement-title {
  color: var(--q-color-grey-333);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.agreement-subtitle {
  color: var(--q-color-grey-333);
  font-size: 15px;
  font-weight: 500;
  text-align: left;
}

.agreement-paragraph {
  color: var(--q-color-grey-333);
  font-size: 12px;
  font-weight: 400;
  text-align: justify;
}
</style>
