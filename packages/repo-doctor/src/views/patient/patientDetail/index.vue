<template>
  <div class="patient-container">
    <div class="patient-detail">
      <HealthRecordHeader v-if="patientData"
                          :internalData="patientData"
                          class="health-record-header"></HealthRecordHeader>
      <HealthRecordDetail :id="id"
                          class="health-record-detail"></HealthRecordDetail>
    </div>
    <HealthRecordMenu class="health-record-menu"></HealthRecordMenu>
    <HealthRecordDrawer :params="patientData"
                        ref="showRecordDrawer"></HealthRecordDrawer>
  </div>
</template>

<script>
import peace from '@src/library'

import HealthRecordDrawer from './HealthRecord/HealthRecordDrawer'
import HealthRecordHeader from './HealthRecordHeader'
import HealthRecordDetail from './HealthRecordDetail'
import HealthRecordMenu from './HealthRecordMenu'
export default {
  components: {
    HealthRecordDrawer,
    HealthRecordHeader,
    HealthRecordDetail,
    HealthRecordMenu
  },

  data() {
    return {
      id: this.$route.params.id,
      patientData: undefined,
      addSchemeDialog: {
        visible: false
      }
    }
  },

  created() {
    this.getPatientInfo()
  },

  mounted() {
    this.$nextTick().then(() => {
      $peace.$on('showDrawer', (params) => {
        this.$refs.showRecordDrawer.show(params)
      })
    })
  },

  destroyed() {
    $peace.$off('showDrawer')
  },

  methods: {
    getPatientInfo() {
      const params = { patientNo: this.id }

      peace.service.patient.getOneHealth(params).then((res) => {
        const params = res.data
        params.id = this.id
        this.patientData = params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-container {
  background: #f9f9f9 !important;
  padding: 0 !important;
  display: inline-block;
  width: 100%;
  height: 100%;

  .patient-detail {
    background: #f9f9f9 !important;
    width: 100%;
    height: calc(100vh - 126px);

    padding: 0 96px 0 0;

    .health-record-header,
    .health-record-detail {
      width: 100%;
      padding: 10px 20px;
      background: #fff;
      margin: 0 90px 10px 0;
      border-radius: 4px;
    }
  }

  .health-record-menu {
    width: 70px;
    border-radius: 4px;
    background: #fff;
    position: absolute;
    top: 0;
    right: 16px;
    height: calc(100vh - 113px);
  }
}
</style>
