// 处方详情

<template>
  <div>
    <div class="q-mb-md">
      <img-viewer ref="viewer" />

      <div class="q-px-14 text-grey-6 row items-center justify-between">
        <span>No.{{ data.PrescriptionNo }}</span>

        <el-button v-if="data.pngUrl"
                   type="text"
                   v-on:click="showOriginInfo">查看原始处方</el-button>
      </div>

      <div class="q-px-20">
        <!-- 处方标题 -->
        <div class="relative-position text-center">
          <p class="text-h5 q-mb-none text-weight-bolder">{{ data.MedicalInstitutionName }}</p>
          <p class="text-h5 q-mb-md text-weight-bolder">处方笺</p>
          <!-- 处方状态图片 -->
          <img v-if="data.stampUrl"
               v-bind:src="data.stampUrl"
               class="absolute"
               style="width: 72px; height: 72px; right: 36px; bottom: -70px;" />
        </div>

        <div class="q-mt-sm q-mb-xl dashed-line"></div>

        <!-- 处方基础信息 -->
        <div class="q-mb-md">
          <el-form space-view>
            <div class="row q-col-gutter-x-md">
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

            <div class="row q-col-gutter-x-md">
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

            <div v-if="data.weight"
                 class="row q-col-gutter-x-md">
              <el-form-item class="col">
                <div slot="label">
                  <span class="inline-block">体重</span>
                  <span>：</span>
                </div>
                <span class="col">{{ data.weight + 'kg' }}</span>
              </el-form-item>
            </div>

            <div class="row q-col-gutter-x-md">
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

            <div class="row q-col-gutter-md">
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
            <div class="flex items-baseline cursor-pointer"
                 v-if="canShowAudit"
                 v-on:click="showAudit"
                 v-bind:class="getThemeClass()">
              <span class="text-subtitle1 text-weight-bold q-mr-sm">{{ data.prescriptionAuditResult.actionMsg }}</span>
              <i class="text-subtitle2 el-icon-question"
                 style="line-height: none;"></i>
            </div>
          </div>

          <div class="dashed-line"></div>

          <!-- 药品 -->
          <div class="q-mb-xl">
            <template v-for="(drug, index) in data.DrugList">
              <div v-bind:key="drug.drugCode"
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
                  <span>{{ `${drug.drugRoute}，` }}</span>
                  <span>每次</span>
                  <span>{{ `${drug.OnceDose}${drug.OnceUnit}，` }}</span>
                  <span>{{ `${drug.medicationFrequency}，` }}</span>
                  <span>{{ `${drug.medication_days}天。` }}</span>
                </div>
              </div>

              <div v-if="index === data.DrugList.length - 1"
                   v-bind:key="drug.drugName"
                   class="oblique-line"></div>
              <div v-else
                   v-bind:key="drug.drugName"
                   class="dashed-line"></div>
            </template>
          </div>
        </div>

        <!-- 处方审核信息 -->
        <div class="q-mb-md">
          <el-form space-view>
            <div class="row q-col-gutter-x-md">
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

            <div class="row q-col-gutter-md">
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

        <div class="q-mb-md"
             style="border-bottom: 1px solid #F3F3F3;"></div>

        <!-- 药师审核信息 -->
        <div>
          <el-form class="row q-col-gutter-x-md"
                   label-width="auto"
                   space-view>
            <el-form-item class="col-12"
                          label="药师审方结果：">
              <span>{{ data.PrescriptionExamMemo }}</span>
            </el-form-item>
            <el-form-item class="col-12"
                          label="系统审方结果：">
              <!-- 暂无对接 -->
            </el-form-item>
            <el-form-item class="col-12"
                          label="药师质疑原因："
                          v-if="data.queryReason">
              <span>{{ data.queryReason }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <!-- 【质疑中】：可进行【不接受，再次署名】 -->
      <el-button v-if="['2'].includes(data.Prescription)"
                 v-on:click="reject"
                 v-bind:disabled="loading">不接受，再次署名</el-button>
      <!-- 【质疑中】、【待审核】、【已通过】且【未划价】：可进行【作废，重新开处方】 -->
      <el-button type="primary"
                 v-if="['1', '2', '5'].includes(data.Prescription) && data.voidPrescriptionTag === 1"
                 v-on:click="accept"
                 v-bind:disabled="loading">作废，重新开处方</el-button>
    </div>

    <!-- 坚持开处方 -->
    <PeaceDialog absolute-center
                 append-to-body
                 width="400px"
                 height="300px"
                 title="再次提交"
                 v-if="confirmVisible"
                 v-bind:show-close="false"
                 v-bind:visible="confirmVisible">
      <div class="el-dialog__body">
        <div class="text-center q-px-xl">
          <div class="text-center q-mb-md">确认坚持开具该处方？</div>
          <el-form ref="form"
                   space-none
                   label-width="auto"
                   v-bind:model="model"
                   v-bind:rules="rules"
                   style="height: 40px;">
            <el-form-item label="原因："
                          prop="refuseReason">
              <el-input v-model="model.refuseReason"
                        maxlength="120"
                        placeholder="请输入..."></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="el-dialog__footer">
        <el-button plain
                   v-on:click="rejectCancel">取消</el-button>
        <el-button type="primary"
                   v-bind:disabled="loading"
                   v-on:click="rejectConfirm">
          确定
        </el-button>
      </div>
    </PeaceDialog>

    <!-- 前置审方详情 -->
    <PeaceDialog absolute-center
                 append-to-body
                 title="智能审方结果"
                 v-if="auditVisible"
                 v-bind:visible.sync="auditVisible">
      <RecipeAudit v-bind:data="audit"></RecipeAudit>
    </PeaceDialog>

    <PeaceDialog append-to-body
                 title="原始处方"
                 v-if="originVisible"
                 v-bind:visible.sync="originVisible">
      <img v-if="data.pngUrl"
           v-bind:src="data.pngUrl"
           class="full-width" />
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'

import RecipeAudit from '@src/views/components/prescription-record/src/components/prescription-audit'

import ImgViewer from './components/ImageViewer'

const adiutThemeMap = {
  /** 通过 */
  ['OK']: 'primary',
  /** 提示 */
  ['I']: 'info',
  /** 慎用 */
  ['R']: 'warning',
  /** 禁用 */
  ['D']: 'negative',
  /** 失败 */
  ['FAIL']: 'negative',
  /** 服务调用失败 */
  ['SERVER_ERR']: 'negative'
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
      auditVisible: false,
      originVisible: false,
      confirmVisible: false,

      model: {
        prescriptionId: '',
        refuseReason: ''
      },

      rules: {
        refuseReason: [{ required: true, message: '请输入原因' }]
      },

      source: {
        prescriptionStatus: []
      },

      loading: false
    }
  },

  computed: {
    /** 前置审方审核数据 */
    audit() {
      return this.data?.prescriptionAuditResult
    },

    /** 是否显示前置审方按钮 */
    canShowAudit() {
      const showAduitMap = ['I', 'R', 'D', 'FAIL', 'SERVER_ERR']
      return showAduitMap.includes(this.audit?.actionCode)
    }
  },

  watch: {
    data: {
      handler() {
        this.model.prescriptionId = this.data.prescriptionId
      },
      immediate: true
    }
  },

  async created() {
    this.source.prescriptionStatus = await Peace.identity.dictionary.getList('prescription_state')
  },

  methods: {
    close() {
      this.auditVisible = false
      this.originVisible = false
      this.confirmVisible = false
    },

    getThemeClass(code = this.audit?.actionCode) {
      const theme = adiutThemeMap[code]

      return {
        [`text-${theme}`]: true
      }
    },

    showAudit() {
      this.auditVisible = true
    },

    showOriginInfo() {
      if (this.data && Peace.validate.isEmpty(this.data.pngUrl)) {
        Peace.util.error({ msg: 'PDF地址不存在' })
      }
      // this.originVisible = true
      this.$refs.viewer.show([{ thumbnail: this.data.pngUrl, source: this.data.pngUrl }])
    },

    /**
     * 不接受，再次署名
     */
    reject() {
      this.confirmVisible = true
      this.model.refuseReason = ''
    },

    /**
     * 不接受，再次署名 => 取消
     */
    rejectCancel() {
      this.confirmVisible = false
      this.model.refuseReason = ''
    },

    /**
     * 不接受，再次署名 => 双签
     */
    rejectConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true

          Service.usePrescription(this.model)
            .then((res) => {
              Peace.util.success(res.msg)

              this.close()
              this.$emit('reject')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    /**
     * 作废，重新开处方
     */
    accept() {
      this.$confirm('重新开具处方后原处方将自动作废，确定是否重新开具？', '重新开方', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 1，作废处方
        // 2，跳转开处方页面

        this.loading = true

        this.voidPrescription()
          .then((res) => {
            if (res.data.voidStatus == 2) {
              this.$alert('当前处方患者已划价/缴费，无法作废，若需作废，请联系患者退费后重开处方', '提示')
            } else {
              Peace.util.success(res.msg)

              // 【待审核】、【已通过】 -> 确认作废 -> 关闭弹框，通知父级组件
              // 【质疑中】 -> 确认作废 -> 跳转处方来源页
              this.close()
              this.$emit('accept')

              if (this.data.Prescription === '2') {
                this.redirectToOriginal()
              }
            }
          })
          .finally(() => {
            this.loading = false
          })
      })
    },

    voidPrescription() {
      this.model.prescriptionId = this?.data?.prescriptionId

      return Service.voidPrescription(this.model)
    },

    redirectToOriginal() {
      // 获取处方来源，根据处方来源跳转
      Service.getBackInfo(this.model).then((res) => {
        if (res.data.backInfo.prescriptionSource === 0) {
          // 复诊处方被质疑，跳转复诊，根据 patientId 选中患者
          this.$router.push({ name: 'ClinicReturnVisit', params: { patientId: res.data.backInfo.familyId } })
        } else if (res.data.backInfo.prescriptionSource === 1) {
          // 面诊处方被质疑，跳转面诊，根据 patientNo 选中患者
          this.$router.push({ name: 'ClinicfaceToFace', params: { patientNo: res.data.backInfo.patientNo } })
        }
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
