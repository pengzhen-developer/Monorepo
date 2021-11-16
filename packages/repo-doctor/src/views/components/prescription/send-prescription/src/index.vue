<template>
  <div>
    <div class="q-px-md q-mt-sm">
      <div class="q-mb-md text-center">
        <p class="text-subtitle1">{{ docInfo.netHospital_name }}</p>
        <p class="text-h5">普通处方笺</p>
      </div>

      <el-form v-bind:model="{}"
               space-sm
               label-width="auto">
        <div class="row">
          <div class="col">
            <el-form-item label="姓名：">
              <span>{{ caseInfo.patient_name }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="性别：">
              <span>{{ caseInfo.sex }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="年龄：">
              <span>{{ caseInfo.age }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="科别：">
              <span>{{ caseInfo.netdept_child }}</span>
            </el-form-item>
          </div>
          <div v-if="showPayType"
               class="col">
            <el-form-item label="费用：">
              <span>{{ payTypeText }}</span>
            </el-form-item>
          </div>

        </div>

        <div class="row">
          <div class="col-6">
            <el-form-item label="体重：">
              <div class="flex">
                <el-input-number ref="weightInput"
                                 style="width: 100px;"
                                 controls-position="right"
                                 v-bind:min="0.1"
                                 v-bind:max="200"
                                 v-model="model.weight"
                                 v-bind:precision="2">
                </el-input-number>
                <div class="flex items-center q-px-sm"
                     style="border-radius: 5px">
                  kg
                </div>
              </div>
            </el-form-item>
          </div>

          <div class="col-6">
            <el-form-item label="身高：">
              <div class="flex">
                <el-input-number ref="heightInput"
                                 style="width: 100px;"
                                 controls-position="right"
                                 v-bind:min="0.1"
                                 v-bind:max="999"
                                 v-model="model.height"
                                 v-bind:precision="1">
                </el-input-number>
                <div class="flex items-center q-px-sm"
                     style="border-radius: 5px">
                  cm
                </div>
              </div>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <el-form-item required
                          v-bind:show-message="false"
                          label="初步诊断：">
              <QuickSelectDiagnose style="width: 400px;"
                                   v-model="model.diagnoseList"></QuickSelectDiagnose>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <el-form-item label="过敏史：">
              <QuickSelectAllergyHistory class="full-width"
                                         v-model="model.allergyHistoryList"></QuickSelectAllergyHistory>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <el-divider style="margin: 8px 0;"></el-divider>

      <div class="q-mb-sm">
        <span class="text-subtitle1 text-weight-bold">处方药品</span>
        <span class="text-body2 text-grey-5"></span>
      </div>

      <div class="q-mb-sm">
        <DrugSelect ref="drugSelect"
                    v-bind:scene="`returnVisit`"
                    v-bind:patientNo="patientInfo.patientNo"
                    v-bind:inquiryNo="inquiryNo"
                    v-bind:familyId="patientInfo.familyId"
                    v-model="model.drugList"
                    v-bind:prescriptionTag.sync="model.prescriptionTag"
                    v-bind:max-count="5"></DrugSelect>
      </div>

      <div class="q-mb-sm text-center">
        <el-button v-on:click="close">取消</el-button>
        <el-button v-on:click="handleSend"
                   v-bind:loading="loading"
                   type="primary">发送</el-button>
      </div>
    </div>

    <!-- 系统审方结果 -->
    <PeaceDialog absolute-center
                 title="系统审方结果"
                 v-bind:visible.sync="auditDialog.visible"
                 v-loading="loading"
                 element-loading-text="拼命加载中"
                 v-if="auditDialog.visible"
                 element-loading-background="rgba(0, 0, 0, 0.4)">
      <PeacePrescriptionAuditResult v-bind:data="auditDialog.data"></PeacePrescriptionAuditResult>

      <div slot="footer"
           class="flex justify-center">
        <el-button v-on:click="confirmSend">继续发送</el-button>
        <el-button type="primary"
                   v-on:click="auditDialog.visible = false">返回修改</el-button>
      </div>
    </PeaceDialog>

    <!-- 库存提示 -->
    <PeaceDialog absolute-center
                 width="500px"
                 title="库存提示"
                 v-bind:visible.sync="stockDialog.visible">
      <div class="q-pa-md">
        <div class="q-mb-md">
          <p v-for="(item, index) in stockDialog.data"
             v-bind:key="index">
            {{ item }}
          </p>
          <p>以上药品不可开具处方！请修改~</p>
        </div>

        <div class="q-mb-lg">
          <span>缺货药品已登记，联系电话：</span>
          <span class="text-primary">{{ stockDialog.operatorContact }}</span>
        </div>

        <div class="text-center">
          <el-button type="primary"
                     v-on:click="stockDialog.visible = false">知道了</el-button>
        </div>
      </div>
    </PeaceDialog>

  </div>
</template>


<script>
import Service from './service'
import Type from '@src/type'
import DrugSelect from '@src/views/components/drug/select-drug/src/index.vue'
import QuickSelectAllergyHistory from '@src/views/components/quick-select/quick-select-allergy-history/src/index.vue'
import QuickSelectDiagnose from '@src/views/components/quick-select/quick-select-diagnose/src/index.vue'
import { PeacePrescriptionAuditResult } from 'peace-components'

export default {
  components: {
    PeacePrescriptionAuditResult,
    QuickSelectDiagnose,
    QuickSelectAllergyHistory,
    DrugSelect
  },

  props: {
    // 会话对象
    session: Object,

    // 缓存键，处理【问诊】、【复诊】、【面诊】、【会诊】等场景下的处方缓存
    cacheKey: String
  },

  data() {
    return {
      // 病历详情
      caseInfo: {},

      model: {
        // 体重
        weight: undefined,
        // 身高
        height: undefined,
        // 诊断
        diagnoseList: [],
        // 过敏史
        allergyHistoryList: [{ code: 'empty', name: '无' }],
        // 处方类型：院内、外延
        prescriptionTag: undefined,
        // 处方药品
        drugList: []
      },

      // 库存提示
      stockDialog: {
        visible: false,
        operatorContact: '',
        data: []
      },

      // 前置审方
      auditDialog: {
        visible: false,
        data: {}
      },

      loading: false
    }
  },

  computed: {
    docInfo() {
      return Peace.$store.state.user?.userInfo?.list?.docInfo
    },

    patientInfo() {
      return this.session?.content?.patientInfo
    },

    inquiryInfo() {
      return this.session?.content?.inquiryInfo
    },

    inquiryNo() {
      return this.session?.content?.inquiryInfo?.inquiryNo
    },

    showPayType() {
      return this.inquiryNo && this.session?.content?.inquiryInfo?.paymentType !== Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      if (this.inquiryInfo.paymentType === 1) {
        return '自费'
      }
      if (this.inquiryInfo.paymentType === 2) {
        return '普通医保'
      }
      if (this.inquiryInfo.paymentType === 3) {
        return '商保'
      }
      if (this.inquiryInfo.paymentType === 4) {
        return `门特-${this.inquiryInfo.medicalDiseases}`
      }

      return ''
    }
  },

  async created() {

    // 带入病历信息
    await this.getCase()

    // 带入缓存信息
    if (this.cacheKey && Peace.cache.sessionStorage.get(this.cacheKey)) {
      this.resetDataFromCache()
    }
  },

  destroyed() {
    if (this.removeCache) {
      this.cacheKey && Peace.cache.sessionStorage.remove(this.cacheKey)
    } else {
      const recipeCache = {
        weight: this.model.weight,
        height: this.model.height,
        diagnoseList: this.model.diagnoseList,
        allergyHistoryList: this.model.allergyHistoryList,
        drugList: this.model.drugList,
        prescriptionTag: this.model.prescriptionTag
      }

      this.cacheKey && Peace.cache.sessionStorage.set(this.cacheKey, recipeCache)
    }
  },

  methods: {
    /**
     * 获取病历，展示患者基本信息
     *
     */
    getCase() {
      const params = {
        inquiry_no: this.inquiryNo
      }

      return Service.getCase(params).then((res) => {
        const date1 = Peace.dayjs()
        const date2 = Peace.dayjs(res.data.birthday)

        if (date1.diff(date2, 'year') < 6) {
          this.$alert('当前患者为 6 岁以下儿童，请先确认患儿有监护人和相关专业医师陪伴，否则请勿开具处方', '提示', {
            confirmButtonText: '确认'
          })
        }

        this.model.allergyHistoryList = res.data.allergyHistoryList
        this.model.diagnoseList = res.data.diagnoseList
        this.caseInfo = res.data
      })
    },

    resetDataFromCache() {
      const recipeCache = this.cacheKey && Peace.cache.sessionStorage.get(this.cacheKey)

      if (recipeCache) {
        this.model.weight = recipeCache.weight
        this.model.height = recipeCache.height
        this.model.drugList = recipeCache.drugList

        this.model.allergyHistoryList = recipeCache.allergyHistoryList
        this.model.diagnoseList = recipeCache.diagnoseList
        this.model.prescriptionTag = recipeCache.prescriptionTag
      }
    },

    async handleSend() {
      // 校验必填
      await this.validRequired()
      // 校验停用药品
      await this.validDiscontinued()
      // 校验 14 岁，身高、体重
      await this.validAge()
      // 预发送提醒
      await this.preSendPrompt()
      // 发送前检验 => 检验通过则发送，检验失败则需要区分类型并提醒后续操作
      await this.preSend()
    },

    validRequired() {
      return new Promise((resovle, reject) => {
        const validDrugRes = this.$refs.drugSelect.validDrugList()

        if (this.model.diagnoseList.length === 0) {
          Peace.util.warning('请选择初步诊断')

          return reject('请选择初步诊断')
        }

        if (this.model.drugList.length === 0) {
          Peace.util.warning('请添加处方药品')

          return reject('请添加处方药品')
        }

        if (validDrugRes.isValid === false) {
          Peace.util.warning(validDrugRes.message)

          return reject(validDrugRes.message)
        }

        return resovle()
      })
    },

    validDiscontinued() {
      return new Promise((resovle, reject) => {
        const discontinuedDrugList = this.model.drugList.filter((drug) => drug.drugStatus === 'disable')
        const continuedDrugList = this.model.drugList.filter((drug) => drug.drugStatus === 'enable')

        if (discontinuedDrugList.length > 0) {
          this.$confirm('处方内含有停用药品，是否删除该药品', '提示', { type: 'error' }).then(() => {
            this.model.drugList = continuedDrugList
          })

          return reject('检测到停用药品')
        } else {
          return resovle()
        }
      })
    },

    validAge() {
      // 未满 14 岁，未填写身高体重，需要提示
      const date1 = Peace.dayjs()
      const date2 = Peace.dayjs(this.caseInfo.birthday)

      return new Promise((resovle, reject) => {
        if (date1.diff(date2, 'year') < 14 && (Peace.validate.isEmpty(this.model.weight) || Peace.validate.isEmpty(this.model.height))) {
          this.$confirm('当前患者未满14周岁，处方未填写身高体重信息，如不填写将会影响审方结果。是否直接发送处方？', '提示', {
            confirmButtonText: '继续发送',
            cancelButtonText: '填写信息'
          })
            .then(resovle)
            .catch(() => {
              if (Peace.validate.isEmpty(this.model.weight)) {
                this.$refs.weightInput.focus()
              } else if (Peace.validate.isEmpty(this.model.height)) {
                this.$refs.heightInput.focus()
              }

              return reject('当前患者未满14周岁，处方未填写身高体重信息，如不填写将会影响审方结果 - 填写信息')
            })
        } else {
          return resovle()
        }
      })
    },

    preSendPrompt() {
      return this.$confirm('确认发送处方给患者？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '发送'
      })
    },

    preSend() {
      this.loading = true

      const params = Peace.util.deepClone(this.model)
      params.openId = this.docInfo.openid
      params.inquiryNo = this.inquiryNo

      return Service.onlineSubmit(params)
        .then(async (res) => {
          // 缺货提醒
          if (res.data.stockWarnStatus === 1) {
            this.showStock(res)

            return Promise.reject('缺货提醒')
          }

          // 审方提醒
          // 特殊需求：FAIL / SERVER_ERR需要当作成功，因为此问题医生无法解决，造成困扰
          // 当审方失败，且审方结果不为 FAIL / SERVER_ERR
          else if (res.data.isAdopt === false && res.data.result?.actionCode !== 'FAIL' && res.data.result?.actionCode !== 'SERVER_ERR') {
            this.showAudit(res)

            return Promise.reject('审方提醒，且审方结果不为 FAIL / SERVER_ERR')
          }

          // 当审方失败，且审方结果为 FAIL / SERVER_ERR
          else if (res.data.isAdopt === false && (res.data.result?.actionCode === 'FAIL' || res.data.result?.actionCode === 'SERVER_ERR')) {
            // 模拟弹出，填充必要数据
            this.showAudit(res)
            this.closeAudit()
            await this.confirmSend()

            return Promise.reject('审方失败，且审方结果为 FAIL / SERVER_ERR，静默确认发送')
          }

          return res
        })
        .then((res) => {
          Peace.util.success(res.msg)
          this.removeCache = true

          this.$emit('close')
        })
        .finally(() => {
          this.loading = false
        })
    },

    confirmSend() {
      this.loading = true

      const params = {
        openId: this.docInfo?.openid,
        businessNo: this.inquiryNo,
        prescriptionNo: this.auditDialog.prescriptionNo
      }

      return Service.confirmSend(params)
        .then((res) => {
          Peace.util.success(res.msg)
          this.removeCache = true

          this.$emit('close')
        })
        .finally(() => {
          this.loading = false
        })
    },

    showStock(res) {
      const config = Peace.cache.sessionStorage.get('config')
      const operatorContact = config?.operatorContact

      this.stockDialog.visible = true
      this.stockDialog.data = res.data.noticeList
      this.stockDialog.operatorContact = operatorContact
    },

    showAudit(res) {
      this.auditDialog.visible = true
      this.auditDialog.data = res.data.result
      this.auditDialog.prescriptionNo = res.data.result.prescriptionNo
    },

    closeAudit() {
      this.auditDialog.visible = false
    },

    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.message-short-stock {
  .el-message-box__header {
    background: #e9edf1;
    padding-top: 14px;

    .el-message-box__title {
      justify-content: flex-start;
    }
  }

  .el-message-box__content {
    padding: 24px 16px;
  }

  .el-message-box__btns {
    .el-button {
      min-width: 80px;
    }
  }
}
</style>

<style lang="scss" scoped>
.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.el-divider--horizontal {
  margin: 12px 0;
}

.tag-style {
  margin: 4px 8px 4px 0;
  min-width: 62px;
  text-align: center;
  border: none;
  border-radius: 2px;
  height: 24px;
  line-height: 24px;
}

::v-deep .el-loading-spinner {
  width: 160px;
  left: 42%;
  padding: 30px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
