/** 
 * 医保类型：paymentType
 */



<template>
  <form bindsubmit="submitOrder"
        report-submit="true"
        class="drug-from"
        v-if="order!=null">
    <div class="top">
      <!--tab-->
      <div class="tab">
        <div @click="changeTab(1)"
             :class="page.tabIndex == '1' ? 'tab-item active' : 'tab-item'">
          配送到家
        </div>
        <div @click="changeTab(0)"
             :class="page.tabIndex == '0' ? 'tab-item active' : 'tab-item'">
          到店取药
        </div>
      </div>
      <!--tab^content-->
      <div class="content">
        <div class="tab-content"
             v-if="page.tabIndex == '0'">
          <div class="userAddr icon-next">
            <div class="addr-p">{{Detailed}}</div>
          </div>
        </div>
        <div class="tab-content"
             v-if="page.tabIndex == '1'">
          <div @click="goUserAddrPage"
               class="userAddr icon-next">
            <template v-if="userAddr && userAddr.detailAddress">
              <div class="addr-p">{{userAddr.detailAddress}}</div>
              <div class="addr-user">
                <span>{{userAddr.consignee}}</span>
                <span>{{userAddr.mobile}}</span>
              </div>
            </template>
            <template v-else>
              <div class="block ">
                <div class="icon icon-add"></div>
                添加收货地址
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="panel-pha">
        <div class="panel-head "
             :class="DrugStoreId&&'icon-next'"
             @click="goDrugPhaHomePage">
          <div class="head-ico">
            <img :src="order.DrugStoreLogo" />
          </div>
          <div class="head-tit">{{order.DrugStoreName}}</div>
        </div>
        <div class="panel-body">
          <div class="list-three"
               v-for="(item, index) in order.OrderDet"
               :key="index">
            <div :class="item.DrugImage?'list-icon':'list-icon list-icon-none'">
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
              <div class="dd">{{page.tabIndex == '0' ? '到店取药': '配送到家'}}</div>
            </div>
            <div class="dl-packet"
                 v-if="page.tabIndex == '1'">
              <div class="dt">配送费:</div>
              <div class="dd">￥{{order.Freight.toFixed(2)}}</div>
            </div>
            <div class="dl-packet">
              <div class="dt">优惠金额:</div>
              <div class="dd">￥{{order.PromotionsCut.toFixed(2)}}</div>
            </div>
            <div class="dl-packet">
              <div class="dt">订单总价:</div>
              <div class="dd">￥{{order.TotalAmount}}
              </div>
            </div>
          </div>
          <div class="module str">
            <div class="dl-packet">
              <div class="dt">应付金额:</div>
              <div class="dd">
                <div class="strong">
                  ￥{{order.OrderMoney}}</div>
                <!-- {{page.tabIndex == '0' ? '(价格以实际到店为准)' : ''}} -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tips-bottom">
      {{page.tabIndex == '0' ? '商家接单后将为您保留药品，请及时到店自提' : '商家接单后将在1-3个工作日内为您安排发货'}}
    </div>
    <div class="bottom">
      <div class="strong">￥{{order.OrderMoney}}</div>
      <div style="display: flex; justify-content: flex-end; align-items: center;width:50%;">
        <van-button v-on:click="submitOrder('yibaopay')"
                    v-bind:disabled="!page.canSubmit || hasSubmitOrder"
                    size="small"
                    style="margin: 0 12px 0 0"
                    round
                    type="primary">医保支付</van-button>
        <van-button v-on:click="submitOrder('wxpay')"
                    v-bind:disabled="!page.canSubmit || hasSubmitOrder"
                    size="small"
                    round
                    type="primary">在线支付</van-button>

      </div>
    </div>
  </form>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'DrugOrderBefore',
  data() {
    return {
      hasSubmitOrder: false,

      orderId: '',
      showBtn: true,
      page: {
        url: '',
        accessToken: '',
        json: {},
        tabIndex: '',
        canSubmit: false
      },
      userAddr: {},
      order: null,
      DrugStoreId: '',
      Detailed: ''
    }
  },

  activated() {
    this.getPhaOrder()
    //从地址页面返回
    if (this.$route.query.addr) {
      this.getAddr(this.$route.query.addr)
    }
    this.getDefaultAddress()
  },
  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.page.tabIndex = params.ShippingMethod == '1' ? '1' : '0'
    this.page.json = params
    this.DrugStoreId = params.DrugStoreId
    this.Detailed = params.Detailed
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
    goDrugPhaHomePage() {
      let json = this.$route.params.json
      if (!this.DrugStoreId) {
        // peace.util.alert('')
        return
      }
      this.$router.push(`/drug/drugPhaHome/${json}`)
    },
    getDefaultAddress() {
      peace.service.patient.getDefaultAddress().then(res => {
        this.userAddr = res.data
        this.canSubmitProcesses()
      })
    },
    getAddr(addr) {
      let address = peace.util.decode(addr)
      this.userAddr = address
      this.page.tabIndex = 1
    },
    goUserAddrPage() {
      let json = this.$route.params.json
      this.$router.push(`/setting/SelectAddressManger/${json}`)
    },

    /**
     * 创建购药订单，并根据支付类型调起支付
     * @param {string} [paymentType='wxpay'] 支付类型
     *                                       可选：wxpay（微信） alipay（支付宝） yibaopay（医保支付）
     *                                       默认：wxpay（微信）
     */
    submitOrder(paymentType = 'wxpay') {
      this.hasSubmitOrder = true

      if (!this.canSubmitProcesses()) {
        return
      }
      if (!this.showBtn) {
        peace.util.alert('请勿重复提交')
        return
      }
      this.showBtn = false
      let params = {
        formId: '',
        paymentType,
        JZTClaimNo: this.page.json.JZTClaimNo,
        DrugStoreId: this.page.json.DrugStoreId,
        AccessCode: this.page.json.AccessCode,
        familyId: this.page.json.familyId,
        IsMergeStore: this.page.json.IsMergeStore,
        MergeStoreInfo: this.page.json.MergeStoreInfo,
        ShippingMethod: +this.page.tabIndex, // 0 自提 1配送
        Detailed: +this.page.tabIndex ? this.userAddr.detailAddress : this.order.Detailed,
        UserName: +this.page.tabIndex ? this.userAddr.consignee : '',
        UserPhone: +this.page.tabIndex ? this.userAddr.mobile : ''
      }
      peace.service.patient
        .submitOrder(params)
        .then(res => {
          let orderNo = res.data.OrderId
          this.orderId = res.data.OrderId
          let params = { orderNo }

          if (paymentType === 'yibaopay') {
            this.payCallback()
          } else {
            peace.wx.pay(params, null, this.payCallback, this.payCallback, '?' + 'orderId=' + orderNo)
          }
        })
        .catch(() => {
          this.showBtn = true
        })
    },
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
    canSubmitProcesses() {
      let bool = false,
        userAddr = this.userAddr
      bool = !!(this.page.tabIndex == '0' ? true : !!(userAddr && userAddr.detailAddress))
      this.page.canSubmit = bool
      return bool
    },

    changeTab(index) {
      if (index == this.page.tabIndex) {
        return
      }
      if (this.page.json.ShippingMethod == '0' && index == '1') {
        peace.util.alert('该药店不支持配送到家。')
        return
      }
      if (this.page.json.ShippingMethod == '1' && index == '0') {
        peace.util.alert('该药店不支持到店配药。')
        return
      }
      this.page.tabIndex = index
      this.canSubmitProcesses()
    },

    getPhaOrder() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.patient.getOrderBefore(params).then(res => {
        //防止 Freight  PromotionsCut 无此字段
        res.data.Freight = res.data.Freight || 0
        res.data.PromotionsCut = res.data.PromotionsCut || 0
        this.order = res.data

        this.canSubmitProcesses()
      })
    },

    goInterDrugPage(item) {
      const params = peace.util.encode({ name: item.DrugName })
      this.$router.push(`/inter/drugInterList/${params}`)
    }
  }
}
</script>

<style scoped lang="scss">
.drug-from {
  background: #f9f9f9;
  padding: 10px;
  min-height: 100%;
  > .module {
    border-radius: 3px;
    overflow: hidden;
  }
}
.top,
.container {
  background: #fff;
}
.top {
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 3px;
  padding: 15px 0;
}
.tab {
  width: 50%;
  margin: 0 auto 15px;
  height: 26px;
  border: 1px solid #00c6ae;
  border-radius: 15px;
  position: relative;
  .tab-item {
    width: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    line-height: normal;
    position: absolute;
    z-index: 1;
    top: -1px;
    border-radius: 15px;
    padding: 0;
    font-size: 12px;
    &:first-child {
      left: -1px;
    }
    &:last-child {
      right: -1px;
    }
    &.active {
      background: #00c6ae;
      color: #fff;
      z-index: 3;
    }
  }
}
.tab-content .addr-tit {
  font-size: 14px;
  position: relative;
  padding-left: 24px;
  padding-bottom: 5px;
}
.tab-content .addr-p::before {
  content: '';
  position: absolute;
  left: -27px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 16px;
  // background-size: 100% 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/addr-tit.jpg');
}
.tab-content .addr-p {
  font-size: 14px;
  color: #333;
  margin: 5px 0;
  font-weight: 600;
  position: relative;
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
  position: relative;
}

.panel-head .head-ico {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e5e5;
  img {
    width: 100%;
    height: 100%;
  }
}
.panel-head.icon-next::before {
  content: '';
  position: absolute;
  width: 14rpx;
  height: 24rpx;
  display: block;
  right: 20rpx;
  top: 38rpx;
  background-size: cover;
}
.panel-head .head-tit {
  flex: 1;
  color: #333333;
  font-size: 14px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.head-Rp {
  color: #999;
  font-size: 12px;
  line-height: normal;
  border: 1px solid #eee;
  padding: 2px 10px;
  border-radius: 15px;
  margin-left: 5px;
}
.panel-pha .panel-body {
  padding: 0 15px;
}
.intro {
  padding: 8px 0;
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

.dl-packet .dd {
  color: #4e4e4e;
}
.str {
  border-top: 1px solid #eee;
  padding: 3px 0;
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
.strong {
  color: #ff344d;
  font-size: 20px;
  font-weight: bold;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottom .van-button {
  width: 75px;
}
.tips-bottom {
  margin-bottom: 60px;
  text-align: center;
  color: #999;
  font-size: 13px;
  line-height: 1;
}
.icon-add {
  width: 16px;
  height: 16px;
  background-size: cover;
  background-image: url('~@src/assets/images/icons/toolfk-img.jpg');
  margin-top: -5px;
}
.tab-content .block {
  font-size: 16px;
  color: #00c6ae;
  margin-left: -27px;
  .icon {
    margin-right: 8px;
  }
}
.userAddr {
  width: 100%;
  padding-right: 33px;
  position: relative;
  padding-left: 42px;
}

.addr-user {
  font-size: 12px;
  color: #666;
  span + span {
    margin-left: 5px;
  }
}

.userAddr.icon-next::after {
  content: '';
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  width: 7px;
  height: 12px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/icon-next.jpg');
}
.panel-head.icon-next::after {
  content: '';
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  width: 7px;
  height: 12px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/icon-next.jpg');
}

.list-three .list-other {
  flex: 0 1 65px;
  width: 65px;
  display: flex;
  flex-direction: column;
  text-align: right;
}
.list-other .other-them {
  padding-right: 17px;
}
.list-other .other-them::after {
  content: '';
  width: 12px;
  height: 12px;
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-bottom: 3px;
  margin-left: 2px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/ic_wenhao.png');
}
.list-icon.list-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url('~@src/assets/images/icons/nocontent.jpg');
}
</style>
