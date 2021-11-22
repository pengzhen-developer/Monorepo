<template>
  <div>
    <el-form inline
             label-suffix="："
             v-on:keyup.enter.native="getUnhandledPrescriptions"
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
        <el-button v-on:click="getUnhandledPrescriptions"
                   type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <PeaceTable ref="table"
                pagination>
      <PeaceTableColumn label="处方编号"
                        prop="prescriptionNo"
                        min-width="180px">
        <template slot-scope="scope">
          <div class="preNo-color cursor-pointer"
               v-on:click="viewPre(scope.row.jztclaimNo)">
            {{ scope.row.prescriptionNo}}
          </div>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="系统审方结果"
                        min-width="120px">
        <template slot-scope="scope">
          {{ scope.row.actionCode | filterDictionary(source.actionCode,'--')}}
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="提交方式"
                        prop="submitMode"
                        min-width="100px"></PeaceTableColumn>
      <PeaceTableColumn label="患者姓名"
                        prop="patientName"
                        min-width="100px"></PeaceTableColumn>
      <PeaceTableColumn label="开具科室"
                        prop="medicalDepartmentName"
                        min-width="110px"></PeaceTableColumn>
      <PeaceTableColumn label="开具机构"
                        prop="medicalInstitutionName"
                        min-width="180px"></PeaceTableColumn>
      <PeaceTableColumn label="处方来源"
                        prop="prescriptionSource"
                        min-width="100px"></PeaceTableColumn>
      <PeaceTableColumn label="开具时间"
                        prop="prescriptionTime"
                        min-width="180px"></PeaceTableColumn>
      <PeaceTableColumn label="操作"
                        min-width="110px"
                        fixed="right">
        <template slot-scope="scope">
          <el-button class="q-px-none"
                     type="text"
                     v-on:click="checkPre(scope.row.jztclaimNo)">审核处方</el-button>
        </template>
      </PeaceTableColumn>
    </PeaceTable>

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
import CONSTANT from '../constant'
import Service from '../service/index'
import Observable from '../../observable'
import ViewPrescriptionDetail from '@views/prescription/view-prescription-detail'

export default {
  components: {
    ViewPrescriptionDetail
  },
  data() {
    return {
      timeRange: [],
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
        prescriptionSource: [],
        actionCode: CONSTANT.SYSTEM_AUDIT_RESULTS_TYPE
      },
      detailDialog: {
        visible: false,
        jztclaimNo: ''
      }
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
    this.getUnhandledPrescriptions()
  },
  methods: {
    getUnhandledPrescriptions() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getUnhandledPrescriptions
      this.$refs.table.reloadData({ fetch, params })
    },
    getNotCheckedPreCount() {
      Service.getNotCheckedPrenCount({}).then((res) => {
        Observable.mutations.changeNotCheckedCount(res.data.notCheckedCount)
      })
    },
    checkPre(jztclaimNo) {
      Service.lockPrescription({ claimNo: jztclaimNo })
        .then(() => {
          Observable.mutations.changeJztClaimNo(jztclaimNo)
          this.getNotCheckedPreCount()
          this.$emit('close')
        })
        .catch(() => {})
    },
    viewPre(row) {
      this.detailDialog.visible = true
      this.detailDialog.jztclaimNo = row
    }
  }
}
</script>

<style lang="scss" scoped>
.preNo-color {
  color: var(--q-color-primary);
}
</style>