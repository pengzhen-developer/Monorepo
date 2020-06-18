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
        </div>
      </div>
    </div>
    <div class="module"
         v-if="!loading">
      <div class="time-line ">
        <van-loading></van-loading>
      </div>
    </div>
    <div class="module"
         v-if="data.ShippingMethod == '1'&&loading">
      <div class="time-line express"
           v-if="expressList.length>0">
        <div class="item"
             v-for="(item,index) in expressList"
             :class="{ 'active' : index == 0 }"
             :key="index">
          <div class="time"
               :class="!item.isChild&&'main'">
            <div class="y">{{ item.Time.toDate().formatDate('MM-dd') }}</div>
            <div class="s">{{ item.Time.toDate().formatDate('HH:mm') }}</div>
          </div>
          <div class="text express">
            <template v-if="!item.isChild">
              <div class="status">{{item.Status}}</div>
              <div class="context"
                   @click="startCall(item.tels)"
                   v-html="item.Content"></div>
            </template>
            <template v-else>
              <div class="status sub"
                   @click="startCall(item.tels)"
                   v-html="item.Content"></div>
            </template>
          </div>
        </div>
      </div>
      <div class="time-line self">
        <div class="item"
             v-for="(item,index) in timeLine"
             :class="{ 'active' : index == 0&&expressList.length==0 }"
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

      <!-- <div class="time-line"
           v-if="expressList.length==0">
        <div class="none-page"
             style="background: #fff;">
          <div class="icon ic_no_wuliu t20"></div>
          <div class="none-text">暂无物流信息</div>
        </div>
      </div> -->
    </div>

    <!--二维码弹窗-->
    <QRCode :QRCodeURL="QRCodeURL"
            v-model="showQRCode"
            :PickUpCode="PickUpCode"></QRCode>

    <!-- 电话列表弹框 -->
    <van-action-sheet v-model="action.visible"
                      cancel-text="取消"
                      close-on-click-action>
      <div v-for="(item,index) in action.data"
           :key="index"
           class="action-item">
        <a :href="'tel:'+item">{{item}}</a>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import peace from '@src/library'
import QRCode from '@src/views/components/QRCode'
import Vue from 'vue'
import { ActionSheet } from 'vant'

Vue.use(ActionSheet)
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
      QRCodeURL: null,
      //快递物流信息
      expressList: [],
      loading: false,
      action: {
        visible: false,
        data: null
      }
    }
  },
  components: { QRCode },
  computed: {
    showTrackingNumber() {
      const ShippingMethod = this.shippingMethod
      const OrderStatus = this.orderStatus
      if (ShippingMethod === undefined || OrderStatus === undefined) return false
      return ShippingMethod === ENUM.SHIPPING_METHOD.HOME && OrderStatus >= ENUM.ORDER_STATUS.SEND && this.PickUpCode
    },
    timeLine() {
      const ShippingMethod = this.shippingMethod
      if (ShippingMethod === undefined) return false
      if (ShippingMethod === ENUM.SHIPPING_METHOD.SELF) {
        return this.data.ords
      } else {
        return this.data.ords.filter(item => item.ServiceStates != 4 && item.ServiceStates != 6)
      }
    }
  },

  created() {
    this.getData()
  },

  methods: {
    onClickSeeQRCode() {
      this.showQRCode = true
    },

    //获取时间轴
    async getData() {
      const params = peace.util.decode(this.$route.params.json)
      const data = await peace.service.purchasedrug.SelectOrderStreamApi(params)
      this.data = data.data
      const info = await peace.service.purchasedrug.SelectOrderDetApi(params)
      this.PickUpCode = info.data.PickUpCode
      this.orderStatus = info.data.OrderStatus
      this.shippingMethod = info.data.ShippingMethod
      if (this.shippingMethod == ENUM.SHIPPING_METHOD.HOME) {
        if (!this.PickUpCode) {
          this.loading = true
          return
        }
        const expressNo = this.PickUpCode
        // const expressNo = 'YT4543884635668'
        let expressData = null
        try {
          expressData = await peace.service.purchasedrug.ExpressQuery({ expressNo: expressNo })
          this.expressList = this.assembleList(expressData.data.Stream)
        } catch (res) {
          // peace.util.alert(res.data.data.message)
        }
        this.loading = true
      }
    },
    assembleList(list) {
      for (let i = 0; i < list.length - 1; i++) {
        list[i].isChild = false
        for (let j = i + 1; j < list.length; j++) {
          if (list[j].Status == list[i].Status) {
            list[j].isChild = true
          } else {
            list[j].isChild = false
            i = j
          }
        }
      }
      this.matchPhone(list)
      return list
    },
    matchPhone(list) {
      list.map(item => {
        item.tels = item.Content.match(/(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g)
        if (item.tels && item.tels.length > 0) {
          item.tels.map(tel => {
            // const temp = `<a style="color: #00c6ae;" href="tel:${tel}">${tel}</a>`
            const temp = `<span style="color: #00c6ae;">${tel}</span>`
            item.Content = item.Content.replace(tel, temp)
          })
        }

        return item
      })
    },
    startCall(tels) {
      if (tels && tels.length > 0) {
        this.action.visible = true
        this.action.data = tels
      }
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
.action-item {
  height: 50px;
  > a {
    color: #000;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    display: block;
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
  padding: 30px 5px 10px;
  margin: 0 0 10px 0;
}
.card .text {
  color: #999;
  padding-top: 5px;
  font-size: 13px;
}
.time-line {
  padding-right: 5px;
  &.self {
    .item {
      &:last-child {
        .text {
          border-left: 2px solid transparent;
        }
      }
    }
  }
  .van-loading {
    text-align: center;
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
// .time-line .item:last-child .text {
//   min-height: 20px;
// }
.time-line .text {
  border-left: 2px solid #d8d8d8;
  padding-left: 15px;
  padding-bottom: 30px;
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
.time-line .time.main::after {
  content: '';
  position: absolute;
  right: -9px;
  top: -5px;
  background: #d8d8d8;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.item.active .text {
  color: #00c6ae;
}
.item.active .text.express .status {
  color: #333;
}
.item.active .text.express .context {
  color: #999;
}
.time-line .item.active .time::after {
  content: '';
  width: 16px;
  height: 16px;
  right: -9px;
  background: #00c6ae;
}
.item.active .time .y {
  color: #000000;
}
.time-line .time .y {
  font-size: 16px;
  margin-top: -10px;
}
.time-line .text .status {
  margin-top: -10px;
}
.time-line .text .status.sub {
  font-size: 12px;
}
.time-line .text .context {
  margin-top: 5px;
  font-size: 12px;
}
.time .s,
.text .note {
  font-size: 13px;
}
</style>
