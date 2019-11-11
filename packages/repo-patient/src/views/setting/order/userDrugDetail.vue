<template>
  <div class="user-drug-detail">
    <div class="count-down"
         v-if="order.OrderStatus == 0">
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
          </div>
          <div class="order-text"></div>
        </div>
        <div class="cancelText"
             v-if="order.OrderStatus == '5' && order.payMoney != 0 ">订单取消后退款将在1-3个工作日内原路返回，请注意查收
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
              <div class="dd">￥0</div>
            </div>
            <div class="dl-packet">
              <div class="dt">订单总价:</div>
              <div class="dd">￥{{order.TotalAmount}}</div>
            </div>
          </div>
          <div class="module str"
               v-if="order.OrderStatus != 0">
            <div class="dl-packet">
              <div class="dt">实付金额:</div>
              <div class="dd">
                <div class="strong">￥{{order.payMoney}}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="box"
         v-if="order.OrderId">
      <div class="dl-packet">
        <div class="dt">订单编号：</div>
        <div class="dd">{{order.OrderId}}</div>
      </div>
      <div class="dl-packet"
           :key="index"
           v-for="(item,index) in order.ords">
        <div class="dt">{{timeTags[parseInt(item.ServiceStates)]}}：</div>
        <div class="dd">{{item.CreateTime}}</div>
      </div>

      <!-- 0未付款  1已付款 2已接单 3 已发货 4已签收 5 已取消 6已自提 7，已打包（配药中） 8 已完成)-->
      <div class='bottom-1'
           v-if="order.OrderStatus == 0">
        <div class="left">应付金额：<span class="money">¥{{order.TotalAmount}}</span></div>
        <div class="right">
          <div @click="canselOrder"
               class="pay cancel"
               v-if="order.OrderStatus == '0' || order.OrderStatus == '1' || order.OrderStatus == '2'"
               style="background: #fff; border: 1px solid #CCCCCC;color: #999;">
            取消订单</div>
          <div @click="payOrder(order)"
               class="pay"
               v-if="order.OrderStatus == '0'"
               style="background: #00C6AE; margin-bottom: 8px; ">
            继续支付</div>
        </div>
      </div>

      <div class="bottom"
           v-else>
        <div @click="canselOrder"
             class="btn block btn-blue"
             v-if="order.OrderStatus == '1' || order.OrderStatus == '2'"
             style="background: #fff; border: 1px solid #CCCCCC;color: #999;">
          取消订单</div>
        <div @click="submitOrder"
             class="btn block btn-blue"
             v-if="order.OrderStatus == '3'"> {{order.ShippingMethod == '1' ? '确认签收' : '确认取药' }}</div>
        <div class="btn block btn-default"
             v-if="order.OrderStatus == '4' || order.OrderStatus == '6'">
          {{order.ShippingMethod == '1' ? '已签收' : '已自提'}}</div>
        <div class="btn block btn-default"
             v-if="order.OrderStatus == '5'">已取消</div>
      </div>
    </div>

    <peace-dialog :visible.sync="recipeDetail.visible">
      <TheRecipe :data="recipeDetail.data"></TheRecipe>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import TheRecipe from '@src/views/components/TheRecipe'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)

export default {
  components: {
    TheRecipe
  },

  data() {
    return {
      time: 0,
      orderId: '',
      timeTags: ['创建时间', '', '接单时间', '发货时间', '', '取消时间', '收货时间'],
      appid: '',
      order: {},

      recipeDetail: {
        visible: false,
        data: {}
      }
    }
  },

  created() {
    this.getDrugOrderDetail()
  },
  mounted() {
    if (this.$route.query.code) {
      let code = this.$route.query.code
      let orderNo = this.$route.query.orderId
      let params = { code, orderNo }
      peace.service.index.GetWxLoginStatus(params).then(res => {
        let data = res.data
        peace.wx.payInvoke(data, this.payCallback)
      })
    }
  },
  methods: {
    payCallback() {
      let orderId = ''
      if (this.$route.query.orderId) {
        //授权跳转后回调
        orderId = this.$route.query.orderId
      } else {
        //直接回调
        orderId = this.orderId
      }
      const json = peace.util.encode({ OrderId: orderId })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    },
    payOrder(order) {
      let orderNo = order.OrderId
      this.orderId = order.OrderId
      let params = { orderNo }
      peace.wx.pay(params, null, this.payCallback, null, '?' + 'orderId=' + orderNo)
    },
    getDrugOrderDetail() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.purchasedrug.SelectOrderDetApi(params).then(res => {
        this.order = res.data
        if (this.order.expireTime > this.order.currentTime) {
          this.time = (this.order.expireTime - this.order.currentTime) * 1000
        }
      })
    },

    goInterDrugPage(item) {
      const params = peace.util.encode({ name: item.DrugName })
      this.$router.replace(`/inter/drugInterList/${params}`)
    },

    goPrescripDetailPage() {
      const params = peace.util.encode({
        prescribeId: this.order.prescribeId,
        showDetailButton: false
      })

      this.$router.replace(`/components/theRecipe/${params}`)
    },

    goDrugLogiPage() {
      const params = this.$route.params.json

      this.$router.replace(`/order/userDrugLogistics/${params}`)
    },

    canselOrder() {
      const params = peace.util.decode(this.$route.params.json)
      let resTxt = ''
      if (this.order.OrderStatus == 0) {
        resTxt = '取消订单后药房将不再为您预留药品。是否取消订单？'
      } else {
        resTxt =
          '取消订单后药房将不再为您预留药品, 所付款项将在1-3个工作日内原路返回，是否取消订单？'
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
  left: 0;
  top: 2px;
  width: 15px;
  height: 17px;
  background-size: cover;
  background-image: url('../../../assets/images/icons/addr-tit.jpg');
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
.list-other .other-them::after {
  content: '?  ';
  display: inline-block;
  width: 10px;
  height: 10px;
  line-height: 1;
  background: #00c6ae;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  margin-top: 1px;
  margin-left: 4px;
  padding: 0;
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
  content: '>';
  padding-left: 8px;
  font-weight: bold;
  font-size: 12px;
  position: absolute;
  top: 10px;
  color: rgb(90, 90, 90);
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
