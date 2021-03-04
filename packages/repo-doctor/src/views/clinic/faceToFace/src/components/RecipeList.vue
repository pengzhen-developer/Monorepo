<template>
  <div class="q-mx-20 column">

    <div class="q-mt-30 q-mb-12">
      <el-button type="primary"
                 v-on:click="sendRecipe">开具新处方</el-button>
      <el-button type="primary"
                 v-on:click="showPatientDetail"
                 plain>查看档案详情</el-button>
    </div>

    <PeaceTable ref="table"
                :data="recipeList">

      <PeaceTableColumn label="处方编号"
                        min-width="160px">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)"
                     type="text">{{scope.row.prescriptionNo}}</el-button>
        </template>
      </PeaceTableColumn>

      <PeaceTableColumn label="患者姓名"
                        prop="patientName"
                        min-width="100px"></PeaceTableColumn>

      <PeaceTableColumn label="性别"
                        prop="sex"
                        min-width="100px"></PeaceTableColumn>

      <PeaceTableColumn label="年龄"
                        prop="age"
                        min-width="100px"></PeaceTableColumn>

      <PeaceTableColumn label="身份证号"
                        prop="idCard"
                        min-width="160px"></PeaceTableColumn>

      <PeaceTableColumn label="处方状态"
                        prop="status"
                        min-width="100px"></PeaceTableColumn>

      <PeaceTableColumn label="开具时间"
                        prop="createdTime"
                        min-width="160px"></PeaceTableColumn>
    </PeaceTable>

    <PeaceDialog :visible.sync="dialog.visible"
                 append-to-body
                 title="处方详情">
      <RecipeDetail :data="dialog.data"></RecipeDetail>
    </PeaceDialog>

  </div>

</template>

<script>
import { mutations, store } from './../store'
import RecipeDetail from '@src/views/components/recipe/RecipeDetail'
export default {
  inject: ['provideGetTab', 'provideAddTab'],

  components: {
    RecipeDetail
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    recipeList() {
      return store.patientRecipeList
    },

    patientInfo() {
      return store.activePatient
    }
  },

  methods: {
    sendRecipe() {
      mutations.setShowWriteRecipe(true)
    },

    showPatientDetail() {
      const currentMenu = this.provideGetTab('PatientDetail')
      currentMenu.menuName = this.patientInfo.name
      currentMenu.menuRoute = '/patient/patientDetail/' + this.patientInfo.patientNo

      // 跳转当前路由
      this.provideAddTab(currentMenu)
    },

    showDetail(row) {
      this.dialog.visible = true
      this.dialog.data = {}

      const params = {
        prescriptionId: row.prescriptionId
      }
      Peace.service.prescribePrescrip.getPrescripInfo(params).then((res) => {
        this.dialog.data = res.data
      })
    }
  }
}
</script>

<style>
</style>
