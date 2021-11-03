<template>
  <div class="q-pa-lg">

    <div class="q-mb-lg">
      <el-alert type="warning"
                v-bind:closable="false">
        <div class="flex items-center"
             slot="title">
          <q-icon class="q-mr-md text-subtitle1"
                  v-bind:name="`img:${require('./../../assets/img/warning@2x.png')}`"></q-icon>
          <span>复诊时间：{{ inquiryOrderInfo.appointmentDate }}</span>
        </div>
      </el-alert>
    </div>

    <el-card class="q-mb-lg bg-grey-2 no-shadow">
      <div class="q-mb-xs row">
        <div class="col">
          <span class="label-4 q-mr-sm text-grey-7">姓名：</span>
          <span>{{ inquiryOrderInfo.patientsName }}</span>
        </div>
        <div class="col">
          <span class="label-4 q-mr-sm text-grey-7">年龄：</span>
          <span>{{ inquiryOrderInfo.age  }}</span>
        </div>
        <div class="col">
          <span class="label-4 q-mr-sm text-grey-7">性别：</span>
          <span>{{ inquiryOrderInfo.sex }}</span>
        </div>
        <div v-if="shouldVisibleGuardian"
             class="col">
          <span class="label-4 q-mr-sm text-grey-7">监护人：</span>
          <span>{{ inquiryOrderInfo.guardianName }} |
            {{ inquiryOrderInfo.guardianSex }} |
            {{ inquiryOrderInfo.guardianAge }}
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <span class="label-4 q-mr-sm text-grey-7">费用：</span>
          <span>{{ payTypeText }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="q-mb-lg bg-grey-11 no-shadow">
      <div class="q-mb-sm text-subtitle1 text-bold">
        <span>病情描述</span>
      </div>

      <div class="q-mb-xs row">
        <span class="text-justify"
              style="word-break: break-all;">
          {{ inquiryOrderInfo.describe }}
        </span>
      </div>
    </el-card>
    <!-- 诊疗记录 -->
    <el-card class="q-mb-lg bg-grey-2 no-shadow"
             v-if="firstOptionList.length > 0">
      <div class="q-mb-sm text-subtitle1 text-bold row justify-between">
        <span>诊疗记录</span>
      </div>

      <div class="row  items-baseline">

        <div class="row q-mr-20 q-mb-10"
             v-for="item in firstOptionList"
             v-bind:key="item.hisPatientId">

          <div class="time-line column q-mr-14 q-pl-20">
            <span class="time-line-title">{{ item.createdTime.substring(0, 4) }}</span>
            <span class="time-line-subtitle">{{ item.createdTime.substring(5, 10) }}</span>
          </div>

          <div class="case-bg cursor-pointer"
               v-on:click="getFirstOptionDetail(item)">
            <div class="row cursor-pointer">
              <img src="~@src/assets/images/inquiry/ic_option_record.png"
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

    </el-card>

    <el-card class="q-mb-lg bg-grey-2 no-shadow"
             v-if="inquiryOrderInfo.confirmIllness">
      <div class="q-mb-sm text-subtitle1 text-bold">
        <span>复诊信息</span>
      </div>

      <div class="q-mb-xs row">
        <span class="q-mr-sm text-grey-7">复诊凭证：</span>

        <div class="col">
          <template v-if="shouldVisibleImages">
            <span>确认遗失</span>
          </template>
          <template v-else>
            <el-image v-for="image in inquiryOrderInfo.imgs"
                      fit="fit"
                      v-bind:key="image"
                      v-bind:src="image"
                      v-bind:preview-src-list="inquiryOrderInfo.imgs"
                      class="q-mr-md q-mb-sm"
                      style="max-width: 60px; max-height: 60px;" />
          </template>
        </div>
      </div>
      <div class="q-mb-xs row">
        <span class="q-mr-sm text-grey-7">疾病诊断：</span>
        <div class="col">{{ inquiryOrderInfo.confirmIllness }}</div>
      </div>
    </el-card>

    <el-card class="bg-grey-2 no-shadow"
             v-if="shouldVisibleAdditionalInfo">
      <div class="q-mb-sm text-subtitle1 text-bold">
        <span>补充信息</span>
      </div>

      <div class="q-mb-xs row">
        <span class="q-mr-sm text-grey-7">患处图片：</span>
        <div class="col">

          <el-image v-for="image in inquiryOrderInfo.aImages"
                    fit="fit"
                    v-bind:key="image"
                    v-bind:src="image"
                    v-bind:preview-src-list="inquiryOrderInfo.aImages"
                    class="q-mr-md q-mb-sm"
                    style="max-width: 60px; max-height: 60px;" />
        </div>
      </div>
      <div class="q-mb-xs row"
           v-if="inquiryOrderInfo.pregnancyText">
        <span class="q-mr-sm text-grey-7">特殊时期：</span>
        <div class="col">{{ inquiryOrderInfo.pregnancyText }}</div>
      </div>
      <div class="q-mb-xs row">
        <span class="label-5 q-mr-sm text-grey-7">过敏史：</span>
        <div class="col">{{ inquiryOrderInfo.allergicHistory }}</div>
      </div>
    </el-card>

    <PeaceDialog append-to-body
                 title="处方详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetailHIS v-bind:data="dialog.data"></PeacePrescriptionDetailHIS>
    </PeaceDialog>

  </div>
</template>

<script>
import Type from '@src/type'
import Service from './../../service/index.js'
import { PeacePrescriptionDetailHIS } from 'peace-components'

export default {
  data() {
    return {
      caseDialog: {
        visible: false,
        data: undefined
      },
      optionDialog: {
        visible: false,
        data: undefined
      },
      dialog: {
        visible: false,
        data: undefined
      },
      items: []
    }
  },

  components: {
    PeacePrescriptionDetailHIS
  },

  watch: {
    inquiryNo: {
      handler(val) {
        if (val && val.length > 0) {
          this.getFirstOptionList(val)
        }
      },
      immediate: true
    }
  },

  computed: {
    inquiryNo() {
      return this.$store?.state?.inquiry?.sessionMessages?.[0]?.content?.data?.inquiryInfo.inquiryNo ?? ''
    },

    inquiryInfo() {
      return this.$store?.state?.inquiry?.sessionMessages?.[0]?.content?.data?.inquiryInfo ?? {}
    },

    inquiryOrderInfo() {
      return this.$store?.state?.inquiry?.sessionMessages?.[0]?.content?.data?.inquiryOrderInfo ?? {}
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
    },

    shouldVisiblePayType() {
      return this.inquiryInfo.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    shouldVisibleImages() {
      return this.inquiryOrderInfo.imgs?.length === 0
    },

    shouldVisibleGuardian() {
      return this.inquiryOrderInfo.guardianName && this.inquiryOrderInfo.guardianSex && this.inquiryOrderInfo.guardianAge
    },

    shouldVisibleAdditionalInfo() {
      return this.inquiryOrderInfo.aImages?.length > 0 || this.inquiryOrderInfo.allergicHistory || this.inquiryOrderInfo.pregnancyText
    },

    firstOptionList() {
      return this.items
    }
  },

  methods: {
    async getFirstOptionList(inquiryNo) {
      const params = { inquiryNo: inquiryNo }
      const res = await Service.getFirstOptionList(params)

      this.items = res.data
    },

    async getFirstOptionDetail(info) {
      this.dialog.visible = true
      this.dialog.data = async () => {
        const params = { prescriptionCode: info.dataNo }
        const res = await Service.getFirstOptionDetail(params)

        return res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 16px;
}

.label-4 {
  display: inline-block;
  width: 4em;
  text-align: justify;
  text-align-last: justify;
}

.label-5 {
  display: inline-block;
  width: 5em;
  text-align: justify;
  text-align-last: justify;
}

.tag-style {
  background: rgba(2, 167, 240, 1);
  border-radius: 19px;
  font-size: 11px;
  color: white;
  padding: 1px 10px;
  margin-left: 9px;
  line-height: 16px;
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
  background-color: white;
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