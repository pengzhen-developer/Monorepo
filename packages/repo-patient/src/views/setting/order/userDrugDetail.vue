<template>
  <div class="user-drug-bg"
       :style="{'padding-bottom':canShowBtnBox &&canShowCountDown?'96px':'60px'}"
       v-if="order">
    <div class="warn-tip"
         v-if="order&&order.callOrderStatus==ENUM.ORDER_STATUS.已备药_已发货||order.callOrderStatus==ENUM.ORDER_STATUS.待下单">
      <img :src="require('@src/assets/images/warn.png')">
      <span v-if="order.callOrderStatus==ENUM.ORDER_STATUS.已备药_已发货">{{order.shippingMethod ==ENUM.SHIPPING_METHOD.配送到家?'药品为特殊商品，一经售出不退不换。请确认药品完好无损之后再签收。':'药品为特殊商品，一经售出不退不换。请确认药品完好无损之后再取走药品。'}}</span>
      <span v-if="order.callOrderStatus==ENUM.ORDER_STATUS.待下单">药品为特殊商品，一经售出不退不换</span>
    </div>
    <div class="user-drug-detail"
         v-if="order != null">
      <div class="top"
           v-if="order.callOrderStatusTxt">
        <!--tab^content-->

        <div class="order"
             @click="goDrugLogiPage">
          <div class="order-card">
            <div class="icon icon-status"
                 :class="{ [`icon-status-${ order.callOrderStatus }`] : true }"></div>
            <div class="text">{{order.callOrderStatusTxt + '  '}}</div>
            <div class="cancel-tip"
                 v-if="order.callOrderStatus==ENUM.ORDER_STATUS.已取消 &&order.cancelReason">{{order.cancelReason}}</div>
            <div v-if="showQRCodeBtn"
                 class="btn-wrapper">
              <div @click.stop
                   class="btn--code"
                   @click="onClickSeeQRCode">查看取药码</div>
            </div>
          </div>
          <div class="order-text"></div>
        </div>
        <div class="cancelText"
             v-if="order.callOrderStatus ==ENUM.ORDER_STATUS.已取消 && order.payMoney != 0 ">
          订单取消后退款将在1-3个工作日内原路返回，请注意查收
        </div>
        <div class="divider"></div>
        <div class="tab-content">
          <div class="addr-tit">{{order.shippingMethodTxt}}</div>
          <div class="userAddr">
            <div class="addr-p">{{order.consigneeAddress}}</div>
            <div class="addr-user">
              <span>{{order.consignee}}</span>
              <span>{{order.tel}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="module"
           v-if="order.drugStoreName">
        <div class="panel-pha">
          <div class="panel-head">
            <div class="head-ico"
                 @click="goDrugPhaHomePage">
              <van-image :src="order.drugStoreLogo"></van-image>
            </div>
            <div class="head-tit"
                 @click="goDrugPhaHomePage">{{ order.drugStoreName }}</div>
            <div class="head-ico-arrow"
                 :class="{'icon-next':isCloudPharmacy==false}"></div>
            <div class="head-Rp"
                 @click="goPrescripDetailPage">查看处方
            </div>
          </div>
          <div class="panel-body">
            <div class="list-three"
                 v-for="(item, index) in order.drugJson"
                 :key="index">
              <div class="list-icon">
                <van-image :src="item.DrugImage"
                           class="error--image">
                  <template v-slot:error>
                    <img :src="require('@src/assets/images/icons/ic_none_drug.png')" />
                  </template>
                </van-image>
              </div>
              <div class="list-content">
                <div class="content-title">{{item.DrugName}}</div>
                <div class="content-brief">{{item.DrugSpecification}}</div>
              </div>
              <div class="list-other">
                <div class="other-them"
                     @click="goInterDrugPage(item)">
                  <span>说明书</span>
                  <van-image :src="require('@src/assets/images/ic_wenhao.png')"></van-image>
                </div>
                <div class="other-price">
                  <div class="price">¥{{item.DrugUnitPrice}}</div>
                  x{{item.DrugQty}}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="module box"
           v-if="order.orderNo">
        <div class="dl-packet">
          <div class="dt">订单编号：</div>
          <div class="dd">{{order.orderNo}}</div>
          <!-- 待下单状态的取消订单在底部 已接单 -->
          <div class="cancel-btn"
               @click="canselOrder"
               v-if="canShowCancelTop">取消订单</div>
        </div>
        <div class="dl-packet">
          <div class="dt">订单时间：</div>
          <div class="dd">{{order.purchaseDrugOrderStreams.length>0&&order.purchaseDrugOrderStreams[0].createdTime||order.createdTime}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">配送方式：</div>
          <div class="dd">
            {{order.shippingMethod == ENUM.SHIPPING_METHOD.到店取药 ? '到店取药': '配送到家'}}
          </div>
        </div>
        <div class="dl-packet">
          <div class="dt">支付方式：</div>
          <div class="dd">
            {{ order.paymentTypeTxt }}</div>
        </div>
        <template v-for="(stream,index) in order.purchaseDrugOrderStreams">
          <div class="dl-packet"
               :key="index"
               v-if="stream.status>0">
            <div class="dt">
              {{stream.timeStatusTxt}}:
            </div>
            <div class="dd">{{stream.createdTime}}</div>
          </div>
        </template>
        <div class="dl-packet"
             v-if="order.refundTime">
          <div class="dt">退款时间：</div>
          <div class="dd">
            {{ order.refundTime }}</div>
        </div>
      </div>
      <div class="module intro"
           v-if="order.moneyRecord&&order.moneyRecord.length>1">
        <div class="dl-packet"
             v-for="(item,index) in order.moneyRecord"
             :key="index">
          <div class="dt">{{item.name}}</div>
          <div class="dd">
            {{item.value}}
          </div>
        </div>
      </div>
      <div class="module intro"
           v-else>
        <div class="dl-packet">
          <div class="dt">订单总额</div>
          <div class="dd">
            ¥{{order.totalMoney.toFixed(2)}}
          </div>
        </div>
      </div>

      <div class="module str"
           v-if="canShowPayMoney">
        <div class="dl-packet">
          <div class="dt">
            {{canShowPayway?'实付金额:':'应付金额:'}}
          </div>
          <div class="dd">
            <div class="strong">
              ¥{{canShowPayway ?order.payMoney.toString().toFixed(2) : curPayMoney}}
              <span class="refunded"
                    v-if="order.paymentType !== ENUM.PAYMENT_TYPE.医保支付&&order.refundTime">(已退款)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="module phone"
           v-if="canShowPhoneBox"
           @click="callPhone">
        <van-image :src="require('@src/assets/images/ic_call_default.png')"></van-image>
        <span>联系客服</span>
      </div>
      <div class="count-down"
           v-if="canShowCountDown">
        <span>订单 </span>
        <van-count-down millisecond
                        @finish="finishHander()"
                        :time="time"
                        format="mm:ss" /> 后将自动关闭
      </div>

      <div class='bottom-1'
           :class="order.callOrderStatus !== ENUM.ORDER_STATUS.待下单&&'other'"
           v-if="canShowBtnBox">
        <template v-if="canShowApplyBtn">
          <div @click="changeInvoiceModel"
               class="btn block btn-blue">
            申请发票
          </div>
        </template>
        <template v-if="order.callOrderStatus !== ENUM.ORDER_STATUS.待下单">
          <div @click="submitOrder"
               class="btn block btn-blue"
               v-if="canShowReceive">
            确认取药
          </div>

          <div @click="submitOrder"
               class="btn block btn-blue"
               v-if="canShowSign">
            确认收货
          </div>
        </template>
        <template v-else>
          <div class="left">
            应付金额：<span class="money">¥{{ curPayMoney }}</span></div>
          <div class="right">
            <div v-if="order.paymentType === ENUM.PAYMENT_TYPE.医保支付">
              待药店联系您进行医保支付
            </div>

            <van-button class="pay cancel"
                        round
                        v-if="canShowCancel"
                        @click="canselOrder">取消订单</van-button>
            <peace-button class="pay"
                          @click="payOrder(order)"
                          v-if="canShowPay"
                          round
                          type="primary"
                          throttle
                          :throttleTime="3000">
              立即支付
            </peace-button>
          </div>
        </template>
      </div>

      <peace-dialog :visible.sync="recipeDetail.visible">
        <TheRecipe :data="recipeDetail.data"></TheRecipe>
      </peace-dialog>
      <template>
        <QRCode :QRCodeURL="QRCodeURL"
                v-model="showQRCode"
                :PickUpCode="PickUpCode"></QRCode>
      </template>

      <!-- 发票弹窗 -->
      <template>
        <InvoiceModel v-model="showInvoiceModel"
                      :receiptNumber="order.divisionId"></InvoiceModel>
      </template>

      <!-- 电话弹框 -->
      <template>
        <CallPhone v-model="phoneDialog.visible"
                   :phone="phoneDialog.data.phone"></CallPhone>
      </template>

      <!-- H5支付回跳确认弹窗 -->
      <template>
        <PayCallback v-model="cbDialog.visible"
                     :money="cbDialog.data.money"
                     @H5PayCallback="H5PayCallback"></PayCallback>
      </template>

      <!-- 取消申请发票提示 -->
      <template>
        <ApplyForInvoice v-model="invoiceDialog.visible"
                         :message="invoiceDialog.data.message"></ApplyForInvoice>
      </template>
    </div>
  </div>

</template>

<script>
import peace from '@src/library'
import TheRecipe from '@src/views/components/TheRecipe'
import QRCode from '@src/views/components/QRCode'
import InvoiceModel from '@src/views/components/InvoiceModel'
import CallPhone from '@src/views/components/CallPhone'
import PayCallback from '@src/views/components/PayCallback'
import ApplyForInvoice from '@src/views/components/ApplyForInvoice'

import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)
import { Dialog } from 'vant'
Vue.use(Dialog)
const ENUM = {
  SHIPPING_METHOD: {
    到店取药: 0,
    配送到家: 1
  },

  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保卡支付: 'yibaopay',
    货到付款: 'deliverypay',
    到店支付: 'shoppay'
  },

  // 处方共享平台 - 订单状态
  // 0 待下单
  // 1 已下单
  // 2 已接单
  // 3 已备药/已发货
  // 4 已自提/已签收
  // 5 已取消
  // 6 已完成
  ORDER_STATUS: {
    待下单: 0,
    已下单: 1,
    已接单: 2,
    已备药_已发货: 3,
    已自提_已签收: 4,
    已取消: 5,
    已完成: 6
  },

  //订单支付状态
  //1：待支付
  //2：已取消
  //3：已付款
  //4：退款中
  //5：已退款
  PAY_STASUS: {
    待支付: 1,
    已取消: 2,
    已付款: 3,
    退款中: 4,
    已退款: 5
  },
  /**CustomerType 机构类型：0是医院，10是药店，20是JNT运营,30连锁药店，40分院，50云药房,60对接机构 */
  DRUG_STORE_TYPE: {
    医院: 0,
    药店: 10,
    JNT运营: 20,
    连锁药店: 30,
    分院: 40,
    云药房: 50,
    对接机构: 60
  },
  /** isShowCancelButton 0不显示1显示 */
  CANCEL_BUTTON_STATUS: {
    不显示: 0,
    显示: 1
  }
}

export default {
  name: 'UserDrugDetail',
  components: {
    TheRecipe,
    QRCode,
    InvoiceModel,
    CallPhone,
    PayCallback,
    ApplyForInvoice
  },

  data() {
    return {
      ENUM,
      time: 0,
      orderId: '',
      // ServiceStates 0创建时间 -1用户完成支付 2接单时间 3发货时间 4收货时间 5取消时间 6完成时间
      order: null,
      showQRCode: false,
      QRCodeURL: null,
      PickUpCode: null,
      showInvoiceModel: false,
      phaInfo: null,
      recipeDetail: {
        visible: false,
        data: {}
      },
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      },
      invoiceDialog: {
        visible: false,
        data: {}
      },
      cbDialog: {
        visible: false,
        data: {
          money: ''
        }
      },
      refreshTimer: null
    }
  },

  computed: {
    currentStatus() {
      return this.order?.callOrderStatus
    },
    //是否显示应付金额  微信支付 ： 待支付为应付 其他的为实付
    //payStatus 1：待支付 2：已取消 3：已付款  4：退款中  5：已退款
    canShowPayway() {
      return (this.order && this.order.payStatus >= ENUM.PAY_STASUS.已付款) || this.order.payTime
    },
    //医保划扣
    canShowYibao() {
      return this.order?.medicalMoney ? true : false
    },
    // 商保划扣
    canShowShangbao() {
      //H5暂无商保对接
      return false
    },
    // 优惠
    canShowDiscount() {
      //当前迭代暂无优惠活动
      return false
    },
    //互医暂无法得知医保支付结果，订单详情显示【支付方式】【应付金额】（即使未支付）
    showByYiBao() {
      return this.order && this.order.payTime == '' && this.order.callOrderStatus > ENUM.ORDER_STATUS.待下单
    },

    // 是否显示取消订单
    canShowCancel() {
      return this.order && this.order.callOrderStatus === ENUM.ORDER_STATUS.待下单
    },
    //是否显示取消订单 - top

    canShowCancelTop() {
      return (
        this.order &&
        (this.order.callOrderStatus === ENUM.ORDER_STATUS.已下单 ||
          this.order.callOrderStatus === ENUM.ORDER_STATUS.已接单 ||
          (this.order.shippingMethod == ENUM.SHIPPING_METHOD.到店取药 && this.order.callOrderStatus === ENUM.ORDER_STATUS.已备药_已发货))
      )
    },
    isCloudPharmacy() {
      return this.order.CustomerType === ENUM.DRUG_STORE_TYPE.云药房
    },
    canShowPhoneBox() {
      return this.phoneDialog?.data?.phone
    },
    // 是否显示继续支付
    canShowPay() {
      return this.order && this.order.callOrderStatus === ENUM.ORDER_STATUS.待下单
    },

    // 是否显示倒计时
    canShowCountDown() {
      return this.order && this.order.callOrderStatus === ENUM.ORDER_STATUS.待下单 && this.time > 0
    },

    // 是否显示应付金额
    canShowPayMoney() {
      return this.order && this.order.callOrderStatus !== ENUM.ORDER_STATUS.待下单
    },
    canShowBtnBox() {
      return (
        (this.order && this.order.callOrderStatus !== ENUM.ORDER_STATUS.待下单 && (this.canShowReceive || this.canShowSign || this.canShowApplyBtn)) ||
        this.order.callOrderStatus === ENUM.ORDER_STATUS.待下单
      )
    },
    // 是否显示确认取药
    canShowReceive() {
      return this.order && this.order.shippingMethod == ENUM.SHIPPING_METHOD.到店取药 && this.order.callOrderStatus == ENUM.ORDER_STATUS.已自提_已签收
    },

    // 是否显示确认签收
    canShowSign() {
      return this.order && this.order.shippingMethod == ENUM.SHIPPING_METHOD.配送到家 && this.order.callOrderStatus == ENUM.ORDER_STATUS.已自提_已签收
    },
    //是否显示申请发票
    canShowApplyBtn() {
      return (
        this.order &&
        (this.order.callOrderStatus === ENUM.ORDER_STATUS.已备药_已发货 ||
          this.order.callOrderStatus === ENUM.ORDER_STATUS.已自提_已签收 ||
          this.order.callOrderStatus === ENUM.ORDER_STATUS.已完成) &&
        this.order.divisionId
      )
    },
    curPayMoney() {
      const payMoney = this.order.orderMoney
      return payMoney.toFixed(2)
    },

    showQRCodeBtn() {
      const ShippingMethod = this.order.shippingMethod
      const callOrderStatus = this.order.callOrderStatus
      if (ShippingMethod === undefined || callOrderStatus === undefined) return false
      return ShippingMethod === ENUM.SHIPPING_METHOD.到店取药 && callOrderStatus >= ENUM.ORDER_STATUS.已接单 && callOrderStatus !== ENUM.ORDER_STATUS.已取消
    },
    showTrackingNumber() {
      const ShippingMethod = this.order.shippingMethod
      const callOrderStatus = this.order.callOrderStatus
      if (ShippingMethod === undefined || callOrderStatus === undefined) return false
      return (
        ShippingMethod === ENUM.SHIPPING_METHOD.配送到家 && callOrderStatus >= ENUM.ORDER_STATUS.已备药_已发货 && callOrderStatus !== ENUM.ORDER_STATUS.已取消
      )
    }
  },

  activated() {
    this.getDrugOrderDetail()
  },
  created() {
    const tradeType = peace.util.decode(this.$route.params.json)?.tradeType
    if (tradeType && this.currentStatus != ENUM.ORDER_STATUS.已下单) {
      this.cbDialog.visible = true
    }
  },
  methods: {
    callPhone() {
      this.phoneDialog.visible = true
    },
    goDrugPhaHomePage() {
      //云药房不跳转店铺详情
      if (this.isCloudPharmacy) {
        return
      }
      const json = peace.util.encode({
        drugStoreName: this.order.drugStoreName,
        drugStoreLogo: this.order.drugStoreLogo,
        businessHours: this.order.businessHours,
        contractTel: this.order.contractTel,
        storeDetailsImgs: this.order.storeDetailsImgs,
        storeAddress: this.order.storeAddress
      })
      this.$router.push(`/drug/drugPhaHome/${json}`)
    },
    changeInvoiceModel() {
      this.showInvoiceModel = true
    },
    onClickSeeQRCode() {
      this.showQRCode = true
    },
    finishHander() {
      //canceType   1手动取消2自动取消
      const params = {
        canceType: 2,
        orderNo: this.order.orderNo
      }
      peace.service.purchasedrug.CancelOrder(params).finally(() => {
        this.getDrugOrderDetail()
      })
    },
    H5PayCallback() {
      this.refreshOrder()
    },
    refreshOrder() {
      let n = 0
      this.refreshTimer = setInterval(() => {
        n = n + 1
        if (this.currentStatus != ENUM.ORDER_STATUS.已下单 && n < 10) {
          this.getDrugOrderDetail('hideLoad')
        } else {
          clearInterval(this.refreshTimer)
          this.refreshTimer = null
        }
      }, 1000)
    },
    payCallback() {
      this.getDrugOrderDetail()
    },
    payOrder(order) {
      let orderNo = order.orderNo
      peace.wx.pay({ orderNo }, null, this.payCallback, this.payCallback)
    },

    getDrugOrderDetail(type = '') {
      const params = peace.util.decode(this.$route.params.json)
      if (type == 'hideLoad') {
        params.hideLoad = true
      }
      peace.service.purchasedrug.SelectOrderDetApi(params).then((res) => {
        this.order = res.data
        this.PickUpCode = res.data.expressNo
        this.QRCodeURL = res.data.QRCodeURL
        this.cbDialog.data.money = this.order.orderMoney.toFixed(2)
        this.phoneDialog.data.phone = res.data.tel
        if (this.order.expireTime > this.order.currentTime) {
          this.time = this.order.expireTime - this.order.currentTime
        }
        if (this.order.purchaseDrugOrderStreams.length > 0) {
          this.order.purchaseDrugOrderStreams.map((item, index) => {
            /**拼接 运单编号 */
            if (item.status == 3 && this.showTrackingNumber) {
              return this.order.purchaseDrugOrderStreams.splice(index, 1, item, { createdTime: this.order.expressNo, status: 9, timeStatusTxt: '运单编号' })
            }
          })
        }

        //H5支付返回- 缓存处方id 点击返回回到处方详情
        peace.cache.set('h5.prescribeId', this.order.prescribeId)
      })
    },
    goInterDrugPage(item) {
      const params = peace.util.encode({ name: item.DrugName })
      this.$router.push(`/inter/drugInterList/${params}`)
    },

    goPrescripDetailPage() {
      const params = peace.util.encode({
        prescribeId: this.order.prescribeId,
        showDetailButton: false
      })

      this.$router.push(`/components/theRecipe/${params}`)
    },

    goDrugLogiPage() {
      const afterJson = peace.util.encode({ orderNo: this.order.orderNo })
      this.$router.push(`/order/userDrugLogistics/${afterJson}`)
    },
    //申请取消订单-跳页面
    cancelOrderByNext() {
      //取消状态时间轴
      //1. cancelList.length==0 未发起申请
      //2. cancelList.length>0    cancelStatus  1取消申请2取消成功3取消失败
      //canceType   1手动取消2自动取消
      const params = {
        canceType: 1,
        orderNo: this.order.orderNo
      }
      if (this.order.cancelList.length == 0) {
        this.$router.push(`/drug/drugCancelOrderBefore/${params}`)
      } else {
        this.$router.push(`/drug/drugCancelOrder/${params}`)
      }
    },
    //申请取消订单-当前页面
    cancelOrderByCurrent() {
      const params = peace.util.decode(this.$route.params.json)
      let resTxt = ''
      if (this.order.callOrderStatus == 0) {
        resTxt = '取消订单后药房将不再为您预留药品。是否取消订单？'
      } else {
        resTxt = '取消订单后药房将不再为您预留药品, 所付款项将在1-3个工作日内原路返回，是否取消订单？'
      }
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug
          .CancelOrder(params)
          .then((res) => {
            peace.util.alert(res.msg)
            this.getDrugOrderDetail()
          })
          .catch((res) => {
            if (res.data.code == '202') {
              this.invoiceDialog.visible = true
              this.invoiceDialog.data.message = res.data.msg
            }
          })
      })
    },
    canselOrder() {
      const status = this.order.callOrderStatus
      const divisionId = this.order.divisionId //北辰医院his对接不需要跳转页面发起申请
      if (status == ENUM.ORDER_STATUS.待下单 || (status !== ENUM.ORDER_STATUS.待下单 && divisionId)) {
        this.cancelOrderByCurrent()
      } else {
        this.cancelOrderByNext()
      }
    },

    submitOrder() {
      const params = peace.util.decode(this.$route.params.json)
      let resTxt = this.order.shippingMethod ? '收到药品确认无误后再确认收货，以免造成损失' : '收到药品确认无误后再确认取药，以免造成损失'
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.ConfirmReceipt(params).then((res) => {
          peace.util.alert(res.msg)
          this.getDrugOrderDetail()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warn-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 16px;
  background: rgba(254, 252, 235, 1);
  img {
    width: 16px;
    height: 16px;
    display: block;
    margin-right: 12px;
  }
  span {
    color: rgba(249, 106, 14, 1);
    font-size: 12px;
    line-height: normal;
  }
}
.head-ico {
  .van-image {
    width: 90%;
    height: 90%;
    border-radius: 2px;
    overflow: hidden;
  }
}
.head-more {
  .label {
    border-radius: 4px;
  }
}
.refunded {
  font-size: 13px;
  color: #999;
  font-weight: 400;
}
.pay {
  width: 7.2em;
  height: 30px;
  background: rgba(0, 198, 174, 1);
  font-size: 13px;
  color: rgba(255, 255, 255, 1);
  margin-left: 10px;
  &.cancel {
    border: 1px solid rgba(204, 204, 204, 1);
    background: #fff;
    color: rgba(153, 153, 153, 1);
  }
}
.divider {
  height: 1px;
  width: 100%;
  border-top: 4px dashed #e5e5e5;
  transform: scaleY(0.25);
  margin-bottom: 8px;
}
.user-drug-bg {
  min-height: 100%;
  background: #f9f9f9;
}
.user-drug-detail {
  min-height: 100%;
  background: #f9f9f9;
  padding: 10px;
  .cancelText {
    height: 45px;
    background: rgba(240, 252, 250, 1);
    border-radius: 2px;
    font-size: 12px;
    color: rgba(0, 198, 174, 1);
    line-height: normal;
    padding: 0 10px 0 45px;
    display: flex;
    align-items: center;
    background: rgba(240, 252, 250, 1) url('~@src/assets/images/icons/ic_notice.png') no-repeat;
    background-size: 17px 17px;
    background-position: 15px 14px;
    margin-bottom: 12px;
  }
  > .module {
    border-radius: 3px;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 10px;
    &.phone {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 12px;
      padding: 10px 15px;
      .van-image {
        width: 14px;
        height: 14px;
        margin-right: 4px;
        cursor: pointer;
      }
    }
  }
}

.icon {
  &::before {
    position: relative;
    width: 160px;
    height: 100px;
  }
}
.top,
.container {
  background: #fff;
}
.top {
  margin: 0 0 10px 0;
  overflow: hidden;
  padding: 12px 15px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab {
  width: 214px;
  margin: 10px auto;
  border: 1px solid #00c6ae;
}

.tab-item.active {
  background: #00c6ae;
  color: #fff;
}

.tab-content {
  width: 100%;
}
.tab-content .addr-tit {
  font-size: 14px;
  position: relative;
  padding-left: 24px;
  color: #333;
  font-weight: 600;
}
.tab-content .addr-tit::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 16px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/ic_position.png');
}
.tab-content .addr-p {
  font-size: 13px;
  color: #333;
  margin: 5px 0;
  font-weight: 600;
  position: relative;
  width: 100%;
}
.addr-p.icon-next {
  padding-right: 12px;
}
.addr-p.icon-next::after {
  content: '';
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 6px;
  height: 12px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/icon-next.jpg');
}
.addr-user {
  font-size: 12px;
  color: #666;
  span + span {
    margin-left: 5px;
  }
}
/*panel-pha*/
.panel-pha {
  background: #fff;
}
.panel-pha .panel-head {
  padding: 9px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel-head .head-ico {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-image,
  img {
    width: 90%;
    height: 90%;
    border-radius: 2px;
    overflow: hidden;
  }
}
.panel-head .head-tit {
  color: #333333;
  font-size: 14px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 62%;
}
.head-ico-arrow {
  position: relative;
  flex: 1;
  min-width: 7px;
}
.head-ico-arrow.icon-next::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 12px;
  display: block;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-size: cover;
}
.head-Rp {
  color: #999;
  font-size: 12px;
  height: 23px;
  line-height: normal;
  border: 1px solid #eee;
  padding: 0 10px;
  border-radius: 15px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.panel-pha .panel-body {
  padding: 0 15px;
}
.intro {
  padding: 8px 15px;
}

.intro .dl-packet .dt,
.intro .dl-packet .dd {
  font-size: 13px;
  padding: 2px 0;
}
.dl-packet .dd,
.dl-packet .dt {
  padding: 3px 0;
}
.intro .dl-packet .dt {
  min-width: 30%;
}
.dl-packet .dt {
  min-width: 70px;
  font-size: 12px;
}
.dl-packet .dd {
  color: #4e4e4e;
  font-size: 12px;
}
.dl-packet {
  position: relative;
}
.dl-packet .cancel-btn {
  color: #999;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 25px;
  line-height: normal;
  height: 25px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.str {
  padding: 3px 15px;
}
.str .dt {
  color: #333333;
  font-size: 14px;
  line-height: 2.8;
}
.str .dd {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.str .strong {
  color: #ff344d;
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
}
.bottom .btn {
  margin: 5px 0;
}
.bottom .tips-bottom {
  text-align: center;
}
.icon-add {
  width: 15px;
  height: 15px;
  background-size: cover;
  background-image: url('~@src/assets/images/icons/toolfk-img.jpg');
}
.tab-content .block {
  font-size: 15px;
  color: #00c6ae;
  text-align: center;
  margin: 10px;
}
.userAddr {
  position: relative;
}
.userAddr.icon-next::after {
  content: '';
  position: absolute;
  display: block;
  top: 4px;
  right: 0;
  width: 12px;
  height: 22px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/arrow-right.jpg');
}

.list-three .list-other {
  flex: 0 1 65px;
  width: 65px;
  display: flex;
  flex-direction: column;
  text-align: right;
}
.list-three:last-child {
  border-bottom-width: 0px;
}
.list-other .other-them {
  .van-image {
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }
  span {
    line-height: 12px;
  }
}
.list-icon .van-image {
  border-radius: 2px;
  overflow: hidden;
}
.count-down {
  position: fixed;
  bottom: 60px;
  left: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #fefceb;
  color: #f96a0e;
  font-size: 14px;
  .van-count-down {
    display: inline-block;
    color: #f96a0e;
    font-size: 14px !important;
  }
}
.bottom-1 {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;

  &.other {
    height: 69px;
  }
  .money {
    font-size: 20px;
    color: rgba(255, 52, 77, 1);
  }
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    .money {
      margin-left: 5px;
      font-weight: bold;
    }
  }
  .right {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .btn {
    width: 100%;
    height: 45px;
    border-radius: 45px;
    margin: 0;
    box-shadow: 0px 1px 10px 0px rgba(0, 198, 174, 0.3);
    &:nth-child(2) {
      margin-left: 15px;
    }
  }
}
.box .dl-packet {
  padding: 0 15px;
  &:first-child {
    padding-top: 8px;
  }
  &:last-child {
    padding-bottom: 8px;
  }
}

.bottom {
  padding: 10px;
}

.box {
  border-radius: 3px;
  overflow: hidden;
}
.box .dl-packet .dd {
  color: #999999;
  text-align: left;
}
.order {
  box-sizing: border-box;
  width: 100%;
}
.order-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  .cancel-tip {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(58, 58, 58, 0.4);
    line-height: 16px;
    margin-bottom: 10px;
    margin-top: -5px;
    text-align: center;
  }
  .tracking-number {
    font-size: 12px;
    color: #aaa;
  }

  .btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    .btn--code {
      line-height: normal;
      color: #00c6ae;
      padding: 3px 14px;
      border: 1px solid #00c6ae;
      border-radius: 30px;
    }
  }
}

.order-card .text {
  position: relative;
  color: #000;
  font-size: 15px;
  padding: 8px;
  margin-bottom: 4px;
}
.order-card .text::after {
  content: ' ';
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  right: -3px;
  width: 6px;
  height: 10px;
  color: #ddd;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/ic_more.png');
}
.order-card .icon {
  width: 38px;
  height: 38px;
  position: relative;
}
.order-card .icon::before {
  content: '';
  width: 38px;
  height: 38px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-size: contain;
  background-repeat: no-repeat;
}

/*0未付款 1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)*/
.icon-status-0::before,
.icon-status-1::before {
  content: '';
  background-image: url('~@src/assets/images/icons/icon-status-0.jpg');
}
.icon-status-2::before,
.icon-status-7::before {
  content: '';
  background-image: url('~@src/assets/images/icons/icon-status-2.jpg');
}
.icon-status-3::before {
  content: '';
  background-image: url('~@src/assets/images/icons/icon-status-3.jpg');
}
.icon-status-4::before,
.icon-status-6::before,
.icon-status-8::before,
.icon-status-5::before {
  content: '';
  background-image: url('~@src/assets/images/icons/icon-status-4.jpg');
}
</style>
