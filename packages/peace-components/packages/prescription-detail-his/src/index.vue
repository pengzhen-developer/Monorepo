<!--
 * @Description: 处方详情（实体医院）
-->

<template>
  <div v-loading="loading">
    <el-image-viewer v-if="visiableImg"
                     v-bind:on-close="() => { visiableImg = false }"
                     v-bind:url-list="[internalData?.pngUrl]" />

    <div class="q-px-14 text-grey-6 row items-center justify-between">
      <span>No.{{ internalData?.prescriptionCode }}</span>

      <el-button v-if="internalData?.pngUrl"
                 type="text"
                 v-on:click="() => { visiableImg = true }">查看原始处方</el-button>
    </div>

    <div class="q-px-20">
      <!-- 处方标题 -->
      <div class="relative-position text-center">
        <p class="text-h5 q-mb-none text-weight-bolder">{{ internalData?.hospitalName }}</p>
        <p class="text-h5 q-mb-md text-weight-bolder">处方笺</p>

        <!-- 处方状态 -->
        <img v-if="internalData?.stampUrl"
             v-bind:src="internalData?.stampUrl"
             class="absolute"
             style="width: 72px; height: 72px; right: 36px; bottom: -70px;" />
      </div>

      <div class="q-mt-sm q-mb-xl dashed-line"></div>

      <!-- 处方基础信息 -->
      <el-form space-view
               label-suffix="："
               class="q-mb-md">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="姓名">{{ internalData?.patientName }}</el-form-item>
          <el-form-item class="col"
                        label="性别">{{ internalData?.patientSex }}</el-form-item>
        </div>

        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="年龄">{{ internalData?.patientAge }}</el-form-item>
          <el-form-item class="col"
                        label="科别">{{ internalData?.deptName }}</el-form-item>
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
                        label="开具时间">{{ internalData?.inputTime }}</el-form-item>
          <el-form-item class="col"
                        label="病历号">{{ internalData?.caseNo }}</el-form-item>
        </div>

        <div class="row q-col-gutter-md">
          <el-form-item class="col"
                        label="疾病诊断">{{ internalData?.diagnosis }}</el-form-item>
        </div>
      </el-form>

      <!-- 处方明细信息 -->
      <div class="q-mb-md">
        <div class="flex justify-between items-end q-mb-xs">
          <span class="text-h6 text-weight-bold">Rp</span>
          <div class="flex items-baseline cursor-pointer"
               v-if="shouldVisibleAuditResult"
               v-on:click="showAudit"
               v-bind:class="getThemeClass()">
            <span class="text-subtitle1 text-weight-bold q-mr-sm">{{ internalData?.prescriptionAuditResult.actionMsg }}</span>
            <i class="text-subtitle2 el-icon-question"
               style="line-height: none;"></i>
          </div>
        </div>

        <div class="dashed-line"></div>

        <!-- 药品 -->
        <div class="q-mb-xl">
          <template v-for="(drug, index) in internalData?.drugJson">
            <div v-bind:key="index"
                 class="q-py-md">
              <div class="flex justify-between q-mb-sm text-subtitle1 text-weight-bold">
                <div>
                  <span class="q-mr-sm">{{ drug.drugName }}</span>
                  <span>{{ drug.specification }}</span>
                </div>
                <div>
                  <span>x</span>
                  <span>{{ drug.number + drug.numberUnit }}</span>
                </div>
              </div>
              <div class="text-grey-6">
                <span>用法用量：</span>
                <span>{{ `${drug.usage}，` }}</span>
                <span>每次</span>
                <span>{{ `${drug.doseNoce}${drug.doseUnit}，` }}</span>
                <span>{{ `${drug.dailyTimes ? drug.dailyTimes + '，' : ''}` }}</span>
                <span>{{ `${drug.useDays}天。` }}</span>
              </div>
            </div>

            <div v-if="index === internalData?.drugJson.length - 1"
                 v-bind:key="`oblique-line-${index}`"
                 class="oblique-line"></div>
            <div v-else
                 v-bind:key="`dashed-line-${index}`"
                 class="dashed-line"></div>
          </template>
        </div>
      </div>

      <!-- 处方审核信息 -->
      <el-form space-view
               class="q-mb-md"
               label-suffix="：">
        <div class="row q-col-gutter-x-md">
          <el-form-item class="col"
                        label="医师">{{ internalData?.doctorName }}</el-form-item>
          <el-form-item class="col"
                        label="审方药师">{{ internalData?.PrescriptionPharmacistName }}</el-form-item>
        </div>

        <div class="row q-col-gutter-md">
          <el-form-item class="col"
                        label="调配药师">{{ internalData?.drugMaker }}</el-form-item>
          <el-form-item class="col"
                        label="核对发药">{{ internalData?.drugSender }}</el-form-item>
        </div>
      </el-form>

      <div class="q-mb-md"
           style="border-bottom: 1px solid #F3F3F3;"></div>

      <!-- 药师审核信息 -->
      <el-form space-view
               label-suffix="：">
        <el-form-item label="药师审方结果">{{ internalData?.PrescriptionExamMemo }}</el-form-item>
        <el-form-item label="系统审方结果"></el-form-item>
        <el-form-item label="药师质疑原因"
                      v-if="internalData?.queryReason">{{ internalData?.queryReason }}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'

export default {
  name: 'PeacePrescriptionDetailHIS',

  components: {
    ElImageViewer
  },

  props: {
    data: [Object, Function]
  },

  data() {
    return {
      loading: false,
      internalData: {},

      visiableImg: false
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
      return showAduitMap.includes(this.audit?.actionCode)
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
</style>