<template>
  <div class="message-list">
    <div @click="hideTools" class="inquiry-session-message-list">
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
                getMessageType(message) === $peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊"
        >
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">{{ (message.time || message.sendtime).toDate().formatDate('MM月dd日 HH:mm') }}</div>
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
              <div class="message-body">{{ (message.time || message.sendtime).toDate().formatDate('MM月dd日 HH:mm') }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div class="message-body">
            <span>{{ getMessageText(message) }}</span>
            <!-- <img src="~@/assets/images/inquiry/ic_video_left@2x.png" style="width: 18px; margin-left: 10px;" /> -->
          </div>
        </template>

        <!-- 图片消息 -->
        <template v-else-if="getMessageType(message) === 'image'">
          <!-- 消息时间 -->
          <template v-if="isShowMessageTime(message ,index)">
            <div class="message time">
              <div class="message-body">{{ (message.time || message.sendtime).toDate().formatDate('MM月dd日 HH:mm') }}</div>
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
              <div class="message-body">{{ (message.time || message.sendtime).toDate().formatDate('MM月dd日 HH:mm') }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getCaseDetail(message)" class="message-body case">
            <!-- <img src="~@src/assets/images/inquiry/ic_medical record.png" /> -->
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
              <div class="message-body">{{ (message.time || message.sendtime).toDate().formatDate('MM月dd日 HH:mm') }}</div>
            </div>
          </template>

          <!-- 消息内容 -->
          <div @click="getRecipeDetail(message)" class="message-body recipe">
            <!-- <img src="~@src/assets/images/inquiry/ic_rp.png" /> -->
            <div style="text-align: left;">
              <p style="font-size: 14px;">处方</p>
              <p>查看详情</p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="inquiry-session-message-input">
      <van-field :autosize="{ maxHeight: 60, minHeight: 20 }" @focus="hideTools" placeholder="请输入" rows="1" type="textarea" v-model="message">
        <van-icon @click="showTools" name="add-o" slot="right-icon" />
        <van-button @click="sendMessageText" size="small" slot="button" type="primary">发送</van-button>
      </van-field>

      <div class="inquiry-session-message-input-tools" v-show="tools.visible">
        <van-row justify="space-between" type="flex">
          <van-col class="flex-center" span="6">
            <van-uploader>
              <div class="flex-center">
                <van-button icon="photo"></van-button>
                <p>图片</p>
              </div>
            </van-uploader>
          </van-col>
          <van-col class="flex-center" span="6">
            <van-button icon="phone-o" />
            <p>拍照</p>
          </van-col>
          <van-col class="flex-center" span="6">
            <van-button icon="star-o" />
            <p>hhh</p>
          </van-col>
          <van-col class="flex-center" span="6">
            <van-button icon="star-o" />
            <p>hhh</p>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
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
      message: '',

      tools: {
        visible: false
      },

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

  methods: {
    onClickLeft() {
      this.$router.go(-1)
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
            message.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.取消问诊
          ) {
            return 'system'
          }
        }
      }

      return message.flow
    },

    getMessageText(message) {
      if (message.content && message.content.data && message.content.data.showTextInfo) {
        return message.content.data.showTextInfo.patientClientText
      }

      if (message.text) {
        return message.text
      }
    },

    sendMessageText() {
      if (this.message) {
        const doneHandler = (error, message) => {
          console.warn('【 IM 】【 sendText 】', new Date(), message)

          this.message = ''

          if (error) {
            throw new Error(error)
          }
        }

        $peace.NIM.sendText({
          scene: this.$store.state.inquiry.session.scene,
          to: this.$store.getters['inquiry/doctorInfo'].doctorId,
          text: this.message,
          done: doneHandler
        })
      }
    },

    showTools() {
      this.tools.visible = true
    },
    hideTools() {
      this.tools.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.message-list {
  height: 100%;
  display: flex;
  flex-direction: column;

  .inquiry-session-message-list {
    overflow: auto;
    padding: 5px 10px;
    flex: 1;

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
        margin: 6px auto;

        .message-body {
          color: rgba(155, 155, 155, 1);
          background: rgba(242, 242, 242, 1);
        }
      }

      &.time {
        font-size: 12px;
        text-align: center;
        margin: 0 0 5px 0;

        .message-body {
          color: rgba(155, 155, 155, 1);
          background: rgb(255, 255, 255);
        }
      }

      .message-body {
        white-space: pre-wrap;
        word-wrap: break-word;
        display: inline-block;
        padding: 5px 5px;
        border-radius: 6px;

        &.case,
        &.recipe {
          background: #fff;
          border: 1px solid #f2f2f2;
          padding: 5px;
          cursor: pointer;
          display: inline-flex;

          p {
            margin: 0 0 2px 5px;
            color: #333333;
          }
        }
      }
    }
  }

  .inquiry-session-message-input {
    min-height: 50px;
    position: relative;
    bottom: 0;
    left: 0;
    z-index: 1;

    .inquiry-session-message-input-tools {
      padding: 20px;

      .flex-center {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          margin: 5px 0 0 0;
        }
      }
    }
  }
}
</style>

