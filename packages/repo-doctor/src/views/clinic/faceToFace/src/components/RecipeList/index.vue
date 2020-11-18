<template>
  <div class="q-mx-20 column"
       v-if="recipeList && recipeList.length > 0">

    <div class="q-mt-30 q-mb-12">
      <el-button type="primary"
                 v-on:click="sendRecipe"
                 round>开具新处方</el-button>
      <el-button type="primary"
                 v-on:click="showPatientDetail"
                 round
                 plain>查看档案详情</el-button>
    </div>

    <peace-table ref="table"
                 :data="recipeList">
      <peace-table-column align="center"
                          label="处方编号"
                          prop="prescriptionNo"
                          width="160px"></peace-table-column>

      <peace-table-column align="center"
                          label="患者姓名"
                          prop="patientName"
                          width="100px"></peace-table-column>

      <peace-table-column align="center"
                          label="性别"
                          prop="sex"
                          width="100px"></peace-table-column>

      <peace-table-column align="center"
                          label="年龄"
                          prop="age"
                          width="100px"></peace-table-column>

      <peace-table-column align="center"
                          label="身份证号"
                          prop="idCard"
                          width="160px"></peace-table-column>

      <peace-table-column align="center"
                          label="处方状态"
                          prop="status"
                          width="100px"></peace-table-column>

      <peace-table-column align="center"
                          label="开具时间"
                          prop="createdTime"
                          width="160px"></peace-table-column>
    </peace-table>

  </div>

  <div v-else>
    暂无
  </div>
</template>

<script>
import { mutations, store } from '../../store'
export default {
  inject: ['provideGetTab', 'provideAddTab'],
  computed: {
    recipeList() {
      return store.patientRecipeList
    },

    patientInfo() {
      return store.activePatient
    },

    getTab() {
      return this.provideGetTab
    },

    addTab() {
      return this.provideAddTab
    }
  },

  methods: {
    sendRecipe() {
      mutations.setShowWriteRecipe(true)
    },

    showPatientDetail() {
      const currentMenu = this.getTab('PatientDetail')
      currentMenu.menuName = this.patientInfo.name
      currentMenu.menuRoute = '/patient/patientDetail/' + this.patientInfo.patientId

      // 跳转当前路由
      this.addTab(currentMenu)
    }
  }
}
</script>

<style>
</style>
