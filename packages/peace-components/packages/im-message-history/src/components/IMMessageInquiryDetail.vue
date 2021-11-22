<!--
 * @Description: IM 聊天消息 - 问诊卡片 - 详情
-->

<template>
  <div class="im-message-inquiry-detail"
       v-loading="loading">
    <div class="q-px-16 q-py-8 q-mb-16 flex items-center"
         style="background: rgba(255,251,230,1);"
         v-if="shouldVisiblePrescriptionWarning">
      <img style="width: 20px; height: 20px; margin: 0 14px 0 0;"
           v-bind:src="require('./../assets/img/warning@2x.png')"
           alt="">
      <span class="text-grey-8">患者选择在线咨询，请确认患者为<span class="text-warning">复诊</span>后再开具处方</span>
    </div>

    <div>
      <!-- 个人信息 -->
      <div class="q-mb-md dashed-line">
        <div class="flex items-center before-vertical-line q-mb-sm">
          <span class="text-subtitle2 text-bold">个人信息</span>
        </div>

        <el-form space-view
                 class="q-pb-sm"
                 label-suffix="：">
          <div class="row q-col-gutter-x-md">
            <el-form-item class="col"
                          label="姓名">{{ data.content.data.inquiryOrderInfo.patientsName }}</el-form-item>
            <el-form-item class="col"
                          label="年龄">{{ data.content.data.inquiryOrderInfo.age }}</el-form-item>
          </div>

          <div class="row q-col-gutter-x-md">
            <el-form-item class="col"
                          label="性别">{{ data.content.data.inquiryOrderInfo.sex }}</el-form-item>
            <el-form-item class="col"
                          label="监护人"
                          v-if="data.content.data.inquiryOrderInfo.guardianName">{{ data.content.data.inquiryOrderInfo.guardianName }} | {{ data.content.data.inquiryOrderInfo.guardianAge }} | {{ data.content.data.inquiryOrderInfo.guardianSex }}</el-form-item>
          </div>

          <div class="row q-col-gutter-x-md">
            <el-form-item class="col"
                          label="费用"
                          v-if="shouldVisiblePayType">{{ payTypeText }}</el-form-item>
          </div>
        </el-form>
      </div>

      <!--病情描述-->
      <div class="q-mb-md dashed-line">
        <div class="flex items-center before-vertical-line q-mb-sm">
          <span class="text-subtitle2 text-bold">病情描述</span>
        </div>

        <div class="q-pb-md">{{ data.content.data.inquiryOrderInfo.describe}}</div>
      </div>

      <!-- 诊疗信息 -->
      <div class="q-mb-md dashed-line"
           v-if="shouldVisibleFirstOption">
        <div class="flex items-center before-vertical-line q-mb-sm">
          <span class="text-subtitle2 text-bold">诊疗信息</span>
        </div>

        <div class="row items-baseline q-pb-md">
          <div class="row q-mr-20 q-mb-10"
               v-for="item in internalInitialVisitData"
               v-bind:key="item.hisPatientId">

            <div class="time-line column q-mr-14 q-pl-20">
              <span class="time-line-title">{{ item.createdTime.substring(0, 4) }}</span>
              <span class="time-line-subtitle">{{ item.createdTime.substring(5, 10) }}</span>
            </div>

            <div class="case-bg cursor-pointer"
                 v-on:click="getFirstOptionDetail(item)">
              <div class="row cursor-pointer">
                <img src="./../assets/img/ic_option_record.png"
                     style="width: 40px; height:40px"
                     class="q-mr-10" />
                <div>
                  <p class="case-title">{{ item.title }}</p>
                  <p class="case-subtitle">{{ item.hospitalName }} | {{ item.deptName }}</p>
                </div>
              </div>

              <div class="q-mt-14 q-mb-2"
                   v-if="item.diagnosis">
                <q-separator />
                <p class="text-primary q-mt-8"
                   style="line-height:18px; font-size:13px;">{{ item.diagnosis || '' }}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- 复诊信息 -->
      <div class="q-mb-md dashed-line"
           v-if="shouldVisibleAgain">
        <div class="flex items-center before-vertical-line q-mb-sm">
          <span class="text-subtitle2 text-bold">复诊信息</span>
        </div>

        <el-form space-view
                 class="q-pb-sm"
                 label-suffix="：">
          <el-form-item label="复诊凭证">
            <template v-if="data.content.data.inquiryOrderInfo.imgs.length > 0">
              <div class="flex items-start row q-col-gutter-md">
                <div class="q-pa-sm"
                     v-for="(item,index) in data.content.data.inquiryOrderInfo.imgs"
                     v-bind:key="index">
                  <el-image class="flex items-center justify-center q-pa-sm bg-grey-3"
                            v-bind:src="item"
                            style="width: 64px; "
                            v-bind:preview-src-list="data.content.data.inquiryOrderInfo.imgs"></el-image>
                </div>
              </div>
            </template>
            <template v-else>
              <span class="text-grey-333">确认遗失</span>
            </template>
          </el-form-item>

          <el-form-item label="初诊诊断">{{ data.content.data.inquiryOrderInfo.confirmIllness }}</el-form-item>
        </el-form>
      </div>

      <!-- 补充信息 -->
      <div class="dashed-line"
           v-if="shouldVisibleAdditional">
        <div class="flex items-center before-vertical-line q-mb-sm">
          <span class="text-subtitle2 text-bold">补充信息</span>
        </div>

        <el-form space-view
                 class="q-pb-sm"
                 label-suffix="：">
          <el-form-item label="患处图片"
                        v-if="data.content.data.inquiryOrderInfo.aImages.length > 0">
            <div class="flex items-start row q-col-gutter-md">
              <div v-for="(item,index) in data.content.data.inquiryOrderInfo.aImages"
                   v-bind:key="index">
                <el-image class="flex items-center justify-center q-pa-sm bg-grey-3"
                          v-bind:src="item"
                          style="width: 64px; "
                          v-bind:preview-src-list="data.content.data.inquiryOrderInfo.aImages"></el-image>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="特殊时期"
                        v-if="data.content.data.inquiryOrderInfo.pregnancyText">
            {{ data.content.data.inquiryOrderInfo.pregnancyText }}
          </el-form-item>

          <el-form-item label="过敏史"
                        v-if="data.content.data.inquiryOrderInfo.allergicHistory">
            {{ data.content.data.inquiryOrderInfo.allergicHistory }}
          </el-form-item>
        </el-form>
      </div>
    </div>

    <PeaceDialog append-to-body
                 title="处方详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetailHIS v-bind:data="dialog.data"></PeacePrescriptionDetailHIS>
    </PeaceDialog>
  </div>
</template>

<script>
import PeacePrescriptionDetailHIS from './../../../prescription-detail-his/src/index.vue'
import Service from './../service'

export default {
  components: {
    PeacePrescriptionDetailHIS
  },

  props: {
    data: [Object, Function]
  },

  data() {
    return {
      loading: false,
      internalInitialVisitData: [],

      dialog: {
        visible: false,
        data: undefined
      },

      INQUIRY_PAY_TYPE: {
        自费: 1,
        医保: 2,
        商保: 3,
        门特: 4
      }
    }
  },

  watch: {
    data: {
      async handler() {
        this.loading = true
        this.internalInitialVisitData = await this.getFirstOptionList(this.data?.content?.data?.inquiryInfo?.inquiryNo)
        this.loading = false
      },
      immediate: true
    }
  },

  computed: {
    /**
     * @description: 是否应该显示开具处方提醒
     * @param {*}
     * @return {*}
     */
    shouldVisiblePrescriptionWarning() {
      return !this.data.content.data?.inquiryInfo?.isAgain
    },

    /**
     * @description: 是否应该显示复诊信息
     * @param {*}
     * @return {*}
     */
    shouldVisibleAgain() {
      return this?.data?.content?.data?.inquiryInfo?.isAgain && this.data?.content?.data?.inquiryOrderInfo?.confirmIllness
    },

    shouldVisibleFirstOption() {
      return this.internalInitialVisitData?.length > 0
    },

    /**
     * @description: 是否应该显示补充信息
     * @param {*}
     * @return {*}
     */
    shouldVisibleAdditional() {
      return (
        this?.data?.content?.data?.inquiryOrderInfo?.aImages?.length > 0 ||
        this?.data?.content?.data?.inquiryOrderInfo?.allergicHistory ||
        this?.data?.content?.data?.inquiryOrderInfo?.pregnancyText
      )
    },

    /**
     * @description: 是否应该显示费用
     * @param {*}
     * @return {*}
     */
    shouldVisiblePayType() {
      return this.data?.content?.data?.inquiryOrderInfo.paymentType != this.INQUIRY_PAY_TYPE.自费
    },

    /**
     * @description: 费用类型
     * @param {*}
     * @return {*}
     */
    payTypeText() {
      if (this.data?.content?.data?.inquiryInfo?.paymentType === 1) {
        return '自费'
      }
      if (this.data?.content?.data?.inquiryInfo?.paymentType === 2) {
        return '普通医保'
      }
      if (this.data?.content?.data?.inquiryInfo?.paymentType === 3) {
        return '商保'
      }
      if (this.data?.content?.data?.inquiryInfo?.paymentType === 4) {
        return `门特-${this.data?.inquiryInfo?.medicalDiseases}`
      }

      return ''
    }
  },

  methods: {
    async fetch() {
      return typeof this.data === 'function' ? await this.data() : this.data
    },

    async getFirstOptionList(inquiryNo) {
      const params = { inquiryNo: inquiryNo }
      const res = await Service.getFirstOptionList(params)

      return res.data
    },

    async getFirstOptionDetail({ dataNo }) {
      this.dialog.visible = true
      this.dialog.data = async () => {
        const params = { prescriptionCode: dataNo }
        const res = await Service.getFirstOptionDetail(params)

        return res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashed-line {
  border-bottom: 1px solid #e2e2e2;

  &:last-of-type {
    border-bottom: none;
  }
}

.before-vertical-line {
  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 4px;

    margin: 0 8px 0 0;
  }
}

.time-line {
  &::before {
    content: '';
    position: relative;
    left: -15px;
    top: 14px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: var(--q-color-primary);
  }

  .time-line-title {
    line-height: 20px;
    color: #333333 !important;
    font-size: 14px;
    font-weight: 600;
  }

  .time-line-subtitle {
    line-height: 17px;
    color: #999999 !important;
    font-size: 12px;
  }
}

.case-bg {
  padding: 10px 14px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  .case-title {
    font-size: 16px;
    color: #333 !important;
    line-height: 22px;
  }

  .case-subtitle {
    font-size: 13px;
    color: #999 !important;
    line-height: 18px;
  }
}
</style>
