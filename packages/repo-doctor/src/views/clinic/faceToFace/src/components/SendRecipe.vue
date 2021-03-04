<template>
  <div>
    <div class="patient-title-style">{{ patientInfo.name }}</div>

    <div class="q-px-md q-mt-sm">
      <div class="q-mb-md text-center">
        <p class="text-subtitle1">{{ baseInfo.doctorInfo.hospitalName }}</p>
        <p class="text-h5">普通处方笺</p>
      </div>

      <el-form v-bind:model="{}"
               space-sm
               label-width="auto">
        <div class="row">
          <div class="col">
            <el-form-item label="姓名：">
              <span>{{ baseInfo.patientInfo.patientName }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="性别：">
              <span>{{ baseInfo.patientInfo.sex }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="年龄：">
              <span>{{ baseInfo.patientInfo.age }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="科别：">
              <span>{{ baseInfo.doctorInfo.deptName }}</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="体重：">
              <div class="flex">
                <el-input-number style="width: 100px;"
                                 controls-position="right"
                                 v-bind:min="0"
                                 v-bind:max="200"
                                 v-model="model.weight"
                                 v-bind:precision="1">
                </el-input-number>
                <div class="flex items-center q-px-sm"
                     style="border-radius: 5px">
                  kg
                </div>
              </div>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <el-form-item required=""
                        v-bind:show-message="false"
                        label="诊断：">
            <QuickSelectDiagnose style="width: 400px"
                                 v-model="model.diagnoseList"></QuickSelectDiagnose>
          </el-form-item>
        </div>

        <div class="row">
          <el-form-item required=""
                        v-bind:show-message="false"
                        label="过敏史：">
            <QuickSelectAllergyHistory allow-create
                                       style="width: 400px"
                                       v-model="model.allergyHistoryList"></QuickSelectAllergyHistory>
          </el-form-item>
        </div>

        <div class="row">
          <div class="col">
            <el-form-item required=""
                          v-bind:show-message="false"
                          label="主诉：">
              <div class="flex">
                <el-input class="col"
                          type="textarea"
                          show-word-limit
                          placeholder="请输入内容"
                          v-bind:maxlength="500"
                          v-bind:autosize="{ minRows: 2, maxRows: 4}"
                          v-model="model.baseIllness">
                </el-input>
              </div>
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
                    v-model="model.drugList"
                    v-bind:type="`faceToFace`"
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
                 element-loading-background="rgba(0, 0, 0, 0.4)">
      <RecipeAudit v-bind:data="auditDialog.data"></RecipeAudit>

      <div class="q-my-md flex justify-center">
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
import { mutations, store } from './../store'
import Service from './../service/index'

import RecipeAudit from '@src/views/components/recipe/RecipeAudit'
import DrugSelect from '@src/views/components/drug/DrugSelect'
import QuickSelectAllergyHistory from '@src/views/components/quick-select/src/components/QuickSelectAllergyHistory'
import QuickSelectDiagnose from '@src/views/components/quick-select/src/components/QuickSelectDiagnose'

export default {
  components: {
    QuickSelectAllergyHistory,
    QuickSelectDiagnose,
    RecipeAudit,
    DrugSelect
  },

  data() {
    return {
      // 处方基础信息
      baseInfo: {
        doctorInfo: {},
        patientInfo: {}
      },

      model: {
        // 体重
        weight: undefined,
        // 诊断
        diagnoseList: [],
        // 过敏史
        allergyHistoryList: [{ code: 'empty', name: '无' }],
        // 主诉
        baseIllness: '',
        // 处方类型：院内、外延（面诊开放，只能选择外延）
        prescriptionTag: 2,
        // 处方药品
        drugList: []
      },

      // 前置审方
      auditDialog: {
        visible: false,
        data: {}
      },

      // 库存提示
      stockDialog: {
        visible: false,
        operatorContact: '',
        data: []
      },

      sending: false
    }
  },

  computed: {
    docInfo() {
      return Peace.$store.state.user?.userInfo?.list?.docInfo
    },

    patientInfo() {
      return store.activePatient
    }
  },

  created() {
    this.getPatientDetailInfo()
  },

  methods: {
    // 获取患者信息
    getPatientDetailInfo() {
      const params = {
        patientNo: this.patientInfo.patientNo,
        patientId: this.patientInfo.patientId,
        familyId: this.patientInfo.familyId
      }

      Service.getBaseInfo(params).then((res) => {
        this.baseInfo = res.data

        const date1 = Peace.dayjs()
        const date2 = Peace.dayjs(res.data.patientInfo.birthday)

        if (date1.diff(date2, 'year') < 6) {
          this.$alert('当前患者为 6 岁以下儿童，请先确认患儿有监护人和相关专业医师陪伴，否则请勿开具处方', '提示', {
            confirmButtonText: '确认'
          })
        }
      })
    },

    /**
     * 检验处方
     */
    valid() {
      if (this.model.diagnoseList.length === 0) {
        Peace.util.warning('请选择诊断')

        return false
      }

      if (this.model.allergyHistoryList.length === 0) {
        Peace.util.warning('请选择过敏史')

        return false
      }

      if (Peace.validate.isEmpty(this.model.baseIllness)) {
        Peace.util.warning('请输入主诉')

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
        Peace.util.confirm('确认发送处方给患者？', '提示', {}, () => {
          this.sending = true

          const params = Peace.util.deepClone(this.model)
          params.openId = this.docInfo.openid
          params.patientNo = this.baseInfo.patientInfo.patientNo
          params.patientId = this.baseInfo.patientInfo.patientId
          params.familyId = this.baseInfo.patientInfo.familyId

          Service.sendRecipe(params)
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
                this.auditDialog.visible = true
                this.auditDialog.data = res.data.result
                this.auditDialog.prescriptionNo = res.data.result.prescriptionNo
              }
              // 系统验证成功，发送处方成功
              else {
                Peace.util.success(res.msg)
                Peace.cache.sessionStorage.remove(store.activePatient.patientId)

                mutations.setShowWriteRecipe(false)
              }
            })
            .finally(() => {
              this.sending = false
            })
        })
      }
    },

    /**
     * 系统审方提醒
     * 确认发送处方
     */
    sendConfirm() {
      this.sending = true

      const params = {
        openId: this.docInfo.openid,
        businessNo: this.inquiryNo,
        prescriptionNo: this.auditDialog.prescriptionNo
      }

      Service.confirmSend(params)
        .then((res) => {
          Peace.cache.sessionStorage.remove(store.activePatient.patientId)
          Peace.util.success(res.msg)
          mutations.setShowWriteRecipe(false)
        })
        .finally(() => {
          this.sending = false
        })
    },

    close() {
      mutations.setShowWriteRecipe(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-title-style {
  padding: 12px;
  background-color: #f9f9f9;
  font-size: 18px;
  margin: 0px;
}

.require-style {
  &::before {
    content: '*';
    color: red;
    margin: 0 4px 0 0;
  }
}

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
  left: 50%;
  padding: 30px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>