<template>
  <div class="q-mx-20 column"
       v-if="patientInfo.patientNo">

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
                        min-width="180px"></PeaceTableColumn>

      <PeaceTableColumn label="处方状态"
                        prop="status"
                        min-width="100px"></PeaceTableColumn>

      <PeaceTableColumn label="开具时间"
                        prop="createdTime"
                        min-width="180px"></PeaceTableColumn>
    </PeaceTable>

    <PeaceDialog append-to-body
                 title="处方详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetail v-bind:data="dialog.data">
        <template v-slot:footer="{ data }">
          <PrescriptionDetailOperation v-on:accept="() => { dialog.visible = false; reFetch() }"
                                       v-on:reject="() => { dialog.visible = false; reFetch() }"
                                       v-bind:data="data"></PrescriptionDetailOperation>
        </template>
      </PeacePrescriptionDetail>
    </PeaceDialog>
  </div>

</template>

<script>
import Service from '../service/index'
import PrescriptionDetailOperation from '@src/views/components/prescription/prescription-detail-operation/src/index.vue'
import { PeacePrescriptionDetail } from 'peace-components'
import { mutations, store } from '../store'

export default {
  inject: ['provideGetTab', 'provideAddTab'],

  components: {
    PeacePrescriptionDetail,
    PrescriptionDetailOperation
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
    storePatient() {
      return store.activePatient
    },

    patientInfo() {
      return store.activePatient
    },

    recipeList() {
      return store.patientRecipeList
    }
  },

  methods: {
    reFetch() {
      if (Peace.validate.isEmpty(this.storePatient?.patientNo)) {
        return
      }

      const params = {
        patientNo: this.storePatient.patientNo
      }
      Service.getRecipeList(params).then((res) => {
        mutations.setPatientRecipeList(res.data.list)
      })
    },

    sendRecipe() {
      mutations.setGotoMakeRecipePatient(this.patientInfo)
      mutations.setShowWriteRecipe(true)
    },

    showPatientDetail() {
      const currentMenu = this.provideGetTab('PatientDetail')
      currentMenu.menuName = this.patientInfo.name
      currentMenu.menuRoute = '/patient/patientDetail/' + this.patientInfo.patientNo

      // 跳转当前路由
      this.provideAddTab(currentMenu)
    },

    async fetchPrescription(prescriptionNo) {
      const params = { prescriptionNo: prescriptionNo }
      const res = await Service.getPrescripDetail(params)

      return res.data
    },

    showDetail({ prescriptionId }) {
      this.dialog.visible = true
      this.dialog.data = () => this.fetchPrescription(prescriptionId)
    }
  }
}
</script>

<style>
</style>
