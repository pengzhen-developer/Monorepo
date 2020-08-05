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

    <el-card class="q-mb-lg bg-grey-2 no-shadow">
      <div class="q-mb-sm text-subtitle1 text-bold">
        <span>复诊信息</span>
      </div>

      <div class="q-mb-xs row">
        <span class="q-mr-sm text-grey-7">复诊凭证：</span>

        <div class="col">
          <template v-if="showImages">
            <span>确认遗失</span>
          </template>
          <template v-else>
            <viewer class="flex"
                    v-bind:images="inquiryOrderInfo.imgs">
              <img v-for="image in inquiryOrderInfo.imgs"
                   fit="fit"
                   v-bind:key="image"
                   v-bind:src="image"
                   class="q-mr-md q-mb-sm"
                   style="max-width: 60px; max-height: 60px;" />
            </viewer>
          </template>
        </div>
      </div>
      <div class="q-mb-xs row">
        <span class="q-mr-sm text-grey-7">疾病诊断：</span>
        <div class="col">{{ inquiryOrderInfo.confirmIllness }}</div>
      </div>
    </el-card>

    <el-card class="bg-grey-2 no-shadow"
             v-if="showAdditionalInfo">
      <div class="q-mb-sm text-subtitle1 text-bold">
        <span>补充信息</span>
      </div>

      <div class="q-mb-xs row">
        <span class="q-mr-sm text-grey-7">患处图片：</span>
        <div class="col">
          <viewer class="flex"
                  v-bind:images="inquiryOrderInfo.aImages">
            <img v-for="image in inquiryOrderInfo.aImages"
                 fit="fit"
                 v-bind:key="image"
                 v-bind:src="image"
                 class="q-mr-md q-mb-sm"
                 style="max-width: 60px; max-height: 60px;" />
          </viewer>
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