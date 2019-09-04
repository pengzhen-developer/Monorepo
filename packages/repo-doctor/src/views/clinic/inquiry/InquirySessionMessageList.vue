<template>
  <div class="inquiry-session-message-list">
    <div :class="getMessageFlow(message)" :key="message.time" class="message" v-for="(message ,index) in messageList">
      <!-- 文本消息 -->
      <template
        v-if="getMessageType(message) === 'text' || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.发起问诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.接诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.结束问诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.转诊提示 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.会诊提示 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.退诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊 || 
              getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.服务提醒"
      >
        <!-- 消息时间 -->
        <template v-if="isShowMessageTime(message ,index)">
          <div class="message time">
            <div class="message-body">{{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
          </div>
        </template>

        <!-- 消息内容 -->
        <div class="message-body" v-html="getMessageText(message)"></div>
      </template>

      <!-- 视频消息 -->
      <template v-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.视频通话">
        <!-- 消息时间 -->
        <template v-if="isShowMessageTime(message ,index)">
          <div class="message time">
            <div class="message-body">{{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
          </div>
        </template>

        <!-- 消息内容 -->
        <div class="message-body">
          <span>{{ getMessageText(message) }}</span>
          <img src="~@/assets/images/inquiry/ic_video_left@2x.png" style="width: 18px; margin-left: 10px;" />
        </div>
      </template>

      <!-- 图片消息 -->
      <template v-else-if="getMessageType(message) === 'image'">
        <!-- 消息时间 -->
        <template v-if="isShowMessageTime(message ,index)">
          <div class="message time">
            <div class="message-body">{{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
          </div>
        </template>

        <!-- 消息内容 -->
        <div v-viewer>
          <img :src="message.file.url" style="max-width: 400px; " title="查看大图" />
        </div>
      </template>

      <!-- 病历消息 -->
      <template v-else-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.病历">
        <!-- 消息时间 -->
        <template v-if="isShowMessageTime(message ,index)">
          <div class="message time">
            <div class="message-body">{{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
          </div>
        </template>

        <!-- 消息内容 -->
        <div @click="getCaseDetail(message)" class="message-body case">
          <img src="~@src/assets/images/inquiry/ic_medical record.png" />
          <div style="text-align: left;">
            <p style="font-size: 14px;">病历</p>
            <p>查看详情</p>
          </div>
        </div>
      </template>

      <!-- 处方消息 -->
      <template v-else-if="getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.处方">
        <!-- 消息时间 -->
        <template v-if="isShowMessageTime(message ,index)">
          <div class="message time">
            <div class="message-body">{{ (message.time || message.sendtime).toDate().formatWXDate() }}</div>
          </div>
        </template>

        <!-- 消息内容 -->
        <div @click="getRecipeDetail(message)" class="message-body recipe">
          <img src="~@src/assets/images/inquiry/ic_rp.png" />
          <div style="text-align: left;">
            <p style="font-size: 14px;">处方</p>
            <p>查看详情</p>
          </div>
        </div>
      </template>
    </div>

    <peace-dialog :visible.sync="caseDetail.visible" append-to-body title="病历详情">
      <InquirySessionCaseDetail :data="caseDetail.data"></InquirySessionCaseDetail>
    </peace-dialog>
    <peace-dialog :visible.sync="recipeDetail.visible" append-to-body title="处方详情">
      <InquirySessionRecipeDetail :data="recipeDetail.data"></InquirySessionRecipeDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

import InquirySessionCaseDetail from './InquirySessionCaseDetail'
import InquirySessionRecipeDetail from './InquirySessionRecipeDetail'

export default {
  components: {
    InquirySessionCaseDetail,
    InquirySessionRecipeDetail
  },

  props: {
    data: {
      type: Array,
      default() {
        return undefined
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
          color: #333333;
        }
      }
    }
  }
}
</style>

