<template>
  <div class="q-pa-lg">

    <div class="q-mb-lg">
      <el-alert type="warning"
                v-bind:closable="false">
        <div class="flex items-center"
             slot="title">
          <q-icon class="q-mr-md text-h6"
                  v-bind:name="`img:${require('@src/assets/images/warning@2x.png')}`"></q-icon>
          <span class="text-grey-8">患者选择在线咨询，未提供线下复诊凭证，</span>
          <span style="color: #FA8C16;">不可开具处方</span>
        </div>
      </el-alert>
    </div>

    <el-card class="q-mb-lg bg-grey-2 no-shadow">
      <div class="q-mb-sm text-subtitle1 text-bold">
        <span>个人信息</span>
      </div>

      <div class="q-mb-xs row">
        <div class="col-4">
          <span class="label-4 q-mr-sm text-grey-7">姓名：</span>
          <span>{{ inquiryOrderInfo.patientsName }}</span>
        </div>
        <div class="col-4">
          <span class="label-4 q-mr-sm text-grey-7">年龄：</span>
          <span>{{ inquiryOrderInfo.age + '岁' }}</span>
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
            {{ inquiryOrderInfo.guardianAge + '岁'}}
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card__body {
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
</style>