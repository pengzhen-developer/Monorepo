<template>
  <form bindsubmit="submitOrder"
        report-submit="true">
    <div class="top">
      <!--tab-->
      <div class="tab">
        <div @click="changeTab(0)"
             :class="page.tabIndex == '0' ? 'tab-item active' : 'tab-item'">
          <div class="span">到店取药</div>
        </div>
        <div @click="changeTab(1)"
             :class="page.tabIndex == '1' ? 'tab-item active' : 'tab-item'">
          <div class="span">配送到家</div>
        </div>
      </div>
      <!--tab^content-->
      <div class="content">
        <div class="tab-content"
             v-if="page.tabIndex == '0'">
          <div class="addr-tit">取药地址</div>
          <div class="addr-p">{{order.Detailed}}</div>
        </div>
        <div class="tab-content"
             v-if="page.tabIndex == '1'">
          <div class="addr-tit">我的地址</div>
          <div v-if="userAddr && userAddr.detailAddress"
               @click="goUserAddrPage"
               class="userAddr icon-next">
            <div class="addr-p">收货人：{{userAddr.consignee}}
              <div class="inline">{{userAddr.mobile}}</div>
            </div>
            <div class="addr-p">{{userAddr.detailAddress}}</div>
          </div>
          <div v-else>
            <div class="block"
                 @click="goUserAddrPage">
              <div class="icon icon-add"></div>
              添加收货地址
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="panel-pha">
        <div class="panel-head icon-next"
             bindtap="goDrugPhaHomePage">
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
              <div class="dd">￥0</div>
            </div>
            <div class="dl-packet">
              <div class="dt">订单总价:</div>
              <div class="dd">￥{{order.TotalAmount}}</div>
            </div>
          </div>
          <div class="module str">
            <div class="dl-packet">
              <div class="dt">应付金额:</div>
              <div class="dd">
                <div class="strong">￥{{order.TotalAmount}}</div>
                {{page.tabIndex == '0' ? '(价格以实际到店为准)' : ''}}

              </div>
            </div>
          </div>
          <div class="bottom">

            <div @click="submitOrder"
                 :class="page.canSubmit ? 'btn block btn-blue' : 'btn block btn-default'">提交订单</div>

            <div class="tips-bottom">
              {{page.tabIndex == '0' ? '商家接单后将为您保留药品，请及时到店自提' : '商家接单后将在1-3个工作日内为您安排发货'}}
            </div>
          </div>
        </div>
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
      order: {}
    }
  },
  mounted() {
    const params = peace.util.decode(this.$route.params.json)
    this.page.tabIndex = params.ShippingMethod == '1' ? '1' : '0'
    this.page.json = params
    this.getPhaOrder()
    //从地址页面返回
    if (this.$route.query.addr) {
      this.getAddr(this.$route.query.addr)
    }
    // if (this.$route.query.code) {
    //   let code = this.$route.query.code
    //   let orderNo = this.$route.query.orderId
    //   let params = { code, orderNo }
    //   peace.service.index.GetWxLoginStatus(params).then(res => {
    //     let data = res.data
    //     peace.wx.payInvoke(data, this.payCallback)
    //   })
    // }
    this.getDefaultAddress()
  },
  methods: {
    getDefaultAddress() {
      peace.service.patient.getDefaultAddress().then(res => {
        this.userAddr = res.data
        this.canSubmitProcesses()
        //console.log('ressssssssssssssssssssssssss',res);
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
    submitOrder() {
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
        JZTClaimNo: this.page.json.JZTClaimNo,
        DrugStoreId: this.page.json.DrugStoreId,
        AccessCode: this.page.json.AccessCode,
        familyId: this.page.json.familyId,
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
          peace.wx.pay(params, null, this.payCallback, this.payCallback, '?' + 'orderId=' + orderNo)
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
      console.log('can', bool)
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
      // 测试用例
      // data = {
      //     JZTClaimNo: '870000-201901171529010179-240808',
      //     DrugStoreId:'O1CB1P',
      //     AccessCode:'GJ1FST',
      // }
      // 测试用例结束
      peace.service.patient.getOrderBefore(params).then(res => {
        //console.log(res);
        this.order = res.data

        this.canSubmitProcesses()
      })
    },

    goInterDrugPage(item) {
      const params = peace.util.encode({ name: item.DrugName })
      this.$router.replace(`/inter/drugInterList/${params}`)
    }
  }
}
</script>

<style scoped lang="scss">
page {
  background: #f5f5f5;
}
.top,
.container {
  background: #fff;
}
.top {
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
  padding: 5px 10px;
}
.tab-content .addr-tit {
  font-size: 15px;
  position: relative;
  padding-left: 24px;
}
.tab-content .addr-tit::before {
  content: '';
  position: absolute;
  left: 0px;
  top: 3px;
  width: 14px;
  height: 17px;
  background-size: 100% 100%;
  background-image: url('../../assets/images/icons/addr-tit.jpg');
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
  position: relative;
}

.panel-head .head-ico {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e5e5;
  margin-right: 10px;
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
  font-size: 30rpx;
  border-radius: 4rpx;
  padding-left: 30rpx;
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
  font-size: 11px;
  color: #999;
}
.str .strong {
  color: #ff344d;
  font-size: 20px;
  font-weight: bold;
}
.bottom .btn {
  width: 100%;
  margin: 5px 0;
  border-color: #00c6ae;
  background-color: #00c6ae;
  color: #fff;
  padding: 13px;
  text-align: center;
}
.btn.btn-default {
  background: #e0e0e0;
  border-color: #e0e0e0;
  color: #999999;
}
.bottom .tips-bottom {
  text-align: center;
}
.icon-add {
  width: 15px;
  height: 15px;
  background-size: cover;
  background-image: url('../../assets/images/icons/toolfk-img.jpg');
  margin-top: -5px;
}
.tab-content .block {
  font-size: 15px;
  color: #00c6ae;
  text-align: center;
  margin: 10px;
}
.userAddr {
  width: 100%;
  padding-right: 20px;
  position: relative;
}
.userAddr.icon-next::after {
  content: '';
  position: absolute;
  display: block;
  // top: 15px;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  width: 7px;
  height: 12px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/icons/icon-next.jpg');
}
.addr-p .inline {
  float: right;
}
.list-three .list-other {
  flex: 0 1 65px;
  width: 65px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  text-align: right;
}

.list-other .other-them::after {
  content: '?  ';
  display: inline-block;
  width: 10px;
  height: 10px;
  line-height: 1;
  vertical-align: middle;
  background: #00c6ae;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  margin-bottom: 3px;
  margin-left: 2px;
  padding: 0;
  text-align: center;
}
.list-icon.list-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url('../../assets/images/icons/nocontent.jpg');
}
</style>
