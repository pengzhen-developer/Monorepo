/**
 * 订单详情
 * @param {string} [paymentType='wxpay'] 支付类型
 *                                       可选：wxpay（微信） alipay（支付宝） yibaopay（医保支付）
 * 支付类型为yibaopay（医保支付）不显示倒计时和继续支付
 */

<template>
  <div class="user-drug-detail"
       v-if="order!=null">
    <div class="count-down"
         v-if="order.paymentType !== 'yibaopay' && order.OrderStatus == 0">
      订单
      <van-count-down millisecond
                      :time="time"
                      format="HH:mm:ss" /> 后将自动关闭
    </div>
    <div class="top"
         v-if="order.OrderStatusText">
      <!--tab^content-->
      <div class="content">
        <div class="order"
             @click="goDrugLogiPage">
          <div class="order-card">
            <div class="icon icon-status"
                 :class="{ [`icon-status-${ order.OrderStatus }`] : true }"></div>
            <div class="text">{{order.OrderStatusText + '  '}}</div>
            <div v-if="showQRCodeBtn"
                 class="btn-wrapper">
              <div @click.stop
                   class="btn--code"
                   @click="onClickSeeQRCode">查看取药码</div>
            </div>
            <div v-if="showTrackingNumber"
                 class="tracking-number">
              运单编号：{{ order ? order.PickUpCode : '' }}
            </div>
          </div>
          <div class="order-text"></div>
        </div>
        <div class="cancelText"
             v-if="order.OrderStatus == '5' && order.payMoney != 0 ">
          订单取消后退款将在1-3个工作日内原路返回，请注意查收
        </div>
        <div class="tab-content"
             v-if="order.ShippingMethod == '0'">
          <div class="addr-tit">取药地址</div>
          <div class="addr-p">{{order.DrugStoreDetailed}}</div>
        </div>
        <div class="tab-content"
             v-if="order.ShippingMethod == '1'">
          <div class="addr-tit">配送到家</div>
          <div class="userAddr">
            <div class="addr-p">收货人：{{order.UserName}}
              <div class="inline">{{order.UserPhone}}</div>
            </div>
            <div class="addr-p">{{order.Detailed}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="module"
         v-if="order.DrugStoreName">
      <div class="panel-pha">
        <div class="panel-head icon-next">
          <div class="head-ico">
            <img :src="order.DrugStoreLogo" />
          </div>
          <div class="head-tit">{{ order.DrugStoreName }}</div>
          <div class="head-more">
            <div class="label blue"
                 @click="goPrescripDetailPage">查看处方</div>
          </div>
        </div>
        <div class="panel-body">
          <div class="list-three"
               v-for="(item, index) in order.OrderDet"
               :key="index">
            <div class="list-icon"
                 :class="item.DrugImage ? '' : 'list-icon-none'">
              <img :src="item.DrugImage" />
            </div>
            <div class="list-content">
              <div class="content-title">{{item.DrugName}}</div>
              <div class="content-brief">{{item.DrugSpecification}}</div>
            </div>
            <div class="list-other">
              <div class="other-them"
                   @click="goInterDrugPage(item)">说明书</div>
              <div class="other-price">
                <div class="price">￥{{item.DrugPrice}}</div>
                x{{item.DrugNumber}}
              </div>
            </div>
          </div>
          <div class="module intro">
            <div class="dl-packet">
              <div class="dt">配送方式:</div>
              <div class="dd">{{order.ShippingMethod == '0' ? '到店取药': '配送到家'}}</div>
            </div>
            <div class="dl-packet"
                 v-if="order.ShippingMethod == '1'">
              <div class="dt">配送费:</div>
              <div class="dd">￥{{order.Freight.toString().toFixed(2)}}</div>
            </div>
            <div class="dl-packet">
              <div class="dt">优惠金额:</div>
              <div class="dd">￥{{order.PromotionsCut.toString().toFixed(2)}}</div>
            </div>
            <div class="dl-packet">
              <div class="dt">订单总价:</div>
              <div class="dd">￥{{(order.TotalAmount+order.Freight-order.PromotionsCut).toString().toFixed(2)}}</div>
            </div>
          </div>
          <div class="module str"
               v-if="order.OrderStatus != 0">
            <div class="dl-packet">
              <div class="dt">实付金额:</div>
              <div class="dd">
                <div class="strong">￥{{order.payMoney.toString().toFixed(2)}}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="box"
         v-if="order.OrderId">
      <div class="dl-packet"
           style="padding-top:3px;">
        <div class="dt">订单编号：</div>
        <div class="dd">{{order.OrderId}}</div>
        <div class="cancel-btn"
             @click="canselOrder"
             v-if="(order.OrderStatus == '3' || order.OrderStatus == '2') && order.ShippingMethod == '0'">取消订单</div>
      </div>
      <div class="dl-packet"
           :key="index"
           v-for="(item,index) in order.ords">
        <div class="dt">{{timeTags[order.ShippingMethod][parseInt(item.ServiceStates)]||'支付时间'}}：</div>
        <div class="dd">{{item.CreateTime}}</div>
      </div>

      <!-- 0未付款  1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)-->
      <div class='bottom-1'
           v-if="order.OrderStatus == 0">
        <div class="left">应付金额：<span class="money">¥{{ curPayMoney }}</span></div>
        <div class="right">
          <div v-if="order.paymentType === 'yibaopay'">
            待药店联系您进行医保支付
          </div>

          <div @click="canselOrder"
               class="pay cancel"
               v-if="order.paymentType !== 'yibaopay' && order.OrderStatus == '0'"
               style="background: #fff; border: 1px solid #CCCCCC;color: #999;">
            取消订单
          </div>

          <div @click="payOrder(order)"
               class="pay"
               v-if="order.paymentType !== 'yibaopay' && order.OrderStatus == '0'"
               style="background: #00C6AE; ">
            继续支付
          </div>
        </div>
      </div>

      <div class="bottom"
           v-else>
        <div @click="canselOrder"
             class="btn block btn-blue"
             v-if="order.paymentType !== 'yibaopay' && order.OrderStatus == '0' || order.OrderStatus == '1' || order.OrderStatus == '2'"
             style="background: #fff; border: 1px solid #CCCCCC;color: #999;">
          取消订单
        </div>

        <div @click="submitOrder"
             class="btn block btn-blue"
             v-if="order.OrderStatus == '3'">
          {{order.ShippingMethod == '1' ? '确认签收' : '确认取药' }}
        </div>

        <div class="btn block btn-default"
             v-if="order.OrderStatus == '4' || order.OrderStatus == '6'">
          {{order.ShippingMethod == '1' ? '已签收' : '已自提'}}
        </div>

        <div class="btn block btn-default"
             v-if="order.OrderStatus == '5'">
          已取消
        </div>
      </div>
    </div>

    <peace-dialog :visible.sync="recipeDetail.visible">
      <TheRecipe :data="recipeDetail.data"></TheRecipe>
    </peace-dialog>
    <van-overlay :show="showQRCode"
                 @click="showQRCode = false">
      <div class="wrapper">
        <div @click.stop
             class="qr-code-wrapper">
          <div class="qr-code-area">
            <!--有二维码-->
            <div v-if="QRCodeURL"
                 class="qr-code">
              <div class="title">取药码</div>
            </div>
            <!--没有二维码-->
            <div v-if="!QRCodeURL"
                 class="qr-code qr-code--empty">
              <div class="title">取药码</div>
              <img class="img-qr-code-empty"
                   :src="require('@src/assets/images/qrcode-empty.png')"
                   alt="" />
              <div class="context">暂无二维码</div>
              <div class="info">请使用取药码进行取药</div>
            </div>
          </div>
          <img :src="require('@src/assets/images/message-line.png')"
               alt=""
               style="display: block; margin: -1px 0;">
          <div class="text-area">
            取药码：{{ order ? order.PickUpCode : '' }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import peace from '@src/library'
import TheRecipe from '@src/views/components/TheRecipe'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)

const ENUM = {
  SHIPPING_METHOD: {
    SELF: 0,
    HOME: 1
  },
  // 0待支付  1已下单 2已接单 3 已备药/已发货 4已自提/已签收 5已取消 6已完成
  ORDER_STATUS: {
    NOT_PAY: 0,
    PAID: 1,
    ACCEPT: 2,
    SEND: 3,
    SIGNED: 4,
    CANCEL: 5,
    COMPLETE: 6
  }
}

export default {
  components: {
    TheRecipe
  },

  data() {
    return {
      ENUM,

      time: 0,
      orderId: '',
      // ServiceStates 0创建时间 -1用户完成支付 2接单时间 3发货时间 4收货时间 5取消时间 6完成时间
      timeTags: {
        [ENUM.SHIPPING_METHOD.SELF]: ['创建时间', '', '接单时间', '备药时间', '收货时间', '取消时间', '完成时间'],
        [ENUM.SHIPPING_METHOD.HOME]: ['创建时间', '', '接单时间', '发货时间', '收货时间', '取消时间', '完成时间']
      },
      appid: '',
      order: null,
      showQRCode: false,
      QRCodeURL: null,

      recipeDetail: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    curPayMoney() {
      const order = this.order
      const payMoney = order.TotalAmount + order.Freight - order.PromotionsCut
      return payMoney.toFixed(2)
    },

    showQRCodeBtn() {
      const ShippingMethod = this.order.ShippingMethod
      const OrderStatus = this.order.OrderStatus
      if (ShippingMethod === undefined || OrderStatus === undefined) return false
      return (
        ShippingMethod === ENUM.SHIPPING_METHOD.SELF &&
        OrderStatus >= ENUM.ORDER_STATUS.ACCEPT &&
        OrderStatus !== ENUM.ORDER_STATUS.CANCEL
      )
    },
    showTrackingNumber() {
      const ShippingMethod = this.order.ShippingMethod
      const OrderStatus = this.order.OrderStatus
      if (ShippingMethod === undefined || OrderStatus === undefined) return false
      return (
        ShippingMethod === ENUM.SHIPPING_METHOD.HOME &&
        OrderStatus >= ENUM.ORDER_STATUS.SEND &&
        OrderStatus !== ENUM.ORDER_STATUS.CANCEL
      )
    }
  },

  created() {
    this.getDrugOrderDetail()
  },
  mounted() {
    // if (this.$route.query.code) {
    //   let code = this.$route.query.code
    //   let orderNo = this.$route.query.orderId
    //   let params = { code, orderNo }
    //   peace.service.index.GetWxLoginStatus(params).then(res => {
    //     let data = res.data
    //     peace.wx.payInvoke(data, this.payCallback)
    //   })
    // }
  },
  methods: {
    onClickSeeQRCode() {
      this.showQRCode = true
    },

    payCallback() {
      // let orderId = ''
      // if (this.$route.query.orderId) {
      //   //授权跳转后回调
      //   orderId = this.$route.query.orderId
      // } else {
      //   //直接回调
      //   orderId = this.orderId
      // }
      // const json = peace.util.encode({ OrderId: orderId })
      this.getDrugOrderDetail()
      // this.$router.replace(`/order/userDrugDetail/${json}`)
    },
    payOrder(order) {
      let orderNo = order.OrderId
      this.orderId = order.OrderId
      let params = { orderNo }
      peace.wx.pay(params, null, this.payCallback, this.payCallback, '?' + 'orderId=' + orderNo)
    },
    getDrugOrderDetail() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.purchasedrug.SelectOrderDetApi(params).then(res => {
        //防止 Freight  PromotionsCut 无此字段
        res.data.Freight = res.data.Freight || 0
        res.data.PromotionsCut = res.data.PromotionsCut || 0
        this.order = res.data
        if (this.order.expireTime > this.order.currentTime) {
          this.time = (this.order.expireTime - this.order.currentTime) * 1000
        }
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
      const shippingMethod = this.order.ShippingMethod
      const orderStatus = this.order.OrderStatus
      const json = peace.util.decode(this.$route.params.json)
      json.shippingMethod = shippingMethod
      json.orderStatus = orderStatus
      json.PickUpCode = this.order.PickUpCode
      const afterJson = peace.util.encode(json)

      this.$router.push(`/order/userDrugLogistics/${afterJson}`)
    },

    canselOrder() {
      const params = peace.util.decode(this.$route.params.json)
      let resTxt = ''
      if (this.order.OrderStatus == 0) {
        resTxt = '取消订单后药房将不再为您预留药品。是否取消订单？'
      } else {
        resTxt = '取消订单后药房将不再为您预留药品, 所付款项将在1-3个工作日内原路返回，是否取消订单？'
      }
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.CancelOrder(params).then(res => {
          peace.util.alert(res.msg)
          this.getDrugOrderDetail()
        })
      })
    },

    submitOrder() {
      const params = peace.util.decode(this.$route.params.json)
      let resTxt = this.order.ShippingMethod
        ? '收到药品确认无误后再确认收货，以免造成损失'
        : '收到药品确认无误后再确认取药，以免造成损失'
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.ConfirmReceipt(params).then(res => {
          peace.util.alert(res.msg)
          this.getDrugOrderDetail()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .qr-code-wrapper {
    width: 250px;
    border-radius: 5px;

    .qr-code-area {
      width: 100%;
      background-color: #fff;

      display: flex;
      align-items: center;
      justify-content: center;

      .qr-code {
        width: 100%;
        height: 100%;
        font-size: 16px;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        .title {
          margin: 0.42rem 0;
        }
      }

      img {
        display: block;
      }

      .qr-code--empty {
        font-size: 15px;
        color: #000;

        .title {
          margin: 0.42rem 0;
        }

        .img-qr-code-empty {
          width: 118px;
          height: 100px;
          margin-bottom: 0.26rem;
          display: block;
        }

        .context {
          margin-bottom: 0.1rem;
        }

        .info {
          margin-bottom: 0.42rem;
          font-size: 12px;
          color: #ccc;
        }
      }
    }

    .text-area {
      height: 50px;
      width: 100%;
      background-color: #fff;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.user-drug-detail {
  height: 100%;
  background: #f5f5f5;
  .cancelText {
    height: 45px;
    background: rgba(240, 252, 250, 1);
    border-radius: 2px;
    margin: 10px 15px 0 15px;
    font-size: 12px;
    color: rgba(0, 198, 174, 1);
    line-height: 16px;
    padding: 6px 10px 0px 50px;
    background: rgba(240, 252, 250, 1) url('../../../assets/images/icons/ic_notice.png') no-repeat;
    background-size: 17px 17px;
    background-position: 20px 13px;
  }
  .count-down {
    width: 100%;
    height: 36px;
    line-height: 36px;
    background: #fefceb url('../../../assets/images/icons/count-down.png') no-repeat;
    background-size: 20px 20px;
    background-position: 10px 7px;
    padding-left: 40px;
    color: #f96a0e;
    font-size: 14px;
    .van-count-down {
      display: inline-block;
      color: #f96a0e;
      font-size: 14px !important;
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
  padding: 10px 15px;
}
.tab-content .addr-tit {
  font-size: 15px;
  position: relative;
  padding-left: 24px;
}
.tab-content .addr-tit::before {
  content: '';
  position: absolute;
  position: absolute;
  left: 2px;
  top: 3px;
  width: 14px;
  height: 17px;
  background-size: 100% 100%;
  background-image: url(data:image/png;base64,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);
}
.tab-content .addr-p {
  font-size: 16px;
  color: #333;
  margin: 5px 0;
  font-weight: 700;
  position: relative;
}
/*panel-pha*/
.panel-pha {
  background: #fff;
}
.panel-pha .panel-head {
  padding: 10px 15px;
  border-bottom: 1px solid #e5e5e5;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*.panel-head.icon-next::before{*/
/*    content: '';*/
/*    position: absolute;*/
/*    width: 12px;*/
/*    height: 22px;*/
/*    display: block;*/
/*    right: 0;*/
/*    top: 0;*/
/*}*/
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
  img {
    width: 90%;
    height: 90%;
    border-radius: 2px;
  }
}
.panel-head .head-tit {
  flex: 1;
  color: #333333;
  font-size: 15px;
  border-radius: 2px;
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.panel-pha .panel-body {
  padding: 10px 15px;
}
.intro,
.dl-packet .dd,
.dl-packet .dt {
  padding: 3px 0;
}

.dl-packet .dd {
  color: #4e4e4e;
}
.dl-packet {
  position: relative;
}
.dl-packet .cancel-btn {
  color: #999;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 2px;
  line-height: 25px;
  height: 27px;
  text-align: center;
  width: 70px;
}
.str {
  border-top: 1px solid #e5e5e5;
  padding-top: 10px;
}
.str .dt {
  color: #333333;
  font-size: 14px;
  line-height: 2.8;
}
.str .dd {
  font-size: 12px;
  color: #999;
}
.str .strong {
  color: #ff344d;
  font-size: 20px;
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
  background-image: url('../../../assets/images/icons/toolfk-img.jpg');
}
.tab-content .block {
  font-size: 15px;
  color: #00c6ae;
  text-align: center;
  margin: 10px;
}
.userAddr {
  // padding-right: 20px;
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
  background-image: url('../../../assets/images/icons/arrow-right.jpg');
}
.addr-p .inline {
  float: right;
}
.list-other .other-them {
  position: relative;
  padding-right: 14px;
}
.list-other .other-them::after {
  content: '?  ';
  position: absolute;
  width: 10px;
  height: 10px;
  line-height: 1;
  background: #00c6ae;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  top: 5px;
  right: 0;
  text-align: center;
}
.list-icon.list-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url('../../../assets/images/icons/nocontent.jpg');
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
  .money {
    font-size: 20px;
    color: rgba(255, 52, 77, 1);
  }
  .right {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .pay {
    width: 75px;
    height: 30px;
    background: rgba(0, 198, 174, 1);
    border-radius: 2px;
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    &.cancel {
      border: 1px solid rgba(204, 204, 204, 1);
      background: #fff;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.box .dl-packet,
.bottom {
  padding: 0 10px;
}

.bottom {
  padding: 10px;
}

.box {
  margin: 10px 0 0 0;
  background: #fff;
}
.box .dl-packet .dd {
  color: #999999;
  text-align: left;
}
.order {
  box-sizing: border-box;
  width: 220px;
  margin: 10px auto;
}
.order-card {
  text-align: center;

  .tracking-number {
    font-size: 12px;
    color: #aaa;
  }

  .btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn--code {
      color: #00c6ae;
      padding: 0.16rem 0.38rem;
      border: 1px solid #00c6ae;
      border-radius: 5px;
    }
  }
}
.order-card .icon {
  width: 38px;
  height: 38px;
}
.order-card .icon::before {
  content: '';
  width: 38px;
  height: 38px;
}
.order-card .text {
  position: relative;
  color: #000;
  font-size: 15px;
  padding: 8px;
}
.order-card .text::after {
  content: ' ';
  position: absolute;
  top: 14px;
  margin-left: 5px;
  width: 7px;
  height: 12px;
  color: rgb(90, 90, 90);
  background-size: cover;
  background-image: url('../../../assets/images/icons/ic_more.png');
}
/*0未付款 1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)*/
.icon-status-0::before,
.icon-status-1::before {
  content: '';
  background-image: url('../../../assets/images/icons/icon-status-0.jpg');
}
.icon-status-2::before,
.icon-status-7::before {
  content: '';
  background-image: url('../../../assets/images/icons/icon-status-2.jpg');
}
.icon-status-3::before {
  content: '';
  background-image: url('../../../assets/images/icons/icon-status-3.jpg');
}
.icon-status-4::before,
.icon-status-6::before,
.icon-status-8::before,
.icon-status-5::before {
  content: '';
  background-image: url('../../../assets/images/icons/icon-status-4.jpg');
}
</style>
