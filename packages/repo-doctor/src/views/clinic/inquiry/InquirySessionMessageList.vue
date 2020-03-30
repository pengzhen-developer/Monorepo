<template>
  <div class="inquiry-session-message-list">
    <!-- 待接诊 -->
    <template v-if="type === 'inquiry' && $store.getters['inquiry/inquiryInfo'].inquiryStatus === $peace.type.INQUIRY.INQUIRY_STATUS.待接诊">
      <InquiryPreliminaryForReceive v-if="messageList && messageList[0]"
                                    :data="messageList[0].content.data"></InquiryPreliminaryForReceive>
    </template>

    <!-- 已接诊 -->
    <template v-else>

      <div :class="getMessageFlow(message)"
           :key="message.time"
           class="message"
           v-for="(message ,index) in messageList">
        <!-- 文本消息 -->
        <template v-if="getMessageType(message) === 'text' || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body"
               v-html="getMessageText(message)"></div>
        </template>

        <!-- 问诊卡片 -->
        <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.问诊卡片">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getPreliminaryDetail(message)"
               class="message-body message-card">
            <div class="message-header">
              <img width="20px"
                   height="17px"
                   :src="require('@src/assets/images/ic_message.png')" />
              <span v-text="message.content.data.patientInfo.familyName"></span>
              <span>|</span>
              <span v-text="message.content.data.patientInfo.familySex"></span>
              <span>|</span>
              <span v-text="message.content.data.patientInfo.familyAge"></span>
              <span>岁</span>
              <img v-if="message.content.data.inquiryOrderInfo.isAgain === '0'"
                   :src="require('@src/assets/images/ic_zx.png')"
                   class="fz" />
              <img v-if="message.content.data.inquiryOrderInfo.isAgain === '1'"
                   :src="require('@src/assets/images/ic_fz.png')"
                   class="fz" />
            </div>
            <div class="message-line"></div>
            <div class="message-content">
              <div class="t">病情描述</div>
              <div class="content">{{ message.content.data.inquiryOrderInfo.describe }}</div>
            </div>
          </div>
        </template>

        <!-- 转诊单 -->
        <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊单">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getTransfelDetail(message)"
               class="message-body case">
            <img src="~@src/assets/images/ic_转诊.png" />
            <div style="text-align: left;">
              <p style="font-size: 14px;">转诊单</p>
              <p>查看详情</p>
            </div>
          </div>
        </template>

        <!-- 会诊单 -->
        <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊单">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getConsultDetail(message)"
               class="message-body case">
            <img src="~@src/assets/images/ic_会诊.png" />
            <div style="text-align: left;">
              <p style="font-size: 14px;">会诊单</p>
              <p>查看详情</p>
            </div>
          </div>
        </template>

        <!-- 检查单 -->
        <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.检查单">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body message-card">
            <div class="message-header">
              <img width="17px"
                   height="20px"
                   :src="require('@src/assets/images/ic_check.png')" />
              <span>检查单</span>
            </div>
            <div class="message-content">
              <div style="display:flex; justify-content: space-between; align-items: center; color: #333;"
                   v-for="item in message.content.data.checkOrderInfo.checkOrderTxt"
                   :key="item.itemId">
                <div class="left">{{ item.name }}</div>
                <div class="right"
                     style="width: 40px; text-align: right;"></div>
              </div>
            </div>
            <div class="message-line"></div>
            <div class="message-footer"
                 style="cursor: pointer;"
                 @click="getCheckOrderDetail(message)">查看详情</div>
          </div>
        </template>

        <!-- 视频消息 -->
        <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.视频通话 || 
                        getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.视频记录">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body">
            <img v-if="getMessageFlow(message) === 'in'"
                 src="~@/assets/images/inquiry/ic_video_right@2x.png"
                 style="width: 18px; margin-right: 10px;" />
            <span>{{ getMessageText(message) }}</span>
            <img v-if="getMessageFlow(message) === 'out'"
                 src="~@/assets/images/inquiry/ic_video_left@2x.png"
                 style="width: 18px; margin-left: 10px;" />
          </div>
        </template>

        <!-- 图片消息 -->
        <template v-else-if="getMessageType(message) === 'image'">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div v-viewer>
            <img :src="message.file.url"
                 style="max-width: 400px; max-height: 600px; "
                 title="查看大图" />
          </div>
        </template>

        <!-- 病历消息 -->
        <template v-else-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.病历">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getCaseDetail(message)"
               class="message-body case">
            <img src="~@src/assets/images/inquiry/ic_medical record.png" />
            <div style="text-align: left;">
              <p style="font-size: 14px;">病历</p>
              <!-- <p>查看详情</p> -->
              <p>{{formDate(message.time || message.sendtime)}}</p>
            </div>
          </div>
        </template>

        <!-- 处方消息 -->
        <template v-else-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.处方">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">
                {{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getRecipeDetail(message)"
               class="message-body recipe">
            <img src="~@src/assets/images/inquiry/ic_rp.png" />
            <div style="text-align: left;">
              <p style="font-size: 14px;">处方</p>
              <p>{{formDate(message.time || message.sendtime)}}</p>
              <!-- <p>查看详情</p> -->
            </div>
          </div>
        </template>
      </div>
    </template>

    <peace-dialog :visible.sync="caseDetail.visible"
                  append-to-body
                  title="病历详情">
      <InquirySessionCaseDetail :data="caseDetail.data"></InquirySessionCaseDetail>
    </peace-dialog>
    <peace-dialog :visible.sync="recipeDetail.visible"
                  v-if="recipeDetail.visible"
                  append-to-body
                  title="处方详情">
      <InquirySessionRecipeDetail :data="recipeDetail.data"></InquirySessionRecipeDetail>
    </peace-dialog>
    <peace-dialog :visible.sync="transfer.visible"
                  v-if="transfer.visible"
                  append-to-body
                  title="转诊详情">
      <InquiryTransferDetail :data="transfer.data"
                             :type="transfer.referral_type"
                             @close="() => transfer.visible = false"></InquiryTransferDetail>
    </peace-dialog>
    <peace-dialog :visible.sync="consultation.visible"
                  v-if="consultation.visible"
                  append-to-body
                  title="会诊详情">
      <InquiryConsultationDetail :data="consultation.data"
                                 @close="() => consultation.visible = false"></InquiryConsultationDetail>
    </peace-dialog>
    <peace-dialog :visible.sync="preliminary.visible"
                  v-if="preliminary.visible"
                  append-to-body
                  title="问诊单详情">
      <InquiryPreliminary :data="preliminary.data"
                          @close="() => preliminary.visible = false"></InquiryPreliminary>
    </peace-dialog>
    <peace-dialog :visible.sync="checkOrder.visible"
                  v-if="checkOrder.visible"
                  append-to-body
                  title="检查单详情">
      <InquiryCheckOrderInfo :data="checkOrder.data"
                             @close="() => checkOrder.visible = false"></InquiryCheckOrderInfo>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import InquiryPreliminaryForReceive from './InquiryPreliminaryForReceive'

import InquiryConsultationDetail from './InquiryConsultationDetail'
import InquiryTransferDetail from './InquiryTransferDetail'
import InquirySessionCaseDetail from './InquirySessionCaseDetail'
import InquirySessionRecipeDetail from './InquirySessionRecipeDetail'
import InquiryPreliminary from './InquiryPreliminary'
import InquiryCheckOrderInfo from './InquiryCheckOrderInfo'

export default {
  components: {
    InquiryPreliminaryForReceive,

    InquiryConsultationDetail,
    InquiryTransferDetail,
    InquirySessionCaseDetail,
    InquirySessionRecipeDetail,
    InquiryPreliminary,
    InquiryCheckOrderInfo
  },

  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    },

    type: {
      type: String,
      default() {
        return 'inquiry'
      }
    }
  },

  data() {
    return {
      caseDetail: {
        visible: false,
        data: {}
      },

      recipeDetail: {
        visible: false,
        data: {}
      },

      transfer: {
        visible: false,
        referral_type: '',
        data: {}
      },

      consultation: {
        visible: false,
        data: {}
      },

      preliminary: {
        visible: false,
        data: {}
      },

      checkOrder: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    messageList() {
      let sessionMessages = this.data || this.$store.state.inquiry.sessionMessages

      // 过滤无效数据
      sessionMessages = sessionMessages.filter(message => {
        // 屏蔽系统消息
        if (message.type === 'notification') {
          return false
        }

        // 屏蔽部分自定义消息
        if (message.type === 'custom') {
          if (
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示
          )
            return false
        }

        return true
      })

      return sessionMessages
    }
  },

  watch: {
    '$store.state.inquiry.sessionMessages': {
      handler() {
        this.scrollMessageToBottom()
      },
      immediate: true
    }
  },

  activated() {
    this.scrollMessageToBottom()
  },

  methods: {
    scrollMessageToBottom() {
      this.$nextTick(function() {
        const element = document.querySelector('.message-list-scrollbar .el-scrollbar__wrap')

        if (element) {
          element.scrollTop = element.scrollHeight
        }
      })
    },

    // 是否需要显示系统时间
    isShowMessageTime(message, index) {
      if (index === 0) {
        return true
      } else {
        const prevMessage = this.messageList[index - 1]
        const currentMessage = this.messageList[index]

        if (currentMessage.time - prevMessage.time >= 1000 * 60 * 3) {
          return true
        }

        return false
      }
    },
    //2019年11月11日
    formDate(time) {
      time = new Date(time)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      return y + '年' + m + '月' + d + '日'
    },
    getMessageType(message) {
      // text
      // image
      // custom
      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          return message.content.code
        }
      } else {
        return message.type
      }
    },

    getMessageFlow(message) {
      // out
      // in
      // system
      if (message.type === 'custom') {
        if (message.content && message.content.code) {
          if (
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.评价提示 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊 ||
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒
          ) {
            return 'system'
          }
        }
      }

      return message.flow
    },

    getMessageText(message) {
      if (message.content && message.content.data && message.content.data.showTextInfo) {
        return message.content.data.showTextInfo.doctorClientText
      }

      if (message.text) {
        return message.text
      }
    },

    getCaseDetail(message) {
      const params = {
        inquiry_no: message.content.data.inquiryInfo.inquiryNo
      }
      peace.service.inquiry.getCase(params).then(res => {
        this.caseDetail.visible = true
        this.caseDetail.data = res.data
      })
    },

    getRecipeDetail(message) {
      const params = {
        inquiry_no: message.content.data.inquiryInfo.inquiryNo,
        prescriptionId: message.content.data.recipeInfo.recipeId
      }
      peace.service.prescribePrescrip.getPrescripInfo(params).then(res => {
        this.recipeDetail.visible = true
        this.recipeDetail.data = res.data
      })
    },

    getTransfelDetail(message) {
      this.transfer.data = undefined
      this.transfer.visible = true

      const params = {
        referral_no: message.content.data.referralInfo.referralNo,
        referral_type: 'out'
      }

      peace.service.inquiry.referralDocPc(params).then(res => {
        this.transfer.data = res.data
      })
    },

    getConsultDetail(message) {
      this.consultation.visible = true
      this.consultation.data = {}

      const params = {
        consultNo: message.content.data.consultInfo.consultNo
      }

      peace.service.consult.getConsultInfo(params).then(res => {
        this.consultation.data = res.data.info
      })
    },

    getPreliminaryDetail(message) {
      this.preliminary.visible = true
      this.preliminary.data = message.content.data
    },

    getCheckOrderDetail(message) {
      const params = {
        checkOrderNo: message.content.data.checkOrderInfo.checkOrderNo
      }

      peace.service.inquiry.getOrderDetail(params).then(res => {
        this.checkOrder.visible = true
        this.checkOrder.data = res.data.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inquiry-session-message-list {
  padding: 10px 10px 0 10px;

  .message {
    margin: 0 0 10px 0;

    &.in {
      text-align: left;

      .message-body {
        color: rgba(51, 51, 51, 1);
        background: rgba(243, 243, 243, 1);
      }
    }

    &.out {
      text-align: right;

      .message-body {
        color: rgba(255, 255, 255, 1);
        background: rgba(0, 198, 174, 1);
      }
    }

    &.system {
      text-align: center;
      max-width: 80%;
      margin: 5px auto;
      font-size: 12px;

      .message-body {
        color: rgba(155, 155, 155, 1);
        background: rgba(242, 242, 242, 1);
      }
    }

    &.time {
      font-size: 12px;
      text-align: center;
      margin: 0;

      .message-body {
        color: rgba(155, 155, 155, 1);
        background: rgb(255, 255, 255);
      }
    }

    .message-body {
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
      display: inline-block;
      padding: 5px 10px;
      border-radius: 4px;
      max-width: 80%;

      &.case,
      &.recipe {
        background: #fff;
        border: 1px solid #f2f2f2;
        padding: 10px 12px;
        cursor: pointer;
        display: inline-flex;

        p {
          margin: 0 0 2px 10px;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
}

.message-card,
.message-check {
  width: 250px;
  background-color: #fff !important;
  padding: 0 !important;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px 0px rgba(204, 204, 204, 0.5), -1px 1px 10px 0px rgba(221, 221, 221, 0.5);
}
.message-header {
  background-image: url('~@/assets/images/bg-img.png');
  background-size: cover;
  display: flex;
  align-items: center;
  height: 35px;
  width: 100%;
  color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
  position: relative;
  span {
    margin-left: 10px;
  }
  .fz {
    width: 50px;
    height: 35px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }
}
.message-content {
  text-align: left;
  padding: 10px;
  .t {
    color: #999;
  }
  .content {
    color: #333;
  }
}
.message-line {
  height: 1px;
  background: #f2f2f2;
  margin: 0 10px;
}
.message-footer {
  color: #999;
  padding: 8px;
  text-align: center;
}
</style>

