<template>
  <div class="q-pa-md">
    <template v-if="this.$route.params.type === Type.HEALTH.TYPE.血氧">
      <ReportBloodOxygen></ReportBloodOxygen>
    </template>
    <template v-if="this.$route.params.type === Type.HEALTH.TYPE.血压">
      <ReportBloodPressure></ReportBloodPressure>
    </template>
    <template v-if="this.$route.params.type === Type.HEALTH.TYPE.血糖">
      <ReportBloodSugar></ReportBloodSugar>
    </template>
    <template v-if="this.$route.params.type === Type.HEALTH.TYPE.体脂">
      <ReportBodyFat></ReportBodyFat>
    </template>
  </div>
</template>

<script>
import Type from '@src/type'
import ReportBloodOxygen from './components/ReportBloodOxygen.vue'
import ReportBloodPressure from './components/ReportBloodPressure.vue'
import ReportBloodSugar from './components/ReportBloodSugar.vue'
import ReportBodyFat from './components/ReportBodyFat.vue'

export default {
  name: 'PatientDetailReport',

  components: {
    ReportBloodOxygen,
    ReportBloodPressure,
    ReportBloodSugar,
    ReportBodyFat
  },

  data() {
    return {
      Type
    }
  }
}
</script>

<style>
</style>
