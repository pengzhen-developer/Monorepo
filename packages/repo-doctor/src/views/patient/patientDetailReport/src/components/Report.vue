<template>
  <div class="report">
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
import ReportBloodOxygen from './ReportBloodOxygen'
import ReportBloodPressure from './ReportBloodPressure'
import ReportBloodSugar from './ReportBloodSugar'
import ReportBodyFat from './ReportBodyFat'

export default {
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
