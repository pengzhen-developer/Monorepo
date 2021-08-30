<template>
  <div>
    <div class="info-title q-mb-12">调用记录</div>
    <el-form space-none
             label-suffix="："
             label-width="auto"
             label-position="right">
      <div class="q-mb-36">
        <el-form-item label="处方来源">
          <span>ff吩咐给</span>
        </el-form-item>

        <el-form-item label="原始处方编号">
          <span>ff</span>
        </el-form-item>

        <el-form-item label="平台处方编号">
          <span>ff</span>
        </el-form-item>

        <el-form-item label="调用时间">
          <span>rrr</span>
        </el-form-item>

        <el-form-item label="审核结果">
          <span>fff</span>
        </el-form-item>

        <el-form-item label="审方结果">
          <div class="row items-center">
            <span>审方失败</span>
            <el-button class="q-ml-10"
                       v-on:click="viewDetail">查看详情</el-button>
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
          <span>{{prescriptionInfo.PatientName +"  "+ prescriptionInfo.PatientGender +"  "+ prescriptionInfo.Age   }}</span>
        </el-form-item>
        <el-form-item label="诊断">
          <span>{{ getDiagnosisInfos(prescriptionInfo.DiagnosisInfos)   }}</span>
        </el-form-item>
        <el-form-item label="药品详情">
          <div v-for="drug in  prescriptionInfo.DrugList"
               v-bind:key="drug.DrugCode">
            <div>{{ drug.DrugName  + drug.DrugSpecifications +drug.DrugQty+drug.DrugQtyUnit }}</div>
            <div class="text-color"> 每次{{ drug.OnceDose}}{{ drug.OnceUnit }}，
              {{ drug.MedicationFrequency }}, {{ drug.DrugRoute }}, {{ drug.medicaDays ? "，" + drug.medicaDays + "天" : "" }}</div>
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
      <v></v>
    </peace-dialog>
  </div>
</template>

<script>
import v from './v'
import Service from '../service'
export default {
  components: { v },
  data() {
    return {
      prescriptionInfo: {},
      modelVisible: {
        visible: false
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getPrescriptionInfo()
    })
  },
  methods: {
    //处方信息
    getPrescriptionInfo() {
      Service.getPrescriptionInfo({ jztClaimNo: 'NA1CKJ-202108301054330885-2021083033267916' }).then((res) => {
        this.prescriptionInfo = res.data
      })
    },
    getDiagnosisInfos(data) {
      if (data.DiagnosisInfos.length > 0) {
        data.DiagnosisInfos.map((item) => item.DiagnosisName).join('，')
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
</style>