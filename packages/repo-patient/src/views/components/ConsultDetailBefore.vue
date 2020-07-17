<template>
  <div class="page">
    <div class="consult-detatil"
         v-if="canShowInfo">
      <!--医生名片-->
      <div class="module card">
        <div class="card-avatar avatar-circular">
          <img :src="internalData.doctorInfo.avartor"
               style="height:100%;" />
        </div>
        <div class="card-body">
          <div class="card-name">
            {{ internalData.doctorInfo.name }}
            <div class="card-small">
              {{ internalData.doctorInfo.doctorTitle }}
              {{ internalData.doctorInfo.deptName }}
              <div class="label label-private"
                   v-if="internalData.doctorInfo.isPrivateDoctor">
                私人医生
              </div>
              <van-image width=13
                         v-if="params.consultingType=='image'|| params.isAgain.toString() === '1'"
                         :src="require('@src/assets/images/ic_tuwen_open.png')"></van-image>
              <van-image width=13
                         v-if="params.consultingType=='video'"
                         :src="require('@src/assets/images/ic_video_open.png')"></van-image>
            </div>
          </div>
          <div class="card-small">{{ internalData.doctorInfo.hospitalName }}</div>
        </div>
      </div>
      <!--订单内容-->
      <div class="module order">
        <div class="module-item"
             v-if="retrunVisitBlock">
          <div class="b">复诊时间</div>
          <div class="span">{{appointmentTime}}</div>
        </div>
        <div class="module-item">
          <div class="b">个人信息</div>
          <div class="form-dl">
            <div class="form-dt"><span>姓名</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.name}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>年龄</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.age + "岁"}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>性别</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.sex}}
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.familyInfo.guardianName">
            <div class="form-dt"><span>监 护 人</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.guardianName}} |
              {{internalData.familyInfo.guardianSex}} |
              {{internalData.familyInfo.guardianAge+'岁'}}
            </div>
          </div>
        </div>
        <!--病情描述-->
        <div class="module-item">
          <div class="b">病情描述</div>
          <div class="span">{{ params.illnessDescribe }}</div>
        </div>
        <div class="module-item"
             v-if="retrunVisitBlock">
          <div>
            <div class="b">复诊信息</div>
            <div class="form-dl img"
                 v-if="params.attachment.length>0">
              <div class="form-dt ">复诊凭证 :</div>
              <div class="form-img">
                <div class="img"
                     v-for="(item,index) in params.attachment"
                     :key="index">
                  <img :src="item.path"
                       @click="viewImage(item, index,params.attachment)" />
                </div>
              </div>
            </div>
            <div class="form-dl"
                 v-else>
              <div class="form-dt">复诊凭证 :</div>
              <div class="form-dd">确认遗失
              </div>
            </div>
            <div class="form-dl">
              <div class="form-dt start">初诊诊断 :</div>
              <div class="form-dd">{{params.confirmIllness}}
              </div>
            </div>
          </div>
        </div>
        <div class="module-item"
             v-if="canShowSupplementaryInfo">
          <div>
            <div class="b">补充信息</div>
            <div class="form-dl img"
                 v-if="params.affectedImages.length>0">
              <div class="form-dt ">患处图片 :</div>
              <div class="form-img">
                <div class="img"
                     v-for="(item,index) in params.affectedImages"
                     :key="index">
                  <img :src="item.path"
                       @click="viewImage(item, index,params.affectedImages)" />
                </div>
              </div>
            </div>
            <div class="form-dl"
                 v-if="params.pregnancyText">
              <div class="form-dt">特殊时期 :</div>
              <div class="form-dd">{{params.pregnancyText}}</div>
            </div>
            <div class="form-dl"
                 v-if="params.allergicHistory">
              <div class="form-dt"
                   style="height:fit-content;"><span>过敏史</span> :</div>
              <div class="form-dd">{{params.allergicHistory}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="module">
        <div class="brief right">
          订单费用
          <div class="money">{{ "¥" + params.price.toString().toFixed(2)||'0.00' }}
          </div>
        </div>
      </div>
    </div>
    <template>
      <!-- 预售订单 -->
      <div class="footer fixedBottom">
        <div class="footer-btn chat-btn"
             @click="apply">
          提交订单</div>
      </div>
    </template>

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
  </div>
</template>

<script>
import peace from '@src/library'

import { Dialog } from 'vant'
const ENUM = {
  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保支付: 'yibaopay'
  },
  /** 问诊状态 */
  INQUIRY_STATUS: {
    待支付: 1,
    待接诊: 2,
    问诊中: 3,
    已退诊: 4,
    已完成: 5,
    已取消: 6
  }
}
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
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
      internalData: {},

      imagePreview: {
        visible: false,
        position: 0,
        images: []
      },
      params: {},
      sending: false
    }
  },
  computed: {
    appointmentTime() {
      return this.params.appointmentDate.replace(/-/g, '/') + ' ' + this.params.appointmentStartTime + '-' + this.params.appointmentEndTime
    },
    retrunVisitBlock() {
      return this.params?.isAgain.toString() === '1'
    },
    canShowInfo() {
      return this.internalData && this.params && this.internalData.doctorInfo && this.internalData.familyInfo
    },
    canShowSupplementaryInfo() {
      return this.params && (this.params.affectedImages.length > 0 || this.params.pregnancyText || this.params.allergicHistory)
    }
  },

  activated() {
    this.getFamilyDoctorInfo()
  },

  methods: {
    apply() {
      this.sending = true
      const params = peace.util.deepClone(this.params)

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

          // errorState:2 存在未结束订单，跳转咨询
          if (res.data.errorState === 2) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '继续咨询'
            }).then(() => {
              this.goToMessage(res.data)
            })
          }
        })
        .catch((res) => {
          //203  号源不足
          if (res.data.code == '203') {
            return Dialog.confirm({
              title: '提示',
              message: '您所选时间段医生的复诊号源已被抢光',
              confirmButtonText: '确定'
            })
          } else {
            peace.util.alert(res.data.message)
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
      if (data.orderMoney == 0) {
        const json = peace.util.encode({
          inquiryId: data.inquiryId
        })
        this.$router.replace(`/setting/userConsultDetail/${json}`)
        return
      }
      const json = peace.util.encode({
        money: data.orderMoney,
        typeName: this.params.serviceName,
        doctorId: data.doctorId,
        doctorName: data.doctorName,
        orderNo: data.orderNo,
        inquiryId: data.inquiryId,
        orderType: 'inquiry'
      })
      this.$router.replace(`/components/ExpenseDetail/${json}`)
    },

    getFamilyDoctorInfo() {
      this.params = peace.util.decode(this.$route.params.json)
      const params = {
        familyId: this.params.familyId,
        doctorId: this.params.doctorId
      }
      peace.service.inquiry.getFamilyDoctorInfo(params).then((res) => {
        this.internalData = res.data
      })
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
.report,
.footer,
.pay {
  &.fixedBottom {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
.h64 {
  height: 64px;
}
.report {
  flex-wrap: wrap;
  padding: 14px 16px;
  .cancel-btn {
    width: 32%;
    margin-right: 4%;
    color: #999;
    height: 45px;
    border-radius: 23px;
  }
  .report-btn {
    width: 64%;
    background-color: #00c6ae;
    color: #fff;
    height: 45px;
    border-radius: 23px;
  }
  .report-tip {
    margin-top: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 1;
    color: #999;
    font-size: 13px;
    img {
      width: 13px;
      height: 13px;
      display: block;
      margin-right: 5px;
    }
  }
}
.footer {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 343px;
    height: 45px;
    border-radius: 40px;
    &.chat-btn {
      color: #fff;
      background: rgba(0, 202, 173, 1);
      border: 1px solid rgba(0, 198, 174, 1);
    }
    &.wait-btn {
      color: #999;
      border: 1px solid #ccc;
    }
  }
}
.h115 {
  height: 115px;
}
.pay {
  height: 115px;
  padding: 10px 15px;
  flex-direction: column;
  justify-content: space-around;
  .pay-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:first-child {
      padding-bottom: 5px;
    }
    .count-down {
      display: flex;
      align-items: center;
      color: #999;
      span {
        margin-right: 5px;
      }
    }
    .right {
      color: #000;
      font-size: 13px;
      span {
        color: #f2223b;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .pay-btn {
      height: 45px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
    }
    .btn-cancel {
      color: #999;
      border: 1px solid #ccc;
      width: 32%;
    }
    .btn-pay {
      color: #fff;
      background: #00c6ae;
      width: 64%;
    }
  }
}
.module-item {
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border-bottom: 0;
  }
}

.bb {
  height: 1px;
  background: #e8e8e8;
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;
  padding: 5px 10px 70px;
  box-sizing: border-box;
  .module,
  .brief {
    border-radius: 3px;
  }
  .module {
    background: #fff;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 10px;
    &:last-child {
      margin-bottom: 5px;
    }
    &.top {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    &.order {
      padding: 5px 15px;
      .b {
        padding-left: 0 !important;
      }
      .form-dl {
        padding: 4px 0;
        border-bottom: 0;
        &:last-child {
          padding-bottom: 10px;
        }
      }

      .form-dt {
        color: #999;
        min-width: 70px;
        display: flex;
        padding-right: 10px;
        align-items: center;
        &.start {
          align-items: flex-start;
        }
        span {
          flex: 1;
          text-align: justify;
          text-align-last: justify;
          padding-right: 3px;
          height: 16px;
          line-height: 16px;
          &::after {
            content: ' ';
            display: inline-block;
            width: 100%;
            height: 0px;
          }
        }
      }
      .form-dd {
        color: #333;
        text-align: left;
        padding-left: 2px;
      }
    }
    &.message {
      .message-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        height: 26px;
        .message-item-left {
          width: 30%;
          color: #999;
        }
        .message-item-right {
          width: 70%;
          text-align: right;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: right;
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
  }
  .typeTag.zx {
    background-color: #00c6ae;
  }
  .typeTag.fz {
    background-color: #fa8c16;
  }
  .module .strong {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
  .module .brief {
    font-size: 13px;
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
    font-weight: bold;
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
  .b {
    padding: 10px 15px 0 15px;
  }
  .span {
    padding: 10px 15px 10px 0;
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
</style>
