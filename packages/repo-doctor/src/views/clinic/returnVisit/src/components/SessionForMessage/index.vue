<template>
  <div class="fit relative-position">
    <!-- 消息组件 -->
    <!-- 消息组件位于其它组件的底部，当业务组件激活时，使用 'fixed-none' 样式使之不可见 -->
    <div class="fit flex column"
         v-bind:class="{ 'fixed-none': componentInstance }">
      <q-scroll-area class="content"
                     ref="scrollArea"
                     v-bind:thumb-style="thumbStyle">
        <PeaceIMMessageHistory class="q-pa-md"
                               v-bind:data="sessionMessagaes"
                               v-bind:messageFlowIn="session.content.patientInfo"
                               v-bind:messageFlowOut="session.content.doctorInfo">
          <template v-slot:prescription-operation="{ data, refetch }">
            <PrescriptionDetailOperation v-bind:data="data"
                                         v-on:accept="refetch"
                                         v-on:reject="refetch"></PrescriptionDetailOperation>
          </template>
        </PeaceIMMessageHistory>
      </q-scroll-area>

      <div class="footer">
        <MessageControl v-on:control="control"></MessageControl>
      </div>
    </div>

    <!-- 业务组件 ： 发病历 / 发处方 -->
    <div class="fit flex"
         v-if="componentInstance">
      <q-scroll-area class="content"
                     v-bind:thumb-style="thumbStyle">
        <Component v-bind:is="componentInstance"
                   v-bind:session="session"
                   v-bind:cacheKey="session.content.inquiryInfo.inquiryNo"
                   v-on:close="close">
        </Component>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import MessageControl from './MessageControl.vue'
import MessageCaseSend from '@src/views/components/case/send-case/src/index.vue'
import MessageInspectionSend from '@src/views/components/inspection/send-inspection/src/index.vue'
import MessagePrescriptionSend from '@src/views/components/prescription/send-prescription/src/index.vue'
import PrescriptionDetailOperation from '@src/views/components/prescription/prescription-detail-operation/src/index.vue'
import { PeaceIMMessageHistory } from 'peace-components'

export default {
  components: {
    PeaceIMMessageHistory,
    MessageControl,
    PrescriptionDetailOperation
  },

  data() {
    return {
      componentInstanceMap: {
        ['发病历']: MessageCaseSend,
        ['发处方']: MessagePrescriptionSend,
        ['开检验']: MessageInspectionSend
      },

      componentType: 'MessageList'
    }
  },

  computed: {
    componentInstance() {
      return this.componentInstanceMap[this.componentType]
    },

    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        background: '#bdbdbd',
        width: '5px',
        opacity: 0.75
      }
    },

    session() {
      return this.$store.state.inquiry?.session
    },

    sessionMessagaes() {
      return this.$store.state.inquiry?.sessionMessages
    }
  },

  watch: {
    session(oldSession, newSession) {
      if (oldSession.id !== newSession.id) {
        this.close()
      }
    },

    sessionMessagaes() {
      // 监听消息，当存在消息更新，滚动至最底部
      this.$nextTick().then(() => {
        this.scrollToBottom()
      })
    }
  },

  methods: {
    scrollToBottom() {
      const positionY = this.$refs.scrollArea.$el.children?.[0]?.children?.[0]?.clientHeight

      this.$refs.scrollArea.setScrollPosition(positionY, 100)
    },

    // 子组件通过 componentInstanceMap 控制组件显示与隐藏
    // 会话 / 写病历 / 写处方 等等
    control(type) {
      this.componentType = type
    },

    close() {
      this.control('MessageList')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
}

.footer {
  height: 232px;
}

.fixed-none {
  position: fixed;
  left: -99999px;
  visibility: hidden;
}
</style>
