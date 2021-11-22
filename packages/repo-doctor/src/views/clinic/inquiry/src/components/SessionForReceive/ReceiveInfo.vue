<template>
  <div class="q-pa-lg">

    <div class="q-mb-lg">
      <el-alert type="warning"
                v-bind:closable="false">
        <div class="flex items-center"
             slot="title">
          <q-icon class="q-mr-md text-h6"
                  v-bind:name="`img:${require('@src/assets/images/warning@2x.png')}`"></q-icon>
          <span class="text-grey-8">患者选择在线咨询，请确认患者为<span class="text-warning">复诊</span>后再开具处方</span>
        </div>
      </el-alert>
    </div>

    <el-card class="q-mb-lg bg-grey-2 no-shadow">
      <div class="q-mb-sm text-subtitle1 text-bold row items-center">
        <span>个人信息</span>
        <span v-if="showPayType"
              class="tag-style">{{ payTypeText }}</span>
      </div>

      <div class="q-mb-xs row">
        <div class="col-4">
          <span class="label-4 q-mr-sm text-grey-7">姓名：</span>
          <span>{{ inquiryOrderInfo.patientsName }}</span>
        </div>
        <div class="col-4">
          <span class="label-4 q-mr-sm text-grey-7">年龄：</span>
          <span>{{ inquiryOrderInfo.age  }}</span>
        </div>
        <div class="col-4">
          <span class="label-4 q-mr-sm text-grey-7">性别：</span>
          <span>{{ inquiryOrderInfo.sex }}</span>
        </div>
      </div>

      <div class="row"
           v-if="showGuardian">
        <div class="col-4">
          <span class="label-4 q-mr-sm text-grey-7">监护人：</span>
          <span>{{ inquiryOrderInfo.guardianName }} |
            {{ inquiryOrderInfo.guardianSex }} |
            {{ inquiryOrderInfo.guardianAge }}
          </span>
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
  </div>
</template>

<script>
import Type from '@src/type'

export default {
  computed: {
    inquiryOrderInfo() {
      return this.$store?.state?.inquiry?.sessionMessages?.[0]?.content?.data?.inquiryOrderInfo ?? {}
    },

    showImages() {
      return this.inquiryOrderInfo.imgs?.length === 0
    },

    showGuardian() {
      return this.inquiryOrderInfo.guardianName && this.inquiryOrderInfo.guardianSex && this.inquiryOrderInfo.guardianAge
    },

    showAdditionalInfo() {
      return this.inquiryOrderInfo.aImages?.length > 0 || this.inquiryOrderInfo.allergicHistory || this.inquiryOrderInfo.pregnancyText
    },

    showPayType() {
      return this.inquiryOrderInfo.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      return Object.keys(Type.INQUIRY.INQUIRY_PAY_TYPE).find((key) => Type.INQUIRY.INQUIRY_PAY_TYPE[key] === this.inquiryOrderInfo.paymentType)
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
</style>
