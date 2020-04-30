<template>
  <div class="user-drug-logistics"
       v-if="data">
    <div class="box">
      <div class="card">
        <div class="card-avatar">
          <img :src="data.DrugStoreLogo" />
        </div>
        <div class="card-body">
          <div class="card-name"> {{ data.ords.length>0&&data.ords[0].Notes }}</div>
          <div class="card-small"
               style="word-break: break-all;">
            {{ data.ShippingMethod == '1' ? 
                 '【配送地址】' + data.Detailed + ',' + data.UserName + ',' + data.UserPhone : 
                 '【自提地址】' + data.DrugStoreDetailed
            }}
          </div>
          <div class="text">
            订单编号：{{data.OrderId}}
          </div>
          <div v-if="showTrackingNumber"
               class="text">
            运单编号：{{ PickUpCode }}
          </div>
          <!--          <div class="text"-->
          <!--               v-if="data.ShippingMethod == '1'">配送编号：无</div>-->
        </div>
      </div>

    </div>
    <div class="module">
      <div class="time-line">
        <div class="item"
             v-for="(item,index) in data.ords"
             :class="{ 'active' : index == 0 }"
             :key="item.Notes">
          <div class="time">
            <div class="y">{{ item.CreateTime.toDate().formatDate('M-dd') }}</div>
            <div class="s">{{ item.CreateTime.toDate().formatDate('HH:mm') }}</div>
          </div>
          <div class="text">
            <div class="status">{{item.Notes}}</div>
            <div class="note"
                 v-if="item.ServiceStates == '4'">
              {{ data.ShippingMethod == '0' ? '您在'+ data.DrugStoreName +'已自提' : '' }}
            </div>

            <div v-if="item.ServiceStates === '2' && orderStatus != 5 && shippingMethod === 0"
                 class="note">
              <div class="qr-btn"
                   :class="{ 'active' : index == 0 }"
                   @click="onClickSeeQRCode">
                查看取药码
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--二维码弹窗-->
    <QRCode :QRCodeURL="QRCodeURL"
            v-model="showQRCode"
            :PickUpCode="PickUpCode"></QRCode>
  </div>
</template>

<script>
import peace from '@src/library'
import QRCode from '@src/views/components/QRCode'

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
      ENUM,
      PickUpCode: '',
      data: undefined,
      shippingMethod: null,
      orderStatus: null,
      showQRCode: false,
      QRCodeURL: null
    }
  },
  components: { QRCode },
  computed: {
    showTrackingNumber() {
      const ShippingMethod = this.shippingMethod
      const OrderStatus = this.orderStatus
      if (ShippingMethod === undefined || OrderStatus === undefined) return false
      return ShippingMethod === ENUM.SHIPPING_METHOD.HOME && OrderStatus >= ENUM.ORDER_STATUS.SEND && this.PickUpCode
    }
  },

  created() {
    this.getLogistics()
  },

  methods: {
    onClickSeeQRCode() {
      this.showQRCode = true
    },
    //获取时间轴
    getLogistics() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.purchasedrug.SelectOrderStreamApi(params).then(res => {
        this.data = res.data
        this.getDrugOrderDetail()
      })
    },
    //调整获取订单状态、运单号、配送方式
    getDrugOrderDetail() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.purchasedrug.SelectOrderDetApi(params).then(res => {
        this.PickUpCode = res.data.PickUpCode
        this.orderStatus = res.data.OrderStatus
        this.shippingMethod = res.data.ShippingMethod
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qr-btn {
  margin-top: 3px;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #999;
  width: 78px;
  height: 26px;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  &.active {
    border-color: #00c6ae;
    color: #00c6ae;
  }
}

.card-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  img {
    width: 90%;
    height: 90%;
    border-radius: 2px;
  }
}
.user-drug-logistics {
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .module {
    flex: 1;
    margin: 0;
  }
}
.box {
  margin-top: 0;
}
.card {
  background: #fff;
  padding: 15px;
  margin: 0 0 10px 0;
  .card-name {
    font-size: 16px;
  }
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
  padding: 25px 0;

  .item {
    &:last-child {
      .text {
        border-left: 2px solid transparent;
      }
    }
  }
}
.time-line .item {
  display: flex;

  color: #999999;
  font-size: 16px;
}
.time-line .time {
  flex: 0 0 auto;
  // width: 60px;
  width: 20%;
  padding-right: 5.5%;
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
  min-height: 74px;
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
  width: 16px;
  height: 16px;
  right: -9px;
  background: #00c6ae;
}
.item.active .time {
  color: #000000;
}
.time-line .time .y {
  font-size: 16px;
  margin-top: -10px;
}
.time-line .text .status {
  margin-top: -10px;
}
.time .s,
.text .note {
  font-size: 13px;
}
</style>
