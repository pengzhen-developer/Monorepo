<template>
  <div class="inquiry-sessions">
    <div class="header">
      <img src="~@src/assets/images/inquiry/inquirylist_icon.png">
      <span>问诊列表</span>
    </div>

    <div class="body"
         v-if="storeSessions.length > 0">
      <el-scrollbar class="body-scrollbar">
        <div :class="{ active: $store.state.inquiry.session && $store.state.inquiry.session.id === session.id }"
             :key="session.id"
             @click="selectSession(session)"
             class="inquiry"
             v-for="session in storeSessions">
          <div class="inquiry-patient">
            <div class="inquiry-patient-left">
              <template v-if="session.unread">
                <el-badge is-dot
                          :hidden="session.unread === 0"
                          :value="session.unread"
                          style="margin: 0 10px 0 0;">
                  <span>{{ session.content.patientInfo.familyName }}</span>
                </el-badge>
              </template>
              <template v-else>
                <span>{{ session.content.patientInfo.familyName }}</span>
              </template>
              <span>{{ session.content.patientInfo.familySex }}</span>
              <span>{{ session.content.patientInfo.familyAge }}</span>
            </div>

            <div class="inquiry-patient-right">
              <el-tag effect="plain"
                      style="border-radius: 20px; border-color: #4395f5; color: #4395f5; background: #e3f0f0;"
                      type="warning"
                      v-if="session.content.inquiryInfo.inquiryStatus === Peace.type.INQUIRY.INQUIRY_STATUS.待接诊">{{ getInquiryStatus(session) }}</el-tag>
              <el-tag effect="plain"
                      style="border-radius: 20px; border-color: #3099a6; color: #3099a6; background: #dafaf6;"
                      type="primary"
                      v-if="session.content.inquiryInfo.inquiryStatus  === Peace.type.INQUIRY.INQUIRY_STATUS.问诊中">{{ getInquiryStatus(session) }}</el-tag>
            </div>
          </div>

          <div class="inquiry-last-message">
            <span v-html="getLastMessage(session)"></span>
          </div>

          <div class="inquiry-status">
            <div class="inquiry-status-left">
              <img src="~@src/assets/images/inquiry/chat_icon_pic.png"
                   v-if="session.content.inquiryInfo.inquiryType === Peace.type.INQUIRY.INQUIRY_TYPE.图文问诊">
              <img src="~@src/assets/images/inquiry/chat_icon_video.png"
                   v-if="session.content.inquiryInfo.inquiryType === Peace.type.INQUIRY.INQUIRY_TYPE.视频问诊">
              <span>{{ getInquiryType(session) }}</span>
              <span class="private-doctor"
                    v-if="session.content.inquiryInfo.isPrivateDoctor">私</span>
            </div>
            <div>{{ Peace.inquiryComponent.getIntervalValue(session) }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="body-no-data"
         v-else>
      <img src="~@src/assets/images/inquiry/ic_no one.png">
      <span class="text-grey-5">暂无问诊</span>
    </div>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  computed: {
    storeSessions() {
      const sessions = this.$store.state.inquiry?.sessions ?? []
      const filterSessions = sessions.filter(
        (session) => session?.content?.inquiryInfo?.inquiryType === 'image' || session?.content?.inquiryInfo?.inquiryType === 'video'
      )
      const cloneSessions = Peace.util.deepClone(filterSessions)

      return cloneSessions
    }
  },

  methods: {
    getLastMessage(session) {
      const messageType = session.lastMsg.type

      switch (messageType) {
        case 'text':
          return session.lastMsg.text
        case 'image':
          return '【图片】'
        case 'video':
          return '【视频】'
        case 'custom':
          // 病历
          if (session.lastMsg.content.code === Peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.病历) {
            return '【病历】'
          }
          // 处方
          else if (session.lastMsg.content.code === Peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.处方) {
            return '【处方】'
          }
          // 视频通话
          else if (session.lastMsg.content.code === Peace.type.INQUIRY.INQUIRY_MESSAGE_TYPE.视频通话) {
            return '【视频通话】'
          }
          // 其它
          else if (session.lastMsg.content && session.lastMsg.content.data && session.lastMsg.content.data.showTextInfo) {
            return session.lastMsg.content.data.showTextInfo.doctorClientText
          }
      }
    },

    getInquiryStatus(session) {
      return Object.keys(Peace.type.INQUIRY.INQUIRY_STATUS).find((key) => Peace.type.INQUIRY.INQUIRY_STATUS[key] === session.content.inquiryInfo.inquiryStatus)
    },

    getInquiryType(session) {
      const text = Object.keys(Peace.type.INQUIRY.INQUIRY_TYPE).find((key) => Peace.type.INQUIRY.INQUIRY_TYPE[key] === session.content.inquiryInfo.inquiryType)

      const isAgain = session.content.inquiryInfo.isAgain

      if (text === '图文问诊') {
        return isAgain ? '图文复诊' : '图文咨询'
      } else if (text === '视频问诊') {
        return isAgain ? '视频复诊' : '视频咨询'
      }
    },

    selectSession(session) {
      const doneHandler = (error, message) => {
        console.warn('【 IM 】【 getHistoryMsgs 】', new Date(), message)

        if (error) {
          throw new Error(error)
        }

        Util.IM.inquiryHelper.resetInquirySession()
        Util.IM.inquiryHelper.resetInquirySessionMessages()

        Util.IM.inquiryHelper.setInquirySession(session)
        Util.IM.inquiryHelper.setInquirySessionMessages(message.msgs)
      }

      Peace.inquiryComponent.$emit(Peace.type.INQUIRY.INQUIRY_ACTION.重置操作)

      // 重置会话未读数
      Peace.NIM.resetSessionUnread(session.id)
      // 获取本次问诊历史消息
      Peace.NIM.getHistoryMsgs({
        beginTime: session.content.inquiryInfo.startTime.toDate().getTime(),
        scene: session.scene,
        to: session.to,
        done: doneHandler
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 50px;

.inquiry-sessions {
  height: 100%;

  .header {
    height: $--header-height;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;

    img {
      margin: 0 10px 0 0;
    }
  }

  .body {
    height: calc(100% - #{$--header-height});

    .body-scrollbar {
      height: 100%;
    }

    .inquiry {
      padding: 10px;
      border-bottom: 1px solid #efefef;
      cursor: pointer;

      &.active {
        background: rgba(244, 244, 244, 1);
      }

      .inquiry-patient {
        display: flex;
        justify-content: space-between;
        margin: 5px 0 5px 0;

        .inquiry-patient-left {
          display: flex;
          align-items: center;

          span {
            font-size: 12px;
            margin-left: 15px;

            &:first-child {
              font-size: 14px;
              margin-left: 0;
              font-weight: bold;
            }
          }
        }
      }

      .inquiry-last-message {
        margin: 0 0 15px 0;

        /deep/ * {
          font-size: 12px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
      }

      .inquiry-status {
        display: flex;
        justify-content: space-between;
        margin: 0;

        font-size: 12px;
        color: #999;

        .inquiry-status-left {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            margin: 0 10px 0 0;
          }
        }

        .private-doctor {
          height: 16px;
          background: rgba(218, 250, 246, 1);
          border-radius: 2px;
          padding: 0 4px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 198, 174, 1);
          line-height: 17px;

          margin: 0 0 0 10px;
        }
      }
    }
  }

  .body-no-data {
    height: calc(100% - 50px);

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    span {
      margin: 20px 0 0 0;
      color: rgba(155, 155, 155, 1);
    }
  }
}
</style>

