<template>
  <div class="message">
    <template v-if="loaded">
      <template v-if="serviceRemind.list.length > 0">
        <div @click="goServiceRemind"
             class="message-item">
          <div class="message-item-avatar">
            <img src="@src/assets/images/message/ic_service_message.png" />
            <div class="message-item-unread"
                 v-if="serviceRemind.unreadNum !== 0">
              <div class="van-info van-info-message">{{ serviceRemind.unreadNum }}</div>
            </div>
          </div>
          <div class="message-item-detail">
            <div class="message-item-detail-title">
              <div class="message-item-detail-title-doctor">
                <span>服务提醒{{ serviceRemind.list[0].doctorName }}</span>
              </div>
              <div class="message-item-detail-title-time">
                <span>{{ serviceRemind.list[0].time.toDate().calcTimeHeader() }}</span>
              </div>
            </div>
            <div class="message-item-detail-content">
              <span v-html="serviceRemind.list[0].title"></span>
            </div>
          </div>
        </div>
      </template>
      <template v-if="sessionsList.length > 0">
        <div :id="session.id +'-'+ session.updateTime"
             :key="session.id +'-'+ session.updateTime"
             @click="selectSession(session)"
             class="message-item"
             v-for="session in sessionsList">
          <div class="message-item-avatar">
            <img :src="session.content.doctorInfo.doctorAvatar" />
            <div class="message-item-unread"
                 v-if="session.unread !== 0">
              <div class="van-info van-info-message">{{ session.unread }}</div>
            </div>
          </div>
          <div class="message-item-detail">
            <div class="message-item-detail-title">
              <div class="message-item-detail-title-doctor">
                <span>{{ session.content.doctorInfo.doctorName }}</span>
                <span style="margin: 0 5px;">|</span>
                <span>{{ session.content.doctorInfo.doctorTitle }}</span>
              </div>
              <div class="message-item-detail-title-time">
                <span>{{ session.updateTime.toDate().calcTimeHeader() }}</span>
              </div>
            </div>
            <div class="message-item-detail-content">
              <span v-html="getLastMessage(session)"></span>
            </div>
          </div>
        </div>
      </template>

      <template v-if="sessionsList.length == 0 && serviceRemind.list.length === 0">
        <div class="no-data"
             style="display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100%;">
          <img src="@src/assets/images/ic_no consultation copy@2x.png"
               style="width: 160px; height: 100px;" />
          <p style="font-size: 15px; color: #999999;">暂无消息</p>
        </div>
      </template>
    </template>
    <template v-else>
      <van-row type="flex"
               align="center"
               justify="center"
               style="height:100%">
        <van-loading />
      </van-row>
    </template>

  </div>
</template>

<script>
import peace from '@src/library'

export default {
  activated() {
    if (this.$route.params.sessionId) {
      const interval = setInterval(() => {
        if (this.$el.querySelector(`#${this.$route.params.sessionId}`)) {
          window.clearInterval(interval)

          this.$el.querySelector(`#${this.$route.params.sessionId}`).click()
        }
      }, 100)
    }
    // 更新服务提醒
    this.$store.dispatch('inquiry/getServiceRemind')
  },

  computed: {
    loaded() {
      return this.$store.state.inquiry.hasSetInfo
    },
    sessionsList() {
      return this.$store.getters['inquiry/sessionList']
    },
    serviceRemind() {
      return this.$store.state.inquiry.serviceRemind
    }
  },
  methods: {
    getLastMessage(session) {
      const messageType = session.lastMsg.type

      switch (messageType) {
        case 'text':
          return session.lastMsg.text
        case 'image':
          return '[图片]'
        case 'video':
          return '[视频]'
        case 'audio':
          return '[语音]'
        case 'custom':
          // 病历
          if (session.lastMsg.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.病历) {
            return '[病历]'
          }
          // 处方
          else if (session.lastMsg.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.处方) {
            return '[处方]'
          }
          // 视频通话
          else if (session.lastMsg.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.视频通话) {
            return '[视频通话]'
          }
          // 私人医生服务提醒
          else if (session.lastMsg.content.code === peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.私人医生服务提醒) {
            return '[自定义消息]'
          }
          // 其它
          else if (session.lastMsg.content && session.lastMsg.content.data && session.lastMsg.content.data.showTextInfo) {
            return session.lastMsg.content.data.showTextInfo.patientClientText
          }
      }
    },

    selectSession(session) {
      let params = null
      let account = session.content.patientInfo.familyId
      if (
        session.content.inquiryInfo.inquiryStatus == peace.type.INQUIRY.INQUIRY_STATUS.已退诊 ||
        session.content.inquiryInfo.inquiryStatus == peace.type.INQUIRY.INQUIRY_STATUS.已完成 ||
        session.content.inquiryInfo.inquiryStatus == peace.type.INQUIRY.INQUIRY_STATUS.已取消
      ) {
        // 当前问诊【已完成】【已退诊】【已取消】
        // 获取数据库记录，无法在 service/IM.js 重置未读数，因此手动重置为 0

        $peace.NIMS[account].im.resetSessionUnread(session.id)

        params = peace.util.encode({
          inquiryNo: session.content.inquiryInfo.inquiryNo,
          familyId: account
        })
      } else {
        params = peace.util.encode({
          id: 'p2p-' + session.content.doctorInfo.doctorId,
          scene: 'p2p',
          beginTime: session.content.inquiryInfo.startTime.toDate().getTime(),
          to: session.content.doctorInfo.doctorId,
          familyId: account
        })
      }
      // 清除聊天记录
      peace.service.IM.resetInquirySessionMessages()

      // 跳转聊天详情
      this.$router.push(`/components/messageList/${params}`)
    },
    goServiceRemind() {
      this.$router.push(`/message/service-remind/list`)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  height: 100%;

  .message-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #efefef;

    &.active {
      background: rgba(244, 244, 244, 1);
    }

    .message-item-avatar {
      width: 50px;
      height: 50px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(241, 248, 255, 1);
        border: 1px solid rgba(221, 225, 234, 1);
      }

      .message-item-unread {
        position: absolute;

        .van-info-message {
          position: relative;
          top: -50px;
          right: -30px;
        }
      }
    }

    .message-item-detail {
      width: calc(100% - 50px);
      height: 50px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .message-item-detail-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .message-item-detail-title-doctor {
          font-size: 16px;
          font-weight: 400;
        }

        .message-item-detail-title-time {
          font-size: 12px;
          color: #999999;
        }
      }

      .message-item-detail-content {
        font-size: 14px;
        color: #999999;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        /deep/.blue {
          color: #999999;
        }
      }
    }
  }
}
</style>
