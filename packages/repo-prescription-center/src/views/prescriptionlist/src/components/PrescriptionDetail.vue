<!--
 * @Description: 处方详情（互联网医院）
-->

<template>
  <div class="peace-prescription-detail"
       v-loading="loading">
    <!-- 处方标题 -->
    <div class="q-px-20">
      <div class="relative-position text-center">
        <p class="title-style q-mb-none text-weight-bolder">{{ internalData?.hosName }}</p>
        <p class="title-style q-mb-30 text-weight-bolder">处方笺</p>

        <!-- 处方状态 -->
        <img v-if="prescriptionStatusImage"
             class="absolute"
             style="width: 88px; height: 88px; right: -20px; top: 64px;"
             v-bind:src="prescriptionStatusImage" />
      </div>
    </div>

    <div class="text-grey-6 row items-center">
      <span>处方号：</span>
      <span class="q-mr-sm">No.{{ internalData?.prescriptionNo }}</span>

      <file-viewer v-if="visiableImg"
                   v-bind:on-close="() => { visiableImg = false }"
                   v-bind:url-list="prescriptionImageList" />

      <el-button v-if="prescriptionImageList.length > 0"
                 round
                 style="padding: 2px 8px"
                 class="element-ui-default"
                 size="mini"
                 v-on:click="() => { visiableImg = true }">原始处方</el-button>
    </div>

    <div class="q-mt-sm q-mb-md dashed-line"></div>

    <!-- 处方基础信息 -->
    <div>
      <el-form space-view
               label-suffix="：">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="姓名">{{ internalData?.patientName }}</el-form-item>
          <el-form-item class="col"
                        label="性别">{{ internalData?.patientGender | genderType  }}</el-form-item>
          <el-form-item class="col"
                        label="年龄">{{ internalData?.age }}{{ internalData?.ageunit | ageUnitFormat }}</el-form-item>
        </div>

        <div class="row q-col-gutter-x-md">

          <el-form-item class="col"
                        label="科别">{{ internalData?.deptName }}</el-form-item>

          <el-form-item class="col"
                        label="门诊/住院号">{{ internalData?.clientCardCode }}</el-form-item>

          <el-form-item class="col"
                        label="开立日期">{{ internalData?.prescriptionTime | createTimeFormat }}</el-form-item>
        </div>

        <div class="row q-col-gutter-x-md"
             v-if="internalData?.height || internalData?.weight || internalData?.humanClasses">

          <el-form-item class="col-4"
                        v-if="internalData?.height"
                        label="身高">{{ internalData?.height ? `${internalData?.height}cm` : ""}}</el-form-item>
          <el-form-item class="col-4"
                        v-if="internalData?.weight"
                        label="体重">{{ internalData?.weight ? `${internalData?.weight}kg` : ""}}</el-form-item>
          <el-form-item class="col-4"
                        v-if="internalData?.humanClasses"
                        label="人群">{{ internalData?.humanClasses }}</el-form-item>

        </div>

        <div class="row q-col-gutter-md"
             v-if="internalData?.allergyInformation">
          <el-form-item class="col"
                        label="过敏史">{{ internalData?.allergyInformation }}</el-form-item>
        </div>

        <div class="row q-col-gutter-md">
          <el-form-item class="col"
                        label="疾病诊断">{{ internalData?.prescriptionDiagnsList | diagnsListFormat }}</el-form-item>
        </div>

      </el-form>
    </div>

    <!-- 处方审核图标 -->
    <div class="q-mb-md">
      <div class="flex justify-between items-end q-mb-xs">
        <span class="text-h6 text-weight-bold">Rp.</span>
        <div class="flex items-baseline"
             v-if="shouldVisibleAuditResult">
          <div v-bind:style="prescriptionAuditResultIconStyle"
               class="q-mr-sm"></div>
          <span v-bind:style="prescriptionAuditResultStyle"
                class="text-subtitle1 text-weight-bold">{{ internalData?.actionMsg }}</span>

        </div>
      </div>

      <!-- 处方明细信息 -->
      <div class="q-pa-md"
           v-if="internalData?.prescriptionDrugsList && internalData?.prescriptionDrugsList.length > 0"
           style="background: #F5F5F5; border-radius: 4px; padding-bottom: 90px;">
        <template v-for="(drug, index) in internalData?.prescriptionDrugsList">
          <div v-bind:key="index"
               class="q-pb-md">
            <div class="flex justify-between q-mb-sm text-subtitle1 text-weight-bold">
              <div>
                <span class="q-mr-sm">{{ drug.drugName }}</span>
                <span>{{ drug.drugSpecifications }}</span>
              </div>
              <div>
                <span>x</span>
                <span>{{ drug.drugQty + drug.drugQtyUnit }}</span>
              </div>
            </div>
            <div class="text-grey-6">
              <span>用法用量：</span>
              <span>{{ `${ drug.drugRoute }，` }}</span>
              <span>每次</span>
              <span>{{ `${ drug.onceDose }${ drug.onceUnit }，` }}</span>
              <span>{{ `${ drug.medicationFrequency }，` }}</span>
              <span>{{ `${ drug.drugDaysSupply }天。` }}</span>
            </div>
          </div>

          <div v-if="index === internalData?.prescriptionDrugsList.length - 1"
               v-bind:key="`oblique-line-${index}`"
               class="oblique-line"></div>
          <div v-bind:key="`dashed-line-${index}`"
               class="dashed-line"></div>
        </template>
      </div>
    </div>

    <!-- 处方审核信息 -->
    <div class="q-mb-sm">
      <el-form space-view
               element-ui-default
               label-suffix="：">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="医师">{{ internalData?.doctorName }}</el-form-item>
          <el-form-item class="col"
                        label="审方药师">{{ internalData?.pharmacistName }}</el-form-item>
          <el-form-item class="col"
                        label="调配">{{ internalData?.dispensemeDicineName }}</el-form-item>
        </div>

        <div class="row q-col-gutter-md">

          <el-form-item class="col"
                        label="核对发药">{{ internalData?.checkPharmacistName }}</el-form-item>
          <el-form-item class="col"
                        label="发药药师">{{ internalData?.dispensingPharmacistName }}</el-form-item>
          <div class="col"></div>
        </div>
      </el-form>
    </div>

    <div class="q-mb-sm dashed-line"></div>

    <!-- 药师审核信息 -->
    <div class="column q-mb-sm">
      <span v-if="internalData?.prescriptionTime"
            class="q-mb-2"
            style="font-size: 12px; rgba(51,51,51,0.80);">处方失效时间：{{ internalData?.prescriptionTime }}</span>
      <span v-if="internalData?.prescriptionNote"
            style="font-size: 12px; rgba(51,51,51,0.80);">处方备注信息：{{ internalData?.prescriptionNote }}</span>
    </div>

  </div>
</template>

<script>
const PRESCRIPTION_AUDIT_RESULT_CONFIG = {
  /** 通过 */
  ['OK']: { color: 'rgba(68, 204, 119, 1)' },
  /** 提示 */
  ['I']: { color: 'rgba(24, 144, 255, 1)' },
  /** 慎用 */
  ['R']: { color: 'rgba(255, 160, 12, 1)' },
  /** 禁用 */
  ['D']: { color: 'rgba(255, 58, 48, 1)' },
  /** 失败 */
  ['FAIL']: { color: 'rgba(51, 51, 51, 0.6)' },
  /** 错误 */
  ['ERR']: { color: 'rgba(51, 51, 51, 0.2)' },
  /** 服务调用失败 */
  ['SERVER_ERR']: { color: 'rgba(255, 58, 48, 1)' }
}

import FileViewer from './FileViewer.vue'

export default {
  name: 'PrescriptionDetail',

  components: {
    FileViewer
  },

  props: {
    data: [Object, Function],
    refetch: Function,
    close: Function
  },

  data() {
    return {
      loading: false,
      internalData: {},

      visiableImg: false,
      controlLoading: false
    }
  },

  filters: {
    genderType: function(value) {
      if (Peace.validate.isEmpty(value)) {
        return ''
      }
      return { M: '男', F: '女' }[value] ?? ''
    },

    ageUnitFormat: function(value) {
      /// 年龄单位  天（D）  月(M)  年(Y) ，缺省是年
      if (Peace.validate.isEmpty(value)) {
        return '岁'
      }
      return { D: '天', M: '月', Y: '岁' }[value] ?? '岁'
    },

    createTimeFormat: function(value) {
      if (Peace.validate.isEmpty(value)) {
        return ''
      }
      return value.slice(0, 10)
    },

    diagnsListFormat: function(value) {
      if (Peace.validate.isEmpty(value) || !Array.isArray(value)) {
        return ''
      }
      return value.reduce(function(prev, cur) {
        return prev + cur.diagnosisName + ' '
      }, '')
    }
  },

  watch: {
    data: {
      async handler() {
        this.loading = true
        this.internalData = await this.fetch()
        this.loading = false
      },
      immediate: true
    }
  },

  computed: {
    /**
     * @description: 状态图片Image
     * @param {*}
     * @return {*}
     */
    prescriptionStatusImage() {
      if (this.internalData?.prescriptionStatus && [1, 2, 3, 5].includes(Number(this.internalData?.prescriptionStatus ?? 0))) {
        return require(`@src/assets/img/prescriptionStatus_${this.internalData?.prescriptionStatus}.png`)
      } else {
        return undefined
      }
    },
    /**
     * @description: 是否应该显示前置审方按钮
     * @param {*}
     * @return {*}
     */
    shouldVisibleAuditResult() {
      const showAduitMap = ['I', 'R', 'D', 'FAIL', 'SERVER_ERR']
      return showAduitMap.includes(this.internalData?.actionCode)
    },

    /**
     * @description: 前置审方按钮样式
     * @param {*}
     * @return {*}
     */
    prescriptionAuditResultStyle() {
      const theme = PRESCRIPTION_AUDIT_RESULT_CONFIG[this.internalData?.actionCode]

      return {
        [`color`]: theme.color
      }
    },

    /**
     * @description: 前置审方按钮样式
     * @param {*}
     * @return {*}
     */
    prescriptionAuditResultIconStyle() {
      const theme = PRESCRIPTION_AUDIT_RESULT_CONFIG[this.internalData?.actionCode]

      return {
        width: '12px',
        height: '12px',
        'border-radius': '6px',
        [`background`]: theme.color
      }
    },

    prescriptionImageList() {
      if (Peace.validate.isEmpty(this.internalData?.prescriptionImageUrl)) {
        return []
      }
      return this.internalData?.prescriptionImageUrl.split(',') ?? []
    }
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    }
  }
}
</script>

<style lang="scss" scoped>
.peace-prescription-detail {
  margin: 8px;

  .title-style {
    color: var(--q-color-grey-333);
    font-size: 22px;
  }

  .dashed-line {
    border-bottom: 1px dashed rgba(51, 51, 51, 0.2);
  }

  ::v-deep .el-form-item__label {
    color: var(--q-color-grey-666) !important;
  }

  ::v-deep .el-form:not(.element-ui-default) .el-form-item__content {
    font-weight: 500;
  }

  .oblique-line {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 172px;
      border: 1px solid transparent;
      border-image: linear-gradient(to left, #999999, #eee);
      border-image-slice: 1;
      transform: rotateZ(170deg) scale(1);
    }
  }
}
</style>