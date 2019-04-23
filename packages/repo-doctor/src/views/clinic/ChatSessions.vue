<template>
  <div>
    <div class="header">
      <img src="./../../assets/images/icons/clinic/inquirylist_icon.png">
      <span>问诊列表</span>
    </div>

    <div class="content" v-if="internalSessions && internalSessions.length > 0">
      <el-scrollbar class="scrollbar">
        <div
          :class="{ active: $parent.session && $parent.session.id === session.id }"
          :key="session.id"
          @click="updateCurrentSession(session)"
          class="content-session-item"
          v-for="session in internalSessions"
        >
          <div class="content-title">
            <div class="content-title-left">
              <span class="item blod">{{ session.lastMsg.custom.patients.familyName }}</span>
              <span class="item">{{ session.lastMsg.custom.patients.gender }}</span>
              <span class="item">{{ session.lastMsg.custom.patients.age }} 岁</span>
            </div>

            <div class="content-title-right">
              <el-button :type="session.lastMsg.custom.ext.talkState === 1 ? 'warning' : 'success'" plain>
                <span>{{ session.lastMsg.custom.ext.talkState === 1 ? '待接诊' : '问诊中' }}</span>
              </el-button>
            </div>
          </div>

          <div class="content-msg">
            <div class="content-msg-detail" v-html="getLastMsg(session)"></div>
          </div>

          <div class="content-status">
            <div class="content-status-left">
              <img src="./../../assets/images/icons/clinic/chat_icon_pic.png" v-if="session.lastMsg.custom.ext.talkType == state.talkType['图文问诊']">
              <img src="./../../assets/images/icons/clinic/chat_icon_video.png" v-if="session.lastMsg.custom.ext.talkType == state.talkType['视频问诊']">
              {{ getTalkType(session.lastMsg.custom.ext.talkType) }}
            </div>
            <span v-if="session.lastMsg.custom.ext.talkState === 1 ">{{ $peace.util.timeAgo(session.updateTime) }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="no-data" v-else>
      <img src="./../../assets/images/icons/clinic/ic_no one.png">
      <span>暂无患者</span>
    </div>
  </div>
</template>

<script>
import { isArray } from 'util'

import { state, deserializationSessions } from './util.js'

export default {
  props: {
    sessions: {
      type: Array,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      state
    }
  },

  computed: {
    internalSessions() {
      if (this.sessions && isArray(this.sessions)) {
        return deserializationSessions(this.sessions).filter(
          item => item.lastMsg.custom.ext.talkState === 1 || item.lastMsg.custom.ext.talkState === 2 || item.lastMsg.custom.ext.talkState === 3
        )
      }
      return this.sessions
    }
  },

  methods: {
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
      return Object.keys(state.talkType).find(key => state.talkType[key] === talkType)
    },
    getTalkState(talkState) {
      return Object.keys(state.talkState).find(key => state.talkState[key] === talkState)
    },

    // 更新当前会话
    // 更新当前会话历史消息
    updateCurrentSession(session) {
      // 更新会话
      this.$parent.session = { ...session }

      // 更新状态
      this.$parent.$refs.ChatSession.resetState()

      // 更新历史消息
      // this.$nextTick(function() {
      //   this.$parent.$refs.ChatSession.getMsgHistory()
      // })
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

.content {
  height: calc(100% - 50px);

  .scrollbar {
    height: 100%;
    overflow: hidden;
  }

  .content-session-item {
    border-bottom: 1px solid #efefef;
    cursor: pointer;
    padding: 10px;

    &.active {
      background: rgba(244, 244, 244, 1);
    }

    .content-title {
      display: flex;
      justify-content: space-between;

      margin: 0 0 5px 0;

      .content-title-left {
        .item {
          &.blod {
            font-weight: bold;
            font-size: 14px;
          }

          font-size: 12px;
          margin: 0 10px 0 0;

          & :first-child {
            font-size: 14px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
        }
      }

      .content-title-right {
        .el-button {
          &.el-button--warning {
            border-color: #4395f5;
            color: #4395f5 !important;
            background: #e3f0ff !important;
          }
          &.el-button--success {
            border-color: #00c6ae;
            color: #00c6ae !important;
            background: #dafaf6 !important;
          }

          padding: 4px 8px;
          margin: 0;
          min-width: auto;
          border-radius: 10px;
          font-size: 12px;
        }
      }
    }

    .content-msg {
      margin: 0 0 16px 0;

      .content-msg-detail {
        width: 180px;
        height: 20px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;

        /deep/ * {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
      }
    }

    .content-status {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(153, 153, 153, 1);

      .content-status-left {
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

.no-data {
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
