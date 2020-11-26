<template>
  <SessionListContainer active="returnVisit">
    <div class="flex column content">
      <template v-if="storeSessions.length">
        <q-scroll-area class="col"
                       v-bind:thumb-style="thumbStyle">

          <div v-for="session in storeSessions"
               v-bind:key="session.id"
               class="col">
            <SessionListItem v-on:click.native="selectSession(session)"
                             v-bind:active="session.id === storeSession.id"
                             v-bind:session="session"></SessionListItem>
          </div>

          <!-- 预约列表 -->
          <slot name="reservation"></slot>

        </q-scroll-area>
      </template>

      <template v-else>
        <div class="col flex column justify-center items-center">
          <img class="q-mb-md"
               src="~@src/assets/images/inquiry/ic_no one.png">
          <span class="text-grey-5">暂无会话</span>

          <!-- 预约列表 -->
          <slot name="reservation"></slot>
        </div>

      </template>

    </div>
  </SessionListContainer>
</template>

<script>
import Util from '@src/util'

import SessionListContainer from '@src/views/clinic/components/SessionListContainer'
import SessionListItem from './SessionListItem'

export default {
  components: {
    SessionListContainer,
    SessionListItem
  },

  data() {
    return {
      activeSession: {}
    }
  },

  computed: {
    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        background: '#bdbdbd',
        width: '5px',
        opacity: 0.75
      }
    },

    storeSessions() {
      const sessions = this.$store.state.inquiry?.sessions ?? []
      const filterSessions = sessions.filter((session) => session?.content?.inquiryInfo?.inquiryType === 'returnVisit')
      const cloneSessions = Peace.util.deepClone(filterSessions)
      return cloneSessions
    },

    storeSession() {
      return this.$store.state.inquiry?.session ?? {}
    }
  },

  methods: {
    // 选中一条会话
    selectSession(session) {
      // 重置当前会话未读数
      Peace.NIM.resetSessionUnread(session.id)

      Util.IM.inquiryHelper.resetInquirySession()
      Util.IM.inquiryHelper.setInquirySession(session)

      this.getHistoryMsgs(session)
    },

    // 获取当前选中会话的历史消息
    getHistoryMsgs(session) {
      Peace.NIM.getHistoryMsgs({
        beginTime: session.content?.inquiryInfo?.startTime?.toDate()?.getTime(),
        scene: session.scene,
        to: session.to,
        done: (error, message) => {
          console.warn('【 IM 】【 getHistoryMsgs 】', new Date(), message)

          if (error) {
            throw new Error(error)
          }

          Util.IM.inquiryHelper.resetInquirySessionMessages()
          Util.IM.inquiryHelper.setInquirySessionMessages(message.msgs)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #efefef;
}

.content {
  flex: 1;
}
</style>