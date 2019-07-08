<template>
  <div class="patient-health-record">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane :key="patient.familyId" :label="patient.name" :name="patient.familyId" lazy v-for="patient in familyList">
        <PatientHealthRecordFamily :data="patient" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import peace from '@src/library'
import PatientHealthRecordFamily from './PatientHealthRecordFamily'

export default {
  components: {
    PatientHealthRecordFamily
  },

  data() {
    return {
      activeTab: '',
      familyList: '',

      patientRecordList: []
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      this.getFamilyList()
    },

    getFamilyList() {
      const params = { patientId: this.$route.params.id }
      peace.service.health.getFamilyList(params).then(res => {
        this.familyList = res.data
        this.activeTab = res.data[0].familyId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-health-record {
  /deep/ .el-tabs--border-card {
    border: 0;

    .el-tabs.tab .el-tabs__header {
      border-top: 0;
      border-left: 0;
      border-right: 0;
    }
  }

  /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    margin-top: 0;
    border-top-color: #dcdfe6;
  }
}

.el-tabs {
  /deep/ &__header {
    padding: 0 !important;
  }
  /deep/ &__content {
    padding: 10px 15px;
  }
}
</style>
