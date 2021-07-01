<template>
  <div class="page">
    <div class="consult-detatil"
         :style="{'margin-bottom':marginBottom,'padding-bottom':canShowReportBottom?reportHeight:'10px'}"
         v-if="canShowInfo">
      <!--TOP-->
      <div class="module top">
        <div class="top-title">
          <div class="strong">
            {{ internalData.inquiryInfo.statusTxt }}
            <div class='typeTag fz'
                 v-if="retrunVisitBlock">
              复诊</div>
            <div class='typeTag zx'
                 v-else>问诊</div>

          </div>
          <div class="cancelTip"
               v-on:click="showRefundTip"
               v-if="canShowRefundTip">
            <span>退费说明</span>
            <van-icon name="warning-o"
                      size="12"
                      color="#999999" />
          </div>
        </div>

        <div class="brief"
             v-if="internalData.inquiryInfo.inquiryStatus!=ENUM.INQUIRY_STATUS.已退诊">
          {{ getInquiryText(internalData.inquiryInfo.inquiryStatus) }}
        </div>
        <div class="brief"
             v-else>
          {{internalData.inquiryInfo.overCause}}
        </div>

        <div class="waitText"
             v-if="internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.待接诊">
          <div class="cancelText">
            接诊后可以在“消息”中查看回复
          </div>
          <img class="wait-img"
               src="~@/assets/images/ic_wait_message.png" />
        </div>
      </div>
      <!--医生名片-->
      <div class="module card doctor">
        <div class="doctor-logo">
          <van-image round
                     v-bind:src="internalData.doctorInfo.avartor"></van-image>
        </div>
        <div class="doctor-body">
          <div class="doctor-name">
            {{ internalData.doctorInfo.name }}
            <span class="doctor-small">
              {{ internalData.doctorInfo.doctorTitle }}
            </span>
            <span class="doctor-small">
              {{ internalData.doctorInfo.deptName }}
            </span>
            <van-image v-if="internalData.orderInfo.inquiryType=='image'|| internalData.inquiryInfo.isAgain.toString() === '1'"
                       :src="require('@src/assets/images/icons/icon_01_01_06.jpg')"></van-image>
            <van-image v-if="internalData.orderInfo.inquiryType=='video'"
                       :src="require('@src/assets/images/icons/icon_01_01_07.jpg')"></van-image>
          </div>

          <div class="doctor-hospitalName">{{ internalData.doctorInfo.hospitalName }}</div>
        </div>
      </div>
      <!--订单内容-->
      <div class="module order">
        <div class="module-item"
             v-if="retrunVisitBlock">
          <div class="title">复诊时间</div>
          <div class="brief">{{internalData.inquiryInfo.appointmentTime}}</div>
        </div>
        <div class="module-item">
          <div class="title">个人信息</div>
          <div class="module-item-content">
            <div class="module-item-label auto">姓名：</div>
            <div class="module-item-value">{{internalData.familyInfo.familyName}}</div>
          </div>
          <div class="module-item-content">
            <div class="module-item-label auto">年龄：</div>
            <div class="module-item-value">{{internalData.familyInfo.familyAge }}</div>
          </div>
          <div class="module-item-content">
            <div class="module-item-label auto">性别：</div>
            <div class="module-item-value">{{internalData.familyInfo.familySex}}
            </div>
          </div>
          <div class="module-item-content"
               v-if="internalData.familyInfo.guardianName">
            <div class="module-item-label auto">监护人：</div>
            <div class="module-item-value">{{internalData.familyInfo.guardianName}} |
              {{internalData.familyInfo.guardianSex}} |
              {{internalData.familyInfo.guardianAge}}
            </div>
          </div>
        </div>
        <!--病情描述-->
        <div class="module-item">
          <div class="title mt16">病情描述</div>
          <div class="brief">{{ internalData.inquiryInfo.inquiryDescribe }}</div>
        </div>
        <div class="module-item"
             v-if="hasReturnVisitInfo">

          <div class="title">复诊信息</div>
          <div class="module-item-content img size-14"
               v-if="internalData.inquiryInfo.inquiryImages.length>0">
            <div class="module-item-label ">复诊凭证：</div>
            <div class="module-item-value img">
              <div class="img"
                   v-for="(item,index) in internalData.inquiryInfo.inquiryImages"
                   :key="index">
                <img :src="item.image_path"
                     @click="viewImage(item, index,internalData.inquiryInfo.inquiryImages)" />
              </div>
            </div>
          </div>
          <div class="module-item-content size-14"
               v-else>
            <div class="module-item-label">复诊凭证：</div>
            <div class="module-item-value">确认遗失
            </div>
          </div>
          <div class="module-item-content size-14">
            <div class="module-item-label start">初诊诊断：</div>
            <div class="module-item-value">{{internalData.illInfo.confirmIllness}}
            </div>
          </div>

        </div>
        <!-- 诊疗记录 -->
        <div class="module-item record"
             v-if="hasFirstVisitInfo">
          <div class="module-item-title">
            <div class="title">诊疗记录</div>
            <div class="module-item-more"
                 @click="seeMoreCase"
                 v-if="canSeeMoreCase">查看更多>></div>
          </div>
          <template>
            <div class="case-card"
                 v-for="(value, key) in firstVisitData"
                 :key="key">
              <div class="case-card-time">
                <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
                <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
              </div>
              <div class="case-box">
                <div class="case-card-note"
                     @click="gotoCaseDetail(item.dataNo)"
                     v-for="(item,index) in value"
                     :key="index">
                  <div class="case-card-note-content">
                    <div class="case-left">
                      <van-image width="35px"
                                 height="35px"
                                 :src="require('@src/assets/images/file/ic_medical record.png')" />
                    </div>
                    <div class="case-right">
                      <p class="case-right-title">
                        {{item.title}}
                      </p>
                      <p class="case-right-name">
                        {{ item.hospitalName }} | {{ item.deptName }}
                      </p>
                    </div>
                  </div>
                  <div class="case-diagnosis"
                       v-if="item.diagnosis">{{item.diagnosis}}</div>
                </div>
              </div>

            </div>
          </template>

        </div>
        <!-- 补充信息 -->
        <div class="module-item"
             v-if="canShowSupplementaryInfo">
          <div>
            <div class="title">补充信息</div>
            <div class="module-item-content img size-14"
                 v-if="internalData.supplementaryInfo.affectedImages.length>0">
              <div class="module-item-label">患处图片：</div>
              <div class="module-item-value img">
                <div class="img"
                     v-for="(item,index) in internalData.supplementaryInfo.affectedImages"
                     :key="index">
                  <img :src="item.image_path"
                       @click="viewImage(item, index,internalData.supplementaryInfo.affectedImages)" />
                </div>
              </div>
            </div>
            <div class="module-item-content size-14"
                 v-if="internalData.supplementaryInfo.pregnancyText">
              <div class="module-item-label">特殊时期：</div>
              <div class="module-item-value">{{internalData.supplementaryInfo.pregnancyText}}</div>
            </div>
            <div class="module-item-content size-14"
                 v-if="internalData.supplementaryInfo.allergicHistory">
              <div class="module-item-label"
                   style="height:fit-content;"><span>过敏史</span>：</div>
              <div class="module-item-value">{{internalData.supplementaryInfo.allergicHistory}}
              </div>
            </div>
          </div>
        </div>

        <!-- 联系客服 -->
        <div class="module-item phone"
             v-if="canShowPhoneBox"
             @click="callPhone">
          <van-image :src="require('@src/assets/images/ic_call_default.png')"></van-image>
          <span>联系客服</span>
        </div>
      </div>

      <!-- 订单收费明细 -->
      <div class="module message"
           v-if="moneyRecord.length>0">
        <div class="module-item-content message size-14"
             v-for="(item,index) in moneyRecord"
             :key="index">
          <div class="module-item-label">{{item.name}}：</div>
          <div class="module-item-value">
            <span v-if="isNaN(item.value.substring(1))">{{item.value}}</span>
            <peace-price v-bind:price="item.value.substring(1)"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="14"
                         v-else></peace-price>
          </div>
        </div>
      </div>
      <div class="module message"
           v-else>
        <div class="module-item-content message size-14">
          <div class="module-item-label">订单费用：</div>
          <div class="module-item-value">
            <peace-price v-bind:price="internalData.orderInfo.totalMoney"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="14"></peace-price>
          </div>
        </div>
        <div class="module-item-content message size-14"
             v-if="internalData.orderInfo.equitiesName">
          <div class="module-item-label">{{internalData.orderInfo.equitiesName}}：</div>
          <div class="module-item-value">
            <span v-if="(internalData.inquiryInfo.inquiryStatus==ENUM.INQUIRY_STATUS.已取消||internalData.inquiryInfo.inquiryStatus==ENUM.INQUIRY_STATUS.已退诊)"
                  style="margin-right:-8px;">(已退回)</span>
            <peace-price v-bind:price="internalData.orderInfo.totalMoney"
                         v-bind:prefix="'-￥'"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="14"></peace-price>

          </div>
        </div>
      </div>

      <!-- 应付/实付金额  -- 自费支付-->
      <div class="module money"
           v-if="internalData.inquiryInfo.inquiryStatus != ENUM.INQUIRY_STATUS.待支付 &&internalData.inquiryInfo.appointmentStatus!=2">
        <!-- 取消订单的状态 -->
        <template v-if="internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已取消">
          <div class="brief right"
               v-if="internalData.orderInfo.payMoney == 0">
            <template v-if="internalData.orderInfo.orderMoney == 0">
              自费支付：
            </template>
            <template v-else>
              自费支付：
            </template>
            <div class="money">
              <peace-price v-bind:price="internalData.orderInfo.orderMoney"
                           v-bind:transformOrigin="'right'"
                           v-bind:size="16"></peace-price>
            </div>
          </div>
          <div class="brief right"
               v-else>
            自费支付：
            <div class="money">
              <span v-if="internalData.orderInfo.refundTime "
                    style="margin-right:-20px;">（已退款）</span>
              <peace-price v-bind:price="internalData.orderInfo.payMoney"
                           v-bind:transformOrigin="'right'"
                           v-bind:size="16"></peace-price>

            </div>
          </div>
        </template>
        <template v-else>
          <div class="brief right">
            自费支付：
            <div class="money">
              <span v-if="internalData.orderInfo.refundTime"
                    style="margin-right:-20px;">（已退款）</span>
              <peace-price v-bind:price="internalData.orderInfo.payMoney"
                           v-bind:transformOrigin="'right'"
                           v-bind:size="16"></peace-price>
            </div>
          </div>
        </template>
      </div>

      <!--订单操作时间轴-->
      <div class="module">
        <div class="module-item-content size-14">
          <div class="module-item-label">订单编号：</div>
          <div class="module-item-value">{{ internalData.orderInfo.orderNo }}</div>
        </div>
        <div class="module-item-content size-14">
          <div class="module-item-label">订单时间：</div>
          <div class="module-item-value">{{ internalData.orderInfo.orderTime }}</div>
        </div>
        <template v-if="internalData.orderInfo.paymentType||internalData.orderInfo.servicePackageName">
          <div class="module-item-content start size-14">
            <div class="module-item-label">支付方式：</div>
            <div class="module-item-value">{{paymentTypeText}}</div>
          </div>
        </template>
        <template v-if="internalData.orderInfo.payTime">
          <div class="module-item-content size-14">
            <div class="module-item-label">支付时间：</div>
            <div class="module-item-value">{{ internalData.orderInfo.payTime }}</div>
          </div>
        </template>
        <div class="module-item-content size-14"
             v-if="internalData.inquiryInfo.inquiryStatus== ENUM.INQUIRY_STATUS.已取消">
          <div class="module-item-label">{{internalData.inquiryInfo.appointmentStatus==2?'关闭时间':'取消时间'}}：</div>
          <div class="module-item-value">{{ internalData.inquiryInfo.cancelTime }}</div>
        </div>
        <div class="module-item-content size-14"
             v-if="internalData.orderInfo.refundTime">
          <div class="module-item-label">退款时间：</div>
          <div class="module-item-value">{{ internalData.orderInfo.refundTime }}</div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <template v-if="internalData&&
               internalData.inquiryInfo">
      <div class="footer fixedBottom"
           v-if="canShowCancelBottom">
        <div class="footer-btn wait-btn"
             @click="showCancellPop(internalData)">
          {{internalData.inquiryInfo.serviceType=='returnVisit'?'取消预约':'取消订单'}}</div>
      </div>

      <div class="footer fixedBottom"
           v-if="canShowBottom">
        <div class="footer-btn wait-btn"
             @click="changeInvoiceModel(internalData)"
             v-if="canShowInvoiceBtn">申请发票</div>
        <div class="footer-btn chat-btn"
             @click="goChatingPage(internalData)"
             v-if="canShowChatBtn">问诊记录</div>
        <div class="footer-btn chat-btn"
             @click="goChatingPage(internalData)"
             v-if="cnaShowEnterChat">进入问诊</div>

      </div>
      <div class="pay fixedBottom"
           v-if="canShowPayBottom">
        <div class="pay-item">
          <div class="count-down">
            <span>订单关闭倒计时：</span>
            <van-count-down millisecond
                            @finish="finish(internalData)"
                            :time="internalData.inquiryInfo.time"
                            format="mm:ss" />
          </div>
          <div class="right">应付金额 :<span>{{'￥'+internalData.orderInfo.orderMoney}}</span> </div>
        </div>
        <div class="pay-item">
          <van-button class="pay-btn btn-cancel"
                      v-if="canShowCancelButton"
                      @click="showCancellPop(internalData)">取消订单</van-button>
          <peace-button class="pay-btn btn-pay"
                        :class="{'flex-1':!canShowCancelButton}"
                        @click="goToPay(internalData)"
                        round
                        type="primary"
                        throttle
                        :throttleTime="3000">
            立即支付
          </peace-button>
        </div>
      </div>
      <!-- 复诊-报到 -->
      <div class="report fixedBottom"
           v-if="canShowReportBottom">
        <van-button class="cancel-btn"
                    v-if="canShowCancelButton"
                    @click="showCancellPop(internalData)">取消订单</van-button>
        <van-button class="report-btn"
                    :class="{'flex-1':!canShowCancelButton}"
                    @click="report(internalData)"
                    :disabled="canReport">报到</van-button>
        <div class="report-tip"
             v-if="canReport"><img :src="require('@src/assets/images/ic_help.png')"> 复诊当日可报到</div>
      </div>
    </template>

    <peace-dialog :visible.sync="caseDetail.visible"
                  title="问诊小结">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeList.visible"
                  title="用药建议">
      <TheRecipeList :data="recipeList.data"></TheRecipeList>
    </peace-dialog>

    <peace-dialog :visible.sync="chatingPage.visible"
                  title="问诊记录">
      <MessageList :data="chatingPage.data"></MessageList>
    </peace-dialog>

    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="imagePreview.images">
      <template v-slot:cover>
        <van-button icon="cross"
                    type="primary"
                    round
                    @click="imagePreview.visible = false" />
      </template>
    </van-image-preview>

    <!-- 确认支付弹框 -->
    <ExpenseDetail v-model="dialog.visible"
                   @changeFlag="changeFlag"
                   :info="dialog.data"></ExpenseDetail>

    <!-- 发票弹窗 -->
    <template v-if="internalData&&internalData.orderInfo">
      <InvoiceModel v-model="showInvoiceModel"
                    :receiptNumber="internalData.orderInfo.divisionId"></InvoiceModel>
    </template>
    <!-- 退费说明弹窗 -->
    <template v-if="internalData&&internalData.orderInfo">
      <RefundTip v-model="refundTipDialog.visible"
                 :divisionId="refundTipDialog.data.divisionId"></RefundTip>
    </template>
    <!-- 电话弹框 -->
    <template>
      <CallPhone v-model="phoneDialog.visible"
                 :phone="phoneDialog.data.phone"></CallPhone>
    </template>

    <!-- H5支付回跳确认弹窗 -->
    <template>
      <PayCallback v-model="cbDialog.visible"
                   :money="cbDialog.data.money"
                   @H5PayCallback="H5PayCallback"></PayCallback>
    </template>

    <!-- 取消申请发票提示 -->
    <template>
      <ApplyForInvoice v-model="invoiceDialog.visible"
                       :message="invoiceDialog.data.message"></ApplyForInvoice>
    </template>

  </div>
</template>

<script>
import peace from '@src/library'

import Vue from 'vue'
import { Dialog, CountDown } from 'vant'
Vue.use(CountDown)

import TheCase from '@src/views/components/TheCase'
import TheRecipeList from '@src/views/components/TheRecipeList'
import MessageList from '@src/views/components/MessageList'
import ExpenseDetail from '@src/views/components//ExpenseDetail'
import InvoiceModel from '@src/views/components/InvoiceModel'
import RefundTip from '@src/views/components/RefundTip'
import CallPhone from '@src/views/components/CallPhone'
import PayCallback from '@src/views/components/PayCallback'
import ApplyForInvoice from '@src/views/components/ApplyForInvoice'
const ENUM = {
  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保卡支付: 'yibaopay'
  },
  /** 问诊状态 */
  INQUIRY_STATUS: {
    待支付: 1,
    待接诊: 2,
    问诊中: 3,
    已退诊: 4,
    已完成: 5,
    已取消: 6
  },
  /** isShowCancelButton 0不显示1显示 */
  CANCEL_BUTTON_STATUS: {
    不显示: 0,
    显示: 1
  }
}
export default {
  components: {
    TheCase,
    TheRecipeList,
    MessageList,
    ExpenseDetail,
    InvoiceModel,
    RefundTip,
    CallPhone,
    PayCallback,
    ApplyForInvoice,

    [Dialog.Component.name]: Dialog.Component
  },

  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      ENUM: ENUM,
      internalData: {},
      firstVisitData: null,
      canSeeMoreCase: false,
      firstLoad: false,
      hasFirstVisitInfo: false,
      caseDetail: {
        visible: false,
        data: {}
      },
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      },
      cbDialog: {
        visible: false,
        data: {
          money: ''
        }
      },
      recipeList: {
        visible: false,
        data: []
      },

      chatingPage: {
        visible: false,
        data: []
      },
      dialog: {
        visible: false,
        data: {}
      },
      invoiceDialog: {
        visible: false,
        data: {}
      },
      refundTipDialog: {
        visible: false,
        data: {
          divisionId: ''
        }
      },
      imagePreview: {
        visible: false,
        position: 0,
        images: []
      },
      fromChatRoom: false,
      reportHeight: '0px',

      showInvoiceModel: false,
      refreshTimer: null
    }
  },
  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    },
    canShowReportBottom: {
      handler() {
        this.$nextTick(() => {
          const element = document.querySelector('.report')
          this.reportHeight = element ? element.clientHeight + 15 + 'px' : '0px'
        })
      },
      immediate: true
    }
  },
  computed: {
    moneyRecord() {
      const list = this.internalData?.orderInfo?.moneyRecord || []
      //医保类型
      if (list.length > 0 && this.internalData.orderInfo.medicalTreatmentType) {
        let txt = `${this.internalData.orderInfo.medicalTreatmentTypeTxt}`
        txt += this.internalData.orderInfo.diseases ? `-${this.internalData.orderInfo.diseases}` : ``
        list.splice(1, 0, { name: '医保类型', value: txt })
      }

      return list
    },
    marginBottom() {
      return this.canShowPayBottom ? '115px' : this.canShowBottom ? '80px' : this.canShowCancelBottom ? '80px' : '0'
    },
    paymentTypeText() {
      if (this.internalData.orderInfo.servicePackageName) {
        return `-(${this.internalData.orderInfo.servicePackageName})`
      } else {
        return Object.keys(ENUM.PAYMENT_TYPE).find((key) => ENUM.PAYMENT_TYPE[key] === this.internalData.orderInfo.paymentType)
      }
    },
    retrunVisitBlock() {
      return this.internalData?.inquiryInfo?.isAgain.toString() === '1'
    },
    hasReturnVisitInfo() {
      return this.internalData?.illInfo?.confirmIllness
    },
    canShowYibao() {
      return this.internalData?.orderInfo?.medicalMoney
    },
    canShowCancelButton() {
      return this.internalData?.orderInfo?.isShowCancelButton == ENUM.CANCEL_BUTTON_STATUS.显示
    },

    canShowInfo() {
      return (
        this.firstLoad &&
        this.internalData &&
        this.internalData.inquiryInfo &&
        this.internalData.doctorInfo &&
        this.internalData.familyInfo &&
        this.internalData.illInfo &&
        this.internalData.orderInfo &&
        this.internalData.supplementaryInfo
      )
    },
    canShowRefundTip() {
      return (
        this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已退诊 ||
        (this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已取消 && this.internalData.orderInfo.payTime)
      )
    },
    canShowSupplementaryInfo() {
      return (
        this.internalData &&
        this.internalData.supplementaryInfo &&
        (this.internalData.supplementaryInfo.affectedImages.length > 0 ||
          this.internalData.supplementaryInfo.pregnancyText ||
          this.internalData.supplementaryInfo.allergicHistory)
      )
    },
    canShowCancelBottom() {
      return (
        this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.待接诊 &&
        this.internalData?.orderInfo?.isShowCancelButton == ENUM.CANCEL_BUTTON_STATUS.显示
      )
    },
    canShowBottom() {
      return (
        !this.fromChatRoom &&
        this.internalData &&
        this.internalData.inquiryInfo &&
        (this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.问诊中 ||
          (this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已退诊 &&
            this.internalData.inquiryInfo.quitStatus != '1' &&
            this.internalData.inquiryInfo.quitStatus != '2') ||
          this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已完成)
      )
    },
    canShowPayBottom() {
      return (
        this.internalData &&
        this.internalData.inquiryInfo &&
        this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.待支付 &&
        this.internalData.inquiryInfo.time > 0 &&
        ((this.internalData.inquiryInfo.reportTime && this.internalData.inquiryInfo.appointmentStatus == 1) ||
          this.internalData.inquiryInfo.appointmentStatus == 0)
      )
    },
    canShowReportBottom() {
      return (
        this.internalData &&
        this.internalData.inquiryInfo &&
        this.internalData.inquiryInfo.serviceType == 'returnVisit' &&
        !this.internalData.inquiryInfo.reportTime &&
        this.internalData.inquiryInfo.appointmentStatus == 1 &&
        this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.待支付
      )
    },
    canShowChatBtn() {
      return (
        (this.internalData &&
          this.internalData.inquiryInfo &&
          this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已退诊 &&
          this.internalData.inquiryInfo.quitStatus != '1' &&
          this.internalData.inquiryInfo.quitStatus != '2') ||
        this.internalData.inquiryInfo.inquiryStatus == ENUM.INQUIRY_STATUS.已完成
      )
    },
    cnaShowEnterChat() {
      return this.internalData?.inquiryInfo?.inquiryStatus == ENUM.INQUIRY_STATUS.问诊中
    },
    canReport() {
      return this.internalData?.inquiryInfo?.reportButton != 1
    },
    canShowInvoiceBtn() {
      return (
        (this.internalData?.inquiryInfo?.inquiryStatus == ENUM.INQUIRY_STATUS.已完成 ||
          this.internalData?.inquiryInfo?.inquiryStatus == ENUM.INQUIRY_STATUS.问诊中) &&
        this.internalData?.orderInfo?.divisionId
      )
    },
    canShowPhoneBox() {
      return this.phoneDialog?.data?.phone
    },
    currentStatus() {
      return this.internalData?.inquiryInfo?.inquiryStatus
    }
  },

  activated() {
    this.fromChatRoom = peace.util.decode(this.$route.params.json).fromChatRoom ? true : false
    this.get()
  },
  created() {
    const tradeType = peace.util.decode(this.$route.params.json)?.tradeType
    if (tradeType && this.currentStatus != ENUM.INQUIRY_STATUS.待接诊) {
      this.cbDialog.visible = true
    }
  },
  methods: {
    H5PayCallback() {
      this.refreshOrder()
    },
    refreshOrder() {
      let n = 0
      this.refreshTimer = setInterval(() => {
        n = n + 1
        if (this.currentStatus != ENUM.INQUIRY_STATUS.待接诊 && n < 10) {
          this.getConsultDetail('hideLoad')
        } else {
          clearInterval(this.refreshTimer)
          this.refreshTimer = null
        }
      }, 1000)
    },
    showRefundTip() {
      this.refundTipDialog.data.divisionId = this.internalData.orderInfo.divisionId
      this.refundTipDialog.visible = true
    },
    callPhone() {
      this.phoneDialog.visible = true
    },
    changeInvoiceModel() {
      this.showInvoiceModel = true
    },
    changeFlag() {
      this.dialog.visible = false
      this.get()
    },
    gotoCaseDetail(dataNo) {
      const token = $peace.cache.get($peace.type.USER.INFO).loginInfo.accessToken
      const url = `health/firstOption/${process.env.VUE_APP_IFRAME_BASE_PLATFORM}/${token}/${dataNo}`
      const json = peace.util.encode({
        url
      })
      this.$router.push(`/components/mainIframe/${json}`)
    },
    seeMoreCase() {
      const json = peace.util.encode({
        familyId: this.internalData?.familyInfo?.familyId,
        doctorId: this.internalData?.doctorInfo?.doctorId,
        inquiryNo: this.inquiryInfo?.inquiryNo
      })
      this.$router.push(`/components/FirstVisitList/${json}`)
    },
    get() {
      this.getConsultDetail()
    },
    finish(data) {
      if (!this.canShowPayBottom) return
      data.inquiryInfo.time = 0
      this.cancelInquiryOrder(data.orderInfo.orderNo)
    },
    cancelInquiryOrder(orderNo) {
      let params = {
        orderNo: orderNo,
        cancelType: 2
      }
      peace.service.patient.cancel(params).finally(() => {
        this.getConsultDetail()
      })
    },
    report(data) {
      const params = { inquiryNo: data.inquiryInfo.inquiryNo }
      peace.service.patient.report(params).then((res) => {
        // this.goToPay(data)
        const data = res.data
        const json = {
          money: data.orderMoney, //总金额
          moneyRecord: data.moneyRecord, //费用明细
          orderNo: data.orderNo,
          inquiryId: data.inquiryId,
          orderType: 'inquiry',
          isReport: true
        }
        this.dialog.visible = true
        this.dialog.data = json
      })
    },
    goToPay(data) {
      let order = data.orderInfo
      let totalMoney = order.totalMoney
      if (!Number(totalMoney)) {
        this.getConsultDetail()
        return
      }
      let orderNo = order.orderNo
      peace.wx.pay({ orderNo }, null, this.getConsultDetail, this.getConsultDetail)
    },
    getConsultDetail(type = '') {
      let params = {
        inquiryId: peace.util.decode(this.$route.params.json).inquiryId,
        sysId: peace.util.decode(this.$route.params.json).sysId
      }
      if (type == 'hideLoad') {
        params.hideLoad = true
      }
      peace.service.patient.inquiryDetail(params).then(async (res) => {
        let inquiryInfo = res.data.inquiryInfo
        let expireTime = inquiryInfo.inquiryStatus == 1 ? inquiryInfo.orderExpireTime : inquiryInfo.orderReceptTime
        if (expireTime > inquiryInfo.currentTime) {
          res.data.inquiryInfo.time = (expireTime - inquiryInfo.currentTime) * 1000
        }
        this.internalData = Object.assign({}, res.data)
        this.phoneDialog.data.phone = this.internalData.orderInfo.serviceTel
        this.cbDialog.data.money = this.internalData.orderInfo.orderMoney
        if (res.data.inquiryInfo.serviceType == 'returnVisit') {
          await this.getFirstOptionList()
        }

        this.firstLoad = true
      })
    },
    getFirstOptionList() {
      const params = {
        familyId: this.internalData?.familyInfo?.familyId,
        doctorId: this.internalData?.doctorInfo?.doctorId,
        inquiryNo: this.internalData?.inquiryInfo?.inquiryNo
      }
      peace.service.yibao.GetFirstOptionList(params).then((res) => {
        if (res.data == null || !res.data.firstOptionList) {
          return
        }
        let list = []
        if (res.data.firstOptionList.length > 2) {
          this.canSeeMoreCase = true
          list = res.data.firstOptionList.slice(0, 2)
        } else {
          this.canSeeMoreCase = false
          list = res.data.firstOptionList
        }
        const temp = {}
        // 遍历时间
        const timeList = new Set(list.map((item) => item.createdTime))
        if (timeList.size) {
          timeList.forEach((time) => {
            temp[time] = list.filter((item) => item.createdTime === time)
          })
        }
        this.firstVisitData = temp
        this.hasFirstVisitInfo = res.data.firstOptionList.length > 0 ? true : false
      })
    },
    getInquiryText(status) {
      const dic = {
        '1':
          this.internalData.inquiryInfo.appointmentStatus == 1 && !this.internalData.inquiryInfo.reportTime
            ? this.internalData.inquiryInfo.statusTxtContent
            : '订单创建15分钟后未支付将自动关闭',
        '2': '已通知医生尽快接诊。12小时内未接诊将自动退诊。',
        // '2': '',
        '3': '请及时与医生沟通',
        // '4': '医生已退诊',
        '4': '',
        '5': '祝您身体健康',
        '6':
          this.internalData.inquiryInfo.appointmentStatus == 2
            ? this.internalData.inquiryInfo.statusTxtContent
            : this.internalData.orderInfo.payMoney == '0.00'
            ? '订单已取消，如遇紧急情况请及时就医'
            : '订单已取消'
      }
      return dic[status]
    },

    gouserPrescripCasePage(item) {
      const params = peace.util.encode({
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theCase/${params}`)
    },

    gouserPrescripListPage(item) {
      const params = peace.util.encode({
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theRecipeList/${params}`)
    },

    goChatingPage(item) {
      // 问诊中时, 问诊记录跳转聊天页
      if (item.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.问诊中) {
        const params = peace.util.encode({
          id: 'p2p-' + item.doctorInfo.doctorId,
          scene: 'p2p',
          beginTime: item.orderInfo.orderTime.toDate().getTime(),
          to: item.doctorInfo.doctorId,
          familyId: item.familyInfo.familyId
        })

        // 跳转聊天详情
        this.$router.push(`/components/messageList/${params}`)
      }

      // 非问诊中,显示历史记录
      else {
        const params = peace.util.encode({
          inquiryNo: item.inquiryInfo.inquiryNo,
          familyId: item.familyInfo.familyId
        })

        this.$router.push(`/components/messageList/${params}`)
      }
    },

    showCancellPop(item) {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消问诊？'
      })
        .then(() => {
          const params = {
            orderNo: item.orderInfo.orderNo
          }
          peace.service.patient
            .cancel(params)
            .then((res) => {
              peace.util.alert(res.msg)

              this.get()
            })
            .catch((res) => {
              if (res.data.code == '202') {
                this.invoiceDialog.visible = true
                this.invoiceDialog.data.message = res.data.msg
              } else {
                setTimeout(() => {
                  this.get()
                }, 1500)
              }
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    viewImage(file, fileIndex, files) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
      this.imagePreview.images = files.map((item) => item.image_path)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
}
// 诊疗记录
.case-card {
  display: flex;

  .case-card-time {
    padding: 8px 15px 0 0;
    min-width: 70px;
    position: relative;
    text-align: right;
    font-family: monospace;
    .y {
      font-size: 12px;
      color: #999999;
    }
    .m {
      font-size: 15px;
      font-weight: 400;
      color: #333333;
    }
  }
  .case-box {
    flex: 1;
    width: 0;
  }
  .case-card-note {
    width: 100%;
    min-height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    &:not(:last-child) {
      margin: 0 0 15px 0;
    }

    .case-card-note-content {
      display: flex;
      align-items: center;
    }
    .case-left {
      width: 35px;
      height: 35px;
      margin: 15px 16px 15px 14px;
      text-align: left;
      position: relative;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      width: 0;
      .case-right-title {
        color: #333;
        font-size: 14px;
      }
      .case-right-name {
        font-size: 13px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 98%;
      }
    }
    .case-diagnosis {
      padding-left: 16px;
      height: 25px;
      line-height: 25px;
      border-top: 1px solid #e8e8e8;
      color: $primary;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
//大图预览
/deep/ .van-image-preview__index {
  top: 24px;
}

/deep/ .van-image-preview__cover {
  position: absolute;
  top: 24px;
  left: 24px;

  .van-button--round {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2a2a2a;
    background-color: #999999;
    border: 1px solid #999999;

    .van-button__icon {
      line-height: 1;
    }
  }
}

//footer
.report,
.footer,
.pay {
  &.fixedBottom {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
  }
}

.report {
  flex-wrap: wrap;
  padding: 14px 16px;
  .cancel-btn {
    width: 32%;
    margin-right: 4%;
    color: #999;
    height: 45px;
    border-radius: 23px;
  }
  .report-btn {
    width: 64%;
    background-color: #00c6ae;
    color: #fff;
    height: 45px;
    border-radius: 23px;
  }
  .report-tip {
    margin-top: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 1;
    color: #999;
    font-size: 13px;
    img {
      width: 13px;
      height: 13px;
      display: block;
      margin-right: 5px;
    }
  }
}
.footer {
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 8px 16px 24px;
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 40px;
    height: 48px;
    padding: 12px 0;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    &.chat-btn {
      color: #fff;
      background: rgba(0, 202, 173, 1);
      border: 1px solid rgba(0, 198, 174, 1);
    }
    &.wait-btn {
      color: #999;
      border: 1px solid #ccc;
    }
    &:first-child {
      margin-right: 12px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

.pay {
  height: 115px;
  padding: 10px 15px;
  flex-direction: column;
  justify-content: space-around;
  .pay-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:first-child {
      padding-bottom: 5px;
    }
    .count-down {
      display: flex;
      align-items: center;
      color: #999;
      .van-count-down {
        color: #999;
      }
      span {
        margin-right: 5px;
      }
    }
    .right {
      color: #000;
      font-size: 13px;
      span {
        color: #f2223b;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .pay-btn {
      height: 45px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
    }
    .btn-cancel {
      color: #999;
      border: 1px solid #ccc;
      width: 32%;
    }
    .btn-pay {
      color: #fff;
      background: #00c6ae;
      width: 64%;
    }
  }
}
.module-item-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 24px;
  justify-content: flex-start;
  &.size-14 {
    font-size: 14px;
    line-height: 20px;
  }
  &.message {
    justify-content: space-between;
  }
  &.start {
    align-items: flex-start;
    .module-item-value {
      word-break: break-all;
    }
  }
  &.img {
    display: block;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &:last-child {
    border-bottom: 0;
  }
  .module-item-label {
    color: rgba(51, 51, 51, 0.6);
    min-width: 5.5em;
    &.auto {
      min-width: auto;
    }
  }
  .module-item-value {
    color: #333333;
    &.img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px 0;
      .img {
        width: 60px;
        height: 60px;
        margin: 5px 8px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }
  }
}
.module-item {
  &.record {
    .title {
      margin: 0;
    }
  }
  &.phone {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
    .van-image {
      width: 14px;
      height: 14px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
}
.module-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  .module-item-more {
    color: #999;
    font-weight: normal;
    padding-top: 10px;
  }
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
  padding-bottom: 0.1px;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;

  .module {
    background: #fff;
    margin-top: 0;
    padding: 16px;
    margin-bottom: 8px;

    &.top {
      .top-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        .strong {
          font-weight: bold;
          font-size: 18px;
          // line-height: 22px;
          line-height: 1;
          display: flex;
          align-items: flex-end;
        }
        .cancelTip {
          display: flex;
          align-items: center;
          .van-icon,
          .van-image {
            width: 12px;
            height: 12px;
            margin-left: 3px;
          }
          span {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 12px;
          }
        }
      }
    }
    &.doctor {
      .doctor-logo {
        .van-image {
          width: 60px;
          height: 60px;
          border: 1px solid #eee;
          margin-right: 16px;
        }
      }
      .doctor-body {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .doctor-name {
          line-height: 24px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #333333;
          .doctor-small {
            line-height: 24px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: normal;
            color: #333333;
            margin-left: 4px;
          }
          .van-image {
            width: 12px;
            height: 12px;
            margin-left: 4px;
          }
        }
        .doctor-hospitalName {
          line-height: 32px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: normal;
          color: #333333;
        }
      }
    }
    &.order {
      .module-item {
        &:first-child {
          .title {
            margin-top: 0;
          }
        }
      }
    }
    &.money {
      margin-top: -16px;
      justify-content: space-between;
      padding: 0 16px;
      .right {
        padding-top: 8px;
        padding-bottom: 16px;
        border-top: 1px dashed rgba(51, 51, 51, 0.1);
      }
    }
    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 0 0 0;
      font-size: 12px;
      color: rgba(0, 198, 174, 1);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('../../assets/images/icons/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
    .waitText {
      padding: 10px 15px;
      // width: 100%;
      box-sizing: border-box;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 0 0 0;
      .cancelText {
        height: 27px;
        line-height: 27px;
        padding: 0;
        margin: 0;
        border: 0;
        padding-left: 40px;
        background-position: 0px 5px;
      }
      .wait-img {
        height: 42px;
        width: calc(100% - 2px);
        margin-left: 1px;
        margin-top: 6px;
        display: block;
      }
    }
  }

  .typeTag {
    width: 36px;
    height: 22px;
    border-radius: 10px 10px 10px 0;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
    &.zx {
      background-color: #00c6ae;
      &.fz {
        background-color: #fa8c16;
      }
    }
  }

  .brief {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    line-height: 24px;
  }
  .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 12px;
    margin-top: 16px;
    &::before {
      position: absolute;
      content: '';
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background: $primary;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .right {
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .money {
    color: #f2223b;
    font-size: 18px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    font-weight: 600;
    span {
      font-weight: 400;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
