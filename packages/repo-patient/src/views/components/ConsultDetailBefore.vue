<template>
  <div class="page">
    <InquiryStageMark :type="params.serviceType"
                      :current="'preSaleOrder'"
                      :position="true"></InquiryStageMark>
    <div class="consult-detatil"
         v-if="!loading">
      <!--医生名片-->
      <div class="module card doctor">
        <div class="doctor-logo">
          <van-image round
                     v-bind:src="doctorInfo.avartor"></van-image>
        </div>
        <div class="doctor-body">
          <div class="doctor-name">
            {{doctorInfo.name}}
            <span class="doctor-small">{{doctorInfo.doctorTitle}}</span>
            <span class="doctor-small">{{doctorInfo.deptName}}</span>
            <span class="inquriyStyle"
                  :class="inquriyStyle">{{inquiryText}}</span>

          </div>
          <div class="doctor-hospitalName">{{ doctorInfo.hospitalName }}</div>
        </div>
      </div>

      <!--订单内容-->
      <div class="module order">
        <div class="module-item"
             v-if="retrunVisitBlock">
          <div class="title">复诊时间</div>
          <div class="span"
               @click="changeSource">
            {{appointmentTime}}
            <van-image :src="require('@src/assets/images/tit-more.jpg')"></van-image>
          </div>
        </div>
        <div class="module-item">
          <div class="title">个人信息</div>
          <div class="module-item-content">
            <div class="module-item-label">姓名：</div>
            <div class="module-item-value">{{familyInfo.name}}</div>
          </div>
          <div class="module-item-content">
            <div class="module-item-label">年龄：</div>
            <div class="module-item-value">{{familyInfo.age}}</div>
          </div>
          <div class="module-item-content">
            <div class="module-item-label">性别：</div>
            <div class="module-item-value">{{familyInfo.sex}}
            </div>
          </div>
          <div class="module-item-content"
               v-if="familyInfo.guardianName">
            <div class="module-item-label">监护人：</div>
            <div class="module-item-value">{{familyInfo.guardianName}} |
              {{familyInfo.guardianSex}} |
              {{familyInfo.guardianAge}}
            </div>
          </div>
        </div>
        <!--病情描述-->
        <div class="module-item">
          <div class="title">病情描述</div>
          <div class="span">{{ params.illnessDescribe }}</div>
        </div>
        <div class="module-item"
             v-if="hasReturnVisitInfo">
          <div>
            <div class="title">复诊信息</div>
            <div class="module-item-content img"
                 v-if="params.attachment.length>0">
              <div class="module-item-label ">复诊凭证：</div>
              <div class="module-item-value img">
                <div class="img"
                     v-for="(item,index) in params.attachment"
                     :key="index">
                  <img :src="item.path"
                       @click="viewImage(item, index,params.attachment)" />
                </div>
              </div>
            </div>
            <div class="module-item-content"
                 v-else>
              <div class="module-item-label">复诊凭证：</div>
              <div class="module-item-value">确认遗失
              </div>
            </div>
            <div class="module-item-content">
              <div class="module-item-label start">初诊诊断：</div>
              <div class="module-item-value">{{params.confirmIllness}}
              </div>
            </div>
          </div>
        </div>
        <!-- 诊疗记录 -->
        <div class="module-item"
             v-if="caseInfo">
          <div class="module-item-title">
            <div class="title">诊疗记录</div>
          </div>
          <template>
            <div class="case-card"
                 v-for="(value, key) in caseInfo"
                 :key="key">
              <div class="case-card-time">
                <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
                <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
              </div>
              <div class="case-box">
                <div class="case-card-note"
                     @click="gotoCaseDetail(item.dataNo)"
                     v-for="(item,index) in value"
                     :key="index">
                  <div class="case-card-note-content">
                    <div class="case-left">
                      <van-image width="35px"
                                 height="35px"
                                 :src="require('@src/assets/images/file/ic_medical record.png')" />
                    </div>
                    <div class="case-right">
                      <p class="case-right-title">
                        {{item.title}}
                      </p>
                      <p class="case-right-name">
                        {{ item.hospitalName }} | {{ item.deptName }}
                      </p>
                    </div>
                  </div>
                  <div class="case-diagnosis"
                       v-if="item.diagnosis">{{item.diagnosis}}</div>
                </div>
              </div>

            </div>
          </template>

        </div>
        <div class="module-item"
             v-if="canShowSupplementaryInfo">
          <div>
            <div class="title">补充信息</div>
            <div class="module-item-content img"
                 v-if="params.affectedImages.length>0">
              <div class="module-item-label">患处图片：</div>
              <div class="module-item-value img">
                <div class="img"
                     v-for="(item,index) in params.affectedImages"
                     :key="index">
                  <img :src="item.path"
                       @click="viewImage(item, index,params.affectedImages)" />
                </div>
              </div>
            </div>
            <div class="module-item-content"
                 v-if="pregnancyText">
              <div class="module-item-label">特殊时期：</div>
              <div class="module-item-value">{{pregnancyText}}</div>
            </div>
            <div class="module-item-content"
                 v-if="params.allergicHistory">
              <div class="module-item-label">过敏史：</div>
              <div class="module-item-value">{{params.allergicHistory}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pay-card-wrap">
        <PayCard v-bind:doctorId="params.doctorId"
                 v-bind:familyId="params.familyId"
                 v-bind:familyName="familyInfo.name"
                 v-bind:payType="payType"
                 v-bind:payInfo="payInfo"
                 v-bind:nethospitalId="doctorInfo.nethospitalId"
                 v-bind:orderType="params.serviceType == 'returnVisit' ? 2 : 1"
                 v-bind:equitiesId="params.patientEquitiesId"
                 v-on:update="updatePayInfo"></PayCard>
      </div>

      <!-- 预售订单 - 非当日-->
      <div class="tipStyle"
           v-if="canShowTip">*请在复诊当天上线报到并支付费用</div>
    </div>

    <div class="footer">
      <van-button round
                  @click="apply"
                  type="primary"
                  :disabled="sending"
                  size="large">提交订单</van-button>
    </div>

    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="imagePreview.images">
      <template v-slot:cover>
        <van-button icon="cross"
                    type="primary"
                    round
                    @click="imagePreview.visible = false" />
      </template>
    </van-image-preview>

    <!-- 确认支付弹框 -->
    <ExpenseDetail v-model="dialog.visible"
                   :info="dialog.data"></ExpenseDetail>

  </div>
</template>

<script>
import PayCard from '@src/views/components/PayCard.vue'
import ExpenseDetail from '@src/views/components/ExpenseDetail'
import InquiryStageMark from '@src/views/components/InquiryStageMark'

import peace from '@src/library'

import { Dialog } from 'vant'
const ENUM = {
  /** 问诊状态 */
  INQUIRY_STATUS: {
    待支付: 1,
    待接诊: 2,
    问诊中: 3,
    已退诊: 4,
    已完成: 5,
    已取消: 6
  },
  INQUIRY_TXET_MAP: {
    image: '图文问诊',
    video: '视频问诊',
    returnVisit: '复诊'
  },
  WOMAN_TYPE_TEXT_MAP: {
    1: '不在特殊时期',
    2: '备孕期',
    3: '怀孕期',
    4: '哺乳期'
  }
}
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    PayCard,
    ExpenseDetail,
    InquiryStageMark
  },
  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      ENUM: ENUM,
      loading: true,
      doctorInfo: {},
      familyInfo: {},
      imagePreview: {
        visible: false,
        position: 0,
        images: []
      },
      params: {},
      sending: false,
      dialog: {
        visible: false,
        data: {}
      },

      // 默认选中微信支付
      payType: 'wxpay',
      // 支付信息
      payInfo: {
        orderMoney: 0,

        // 所选医保卡卡号
        medCardNo: '',
        // 医保待遇类型
        medicalTreatmentType: '',
        // 医保待遇类型名称
        medicalTreatmentTypeName: '',
        // 疾病种类
        diseases: '',
        // 疾病种类名称
        diseasesName: '',

        // 所选服务包ID
        servicePackageId: '',
        // 所选服务包名称
        servicePackageName: '',
        // 所选权益ID
        patientEquitiesId: '',
        // 所选权益名称
        patientEquitiesName: '',

        // H5 商保未开放，暂不考虑
        // 所选商保ID
        sbInsuranceId: '',
        // 所选商保名称
        sbInsuranceName: ''
      }
    }
  },
  computed: {
    pregnancyText() {
      return this.ENUM.WOMAN_TYPE_TEXT_MAP[this.params.isPregnancy]
    },
    caseInfo() {
      return this.params.caseInfo
    },
    info() {
      return {
        familyName: this.params?.familyName,
        familyId: this.params?.familyId,
        serviceType: 'inquiry',
        doctorId: this.doctorInfo?.doctorId,
        netdeptChildId: this.doctorInfo?.netdeptChildId,
        appointmentDate: this.params?.appointmentDate,
        appointmentStartTime: this.params?.appointmentStartTime,
        appointmentEndTime: this.params?.appointmentEndTime,
        AMPM: this.params?.AMPM,
        sourceCode: this.params?.sourceCode,
        sourceItemCode: this.params?.sourceItemCode
      }
    },
    canShowTip() {
      //报道  复诊且预约日期大于今日
      const canReportTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
      const canReport = new Date(this.params.appointmentDate) >= canReportTime ? true : false
      if (this.params.serviceType == 'returnVisit' && canReport) {
        return true
      } else {
        return false
      }
    },
    inquiryText() {
      return ENUM.INQUIRY_TXET_MAP[this.params.consultingType]
    },
    inquriyStyle() {
      if (this.params.serviceType == 'returnVisit') {
        return 'returnVisit'
      } else {
        return 'inquiry'
      }
    },
    appointmentTime() {
      return this.params.appointmentDate.replace(/-/g, '/') + ' ' + this.params.appointmentStartTime + '-' + this.params.appointmentEndTime
    },
    retrunVisitBlock() {
      return this.params?.isAgain.toString() === '1'
    },
    hasReturnVisitInfo() {
      return this.params?.confirmIllness
    },
    canShowSupplementaryInfo() {
      return this.params && (this.params.affectedImages.length > 0 || this.pregnancyText || this.params.allergicHistory)
    }
  },
  created() {
    let json = peace.util.decode(this.$route.params.json)
    // 初始化医保、商保信息
    json.cardno = ''
    json.divisionId = ''

    this.params = json
    this.payInfo.orderMoney = this.params.price
    this.onEmits()
  },
  activated() {
    this.getFamilyDoctorInfo()
  },
  destroyed() {
    this.offEmits()
  },
  methods: {
    // 获取家人及医生信息
    getFamilyDoctorInfo() {
      const params = {
        familyId: this.params.familyId,
        doctorId: this.params.doctorId,
        consultingType: this.params.consultingType, //image 图文 video 视频 returnVisit复诊续方
        orderType: this.params.consultingType == 'returnVisit' ? 2 : 1, //1.问诊 2.复诊 3.购药
        appointmentDate: this.params.appointmentDate, //预约时间
        appointmentStartTime: this.params.appointmentStartTime, //预约开始时间
        appointmentEndTime: this.params.appointmentEndTime, //预约结束时间
        sourceCode: this.params.sourceCode //预约号源编码
      }
      peace.service.inquiry
        .getFamilyDoctorInfo(params)
        .then((res) => {
          this.doctorInfo = res.data.doctorInfo
          this.familyInfo = res.data.familyInfo
        })
        .finally(() => {
          this.loading = false
        })
    },

    onEmits() {
      $peace.$on('SelectSourceAgain', this.selectSourceCallback)
    },
    offEmits() {
      $peace.$off('SelectSourceAgain')
    },
    selectSourceCallback(res) {
      if (res) {
        this.params = Object.assign({}, this.params, res)
      }
    },
    //修改号源
    changeSource() {
      let json = peace.util.encode({
        doctorId: this.doctorInfo.doctorId,
        hospitalCode: this.doctorInfo.nethospitalId,
        time: this.params.appointmentDate.substring(5),
        date: new Date(),
        serviceType: 'returnVisit',
        isAgain: true,
        emit: 'SelectSourceAgain'
      })
      this.$router.push(`/appoint/doctor/appointDoctorSelect/${json}`)
    },
    gotoCaseDetail(dataNo) {
      const token = $peace.cache.get($peace.type.USER.INFO).loginInfo.accessToken
      const url = `health/firstOption/${process.env.VUE_APP_IFRAME_BASE_PLATFORM}/${token}/${dataNo}`
      const json = peace.util.encode({
        url
      })
      this.$router.push(`/components/mainIframe/${json}`)
    },
    seeMoreCase() {
      const json = peace.util.encode({
        familyId: this.params?.familyId,
        doctorId: this.params?.doctorId
      })
      this.$router.push(`/components/FirstVisitList/${json}`)
    },

    // 更新支付信息
    updatePayInfo(result) {
      this.payType = result.payType
      this.payInfo = result.payInfo

      this.params.patientEquitiesId = result.payInfo.patientEquitiesId
      this.params.medCardNo = result.payInfo.medCardNo
      this.params.cardno = result.payInfo.sbInsuranceId
    },

    apply() {
      // if (this.payInfo.medCardNo && !this.payInfo.medicalTreatmentType) {
      //   peace.util.alert('请选择医保类型')
      //   return false
      // }

      let errMsg = ''
      // servicePackage 服务包抵扣 yibaopay 医保支付 shangbaopay 商保
      switch (this.payType) {
        case 'servicePackage':
          errMsg = !this.params.patientEquitiesId ? '请选择服务包' : ''
          break
        case 'yibaopay':
          errMsg = !this.params.medCardNo ? '请填写医保卡号' : ''
          break
        case 'shangbaopay':
          errMsg = !this.params.cardno ? '请选择商保权益' : ''
          break
        default:
          errMsg = ''
          break
      }

      if (errMsg) {
        peace.util.alert(errMsg)
        return false
      }

      if (this.sending) {
        return false
      }
      this.sending = true

      let params = peace.util.deepClone(this.params)

      params.paymentType = this.payType

      // 服务包、医保、商保互斥
      // servicePackage 服务包抵扣 yibaopay 医保支付 shangbaopay 商保
      if (this.payType === 'servicePackage') {
        params.medCardNo = ''
        params.cardno = ''
      }
      if (this.payType === 'wxpay') {
        params.medCardNo = ''
        params.cardno = ''
        params.patientEquitiesId = ''
      }
      if (this.payType === 'yibaopay') {
        params.cardno = ''
        params.patientEquitiesId = ''
      }
      if (this.payType === 'shangbaopay') {
        params.patientEquitiesId = ''
        params.medCardNo = ''
      }

      peace.service.inquiry
        .apply(params)
        .then((res) => {
          // 订单提交成功
          if (res.data.errorState === 0) {
            // 需要支付，跳转支付
            if (res.data.inquiryStatus === 1) {
              if (res.data.inquiryType == 'returnVisit' && res.data.isCurrentDate == 2) {
                this.goToConsultDetail(res.data)
              } else {
                this.gotoExpenseDetailPage(res.data)
              }
            }
            // 不需要支付，跳转订单
            else {
              this.goToConsultDetail(res.data)
            }
          }

          // 订单提交失败
          // errorState:1 存在未支付订单， 跳转订单
          if (res.data.errorState === 1) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '去看看'
            }).then(() => {
              this.goToConsultDetail(res.data)
            })
          }

          // errorState:2 存在未结束订单，跳转问诊
          if (res.data.errorState === 2) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '继续问诊'
            }).then(() => {
              this.goToMessage(res.data)
            })
          }
        })
        .catch((res) => {
          //203  号源不足 或 号源过期
          if (res.data.code == '203') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定'
            }).then(() => {
              this.changeSource()
            })
          }
          //205 医保不可用
          else if (res.data.code == '205') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定',
              showCancelButton: false
            }).then(() => {
              this.goToConsultDetail(res.data.data)
            })
          } else {
            peace.util.alert(res.data.msg)
          }
        })
        .finally(() => {
          this.sending = false
        })
    },
    goToMessage(data) {
      const params = peace.util.encode({
        id: 'p2p-' + this.model.doctorId,
        scene: 'p2p',
        beginTime: data.startTime.toDate().getTime(),
        to: this.model.doctorId
      })

      // 跳转聊天详情
      this.$router.replace(`/components/messageList/${params}`)
    },

    goToConsultDetail(data) {
      const params = {
        inquiryId: data.inquiryId
      }

      let json = peace.util.encode(params)
      this.$router.replace(`/setting/userConsultDetail/${json}`)
    },
    gotoExpenseDetailPage(data) {
      const json = {
        money: data.orderMoney, //自费金额
        moneyRecord: data.moneyRecord, //费用明细
        typeName: this.params.serviceName,
        doctorId: data.doctorId,
        doctorName: data.doctorName,
        orderNo: data.orderNo,
        inquiryId: data.inquiryId,
        orderType: 'inquiry'
      }
      this.dialog.visible = true
      this.dialog.data = json
      // this.$router.replace(`/components/ExpenseDetail/${json}`)
    },

    viewImage(file, fileIndex, files) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
      this.imagePreview.images = files.map((item) => item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-card-wrap {
  margin-bottom: 8px;
}

.info-title {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.6);
  line-height: 18px;
  padding-top: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
  width: calc(100% + 32px);
  margin-left: -16px;
  padding-left: 16px;
}

.red {
  color: #ff3a30;
}
.case-card {
  display: flex;

  .case-card-time {
    padding: 8px 15px 0 0;
    min-width: 70px;
    position: relative;
    text-align: right;
    font-family: PingFangSC-Regular, PingFang SC;
    .y {
      font-size: 12px;
      color: #999999;
    }
    .m {
      font-size: 15px;
      font-weight: 400;
      color: #333333;
    }
  }
  .case-box {
    flex: 1;
    width: 0;
  }
  .case-card-note {
    width: 100%;
    min-height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    &:not(:last-child) {
      margin: 0 0 15px 0;
    }
    .case-card-note-content {
      display: flex;
      align-items: center;
    }
    .case-left {
      width: 35px;
      height: 35px;
      margin: 15px 16px 15px 14px;
      text-align: left;
      position: relative;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      width: 0;
      .case-right-title {
        color: #333;
        font-size: 14px;
      }
      .case-right-name {
        font-size: 13px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 98%;
      }
    }
    .case-diagnosis {
      padding-left: 16px;
      height: 25px;
      line-height: 25px;
      border-top: 1px solid #e8e8e8;
      color: $primary;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/deep/ .van-image-preview__index {
  top: 24px;
}

/deep/ .van-image-preview__cover {
  position: absolute;
  top: 24px;
  left: 24px;

  .van-button--round {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2a2a2a;
    background-color: #999999;
    border: 1px solid #999999;

    .van-button__icon {
      line-height: 1;
    }
  }
}

.footer {
  width: 100%;
  padding: 8px 16px 24px;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  justify-content: space-between;
}

.module-item {
  border-bottom: 1px solid #f5f5f5;
  &:not(:last-child) {
    padding-bottom: 16px;
  }
  .module-item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    margin-top: 16px;
    .title {
      margin: 0;
    }
    .module-item-more {
      color: #999;
      font-weight: normal;
      padding-top: 10px;
    }
  }
  &:last-child {
    border-bottom: 0;
  }
}

.module-item-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 24px;
  justify-content: flex-start;
  &.message {
    justify-content: space-between;
  }
  &.start {
    align-items: flex-start;
  }
  &.img {
    display: block;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &:last-child {
    border-bottom: 0;
  }
  .module-item-label {
    color: rgba(51, 51, 51, 0.6);
    margin-right: 5px;
  }
  .module-item-value {
    color: #333333;
    &.img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px 0;
      .img {
        width: 60px;
        height: 60px;
        margin: 5px 8px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }
  }

  .module-item {
    border-bottom: 1px solid #f5f5f5;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
  .module-item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .module-item-more {
      color: #999;
      font-weight: normal;
      padding-top: 10px;
    }
  }
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;
  padding: 8px 0 81px;
  box-sizing: border-box;

  .module {
    background: #fff;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 16px;
    margin-bottom: 8px;
    &.info {
      padding-top: 0;
      padding-bottom: 0;
    }
    &.doctor {
      position: relative;
      .doctor-logo {
        height: 60px;
        .van-image {
          width: 60px;
          height: 60px;
          border: 1px solid #eee;
          margin-right: 16px;
        }
      }
      .doctor-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .doctor-name {
          line-height: 24px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #333333;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          word-break: break-all;
          .doctor-small {
            line-height: 24px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: normal;
            color: #333333;
            margin-left: 4px;
          }
          .van-image {
            width: 12px;
            height: 12px;
            margin-left: 4px;
          }
          .inquriyStyle {
            border-radius: 8px 8px 8px 0px;
            color: #fff;
            font-size: 12px;
            line-height: normal;
            font-family: PingFangSC-Regular, PingFang SC;
            height: 24px;
            padding: 0px 6px;
            // display: inline-block;
            display: flex;
            align-items: center;
            justify-content: center;

            margin-left: 4px;
            &.returnVisit {
              background: #fa8c16;
            }
            &.inquiry {
              background: #00ccb3;
            }
          }
        }
        .doctor-hospitalName {
          line-height: 32px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: normal;
          color: #333333;
        }
      }
    }

    &.order {
      .module-item {
        &:first-child {
          .title {
            margin-top: 0;
          }
        }
      }
    }

    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 0 0 0;
      font-size: 12px;
      color: rgba(0, 198, 174, 1);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('../../assets/images/icons/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
    .waitText {
      padding: 10px 15px;
      // width: 100%;
      box-sizing: border-box;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 0 0 0;
      .cancelText {
        height: 27px;
        line-height: 27px;
        padding: 0;
        margin: 0;
        border: 0;
        padding-left: 40px;
        background-position: 0px 5px;
      }
      .wait-img {
        height: 42px;
        width: calc(100% - 2px);
        margin-left: 1px;
        margin-top: 6px;
        display: block;
      }
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img {
        width: 57px;
        height: 57px;
        background: #ccc;
        margin: 5px 10px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 57px;
          height: 57px;
          display: block;
        }
      }
    }
  }
  .typeTag {
    width: 36px;
    height: 22px;
    border-radius: 10px 10px 10px 0;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
    &.zx {
      background-color: #00c6ae;
    }
    &.fz {
      background-color: #fa8c16;
    }
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 12px;
    margin-top: 16px;
    &::before {
      position: absolute;
      content: '';
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background: $primary;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .span {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-image {
      width: 8px;
      height: 13px;
    }
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
    display: flex;
    align-items: center;
    padding-left: 8px;
    font-weight: 600;
    span {
      font-weight: 400;
      color: #999;
      font-size: 12px;
    }
  }
}
.brief {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding:12px 0 ;
  padding-top: 12px;
  padding-right: 0px;
  padding-bottom: 12px;
  padding-left: 0px;

  &.text-gery {
    color: rgba(51, 51, 51, 0.6);
    line-height: 20px;
    font-size: 14px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(51, 51, 51, 0.05);
  }
  .brief-left {
    display: flex;
    align-items: center;
    &.size-14 {
      line-height: 18px;
      font-size: 14px;
    }
    .van-image {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }

  .brief-right {
    display: flex;
    align-items: center;
    span {
      line-height: normal;
    }
    .van-image {
      width: 16px;
      height: 16px;
      &:first-child {
        margin-right: 8px;
      }
      &:last-child {
        margin-left: 4px;
      }
    }

    &.unchecked {
      color: rgba(51, 51, 51, 0.4);
    }
    &.checked {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 0;
      flex: 1;
      span {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
    }
  }
}
.tipStyle {
  color: #ff344d;
  padding-left: 10px;
  font-size: 12px;
  padding-bottom: 4px;
}
</style>
