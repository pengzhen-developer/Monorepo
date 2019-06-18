<template>
  <div>
    <div class="header">
      <img src="~@/assets/images/icons/clinic/inquirylist_icon.png">
      <span>问诊列表</span>
    </div>

    <template v-if="sessions && sessions.length > 0">
      <div class="body">
        <el-scrollbar class="scrollbar">
          <div
            :class="{ active: chat.session && chat.session.id === session.id }"
            :key="session.id"
            @click="selectSession(session)"
            class="content"
            v-for="session in sessions"
          >
            <div class="content-title">
              <div class="content-title-left">
                <el-badge :hidden="session.unread === 0" :value="session.unread" style="margin: 0 10px 0 0;">
                  <span class="item blod">{{ session.lastMsg.custom.patients.familyName }}</span>
                </el-badge>
                <span class="item">{{ session.lastMsg.custom.patients.gender }}</span>
                <span class="item">{{ session.lastMsg.custom.patients.age }} 岁</span>
              </div>

              <div class="content-title-right">
                <el-button :type="session.lastMsg.custom.ext.talkState === 1 ? 'warning' : 'success'" plain round>
                  <span>{{ session.lastMsg.custom.ext.talkState === 1 ? '待接诊' : '问诊中' }}</span>
                </el-button>
              </div>
            </div>

            <div class="content-msg">
              <div class="content-msg-detail" v-html="getLastMsg(session)"></div>
            </div>

            <div class="content-status">
              <div class="content-status-left">
                <template v-if="session.lastMsg.custom.ext.talkType == STATE.talkType['图文问诊']">
                  <img src="~@/assets/images/icons/clinic/chat_icon_pic.png">
                </template>
                <template v-if="session.lastMsg.custom.ext.talkType == STATE.talkType['视频问诊']">
                  <img src="~@/assets/images/icons/clinic/chat_icon_video.png">
                </template>

                <span>{{ getTalkType(session.lastMsg.custom.ext.talkType) }}</span>
              </div>
              <span v-if="session.lastMsg.custom.ext.talkState === 1 ">{{ new Date(session.updateTime).formatDate('MM-dd HH:mm') }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </template>

    <template v-else>
      <div class="body-no-data">
        <img src="~@/assets/images/icons/clinic/ic_no one.png">
        <span>暂无问诊</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { STATE } from './util'

export default {
  data() {
    return {
      STATE
    }
  },

  computed: {
    ...mapState(['chat']),

    sessions() {
      let sessions

      if (this.chat.sessions) {
        sessions = this.chat.sessions.filter(session => {
          const ext = session.lastMsg.custom.ext

          return ext.talkState === 1 || ext.talkState === 2 || ext.talkState === 3
        })
      }

      return sessions
    }
  },

  methods: {
    ...mapActions('chat', ['selectSession']),

    getLastMsg(session) {
      const msgType = session.lastMsg.type

      switch (msgType) {
        // 文本消息
        case 'text':
          return session.lastMsg.text

        // 图片消息
        case 'image':
          return '[ 图片 ]'

        // 视频消息
        case 'video':
          return '[ 视频 ]'

        // 自定义消息
        case 'custom':
          return session.lastMsg.content.data.appMsg || `[ ${session.lastMsg.content.data.title} ]`
      }
    },

    getTalkType(talkType) {
      return Object.keys(STATE.talkType).find(key => STATE.talkType[key] === talkType)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #f2f2f2;
  background: rgba(255, 255, 255, 1);

  img {
    margin: 0 10px 0 0;
  }
}

.body {
  height: calc(100% - 50px);

  .scrollbar {
    height: 100%;
    overflow: hidden;
  }

  .content {
    cursor: pointer;

    border-bottom: 1px solid #efefef;
    padding: 10px;

    &.active {
      background: rgba(244, 244, 244, 1);
    }

    &-title {
      display: flex;
      justify-content: space-between;

      margin: 0 0 5px 0;

      &-left {
        .item {
          font-size: 12px;
          margin: 0 10px 0 0;

          &.blod {
            font-weight: bold;
            font-size: 14px;
            margin-right: 10px;
          }

          & :first-child {
            font-size: 14px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
        }
      }

      &-right {
        .el-button {
          min-width: auto;
          margin: 0;
          padding: 4px 8px;
          font-size: 12px;

          &.el-button--warning {
            border-color: #4395f5;
            color: #4395f5;
            background: #e3f0ff;
          }
          &.el-button--success {
            border-color: #00c6ae;
            color: #00c6ae;
            background: #dafaf6;
          }
        }
      }
    }

    &-msg {
      margin: 0 0 16px 0;

      &-detail {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        height: 22px;

        /deep/ * {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
      }
    }

    &-status {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(153, 153, 153, 1);

      &-left {
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          margin: 0 10px 0 0;
        }
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
</style>
