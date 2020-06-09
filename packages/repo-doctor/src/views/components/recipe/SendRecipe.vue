// 发处方

<template>
  <div>
    <el-alert type="success"
              v-bind:closable="false">
      <div slot="title">
        <span>开处方</span>
        <i v-on:click="close"
           class="el-alert__closebtn el-icon-error"></i>
      </div>
    </el-alert>

    <div class="q-px-md q-mt-md">
      <div class="q-mb-md text-center">
        <p class="text-subtitle1">{{ docInfo.netHospital_name }}</p>
        <p class="text-h5">普通处方笺</p>
      </div>

      <div class="row q-mb-md">
        <div class="col-3">
          <span class="text-grey-7">姓名</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.patient_name }}</span>
        </div>
        <div class="col-3">
          <span class="text-grey-7">性别</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.sex }}</span>
        </div>
        <div class="col-3">
          <span class="text-grey-7">年龄</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.age + ' 岁' }}</span>
        </div>
        <div class="col-3">
          <span class="text-grey-7">科别</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.netdept_child }}</span>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-center">
          <span class="text-grey-7 text-justify"
                style="width: 60px;">体重</span>
          <span class="q-mx-sm">：</span>
          <div class="flex">
            <el-input-number style="width: 120px;"
                             controls-position="right"
                             v-bind:max="200"
                             v-model="weight"
                             v-bind:precision="1">
            </el-input-number>
            <div class="flex items-center bg-grey-2 q-px-sm"
                 style="border-radius: 5px">
              kg
            </div>
          </div>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-center">
          <span class="text-grey-7 text-justify"
                style="width: 60px;">初步诊断</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.diagnose }}</span>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-center">
          <span class="text-grey-7 text-justify"
                style="width: 60px;">过敏史</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.allergy_history || '无' }}</span>
        </div>
      </div>

      <el-divider></el-divider>

      <div class="q-mb-md">
        <span class="text-subtitle1 text-weight-bold">处方药品</span>
        <span class="text-body2 text-grey-5">（最多可添加 5 种药品）</span>
      </div>

      <div class="q-mb-md">
        <DrugSelect ref="drugSelect"
                    v-bind:data="drugList"
                    v-bind:max-count="5"></DrugSelect>
      </div>

      <div class="q-mb-md text-center">
        <el-button v-on:click="close">取消</el-button>
        <el-button v-on:click="send"
                   v-bind:disabled="sending"
                   type="primary">发送</el-button>
      </div>
    </div>

    <peace-dialog title="系统审方结果"
                  v-bind:visible.sync="audit.visible">
      <RecipeAudit v-bind:data="audit.data"></RecipeAudit>

      <div class="q-my-md flex justify-center">
        <el-button v-on:click="sendConfirm">继续发送</el-button>
        <el-button type="primary"
                   v-on:click="audit.visible = false">返回修改</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'

import RecipeAudit from './RecipeAudit'
import DrugSelect from '@src/views/components/drug/DrugSelect'

export default {
  components: {
    RecipeAudit,
    DrugSelect
  },

  props: {
    session: Object
  },

  data() {
    return {
      /** 体重 */
      weight: undefined,

      /** 病历详情 */
      caseInfo: {},

      /** 药品列表 */
      drugList: [],

      /** 前置审方 */
      audit: {
        visible: false,
        data: {}
      },

      sending: false
    }
  },

  computed: {
    docInfo() {
      return $peace.$store.state.user?.userInfo?.list?.docInfo
    },

    inquiryNo() {
      return this.session?.content?.inquiryInfo?.inquiryNo
    },

    consultNo() {
      return this.session?.content?.consultInfo?.consultNo
    }
  },

  created() {
    this.resetModel()
    this.getCase()
  },

  methods: {
    setModel() {
      const drugList = this.$refs.drugSelect.getModel()

      const params = {
        weight: this.weight,
        drugList: drugList
      }

      Peace.cache.set(this.inquiryNo, params, 'sessionStorage')
    },

    resetModel() {
      const recipeCache = Peace.cache.get(this.inquiryNo, 'sessionStorage')

      if (recipeCache) {
        this.weight = recipeCache.weight
        this.drugList = recipeCache.drugList
      }
    },

    /**
     * 获取病历，展示患者基本信息
     *
     */
    getCase() {
      // 兼容会诊和问诊
      const params = {
        inquiry_no: this.inquiryNo,
        consultNo: this.consultNo
      }

      return Service.getCase(params).then((res) => {
        this.caseInfo = res.data
      })
    },

    /**
     * 发送处方
     */
    send() {
      const validObject = this.$refs.drugSelect.validModel()
      const drugList = this.$refs.drugSelect.getModel()

      if (validObject.isValid === false) {
        return Peace.util.warning(validObject.message)
      }

      if (drugList.length < 1) {
        return Peace.util.warning('请添加处方药品')
      }

      if (drugList.some((drug) => drug.drugStatus === 'disable')) {
        return Peace.util.confirm('处方内含有停用药品，是否删除该药品', '提示', { type: 'error' }, () => {
          this.drugList = drugList.filter((drug) => drug.drugStatus === 'enable')
        })
      }

      Peace.util.confirm('确认发送处方给患者？', '提示', {}, () => {
        const params = {
          openId: this.docInfo?.openid,
          weight: this.weight,
          inquiryNo: this.inquiryNo,
          consultNo: this.consultNo,
          diagnose: this.caseInfo.diagnose,
          allergyHistory: this.caseInfo.allergy_history,
          drugList: drugList
        }

        this.sending = true
        if (this.inquiryNo) {
          Service.subPrescrip(params)
            .then((res) => {
              // 前置审方不合法，显示前置审方审核结果
              if (res.data.isAdopt === false) {
                this.audit.visible = true
                this.audit.data = res.data.result
                this.audit.prescriptionNo = res.data.result.prescriptionNo
              } else {
                Peace.cache.remove(this.inquiryNo, 'sessionStorage')
                Peace.util.alert(res.msg)

                this.$emit('close')
              }
            })
            .finnaly(() => {
              this.sending = false
            })
        } else if (this.consultNo) {
          Service.offlineSubPrescrip(params)
            .then((res) => {
              // 前置审方不合法，显示前置审方审核结果
              if (res.data.isAdopt === false) {
                this.audit.visible = true
                this.audit.data = res.data.result
                this.audit.prescriptionNo = res.data.result.prescriptionNo
              } else {
                Peace.cache.remove(this.inquiryNo, 'sessionStorage')
                Peace.util.alert(res.msg)

                this.$emit('close')
              }
            })
            .finally(() => {
              this.sending = false
            })
        }
      })
    },

    /**
     * 确认发送处方
     */
    sendConfirm() {
      this.sending = true

      const params = {
        openId: this.docInfo?.openid,
        businessNo: this.inquiryNo || this.consultNo,
        prescriptionNo: this.audit.prescriptionNo
      }

      if (this.consultNo) {
        params.sourceAction = 'offline'
      }

      Service.confirmSend(params)
        .then((res) => {
          Peace.cache.remove(this.inquiryNo, 'sessionStorage')
          Peace.util.success(res.msg)

          this.$emit('close')
        })
        .finally(() => {
          this.sending = false
        })
    },

    close() {
      // 处方关闭前，缓存当前处方数据
      this.setModel()

      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.text-justify {
  text-align: justify;
  text-align-last: justify;
}
</style>