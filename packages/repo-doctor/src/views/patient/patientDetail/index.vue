<template>
  <div class="patient-container">
    <div class="patient-detail">
      <HealthRecordHeader :id="id"
                          class="health-record-header"></HealthRecordHeader>
      <HealthRecordDetail :id="id"
                          class="health-record-detail"></HealthRecordDetail>
    </div>

    <HealthRecordMenu class="health-record-menu"></HealthRecordMenu>
  </div>
</template>

<script>
import HealthRecordHeader from './HealthRecordHeader'
import HealthRecordDetail from './HealthRecordDetail'
import HealthRecordMenu from './HealthRecordMenu'
export default {
  components: {
    HealthRecordHeader,
    HealthRecordDetail,
    HealthRecordMenu
  },

  data() {
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-container {
  background: #f9f9f9 !important;
  padding: 0 !important;
  display: flex;
  width: 100%;

  .health-record-menu {
    width: 70px;
    height: 100%;
    margin-left: 10px;
    background: #fff;
  }
}
.patient-detail {
  background: #f9f9f9 !important;
  padding: 0 !important;
  flex: 1;
  .health-record-header,
  .health-record-detail {
    padding: 10px 20px;
    background: #fff;
    margin: 0 0 10px 0;
  }
}
</style>

