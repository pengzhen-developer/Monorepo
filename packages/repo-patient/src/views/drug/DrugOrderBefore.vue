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
              <div class="addr-p">{{order.Province}}{{order.City}}{{order.County}}{{order.Detailed}}</div>
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
                 v-for="(item, index) in order.Drugs"
                 :key="index">
              <div :class="item.DrugImage?'list-icon':'list-icon list-icon-none'">
                <img :src="item.DrugImage"
                     v-if="item.DrugImage" />
              </div>
              <div class="list-content">
                <div class="content-title">{{item.DrugName}}</div>
                <div class="content-brief">{{item.DrugSpecification}}</div>
              </div>
              <div class="list-other">
                <div class="other-them"
                     @click="goInterDrugPage(item)">说明书</div>
                <div class="other-price">
                  <div class="price">￥{{item.Price}}</div>
                  x{{item.DrugQty}}
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
          <div class="dt">药品金额 ：</div>
          <div class="dd money">￥{{order.TotalAmount.toFixed(2)}}
          </div>
        </div>
        <div class="dl-packet"
             v-if="page.tabIndex == '1'">
          <div class="dt">配送费 ：</div>
          <div class="dd money">￥{{order.OperaShippingFee.toFixed(2)}}</div>
        </div>
        <template v-if="canShowDiscount">
          <div class="line"></div>
          <div class="dl-packet">
            <div class="dt">优惠金额 ：</div>
            <div class="dd"
                 :class="{'money':PromotionsCut>0}">{{PromotionsCut}}</div>
          </div>
        </template>
        <template v-if="canShowYibao">
          <div class="line"></div>
          <div class="dl-packet">
            <div class="dt">使用医保卡 ：</div>
            <div class="dd"
                 :class="{'money':yibaoChecked||order.MedicalCardNo}"
                 @click="chooseYibao">{{ order.MedicalCardNo || yibaoText }}</div>
          </div>
        </template>
        <template v-if="canShowShangbao">
          <div class="line"></div>
          <div class="dl-packet">
            <div class="dt">商保权益抵扣 ：</div>
            <div class="dd">请选择</div>
          </div>
        </template>
      </div>
      <div class="tips-bottom">
        {{page.tabIndex == '0' ? '商家接单后将为您保留药品，请及时到店自提' : '商家接单后将在1-3个工作日内为您安排发货'}}
      </div>
      <div class="bottom">
        <peace-button v-on:click="submitOrder('wxpay')"
                      size="large"
                      throttle
                      :throttleTime="3000"
                      type="primary">提交订单</peace-button>
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
        <div class="pop-subtitle">配送方式</div>
        <div class="pop-list">
          <div class="pop-tag"
               :class="{'active':json.tabIndex==item.Value,'disabled':!item.Visible}"
               v-for="(item,index) in NewShippingMethod"
               :key="index"
               @click="changeTab(item)">
            {{item.Label}}
          </div>
        </div>
      </div>
      <div class="pop-box">
        <div class="pop-subtitle">支付方式</div>
        <div class="pop-list">
          <div class="pop-tag"
               :class="{'active':json.payIndex==item.Value,'disabled':!item.Visible}"
               v-for="(item,index) in payList"
               :key="index"
               @click="selectPay(item)">
            {{item.Label}}
          </div>

        </div>
      </div>

      <van-button type="primary"
                  round
                  @click="changeShowPopup"
                  size="large">确认</van-button>
    </van-popup>
    <!-- 医保 -->
    <template v-if="order!=null">
      <YibaoCaedSelect v-model="showCard"
                       ref='yibaoCardSelect'
                       :info="info"
                       @onSuccess="onSuccess"></YibaoCaedSelect>

    </template>
    <!-- 确认支付弹框 -->
    <ExpenseDetail v-model="dialog.visible"
                   :info="dialog.data"></ExpenseDetail>
  </div>
</template>

<script>
import YibaoCaedSelect from '@src/views/components/YibaoCardSelect'
import ExpenseDetail from '@src/views/components//ExpenseDetail'
import peace from '@src/library'

export default {
  name: 'DrugOrderBefore',
  components: { YibaoCaedSelect, ExpenseDetail },
  data() {
    return {
      payList: [],
      NewShippingMethod: [],
      payName: '',
      showPopup: false,
      colseIcon: require('@src/assets/images/ic_close@2x.png'),
      hasSubmitOrder: false,

      orderId: '',
      showBtn: true,
      page: {
        json: {},
        tabIndex: '',
        payIndex: '',
        canSubmit: false,
        cardno: ''
      },
      json: {
        tabIndex: '',
        payIndex: ''
      },
      userAddr: {},
      order: null,
      CustomerType: '',
      showCard: false,
      yibaoText: '请选择',
      yibaoChecked: false,
      shangbaoChecked: false,
      yibaoInfo: {},
      dialog: {
        visible: false,
        data: {}
      }
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
    info() {
      return {
        familyName: this.page?.json?.familyName,
        familyId: this.page?.json?.familyId,
        serviceType: 'drug',
        jntPrescriptionNo: this.page?.json?.JztClaimNo
      }
    },
    canShowYibao() {
      return this.order?.insuranceConfig?.medicalInsuranceConfig != null && this.order?.MedicalCardNo ? true : false
    },
    canShowShangbao() {
      //H5暂无商保对接
      // return this.order?.insuranceConfig?.commercialInsuranceConfig != null ? true : false
      return false
    },
    canShowDiscount() {
      //当前迭代暂无优惠活动
      // return this.order?.OperaPromotionsCut > 0 ?true : false
      return false
    },
    PromotionsCut() {
      if (this.order.OperaPromotionsCut > 0) {
        return '-￥' + this.order.OperaPromotionsCut.toFixed(2)
      } else {
        return '暂无可用'
      }
    }
  },
  methods: {
    getPayName() {
      this.payName = this.payList.find((item) => item.Value == this.page.payIndex)?.Label
    },
    onReset() {
      /** 重置医保相关信息*/
      this.$refs.yibaoCardSelect.selected = false
      this.$refs.yibaoCardSelect.checked = false
      this.$refs.yibaoInfo = {}
      this.yibaoText = ''
      this.yibaoInfo = {}
      this.yibaoChecked = false
    },
    onSuccess(result) {
      this.yibaoChecked = result.checked
      this.yibaoText = result.yibaoInfo.medCardNo
      this.yibaoInfo = result.yibaoInfo
    },
    chooseYibao() {
      if (!this.order.MedicalCardNo) {
        this.showCard = true
      }
    },
    selectAddressCallback(json) {
      if (json) {
        this.initData(json)
      }
    },
    initData(json) {
      const params = peace.util.decode(json)
      /** 0 到店取药 1 配送到家 2到店取药+配送到家 */
      /**如果是2的话默认展示 配送到家；否则展示 到店取药or配送到家 */
      this.page.tabIndex = params.ShippingMethod == '0' ? '0' : '1'
      this.page.json = params
      this.CustomerType = params.CustomerType
      this.Detailed = params.Detailed
    },
    goDrugPhaHomePage() {
      if (!this.showBtn) {
        return
      }

      //云药房不跳转店铺详情
      if (this.CustomerType == '50') {
        return
      }
      //this.order 包含药店详情信息
      const json = peace.util.encode(this.order)
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
      if (!this.showBtn) {
        return
      }
      let json = peace.util.decode(this.$route.params.json)
      const param = peace.util.encode({ ...json, emit: 'SelectAddress' })

      this.$router.push(`/setting/SelectAddressManger/${param}`)
    },

    submitOrder() {
      if (this.canShowYibao) {
        this.yibaoInfo.medCardNo = this.order.MedicalCardNo
      }
      //若未选择支付方式，不能提交订单
      if (this.page.payIndex < 1) {
        peace.util.alert('请选择支付方式')
        return
      }
      let paymentType = ''
      //支付方式：wxpay（微信） shangbao（商保支付） yibaopay（医保支付）deliverypay（货到付款） shoppay（到店支付）
      //payMode 1 配送在线支付  2 自提到店支付  3 配送货到付款  4自提在线支付
      const paymentTypeMap = {
        1: 'wxpay',
        2: 'shoppay',
        3: 'deliverypay',
        4: 'wxpay'
      }
      const price = this.order.TotalAmount + (this.page.tabIndex == 1 ? this.order.OperaShippingFee : 0)
      if (price > 0) {
        paymentType = paymentTypeMap[this.page.payIndex]
      }

      const shangbao = this.shangbaoChecked ? ',shangbao' : ''
      const yibao = this.yibaoChecked ? ',yibaopay' : ''
      paymentType = paymentType + shangbao + yibao

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
        paymentType,
        jztClaimNo: this.order.jztClaimNo,
        drugStoreId: this.order.DrugStoreId,
        accessCode: this.order.AccessCode,
        shippingMethod: +this.page.tabIndex, // 0 自提 1配送
        receiverState: +this.page.tabIndex ? this.userAddr.province : this.order.Province,
        receiverCity: +this.page.tabIndex ? this.userAddr.city : this.order.City,
        receiverDistrict: +this.page.tabIndex ? this.userAddr.district : this.order.County,
        receiverAddress: +this.page.tabIndex ? this.userAddr.address : this.order.Detailed,
        receiver: this.userAddr.consignee || '',
        receiverPhone: this.userAddr.mobile || '',
        payMode: this.page.payIndex,
        cardNo: this.page.cardno,
        medCardNo: this.yibaoInfo.medCardNo
      }
      peace.service.patient
        .submitOrder(params)
        .then((res) => {
          let orderNo = res.data.orderNo
          this.orderId = res.data.orderNo
          let orderType = 'drug'
          let money = res.data.orderMoney
          let moneyRecord = res.data.moneyRecord //费用明细
          let params = { orderNo, orderType, money, moneyRecord }
          //payMode 1 配送在线支付  2 自提到店支付  3 配送货到付款  4自提在线支付
          if (this.page.payIndex == 2 || this.page.payIndex == 3) {
            this.payCallback()
          } else {
            this.dialog.visible = true
            this.dialog.data = params
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
      const json = peace.util.encode({ orderNo: orderId })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    },

    selectPay(item) {
      if (!item.Visible) {
        return
      }
      if (item.Value == this.json.payIndex) {
        return
      }
      this.json.payIndex = item.Value
    },
    changeTab(item) {
      if (!item.Visible) {
        return
      }
      if (item.Value == this.json.tabIndex) {
        return
      }
      this.json.tabIndex = item.Value
      this.payList = [].concat(item.PayModel)
      this.json.payIndex = this.payList.find((pay) => pay.Visible)?.Value
    },
    changeShowPopup() {
      if (!this.showBtn) {
        return
      }
      this.showPopup = !this.showPopup
      if (!this.showPopup) {
        //仅 在线支付可用医保抵扣
        //故 重置选择医保
        if (this.page.payIndex != this.json.payIndex || this.page.tabIndex != this.json.tabIndex) {
          this.onReset()
        }
        this.page.tabIndex = this.json.tabIndex
        this.page.payIndex = this.json.payIndex
        this.getPayName()
      } else {
        this.json.tabIndex = this.page.tabIndex
        this.payList = [].concat(this.NewShippingMethod.find((item) => item.Value == this.json.tabIndex).PayModel)
        this.json.payIndex = this.page.payIndex
      }
    },
    getPhaOrder() {
      const json = peace.util.decode(this.$route.params.json)
      const params = {
        accessCode: json.AccessCode,
        jztClaimNo: json.JztClaimNo,
        drugStoreId: json.DrugStoreId
      }
      peace.service.patient.getOrderBefore(params).then((res) => {
        this.order = res.data
        //货到付款 暂无业务 不可选
        res.data.NewShippingMethod.map((item) => {
          item.PayModel.map((pay) => {
            if (pay.Value == 3) {
              pay.Visible = false
            }
          })
        })

        this.NewShippingMethod = peace.util.deepClone(res.data.NewShippingMethod)
        this.payList = res.data.NewShippingMethod.find((item) => item.Visible)?.PayModel
        this.page.payIndex = this.payList.find((item) => item.Visible)?.Value

        this.getPayName()
      })
    },

    goInterDrugPage(item) {
      if (!this.showBtn) {
        return
      }
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
  padding: 10px 10px 60px 10px;
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
      margin: 4px 0;
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
  width: 7px;
  height: 12px;
  display: block;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
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
  line-height: 1;
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
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #999;
  &.money {
    color: #4e4e4e;
  }
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
  height: 77px;
  padding: 15px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  // display: block;
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  // margin-bottom: 3px;
  // margin-left: 2px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('~@src/assets/images/ic_wenhao.png');
}
.list-icon.list-icon-none {
  padding: 0;
  background-color: #f7f7f7;
  background-size: cover;
  background-image: url('~@src/assets/images/icons/ic_none_drug.png');
}
</style>
