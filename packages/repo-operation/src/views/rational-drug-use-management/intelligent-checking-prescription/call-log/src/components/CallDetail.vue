<template>
  <div v-loading="loading">
    <div class="info-title q-mb-12">调用记录</div>
    <el-form space-none
             label-suffix="："
             label-width="auto"
             label-position="right">
      <div class="q-mb-36">
        <el-form-item label="调用渠道ID">
          <span>{{callInfo.businesschannelId}}</span>
        </el-form-item>
        <el-form-item label="调用渠道">
          <span>{{callInfo.businesschannel}}</span>
        </el-form-item>
        <el-form-item label="平台处方编号">
          <span>{{callInfo.jztClaimNo}}</span>
        </el-form-item>

        <el-form-item label="智能审方编号">
          <span>{{callInfo.code}}</span>
        </el-form-item>

        <el-form-item label="调用时间">
          <span>{{callInfo.createTime}}</span>
        </el-form-item>

        <el-form-item label="调用结果">
          <span>{{callInfo.invokeResult}}</span>
        </el-form-item>

        <el-form-item label="审方结果">
          <div class="row items-center">
            <span v-bind:class="callInfo.checkResult=='审方失败'?'failColor':''">{{callInfo.checkResult || '--' }}</span>
            <div v-on:click="viewDetail"
                 class="btn-color">
              <span class="q-ml-16">查看详情</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="info-title q-mb-12">处方详情</div>
      <div class="q-mb-36">
        <el-form-item label="开方机构">
          <span>{{prescriptionInfo.MedicalInstitutionName}}</span>
        </el-form-item>

        <el-form-item label="医生">
          <span>{{prescriptionInfo.DoctorName}}</span>
        </el-form-item>

        <el-form-item label="科室">
          <span>{{ prescriptionInfo.MedicalDepartmentName }}</span>
        </el-form-item>
        <el-form-item label="患者信息">
          <div>
            <span class="q-mr-10"
                  v-if="prescriptionInfo.PatientName">{{prescriptionInfo.PatientName}}</span>
            <span class="q-mr-10"
                  v-if="prescriptionInfo.PatientGender">{{prescriptionInfo.PatientGender}}</span>
            <span class="q-mr-10"
                  v-if="prescriptionInfo.Age">{{prescriptionInfo.Age}}</span>
          </div>
        </el-form-item>
        <el-form-item label="处方诊断">
          <span>{{ getDiagnosisInfos(DiagnosisInfos) }}</span>
        </el-form-item>
        <el-form-item label="药品详情">
          <div v-for="(drug,index) in  prescriptionInfo.DrugList"
               v-bind:key="drug.DrugCode">
            <div>
              <span v-if="drug.DrugName"
                    class="q-mr-10">{{index+1}}.{{ drug.DrugName}}</span>
              <span class="q-mr-10"
                    v-if="drug.DrugSpecifications">{{ drug.DrugSpecifications}}</span>
              <span class="q-mr-10">{{drug.DrugQty||""}}{{drug.DrugQtyUnit||""}}</span>
            </div>
            <div class="text-color">
              <span>{{drug.OnceDose?"每次" + drug.OnceDose : ""}}{{drug.OnceUnit? drug.OnceUnit : ""}}</span>
              <span>{{drug.MedicationFrequency?",  " + drug.MedicationFrequency : "" }}</span>
              <span>{{drug.DrugRoute?",    " + drug.DrugRoute : "" }}</span>
              <span>{{ drug.medicaDays ? ",    " + drug.medicaDays + "天" : "" }}</span>
            </div>
          </div>
        </el-form-item>
      </div>
    </el-form>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="modelVisible.visible"
                  title="查看详情"
                  v-if="modelVisible.visible"
                  append-to-body
                  width="576px">
      <PrescriptionAudit v-bind:id="this.data.jztClaimNo"></PrescriptionAudit>
    </peace-dialog>
  </div>
</template>

<script>
import PrescriptionAudit from '@views/rational-drug-use-management/prescription-management/prescription-record/src/components/prescription-audit'
import Service from '../service'
export default {
  components: { PrescriptionAudit },
  props: {
    data: Object
  },
  data() {
    return {
      prescriptionInfo: {},
      callInfo: {},
      modelVisible: {
        visible: false
      },
      DiagnosisInfos: [],
      hasCallInfo: false,
      hasPrescription: false
    }
  },
  computed: {
    loading() {
      if (this.hasCallInfo && this.hasPrescription) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getCallInfo()
      this.getPrescriptionInfo()
    })
  },
  methods: {
    //调用信息
    getCallInfo() {
      Service.getInvokeLogById({ id: this.data.id }).then((res) => {
        this.hasCallInfo = true
        this.callInfo = res.data
      })
    },
    //处方信息
    getPrescriptionInfo() {
      Service.getPrescriptionInfo({ jztClaimNo: this.data.jztClaimNo }).then((res) => {
        this.hasPrescription = true
        this.prescriptionInfo = res.data
        this.DiagnosisInfos = res.data.DiagnosisInfos
      })
    },
    getDiagnosisInfos(data) {
      if (data.length > 0) {
        return data.map((item) => item.DiagnosisName).join(',')
      }
    },
    viewDetail() {
      this.modelVisible.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.info-title {
  position: relative;
  padding-left: 14px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
}
::v-deep .el-form:not(.element-ui-default) .el-form-item__label {
  color: rgba(51, 51, 51, 0.6);
}
.text-color {
  color: rgba(51, 51, 51, 0.6);
}
.btn-color {
  color: #3099a6;
  cursor: pointer;
}
.failColor {
  color: #ea3930;
}
</style>