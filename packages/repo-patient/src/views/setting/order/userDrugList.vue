<template>
  <div class="user-drug-list">
    <div class="tab">
      <div @click="changeTab('0')"
           class="tab-item"
           :class="{ active: tabIndex == '0' }">
        <div class="span">全部</div>
      </div>
      <!-- <div @click="changeTab('2')"
           class="tab-item"
           :class="{ active: tabIndex == '2' }">
        <div class="span">进行中</div>
      </div> -->
      <div @click="changeTab('1')"
           class="tab-item"
           :class="{ active: tabIndex == '1' }">
        <div class="span">已完成</div>
      </div>
    </div>
    <template v-if="drugItems && drugItems.length">
      <div class="content"
           :class="{ nbg :drugItems.length,
                   h100 : !drugItems.length
                 }">
        <div v-if="drugItems.length">
          <div class="panel"
               v-for="item in drugItems"
               :key="item.OrderId">
            <div class="panel-head">
              <div class="card-strip">
                <div class="avatar">
                  <img :src="item.DrugStoreLogo"
                       class="avatar-cicular" />
                </div>
                <div class="strip-info">{{item.DrugStoreName}}</div>
                <div :class="{ [`color-a${item.OrderStatus}`] : true }"
                     class="strip-eye">
                  {{item.OrderStatusText}}
                </div>
              </div>
            </div>
            <div class="panel-body"
                 @click="goUserDrugDetailPage(item)"
                 style="padding-top: 0">
              <div class="card-imgs"
                   v-if="item.OrderDet && item.OrderDet.length">
                <div class="imgs-item"
                     v-for="det in item.OrderDet"
                     :key="det.DrugImage">
                  <div class="item-icon"
                       :class="{ 'item-icon-none': !item.DrugImage }">
                    <img :src="det.DrugImage" />
                  </div>
                </div>
              </div>
              <div class="small">
                <div class="small-time">{{item.CreateTime}}</div>
                <div class="small-price default">
                  共{{item.TotalNumber}}件药品 合计：
                  <span class="b">￥{{item.TotalAmount }}</span>
                </div>
              </div>
            </div>
            <!-- 0未付款 1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)-->
            <div class="panel-bottom"
                 v-if="item.OrderStatus != 5">
              <div class="time"></div>
              <div class="label gary"
                   v-if=" item.OrderStatus == '1' || item.OrderStatus == '2' || item.OrderStatus == '0'"
                   @click="canselOrder(item)">取消订单
              </div>
              <div class="label blue-full"
                   v-if="item.OrderStatus == '0'"
                   @click="payOrder(item)">
                继续支付
              </div>
              <div class="label"
                   v-if="item.OrderStatus == '3' || item.OrderStatus == '4' || item.OrderStatus == '7' || item.OrderStatus == '8'"
                   @click="goDrugLogiPage(item)">查看物流
              </div>
              <div class="label blue"
                   v-if="item.OrderStatus == '3' && item.ShippingMethod != '0'"
                   @click="submitOrder(item)">确认收货
              </div>
              <div class="label blue"
                   v-if="item.OrderStatus == '3' && item.ShippingMethod == '0'"
                   @click="submitOrder(item)">确认取药
              </div>
            </div>
          </div>
          <div class="bottom">客服电话：4009020365</div>
        </div>
      </div>
    </template>

    <template v-if="loaded && drugItems.length==0">
      <div class="none-page">
        <div class="icon icon_none_drugOrder"></div>
        <div class="none-text">暂无订单</div>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  data() {
    return {
      loaded: false,
      appid: '',
      tabIndex: '0',
      currentOrderId: '',
      drugItems: undefined,
      consultList: undefined
    }
  },

  activated() {
    this.getDrugItems()
  },
  mounted() {
    //this.appid = config.APPID
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
    changeTab(item) {
      this.tabIndex = item

      this.getDrugItems()
    },

    getDrugItems() {
      const params = {
        OrderType: this.tabIndex == '1' ? '6' : this.tabIndex
      }

      peace.service.purchasedrug.SelectOrderListApi(params).then(res => {
        this.drugItems = res.data
        this.loaded = true
      })
    },

    goUserDrugDetailPage(item) {
      const json = peace.util.encode({ OrderId: item.OrderId })
      this.$router.push(`/order/userDrugDetail/${json}`)
    },
    payOrder(item) {
      let orderNo = item.OrderId
      this.currentOrderId = item.OrderId
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
      const json = peace.util.encode({ OrderId: orderId })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    },
    canselOrder(item) {
      const params = { OrderId: item.OrderId }
      let resTxt = ''
      if (item.OrderStatus == 0) {
        resTxt = '取消订单后药房将不再为您预留药品。是否取消订单？'
      } else {
        resTxt =
          '取消订单后药房将不再为您预留药品, 所付款项将在1-3个工作日内原路返回，是否取消订单？'
      }
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.CancelOrder(params).then(res => {
          peace.util.alert(res.msg)
          this.getDrugItems()
        })
      })
    },

    goDrugLogiPage(item) {
      const params = peace.util.encode({ OrderId: item.OrderId })

      this.$router.replace(`/order/userDrugLogistics/${params}`)
    },

    submitOrder(item) {
      const params = { OrderId: item.OrderId }
      let resTxt = item.ShippingMethod
        ? '收到药品确认无误后再确认收货，以免造成损失'
        : '收到药品确认无误后再确认取药，以免造成损失'
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.ConfirmReceipt(params).then(res => {
          peace.util.alert(res.msg)
          this.getDrugItems()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-drug-list {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  color: #999;
  height: 100%;
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
  flex: 1;
  overflow: auto;
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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
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
  border-left: 1px solid #f5f5f5;
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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.panel .panel-bottom .time {
  flex: 1 0 auto;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-strip {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  font-size: 15px;
  align-items: center;
}
.card-strip .avatar {
  box-sizing: border-box;
  flex: 0 0 30px;
  height: 30px;
  margin-right: 10px;
  border: 0;
  background: #fff;
}
.card-strip .avatar img {
  padding: 1px;
  // border-radius: 50%;
  width: 27px;
  height: 27px;
  margin-top: -1px;
  margin-left: -1px;
  border: 1px solid #f3f3f3;
}

.strip-info {
  flex: 1;
  color: #000;
}
.strip-eye {
  flex: 0 0 auto;
  color: #999;
  text-align: right;
}
/* color-x: 咨询单状态，
 * color-0x 转诊单状态 ↓
 *  01:转出待审核  02:转出已拒绝 03:转出已通过/转入待审核 04:转入已通过 05:转入已拒绝 06:转诊完成 07:转诊已关闭
 * color-ax 购药单状态
 * 1: 待接单 2:已接单 3:已发货 4:已完成
*/
/*red*/
.strip-eye.color-1,
.strip-eye.color-2,
.strip-eye.color-02,
.strip-eye.color-05,
.strip-eye.color-a0,
.strip-eye.color-a1,
.strip-eye.color-a2 {
  color: #fb2828;
}
/*blue*/
.strip-eye.color-3,
.strip-eye.color-01,
.strip-eye.color-03,
.strip-eye.color-04,
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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding-top: 10px;
  color: #999;
  font-size: 12px;
  align-items: flex-end;
}
.small .small-time {
  flex: 0 0 auto;
  width: 120px;
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

  .b {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
}
.label {
  font-size: 13px;
  padding: 5px 12px;
  margin-left: 10px;
  border-radius: 20px;
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
