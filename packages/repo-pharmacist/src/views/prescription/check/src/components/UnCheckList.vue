<template>
  <div>
    <el-form inline
             label-suffix="："
             v-on:keyup.enter.native="fetch"
             v-on:submit.native.prevent
             v-bind:model="model"
             label-width="auto">
      <el-form-item label="患者姓名">
        <peace-input placeholder="请输入"
                     v-model.trim="model.patientName"></peace-input>
      </el-form-item>
      <el-form-item label="开具机构">
        <peace-input placeholder="请输入"
                     v-model.trim="model.hospitalName"></peace-input>
        <!-- <peace-select v-model="model.prescriptionHospitalCode"
                      placeholder="全部">
          <el-option v-for="item in source.prescriptionHospital"
                     v-bind:key="item.ClientID"
                     v-bind:label="item.ClientName"
                     v-bind:value="item.ClientID"></el-option>
        </peace-select> -->
      </el-form-item>
      <el-form-item label="开具科室">
        <peace-input placeholder="请输入"
                     v-model.trim="model.deptName"></peace-input>
        <!-- <peace-select v-model="model.deptCode"
                      placeholder="全部">
          <el-option v-for="item in source.dept"
                     v-bind:key="item.MedicalDepartmentCode"
                     v-bind:label="item.MedicalDepartmentName"
                     v-bind:value="item.MedicalDepartmentCode"></el-option>
        </peace-select> -->
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
      <el-form-item label="处方编号">
        <peace-input placeholder="请输入"
                     v-model.trim="model.prescriptionNo"></peace-input>
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
    <PeaceTable ref="table"
                pagination>
      <PeaceTableColumn label="处方编号"
                        prop="prescriptionNo"
                        min-width="180px"></PeaceTableColumn>
      <PeaceTableColumn label="系统审方结果"
                        min-width="160px">
        <template slot-scope="scope">
          {{ scope.row.actionCode | getEnumLabel(source.actionCode)}}
        </template>
      </PeaceTableColumn>
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
        <template slot-scope="scope">
          <el-button class="q-px-none"
                     type="text"
                     v-on:click="checkPre(scope.row.jztclaimNo)">审核处方</el-button>
        </template>
      </PeaceTableColumn>
    </PeaceTable>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service/index'
export default {
  data() {
    return {
      model: {
        patientName: '',
        deptName: '',
        hospitalName: '',
        startTime: '',
        endTime: '',
        prescriptionSource: '',
        prescriptionNo: ''
      },
      source: {
        // prescriptionHospital: [],
        // dept: [],
        prescriptionSource: [],
        actionCode: CONSTANT.SYSTEM_AUDIT_RESULTS_TYPE
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },
  watch: {
    timeRange(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },
  async created() {
    // this.getDept()
    // this.getOrgan()
    this.source.prescriptionSource = await Peace.identity.dictionary.getList('prescription_source')
    this.getUnhandledPrescriptions()
  },
  methods: {
    getUnhandledPrescriptions() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getUnhandledPrescriptions
      this.$refs.table.reloadData({ fetch, params })
    },
    checkPre(jztclaimNo) {
      this.$emit('close')
      Service.lockPre({ jztclaimNo: jztclaimNo }).then(() => {})
    }
    // getDept() {
    //   let formData = new FormData()
    //   formData.append('json', '')
    //   Service.getDepartment(formData).then((res) => {
    //     this.source.dept = res.data.list
    //   })
    // },
    // getOrgan() {
    //   let formData = new FormData()
    //   formData.append('json', '')
    //   Service.getCustomerTeamRelaction(formData).then((res) => {
    //     this.source.prescriptionHospital = res.data.list
    //   })
    // }
  }
}
</script>

<style>
</style>