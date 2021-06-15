// 处方详情

<template>
  <div class="q-px-lg p-py-md">
    <img-viewer ref="viewer" />

    <div class="text-grey-6 row items-center justify-between">
      <span>No.{{ data.PrescriptionNo }}</span>
      <el-button v-if="data.pngUrl" type="text" v-on:click="showOriginInfo">查看原始处方</el-button>
    </div>

    <div class="q-px-sm">
      <!-- 处方标题 -->
      <div class="relative-position text-center">
        <p class="text-h5 q-mb-none text-weight-bolder">{{ data.MedicalInstitutionName }}</p>
        <p class="text-h5 q-mb-md text-weight-bolder">处方笺</p>
        <!-- 处方状态图片 -->
        <img v-if="data.stampUrl" v-bind:src="data.stampUrl" class="absolute" style="width: 72px; height: 72px; right: 36px; bottom: -70px;" />
      </div>

      <div class="q-mt-sm q-mb-xl dashed-line"></div>

      <!-- 处方基础信息 -->
      <div class="q-mb-md">
        <el-form space-view>
          <div class="q-mb-xs row q-col-gutter-x-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">姓名</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.PatientName }}</span>
            </el-form-item>
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">性别</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.PatientGender }}</span>
            </el-form-item>
          </div>

          <div class="q-mb-xs row q-col-gutter-x-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">年龄</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.Age }}</span>
            </el-form-item>
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">科别</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.MedicalDepartmentName }}</span>
            </el-form-item>
          </div>

          <div v-if="data.weight" class="q-mb-xs row q-col-gutter-x-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">体重</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.weight + 'kg' }}</span>
            </el-form-item>
          </div>

          <div class="q-mb-xs row q-col-gutter-x-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">开具时间</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.PrescriptionTime }}</span>
            </el-form-item>
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">病历号</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.caseNo }}</span>
            </el-form-item>
          </div>

          <div class="q-mb-xs row q-col-gutter-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="text-justify">疾病诊断</span>
                <span>：</span>
              </div>
              <span>
                {{ data.diagnoseList && data.diagnoseList.map((item) => item.name).join(' | ') }}
              </span>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- 处方明细信息 -->
      <div class="q-mb-md">
        <div class="flex justify-between items-end q-mb-xs">
          <span class="text-h6 text-weight-bold">Rp</span>
          <div class="flex items-baseline cursor-pointer" v-if="canShowAudit" v-on:click="showAudit" v-bind:class="getThemeClass()">
            <span class="text-subtitle1 text-weight-bold q-mr-sm">{{ data.PrescriptionAudit.auditResult }}</span>
            <i class="text-subtitle2 el-icon-question" style="line-height: none;"></i>
          </div>
        </div>

        <div class="dashed-line"></div>

        <!-- 药品 -->
        <div class="q-mb-xl">
          <template v-for="(drug, index) in data.DrugList">
            <div v-bind:key="drug.drugCode" class="q-py-md">
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
                <span>{{ `${drug.drugRoute}，` }}</span>
                <span>每次</span>
                <span>{{ `${drug.OnceDose}${drug.OnceUnit}，` }}</span>
                <span>{{ `${drug.medicationFrequency}，` }}</span>
                <span>{{ `${drug.medication_days}天。` }}</span>
              </div>
            </div>

            <div v-if="index === data.DrugList.length - 1" v-bind:key="drug.drugName" class="oblique-line"></div>
            <div v-else v-bind:key="drug.drugName" class="dashed-line"></div>
          </template>
        </div>
      </div>

      <!-- 处方审核信息 -->
      <div class="q-mb-md">
        <el-form space-view>
          <div class="q-mb-xs row q-col-gutter-x-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">医师</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.DoctorName }}</span>
            </el-form-item>
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">审方药师</span>
                <span>：</span>
              </div>
              <span class="col">{{ data.PrescriptionPharmacistName }}</span>
            </el-form-item>
          </div>

          <div class="q-mb-xs row q-col-gutter-md">
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">调配药师</span>
                <span>：</span>
              </div>
              <span class="col">
                <!-- 暂未对接 -->
              </span>
            </el-form-item>
            <el-form-item class="col">
              <div slot="label">
                <span class="inline-block">核对发药</span>
                <span>：</span>
              </div>
              <span class="col">
                <!-- 暂未对接 -->
              </span>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="q-mb-md" style="border-bottom: 1px solid #F3F3F3;"></div>

      <!-- 药师审核信息 -->
      <div class="q-mb-md">
        <el-form class="row q-col-gutter-x-md" label-width="auto" space-view>
          <el-form-item class="col-6" label="药师审方结果：">
            <span>{{ data.PrescriptionExamMemo }}</span>
          </el-form-item>
          <el-form-item class="col-6" label="系统审方结果：">
            <!-- 暂无对接 -->
          </el-form-item>
          <el-form-item class="col-6" label="药师质疑原因：" v-if="data.queryReason">
            <span>{{ data.queryReason }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 前置审方详情 -->
    <PeaceDialog title="智能审方结果" v-bind:visible.sync="visible" absolute-center append-to-body>
      <RecipeAudit v-bind:data="audit"></RecipeAudit>
    </PeaceDialog>

    <PeaceDialog title="原始处方" v-bind:visible.sync="originVisible" append-to-body>
      <img v-if="data.pngUrl" v-bind:src="data.pngUrl" class="full-width" />
    </PeaceDialog>
  </div>
</template>

<script>
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
      if (this.data && Peace.validate.isEmpty(this.data.pngUrl)) {
        Peace.util.error({ msg: 'PDF地址不存在' })
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
