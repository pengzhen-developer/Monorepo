/**
 * 订单列表
 * @param {string} [paymentType='wxpay'] 支付类型
 *                                       可选：wxpay（微信） alipay（支付宝） yibaopay（医保支付）
 * 支付类型为yibaopay（医保支付）不显示倒计时和继续支付
 */

<template>
  <div class="user-drug-list">
    <div class="tab">
      <div @click="changeTab('0')"
           class="tab-item"
           :class="{ active: tabIndex == '0' }">
        <div class="span">全部</div>
      </div>
      <div @click="changeTab('6')"
           class="tab-item"
           :class="{ active: tabIndex == '6' }">
        <div class="span">已完成</div>
      </div>
    </div>

    <template v-if="loaded && drugList.length==0">
      <div class="none-page">
        <div class="icon icon_none_drugOrder"></div>
        <div class="none-text">暂无订单</div>
      </div>
    </template>

    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="get"
              class="content">
      <template v-for="item in drugList">

        <div class="panel"
             :key="item.orderNo">
          <div class="panel-head">
            <div class="card-strip">
              <div class="avatar">
                <van-image :src="item.drugStoreLogo"
                           class="avatar-cicular"></van-image>
              </div>
              <div class="strip-info">
                <div>{{item.drugStoreName}}</div>
              </div>
              <div :class="{ [`color-a${item.callOrderStatus}`] : true }"
                   class="strip-eye">
                {{item.callOrderStatusTxt}}
              </div>
            </div>
          </div>
          <div class="panel-body"
               @click="goUserDrugDetailPage(item)"
               style="padding-top: 0">
            <div class="card-imgs"
                 v-if="item.drugJson && item.drugJson.length">
              <div class="imgs-item"
                   v-for="det in item.drugJson"
                   :key="det.DrugImage">
                <div class="item-icon">
                  <!-- <img :src="det.DrugImage"
                       v-if="det.DrugImage" /> -->
                  <van-image :src="det.DrugImage"
                             class="error--image">
                    <template v-slot:error>
                      <img :src="require('@src/assets/images/icons/ic_none_drug.png')" />
                    </template>
                  </van-image>
                </div>
              </div>
            </div>
            <div class="small">
              <div class="small-time">{{item.createdTime}}</div>
              <div class="small-price default">
                共{{item.totalNumber}}件药品 合计：
                <span class="b">￥{{item.orderMoney.toString().toFixed(2) }}</span>
              </div>
            </div>
            <div class="small"
                 v-if="item.refundTime">
              <div class="small-price refund">{{'已退款：￥' + item.orderMoney.toString().toFixed(2)}}
              </div>
            </div>
          </div>
          <!-- 0未付款 1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)-->
          <!-- <template v-if="!( item.callOrderStatus == '0')"> -->
          <div class="panel-bottom"
               v-if="item.callOrderStatus != 5">
            <div class="count-down"
                 v-if=" item.callOrderStatus == '0'&&item.time>0">
              <span>订单关闭倒计时：</span>
              <van-count-down millisecond
                              @finish="finishHander(item)"
                              :time="item.time"
                              format="mm:ss" />
            </div>
            <van-button class="label blue"
                        @click="onClickSeeQRCode(item)"
                        v-if="checkQRCodeBtn(item)">取药码</van-button>
            <!-- <van-button lass="label gary"
                    v-if=" item.callOrderStatus == '1' || item.callOrderStatus == '2' || item.callOrderStatus == '0'"
                    @click="canselOrder(item)">
                  取消订单
                </van-button> -->
            <peace-button class="label blue-full"
                          v-if=" item.callOrderStatus == '0'"
                          @click="payOrder(item)"
                          throttle
                          :throttleTime="3000">继续支付</peace-button>
            <van-button class="label blue"
                        v-if="canShowApplyBtn(item)"
                        @click="changeInvoiceModel(item)">
              申请发票
            </van-button>
            <van-button class="label blue"
                        v-if="ifShowLogistics(item)"
                        @click="goDrugLogiPage(item)">查看物流
            </van-button>
            <van-button class="label blue"
                        v-if="item.callOrderStatus == '4' && item.shippingMethod != '0'"
                        @click="submitOrder(item)">确认收货
            </van-button>
            <van-button class="label blue"
                        v-if="item.callOrderStatus == '4' && item.shippingMethod == '0'"
                        @click="submitOrder(item)">确认取药
            </van-button>
          </div>
          <!-- </template> -->
        </div>
      </template>
    </van-list>

    <!-- <div class="bottom">客服电话：4009020365</div> -->
    <!--二维码弹窗-->
    <QRCode :QRCodeURL="QRCodeURL"
            v-model="showQRCode"
            :PickUpCode="pickUpCode"></QRCode>

    <!-- 发票弹窗 -->
    <InvoiceModel v-model="showInvoiceModel"
                  :receiptNumber="receiptNumber"></InvoiceModel>

  </div>
</template>

<script>
import peace from '@src/library'
import QRCode from '@src/views/components/QRCode'
import InvoiceModel from '@src/views/components/InvoiceModel'
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
  data() {
    return {
      tabIndex: '0',
      currentOrderId: '',
      drugList: [],
      // 控制二维码弹窗显示
      showQRCode: false,
      pickUpCode: null,
      QRCodeURL: null,
      //发票弹框
      showInvoiceModel: false,
      receiptNumber: '',
      model: {
        p: 0,
        size: 10,
        callOrderStatus: 0
      },
      loading: false,
      finished: false,
      loaded: false,
      ENUM,
      timer: null
    }
  },

  components: { QRCode, InvoiceModel },

  activated() {
    this.get('init')
  },

  methods: {
    finishHander(item) {
      //cancelType   1手动取消2自动取消
      const params = { orderNo: item.orderNo, cancelType: 2 }
      peace.service.purchasedrug.CancelOrder(params).finally(() => {
        this.get('init')
      })
    },
    canShowApplyBtn(item) {
      return (
        (item.callOrderStatus == this.ENUM.ORDER_STATUS.COMPLETE ||
          item.callOrderStatus == this.ENUM.ORDER_STATUS.SIGNED ||
          item.callOrderStatus == this.ENUM.ORDER_STATUS.SEND) &&
        item.divisionId
      )
    },
    ifShowLogistics(item) {
      return item.shippingMethod === this.ENUM.SHIPPING_METHOD.HOME && item.expressNo
    },

    checkQRCodeBtn(order) {
      const shippingMethod = order.shippingMethod
      const OrderStatus = order.callOrderStatus
      if (shippingMethod === undefined || OrderStatus === undefined) return false
      return shippingMethod === ENUM.SHIPPING_METHOD.SELF && OrderStatus >= ENUM.ORDER_STATUS.ACCEPT && OrderStatus !== ENUM.ORDER_STATUS.CANCEL
    },

    onClickSeeQRCode(order) {
      this.pickUpCode = order.pickUpCode
      this.QRCodeURL = order.QRCodeURL
      this.showQRCode = true
    },

    changeTab(item) {
      this.tabIndex = item
      this.get('init')
    },
    changeInvoiceModel(item) {
      this.showInvoiceModel = true
      this.receiptNumber = item.divisionId
    },
    get(type = '') {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.getDrugList(type)
          this.timer = null
        }, 300)
      }
    },
    getDrugList(type = '') {
      if (type == 'init') {
        this.model.p = 0
        this.drugList = []
        this.finished = false
        this.loaded = false
      }
      this.model.p++
      this.model.callOrderStatus = this.tabIndex
      peace.service.purchasedrug.SelectOrderListApi(this.model).then((res) => {
        res.data.list.map((item) => {
          if (item.expireTime > item.currentTime) {
            item.time = item.expireTime - item.currentTime
          }
        })
        this.drugList = this.drugList.concat(res.data.list)
        this.loading = false
        this.loaded = true
        if (res.data.list.length == 0 || this.p * this.size >= res.data.total) {
          this.finished = true
        }
      })
    },

    goUserDrugDetailPage(item) {
      const json = peace.util.encode({ orderNo: item.orderNo })
      this.$router.push(`/order/userDrugDetail/${json}`)
    },
    payOrder(item) {
      let orderNo = item.orderNo
      this.currentOrderId = item.orderNo
      let params = { orderNo }
      peace.wx.pay(params, null, this.payCallback, null, '?' + 'orderId=' + orderNo)
    },
    payCallback() {
      let orderId = ''
      if (this.$route.query.orderId) {
        //授权跳转后回调
        orderId = this.$route.query.orderId
      } else {
        //直接回调
        orderId = this.currentOrderId
      }
      const json = peace.util.encode({ orderNo: orderId })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    },
    canselOrder(item) {
      //canceType   1手动取消2自动取消
      const params = { orderNo: item.orderNo, canceType: 1 }
      let resTxt = ''
      if (item.callOrderStatus == 0) {
        resTxt = '取消订单后药房将不再为您预留药品。是否取消订单？'
      } else {
        resTxt = '取消订单后药房将不再为您预留药品, 所付款项将在1-3个工作日内原路返回，是否取消订单？'
      }
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.CancelOrder(params).then((res) => {
          peace.util.alert(res.msg)
          this.get('init')
        })
      })
    },

    goDrugLogiPage(item) {
      const json = {}
      json.orderNo = item.orderNo
      const params = peace.util.encode(json)

      this.$router.push(`/order/userDrugLogistics/${params}`)
    },

    submitOrder(item) {
      const params = { orderNo: item.orderNo }
      let resTxt = item.shippingMethod ? '收到药品确认无误后再确认收货，以免造成损失' : '收到药品确认无误后再确认取药，以免造成损失'
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.ConfirmReceipt(params).then((res) => {
          peace.util.alert(res.msg)
          this.get('init')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay-container {
    width: 80%;
    height: 151px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 23px 45px;
  }
  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    line-height: 21px;
  }
  .overlay-botton {
    color: #ccc;
    > a {
      color: $primary;
    }
  }
}
.count-down {
  display: flex;
  flex: 1;
  color: #333;
  .van-count-down {
    color: #333;
  }
  span {
    font-size: 13px;
  }
}
.overlay-wrapper {
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

.user-drug-list {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  color: #999;
  min-height: 100%;
}

.tab {
  margin: 0 0 10px 0;
  padding: 5px;
  height: 40px;
  .tab-item {
    height: 30px;
  }
}
.content {
  // flex: 1;
  // overflow: auto;
}
.none-page {
  flex: 1;
  height: 100%;
  background-color: #fff;
}

.icon.icon_none_drugOrder {
  margin: 0;
}

.box {
  margin: 0;
  padding: 10px 15px;
}
.box-tab {
  display: flex;
  justify-content: space-between;

  background: #fff;
  box-shadow: 0 0 5px rgba(204, 204, 204, 0.5);
  padding: 15px 10px;
  box-sizing: border-box;
  border-radius: 15px;
}
.box-tab .tab-item {
  flex: 1;
  text-align: center;
  position: relative;
  border-left: 1px solid $-color--line;
  height: 30px;
}
.box-tab .tab-item:first-child {
  border-left: none;
}
.box-tab .tab-item .span {
  /*display: inline-block;*/
  text-align: center;
  color: #333;
  font-size: 15px;
  padding-left: 12px;
}
.box-tab .tab-item .span.red::after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  background: #f2223b;
  border-radius: 50%;
  top: -4px;
  left: 0rpx;
}
.icon-referral::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-size: cover;
  display: block;
  left: -20px;
  top: -2px;
  background-image: url('../../../assets/images/icon-referral.jpg');
}
.icon-consultGroup::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-size: cover;
  display: block;
  left: -20px;
  top: -2px;
  background-image: url('../../../assets/images/icon-consultGroup.jpg');
}
.bottom {
  color: #999;
  text-align: center;
  font-size: 13px;
  box-sizing: border-box;
  padding-bottom: 15px;
}
.panel {
  padding: 0;
  box-shadow: none;
}
.content .panel:first-child {
  margin-top: 0;
}
.panel .panel-head,
.panel .panel-body,
.panel .panel-bottom {
  padding: 10px 15px;
}
.panel .panel-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.panel .panel-bottom .time {
  flex: 1 0 auto;
  /*width: 140px;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-strip {
  display: flex;
  font-size: 15px;
  align-items: center;
}
.card-strip .avatar {
  box-sizing: border-box;
  flex: 0 0 30px;
  height: 30px;
  margin-right: 10px;
  background: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-strip .avatar .van-image {
  width: 90%;
  height: 90%;
  border-radius: 2px;
  overflow: hidden;
}

.strip-info {
  flex: 1;
  color: #000;
  > div {
    max-width: 210px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.strip-eye {
  flex: 0 0 auto;
  color: #999;
  text-align: right;
}
/* color-x: 问诊单状态，
 * color-ax 购药单状态
 * 1: 待接单 2:已接单 3:已发货 4:已完成
*/
/*red*/
.strip-eye.color-1,
.strip-eye.color-2,
.strip-eye.color-a0,
.strip-eye.color-a1,
.strip-eye.color-a2 {
  color: #fb2828;
}
/*blue*/
.strip-eye.color-3,
.strip-eye.color-a3 {
  color: #00c6ae;
}
.gary {
  color: #999;
  border-color: #ddd;
}
.blue-full {
  background: #00c6ae;
  color: #fff;
  border: none;
}
.code {
  display: block;
  font-size: 13px;
  padding: 11px 9px;
  background-color: #fafafa;
  border: 1px solid #f3f3f3;
  color: #000;
}

/**/
.small {
  display: flex;
  padding-top: 10px;
  color: #999;
  font-size: 12px;
  align-items: flex-end;
}
.small .small-time {
  flex: 0 0 auto;
  width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-type {
  flex: 0 0 auto;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-price {
  flex: 1;
  width: 155px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 1);
  &.refund {
    color: #999;
  }
  .b {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
}
.label {
  height: 30px;
  font-size: 13px;
  padding: 0px 12px;
  margin-left: 10px;
  border-radius: 15px;
}
.label.label-private {
  font-size: 8px;
  padding: 1px 4rpx;
  border-radius: 2px;
  color: #f7e9b3;
  background: #504c4f;
  border-color: #504c4f;
  vertical-align: text-top;
  margin-top: 2px;
}
</style>
