<template>
  <div class="q-pa-lg full-height service-page">
    <p>{{hospitalName}}</p>
    <el-tabs v-model="activeName">
      <el-tab-pane label="医院基本信息"
                   name="orgdetail">
        <OrgInfoDetail v-on:update="changeHosptailName"
                       v-if="activeName === 'orgdetail'" />
      </el-tab-pane>
      <el-tab-pane label="科室信息"
                   name="department">
        <DepartmentDetails v-if="activeName === 'department'" />
      </el-tab-pane>
      <el-tab-pane label="药品数据"
                   name="drug">
        <DrugList :tableid="orgInfo.tableId"
                  v-if="activeName === 'drug'" />
      </el-tab-pane>
      <el-tab-pane label="给药频次"
                   name="drugFrequency">
        <DrugFrequency v-if="activeName === 'drugFrequency'" />
      </el-tab-pane>
      <el-tab-pane label="给药途径"
                   name="drugWay">
        <DrugWay v-if="activeName === 'drugWay'" />
      </el-tab-pane>
      <el-tab-pane label="服务设置"
                   name="service">
        <ServiceConfig v-if="activeName === 'service'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Service from './service'
import OrgInfoDetail from './components/OrgDetailInfo.vue'
import DepartmentDetails from './components/OrgDetailsDepartment.vue'
import DrugList from './components/OrgDetailsDrugList.vue'
import DrugFrequency from './components/OrgDetailsDrugFrequency.vue'
import DrugWay from './components/OrgDetailsDrugWay.vue'
import ServiceConfig from './components/OrgDetailServiceConfig.vue'

export default {
  name: 'OrgDetails',

  components: {
    OrgInfoDetail,
    DepartmentDetails,
    DrugList,
    DrugFrequency,
    DrugWay,
    ServiceConfig
  },

  data() {
    return {
      id: '',
      activeName: 'orgdetail',
      hospitalName: '',
      orgInfo: {}
    }
  },
  watch: {
    $route() {
      this.activeName = ''
      this.$nextTick(() => {
        this.activeName = 'orgdetail'
      })
    }
  },

  created() {
    this.id = Peace.cache.sessionStorage.get('196-hospitalId')
    this.getData()
  },
  methods: {
    changeHosptailName(name) {
      this.hospitalName = name
    },
    getData() {
      Service.getOrgDetail({ hospitalId: this.id }).then((res) => {
        this.orgInfo = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  padding: 25px 0;
  margin: 0px;
  width: 100%;
  background: white;
  text-align: center;
}
::v-deep .el-tabs {
  height: 100%;
  &__header {
    text-align: center;
    width: 100%;
    background: white;
    margin: 0 auto;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-around;
  }
  &__nav-wrap {
    padding: 0 20px;
    background-color: #fff;
  }
  &__item {
    font-weight: normal;
    font-weight: 400;
    user-select: none;
  }
  &__content {
    background-color: #fff;
  }
}
</style>
