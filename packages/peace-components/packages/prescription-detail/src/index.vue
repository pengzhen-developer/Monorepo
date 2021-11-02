<!--
 * @Description: 处方详情（互联网医院）
-->

<template>
  <div class="peace-prescription-detail"
       v-loading="loading">
    <el-image-viewer v-if="visiableImg"
                     v-bind:on-close="() => { visiableImg = false }"
                     v-bind:url-list="[internalData?.pngUrl]" />

    <div class="q-px-14 text-grey-6 row items-center justify-between">
      <span>No.{{ internalData?.prescriptionNo }}</span>

      <el-button v-if="internalData?.pngUrl"
                 type="text"
                 v-on:click="() => { visiableImg = true }">查看原始处方</el-button>
    </div>

    <!-- 处方标题 -->
    <div class="q-px-20">
      <div class="relative-position text-center">
        <p class="text-h5 q-mb-none text-weight-bolder">{{ internalData?.doctorInfo?.hospitalName }}</p>
        <p class="text-h5 q-mb-md text-weight-bolder">处方笺</p>

        <!-- 处方状态 -->
        <img v-if="internalData?.stampUrl"
             v-bind:src="internalData?.stampUrl"
             class="absolute"
             style="width: 72px; height: 72px; right: 36px; bottom: -70px;" />
      </div>
    </div>

    <div class="q-mt-sm q-mb-xl dashed-line"></div>

    <!-- 处方基础信息 -->
    <div class="q-mb-md">
      <el-form space-view
               label-suffix="：">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="姓名">{{ internalData?.patientInfo?.name }}</el-form-item>
          <el-form-item class="col"
                        label="性别">{{ internalData?.patientInfo?.gender }}</el-form-item>
        </div>

        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="年龄">{{ internalData?.patientInfo?.age }}</el-form-item>
          <el-form-item class="col"
                        label="科别">{{ internalData?.doctorInfo?.deptName }}</el-form-item>
        </div>

        <div class="row q-col-gutter-x-md"
             v-if="internalData?.weight || internalData?.height">
          <el-form-item class="col"
                        label="体重"
                        v-if="internalData?.weight">{{ internalData?.weight + 'kg' }}</el-form-item>
          <el-form-item class="col"
                        label="身高"
                        v-if="internalData?.height">{{ internalData?.height + 'cm' }}</el-form-item>
        </div>

        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="开具时间">{{ internalData?.prescriptionTime }}</el-form-item>
          <el-form-item class="col"
                        label="病历号">{{ internalData?.caseNo }}</el-form-item>
        </div>

        <div class="row q-col-gutter-md">
          <el-form-item class="col"
                        label="疾病诊断">{{ internalData?.diagnoseList?.map((item) => item.name).join(' | ') }}</el-form-item>
        </div>
      </el-form>
    </div>

    <!-- 处方审核图标 -->
    <div class="q-mb-md">
      <div class="flex justify-between items-end q-mb-xs">
        <span class="text-h6 text-weight-bold">Rp</span>
        <div class="flex items-baseline cursor-pointer"
             v-if="shouldVisibleAuditResult"
             v-on:click="showAuditResult"
             v-bind:style="prescriptionAuditResultStyle">
          <span class="text-subtitle1 text-weight-bold q-mr-sm">{{ internalData?.prescriptionAuditResult.actionMsg }}</span>
          <i class="text-subtitle2 el-icon-question"
             style="line-height: none;"></i>
        </div>
      </div>

      <div class="dashed-line"></div>

      <!-- 处方明细信息 -->
      <div class="q-mb-xl">
        <template v-for="(drug, index) in internalData?.drugList">
          <div v-bind:key="index"
               class="q-py-md">
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
              <span>用法用量：</span>
              <span>{{ `${ drug.drugRoute }，` }}</span>
              <span>每次</span>
              <span>{{ `${ drug.onceDose }${ drug.onceUnit }，` }}</span>
              <span>{{ `${ drug.medicationFrequency }，` }}</span>
              <span>{{ `${ drug.medicationDays }天。` }}</span>
            </div>
          </div>

          <div v-if="index === internalData?.drugList.length - 1"
               v-bind:key="`oblique-line-${index}`"
               class="oblique-line"></div>
          <div v-else
               v-bind:key="`dashed-line-${index}`"
               class="dashed-line"></div>
        </template>
      </div>
    </div>

    <!-- 处方审核信息 -->
    <div class="q-mb-md">
      <el-form space-view
               label-suffix="：">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="医师">{{ internalData?.doctorInfo?.doctorName }}</el-form-item>
          <el-form-item class="col"
                        label="审方药师">{{ internalData?.prescriptionPharmacistName }}</el-form-item>
        </div>

        <div class="row q-col-gutter-md">
          <el-form-item class="col"
                        label="调配药师"></el-form-item>
          <el-form-item class="col"
                        label="核对发药"></el-form-item>
        </div>
      </el-form>
    </div>

    <div class="q-mb-md"
         style="border-bottom: 1px solid #F3F3F3;"></div>

    <!-- 药师审核信息 -->
    <div>
      <el-form space-view>
        <el-form-item label="药师审方结果：">{{ internalData?.prescriptionExamMemo }}</el-form-item>
        <el-form-item label="系统审方结果："></el-form-item>
        <el-form-item label="药师质疑原因："
                      v-if="internalData?.queryReason">{{ internalData?.queryReason }}</el-form-item>
      </el-form>
    </div>

    <div class="q-mt-lg flex justify-end">
      <slot name="footer"
            v-bind:data="internalData"
            v-bind:refetch="refetch"
            v-bind:close="close"></slot>
    </div>

    <PeaceDialog append-to-body
                 title="审方结果"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionAuditResult v-bind:data="dialog.data"></PeacePrescriptionAuditResult>
    </PeaceDialog>
  </div>
</template>

<script>
const PRESCRIPTION_AUDIT_RESULT_CONFIG = {
  /** 通过 */
  ['OK']: { color: 'rgba(48, 153, 166, 1)' },
  /** 提示 */
  ['I']: { color: 'rgba(48, 153, 166, 1)' },
  /** 慎用 */
  ['R']: { color: 'rgba(240, 152, 21, 1)' },
  /** 禁用 */
  ['D']: { color: 'rgba(196, 2, 2, 1)' },
  /** 失败 */
  ['FAIL']: { color: 'rgba(51, 51, 51, 0.6)' },
  /** 错误 */
  ['ERR']: { color: 'rgba(51, 51, 51, 0.2)' },
  /** 服务调用失败 */
  ['SERVER_ERR']: { color: 'rgba(196, 2, 2, 1)' }
}

import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'
import PeacePrescriptionAuditResult from './../../prescription-audit-result/src/index.vue'

export default {
  name: 'PeacePrescriptionDetail',

  components: {
    ElImageViewer,
    PeacePrescriptionAuditResult
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
      controlLoading: false,

      dialog: {
        visible: false,
        data: undefined
      }
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
     * @description: 是否应该显示前置审方按钮
     * @param {*}
     * @return {*}
     */
    shouldVisibleAuditResult() {
      const showAduitMap = ['I', 'R', 'D', 'FAIL', 'SERVER_ERR']
      return showAduitMap.includes(this.internalData?.prescriptionAuditResult?.actionCode)
    },

    /**
     * @description: 前置审方按钮样式
     * @param {*}
     * @return {*}
     */
    prescriptionAuditResultStyle() {
      const theme = PRESCRIPTION_AUDIT_RESULT_CONFIG[this.internalData?.prescriptionAuditResult?.actionCode]

      return {
        [`color`]: theme.color
      }
    }
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    },

    showAuditResult() {
      this.dialog.visible = true
      this.dialog.data = this.internalData.prescriptionAuditResult
    }
  }
}
</script>

<style lang="scss" scoped>
.peace-prescription-detail {
  .dashed-line {
    border-bottom: 1px dashed #e2e2e2;
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