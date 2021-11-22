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
          <peace-input placeholder="请输入"
                       v-model.trim="model.deptName"></peace-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.hospitalName"></peace-input>
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
        <el-form-item label="处方时间">
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
        <PeaceTableColumn label="系统审方结果"
                          min-width="140px">
          <template slot-scope="scope">
            {{ scope.row.actionCode | filterDictionary(source.actionCode,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药师审方结果"
                          min-width="140px">
          <template slot-scope="scope">
            {{ scope.row.prescriptionExamResult | filterDictionary(source.prescriptionExamResult,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="处方号"
                          prop="prescriptionNo"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="处方状态"
                          min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.prescription.toString() | filterDictionary(source.prescriptionState,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="提交方式"
                          prop="submitMode"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="姓名"
                          prop="patientName"
                          min-width="140px"></PeaceTableColumn>
        <PeaceTableColumn label="身份证号"
                          prop="patientIDNumber"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="科室"
                          prop="medicalDepartmentName"
                          min-width="130px"></PeaceTableColumn>
        <PeaceTableColumn label="处方来源"
                          prop="prescriptionSource"
                          min-width="110px"></PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="medicalInstitutionName"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="处方时间"
                          prop="prescriptionTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="审方部门"
                          prop="pharmacistDeptName"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="审方人员"
                          prop="prescriptionPharmacistName"
                          min-width="130px"></PeaceTableColumn>
        <PeaceTableColumn label="审方时间"
                          prop="prescriptionExamTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="110px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="viewPre(scope.row.jztclaimNo)">查看处方</el-button>
          </template>

        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <!-- 查看详情 -->
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="detailDialog.visible"
                 title="查看详情"
                 v-if="detailDialog.visible"
                 append-to-body
                 width="1280px">
      <ViewPrescriptionDetail v-bind:jztClaimNo="detailDialog.jztclaimNo"
                              v-if="detailDialog.jztclaimNo"></ViewPrescriptionDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service/index'
import CONSTANT from './constant'
import ViewPrescriptionDetail from '@views/prescription/view-prescription-detail'
export default {
  components: {
    ViewPrescriptionDetail
  },
  data() {
    return {
      model: {
        patientName: '',
        hospitalName: '',
        deptName: '',
        startTime: '',
        endTime: '',
        prescriptionSource: '',
        prescriptionState: ''
      },
      detailDialog: {
        visible: false,
        jztclaimNo: ''
      },
      source: {
        prescriptionSource: [],
        prescriptionState: [],
        actionCode: CONSTANT.SYSTEM_AUDIT_RESULTS_TYPE,
        prescriptionExamResult: CONSTANT.PRESCRIPTION_EXAM_RESULTS_TYPE
      },
      timeRange: []
    }
  },
  watch: {
    timeRange(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },
  async created() {
    this.source.prescriptionSource = await Peace.identity.dictionary.getList('prescription_source')
    this.source.prescriptionState = await Peace.identity.dictionary.getList('pharmacist_prescription_state')
    this.fetch()
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getPrescriptionsList
      this.$refs.table.reloadData({ fetch, params })
    },
    viewPre(row) {
      this.detailDialog.visible = true
      this.detailDialog.jztclaimNo = row
    }
  }
}
</script>

<style>
</style>