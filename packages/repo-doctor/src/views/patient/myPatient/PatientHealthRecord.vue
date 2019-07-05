<template>
  <div class="patient-health-record">
    <el-tabs type="border-card" v-model="activedTab">
      <el-tab-pane :key="patient.family_id" :label="patient.name" :name="patient.family_id" v-for="patient in list">
        <PatientHealthRecordDetails :details="currentDetails"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import peace from '@src/library'
import PatientHealthRecordDetails from './PatientHealthRecordDetails'

export default {
  name: '',
  components: { PatientHealthRecordDetails },
  data() {
    return {
      activedTab: '',
      currentDetails: '',
      list: [],
      patientId: this.$route.params.id
      // patientId: 'rmzkvuvzlg'
    }
  },
  methods: {
    get() {
      peace.service.health.getPatientHealthData({ patientId: this.patientId }).then(res => {
        this.list = res.data
        if (res.data.length) {
          this.currentDetails = res.data[0]
          this.activedTab = res.data[0].family_id
        }
      })
    }
  },
  created() {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  /deep/ &__header {
    padding: 0 !important;
  }
  /deep/ &__content {
    padding: 10px 15px;
  }
}
</style>
