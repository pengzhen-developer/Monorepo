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
          <div class="module">
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
import config from '@src/config'
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
    if (this.$route.query.code) {
      let code = this.$route.query.code
      let orderNo = this.$route.query.orderId
      let params = { code, orderNo }
      peace.service.index.GetWxLoginStatus(params).then(res => {
        let data = res.data
        peace.wx.payInvoke(data, this.payCallback)
      })
    }
    this.getDefaultAddress();
  },
  methods: {
    getDefaultAddress() {
      peace.service.patient.getDefaultAddress().then(res => {
         this.userAddr = res.data;
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
      this.$router.replace(`/setting/SelectAddressManger/${json}`)
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
          peace.wx.pay(params, null, this.payCallback, null, '?' + 'orderId=' + orderNo)
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

<style scoped>
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
  background-image: url(data:image/png;base64,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);
}
.tab-content .addr-p {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
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
  width: 56rpx;
  height: 56rpx;
  border: 2rpx solid #e5e5e5;
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
  background-image: url(data:image/png;base64,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);
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
  top: 15px;
  right: 0px;
  width: 7px;
  height: 12px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAkCAMAAABR74GsAAAANlBMVEVHcEzPz8/Pz8/Pz8/Ozs7R0dHQ0NDNzc3Ozs7Ozs7Q0NDPz8/Pz8/Pz8/Pz8/Pz8/Ozs7Ozs6NXauoAAAAEXRSTlMAa1XefxguCvjsQai0jZzFvytu9msAAACQSURBVCjPjZJLFoAgDAMLCkXx1/tfVgu7JgtdzgtTKRGpvQh89bZlB9rNbKmRlofiejjOkB4Y3Ho0sw1w8ZFb5hgl1ydpKLk8nTSmT+rW0yU40tMNJav/dxKGjafbCjgNHCWMUsOcFuE4nn7cYt4YINkO3eTceo6QHWevqZ28vLKW0EYVLw60jzeVt/rzQlJeyzYKJQAM6ZcAAAAASUVORK5CYII=);
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
  background: #00c6ae;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  margin-top: 2px;
  margin-left: 2px;
  padding: 0;
  text-align: center;
}
.list-icon.list-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAQABJREFUeAHsnQm4HUWZ/m/YAyRkI4lkFEEBDYKIC4MLKuIo7o6O28w4uI3LjCQogoKiiKiIC6CgowOK68BfRUfEbRREFgFlRzYFUbOQHUIgEJb/7+3cuvTte8693ef0ft56nj59uru66qu3quut76ttaMjOCBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACRsAIGAEjYAQqRmBSxfE7eiMwUAg89NBDWy1ZsuSpJPoZHDtxbMUxmUPuJo4/bLrpptfNnj37mkmTJj0Y3fWPETACRiAFAib0FCDZixHoBwFIfNLtt9/+4gceeGAB4ezHscVE4UHmf8HP1zfbbLPTIfc/TuTfz42AETACJnSXASNQEAIQ+SZLly79N87v43h8Mho08SGIOzp4PgThD+mcdPj57uabb75g++23X5x85msjYASMQEDAhB6Q8NkI5IgAZvVnP/jggycQ5F4h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dMqrfTu9s/1TxperIzoCIyew5hnLyNVWhQj0IVDaOifJrdncKdMX8vk1l6kv53soybypyqfS/6VpuNLe1P901qO2ttqVrkyNwcql9hwYzXaqQpqv/RbjfzpNM45A3QLO0OveAjWWnwTwMDuoizVWoaXo3Le9lh3p7paRPziQPymZTdOn6cTd2RbqSYbP5l75s7bxQxtMWY2cpR9OXa6nkPJCmEq6bMdGAp3JVYDbVQRMvJm4/V1FrPWOkW19KL6l2dvA3dTU1LvcAjkch1uJtWUlUIYvxfjmyrBvAqMmIKGP2hZZ3/q8zpO699e3yO6lJdl97D51sCnlX8ES92SW/pbsslN+nv6SyB8NFvHHlkq5C0kW+xLleOpSvvckaezId9f3mjeXmGXKg1hv8lnMcos5ICtPW89lfOvbZZoX6r//bdz+63+x+pfItn5bRS1yFv447eAP5ADhTuKV7XMvyfyPKmKLQWBYAhL6sGTFHRmBJNG/sqO/kAo9Tf/duiuWZFHuw9b6XvK6Dcah/PIPajn42p+DpasTExMnKj5oGgcCdRwzgZXXKo5ZtVWXAAECBJYZonLuAAACGElEQVRbcbRc3ZmcnHzlhTd+GwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRGSuArlRICPdKUU3UAAAAASUVORK5CYII=);
}
</style>
