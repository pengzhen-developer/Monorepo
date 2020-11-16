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
    <!-- 诊疗记录 -->
    <el-card class="q-mb-lg bg-grey-2 no-shadow"
             v-if="firstOptionInfo.length > 0">
      <div class="q-mb-sm text-subtitle1 text-bold row justify-between">
        <span>诊疗记录</span>
        <el-button type="text"
                   style="color: #666; font-size:12px;"
                   v-show="showMoreButton"
                   v-on:click="showHealthRecode">查看更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </div>

      <div class="row  items-baseline">

        <div class="row q-mr-20 q-mb-10"
             v-for="item in firstOptionInfo"
             v-bind:key="item.hisPatientId">

          <div class="time-line column q-mr-14 q-pl-20">
            <span class="time-line-title">{{ item.createdTime.substring(0, 4) }}</span>
            <span class="time-line-subtitle">{{ item.createdTime.substring(5, 10) }}</span>
          </div>

          <div class="case-bg cursor-pointer"
               v-on:click="showCaseInfo(item)">
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
             v-if="inquiryOrderInfo.confirmIllness > 0">
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

    <peace-dialog :visible.sync="caseDialog.visible"
                  append-to-body
                  title="病历详情">
      <InquiryNewCaseDetail :data="caseDialog.data"></InquiryNewCaseDetail>
    </peace-dialog>

    <peace-dialog :visible.sync="optionDialog.visible"
                  append-to-body
                  title="诊疗记录">
      <InquiryOptionRecord :data="optionDialog.data"></InquiryOptionRecord>
    </peace-dialog>

    <peace-dialog v-if="dialog.visible"
                  :visible.sync="dialog.visible"
                  append-to-body
                  title="处方详情">
      <FirstOptionDetail :prescriptionCode="dialog.data"></FirstOptionDetail>
    </peace-dialog>

  </div>
</template>

<script>
import InquiryNewCaseDetail from '@src/views/components/inquiry/InquiryNewCaseDetail.vue'
import InquiryOptionRecord from '@src/views/components/inquiry/InquiryOptionRecord.vue'
import FirstOptionDetail from '@src/views/patient/patientDetail/components/FirtstOptionDetail.vue'
import Type from '@src/type'

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
    InquiryNewCaseDetail,
    InquiryOptionRecord,
    FirstOptionDetail
  },

  watch: {
    inquiryNo(val) {
      if (val && val.length > 0) {
        this.getOptionList(val)
      }
    }
  },

  computed: {
    inquiryNo() {
      return this.$store?.state?.inquiry?.sessionMessages?.[0]?.content?.data?.inquiryInfo.inquiryNo ?? ''
    },

    inquiryOrderInfo() {
      return this.$store?.state?.inquiry?.sessionMessages?.[0]?.content?.data?.inquiryOrderInfo ?? {}
    },

    showPayType() {
      return this.inquiryOrderInfo.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      return Object.keys(Type.INQUIRY.INQUIRY_PAY_TYPE).find((key) => Type.INQUIRY.INQUIRY_PAY_TYPE[key] === this.inquiryOrderInfo.paymentType)
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

    firstOptionInfo() {
      return this.items.length > 2 ? this.items.slice(0, 2) : this.items
    },

    showMoreButton() {
      return this.items.length > 2
    }
  },

  methods: {
    get() {
      const params = { dataNo: this.data.dataNo }
      // const params = { inquiryNo: 'WZ2722845337239667' }
      Peace.service.inquiry.getHealthCase(params).then((res) => {
        this.caseDialog.visible = true
        this.caseDialog.data = res.data
        // console.log(this.caseDialog.data)
      })
    },
    getOptionList(val) {
      if (Peace.validate.isEmpty(val)) {
        return
      }

      const params = { inquiryNo: val }

      Peace.service.inquiry.getFirstOptionList(params).then((res) => {
        const tmpTimes = []
        const tmp = res.data.firstOptionList.map(function(item) {
          const tmpTime = item.createdTime.substring(0, 10)
          if (tmpTimes.includes(tmpTime)) {
            item.showTimeLabel = false
          } else {
            tmpTimes.push(tmpTime)
            item.showTimeLabel = true
          }
          return item
        })
        this.items = tmp
      })
    },

    showHealthRecode() {
      this.optionDialog.visible = true
      this.optionDialog.data = Peace.util.deepClone(this.items)
    },

    showCaseInfo(info) {
      this.dialog.visible = true
      this.dialog.data = info.dataNo
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