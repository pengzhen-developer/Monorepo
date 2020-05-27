// 处方详情

<template>
  <div class="q-px-lg p-py-md">
    <div class="text-grey-6">
      <span>No.</span>
      <span>{{ data.PrescriptionNo }}</span>
    </div>

    <!-- 处方标题 -->
    <div class="relative-position text-center q-mb-lg">
      <p class="text-h5 text-weight-bolder">{{ data.MedicalInstitutionName }}</p>
      <p class="text-h5 text-weight-bolder">处方笺</p>

      <img v-if="data.DoctorSignImage"
           v-bind:src="`./static/images/inquiry/${data.Prescription}.png`"
           class="absolute"
           style="width: 72px; height: 72px; right: 36px; bottom: -10px;"
           alt="医师签名" />

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
          <span class="col text-weight-bold">{{ data.Age }}岁</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">科别</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.MedicalDepartmentName }}</span>
        </div>
      </div>

      <div class="row q-mb-xs">
        <div class="row col-6"
             v-if="data.weight">
          <span class="text-justify"
                style="width: 4em;">体重</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.weight + 'kg' }}</span>
        </div>
        <div class="row col-6">
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
        <span class="col text-weight-bold"
              v-for="diagnosis in data.DiagnosisInfos"
              v-bind:key="diagnosis.DiagnosisName">
          {{ diagnosis.DiagnosisName }}
        </span>
      </div>
    </div>

    <!-- 处方明细信息 -->
    <div class="q-mb-md">
      <div class="flex justify-between items-end q-mb-xs">
        <span class="text-h6 text-weight-bolder">Rp</span>
        <div class="flex items-baseline"
             v-if="canShowAudit"
             v-bind:class="getThemeClass()">
          <span class="text-subtitle1 text-weight-bold q-mr-sm">{{ data.PrescriptionAudit.auditResult }}</span>
          <i v-on:click="showAudit"
             class="text-subtitle2 cursor-pointer el-icon-question"
             style="line-height: none;"></i>
        </div>
      </div>

      <div style="border-bottom: 1px solid #F3F3F3;"></div>

      <!-- 药品 -->
      <div class="q-mb-none">
        <div v-for="(drug, index) in data.DrugList"
             v-bind:key="drug.drugCode">
          <div class="q-py-md">
            <div class="flex justify-between q-mb-sm text-subtitle1 text-weight-bold">
              <div>
                <span class="q-mr-sm">{{ drug.drugName }}</span>
                <span>{{ drug.drugSpecifications }}</span>
              </div>
              <div>
                <span>x</span>
                <span>{{ drug.drugQty }}</span>
              </div>
            </div>
            <div class="text-grey-6">
              <span>
                用法用量: {{ drug.drugRoute }}。
                每次{{ drug.OnceDose}}{{ drug.OnceUnit }}，
                {{ drug.medicationFrequency }}
                {{
                drug.medication_days ? "，" + drug.medication_days + "天" : ""
              }}
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
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">医师</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">
              <img v-if="data.DoctorSignImage"
                   v-bind:src="data.DoctorSignImage"
                   style="max-height: 16px;"
                   alt="医师签名" />
            </span>
          </div>
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">审方药师</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">
              <img v-if="data.PrescriptionSign"
                   v-bind:src="data.PrescriptionSign"
                   style="max-height: 16px;"
                   alt="审方药师签名" />
            </span>
          </div>
        </div>
        <div class="row q-mb-xs">
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">调配药师</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">
              <!-- 暂未对接 -->
            </span>
          </div>
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">核对发药</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">
              <!-- 暂未对接 -->
            </span>
          </div>
        </div>
      </div>

      <div class="q-mb-md"
           style="border-bottom: 1px solid #F3F3F3;"></div>
    </div>

    <!-- 处方审核信息 -->
    <div class="q-mb-md">
      <div class="row q-mb-xs">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 6em;">药师审方结果</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">
            <!-- 暂未对接 -->
          </span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 6em;">系统审方结果</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.PrescriptionExamMemo }}</span>
        </div>
      </div>
    </div>

    <!-- 前置审方详情 -->
    <peace-dialog title="系统审方结果"
                  v-bind:visible.sync="visible"
                  append-to-body>
      <RecipeAudit v-bind:data="audit"></RecipeAudit>
    </peace-dialog>
  </div>
</template>

<script>
import RecipeAudit from './RecipeAudit'

const adiutThemeMap = {
  /** 通过 */
  ['OK']: 'primary',
  /** 提示 */
  ['I']: 'info',
  /** 慎用 */
  ['R']: 'warning',
  /** 禁用 */
  ['D']: 'negative'
}

export default {
  components: {
    RecipeAudit
  },

  props: {
    data: Object
  },

  data() {
    return {
      visible: false
    }
  },

  computed: {
    /** 前置审方审核数据 */
    audit() {
      return this.data?.PrescriptionAudit
    },

    /** 是否显示前置审方按钮 */
    canShowAudit() {
      const showAduitMap = ['I', 'R', 'D']
      return showAduitMap.includes(this.audit?.auditCode)
    }
  },

  methods: {
    getThemeClass(code = this.audit?.auditCode) {
      const theme = adiutThemeMap[code]

      return {
        [`text-${theme}`]: true
      }
    },

    showAudit() {
      this.visible = true
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