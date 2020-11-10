// 处方详情

<template>
  <div class="q-px-lg p-py-md">
    <div class="text-grey-6 row items-center justify-between">
      <span>No.{{ data.PrescriptionNo }}</span>
      <el-button v-if="data.pngUrl"
                 type="text"
                 v-on:click="showOriginInfo">查看原始处方</el-button>
    </div>
    <img-viewer ref="viewer" />

    <!-- 处方标题 -->
    <div class="relative-position text-center q-mb-lg">
      <p class="text-h5 text-weight-bolder">{{ data.MedicalInstitutionName }}</p>
      <p class="text-h5 text-weight-bolder">处方笺</p>
      <!-- 处方状态图片 -->
      <img v-if="data.stampUrl"
           v-bind:src="data.stampUrl"
           class="absolute"
           style="width: 72px; height: 72px; right: 36px; bottom: -10px;" />

      <div class="q-mt-md"
           style="border-bottom: 1px dashed #e2e2e2;"></div>
    </div>

    <!-- 处方基础信息 -->
    <div class="q-mb-md">
      <div class="q-mb-xs row q-col-gutter-md">
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

      <div class="q-mb-xs row q-col-gutter-md">
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

      <div class="q-mb-xs row q-col-gutter-md"
           v-if="data.weight">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">体重</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.weight + 'kg' }}</span>
        </div>
      </div>

      <div class="q-mb-xs row q-col-gutter-md">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">开具时间</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.PrescriptionTime }}</span>
        </div>
        <div class="row col-6">
          <span class="text-justify"
                style="width: 4em;">病历号</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">{{ data.caseNo }}</span>
        </div>
      </div>

      <div class="q-mb-xs row q-col-gutter-md">
        <div class="row col-12">

          <span class="text-justify"
                style="width: 4em;">疾病诊断</span>

          <span class="q-mx-xs">：</span>

          <span class="col text-weight-bold"
                v-for="diagnosis in data.DiagnosisInfos"
                v-bind:key="diagnosis.DiagnosisName">
            {{ diagnosis.DiagnosisName }}
          </span>

          <!-- <div class="info-row-content">
            <template v-if="data.diagnoseList">
              <el-tag :key="item"
                      class="q-mr-6 q-mt-6"
                      type="info"
                      v-for="item in data.diagnoseList">{{item.diagnoseName}}</el-tag>
            </template>
            <template v-else>
              <span>无</span>
            </template>
          </div> -->

        </div>
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
                <span>{{ drug.drugQty + drug.drugQuantityUnit }}</span>
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
        <div class="q-mb-xs row q-col-gutter-md">
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">医师</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">
              {{data.DoctorName}}
              <!-- <img v-if="data.DoctorSignImage"
                   v-bind:src="data.DoctorSignImage"
                   style="max-height: 16px;"
                   alt="医师签名" /> -->
            </span>
          </div>
          <div class="row col-6">
            <span class="text-justify"
                  style="width: 4em;">审方药师</span>
            <span class="q-mx-xs">：</span>
            <span class="col text-weight-bold">
              {{data.PrescriptionPharmacistName}}
              <!-- <img v-if="data.PrescriptionSign"
                   v-bind:src="data.PrescriptionSign"
                   style="max-height: 16px;"
                   alt="审方药师签名" /> -->
            </span>
          </div>
        </div>
        <div class="q-mb-xs row q-col-gutter-md">
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
      <div class="row q-mb-xs q-col-gutter-x-md">
        <div class="row col-6">
          <span class="text-justify"
                style="width: 6em;">药师审方结果</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">
            {{ data.PrescriptionExamMemo }}
          </span>
        </div>
        <div class="col-6">
          <span class="text-justify"
                style="width: 6em;">系统审方结果</span>
          <span class="q-mx-xs">：</span>
          <span class="col text-weight-bold">
            <!-- 暂未对接 -->
          </span>
        </div>
      </div>
    </div>

    <!-- 前置审方详情 -->
    <peace-dialog title="智能审方结果"
                  v-bind:visible.sync="visible"
                  append-to-body>
      <RecipeAudit v-bind:data="audit"></RecipeAudit>
    </peace-dialog>

    <peace-dialog title="原始处方"
                  v-bind:visible.sync="originVisible"
                  append-to-body>
      <img v-if="data.pngUrl"
           v-bind:src="data.pngUrl"
           class="full-width"
           alt="原始处方" />
    </peace-dialog>
  </div>
</template>

<script>
import util from '@src/library.back/helper/util'
import { isEmpty } from '@src/library.back/helper/validate'
import RecipeAudit from './RecipeAudit'
import ImgViewer from './components/ImageViewer'

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
    RecipeAudit,
    ImgViewer
  },

  props: {
    data: Object
  },

  data() {
    return {
      visible: false,
      originVisible: false
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
    },

    showOriginInfo() {
      if (this.data && isEmpty(this.data.pngUrl)) {
        util.error({ msg: 'PDF地址不存在' })
      }
      // this.originVisible = true
      this.$refs.viewer.show([{ thumbnail: this.data.pngUrl, source: this.data.pngUrl }])
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