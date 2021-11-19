// 处方详情

<template>
  <div class="q-px-24 q-pt-24">
    <div>

      <!-- 处方标题 -->
      <div class="relative-position text-center q-mb-18 q-mt-28">
        <el-image v-bind:src="require('./assets/img/img1.png')"
                  class="status-pic"></el-image>
        <div class="title-style text-weight-bolder">
          {{ data.MedicalInstitutionName }}
        </div>
        <p class="title-style text-weight-bolder">处方笺</p>
        <div class="row q-mt-32 ">
          <div>
            <span class="text-color-grey-666">处方号：</span>
            <span>No.{{ data.PrescriptionNo }}</span>
          </div>
          <div v-on:click="showImage"
               class="originalPre"
               v-if="data.prescriptionImageUrl">原始处方</div>
        </div>

        <div class="q-mt-8"
             style="border-bottom: 1px dashed #e2e2e2;"></div>

      </div>

      <!-- 处方基础信息 -->
      <div class="q-mb-md">
        <div class="row q-mb-sm">
          <div class="row col-4">
            <span class="text-color-grey-666">姓名：</span>
            <span class="col text-weight-bold word-break-style">{{ data.PatientName }}</span>
          </div>
          <div class="row col-4">
            <span class="text-color-grey-666">性别：</span>
            <span class="col text-weight-bold">{{ data.PatientGender }}</span>
          </div>
          <div class="row col-4">
            <span class="text-color-grey-666">年龄：</span>
            <span class="col text-weight-bold">{{ data.Age }}</span>
          </div>
        </div>

        <div class="row q-mb-sm">
          <div class="row col-4">
            <span class="text-color-grey-666">科别：</span>
            <span class="col text-weight-bold word-break-style">{{ data.MedicalDepartmentName }}</span>
          </div>
          <div class="row col-4">
            <span class="text-color-grey-666">开具时间：</span>
            <span class="col text-weight-bold">{{ data.PrescriptionTime  }}</span>
          </div>
          <div class="row col-4">
            <span class="text-color-grey-666">住院(门诊)：</span>
            <span class="col text-weight-bold word-break-style">{{ data.CaseNumber }}</span>
          </div>
        </div>

        <!-- <div class="row q-mb-sm">
          <div class="row col-4">
            <span class="text-color-grey-666">开具时间：</span>
            <span class="col text-weight-bold">{{ data.PrescriptionTime }}</span>
          </div>
          <div class="row col-4">
            <span class="text-color-grey-666">住院(门诊)：</span>
            <span class="col text-weight-bold text-break">{{data.CaseNumber}}</span>
          </div>
          <div class="row col-4">
            <span class="text-color-grey-666">住院(门诊)：</span>
            <span class="col text-weight-bold">{{data.CaseNumber}}</span>
          </div>
        </div> -->

        <div class="row q-mb-sm">
          <span class="text-color-grey-666">疾病诊断：</span>
          <span class="col text-weight-bold word-break-style">

            {{ data.DiagnosisInfos.map(item => item.DiagnosisName).join('，') }}
          </span>
        </div>
      </div>

      <!-- 处方明细信息 -->
      <div class="q-mb-md">
        <div class="flex justify-between items-end q-mb-xs">
          <span class="rp-style">Rp.</span>
        </div>

        <!-- 药品 -->
        <div class="q-mb-none">
          <div v-for="(drug, index) in data.DrugList"
               v-bind:key="drug.DrugCode"
               class="relative-position drug-box">
            <div class="q-py-md">
              <div class="flex row justify-between  text-subtitle1 ">
                <div class="col row no-wrap">
                  <span class="text-weight-bold ">{{index+1}}.</span>
                  <div v-on:click="viewInstructions(drug)"
                       class="cursor-pointer">
                    <span class="q-mr-sm text-weight-bold ">{{ drug.DrugName }}</span>
                    <span class="text-weight-bold ">{{ drug.DrugSpecifications }}</span>
                  </div>
                </div>
                <div>
                  <span>x</span>
                  <span>{{ drug.DrugQty }}</span>
                  <span>{{ drug.DrugQtyUnit }}</span>
                </div>
              </div>
              <div class="text-grey-6">
                <span>
                  用法用量：{{ drug.DrugRoute }}，
                  每次{{ drug.OnceDose}}{{ drug.OnceUnit }}，
                  {{ drug.MedicationFrequency }}
                  {{ drug.medicaDays ? "，" + drug.medicaDays + "天" : "" }}
                </span>
              </div>
            </div>

            <div style="border-bottom: 1px dashed #e2e2e2;"></div>
            <el-image v-bind:src="require('./assets/img/Bitmap.png')"
                      v-show="index === data.DrugList.length - 1"
                      class="bitmap"></el-image>
          </div>
        </div>

        <!-- 审核 -->

        <div class="row q-mb-12 q-mt-md">
          <div class="row col-3 items-center">
            <span class="text-color-grey-999">医师：</span>
            <span class="col text-color-grey-333">
              {{ data.DoctorName }}
            </span>
          </div>
          <div class="row col-3 items-center">
            <span class="text-color-grey-999">审方药师：</span>
            <span class="col text-color-grey-333">
              {{ data.PrescriptionPharmacistName }}
            </span>
          </div>
          <div class="row col-3">
            <span class="text-justify text-color-grey-999">调配：</span>
            <span class="col text-color-grey-333">
              {{ data.DispensemeDicineName||'-' }}
            </span>
          </div>
          <div class="row col-3">
            <span class="text-color-grey-999">核对发药： </span>
            <span class="col text-color-grey-333">
              {{ data.DispensingPharmacistName||'-' }}
            </span>
          </div>
        </div>

        <div class="q-mb-md"
             style="border-bottom: 1px dashed #e2e2e2;"></div>
      </div>
    </div>

    <PeaceDialog title="原始处方"
                 :visible.sync="dialog.visible"
                 append-to-body
                 v-show="dialog.visible&&dialog.show">
      <el-image v-bind:src="data.prescriptionImageUrl"
                v-on:load="onLoad"></el-image>
    </PeaceDialog>
    <PeaceDialog title="知识库"
                 :visible.sync="modelDialog.visible"
                 append-to-body
                 width="900px"
                 :modal="false"
                 v-show="modelDialog.visible">
      <KnowledgeButton v-bind:drugCscCode="platformDrugCode"></KnowledgeButton>
    </PeaceDialog>
  </div>
</template>

<script>
import KnowledgeButton from './components/KnowledgeButton.vue'
export default {
  name: 'PrescriptionDetail',
  props: {
    prescriptionInfo: Object
  },
  components: {
    KnowledgeButton
  },
  data() {
    return {
      platformDrugCode: '',
      dialog: {
        visible: false,
        show: false
      },
      modelDialog: {
        visible: false
      },
      data: {
        PrescriptionNo: '',
        MedicalInstitutionName: '',
        prescriptionImageUrl: '',
        PatientName: '',
        PatientGender: '',
        Age: '',
        PatientWeight: '',
        PrescriptionTime: '',
        MedicalDepartmentName: '',
        DiagnosisInfos: [],
        DrugList: [],
        DoctorName: '',
        PrescriptionPharmacistName: '',
        DispensemeDicineName: '',
        DispensingPharmacistName: ''
      }
    }
  },
  watch: {
    prescriptionInfo: {
      handler(val) {
        this.data = Object.assign({}, this.data, val)
      },
      immediate: true
    }
  },
  methods: {
    showImage() {
      this.dialog.visible = true
    },
    onLoad() {
      this.dialog.show = true
    },
    viewInstructions(data) {
      this.platformDrugCode = data.DrugCode_JNT
      this.modelDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.text-justify {
  text-align-last: justify;
}
.text-color-grey-999 {
  color: var(--q-color-grey-999);
}
.text-color-grey-666 {
  color: var(--q-color-grey-666);
}
.text-color-grey-333 {
  color: var(--q-color-grey-333);
}
.bitmap {
  position: absolute;
  right: 26px;
  bottom: 10px;
}
.title-style {
  line-height: 25px;
  font-size: 22px;
  margin-bottom: 0;
}
.originalPre {
  cursor: pointer;
  width: 72px;
  height: 21px;
  line-height: 19px;
  border: 1px solid #cecece;
  border-radius: 12.5px;
  color: #666;
  margin-left: 8px;
}
.rp-style {
  line-height: 26px;
  font-size: 18px;
}
.drug-box {
  background: #f9f9f9;
  padding: 0 16px 16px 16px;
}
.status-pic {
  position: absolute;
  right: 0;
  top: 46px;
}
.word-break-style {
  word-break: break-all;
}
</style>