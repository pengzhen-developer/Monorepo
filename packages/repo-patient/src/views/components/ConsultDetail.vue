<template>
  <div class="page">
    <div class="consult-detatil"
         v-if="internalData &&
               internalData.inquiryInfo &&
               internalData.doctorInfo &&
               internalData.familyInfo &&
               internalData.illInfo">
      <!--TOP-->
      <div class="module nmg">
        <div class="strong">
          {{ internalData.inquiryInfo.statusTxt }}
          <!-- <span class="money"
                v-if="internalData.inquiryInfo.inquiryStatus == '1'">¥{{ internalData.orderInfo.orderMoney }}</span> -->
          <div class='typeTag fz'
               v-if="internalData.inquiryInfo && internalData.inquiryInfo.isAgain.toString()==='1'">
            复诊</div>
          <div class='typeTag zx'
               v-else>咨询</div>
        </div>
        <div class="brief"
             v-if="internalData.inquiryInfo.inquiryStatus!=4">
          {{ getInquiryText(internalData.inquiryInfo.inquiryStatus) }}
        </div>
        <div class="brief"
             v-else>
          {{internalData.inquiryInfo.overCause}}
        </div>
        <div class="cancelText"
             v-if="
          (internalData.inquiryInfo.inquiryStatus == '6' ||
            internalData.inquiryInfo.inquiryStatus == '4') &&
            internalData.orderInfo.payMoney != '0.00'
        ">
          订单取消后退款将在1-3个工作日内原路返回，请注意查收
        </div>
        <div class="waitText"
             v-if="internalData.inquiryInfo.inquiryStatus == '2'">
          <div class="cancelText">
            接诊后可以在“消息”中查看回复
          </div>
          <img class="wait-img"
               src="~@/assets/images/ic_wait_message.png" />
        </div>
      </div>
      <!--医生名片-->
      <div class="module card">
        <div class="card-avatar avatar-circular">
          <img :src="internalData.doctorInfo.avartor"
               style="height:100%;" />
        </div>
        <div class="card-body">
          <div class="card-name">
            {{ internalData.doctorInfo.name }}
            <div class="card-small">
              {{ internalData.doctorInfo.doctorTitle }}
              {{ internalData.doctorInfo.deptName }}
              <div class="label label-private"
                   v-if="internalData.doctorInfo.isPrivateDoctor">
                私人医生
              </div>
              <van-image width=13
                         v-if="internalData.orderInfo.inquiryType=='image'"
                         :src="require('@src/assets/images/ic_tuwen_open.png')"></van-image>
              <van-image width=13
                         v-if="internalData.orderInfo.inquiryType=='video'"
                         :src="require('@src/assets/images/ic_video_open.png')"></van-image>
            </div>
          </div>
          <div class="card-small">{{ internalData.doctorInfo.hospitalName }}</div>
        </div>
      </div>
      <!--订单内容-->
      <div class="module order">
        <div class="module-item">
          <div class="b">个人信息</div>
          <div class="form-dl">
            <div class="form-dt"><span>姓名</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.familyName}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>年龄</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.familyAge + "岁"}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>性别</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.familySex}}
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.familyInfo.guardianName">
            <div class="form-dt"><span>监 护 人</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.guardianName}} |
              {{internalData.familyInfo.guardianSex}} |
              {{internalData.familyInfo.guardianAge+'岁'}}
            </div>
          </div>
        </div>
        <!--病情描述-->
        <div class="module-item">
          <div class="b">病情描述</div>
          <div class="span">{{ internalData.inquiryInfo.inquiryDescribe }}</div>
        </div>
        <div class="module-item"
             v-if="internalData.inquiryInfo && internalData.inquiryInfo.isAgain.toString()==='1'">
          <div>
            <div class="b">复诊信息</div>
            <div class="form-dl img"
                 v-if="internalData.inquiryInfo.inquiryImages.length>0">
              <div class="form-dt ">复诊凭证 :</div>
              <div class="form-img">
                <div class="img"
                     v-for="(item,index) in internalData.inquiryInfo.inquiryImages"
                     :key="index">
                  <img :src="item.image_path"
                       @click="viewImage(item, index,internalData.inquiryInfo.inquiryImages)" />
                </div>
              </div>
            </div>
            <div class="form-dl"
                 v-else>
              <div class="form-dt">复诊凭证 :</div>
              <div class="form-dd">确认遗失
              </div>
            </div>
            <div class="form-dl">
              <div class="form-dt start">初诊诊断 :</div>
              <div class="form-dd">{{internalData.illInfo.confirmIllness}}
              </div>
            </div>
          </div>
        </div>
        <div class="module-item"
             v-if="internalData.supplementaryInfo && (internalData.supplementaryInfo.affectedImages.length>0||internalData.supplementaryInfo.pregnancyText||internalData.supplementaryInfo.allergicHistory)">
          <div>
            <div class="b">补充信息</div>
            <div class="form-dl img"
                 v-if="internalData.supplementaryInfo.affectedImages.length>0">
              <div class="form-dt ">患处图片 :</div>
              <div class="form-img">
                <div class="img"
                     v-for="(item,index) in internalData.supplementaryInfo.affectedImages"
                     :key="index">
                  <img :src="item.image_path"
                       @click="viewImage(item, index,internalData.supplementaryInfo.affectedImages)" />
                </div>
              </div>
            </div>
            <div class="form-dl"
                 v-if="internalData.supplementaryInfo.pregnancyText">
              <div class="form-dt">特殊时期 :</div>
              <div class="form-dd">{{internalData.supplementaryInfo.pregnancyText}}</div>
            </div>
            <div class="form-dl"
                 v-if="internalData.supplementaryInfo.allergicHistory">
              <div class="form-dt"
                   style="height:fit-content;"><span>过敏史</span> :</div>
              <div class="form-dd">{{internalData.supplementaryInfo.allergicHistory}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--订单报文-->
      <div class="module pdtb">
        <div class="dl-packet">
          <div class="dt">订单号码</div>
          <div class="dd">{{ internalData.orderInfo.orderNo }}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">订单金额</div>
          <div class="dd">{{ internalData.orderInfo.orderMoney }}元</div>
        </div>
        <div class="dl-packet">
          <div class="dt">优惠金额</div>
          <div class="dd">0.00元</div>
        </div>
        <div class="dl-packet">
          <div class="dt">订单时间</div>
          <div class="dd">{{ internalData.orderInfo.orderTime }}</div>
        </div>
        <template v-if="internalData.orderInfo.paymentType">
          <div class="dl-packet">
            <div class="dt">支付方式</div>
            <div class="dd">{{paymentTypeText}}</div>
          </div>
          <div class="dl-packet">
            <div class="dt">支付时间</div>
            <div class="dd">{{ internalData.orderInfo.payTime }}</div>
          </div>
        </template>
      </div>

      <!-- <div class="module pdtb"
           v-if="internalData.inquiryInfo.inquiryStatus == '1'">
        <div class="brief right">
          应付金额：
          <div class="money">{{ "¥" + internalData.orderInfo.orderMoney }}</div>
        </div>
      </div> -->
      <div class="module pdtb"
           v-if="internalData.inquiryInfo.inquiryStatus != '1'">
        <!-- 取消订单的状态 -->
        <template v-if="internalData.inquiryInfo.inquiryStatus == '6'">
          <div class="brief right"
               v-if="internalData.orderInfo.payMoney == 0">
            <template v-if="internalData.orderInfo.orderMoney == 0">
              实付金额：
            </template>
            <template v-else>
              应付金额：
            </template>
            <div class="money">{{ "¥" + internalData.orderInfo.orderMoney }}</div>
          </div>
          <div class="brief right"
               v-else>
            实付金额：
            <div class="money">{{ "¥" + internalData.orderInfo.payMoney }}<span
                    v-if="internalData.inquiryInfo.inquiryStatus == '6'&&internalData.orderInfo.payMoney != '0.00'">（已退款）</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="brief right">
            实付金额：
            <div class="money">
              {{ "¥" + internalData.orderInfo.payMoney }}
              <span
                    v-if="internalData.inquiryInfo.inquiryStatus == '4'&&internalData.orderInfo.payMoney != '0.00'">（已退款）</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template v-if="internalData&&
               internalData.inquiryInfo">
      <div class="footer"
           v-if="internalData.inquiryInfo.inquiryStatus == '2'">
        <div class="footer-btn wait-btn"
             @click="showCancellPop(internalData)">取消订单</div>
      </div>
      <div class="h64"
           v-if="!fromChatRoom&&(internalData.inquiryInfo.inquiryStatus == '3' ||
               (internalData.inquiryInfo.inquiryStatus == '4'&&internalData.inquiryInfo.quitStatus!='1'&&internalData.inquiryInfo.quitStatus!='2') ||
               internalData.inquiryInfo.inquiryStatus == '5')"></div>
      <div class="footer fixedBottom"
           v-if="!fromChatRoom&&(internalData.inquiryInfo.inquiryStatus == '3' ||
               (internalData.inquiryInfo.inquiryStatus == '4'&&internalData.inquiryInfo.quitStatus!='1'&&internalData.inquiryInfo.quitStatus!='2') ||
               internalData.inquiryInfo.inquiryStatus == '5')">
        <div class="footer-btn chat-btn"
             @click="goChatingPage(internalData)"
             v-if="
            (internalData.inquiryInfo.inquiryStatus == '4'&&internalData.inquiryInfo.quitStatus!='1'&&internalData.inquiryInfo.quitStatus!='2') ||
              internalData.inquiryInfo.inquiryStatus == '5'">咨询记录</div>
        <div class="footer-btn chat-btn"
             @click="goChatingPage(internalData)"
             v-if="
            internalData.inquiryInfo.inquiryStatus == '3'">进入咨询</div>
      </div>
      <div class="h115"
           v-if="internalData.inquiryInfo.inquiryStatus == '1'&&internalData.inquiryInfo.time>0">
      </div>
      <div class="pay fixedBottom"
           v-if="internalData.inquiryInfo.inquiryStatus == '1'&&internalData.inquiryInfo.time>0">
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
          <div class="pay-btn btn-cancel"
               @click="showCancellPop(internalData)">取消订单</div>
          <div class="pay-btn btn-pay"
               @click="goToPay(internalData)">立即支付</div>
        </div>
      </div>
    </template>

    <peace-dialog :visible.sync="caseDetail.visible"
                  title="咨询小结">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeList.visible"
                  title="用药建议">
      <TheRecipeList :data="recipeList.data"></TheRecipeList>
    </peace-dialog>

    <peace-dialog :visible.sync="chatingPage.visible"
                  title="咨询记录">
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
const ENUM = {
  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保支付: 'yibaopay'
  }
}
export default {
  components: {
    TheCase,
    TheRecipeList,
    MessageList,

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
      internalData: {},

      caseDetail: {
        visible: false,
        data: {}
      },

      recipeList: {
        visible: false,
        data: []
      },

      chatingPage: {
        visible: false,
        data: []
      },
      imagePreview: {
        visible: false,
        position: 0,
        images: []
      },
      fromChatRoom: false
    }
  },
  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },
  computed: {
    paymentTypeText() {
      return Object.keys(ENUM.PAYMENT_TYPE).find(
        key => ENUM.PAYMENT_TYPE[key] === this.internalData.orderInfo.paymentType
      )
    }
  },
  activated() {
    this.fromChatRoom = peace.util.decode(this.$route.params.json).fromChatRoom ? true : false
    this.get()
  },

  methods: {
    get() {
      this.getConsultDetail()
    },
    finish(data) {
      data.inquiryInfo.time = 0
    },

    goToPay(data) {
      let doctorId = data.doctorInfo.doctorId
      let order = data.orderInfo
      let money = order.orderMoney
      let typeName = order.inquiryType == 'image' ? '图文问诊' : ''
      let doctorName = data.doctorInfo.name
      let orderNo = order.orderNo
      let inquiryId = data.inquiryInfo.inquiryId
      let json = { money, typeName, doctorName, orderNo, doctorId, inquiryId }
      json = peace.util.encode(json)
      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },

    getConsultDetail() {
      let inquiryId = peace.util.decode(this.$route.params.json).inquiryId
      peace.service.patient.inquiryDetail({ inquiryId: inquiryId }).then(res => {
        let inquiryInfo = res.data.inquiryInfo
        let expireTime = inquiryInfo.inquiryStatus == 1 ? inquiryInfo.orderExpireTime : inquiryInfo.orderReceptTime
        if (expireTime > inquiryInfo.currentTime) {
          res.data.inquiryInfo.time = (expireTime - inquiryInfo.currentTime) * 1000
        }
        this.internalData = res.data
      })
    },

    getInquiryText(status) {
      const dic = {
        // '1': '15分钟之后未支付系统将自动关闭订单',
        '1': '订单创建15分钟后未支付将自动关闭',
        // '2': '已通知医生尽快接诊。12小时内未接诊将自动退诊。',
        '2': '',
        '3': '请及时与医生沟通',
        // '4': '医生已退诊',
        '4': '',
        '5': '祝您身体健康',
        '6':
          this.internalData.orderInfo.payMoney == '0.00' ? '咨询订单已取消，如遇紧急情况请及时就医' : '咨询订单已取消'
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
      // 问诊中时, 咨询记录跳转聊天页
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
        message: '是否确认取消咨询？'
      })
        .then(() => {
          const params = {
            orderNo: item.orderInfo.orderNo
          }
          peace.service.patient.cancel(params).then(res => {
            peace.util.alert(res.msg)

            this.get()
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    viewImage(file, fileIndex, files) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
      this.imagePreview.images = files.map(item => item.image_path)
    }
  }
}
</script>

<style lang="scss" scoped>
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

.footer,
.pay {
  &.fixedBottom {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
.h64 {
  height: 64px;
}
.footer {
  width: 100%;
  background-color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 343px;
    height: 45px;
    border-radius: 40px;
    &.chat-btn {
      color: #fff;
      background: rgba(0, 202, 173, 1);
      border: 1px solid rgba(0, 198, 174, 1);
    }
    &.wait-btn {
      color: #999;
      border: 1px solid #ccc;
    }
  }
}
.h115 {
  height: 115px;
}
.pay {
  height: 115px;
  background-color: #fff;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
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
.module-item {
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border-bottom: 0;
  }
  .pt5 {
    margin-top: 5px;
  }
}
.order {
  padding: 0 15px;
  .b {
    padding-left: 0 !important;
  }
  .form-dl {
    padding: 4px 0;
    border-bottom: 0;
    &:last-child {
      padding-bottom: 10px;
    }
  }

  .form-dt {
    color: #999;
    min-width: 70px;
    display: flex;
    padding-right: 10px;
    align-items: center;
    &.start {
      align-items: flex-start;
    }
    span {
      flex: 1;
      text-align: justify;
      text-align-last: justify;
      padding-right: 3px;
      height: 16px;
      line-height: 16px;
      &::after {
        content: ' ';
        display: inline-block;
        width: 100%;
        height: 0px;
      }
    }
  }
  .form-dd {
    color: #333;
    text-align: left;
    padding-left: 2px;
  }
}
.bb {
  height: 1px;
  background: #e8e8e8;
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  .module,
  .brief {
    border-radius: 5px;
  }
  .module {
    background: #fff;
    margin-bottom: 10px;
    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 15px 0 15px;
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
      margin: 10px 15px 0 15px;
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
  .form-dl {
    font-size: 14px;
  }
  .form-dl.img {
    display: block;
    .form-dt {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .form-img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img {
        width: 57px;
        height: 57px;
        background: #ccc;
        margin: 5px 10px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 57px;
          height: 57px;
          display: block;
        }
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
  }
  .typeTag.zx {
    background-color: #00c6ae;
  }
  .typeTag.fz {
    background-color: #fa8c16;
  }
  .nmg {
    margin-top: 0;
    padding-bottom: 10px;
  }
  .module .strong {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
  }
  .module .brief {
    font-size: 13px;
    padding: 0 15px;
    /*color: #888;*/
  }
  .module .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .module .module-body {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .module-body .label {
    flex: 1;
    text-align: center;
    font-size: 13px;
    padding: 4px 6px;
    margin: 5px;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .module-body .blue-full {
    background: #00c6ae;
    color: #fff;
    border-color: transparent;
  }

  .card {
    background: #fff;
    padding: 10px 15px;
  }
  .b {
    display: block;
    font-weight: bold;
    color: #000;

    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 15px;
      background: #00c6ae;
      margin-right: 8px;
      margin-bottom: -2px;
    }
  }
  .b {
    padding: 10px 15px 0 15px;
  }
  .span {
    padding: 10px 15px 10px 0;
  }
  .ul {
    padding: 0 15px;
  }
  .dl-packet {
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: #999;
    font-size: 13px;
  }
  .dl-packet .dt {
    flex: 0 0 auto;
    width: 115px;
    padding: 5px 15px;
  }
  .dl-packet .dd {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    padding: 5px 15px;
    color: #333;
  }
  .pdtb {
    padding: 10px 0;
  }
  .right {
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .ul {
    display: flex;
    padding-bottom: 15px;
  }
  .ul .li {
    flex: 0 0 auto;
    width: 45px;
    height: 45px;
    margin-right: 13px;
    border: 1px solid #e5e5e5;
    padding: 5px;
  }
  .label.label-private {
    font-size: 8px;
    padding: 1px 2px;
    border-radius: 2px;
    color: #f7e9b3;
    background: #504c4f;
    border-color: #504c4f;
    vertical-align: text-top;
    margin-top: 2px;
  }
}
</style>
