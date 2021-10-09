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
            <el-form-item required=""
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
                    v-model="model.drugList"
                    v-bind:isBuilding="isBuilding"
                    v-bind:prescriptionTag.sync="model.prescriptionTag"
                    v-bind:max-count="5"></DrugSelect>
      </div>

      <div class="q-mb-sm text-center">
        <el-button v-on:click="close">取消</el-button>
        <el-button v-on:click="send"
                   v-bind:disabled="sending"
                   type="primary">发送</el-button>
      </div>
    </div>

    <!-- 系统审方结果 -->
    <PeaceDialog absolute-center
                 title="系统审方结果"
                 v-bind:visible.sync="auditDialog.visible"
                 v-loading="sending"
                 element-loading-text="拼命加载中"
                 v-if="auditDialog.visible"
                 element-loading-background="rgba(0, 0, 0, 0.4)">
      <RecipeAudit v-bind:data="auditDialog.data"></RecipeAudit>

      <div slot="footer"
           class="flex justify-center">
        <el-button v-on:click="sendConfirm">继续发送</el-button>
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
import RecipeAudit from '@src/views/components/prescription-record/src/components/prescription-audit'
import DrugSelect from '@src/views/components/drug/DrugSelect'
import { QuickSelectAllergyHistory, QuickSelectDiagnose } from '@src/views/components/quick-select/index'

export default {
  components: {
    QuickSelectDiagnose,
    QuickSelectAllergyHistory,

    RecipeAudit,
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
      // 是否建档
      isBuilding: undefined,

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

      sending: false
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
      return this.inquiryNo && this.session?.content?.inquiryInfo?.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
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
    // 验证是否建档
    // 北辰医院非建档用户，无法开具院内处方
    await this.checkIsBuilding()

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
        drugList: this.model.drugList
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
      }
    },

    // 北辰医院流程
    // 检查是否建档
    checkIsBuilding() {
      const config = Peace.cache.sessionStorage.get('config')
      const params = {
        familyId: this.session.content.patientInfo.familyId
      }

      if (config.hospitalTag !== 'beichen') {
        return Promise.resolve()
      } else {
        return Service.checkIsBuilding(params).then((res) => {
          if (res.data.status === 2) {
            // 未建档，默认选择外延处方
            this.isBuilding = false
            this.model.prescriptionTag = 2
          }
        })
      }
    },

    /**
     * 检验处方
     */
    valid() {
      if (this.inquiryNo && this.model.diagnoseList.length === 0) {
        Peace.util.warning('请选择初步诊断')

        return false
      }

      if (this.model.drugList.length === 0) {
        Peace.util.warning('请添加处方药品')

        return false
      }

      const validObject = this.$refs.drugSelect.validDrugList()
      if (validObject.isValid === false) {
        Peace.util.warning(validObject.message)

        return false
      }

      if (this.model.drugList.some((drug) => drug.drugStatus === 'disable')) {
        Peace.util.confirm('处方内含有停用药品，是否删除该药品', '提示', { type: 'error' }, () => {
          this.model.drugList = this.model.drugList.filter((drug) => drug.drugStatus === 'enable')
        })

        return false
      }

      return true
    },

    /**
     * 发送处方
     */
    send() {
      if (this.valid()) {
        // 发处方
        const sendRecipe = () => {
          this.sending = true

          const params = Peace.util.deepClone(this.model)
          params.openId = this.docInfo.openid
          params.inquiryNo = this.inquiryNo

          Service.onlineSubmit(params)
            .then((res) => {
              // 缺货提醒
              if (res.data.stockWarnStatus === 1) {
                const config = Peace.cache.sessionStorage.get('config')
                const operatorContact = config?.operatorContact

                this.stockDialog.visible = true
                this.stockDialog.data = res.data.noticeList
                this.stockDialog.operatorContact = operatorContact
              }
              // 前置审方
              else if (res.data.isAdopt === false) {
                //前置审方如果状态是失败也继续发送
                if ('FAIL' === res.data.result?.actionCode || 'SERVER_ERR' === res.data.result?.actionCode) {
                  this.auditDialog.data = res.data.result
                  this.auditDialog.prescriptionNo = res.data.result.prescriptionNo
                  this.sendConfirm()
                } else {
                  this.auditDialog.visible = true
                  this.auditDialog.data = res.data.result
                  this.auditDialog.prescriptionNo = res.data.result.prescriptionNo
                }
              }
              // 系统验证成功，发送处方成功
              else {
                Peace.util.success(res.msg)
                this.removeCache = true

                this.$emit('close')
              }
            })
            .finally(() => {
              this.sending = false
            })
        }

        // 发送前提示
        // 1，未满 14 岁，未填写身高体重，提示
        // 2，满足，固定提示
        const date1 = Peace.dayjs()
        const date2 = Peace.dayjs(this.caseInfo.birthday)

        if (
          date1.diff(date2, 'year') < 14 &&
          (Peace.validate.isEmpty(this.model.weight) || Peace.validate.isEmpty(this.model.height))
        ) {
          return Peace.util.confirm(
            '当前患者未满14周岁，处方未填写身高体重信息，如不填写将会影响审方结果。是否直接发送处方？',
            '提示',
            {
              cancelButtonText: '填写信息',
              confirmButtonText: '继续发送'
            },
            () => {
              sendRecipe()
            },
            () => {
              if (Peace.validate.isEmpty(this.model.weight)) {
                this.$refs.weightInput.focus()
              } else if (Peace.validate.isEmpty(this.model.height)) {
                this.$refs.heightInput.focus()
              }
            }
          )
        }

        Peace.util.confirm(
          '确认发送处方给患者？',
          '提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '发送'
          },
          () => {
            sendRecipe()
          }
        )
      }
    },

    /**
     * 前置审方失败，医生手动确认继续发送处方
     */
    sendConfirm() {
      this.sending = true

      const params = {
        openId: this.docInfo?.openid,
        businessNo: this.inquiryNo || this.consultNo,
        prescriptionNo: this.auditDialog.prescriptionNo
      }

      if (this.consultNo) {
        params.sourceAction = 'offline'
      }

      Service.confirmSend(params)
        .then((res) => {
          Peace.util.success(res.msg)
          this.removeCache = true

          this.$emit('close')
        })
        .finally(() => {
          this.sending = false
        })
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