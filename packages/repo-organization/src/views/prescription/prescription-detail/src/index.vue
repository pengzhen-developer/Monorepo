// 处方详情

<template>
  <div class="layout-route">
    <div class="card"
         style="width: 600px; margin: 0 auto;">
      <div class="text-grey-6">
        <span>No.</span>
        <span>{{ data.PrescriptionNo }}</span>
      </div>

      <!-- 处方标题 -->
      <div class="relative-position text-center q-mb-lg">
        <p class="text-h5 text-weight-bolder">{{ data.MedicalInstitutionName }}</p>
        <p class="text-h5 text-weight-bolder">处方笺</p>

        <div class="q-mt-md"
             style="border-bottom: 1px dashed #e2e2e2;"></div>
      </div>

      <!-- 处方基础信息 -->
      <div class="q-mb-md">
        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">姓名</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.PatientName }}</span>
          </div>
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">性别</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.PatientGender }}</span>
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">年龄</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.Age }}</span>
          </div>
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">科别</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.MedicalDepartmentName }}</span>
          </div>
        </div>

        <div class="row q-mb-xs">
          <div class="row col-12">
            <span class="text-justify"
                  style="width: 4em;">开具时间</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">{{ data.PrescriptionTime }}</span>
          </div>
        </div>

        <div class="row q-mb-xs">
          <span class="text-justify"
                style="width: 4em;">疾病诊断</span>
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
               v-bind:key="drug.DrugCode">
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
          </div>
        </div>

        <!-- 审核 -->
        <div class="q-mb-md">
          <div class="row q-mb-xs">
            <div class="row col-6 items-center">
              <span class="text-justify"
                    style="width: 4em;">医师</span>
              <span class="q-mx-xs">：</span>
              <span class="col text-weight-bold">
                {{ data.DoctorName }}
              </span>
            </div>
            <div class="row col-6 items-center">
              <span class="text-justify"
                    style="width: 4em;">审方药师</span>
              <span class="q-mx-xs">：</span>
              <span class="col text-weight-bold">
                <el-image style="width: 56px;"
                          fit="contain"
                          v-if="data.base64uniqueImage"
                          v-bind:title="data.PrescriptionPharmacistName"
                          v-bind:src="data.base64uniqueImage"
                          v-bind:preview-src-list="[data.base64uniqueImage]"></el-image>
              </span>
            </div>
          </div>
          <div class="row q-mb-xs">
            <div class="row col-6">
              <span class="text-justify"
                    style="width: 4em;">调配药师</span>
              <span class="q-mx-xs">：</span>
              <span class="col text-weight-bold">
                {{ data.DispensemeDicineName }}
              </span>
            </div>
            <div class="row col-6">
              <span class="text-justify"
                    style="width: 4em;">核对发药</span>
              <span class="q-mx-xs">：</span>
              <span class="col text-weight-bold">
                {{ data.DispensingPharmacistName }}
              </span>
            </div>
          </div>
        </div>

        <div class="q-mb-md"
             style="border-bottom: 1px solid #F3F3F3;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      visible: false,
      data: {
        PrescriptionNo: '',
        MedicalInstitutionName: '',
        PatientName: '',
        PatientGender: '',
        Age: '',
        PatientWeight: '',
        PrescriptionTime: '',
        MedicalDepartmentName: '',
        DiagnosisInfos: [],
        DrugList: []
      }
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      const JZTClaimNo = Peace.cache.sessionStorage.get('6-6-99-JZTClaimNo')
      const params = {
        JZTClaimNo
      }

      Service.getPrescriptionInfo(params).then((res) => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-info {
  color: #3e96f9 !important;
}

.text-justify {
  text-align-last: justify;
}
</style>