<template>
  <div class="userorderList">
    <van-list :loading="loading"
              v-model="loading"
              :finished="finish"
              :finished-text="orderList.length>0?'没有更多了':''"
              @load="get"
              class="content"
              :class="orderList.length>0&&'min'">

      <div v-if="orderList.length">
        <template v-for="(item,index) in orderList">
          <!-- 服务包 -->
          <div class="order-item"
               :key="index"
               v-if="item.orderType=='servicePackage'">
            <div @click="goServicePackageDateilPage(item,index,'countDown_servicePackage_')">
              <div class="order-item-doctor-info">
                <van-image v-bind:src='item.doctorInfo.avartor'
                           class="order-item-doctor-info-avatar"></van-image>
                <div class="order-item-doctor-info-body">
                  <div class="order-item-doctor-info-body-top">
                    <div class="name">{{item.doctorInfo.name}}<span>{{item.doctorInfo.deptName}}</span></div>
                    <div :class="['strip-eye','color-' + item.orderType + '-' +item.orderStatus]"
                         v-if="item.orderStatus">
                      {{item.orderStatusTxt}}
                    </div>
                  </div>
                  <div :class="['order-tag','color-'+item.inquiryTypeStyle]">{{item.inquiryType}}</div>
                </div>
              </div>
              <div class="order-item-order-info">
                <div class="order-item-order-info-item start">
                  <div class="order-item-order-info-item-key">服务包：</div>
                  <div class="order-item-order-info-item-val block">{{item.servicePackageName}}</div>
                </div>
                <div class="order-item-order-info-item">
                  <!-- 订单金额  totalMoney  应付金额 orderMoney  实付金额 payMoney -->
                  <div class="order-item-order-info-item-key">订单金额：</div>
                  <div class="order-item-order-info-item-val">
                    <peace-price class="refund"
                                 v-bind:price="item.totalMoney"></peace-price>
                    <div v-if="item.payStatus===5||item.payStatus===4">
                      <span style="margin-left:-4px;">({{item.payStatus===4?'退款中':'已退款'}}</span>
                      <peace-price v-bind:price="item.payMoney"></peace-price>
                      <span style="margin-left:-4px;">)</span>
                    </div>
                  </div>
                </div>
                <div class="order-item-order-info-item"
                     v-if="item.orderStatus ===3">
                  <div class="order-item-order-info-item-key">有效期：</div>
                  <div class="order-item-order-info-item-val">{{item.serviceStartDate}} 至 {{item.serviceExpireDate}}</div>
                </div>
              </div>
            </div>
            <div class="order-item-order-bottom"
                 v-if="item.orderStatus==1">
              <div class="count-down">
                <span>订单关闭倒计时：</span>
                <van-count-down millisecond
                                @finish="finishHander(item,index)"
                                :ref="'countDown_servicePackage_' + index"
                                :time="item.time"
                                format="mm:ss" />
              </div>
              <peace-button class="label blue"
                            @click="goPay(item,index,'countDown_servicePackage_')"
                            throttle
                            :throttleTime="3000">
                继续支付
              </peace-button>
            </div>
          </div>
          <!-- 咨询订单 -->
          <div class="order-item"
               :key="index"
               v-if="item.orderType=='inquiry'||item.orderType=='returnVisit'">
            <div @click="goConsultDetailPage(item,index,'countDown_inquiry_')">
              <div class="order-item-doctor-info">
                <van-image v-bind:src='item.doctorInfo.avartor'
                           class="order-item-doctor-info-avatar"></van-image>
                <div class="order-item-doctor-info-body">
                  <div class="order-item-doctor-info-body-top">
                    <div class="name">{{item.doctorInfo.name}}<span>{{item.doctorInfo.deptName}}</span></div>
                    <div :class="['strip-eye','color-' + item.orderType + '-' +item.inquiryInfo.inquiryStatus]"
                         :style="{'color':item.heightLight&&'#00c6ae'}"
                         v-if="item.inquiryInfo&&item.inquiryInfo.inquiryStatus">
                      {{item.inquiryInfo.statusTxt}}
                    </div>
                  </div>
                  <div :class="['order-tag','color-'+item.inquiryTypeStyle]">{{item.inquiryType}}</div>
                </div>
              </div>
              <div class="order-item-order-info">
                <div class="order-item-order-info-item">
                  <div class="order-item-order-info-item-key">就诊人：</div>
                  <div class="order-item-order-info-item-val"
                       v-if="item.familyInfo">{{item.familyInfo.familyName}}
                    {{item.familyInfo.familySex}}
                    {{item.familyInfo.familyAge}}</div>
                </div>
                <template v-if="item.orderInfo&&item.orderInfo.servicePackageName">
                  <div class="order-item-order-info-item start">
                    <div class="order-item-order-info-item-key">服务包：</div>
                    <div class="order-item-order-info-item-val block">
                      <span>{{item.orderInfo.servicePackageName}} - {{item.orderInfo.equitiesName}}</span>
                      <span v-if="!getServicePackageInquiryShowMoreText(item.inquiryInfo.inquiryStatus)">(已退回)</span>
                    </div>
                  </div>
                  <div class="order-item-order-info-item">
                    <div class="order-item-order-info-item-key">订单金额：</div>
                    <div class="order-item-order-info-item-val">
                      <!-- v-bind:style="{color:getServicePackageInquiryPriceColor(item.inquiryInfo.inquiryStatus)}" -->
                      <peace-price v-bind:price="item.orderInfo.totalMoney"
                                   class="refund"></peace-price>
                      <span v-if="getServicePackageInquiryShowMoreText(item.inquiryInfo.inquiryStatus)"
                            style="color:rgba(51,51,51,0.6);margin-left:-4px;">(减去服务包费用)</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="order-item-order-info-item">
                    <div class="order-item-order-info-item-key">订单金额：</div>
                    <div class="order-item-order-info-item-val"
                         v-if="item.orderInfo">
                      <span class="refund"
                            v-if="item.orderInfo.totalMoney == 0||item.orderInfo.totalMoney == null">
                        免费
                      </span>
                      <peace-price class="refund"
                                   v-bind:price="item.orderInfo.totalMoney"
                                   v-else></peace-price>

                      <div v-if="item.orderInfo.refundTime">
                        <span style="margin-left:-4px;">(已退款</span>
                        <peace-price v-bind:price="item.orderInfo.totalMoney"></peace-price>
                        <span style="margin-left:-4px;">)</span>
                      </div>
                    </div>
                  </div>
                  <div class="order-item-order-info-item"
                       v-if="item.inquiryInfo.serviceType=='returnVisit'">
                    <div class="order-item-order-info-item-key">复诊时间：</div>
                    <div class="order-item-order-info-item-val">{{item.inquiryInfo.appointmentTime.replace(/\//g,'-')}}</div>
                  </div>
                  <div class="order-item-order-info-item"
                       v-else>
                    <div class="order-item-order-info-item-key">下单时间：</div>
                    <div class="order-item-order-info-item-val">{{item.orderInfo.orderTime.replace(/\//g,'-')}}</div>
                  </div>
                </template>
              </div>
            </div>
            <div class="order-item-order-bottom"
                 v-if="canShowPanelBottomInquiry(item)">
              <div class="count-down">
                <template v-if="OrderCloseCountDown(item)">
                  <span>订单关闭倒计时：</span>
                  <van-count-down millisecond
                                  @finish="finishHander(item,index)"
                                  :ref="'countDown_inquiry_' + index"
                                  :time="item.time"
                                  format="mm:ss" />
                </template>
                <template v-if="OrderReceptCountDown(item)">
                  <span>医生接诊倒计时：</span>
                  <van-count-down millisecond
                                  @finish="finishHander(item,index)"
                                  :time="item.time"
                                  format="HH:mm:ss" />
                </template>
              </div>
              <peace-button class="label blue"
                            v-if="canShowPaybutton(item)"
                            @click="goPay(item,index,'countDown_inquiry_')"
                            throttle
                            :throttleTime="3000">
                继续支付
              </peace-button>
              <van-button class="label"
                          @click="changeInvoiceModel(item)"
                          v-if="cnaShowApplyBtn(item)">
                申请发票
              </van-button>
            </div>
          </div>

          <!-- 预约挂号 -->
          <div class="order-item"
               :key="index"
               v-if="item.orderType=='register'">
            <div @click="goOrderDetailPage(item,index,'countDown_register_')">
              <div class="order-item-doctor-info">
                <van-image v-bind:src='item.doctorInfo.avartor'
                           class="order-item-doctor-info-avatar"></van-image>
                <div class="order-item-doctor-info-body">
                  <div class="order-item-doctor-info-body-top">
                    <div class="name">{{item.doctorInfo.name}}<span>{{item.doctorInfo.deptName}}</span></div>
                    <div :class="['strip-eye','color-' + item.orderType + '-' +item.orderStatus]">
                      <!-- {{item.inquiryInfo.statusTxt}} -->
                      {{page.orderTypeMap[item.orderType][item.orderStatus]}}
                    </div>
                  </div>
                  <div :class="['order-tag','color-'+item.inquiryTypeStyle]">{{item.inquiryType}}</div>
                </div>
              </div>
              <div class="order-item-order-info">
                <div class="order-item-order-info-item">
                  <div class="order-item-order-info-item-key">就诊人：</div>
                  <div class="order-item-order-info-item-val"
                       v-if="item.familyInfo">{{item.familyInfo.name||item.familyInfo.familyName}}
                    {{item.familyInfo.sex||''}}
                    {{item.familyInfo.age||''}}</div>
                </div>
                <div class="order-item-order-info-item">
                  <div class="order-item-order-info-item-key">预约就诊时间：</div>
                  <div class="order-item-order-info-item-val">{{item.bookDate.replace(/\//g,'-')}}</div>
                </div>
                <div class="order-item-order-info-item">
                  <div class="order-item-order-info-item-key">订单金额：</div>
                  <div class="order-item-order-info-item-val">
                    <span class="refund"
                          v-if="item.orderMoney == 0||item.orderMoney == null">
                      免费
                    </span>
                    <peace-price class="refund"
                                 v-bind:price="item.orderMoney"
                                 v-else></peace-price>

                    <div v-if="item.refundTime">
                      <span style="margin-left:-4px;">(已退款</span>
                      <peace-price v-bind:price="item.orderMoney"></peace-price>
                      <span style="margin-left:-4px;">)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-item-order-bottom"
                 v-if="canShowPanelBottomRegister(item)">
              <div class="count-down"
                   v-if="item.orderStatus == '1'&&item.close">
                <span>订单关闭倒计时：</span>
                <van-count-down millisecond
                                @finish="finishHander(item,index)"
                                :ref="'countDown_register_'+index"
                                :time="item.time"
                                format="mm:ss" />
              </div>
              <div class="count-down"
                   v-if="item.orderStatus == '3'"></div>
              <peace-button class="label blue"
                            v-if="item.orderStatus == '1'&&item.close"
                            @click="goPay(item,index,'countDown_register_')"
                            throttle
                            :throttleTime="3000">
                继续支付
              </peace-button>

            </div>
          </div>

          <!-- 购药订单 -->
          <div class="order-item"
               :key="index"
               v-if="item.orderType=='drug'">
            <div>
              <div class="order-item-store-info">
                <van-image v-bind:src='item.drugStoreLogo'
                           class="order-item-store-info-avatar"></van-image>
                <div class="order-item-store-info-body">
                  <div class="name">{{item.drugStoreName}}</div>
                  <div :class="['strip-eye','color-' + item.orderType + '-' +item.callOrderStatus]"
                       v-if="item.callOrderStatus">
                    {{item.callOrderStatusTxt}}
                  </div>
                </div>
              </div>
              <div class="order-item-drug-info"
                   @click="goDrugOrderDateilPage(item,index,'countDown_drug_')">
                <div class="drug-list"
                     v-if="item.drugJson">
                  <van-image v-bind:src="drug.DrugImage"
                             class="error--image"
                             v-for="(drug,index) in item.drugJson"
                             v-bind:key="index">
                    <template v-slot:error>
                      <img :src="require('@src/assets/images/icons/ic_none_drug.png')" />
                    </template>
                  </van-image>
                </div>
                <div class="order-item-drug-info-item">
                  <div class="order-item-drug-info-item-time">{{item.createdTime}}</div>
                  <div class="order-item-drug-info-item-price"
                       v-bind:class="{'refund':item.refundTime}">
                    共{{item.totalNumber}}件药品 合计：
                    <peace-price v-bind:price="item.orderMoney"
                                 v-bind:size="14"></peace-price>
                  </div>
                </div>
                <div class="order-item-drug-info-item end"
                     v-if="item.refundTime">
                  <div class="order-item-drug-info-item-price">
                    <span style="margin-right:-4px;">(已退款：</span>
                    <peace-price v-bind:price="item.payMoney"
                                 v-bind:size="14"></peace-price>
                    <span style="margin-left:-4px;">)</span>
                  </div>
                </div>

              </div>
            </div>
            <div class="order-item-order-bottom drug"
                 v-if="item.callOrderStatus != 5">
              <div class="count-down">
                <template v-if=" item.callOrderStatus == '0'&&item.time>0">
                  <span>订单关闭倒计时：</span>
                  <van-count-down millisecond
                                  @finish="finishHander(item,index)"
                                  :time="item.time"
                                  format="mm:ss" />
                </template>
              </div>
              <van-button class="label"
                          @click="onClickSeeQRCode(item)"
                          v-if="checkQRCodeBtn(item)">取药码</van-button>
              <peace-button class="label blue"
                            v-if="item.callOrderStatus == '0'"
                            @click="payOrder(item,index,'countDown_drug_')"
                            throttle
                            :throttleTime="3000">继续支付</peace-button>
              <van-button class="label"
                          v-if="canShowApplyBtn(item)"
                          @click="changeInvoiceModel(item)">
                申请发票
              </van-button>
              <van-button class="label"
                          v-if="ifShowLogistics(item)"
                          @click="goDrugLogiPage(item)">查看物流
              </van-button>
              <van-button class="label blue"
                          v-if="item.callOrderStatus == '4' && item.shippingMethod != '0'"
                          @click="submitOrder(item)">确认收货
              </van-button>
              <van-button class="label blue"
                          v-if="item.callOrderStatus == '4' && item.shippingMethod == '0'"
                          @click="submitOrder(item)">确认取药
              </van-button>
            </div>
          </div>
        </template>
      </div>
    </van-list>
    <div class="none-page"
         v-if="orderList.length ==0 && loaded">
      <div class="icon icon_none_consult"></div>
      <div class="none-text">暂无订单记录</div>
    </div>

    <!-- 发票弹窗 -->
    <InvoiceModel v-model="showInvoiceModel"
                  :receiptNumber="receiptNumber"></InvoiceModel>

    <!--二维码弹窗-->
    <QRCode :QRCodeURL="QRCodeURL"
            v-model="showQRCode"
            :PickUpCode="pickUpCode"></QRCode>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)

import QRCode from '@src/views/components/QRCode'
import InvoiceModel from '@src/views/components/InvoiceModel'
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
  props: {},
  components: { QRCode, InvoiceModel },
  data() {
    return {
      page: {
        isGet: false,
        none: true,
        json: {},
        orderTypeMap: {
          register: {
            1: '待支付',
            2: '已取消',
            3: '预约成功',
            4: '已完成',
            5: '已退号',
            6: '退款中',
            7: '已退款'
          },
          inquiry: {
            1: '待支付',
            2: '待接诊',
            3: '已接诊',
            4: '已退诊',
            5: '已完成',
            6: '已取消'
          },
          privateDoctor: {
            0: '待支付',
            1: '待接单',
            2: '已取消',
            3: '已生效',
            4: '已退单',
            5: '退款中',
            6: '已退款',
            7: '已完成'
          }
        }
      },
      ENUM,
      data: {},
      orderList: [],
      p: 0,
      size: 10,
      loaded: false,
      finish: false,
      loading: false,
      timer: null,
      orderType: '',
      orderNo: '',
      inquiryId: '',

      showInvoiceModel: false,
      receiptNumber: '',

      showQRCode: false,
      QRCodeURL: '',
      pickUpCode: ''
    }
  },
  activated() {
    this.p = 0
    this.loaded = false
    this.finish = false
    this.orderList = []
    this.get()
  },

  methods: {
    getServicePackageInquiryShowMoreText(status) {
      return status == 4 || status == 6 ? false : true
    },
    getServicePackageInquiryPriceColor(status) {
      return status == 4 || status == 6 ? '#333333' : '#FF3A30'
    },
    canShowApplyBtn(item) {
      return (
        (item.callOrderStatus == this.ENUM.ORDER_STATUS.COMPLETE ||
          item.callOrderStatus == this.ENUM.ORDER_STATUS.SIGNED ||
          item.callOrderStatus == this.ENUM.ORDER_STATUS.SEND) &&
        item.divisionId
      )
    },
    changeInvoiceModel(item) {
      this.showInvoiceModel = true
      this.receiptNumber = item.orderInfo.divisionId || item.divisionId
    },

    cnaShowApplyBtn(item) {
      return (item.inquiryInfo.inquiryStatus == '5' || item.inquiryInfo.inquiryStatus == '3') && item.orderInfo.divisionId
    },
    canShowPaybutton(item) {
      return (
        item.inquiryInfo.inquiryStatus === 1 &&
        (item.inquiryInfo.appointmentStatus == '0' || (item.inquiryInfo.reportTime && item.inquiryInfo.appointmentStatus == '1'))
      )
    },
    canShowPanelBottomRegister(item) {
      return (item.orderStatus == '1' && item.close) || (item.orderStatus == '3' && item.cancelState)
    },
    canShowPanelBottomInquiry(item) {
      return (item.close && this.OrderCloseCountDown(item)) || this.OrderReceptCountDown(item) || this.cnaShowApplyBtn(item)
    },
    OrderCloseCountDown(item) {
      return (
        item.inquiryInfo.inquiryStatus == 1 &&
        (item.inquiryInfo.appointmentStatus == '0' || (item.inquiryInfo.reportTime && item.inquiryInfo.appointmentStatus == '1'))
      )
    },
    OrderReceptCountDown(item) {
      return item.inquiryInfo.inquiryStatus == 2
    },
    finishHander(item, index) {
      if (item.orderType == 'inquiry' || item.orderType == 'returnVisit') {
        //待支付倒计时结束自动取消，待接诊倒计时结束不处理
        if (
          item.inquiryInfo.inquiryStatus == 1 &&
          (item.inquiryInfo.appointmentStatus == 0 || (item.inquiryInfo.reportTime && item.inquiryInfo.appointmentStatus == 1))
        ) {
          item.close = false
          item.inquiryInfo.inquiryStatus = 6
          let orderNo = item.orderInfo.orderNo
          this.cancelInquiryOrder(orderNo, index, 'auto')
          item.inquiryInfo.statusTxt = item.inquiryInfo.appointmentStatus == 1 ? item.inquiryInfo.statusTxt : '已取消'
        }
      } else if (item.orderType == 'register') {
        item.close = false
        let orderNo = item.orderNo
        if (!item.cancelState && item.orderStatus != 1) {
          return
        }
        let type = ''
        if (item.orderStatus == 1) {
          type = 'cancel'
        } else {
          type = 'quit'
        }
        this.cancelRegisterOrder(orderNo, index, type, 'auto')
        item.orderStatus = 2
      } else if (item.orderType == 'drug') {
        //cancelType   1手动取消2自动取消
        const params = { orderNo: item.orderNo, cancelType: 2 }
        peace.service.purchasedrug.CancelOrder(params).finally(() => {
          this.get('init')
        })
      } else if (item.orderType == 'servicePackage') {
        const params = { orderNo: item.orderNo, cancelType: 2, reason: '' }
        peace.service.servicePackage.applyCancel(params).finally(() => {
          this.get('init')
        })
      }
      let data = JSON.parse(JSON.stringify(item))
      this.orderList.splice(index, 1, data)
    },
    goPay(data, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }
      if (data.orderType == 'register' || data.orderType == 'servicePackage') {
        this.orderNo = data.orderNo
      } else if (data.orderType == 'inquiry' || data.orderType == 'returnVisit') {
        this.orderNo = data.orderInfo.orderNo
        this.inquiryId = data.inquiryInfo.inquiryId
      }
      this.orderType = data.orderType
      peace.wx.pay({ orderNo: this.orderNo }, null, this.payCallback, this.payCallback)
    },
    payCallback() {
      if (this.orderType == 'register') {
        this.registerPayCallback()
      } else if (this.orderType == 'inquiry' || this.orderType == 'returnVisit') {
        this.inquiryPayCallback()
      } else if (this.orderType == 'servicePackage') {
        this.servicePackagePayCallback()
      }
    },
    registerPayCallback() {
      let json = peace.util.encode({ orderInfo: { orderNo: this.orderNo, orderType: this.orderType } })
      this.$router.replace(`/setting/order/userOrderDetail/${json}`)
    },
    servicePackagePayCallback() {
      let json = peace.util.encode({ orderNo: this.orderNo })
      this.$router.replace(`/setting/order/userOrderDetail/${json}`)
    },
    inquiryPayCallback() {
      let json = peace.util.encode({
        inquiryId: this.inquiryId
      })
      this.$router.replace(`/setting/userConsultDetail/${json}`)
    },
    get(type) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.getData(type)
          this.timer = null
        }, 500)
      }
    },
    getData(type = '') {
      if (type == 'init') {
        this.p = 0
        this.orderList = []
        this.finished = false
        this.loaded = false
      }
      this.p++
      const orderStatus = peace.util.decode(this.$route.params.json).orderStatus || 0
      const params = { p: this.p, size: this.size, orderStatus: orderStatus }
      peace.service.patient.getOrderList(params).then((res) => {
        if (res.data.list.length > 0) {
          res.data.list.map((item) => {
            item.close = true
            if (item.orderType == 'servicePackage') {
              if (item.expireTime > item.currentTime) {
                item.time = (item.expireTime - item.currentTime) * 1000
              }
              item.inquiryType = '服务包'
              item.inquiryTypeStyle = 'servicePackage'
            } else if (item.orderType == 'drug') {
              if (item.expireTime > item.currentTime) {
                item.time = item.expireTime - item.currentTime
              }
            } else if (item.orderType == 'register') {
              if (item.orderExpireTime > item.currentTime) {
                item.time = (item.orderExpireTime - item.currentTime) * 1000
              }
              item.inquiryType = '预约挂号'
              item.inquiryTypeStyle = 'register'
            } else if (item.orderType == 'inquiry' || item.orderType == 'returnVisit') {
              let inquiryInfo = item.inquiryInfo
              let expireTime = inquiryInfo.inquiryStatus == 1 ? inquiryInfo.orderExpireTime : inquiryInfo.orderReceptTime
              if (expireTime > inquiryInfo.currentTime) {
                item.time = (expireTime - inquiryInfo.currentTime) * 1000
              }
              item.heightLight = false
              if (item.inquiryInfo.serviceType == 'returnVisit') {
                item.inquiryType = '复诊预约'
                item.inquiryTypeStyle = 'returnVisit'

                /** 预约成功-- #00c6ae */
                if (item.inquiryInfo.inquiryStatus == '1' && item.inquiryInfo.appointmentStatus == '1' && !item.inquiryInfo.reportTime) {
                  item.heightLight = true
                }
              } else {
                item.inquiryType = item.orderInfo.inquiryType == 'image' ? '图文咨询' : '视频咨询'
                item.inquiryTypeStyle = item.orderInfo.inquiryType == 'image' ? 'image' : 'video'
              }
            }
          })
        }
        this.orderList = this.orderList.concat(res.data.list)
        this.loaded = true
        this.loading = false
        if (this.p * this.size >= res.data.total) {
          this.finish = true
        }
      })
    },
    showCancellPop(item, index) {
      let orderNo = item.orderInfo.orderNo
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消咨询？'
      })
        .then(() => {
          this.cancelInquiryOrder(orderNo, index, 'hand')
        })
        .catch(() => {
          // on cancel
        })
    },
    cancelInquiryOrder(orderNo, index, type) {
      let params = {
        orderNo: orderNo
      }
      if (type == 'auto') {
        params.cancelType = 2
      }
      peace.service.patient
        .cancel(params)
        .then((res) => {
          if (type == 'hand') {
            peace.util.alert(res.msg)
            if (res.code == '200') {
              let data = this.orderList[index]
              data.inquiryInfo.inquiryStatus = '6'
              this.orderList.splice(index, 1, data)
            }
          }
        })
        .catch(() => {
          let data = this.orderList[index]
          this.orderList.splice(index, 1, data)
        })
    },
    canselOrder(item, index) {
      if (!item.cancelState && item.orderStatus != 1) {
        return
      }
      let type, alertMsg
      if (item.orderStatus == 1) {
        type = 'cancel'
        alertMsg = '是否确认取消'
      } else {
        type = 'quit'
        alertMsg = '是否确认退号'
      }
      Dialog.confirm({
        message: alertMsg
      })
        .then(() => {
          this.cancelRegisterOrder(item.orderNo, index, type, 'hand')
        })
        .catch(() => {
          // on cancel
        })
    },
    cancelRegisterOrder(orderNo, index, type, hasAlert) {
      let params = {
        orderNo: orderNo,
        type: type
      }
      if (hasAlert == 'auto') {
        params.cancelType = 2
      }
      peace.service.appoint
        .orderCancel(params)
        .then((res) => {
          if (hasAlert == 'hand') {
            peace.util.alert(res.msg || '退号成功')
            if (res.code == '200') {
              let data = this.orderList[index]
              if (data.orderStatus == '1') {
                data.orderStatus = '2'
              } else {
                data.orderStatus = '6'
              }
              this.orderList.splice(index, 1, data)
            }
          }
        })
        .catch(() => {
          let data = this.orderList[index]
          this.orderList.splice(index, 1, data)
        })
    },
    goDrugOrderDateilPage(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }

      const json = peace.util.encode({ orderNo: item.orderNo })
      this.$router.push(`/order/userDrugDetail/${json}`)
    },
    goServicePackageDateilPage(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }

      const json = peace.util.encode({ orderNo: item.orderNo })
      this.$router.push(`/setting/order/userServicePackageDetail/${json}`)
    },
    goConsultDetailPage(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }

      let json = peace.util.encode({
        inquiryId: item.inquiryInfo.inquiryId
      })
      this.$router.push(`/setting/userConsultDetail/${json}`)
    },
    goOrderDetailPage(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }
      let json = peace.util.encode({
        orderInfo: item
      })
      this.$router.push(`/setting/order/userOrderDetail/${json}`)
    },
    onClickSeeQRCode(order) {
      this.pickUpCode = order.expressNo
      this.QRCodeURL = order.QRCodeURL
      this.showQRCode = true
    },
    ifShowLogistics(item) {
      return item.shippingMethod === this.ENUM.SHIPPING_METHOD.HOME && item.expressNo
    },

    checkQRCodeBtn(order) {
      const shippingMethod = order.shippingMethod
      const OrderStatus = order.callOrderStatus
      if (shippingMethod === undefined || OrderStatus === undefined) return false
      return shippingMethod === ENUM.SHIPPING_METHOD.SELF && OrderStatus >= ENUM.ORDER_STATUS.ACCEPT && OrderStatus !== ENUM.ORDER_STATUS.CANCEL
    },
    goDrugLogiPage(item) {
      const json = {}
      json.orderNo = item.orderNo
      const params = peace.util.encode(json)

      this.$router.push(`/order/userDrugLogistics/${params}`)
    },

    submitOrder(item) {
      const params = { orderNo: item.orderNo }
      let resTxt = item.shippingMethod ? '收到药品确认无误后再确认收货，以免造成损失' : '收到药品确认无误后再确认取药，以免造成损失'
      peace.util.confirm(resTxt, '温馨提醒', undefined, () => {
        peace.service.purchasedrug.ConfirmReceipt(params).then((res) => {
          peace.util.alert(res.msg)
          this.get('init')
        })
      })
    },
    payOrder(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }
      let orderNo = item.orderNo
      this.currentOrderId = item.orderNo
      let params = { orderNo }
      peace.wx.pay(params, null, this.payCallbackDrug, null, '?' + 'orderId=' + orderNo)
    },
    payCallbackDrug() {
      let orderId = ''
      if (this.$route.query.orderId) {
        //授权跳转后回调
        orderId = this.$route.query.orderId
      } else {
        //直接回调
        orderId = this.currentOrderId
      }
      const json = peace.util.encode({ orderNo: orderId })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.userorderList {
  height: 100%;
  padding: 16px;
}

.order-tag {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 16px;
  padding: 2px 8px;
  border-radius: 2px;
  display: inline-block;
  //register-预约挂号
  //returnVisit-复诊   image-图文问诊 video-视频问诊
  //servicePackage 服务包
  &.color-returnVisit {
    color: #40b2ff;
    background: rgba(64, 178, 255, 0.15);
  }
  &.color-image {
    color: #00c6ae;
    background: rgba(0, 198, 174, 0.15);
  }
  &.color-video {
    color: #00c6ae;
    background: rgba(0, 198, 174, 0.15);
  }
  &.color-register {
    color: #4a83f7;
    background: rgba(74, 131, 247, 0.15);
  }

  &.color-servicePackage {
    color: #b388ff;
    background: rgba(179, 136, 255, 0.15);
  }
}
.order-item {
  background: #ffffff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 16px;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .order-item-doctor-info {
    display: flex;

    .order-item-doctor-info-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 12px;
      overflow: hidden;
      border: 1px solid #f5f5f5;
    }
    .order-item-doctor-info-body {
      flex: 1;
      .order-item-doctor-info-body-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        align-items: center;
        .name {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 24px;
          span {
            font-weight: 400;
            color: rgba(51, 51, 51, 0.6);
            font-size: 14px;
            margin-left: 8px;
          }
        }
      }
    }
  }
  .order-item-store-info {
    display: flex;
    margin-bottom: 16px;
    .order-item-store-info-avatar {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 12px;
    }
    .order-item-store-info-body {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      width: 0;
      .name {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 80%;
      }
    }
  }
  .order-item-drug-info {
    .drug-list {
      padding: 16px 0;
      border-top: 1px solid rgba(51, 51, 51, 0.05);
      border-bottom: 1px solid rgba(51, 51, 51, 0.05);
      .van-image {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        overflow: hidden;
        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
    .order-item-drug-info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
      &.end {
        justify-content: flex-end;
        margin-top: 0;
        color: #ff3a30;
      }
      .order-item-drug-info-item-time {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 0.6);
        line-height: 20px;
      }
      .order-item-drug-info-item-price {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        .peace-price {
          color: #ff3a30;
        }
        &.refund {
          .peace-price {
            color: #333333;
          }
        }
      }
    }
  }
  .order-item-order-info {
    margin-top: 16px;

    .order-item-order-info-item {
      line-height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
      &.start {
        align-items: flex-start;
      }
      .order-item-order-info-item-key {
        color: rgba(51, 51, 51, 0.6);
        padding-right: 6px;
        white-space: nowrap;
      }
      .order-item-order-info-item-val {
        color: rgba(51, 51, 51, 1);
        display: flex;
        align-items: center;
        .refund {
          color: #ff3a30;
        }
        &.block {
          display: block;
          span {
            word-break: break-all;
            &:nth-child(2) {
              margin-left: 5px;
              color: #ff3a30;
            }
          }
        }
        &.ellipsis {
          flex: 1;
          width: 0;
          flex-wrap: nowrap;
          span {
            white-space: nowrap;
            &:first-child {
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &:nth-child(2) {
              // color: #ff3a30;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  .order-item-order-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    margin-top: 8px;
    margin-bottom: -4px;
    border-top: 1px solid rgba(51, 51, 51, 0.05);
    &.drug {
      border: none;
      margin-top: 0;
      justify-content: flex-end;
      .count-down {
        flex: 1;
      }
    }
    .label {
      // margin-left: 0;
    }
    .count-down {
      display: flex;
      margin-right: 5%;

      .van-count-down {
        color: #ffa00c;
      }
      span {
        color: rgba(51, 51, 51, 0.6);
      }
    }
  }
}
// 支付状态-color
.strip-eye {
  flex: 0 0 auto;
  color: #999;
  text-align: right;
  font-size: 14px;
  font-weight: normal;
}
/*
     *   * 挂号订单状态
        register: {
        1:'待支付',2:'已取消',3:'已付款',4:'已完成',5:'已退号',6:'退款中',7:'已退款',
        },
        
        *咨询订单状态
        inquiry: {
            1: '待支付',2: '待接诊',3: '已接诊', 4: '已退诊',5: '已完成',6: '已取消'
          },
        returnVisit: {
            1: '待支付',2: '待接诊',3: '已接诊', 4: '已退诊',5: '已完成',6: '已取消'
          },
        *检查单状态

        *服务包
        servicePackage: {
          1:待支付 ,2:已取消 ,3:服务中, 4:已完成
        }

        *购药
        drug: {
          0:待支付 ; 1:已下单 ;2:已接单 ;3 :已备药/;已发货 4:已自提/;已签收 5:已取消 ;6:已完成
       }
    */
.strip-eye.color-servicePackage-4,
.strip-eye.color-inquiry-5,
.strip-eye.color-drug-6 {
  color: #333333;
}

.strip-eye.color-inquiry-1,
.strip-eye.color-inquiry-2,
.strip-eye.color-returnVisit-1,
.strip-eye.color-returnVisit-2,
.strip-eye.color-register-1,
.strip-eye.color-register-6,
.strip-eye.color-servicePackage-1,
.strip-eye.color-drug-0,
.strip-eye.color-drug-1,
.strip-eye.color-drug-2 {
  color: #ffa00c;
}

.strip-eye.color-inquiry-3,
.strip-eye.color-returnVisit-3,
.strip-eye.color-returnVisit-5,
.strip-eye.color-register-3,
.strip-eye.color-servicePackage-3,
.strip-eye.color-drug-3,
.strip-eye.color-drug-4 {
  color: #00c6ae;
}
/*default*/
.strip-eye.color-inquiry-4,
.strip-eye.color-inquiry-6,
.strip-eye.color-returnVisit-4,
.strip-eye.color-returnVisit-6,
.strip-eye.color-register-2,
.strip-eye.color-register-4,
.strip-eye.color-register-5,
.strip-eye.color-register-7,
.strip-eye.color-servicePackage-2,
.strip-eye.color-drug-5 {
  color: rgba(51, 51, 51, 0.6);
}

.label {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 0.6);
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 32px;
  background: rgba(51, 51, 51, 0.05);
  border-radius: 16px;
  margin-left: 16px;
  border: none;
}

.label.blue {
  color: $primary;
}
</style>
