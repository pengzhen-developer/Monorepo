// 处方详情

<template>
  <div class="layout-route">
    <div>
      <div class="flex justify-between">
        <div class="text-color-grey-999 col">
          <span>No.</span>
          <span>{{ data.PrescriptionNo }}</span>
        </div>
        <div>
          <div class="flex justify-center text-primary"
               style="cursor: pointer;font-size:16px;line-height:1;"
               v-if="data.prescriptionImageUrl"
               v-on:click="showImage">
            <el-image style="width: 12px;height: 15px;"
                      v-bind:src="require('../assets/img/ic_rp.png')"></el-image>
            <span class="q-ml-6">原始处方</span>
          </div>
        </div>
      </div>

      <!-- 处方标题 -->
      <div class="relative-position text-center q-mb-lg q-mt-md">
        <div class="text-h5 text-weight-bolder">
          {{ data.MedicalInstitutionName }}
        </div>
        <p class="text-h5 text-weight-bolder">电子处方笺</p>
        <div class="q-mt-md"
             style="border-bottom: 1px dashed #e2e2e2;"></div>
      </div>

      <!-- 处方基础信息 -->
      <div class="q-mb-md">
        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify text-color-grey-666"
                  style="width: 5em;">姓名</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.PatientName }}</span>
          </div>
          <div class="row col-6">
            <span class="text-justify text-color-grey-666"
                  style="width: 5em;">性别</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.PatientGender }}</span>
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify text-color-grey-666"
                  style="width: 5em;">年龄</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.Age }}</span>
          </div>
          <div class="row col-6">
            <span class="text-justify text-color-grey-666"
                  style="width: 5em;">科别</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.MedicalDepartmentName }}</span>
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify text-color-grey-666"
                  style="width: 5em;">开具时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.PrescriptionTime }}</span>
          </div>
          <div class="row col-6">
            <span class="text-justify text-color-grey-666"
                  style="width: 5em;">住院(门诊)</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{data.ClientCardCode}}</span>
          </div>
        </div>

        <div class="row q-mb-xs">
          <span class="text-justify text-color-grey-666"
                style="width: 5em;">疾病诊断</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">
            {{ data.DiagnosisInfos.map(item => item.DiagnosisName).join('，') }}
          </span>
        </div>
      </div>

      <!-- 处方明细信息 -->
      <div class="q-mb-md">
        <div class="flex justify-between items-end q-mb-xs">
          <span class="text-h6 text-weight-bolder">Rp</span>
        </div>

        <div style="border-bottom: 1px solid #F3F3F3;"></div>

        <!-- 药品 -->
        <div class="q-mb-none">
          <div v-for="(drug, index) in data.DrugList"
               v-bind:key="drug.DrugCode"
               class="relative-position">
            <div class="q-py-md">
              <div class="flex justify-between q-mb-sm text-subtitle1 text-weight-bold">
                <div>
                  <span class="q-mr-sm">{{ drug.DrugName }}</span>
                  <span>{{ drug.DrugSpecifications }}</span>
                </div>
                <div>
                  <span>x</span>
                  <span>{{ drug.DrugQty }}</span>
                  <span>{{ drug.DrugQtyUnit }}</span>
                </div>
              </div>
              <div class="text-grey-6">
                <span>
                  用法用量: {{ drug.DrugRoute }}。
                  每次{{ drug.OnceDose}}{{ drug.OnceUnit }}，
                  {{ drug.MedicationFrequency }}
                  {{ drug.MedicationDays ? "，" + drug.MedicationDays + "天" : "" }}
                </span>
              </div>
            </div>

            <div v-show="index !== data.DrugList.length - 1"
                 style="border-bottom: 1px dashed #e2e2e2;"></div>
            <el-image v-bind:src="require('../assets/img/Bitmap.png')"
                      v-show="index === data.DrugList.length - 1"
                      class="bitmap"></el-image>
          </div>
        </div>

        <!-- 审核 -->
        <div class="q-mb-md q-mt-lg">
          <div class="row q-mb-xs">
            <div class="row col-6 items-center">
              <span class="text-justify text-color-grey-999"
                    style="width: 5em;">医师</span>
              <span class="q-mx-xs text-color-grey-999">：</span>
              <span class="col text-color-grey-333">
                {{ data.DoctorName }}
              </span>
            </div>
            <div class="row col-6 items-center">
              <span class="text-justify text-color-grey-999"
                    style="width: 5em;">审方药师</span>
              <span class="q-mx-xs text-color-grey-999">：</span>
              <span class="col text-color-grey-333">
                {{ data.PrescriptionPharmacistName }}
              </span>
            </div>
          </div>
          <div class="row q-mb-xs">
            <div class="row col-6">
              <span class="text-justify text-color-grey-999"
                    style="width: 5em;">调配</span>
              <span class="q-mx-xs text-color-grey-999">：</span>
              <span class="col text-color-grey-333">
                {{ data.DispensemeDicineName||'-' }}
              </span>
            </div>
            <div class="row col-6">
              <span class="text-justify text-color-grey-999"
                    style="width: 5em;">核对发药</span>
              <span class="q-mx-xs text-color-grey-999">：</span>
              <span class="col text-color-grey-333">
                {{ data.DispensingPharmacistName||'-' }}
              </span>
            </div>
          </div>
        </div>

        <div class="q-mb-md"
             style="border-bottom: 1px solid #F3F3F3;"></div>
      </div>
    </div>

    <PeaceDialog title="原始处方"
                 :visible.sync="dialog.visible"
                 append-to-body
                 v-show="dialog.visible&&dialog.show">
      <el-image v-bind:src="data.prescriptionImageUrl"
                v-on:load="onLoad"></el-image>
    </PeaceDialog>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionDetail',
  props: {
    prescriptionInfo: Object
  },
  data() {
    return {
      dialog: {
        visible: false,
        show: false
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
  right: 0;
  bottom: 10px;
}
</style>