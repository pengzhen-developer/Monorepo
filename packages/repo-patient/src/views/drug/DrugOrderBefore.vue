/** 
 * 医保类型：paymentType
 */



<template>
  <div class="drug-bg">
    <div class="warn-tip">
      <img :src="require('@src/assets/images/warn.png')">
      <span>药品为特殊商品，一经售出不退不换</span>
    </div>
    <div class="drug-from"
         v-if="order!=null">
      <div class="top">
        <div class="content">
          <div class="addr-tit">
            {{page.tabIndex==0?'取药地址':'收货地址'}}
          </div>
          <div class="tab-content"
               v-if="page.tabIndex == '0'">
            <div class="userAddr icon-next">
              <div class="addr-p">{{order.Province+order.City+order.County+ order.Detailed}}</div>
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
               :class="CustomerType!='50'&&'icon-next'"
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

          </div>
        </div>
      </div>
      <div class="module intro">
        <div class="dl-packet">
          <div class="dt">支付方式 ：</div>
          <div class="dd more"
               @click="changeShowPopup">{{payName}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt"></div>
          <div class="dd"
               @click="changeShowPopup">{{page.tabIndex == '0' ? '到店取药': '配送到家'}}</div>
        </div>
      </div>
      <div class="module str">
        <div class="dl-packet">
          <div class="dt">订单总价 ：</div>
          <div class="dd">￥{{order.TotalAmount}}
          </div>
        </div>
        <div class="dl-packet"
             v-if="page.tabIndex == '1'">
          <div class="dt">配送费 ：</div>
          <div class="dd">￥{{order.Freight.toFixed(2)}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">优惠金额 ：</div>
          <div class="dd">￥{{order.PromotionsCut.toFixed(2)}}</div>
        </div>
        <div class="line"></div>
        <div class="dl-packet">
          <div class="dt money">应付金额 ：</div>
          <div class="dd">
            <div class="strong">
              ￥{{page.tabIndex == '1'?order.OrderMoney :order.pickOrderMoney}}</div>
            <!-- {{page.tabIndex == '0' ? '(价格以实际到店为准)' : ''}} -->

          </div>
        </div>
      </div>
      <div class="tips-bottom">
        {{page.tabIndex == '0' ? '商家接单后将为您保留药品，请及时到店自提' : '商家接单后将在1-3个工作日内为您安排发货'}}
      </div>
      <div class="bottom">
        <div class="strong">￥{{page.tabIndex == '1'?order.OrderMoney :order.pickOrderMoney}}</div>
        <div style="display: flex; justify-content: flex-end; align-items: center;width:50%;">
          <!-- 购药暂时屏蔽医保支付  2020-05-29-->
          <!-- <van-button v-on:click="submitOrder('yibaopay')"
                    v-bind:disabled="!page.canSubmit || hasSubmitOrder"
                    size="small"
                    style="margin: 0 12px 0 0"
                    round
                    type="primary">医保支付</van-button> -->
          <van-button v-on:click="submitOrder('wxpay')"
                      size="small"
                      round
                      type="primary">提交订单</van-button>

        </div>
      </div>
    </div>

    <van-popup v-model="showPopup"
               round
               closeable
               :close-icon="colseIcon"
               position="bottom">
      <div class="pop-title">
        <span>请选择您的支付方式</span>
      </div>

      <div class="pop-box">
        <div class="pop-subtitle">支付方式</div>
        <div class="pop-list">
          <div class="pop-tag"
               :class="{'active':!item.disabled&&json.payIndex==item.index,'disabled':item.disabled}"
               v-for="(item,index) in payList"
               :key="index"
               @click="selectPay(item)">
            {{item.name}}
          </div>

        </div>
      </div>
      <div class="pop-box">
        <div class="pop-subtitle">配送方式</div>
        <div class="pop-list">
          <div class=" pop-tag"
               :class="{'active':!item.disabled&&json.tabIndex==item.index,'disabled':item.disabled}"
               v-for="(item,index) in tabList"
               :key="index"
               @click="changeTab(item.index,item.disabled)">
            {{item.name}}
          </div>
        </div>
      </div>
      <van-button type="primary"
                  round
                  @click="changeShowPopup"
                  size="large">确认</van-button>
    </van-popup>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'DrugOrderBefore',
  data() {
    return {
      payList: [
        { index: 0, name: '在线支付', disabled: false },
        { index: 1, name: '到店支付', disabled: true },
        { index: 2, name: '货到付款', disabled: true }
      ],
      showPopup: false,
      colseIcon: require('@src/assets/images/ic_close@2x.png'),
      hasSubmitOrder: false,

      orderId: '',
      showBtn: true,
      page: {
        url: '',
        accessToken: '',
        json: {},
        tabIndex: '',
        payIndex: '',
        canSubmit: false
      },
      json: {
        tabIndex: '',
        payIndex: ''
      },
      userAddr: {},
      order: null,
      CustomerType: ''
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
  destroyed() {
    $peace.$off('SelectAddress')
  },
  created() {
    $peace.$on('SelectAddress', this.selectAddressCallback)

    this.initData(this.$route.params.json)
  },
  computed: {
    payName() {
      return this.payList.find((item) => item.index == this.page.payIndex)?.name
    },
    tabList() {
      let list = [
        { index: 1, name: '配送到家', disabled: false },
        { index: 0, name: '到店取药', disabled: false }
      ]
      const ShippingMethod = this.page.json.ShippingMethod
      if (ShippingMethod == '0' || ShippingMethod == '1') {
        list.map((item) => (item.disabled = true))
        let item = list.find((item) => item.index == ShippingMethod)
        item.disabled = false
      }
      return list
    }
  },
  methods: {
    selectAddressCallback(json) {
      if (json) {
        this.initData(json)
      }
    },
    initData(json) {
      const params = peace.util.decode(json)
      // this.page.tabIndex = params.ShippingMethod == '1' ? '1' : '0'
      /** 0 到店取药 1 配送到家 2到店取药+配送到家 */
      /**如果是2的话默认展示 配送到家；否则展示 到店取药or配送到家 */
      this.page.tabIndex = params.ShippingMethod == '0' ? '0' : '1'
      this.page.payIndex = '0'
      this.page.json = params
      this.CustomerType = params.CustomerType
      this.Detailed = params.Detailed
    },
    changeShowPopup() {
      this.showPopup = !this.showPopup
      if (!this.showPopup) {
        this.page.payIndex = this.json.payIndex
        this.page.tabIndex = this.json.tabIndex
      } else {
        this.json.payIndex = this.page.payIndex
        this.json.tabIndex = this.page.tabIndex
      }
    },
    goDrugPhaHomePage() {
      let json = this.$route.params.json
      //云药房不跳转店铺详情
      if (this.CustomerType == '50') {
        return
      }
      this.$router.push(`/drug/drugPhaHome/${json}`)
    },
    getDefaultAddress() {
      peace.service.patient.getDefaultAddress().then((res) => {
        this.userAddr = res.data
      })
    },
    getAddr(addr) {
      let address = peace.util.decode(addr)
      this.userAddr = address
      this.page.tabIndex = 1
    },
    goUserAddrPage() {
      let json = peace.util.decode(this.$route.params.json)
      const param = peace.util.encode({ ...json, emit: 'SelectAddress' })

      this.$router.push(`/setting/SelectAddressManger/${param}`)
    },

    /**
     * 创建购药订单，并根据支付类型调起支付
     * @param {string} [paymentType='wxpay'] 支付类型
     *                                       可选：wxpay（微信） alipay（支付宝） yibaopay（医保支付）
     *                                       默认：wxpay（微信）
     */
    submitOrder(paymentType = 'wxpay') {
      this.hasSubmitOrder = true
      let canSubmit = this.page.tabIndex == 0 ? true : this.userAddr && this.userAddr.detailAddress ? true : false
      if (!canSubmit) {
        peace.util.alert('请添加收货地址')
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
        ProvincialCity: +this.page.tabIndex
          ? this.userAddr.province + ',' + this.userAddr.city + ',' + this.userAddr.district
          : this.order.Province + ',' + this.order.City + ',' + this.order.County,
        UserName: +this.page.tabIndex ? this.userAddr.consignee : '',
        UserPhone: +this.page.tabIndex ? this.userAddr.mobile : '',
        TargetPlatformCodes: this.order.TargetPlatformCodes
      }
      peace.service.patient
        .submitOrder(params)
        .then((res) => {
          let orderNo = res.data.OrderId
          this.orderId = res.data.OrderId
          let orderType = 'drug'
          let money = this.page.tabIndex == '1' ? this.order.OrderMoney : this.order.pickOrderMoney
          let params = { orderNo, orderType, money }

          if (paymentType === 'yibaopay') {
            this.payCallback()
          } else {
            const json = peace.util.encode(params)
            this.$router.replace(`/components/ExpenseDetail/${json}`)
          }
        })
        .finally(() => {
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

    selectPay(item) {
      if (item.disabled) {
        return
      }
      if (item.index == this.json.payIndex) {
        return
      }
      this.json.payIndex = item.index
      this.json.payName = item.name
    },
    changeTab(index, disabled) {
      if (index == this.json.tabIndex) {
        return
      }
      if (disabled) {
        return
      }
      // if (this.page.json.ShippingMethod == '0' && index == '1') {
      //   peace.util.alert('该药店不支持配送到家。')
      //   return
      // }
      // if (this.page.json.ShippingMethod == '1' && index == '0') {
      //   peace.util.alert('该药店不支持到店配药。')
      //   return
      // }
      this.json.tabIndex = index
    },

    getPhaOrder() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.patient.getOrderBefore(params).then((res) => {
        //防止 Freight  PromotionsCut 无此字段
        res.data.Freight = res.data.Freight || 0
        res.data.PromotionsCut = res.data.PromotionsCut || 0
        this.order = res.data
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
.van-popup {
  padding: 23px 15px 15px 15px;
  /deep/.van-popup__close-icon--top-right {
    top: 23px;
    right: 16px;
  }
  .pop-title {
    font-size: 18px;
    font-family: Helvetica;
    color: rgba(0, 0, 0, 1);
  }
  .pop-box {
    margin-top: 25px;
    .pop-subtitle {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
    }
    .pop-list {
      margin-top: 15px;
      display: flex;
      align-items: center;
      .pop-tag {
        width: 91px;
        height: 31px;
        background-color: #f1f1f1;
        border-radius: 16px;
        border: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        &.active {
          background: #e5f9f6;
          border-color: $primary;
          color: $primary;
        }
        &.disabled {
          color: #ccc;
        }
      }
    }
  }
  .van-button {
    margin-top: 56px;
  }
}
.warn-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 10px;
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
.drug-bg {
  background: #f9f9f9;
  min-height: 100%;
}
.drug-from {
  background: #f9f9f9;
  padding: 10px;
  min-height: 100%;
  > .module {
    border-radius: 3px;
    overflow: hidden;
    margin-top: 10px;
    background-color: #fff;
    .more {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        display: block;
        top: 50%;
        transform: translateY(-50%);
        right: 0px;
        width: 6px;
        height: 10px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('~@src/assets/images/icons/icon-next.jpg');
      }
    }
    .line {
      height: 0.5px;
      background: #eee;
      margin-top: 8px;
    }
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
  padding: 15px;
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
.addr-tit {
  font-size: 14px;
  position: relative;
  padding-left: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  margin-bottom: 5px;
}
.addr-tit::before {
  content: '';
  position: absolute;
  left: 0px;
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
  padding: 8px 15px;
}
.intro .dl-packet .dt {
  font-size: 13px;
  padding: 2px 0;
}
.intro .dl-packet .dd {
  font-size: 13px;
  padding: 2px 15px 2px 0;
}
.dl-packet .dt {
  width: 140px;
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
  padding: 8px 15px 3px;
}
.str .dt {
  font-size: 14px;
  &.money {
    color: #333333;
    line-height: 2.8;
  }
}
.str .dd {
  font-size: 12px;
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
  margin-top: -2.5px;
}
.tab-content .block {
  font-size: 16px;
  color: #00c6ae;
  .icon {
    margin-right: 8px;
  }
}
.userAddr {
  width: 100%;
  padding-right: 18px;
  position: relative;
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
  right: 0px;
  width: 6px;
  height: 10px;
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
  width: 6px;
  height: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/icons/icon-next.jpg');
}
.list-three:last-child {
  border-bottom: 0;
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
