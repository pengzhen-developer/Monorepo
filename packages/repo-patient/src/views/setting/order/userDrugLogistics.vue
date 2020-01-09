<template>
  <div class="user-drug-logistics"
       v-if="data">
    <div class="box">
      <div class="card">
        <div class="card-avatar">
          <img :src="data.DrugStoreLogo" />
        </div>
        <div class="card-body">
          <div class="card-name"> {{ data.ords[0].Notes }}</div>
          <div class="card-small">
            {{data.ShippingMethod == '1' ? '【配送地址】' + data.Detailed + ',' + data.UserName + ',' + data.UserPhone
                    : '【自提地址】' + data.DrugStoreDetailed}}
          </div>
          <div class="text">
            订单编号：{{data.OrderId}}
          </div>
          <div
            v-if="showTrackingNumber"
            class="text"
          >
            运单编号：{{ pickUpCode }}
          </div>
          <div class="text"
               v-if="data.ShippingMethod == '1'">配送编号：无</div>
        </div>
      </div>

    </div>
    <div class="module">
      <div class="time-line">
        <div class="item"
             v-for="item in data.ords"
             :class="{ 'active' : item.ServiceStates === '4' }"
             :key="item.Notes">
          <div class="time">
            <div class="y">{{ item.CreateTime.toDate().formatDate('MM-dd') }}</div>
            <div class="s">{{ item.CreateTime.toDate().formatDate('HH:mm') }}</div>
          </div>
          <div class="text">
            <div class="status">{{item.Notes}}</div>
            <div class="note"
                 v-if="item.ServiceStates == '4'">
              {{ data.ShippingMethod == '0' ? '您在'+ data.DrugStoreName +'已自提' : '' }}
            </div>
            <div
              v-if="item.ServiceStates === '3' && shippingMethod === 0"
              class="note"
            >
              <div
                class="qr-btn"
                @click="onClickSeeQRCode(item)"
              >
                查看取药码
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--二维码弹窗-->
    <van-overlay
      :show="showQRCode"
      @click="showQRCode = false"
    >
      <div class="overlay-wrapper">
        <div
          @click.stop
          class="qr-code-wrapper">
          <div class="qr-code-area">
            <!--有二维码-->
            <div
              v-if="QRCodeURL"
              class="qr-code"
            >
              <div class="title">取药码</div>
            </div>
            <!--没有二维码-->
            <div
              v-if="!QRCodeURL"
              class="qr-code qr-code--empty"
            >
              <div class="title">取药码</div>
              <img
                class="img-qr-code-empty"
                :src="require('@src/assets/images/qrcode-empty.png')"
                alt=""
              >
              <div class="context">暂无二维码</div>
              <div class="info">请使用取药码进行取药</div>
            </div>
          </div>
          <!--          <div class="message-line"></div>-->
          <div
            class="text-area"
          >
            取药码：{{ pickUpCode }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import peace from '@src/library'

const ENUM = {
  SHIPPING_METHOD: {
    SELF: 0,
    HOME: 1
  },
  // 0未付款  1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)
  ORDER_STATUS: {
    NOT_PAY: 0,
    PAID: 1,
    ACCEPT: 2,
    SEND: 3,
    SIGNED: 4,
    CANCEL: 5,
    SELF: 6,
    PACKAGE: 7,
    COMPLETE: 8
  }
}

export default {
  data() {
    return {
      ENUM,

      data: undefined,
      shippingMethod: null,
      orderStatus: null,
      showQRCode: null,
      QRCodeURL: null,
    }
  },

  computed: {
    showTrackingNumber() {
      const ShippingMethod = this.shippingMethod
      const OrderStatus = this.orderStatus
      if (ShippingMethod === undefined || OrderStatus === undefined) return false
      return ShippingMethod === ENUM.SHIPPING_METHOD.HOME
        && OrderStatus >= ENUM.ORDER_STATUS.SEND
    },
  },

  created() {
    this.getLogistics()
  },

  methods: {
    onClickSeeQRCode(order) {
      this.pickUpCode = order.pickUpCode
      this.showQRCode = true
    },

    getLogistics() {
      const params = peace.util.decode(this.$route.params.json)
      this.shippingMethod = params.shippingMethod
      this.orderStatus = params.orderStatus

      peace.service.purchasedrug.SelectOrderStreamApi(params).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .qr-btn {
    margin-top: 3px;
    border: 1px solid #00c6ae;
    border-radius: 5px;
    color: #00c6ae;
    width: 78px;
    height: 26px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay-wrapper {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    .qr-code-wrapper {
      width: 250px;
      background-color: #fff;
      border-radius: 5px;

      .message-line {
        width: 100%;
        height: 1px;
        border-top: 1px dashed #eee;
        position: relative;

        &::before {
          content: '';
          width: 0.37333rem;
          height: 0.37333rem;
          border-radius: 50%;
          left: -0.18667rem;
          top: -0.18667rem;
          position: absolute;
          display: block;
          background: #f2f2f2;
        }

        &::after {
          content: '';
          width: 0.37333rem;
          height: 0.37333rem;
          border-radius: 50%;
          right: -0.18667rem;
          top: -0.18667rem;
          position: absolute;
          display: block;
          background: #f2f2f2;
        }
      }

      .qr-code-area {
        width: 100%;
        border-bottom: 1px solid #eee;

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
            margin: .42rem 0;
          }
        }

        .qr-code--empty {
          font-size: 15px;
          color: #000;

          .title {
            margin: .42rem 0;
          }

          .img-qr-code-empty {
            width: 118px;
            height: 100px;
            margin-bottom: .26rem;
          }

          .context {
            margin-bottom: .1rem;
          }

          .info {
            margin-bottom: .42rem;
            font-size: 12px;
            color: #ccc;
          }
        }
      }
      .text-area {
        height: 50px;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }


.card-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90%;
    height: 90%;
    border-radius: 2px;
  }
}
.user-drug-logistics {
  height: 100%;
  background: #f5f5f5;
}
.box {
  margin-top: 0;
}
.card {
  background: #fff;
  padding: 5px;
  margin: 0 0 10px 0;
}
.module {
  background: #fff;
  padding: 5px;
  margin: 0 0 10px 0;
}
.card .text {
  color: #999;
  padding-top: 5px;
  font-size: 13px;
}
.time-line {
  padding: 25px 5px;

  .item {
    &:last-child {
      .text {
        border-left: 2px solid transparent;
      }
    }
  }
}
.time-line .item {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  color: #999999;
  font-size: 16px;
}
.time-line .time {
  flex: 0 0 auto;
  width: 60px;
  padding-right: 20px;
  position: relative;
  text-align: right;
}
.time-line .item:last-child .text {
  min-height: 20px;
}
.time-line .text {
  border-left: 2px solid #d8d8d8;
  padding-left: 15px;
  flex: 1;
  min-height: 82px;
}
.time-line .time::after {
  content: '';
  position: absolute;
  right: -6px;
  top: -5px;
  background: #d8d8d8;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.item.active .text {
  color: #00c6ae;
}
.time-line .item.active .time::after {
  content: '';
  width: 18px;
  height: 18px;
  right: -9px;
  background: #00c6ae;
}
.item.active .time {
  color: #000000;
}
.time-line .time .y {
  font-size: 14px;
  margin-top: -10px;
}
.time-line .text .status {
  margin-top: -10px;
}
.time .s,
.text .note {
  font-size: 12px;
}
</style>
