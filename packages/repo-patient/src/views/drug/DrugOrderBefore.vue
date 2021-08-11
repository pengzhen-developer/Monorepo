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
            <div class="addr-user">
              <van-field v-model="consigneeInfo.mobile"
                         :label="consigneeInfo.consignee"
                         :right-icon="require('@src/assets/images/ic_xiugai.png')"
                         :readonly="!hasClick"
                         @blur="savePhone"
                         label-width="auto"
                         ref="phone"
                         type="tel"
                         maxlength="11"
                         placeholder="请输入"
                         @click-right-icon="changePhone" />
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
              <van-image :src="order.DrugStoreLogo"></van-image>
            </div>
            <div class="head-tit">{{order.DrugStoreName}}</div>
          </div>
          <div class="panel-body">
            <div class="list-three"
                 v-for="(item, index) in order.Drugs"
                 :key="index">
              <div class="list-icon">
                <van-image :src="item.DrugImage"
                           class="error--image">
                  <template v-slot:error>
                    <img :src="require('@src/assets/images/icons/ic_none_drug.png')" />
                  </template>
                </van-image>
              </div>
              <div class="list-content">
                <div class="content-title">{{item.DrugName}}</div>
                <div class="content-brief">{{item.DrugSpecification}}</div>
              </div>
              <div class="list-other">
                <div class="other-them"
                     @click="goInterDrugPage(item)">
                  <span>说明书</span>
                  <van-image :src="require('@src/assets/images/ic_wenhao.png')"></van-image>
                </div>
                <div class="other-price">
                  <peace-price class="price"
                               v-bind:price="item.Price"
                               v-bind:transformOrigin="'right'"
                               v-bind:size="14"></peace-price>
                  <span style="margin-left:2px;">x{{item.DrugQty}}{{item.DrugQtyUnit}}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="pay-card-wrap">
        <div class="pay-card">
          <van-cell title="支付及配送方式"
                    @click="changeShowPopup">
            <span>{{payName}} - {{page.tabIndex == '0' ? '到店自提': '配送到家'}}</span>
            <van-image :src="require('@src/assets/images/ic_right.png')"></van-image>
          </van-cell>
        </div>
      </div>
      <div class="coldStorageTip"
           v-if="canShowColdStorageTip">处方中有需要冷藏储存的药品，仅支持到店自提</div>
      <div class="coldStorageTip"
           v-if="!canShowColdStorageTip&&canShowPackageUnitTagTip">处方中有拆零售卖的药品，仅支持到店自提</div>

      <div class="pay-card-wrap">
        <div class="pay-card">
          <van-cell title="药品金额">
            <peace-price v-bind:price="order.TotalAmount"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="16"></peace-price>
          </van-cell>
          <template v-if="page.tabIndex == '1'">
            <van-cell title="配送费">
              <span v-if="isNaN(order.OperaShippingFee.substring(1))">{{order.OperaShippingFee}}</span>
              <peace-price v-bind:price="order.OperaShippingFee.substring(1)"
                           v-bind:transformOrigin="'right'"
                           v-bind:size="16"
                           v-else></peace-price>

            </van-cell>
          </template>
        </div>

        <PayCard v-bind:doctorId="order.doctorId"
                 v-bind:familyId="page.json.familyId"
                 v-bind:familyName="page.json.familyName"
                 v-bind:payType="payType"
                 v-bind:payInfo="payInfo"
                 v-bind:orderInfo="order"
                 v-bind:nethospitalId="order.hospitalId"
                 v-bind:orderType="3"
                 v-bind:disabled="true"
                 v-on:update="updatePayInfo"></PayCard>
      </div>
      <div class="tips-bottom">
        {{page.tabIndex == '0' ? '商家接单后将为您保留药品，请及时到店自提' : '商家接单后将在1-3个工作日内为您安排发货'}}
      </div>
      <div class="bottom">
        <peace-button v-on:click="openInformedConsentModel"
                      size="large"
                      round
                      type="primary">提交订单</peace-button>
      </div>

    </div>

    <van-popup v-model="showPopup"
               round
               position="bottom">
      <div class="pop-title">
        <span>请选择您的支付方式或配送方式</span>
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
        <div class="pop-tip"
             v-if="coldStorageError">* 处方中有需要冷藏储存的药品，仅支持到店自提</div>

        <div class="pop-tip"
             v-if="!coldStorageError&&packageUnitTagError">* 处方中有拆零售卖的药品，仅支持到店自提</div>
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

      <div style="display:flex">
        <van-button round
                    class="is__dialog"
                    @click="showPopup = false">取消</van-button>
        <van-button round
                    class="is__dialog"
                    type="primary"
                    @click="changeShowPopup">确认</van-button>

      </div>
    </van-popup>
    <!-- 取药知情同意书 -->
    <DrugInformedConsent v-model="informedConsentDialog.visible"
                         :informedConsent="informedConsentDialog.informedConsent"
                         @onCancel="onCancelCallback"
                         @onSubmit="onSubmitCallback"></DrugInformedConsent>
    <!-- 医保 -->
    <template v-if="order!=null">
      <YibaoCaedSelect v-model="showCard"
                       ref='yibaoCardSelect'
                       :info="info"
                       @onSuccess="onSuccess"></YibaoCaedSelect>

    </template>
    <!-- 确认支付弹框 -->
    <template>
      <ExpenseDetail v-model="dialog.visible"
                     :info="dialog.data"></ExpenseDetail>
    </template>
    <!-- 电话弹框 -->
    <template>
      <CallPhone v-model="phoneDialog.visible"
                 :phone="phoneDialog.data.phone"></CallPhone>
    </template>
  </div>
</template>

<script>
import PayCard from '@src/views/components/PayCard.vue'
import YibaoCaedSelect from '@src/views/components/YibaoCardSelect'
import DrugInformedConsent from '@src/views/components/DrugInformedConsent'
import ExpenseDetail from '@src/views/components//ExpenseDetail'
import CallPhone from '@src/views/components/CallPhone'

import peace from '@src/library'

import { Dialog } from 'vant'
export default {
  name: 'DrugOrderBefore',
  components: { [Dialog.Component.name]: Dialog.Component, YibaoCaedSelect, ExpenseDetail, DrugInformedConsent, PayCard, CallPhone },
  data() {
    return {
      payList: [],
      NewShippingMethod: [],
      payName: '',
      showPopup: false,
      colseIcon: require('@src/assets/images/ic_close@2x.png'),

      orderId: '',
      hasSubmitOrder: true,
      hasClick: false,
      consigneeInfo: {
        consignee: '',
        mobile: ''
      },
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
      },
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      },
      informedConsentDialog: {
        visible: false,
        informedConsent: ''
      },
      //默认选中微信支付 wxpay alipay
      paymentType: 'wxpay',
      // 抵扣类型
      payType: '',
      // 支付信息
      payInfo: {
        orderMoney: 0,

        // 所选医保卡卡号
        medCardNo: '',
        // 医保待遇类型
        medicalTreatmentType: '',
        // 医保待遇类型名称
        medicalTreatmentTypeText: '',
        // 疾病种类
        diseasesCode: '',
        // 疾病种类名称
        diseasesName: '',

        // 所选服务包ID
        servicePackageId: '',
        // 所选服务包名称
        servicePackageName: '',
        // 所选权益ID
        patientEquitiesId: '',
        // 所选权益名称
        patientEquitiesName: '',

        // H5 商保未开放，暂不考虑
        // 所选商保ID
        sbInsuranceId: '',
        // 所选商保名称
        sbInsuranceName: '',

        serviceTel: ''
      },
      coldStorageError: false,
      packageUnitTagError: false,
      enter_time: '',
      isSend: false
    }
  },

  activated() {
    //从地址页面返回
    if (this.$route.query.addr) {
      this.getAddr(this.$route.query.addr)
    }
    this.getDefaultAddress()
  },
  destroyed() {
    $peace.$off('SelectAddress')
    this.trackByConfirm()
    this.trackByLeave()
    //没有选择提交订单 而是返回时 触发
    if (!this.isSend) {
      this.trackByCommit()
    }
  },
  created() {
    this.enter_time = new Date().getTime()
    $peace.$on('SelectAddress', this.selectAddressCallback)

    this.initData(this.$route.params.json)

    this.getPhaOrder()
  },
  computed: {
    canShowColdStorageTip() {
      return this.order?.ColdStorage == 1
    },
    //处方开立单位标记(minUnit:最小单位 packageUnit:包装单位)
    canShowPackageUnitTagTip() {
      return this.order?.PackageUnitTag === 'minUnit'
    },

    info() {
      return {
        familyName: this.page?.json?.familyName,
        familyId: this.page?.json?.familyId,
        serviceType: 'drug',
        jntPrescriptionNo: this.page?.json?.JztClaimNo
      }
    },
    // source 处方来源：1 复诊  2 会诊 3 面诊 4 问诊 5 转诊
    isInquirySource() {
      return this.order.source === 4
    },

    canShowYibao() {
      return this.order?.insuranceConfig?.medicalInsuranceConfig != null && this.order?.MedicalCardNo ? true : false
    },

    // insureTypeCode 0自费 11医保
    // payMode 1 在线支付  2 到店支付  3 货到付款
    //咨询购药 单独处理
    cnaShowYibaoByInquiry() {
      return this.order.insureTypeCode === 11 && this.order?.insuranceConfig?.medicalInsuranceConfig != null && this.page.payIndex == 1
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
    trackByLeave() {
      const params = {
        page_name: '购药订单确认页面',
        organization_name: this.order.netHospitalName,
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.globalPageStop(params)
    },
    trackByConfirm() {
      const params = {
        page_address: '/drug/drugOrderBefore',
        business_type: '处方购药',
        order_type: '处方购药',
        pay_method: this.paymentType,
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.confirmOrder(params)
    },
    trackByCommit(type = '') {
      const params = {
        business_type: '处方购药',
        click_object: type === 'apply' ? '提交订单' : '返回',
        pay_method_on_submit: this.paymentType
      }
      peace.service.sensors.commitOrder(params)
    },
    openInformedConsentModel() {
      if (!peace.validate.pattern.mobile.test(this.consigneeInfo.mobile)) {
        return peace.util.alert('请输入正确的手机号')
      }
      //若未选择支付方式，不能提交订单
      if (this.page.payIndex < 1) {
        peace.util.alert('请选择支付方式')
        return
      }

      let canSubmit = this.page.tabIndex == 0 ? true : this.userAddr && this.userAddr.detailAddress ? true : false
      if (!canSubmit) {
        peace.util.alert('请添加收货地址')
        return
      }
      this.trackByCommit('apply')
      this.isSend = true
      peace.service.patient
        .checkDrugAttr({
          jztClaimNo: this.order.jztClaimNo,
          shippingMethod: this.page.tabIndex
        })
        .then(() => {
          this.informedConsentDialog.visible = true
          this.informedConsentDialog.informedConsent = this.order.OperationInfo.InformedConsent
        })
        .catch((res) => {
          peace.util.alert(res.data.msg)
        })
    },
    onCancelCallback() {},
    onSubmitCallback() {
      this.submitOrder()
    },
    changePhone() {
      this.hasClick = true
      setTimeout(() => {
        this.$refs.phone && this.$refs.phone.focus()
      }, 0)
    },
    savePhone() {
      if (!this.consigneeInfo.mobile) {
        peace.util.alert('手机号不能为空')
      }

      if (!peace.validate.pattern.mobile.test(this.consigneeInfo.mobile)) {
        peace.util.alert('请输入正确的手机号')
      }
      this.hasClick = false
    },
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
      // source 处方来源：1 复诊  2 会诊 3 面诊 4 问诊 5 转诊
      if (this.isInquirySource) {
        // insureTypeCode 0自费 11医保
        if (this.order.insureTypeCode === 11 && !this.order.MedicalCardNo) {
          this.showCard = true
        }
      } else {
        if (!this.order.MedicalCardNo) {
          this.showCard = true
        }
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
      if (!this.hasSubmitOrder) {
        return
      }

      //云药房不跳转店铺详情
      if (this.CustomerType == '50') {
        return
      }
      const json = peace.util.encode({ accessCode: this.order.AccessCode, drugStoreId: this.order.DrugStoreId })
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
      if (!this.hasSubmitOrder) {
        return
      }
      let json = peace.util.decode(this.$route.params.json)
      const param = peace.util.encode({ ...json, emit: 'SelectAddress' })

      this.$router.push(`/setting/SelectAddressManger/${param}`)
    },

    submitOrder() {
      if (this.order.MedicalCardNo && this.page.payIndex === 1) {
        this.yibaoInfo.medCardNo = this.order.MedicalCardNo
      }

      //支付方式：wxpay（微信） shangbao（商保支付） yibaopay（医保支付）deliverypay（货到付款） shoppay（到店支付）
      //payMode 1 在线支付  2 到店支付  3 货到付款
      let errMsg = ''

      if (this.payType) {
        if (!this.payInfo.medCardNo) {
          errMsg = '请填写医保卡号'
        } else {
          if (!this.payInfo.medicalTreatmentType) {
            errMsg = '请填写医保类型'
          } else if (this.payInfo.medicalTreatmentType.toString() === '2' && !this.payInfo.diseasesCode) {
            errMsg = '请填写病种'
          }
        }
      }
      if (errMsg) {
        peace.util.alert(errMsg)
        return false
      }

      if (!this.hasSubmitOrder) {
        peace.util.alert('请勿重复提交')
        return
      }

      this.hasSubmitOrder = false
      if (this.payType === '') {
        this.payInfo.medCardNo = ''
        this.payInfo.cardno = ''
        this.payInfo.diseasesCode = ''
        this.payInfo.diseasesName = ''
      }
      if (this.payType === 'yibaopay') {
        this.payInfo.cardno = ''
        if (this.payInfo.medicalTreatmentType === 1) {
          this.payInfo.diseasesCode = ''
          this.payInfo.diseasesName = ''
        }
      }

      let params = {
        jztClaimNo: this.order.jztClaimNo,
        drugStoreId: this.order.DrugStoreId,
        accessCode: this.order.AccessCode,
        shippingMethod: +this.page.tabIndex, // 0 自提 1配送
        receiverState: +this.page.tabIndex ? this.userAddr.province : this.order.Province,
        receiverCity: +this.page.tabIndex ? this.userAddr.city : this.order.City,
        receiverDistrict: +this.page.tabIndex ? this.userAddr.district : this.order.County,
        receiverAddress: +this.page.tabIndex ? this.userAddr.address : this.order.Detailed,
        receiver: +this.page.tabIndex ? this.userAddr.consignee : this.consigneeInfo.consignee,
        receiverPhone: +this.page.tabIndex ? this.userAddr.mobile : this.consigneeInfo.mobile,

        payMode: this.page.payIndex,
        deductionType: this.payType,
        paymentType: this.paymentType,
        medCardNo: this.payInfo.medCardNo,
        diseasesCode: this.payInfo.diseasesCode,
        diseasesName: this.payInfo.diseasesName,
        cardNo: this.payInfo.cardno
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

            params.payMethod = this.paymentType
            params.businessType = '处方购药'
            params.hospitalName = this.order.netHospitalName

            this.dialog.data = params
          }
        })
        .catch((res) => {
          if (res.data.code == '205') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定',
              cancelButtonText: '联系客服'
            })
              .then(() => {})
              .catch(() => {
                //医保卡不可用 请联系客服
                this.callPhone()
              })
          } else {
            peace.util.alert(res.data.msg)
          }
        })
        .finally(() => {
          this.hasSubmitOrder = true
        })
    },
    callPhone() {
      this.phoneDialog.visible = true
    },
    //获取机构客服电话
    getOrganizationTelephone() {
      const params = {
        hosoitalId: this.order.hospitalId
      }
      peace.service.hospital.getOrganizationTelephone(params).then((res) => {
        this.payInfo.serviceTel = res.data.serviceTel
        this.phoneDialog.data.phone = res.data.serviceTel
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
      //订单关联处方含有【冷藏】标识  选择【配送到家】时，红字提示患者不可选择配送到家，不可选中
      if (this.canShowColdStorageTip && item.Value == 1) {
        this.coldStorageError = true
        return
      } else {
        this.coldStorageError = false
      }
      //订单中既有冷藏药品，又有拆零药品，仅显示冷藏药品仅支持到店自提的提示
      if (!this.coldStorageError) {
        //订单关联处方是否含有按最小单位开具药品数量的药品  选择【配送到家】时，红字提示患者不可选择配送到家，不可选中
        if (this.canShowPackageUnitTagTip && item.Value == 1) {
          this.packageUnitTagError = true
          return
        } else {
          this.packageUnitTagError = false
        }
      }
      this.json.tabIndex = item.Value
      this.payList = [].concat(item.PayModel)
      this.json.payIndex = this.payList.find((pay) => pay.Visible)?.Value
    },
    changeShowPopup() {
      if (!this.hasSubmitOrder) {
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
        //处方内含有【冷藏】储存的药品 配送方式默认为其选中【到店自提】 支付方式系统默认选中在线支付 未开启在线支付即顺序选中其它支付项
        //订单中含有按最小单位开具药品数量的药品，本单取药方式仅支持【到店自提】
        if (this.canShowColdStorageTip || this.canShowPackageUnitTagTip) {
          this.page.tabIndex = 0
          this.payList = res.data.NewShippingMethod.find((item) => item.Value == this.page.tabIndex)?.PayModel
          //如果不支持到店自提，则 payList undefined
          if (!this.payList) {
            this.page.tabIndex = 1
            this.payList = res.data.NewShippingMethod.find((item) => item.Value == this.page.tabIndex)?.PayModel
          }
        } else {
          this.payList = res.data.NewShippingMethod.find((item) => item.Visible)?.PayModel
        }

        this.page.payIndex = this.payList.find((item) => item.Visible)?.Value
        this.consigneeInfo.consignee = res.data.patientName
        this.consigneeInfo.mobile = res.data.tel

        this.getPayName()

        //初始化 支付信息 payInfo
        this.payInfo.medCardNo = this.order.MedicalCardNo
        this.payInfo.medicalTreatmentType = this.order.medicalTreatmentType
        this.payInfo.medicalTreatmentTypeText = this.order.medicalTreatmentTypeTxt
        this.payInfo.diseasesCode = this.order.diseasesCode
        this.payInfo.diseasesName = this.order.diseasesName

        this.payType = (this.order.source === 4 && this.order.insureTypeCode === 11) || this.order.MedicalCardNo ? 'yibaopay' : ''

        this.getOrganizationTelephone()
      })
    },

    goInterDrugPage(item) {
      if (!this.hasSubmitOrder) {
        return
      }
      const params = peace.util.encode({ name: item.DrugName })
      this.$router.push(`/inter/drugInterList/${params}`)
    },

    // 更新支付信息
    updatePayInfo(result) {
      this.payType = result.payType
      this.paymentType = result.paymentType
      this.payInfo = result.payInfo
      this.payInfo.cardno = result.payInfo.sbInsuranceId
    }
  }
}
</script>

<style scoped lang="scss">
.pay-card-wrap {
  margin-top: 8px;
  .pay-card {
    /deep/ .van-cell__title {
      width: 8em;
      flex: none;
      display: flex;
      align-items: center;
    }
    /deep/ .van-cell__value {
      color: #333;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
    }
  }
}
.coldStorageTip {
  margin-top: 10px;
  padding-right: 16px;
  text-align: right;
  color: #00c6ae;
  font-size: 12px;
}
.van-popup {
  padding: 23px 15px 15px 15px;
  /deep/.van-popup__close-icon--top-right {
    top: 23px;
    right: 16px;
  }
  .pop-title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    text-align: center;
  }
  .pop-box {
    margin-top: 25px;
    .pop-subtitle {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
    }
    .pop-tip {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ff3a30;
      line-height: 20px;
      margin-top: 8px;
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
  padding: 0px 0px 60px 0px;
  min-height: 100%;
  > .module {
    border-radius: 3px;
    overflow: hidden;
    margin-top: 10px;
    background-color: #fff;

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
  font-size: 16px;
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
  font-size: 16px;
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
  width: 32px;
  height: 32px;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  .van-image {
    width: 90%;
    height: 90%;
    border-radius: 2px;
    overflow: hidden;
  }
}
.panel-head.icon-next::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 12px;
  display: block;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background-size: cover;
}
.panel-head .head-tit {
  flex: 1;
  color: #333333;
  font-size: 16px;
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
.dl-packet {
  align-items: center;
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
.dl-packet .dt.money {
  width: 6em;
}
.dl-packet .dd,
.dl-packet .dt {
  padding: 3px 0;
}

.dl-packet .dd {
  color: #4e4e4e;
}
.str {
  padding: 8px 15px 3px;
}
.str .dt {
  font-size: 14px;
  &.money {
    color: #333333;
    line-height: 2.8;
  }
  &.grey-666 {
    color: rgba(51, 51, 51, 0.6);
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
  font-size: 14px;
  color: #666;
  span + span {
    margin-left: 5px;
  }
  .van-field {
    padding: 0;
    &::after {
      border: 0;
    }
    /deep/.van-field__control {
      width: 82px;
      color: #666;
    }
    /deep/.van-field__label,
    /deep/.van-field__value {
      color: #666;
      font-size: 12px;
    }
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

.list-other .other-them {
  .van-image {
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }
  span {
    line-height: 12px;
  }
}
.list-icon .van-image {
  border-radius: 2px;
  overflow: hidden;
}
</style>
