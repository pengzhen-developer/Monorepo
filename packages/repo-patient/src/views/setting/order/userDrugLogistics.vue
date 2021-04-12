<template>
  <div class="user-drug-logistics"
       v-if="loading">
    <div class="box">
      <div class="card">
        <div class="card-avatar">
          <van-image :src="info.drugStoreLogo"
                     class="avatar-cicular"></van-image>
        </div>
        <div class="card-body">
          <!-- <div class="card-name"
               v-if="info.purchaseDrugOrderStreams&&info.purchaseDrugOrderStreams.length>0"> {{ info.purchaseDrugOrderStreams[0].remark }}</div> -->
          <div class="card-small"
               style="word-break: break-all;"
               v-if="info.shippingMethod == ENUM.SHIPPING_METHOD.HOME">
            {{ '【配送地址】'+ info.consigneeAddress + ',' + info.consignee + ',' + info.tel}}
          </div>
          <div class="card-small"
               style="word-break: break-all;"
               v-else>
            {{  '【自提地址】'+info.consigneeAddress }}
          </div>
          <div class="text">
            订单编号：{{info.orderNo}}
          </div>
          <div v-if="showDeliveryInfo"
               class="text flex">
            <span>
              配送信息：<span>{{info.deliveryPersonnel}}，</span>
              <span style="color:#00c6ae;"
                    @click="startCall([info.deliveryTel])">{{info.deliveryTel}}</span>
            </span>
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
    <div class="module "
         :class="{'pt16':info.expressNo.length==0}"
         v-if="loading">
      <van-tabs v-model="active"
                @click="changeExpressNum"
                v-if="info.expressNo.length>0">
        <van-tab :title="item.text"
                 v-for="(item,index) in info.expressNo"
                 :key="index"></van-tab>
      </van-tabs>

      <div v-if="showTrackingNumber"
           class="express-info">
        <div>
          <span v-if="expressOrg">{{expressOrg}}：</span>
          <span>{{expressNum}}</span>
        </div>
      </div>

      <template v-if="loadingExpressList">
        <div class="time-line express"
             v-if="info.shippingMethod == ENUM.SHIPPING_METHOD.HOME &&expressList.length>0">
          <div class="item"
               v-for="(item,index) in expressList"
               :class="{ 'active' : index == 0 }"
               :key="index">
            <div class="time"
                 :class="!item.isChild&&'main'">
              <div class="y">{{ item.Time.toDate().formatDate('MM-dd') }}</div>
              <div class="s">{{ item.Time.toDate().formatDate('HH:mm') }}</div>
            </div>
            <div class="text express"
                 :class="!item.isChild&&'main'">
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
               :key="index">
            <div class="time">
              <div class="y">{{ item.createdTime.toDate().formatDate('MM-dd') }}</div>
              <div class="s">{{ item.createdTime.toDate().formatDate('HH:mm') }}</div>
            </div>
            <div class="text">
              <div class="status">{{item.remark}}</div>
              <div class="note"
                   v-if="item.status == '4'">
                {{ info.shippingMethod == ENUM.SHIPPING_METHOD.SELF  ? '您在'+ info.drugStoreName +'已自提' : '' }}
              </div>

              <div v-if="item.status == '2' && info.callOrderStatus != 5 && info.shippingMethod === ENUM.SHIPPING_METHOD.SELF"
                   class="note">
                <div class="qr-btn "
                     :class="{ 'active' : index == 0 }"
                     @click="onClickSeeQRCode">
                  查看取药码
                </div>
              </div>
              <div class="note"
                   v-if="item.status == '5' &&info.cancelReason"><span>{{info.cancelReason}}</span></div>
              <div v-if="item.status == '5' && info.cancelList.length>0"
                   class="note">
                <div class="qr-btn"
                     :class="{ 'active' : index == 0 }"
                     @click="onClickSeeCancelOrderDeatil">
                  查看详情
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!--二维码弹窗-->
    <QRCode :QRCodeURL="info.QRCodeURL"
            v-model="showQRCode"
            :PickUpCode="info.pickUpCode"></QRCode>

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
      expressNum: '',
      expressOrg: '',
      active: 0,
      ENUM,
      showQRCode: false,
      info: {},
      //快递物流信息
      expressList: [],
      loading: false,
      loadingExpressList: false,
      action: {
        visible: false,
        data: null
      }
    }
  },
  components: { QRCode },
  computed: {
    showDeliveryInfo() {
      return this.info.deliveryPersonnel && this.info.deliveryTel ? true : false
    },
    showTrackingNumber() {
      const ShippingMethod = this.info.shippingMethod
      const OrderStatus = this.info.callOrderStatus
      if (ShippingMethod === undefined || OrderStatus === undefined) return false
      return ShippingMethod === ENUM.SHIPPING_METHOD.HOME && OrderStatus >= ENUM.ORDER_STATUS.SEND && this.info.expressNo.length > 0
    },
    timeLine() {
      const ShippingMethod = this.info.shippingMethod
      if (ShippingMethod === undefined) {
        return false
      }
      const list = this.info.purchaseDrugOrderStreams
      if (list && Array.isArray(list)) {
        list.reverse()
      }
      if (ShippingMethod === ENUM.SHIPPING_METHOD.SELF) {
        return list
      } else {
        return list.filter((item) => item.status != 4 && item.status != 6)
      }
    }
  },

  created() {
    this.getData()
  },

  methods: {
    beforeChange() {},
    changeExpressNum() {
      const num = this.info.expressNo[this.active].expressNo
      const expressOrg = this.info.expressNo[this.active].expressOrg
      if (num === this.expressNum) {
        return false
      } else {
        this.expressNum = num
        this.expressOrg = expressOrg
      }
      this.getExpressList()
    },
    onClickSeeQRCode() {
      this.showQRCode = true
    },
    onClickSeeCancelOrderDeatil() {
      const params = peace.util.encode({ orderNo: this.info.orderNo })
      this.$router.push(`/drug/drugCancelOrder/${params}`)
    },
    //获取时间轴
    async getData() {
      const params = peace.util.decode(this.$route.params.json)
      const data = await peace.service.purchasedrug.SelectOrderDetApi(params)
      this.info = data.data
      if (this.info.shippingMethod == ENUM.SHIPPING_METHOD.HOME) {
        if (!this.info.expressNo || this.info.expressNo.length == 0) {
          this.loading = true
          this.loadingExpressList = true
          return
        }
        const nums = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
        this.info.expressNo = this.info.expressNo.map((item, index) => {
          return Object.assign({}, item, { text: `运单${nums[index]}` })
        })

        this.expressNum = this.info.expressNo[0].expressNo
        this.expressOrg = this.info.expressNo[0].expressOrg
        let expressData = null
        try {
          expressData = await peace.service.purchasedrug.ExpressQuery({ expressNo: this.expressNum })
          this.expressList = this.assembleList(expressData.data.Stream)
        } catch (res) {
          // peace.util.alert(res.data.data.message)
        }
        this.loading = true
        this.loadingExpressList = true
      } else {
        this.loading = true
        this.loadingExpressList = true
      }
    },
    getExpressList() {
      this.loadingExpressList = false
      peace.service.purchasedrug.ExpressQuery({ expressNo: this.expressNum }).then((res) => {
        this.expressList = this.assembleList(res.data.Stream)
        this.loadingExpressList = true
      })
    },
    assembleList(list) {
      if (!Array.isArray(list)) {
        return []
      }
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
      list.map((item) => {
        item.tels = item.Content.match(/(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g)
        if (item.tels && item.tels.length > 0) {
          item.tels.map((tel) => {
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
.van-tabs {
  margin-bottom: 12px;
  height: 28px;
  /deep/.van-tab {
    width: 20%;
    flex: none;
    color: rgba(51, 51, 51, 0.4);
    font-size: 16px;
  }

  /deep/.van-tabs__line {
    bottom: 0;
  }
  /deep/.van-tabs__nav {
    justify-content: center;
    height: 28px;
    padding: 0 11px;
  }

  /deep/.van-tab--active {
    color: $primary;
  }
  /deep/ .van-tabs__line {
    background: $primary;
    border-radius: 1px;
    height: 2px;
    width: 68px;
  }
}
.express-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
  > div {
    padding: 2px 26px;
    background: rgba(0, 198, 174, 0.1);
    border-radius: 12px;
    height: 24px;
    color: rgba(51, 51, 51, 0.6);
    line-height: 20px;
  }
}
.qr-btn {
  margin-top: 8px;
  border-radius: 16px;
  color: #999;
  width: 88px;
  height: 32px;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0.4;
  background: rgba(51, 51, 51, 0.05);

  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.6);
  line-height: 16px;
  &.active {
    opacity: 1;
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
  margin: 0;
  margin-right: 5px;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  overflow: hidden;
  .van-image,
  img {
    width: 100%;
    height: 100%;
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
  padding: 12px 16px;
  margin: 0 0 10px 0;
  .card-small {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 24px;
  }
  .card-name {
    font-size: 16px;
  }
  .text {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.6);
    line-height: 20px;
    &.flex {
      display: flex;
      justify-content: space-between;
    }
  }
}
.module {
  background: #fff;
  padding: 10px 5px;
  margin: 0 0 10px 0;
  &.pt16 {
    padding-top: 16px;
  }
}
.time-line {
  padding-right: 5px;
  &.self {
    .item {
      &:last-child {
        .text {
          &::before {
            background: transparent;
          }
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
  width: 20%;
  padding-right: 5.5%;
  position: relative;
  text-align: right;
}

.time-line .text {
  padding-left: 23px;
  padding-bottom: 30px;
  flex: 1;
  min-height: 74px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 8px;
    background: rgba(51, 51, 51, 0.1);
    width: 2px;
    height: calc(100% - 8px);
  }
}
.text.express.main::before {
  top: 24px;
  height: calc(100% - 24px);
}
.item.active .text::before {
  top: 24px;
  height: calc(100% - 24px);
}
.time-line .time::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 0px;
  background: rgba(51, 51, 51, 0.1);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.time-line .time.main::after {
  content: '';
  position: absolute;
  right: -13px;
  top: 0;
  background: rgba(51, 51, 51, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.item.active .text {
  color: #333;
}
.item.active .text.express .status {
  color: #333;
}
.item.active .text.express .context {
  color: #999;
}
.time-line .item.active .time::after {
  content: '';
  width: 24px;
  height: 24px;
  right: -13px;
  top: 0;
  background-color: #00c6ae;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAEHRSTlMAAgUPGx0kNkxhZqCur+LkX8/PmAAAADNJREFUCNdjYMAFWqA051MoY14CVOAZNoFqBaiAziWoCqazClAVOregWpjOQ7UwCOOwFQCv+A3wpzmUVAAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px 16px;
}
.time-line .time .y {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.time-line .time .s {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.item.active .text .status {
  color: #00c6ae;
}
.time-line .text .status {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 24px;
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
.note {
  span {
    font-size: 14px;
    margin: 4px 0 8px 0;
    color: #333333;
    line-height: 20px;
    margin-top: 4px;
  }
}
</style>
