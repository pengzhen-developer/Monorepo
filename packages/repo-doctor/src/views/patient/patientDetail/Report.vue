<template>
  <div class="report">
    <template v-if="this.$route.params.type === $peace.type.HEALTH.TYPE.血氧">
      <RecordBloodOxygen></RecordBloodOxygen>
    </template>
    <template v-if="this.$route.params.type === $peace.type.HEALTH.TYPE.血压">
      <ReportBloodPressure></ReportBloodPressure>
    </template>
    <template v-if="this.$route.params.type === $peace.type.HEALTH.TYPE.血糖">
      <ReportBloodSugar></ReportBloodSugar>
    </template>
    <template v-if="this.$route.params.type === $peace.type.HEALTH.TYPE.体脂">
      <ReportBodyFat></ReportBodyFat>
    </template>
  </div>
</template>

<script>
import RecordBloodOxygen from './RecordBloodOxygen'
import ReportBloodPressure from './ReportBloodPressure'
import ReportBloodSugar from './ReportBloodSugar'
import ReportBodyFat from './ReportBodyFat'

export default {
  components: {
    RecordBloodOxygen,
    ReportBloodPressure,
    ReportBloodSugar,
    ReportBodyFat
  }
}
</script>

<style>
</style>
