<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model"
               label-width="auto">
        <el-form-item label="姓名">
          <peace-input placeholder="请输入"
                       v-model.trim="model.patientName"></peace-input>
        </el-form-item>

        <el-form-item label="科室">
          <peace-select v-model="model.sectionCode"
                        placeholder="全部">
            <el-option v-for="item in source.dept"
                       v-bind:key="item.MedicalDepartmentCode"
                       v-bind:label="item.MedicalDepartmentName"
                       v-bind:value="item.MedicalDepartmentCode"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="开具机构">
          <peace-select v-model="model.hospitalCode"
                        placeholder="全部">
            <el-option v-for="item in source.prescriptionHospital"
                       v-bind:key="item.ClientID"
                       v-bind:label="item.ClientName"
                       v-bind:value="item.ClientID"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="处方来源">
          <peace-select v-model="model.prescriptionSource"
                        placeholder="全部">
            <el-option v-for="item in source.prescriptionSource"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="处方状态">
          <peace-select v-model="model.prescriptionState"
                        placeholder="全部">
            <el-option v-for="item in source.prescriptionState"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="开具时间">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="timeRange"></peace-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="处方编号"
                          prop="prescriptionNo"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="系统审方结果"
                          prop="actionCode"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="提交方式"
                          prop="submitMode"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="患者姓名"
                          prop="patientName"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="开具科室"
                          prop="medicalDepartmentName"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="开具机构"
                          prop="medicalInstitutionName"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="处方来源"
                          prop="prescriptionSource"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="开具时间"
                          prop="prescriptionTime"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="160px"
                          fixed="right">

          <el-button class="q-px-none"
                     type="text">修改</el-button>

        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Service from './service/index'
export default {
  data() {
    return {
      model: {
        patientName: '',
        sectionCode: '',
        hospitalCode: '',
        startTime: '',
        endTime: '',
        prescriptionSource: '',
        prescriptionState: ''
      },
      source: {
        prescriptionHospital: [],
        dept: [],
        prescriptionSource: [],
        prescriptionState: []
      }
    }
  },
  async created() {
    this.getDept()
    this.getOrgan()
    this.source.prescriptionSource = await Peace.identity.dictionary.getList('prescription_source')
    this.source.prescriptionState = await Peace.identity.dictionary.getList('pharmacist_prescription_state')
  },
  methods: {
    getDept() {
      let formData = new FormData()
      formData.append('json', '')
      Service.getDepartment(formData).then((res) => {
        this.source.dept = res.data.list
      })
    },
    getOrgan() {
      let formData = new FormData()
      formData.append('json', '')
      Service.getCustomerTeamRelaction(formData).then((res) => {
        this.source.prescriptionHospital = res.data.list
      })
    }
  }
}
</script>

<style>
</style>