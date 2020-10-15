<template>
  <div class="consult-detatil">
    <div class="module order"
         v-if="internalData!=null">
      <div class="card"
           style="display: flex; align-items: center; background:rgba(255,251,230,1); margin: 0 0 10px 0;"
           v-if="!internalData.inquiryInfo.isAgain">
        <img style="width: 20px; height: 20px; margin: 0 14px 0 0;"
             v-bind:src="require('@src/assets/images/warning@2x.png')">
        <span>患者选择在线咨询，未提供线下复诊凭证，</span>
        <span style="color: #FA8C16;">不可开具处方</span>
      </div>

      <div class="module-item">

        <div class="b">个人信息</div>

        <el-row>
          <el-col :span="12"
                  class="form-dl">
            <div class="form-dt"><span>姓名</span></div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">{{internalData.inquiryOrderInfo.patientsName}}</div>
          </el-col>
          <el-col :span="12"
                  class="form-dl">
            <div class="form-dt"><span>年龄</span></div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">{{internalData.inquiryOrderInfo.age + "岁"}}</div>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col class="form-dl col">
            <div class="form-dt"><span>性别</span></div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">{{internalData.inquiryOrderInfo.sex}}
            </div>
          </el-col>
          <el-col class="form-dl col"
                  v-if="internalData.inquiryOrderInfo.guardianName">
            <div class="form-dt"><span>监护人</span></div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">
              {{internalData.inquiryOrderInfo.guardianName}} |
              {{internalData.inquiryOrderInfo.guardianAge}} |
              {{internalData.inquiryOrderInfo.guardianSex}}
            </div>
          </el-col>

          <el-col class="form-dl col"
                  v-if="showPayType">
            <div class="form-dt">
              <span>费用</span>
            </div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">
              {{ payTypeText }}
            </div>
          </el-col>
        </el-row>
      </div>
      <!--病情描述-->
      <div class="module-item">
        <div class="b">病情描述</div>
        <div class="span"
             style="padding: 0">{{ internalData.inquiryOrderInfo.describe}}</div>

      </div>

      <!-- 诊疗信息 -->
      <div class="module-item"
           v-if="firstOptionInfo.length > 0">
        <div class="q-mb-sm text-subtitle1 text-bold row justify-between">
          <div class="b">诊疗信息</div>
          <el-button type="text"
                     style="color: #666; font-size:12px;"
                     v-show="showMoreButton"
                     v-on:click="showHealthRecode">查看更多<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>

        <div class="row items-baseline q-mb-sm">

          <div class="row q-mr-20 col"
               v-for="item in firstOptionInfo"
               v-bind:key="item.dataNo">

            <div class="time-line column q-mr-14 q-pl-20">
              <span class="time-line-title">{{ item.createdTime.substring(0, 4) }}</span>
              <span class="time-line-subtitle">{{ item.createdTime.substring(5, 10) }}</span>
            </div>

            <div class="case-bg col cursor-pointer"
                 v-on:click="showCaseInfo(item)">
              <div class="row q-mb-14">
                <img src="@src/assets/images/inquiry/ic_option_record.png"
                     style="width: 40px; height:40px"
                     class="q-mr-10" />
                <div>
                  <p class="case-title">{{ item.title }}</p>
                  <p class="case-subtitle">{{ item.hospitalName }} | {{ item.deptName }}</p>
                </div>
              </div>

              <div v-if="item.diagnosis">
                <q-separator />
                <p class="text-primary q-mt-8"
                   style="line-height:18px; font-size:13px;">{{ item.diagnosis || '' }}</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div class="module-item"
           v-if="internalData.inquiryOrderInfo.confirmIllness && internalData.inquiryOrderInfo.isAgain">
        <div>
          <div class="b">复诊信息</div>
          <div class="form-dl img"
               style="display: flex; align-items: flex-start;"
               v-if="internalData.inquiryOrderInfo.imgs.length > 0">
            <div class="form-dt">复诊凭证</div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-img"
                 style="display: inline-block; ">
              <viewer :images="internalData.inquiryOrderInfo.imgs">
                <img v-for="(item,index) in internalData.inquiryOrderInfo.imgs"
                     :key="index"
                     class="img"
                     :src="item">
              </viewer>
            </div>
          </div>

          <div v-else>
            <span class="form-dt text-grey-999 q-mr-md">复诊凭证:</span>
            <span class="text-grey-333">确认遗失</span>
          </div>

          <div class="form-dl">
            <div class="form-dt">初诊诊断</div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">{{internalData.inquiryOrderInfo.confirmIllness}}
            </div>
          </div>
        </div>
      </div>
      <div class="module-item"
           v-if="internalData.inquiryOrderInfo&&((internalData.inquiryOrderInfo.aImages&&internalData.inquiryOrderInfo.aImages.length>0)||internalData.inquiryOrderInfo.allergicHistory||internalData.inquiryOrderInfo.pregnancyText)">
        <div>
          <div class="b">补充信息</div>
          <div class="form-dl img"
               style="display: flex; align-items: flex-start;"
               v-if="internalData.inquiryOrderInfo.aImages.length > 0">
            <div class="form-dt">患处图片</div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-img"
                 style="display: inline-block; ">
              <viewer :images="internalData.inquiryOrderInfo.aImages">
                <img v-for="(item,index) in internalData.inquiryOrderInfo.aImages"
                     :key="index"
                     class="img"
                     :src="item">
              </viewer>
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.inquiryOrderInfo.pregnancyText">
            <div class="form-dt">特殊时期</div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">{{internalData.inquiryOrderInfo.pregnancyText}}
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.inquiryOrderInfo.allergicHistory">
            <div class="form-dt"><span>过敏史</span></div>
            <span class="form-dt"
                  style="min-width: unset; margin: 0 10px 0 0;">:</span>
            <div class="form-dd">{{internalData.inquiryOrderInfo.allergicHistory}}
            </div>
          </div>
        </div>
      </div>
    </div>

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
import Type from '@src/type'
import InquiryOptionRecord from '@src/views/components/inquiry/InquiryOptionRecord.vue'
import FirstOptionDetail from '@src/views/patient/patientDetail/components/FirtstOptionDetail.vue'
export default {
  props: {
    data: Object
  },

  data() {
    return {
      internalData: null,
      items: [],
      optionDialog: {
        visible: false,
        data: undefined
      },
      dialog: {
        visible: false,
        data: undefined
      }
    }
  },

  components: {
    InquiryOptionRecord,
    FirstOptionDetail
  },

  beforeMount() {
    this.getOptionList()
  },

  mounted() {
    this.internalData = this.data
  },

  computed: {
    firstOptionInfo() {
      return this.items.length > 2 ? this.items.slice(0, 2) : this.items
    },

    showMoreButton() {
      return this.items.length > 2
    },

    showHealthCareTag() {
      return true
    },

    showPayType() {
      return this.data.inquiryOrderInfo.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      const text = Object.keys(Type.INQUIRY.INQUIRY_PAY_TYPE).find((key) => Type.INQUIRY.INQUIRY_PAY_TYPE[key] === this.data.inquiryOrderInfo.paymentType)
      return text
    }
  },

  methods: {
    getOptionList() {
      const params = { inquiryNo: this.data.inquiryInfo.inquiryNo }
      peace.service.inquiry.getFirstOptionList(params).then((res) => {
        const tmpTimes = []
        const tmp = res.data.firstOptionList.map(function (item) {
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
      this.optionDialog.data = peace.util.deepClone(this.items)
    },

    showCaseInfo(info) {
      this.dialog.visible = true
      this.dialog.data = info.dataNo
    }
  }
}
</script>

<style lang="scss" scoped>
.module-item {
  border-bottom: 1px solid #e8e8e8;
  margin: 0 0 5px 0;
  padding: 10px 0;
  &:last-child {
    border-bottom: 0;
  }
}
.order {
  padding: 0 15px;
  .b {
    padding-left: 0 !important;
    margin: 0 0 10px 0;
  }
  .form-dl {
    padding: 3px 0;
    border-bottom: 0;
    display: flex;
    &:last-child {
      padding-bottom: 10px;
    }

    .form-dt {
      color: #999;
      min-width: 60px;
      display: flex;
      padding-right: 0px;
      span {
        flex: 1;
        text-align-last: justify;
        margin-right: 3px;
      }
    }
    .form-dd {
      color: #333;
      text-align: left;
      padding-left: 2px;
    }
  }
}
.bb {
  height: 1px;
  background: #e8e8e8;
}
.consult-detatil {
  background-color: #fff;
  color: #333;
  min-height: 100%;
  padding: 10px;
  border-radius: 3px;
  box-sizing: border-box;
  .module,
  .brief {
    border-radius: 5px;
  }
  .module {
    background: #fff;
    margin-bottom: 10px;
    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 15px 0 15px;
      font-size: 12px;
      color: rgba(0, 198, 174, 1);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('~@/assets/images/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
  }
  .form-dl {
    font-size: 14px;
  }
  .form-dl.img {
    display: block;
    .form-dt {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .form-img {
      padding: 5px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img {
        max-width: 57px;
        max-height: 57px;
        background: #ccc;
        margin-right: 10px;
        margin-bottom: 10px;
        img {
          width: 57px;
          height: 57px;
          display: block;
        }
      }
    }
  }
  .nmg {
    margin-top: 0;
    padding-bottom: 10px;
  }
  .module .strong {
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    padding: 10px 15px;
    color: #333;
  }
  .module .brief {
    font-size: 13px;
    padding: 0 15px;
    /*color: #888;*/
  }
  .module .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .module .module-body {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .module-body .label {
    flex: 1;
    text-align: center;
    font-size: 13px;
    padding: 4px 6px;
    margin: 5px;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .module-body .blue-full {
    background: #00c6ae;
    color: #fff;
    border-color: transparent;
  }

  .card {
    background: #fff;
    padding: 10px 15px;
  }
  .b {
    display: block;
    font-weight: 600;
    color: #000;

    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 15px;
      background: #00c6ae;
      margin-right: 8px;
      margin-bottom: -2px;
    }
  }
  .b,
  .span,
  .ul {
    padding: 0 15px;
  }

  .dl-packet {
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: #999;
    font-size: 13px;
  }
  .dl-packet .dt {
    flex: 0 0 auto;
    width: 115px;
    padding: 5px 15px;
  }
  .dl-packet .dd {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    padding: 5px 15px;
  }
  .pdtb {
    padding: 10px 0;
  }
  .right {
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .money {
    color: #f2223b;
    font-size: 18px;
    display: inline;
    padding-left: 8px;
  }
  .ul {
    display: flex;
    padding-bottom: 15px;
  }
  .ul .li {
    flex: 0 0 auto;
    width: 45px;
    height: 45px;
    margin-right: 13px;
    border: 1px solid #e5e5e5;
    padding: 5px;
  }
  .label.label-private {
    font-size: 8px;
    padding: 1px 2px;
    border-radius: 2px;
    color: #f7e9b3;
    background: #504c4f;
    border-color: #504c4f;
    vertical-align: text-top;
    margin-top: 2px;
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
  max-width: 230px !important;
  padding: 12px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);

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