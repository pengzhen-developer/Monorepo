<template>
  <div class="patient-detail">
    <HealthRecordHeader :id="id" class="health-record-header"></HealthRecordHeader>
    <HealthRecordDetail :id="id" class="health-record-detail"></HealthRecordDetail>
  </div>
</template>

<script>
import HealthRecordHeader from './HealthRecordHeader'
import HealthRecordDetail from './HealthRecordDetail'

export default {
  components: {
    HealthRecordHeader,
    HealthRecordDetail
  },

  data() {
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-detail {
  background: #f9f9f9 !important;
  padding: 0 !important;

  .health-record-header,
  .health-record-detail {
    padding: 10px 20px;
    background: #fff;
    margin: 0 0 10px 0;
  }
}
</style>

