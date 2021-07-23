<template>
  <div class="service"
       v-bind:style="{'paddingBottom':canShowFooter&&'80px'}"
       v-if="info">
    <!-- 订单状态 -->
    <div class="service-item">
      <div class="service-status">
        {{info.orderStatusTxt}}
        <div class="cancelTip"
             v-on:click="showRefundTip"
             v-if="canShowRefundTip">
          <span>退费说明</span>
          <van-icon name="warning-o"
                    size="12"
                    color="#999999" />
        </div>
      </div>
      <div class="service-text">{{getStatusText(info.orderStatus)}}</div>
      <!-- <span v-if="canShowRefundTip">查看详情</span> -->
    </div>

    <!-- 医生信息 -->
    <div class="service-item flex">
      <van-image v-bind:src="info.photoDoc"
                 class="doctor-logo"></van-image>
      <div class="doctor-info">
        <div class="doctor-name"><span>{{info.doctorName}}</span><span>{{info.doctorTitle}}</span><span>{{info.netdeptChild}}</span></div>
        <div class="doctor-hosp">{{info.hospitalName}}</div>
      </div>
    </div>

    <!-- 服务包 -->
    <div class="service-item">
      <div class="title"
           style="marginBottom:12px;">服务包</div>
      <div class="subTitle"><span>名称：</span>{{info.servicePackageName}}</div>
      <div class="service-line"></div>
      <div class="title"
           style="marginBottom:16px;">服务内容</div>
      <div class="equity">
        <div class="equity-item header">
          <div class="equity-item-label">服务内容</div>
          <div class="equity-item-value">次数</div>
        </div>
        <div class="equity-item"
             v-for="(equity,index) in info.equities"
             v-bind:key="index">
          <div class="equity-item-label">{{equity.equitiesName}}</div>
          <div class="equity-item-value">{{equity.totalNum}}次 <span v-if="canShowResidueNum">(<span v-bind:class="{'primary':equity.residueNum>0}"
                    v-on:click="gotoApply(equity)">剩余{{equity.residueNum}}次</span>)</span> </div>
        </div>
      </div>
      <div class="equity-tip"
           v-if="info.orderStatus==1||info.orderStatus==2">服务有效期：<span>{{info.effectiveDays}}天</span><span>（订单支付成功开始计算）</span></div>
      <div class="equity-tip"
           v-else>服务有效期：<span> {{info.serviceStartDate}} 至 {{info.serviceExpireDate}} </span></div>
      <template v-if="canShowPhoneBox">
        <div class="service-line"></div>
        <div class="phone"
             @click="callPhone">
          <van-image v-bind:src="require('@src/assets/images/ic_phone.png')"></van-image><span>联系客服</span>
        </div>
      </template>

    </div>

    <!-- 费用明细 -->
    <div class="service-item">
      <div class="service-item-content between money">
        <div class="service-item-content-lable">订单金额：</div>
        <div class="service-item-content-value">
          <peace-price v-bind:price="info.totalMoney"
                       v-bind:size="14"></peace-price>
        </div>
      </div>
      <!-- 订单金额  totalMoney  应付金额 orderMoney  实付金额 payMoney -->
      <div class="service-item-content between totalMoney">
        <div class="service-item-content-lable">{{!info.payTime?'应付金额：':'实付金额：'}}</div>
        <!-- payStatus 支付状态（1未支付3已支付4退款中5已退款 6退款失败-->
        <div class="service-item-content-value">
          <span v-if="info.payStatus==4">(退款中)</span>
          <span v-if="info.payStatus==5">(已退款)</span>
          <peace-price v-bind:price="!info.payTime?info.orderMoney :info.payMoney"
                       v-bind:size="16"></peace-price>
        </div>
      </div>
    </div>

    <!-- 订单流水 -->
    <div class="service-item">
      <div class="service-item-content">
        <div class="service-item-content-lable">订单编号：</div>
        <div class="service-item-content-value">{{info.orderNo}}</div>
      </div>
      <div class="service-item-content">
        <div class="service-item-content-lable">订单时间：</div>
        <div class="service-item-content-value">{{info.createdTime}}</div>
      </div>
      <div class="service-item-content"
           v-if="info.payInfo.payModeTxt&&info.payTime">
        <div class="service-item-content-lable">支付方式：</div>
        <div class="service-item-content-value">{{info.payInfo.paymentTypeTxt?info.payInfo.payModeTxt  +' - '+ info.payInfo.paymentTypeTxt: info.payInfo.payModeTxt }}</div>
      </div>
      <div class="service-item-content"
           v-if="info.payTime">
        <div class="service-item-content-lable">支付时间：</div>
        <div class="service-item-content-value">{{info.payTime}}</div>
      </div>
      <div class="service-item-content"
           v-if="info.cancelTime">
        <div class="service-item-content-lable">取消时间：</div>
        <div class="service-item-content-value">{{info.cancelTime}}</div>
      </div>
      <div class="service-item-content"
           v-if="info.completeTime">
        <div class="service-item-content-lable">完成时间：</div>
        <div class="service-item-content-value">{{info.completeTime}}</div>
      </div>
    </div>

    <div class="footer"
         v-if="canShowFooter">
      <div class="footer-left">
        <div class="count-down"
             v-if="info.orderStatus==1&&info.time>0">
          <van-count-down millisecond
                          @finish="finish"
                          :time="info.time"
                          format="mm:ss" />
        </div>
      </div>
      <div class="footer-right">
        <van-button round
                    class="btn cancel"
                    @click="cancel">取消订单</van-button>
        <peace-button round
                      class="btn pay"
                      @click="pay"
                      throttle
                      :throttleTime="3000"
                      v-if="info.orderStatus==1">继续支付</peace-button>
      </div>
    </div>

    <!-- 退费说明弹窗 -->
    <template>
      <RefundTip v-model="refundTipDialog.visible"
                 :divisionId="refundTipDialog.data.divisionId"></RefundTip>
    </template>
    <!-- 电话弹框 -->
    <template>
      <CallPhone v-model="phoneDialog.visible"
                 :phone="phoneDialog.data.phone"></CallPhone>
    </template>

  </div>
</template>

<script>
import peace from '@src/library'

import RefundTip from '@src/views/components/RefundTip'
import CallPhone from '@src/views/components/CallPhone'
import { Dialog } from 'vant'

const CONSTANT = {
  PAY_TYPE_TEXT: {
    wxpay: '自费支付微信',
    yibaopay: '医保',
    shangbaopay: '商保',
    servicePackage: '服务包'
  }
}
export default {
  name: 'user-servicePackage-detail',
  components: { RefundTip, CallPhone, [Dialog.Component.name]: Dialog.Component },
  data() {
    return {
      info: null,
      //是否已使用权益
      hasUsed: false,
      //是否已使用完权益
      hasUsedAll: false,
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      },
      refundTipDialog: {
        visible: false,
        data: {
          divisionId: ''
        }
      },
      enter_time: ''
    }
  },
  activated() {
    this.get()
  },
  created() {
    this.enter_time = new Date().getTime()
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy()
    next()
  },
  destroyed() {
    this.trackByLeave()
  },
  computed: {
    canApply() {
      return this.info?.orderStatus == 3
    },
    canShowResidueNum() {
      return this.info?.orderStatus == 3 || this.info?.orderStatus == 4
    },
    canShowRefundTip() {
      return this.info?.orderStatus == 2 && this.info?.payTime
    },
    canShowPhoneBox() {
      return this.phoneDialog?.data?.phone
    },
    canShowFooter() {
      return this.info?.orderStatus == 1 || (this.info?.orderStatus == 3 && !this.hasUsed)
    }
  },
  methods: {
    trackByLeave() {
      const params = {
        page_name: '购买服务包订单详情',
        organization_name: this.info.hospitalName,
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.globalPageStop(params)
    },
    trackByPayOrder() {
      const params = {
        organization_name: this.info.hospitalName,
        business_type: '服务包',
        order_id: this.info.orderNo,
        trigger_page: '订单详情',
        click_object: '继续支付',
        own_expense_pay_method: CONSTANT.PAY_TYPE_TEXT[this.info.paymentType]
      }
      peace.service.sensors.payOrder(params)
    },
    trackByCancelOrder() {
      const params = {
        page_name: '购买服务包订单详情',
        organization_name: this.info.hospitalName,
        business_type: '服务包',
        trigger_page: '订单详情',
        order_status_on_cancel: this.info.orderStatusTxt,
        click_object: '取消订单'
      }
      peace.service.sensors.cancelOrder(params)
    },
    gotoApply(item) {
      if (item.residueNum == 0 || this.info.servicePackageStatus == 4) {
        return
      }
      //1.7.0仅支持 在线问诊
      peace.service.servicePackage.doctorServiceManage({ doctorId: this.info.doctorId }).then((res) => {
        let isOpenImageService = false
        if (res.data && res.data.service && res.data.service.length > 0) {
          isOpenImageService = res.data.service.find((item) => item.toolType == 'image') ? true : false
        }
        if (isOpenImageService) {
          const json = peace.util.encode({
            doctorId: this.info.doctorId,
            consultingType: 'image',
            serviceType: 'inquiry',
            patientEquitiesId: item.patientEquitiesId,
            patientEquitiesName: item.equitiesName,
            servicePackageId: this.info.servicePackageId,
            servicePackageName: this.info.servicePackageName
          })
          this.$router.push(`/components/doctorInquiryApply/${json}`)
        } else {
          Dialog.confirm({
            title: '温馨提示',
            message: `医生已关闭图文问诊服务，${this.info.servicePackageName}权益暂不可用`,
            confirmButtonText: '知道了',
            showCancelButton: false
          })
        }
      })
    },
    //1待支付 2已取消 3服务中 4已完成
    getStatusText(status) {
      const dic = {
        1: '请在15分钟内完成支付，超时订单自动取消',
        2: this.info.cancelType == 1 ? '您取消了订单' : '超时未支付，系统自动取消订单',
        3: '服务包生效，您可以使用服务包啦！',
        4: this.info.servicePackageStatus == 4 ? '您的服务包已到期' : this.info.servicePackageStatus == 3 ? '您的服务包内容已用完' : ''
      }
      return dic[status]
    },
    finish() {
      if (!this.canShowFooter) return
      this.info.time = 0
      this.cancelOrder()
    },
    cancelOrder() {
      const params = {
        orderNo: this.info.orderNo,
        cancelType: 2,
        reason: ''
      }
      peace.service.servicePackage.applyCancel(params).then(() => {
        this.get()
      })
    },
    get() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.servicePackage.OrderDetail(params).then((res) => {
        res.data.time = (res.data.expireTime - res.data.currentTime) * 1000
        this.info = res.data
        this.phoneDialog.data.phone = this.info.serviceTel

        this.hasUsedAll = res.data.equities.find((item) => item.residueNum > 0) ? false : true
        this.hasUsed = res.data.equities.find((item) => item.residueNum != item.totalNum) ? true : false
      })
    },
    cancel() {
      this.trackByCancelOrder()
      if (this.info.cancelType) {
        this.applyCancel()
      } else {
        //第一次取消需要弹确认提示弹框

        Dialog.confirm({
          title: '温馨提示',
          message: '是否确定取消当前订单',
          confirmButtonText: '确定'
        }).then(() => {
          this.applyCancel()
        })
      }
    },
    applyCancel() {
      //1手动取消 2自动去下
      const params = {
        orderNo: this.info.orderNo,
        cancelType: 1,
        reason: this.info.orderStatus == 1 ? '' : '不想要了'
      }
      peace.service.servicePackage.applyCancel(params).then((res) => {
        peace.util.alert(res.msg)
        this.get()
      })
    },
    pay() {
      this.trackByPayOrder()
      let orderNo = this.info.orderNo
      peace.wx.pay({ orderNo }, null, this.get, this.get)
    },
    showRefundTip() {
      this.refundTipDialog.data.divisionId = this.info.divisionId
      this.refundTipDialog.visible = true
    },
    callPhone() {
      this.phoneDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.primary {
  color: $primary;
}
.service {
  min-height: 100%;
  background: rgba(51, 51, 51, 0.05);
  .service-item {
    padding: 16px;
    background: #fff;
    margin-bottom: 8px;
    &.flex {
      display: flex;
    }
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
      position: relative;
      padding-left: 12px;
      &::before {
        content: '';
        background: $primary;
        width: 4px;
        height: 16px;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .service-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      margin-bottom: 10px;
      .cancelTip {
        display: flex;
        align-items: center;
        .van-icon,
        .van-image {
          width: 12px;
          height: 12px;
          margin-left: 3px;
        }
        span {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 12px;
        }
      }
    }
    .service-text {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      span {
        color: $primary;
      }
    }

    .doctor-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #f5f5f5;
      margin-right: 16px;
    }
    .doctor-info {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .doctor-name {
      margin-bottom: 3px;
      span {
        &:not(:last-child) {
          margin-right: 8px;
        }
        &:first-child {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .subTitle {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      span {
        color: rgba(51, 51, 51, 0.6);
      }
    }

    .service-line {
      margin: 16px 0;
      height: 1px;
      background: rgba(51, 51, 51, 0.05);
    }

    .equity {
      border-top: 1px solid rgba(51, 51, 51, 0.05);
      border-left: 1px solid rgba(51, 51, 51, 0.05);
      .equity-item {
        line-height: 36px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        display: flex;
        &.header {
          font-weight: bold;
          background: rgb(245, 245, 245);
        }
        .equity-item-label,
        .equity-item-value {
          border-right: 1px solid rgba(51, 51, 51, 0.05);
          border-bottom: 1px solid rgba(51, 51, 51, 0.05);
          flex: 1;
          text-align: center;
        }
      }
    }
    .equity-tip {
      margin-top: 8px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 0.6);
      line-height: 24px;
      span {
        &:nth-child(1) {
          color: #333333;
        }
        &:nth-child(2) {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    .phone {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 0.6);
      line-height: 20px;
      .van-image {
        width: 12px;
        height: 12px;
        margin-right: 4px;
      }
    }

    .service-item-content {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 20px;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
      &.between {
        justify-content: space-between;
      }
      &.money {
        padding-bottom: 8px;
        border-bottom: 1px dashed rgba(51, 51, 51, 0.1);
      }
      &.totalMoney {
        font-size: 16px;
        font-weight: bold;
        .service-item-content-lable {
          color: #333;
        }
        .service-item-content-value {
          color: #ff3a30;
          > span {
            color: #333;
            font-size: 14px;
            font-weight: normal;
          }
        }
      }
      .service-item-content-lable {
        color: rgba(51, 51, 51, 0.6);
        margin-right: 8px;
      }
      .service-item-content-value {
        color: #333333;
      }
    }
  }

  .footer {
    width: 100%;
    height: 80px;
    background: #ffffff;
    box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 16px 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 666;
    .footer-left {
      .van-count-down {
        color: #ff3a30;
      }
    }
    .footer-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn {
        width: 88px;
        height: 32px;
        background: rgba(51, 51, 51, 0.05);
        border-radius: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        &.cancel {
          color: rgba(51, 51, 51, 0.6);
          margin-right: 16px;
        }
        &.pay {
          color: $primary;
        }
      }
    }
  }
}
</style>