<template>
  <div>
    <div v-for="(message, index) in internalData"
         v-bind:key="message.msgid">
      <PeaceIMMessageAdapter class="q-mb-md"
                             v-on="$listeners"
                             v-bind="$attrs"
                             v-bind:data="message"
                             v-bind:messageFlowIn="messageFlowIn"
                             v-bind:messageFlowOut="messageFlowOut"
                             v-bind:shouldVisibleTime="shouldVisibleTime(message, index)">
        <template v-slot:prescription-operation="{ data, refetch, close }">
          <slot name="prescription-operation"
                v-bind:data="data"
                v-bind:refetch="refetch"
                v-bind:close="close">
          </slot>
        </template>
      </PeaceIMMessageAdapter>
    </div>
  </div>
</template>

<script>
import PeaceIMMessageAdapter from './components/IMMessageAdapter.vue'

export default {
  name: 'PeaceIMMessageHistory',

  components: {
    PeaceIMMessageAdapter
  },

  props: {
    data: Array,

    messageFlowIn: Object,
    messageFlowOut: Object,
    messagaSystem: Array
  },

  computed: {
    /**
     * 网易云信实时消息（from websocket）与历史消息（form db）格式不一致，需要格式化关键字段
     * 为尽可能保证实时消息及时性，减少运行时开销，因此选择格式化历史消息为实时消息格式
     *
     * @description: 消息格式化
     * @param {*}
     * @return {*}
     */
    internalData() {
      if (Array.isArray(this.data)) {
        this.data.forEach((message) => {
          /* eslint-disable vue/no-side-effects-in-computed-properties */
          const MESSAGE_TYPE = { 0: 'text', 1: 'image', 2: 'audio', 100: 'custom' }
          const MESSAGE_TYPE_SYSTEM = this.messagaSystem ?? ['710', '740', '742', '750', '760']

          if (message.sendtime) {
            message.type = MESSAGE_TYPE[message.type]
            message.time = message.sendtime
            message.text = message.body.msg
            message.content = message.body
            message.file = message.body
          }

          if (message.type === 'custom' && message.content.code && MESSAGE_TYPE_SYSTEM.includes(message.content.code)) {
            message.flow = 'system'
          } else if (message.from === this.messageFlowOut?.doctorId) {
            message.flow = 'out'
          } else {
            message.flow = 'in'
          }
        })
      }

      return this.data
    }
  },

  methods: {
    /**
     * @description: 是否应该显示消息时间
     * @param {*} message
     * @param {*} index
     * @return {*}
     */
    shouldVisibleTime(message, index) {
      if (index === 0) {
        return true
      }

      const MAX_INTERVAL_TIME = 1000 * 60 * 3
      const prevMessage = this.data[index - 1]
      const currentMessage = this.data[index]

      if (currentMessage.time - prevMessage.time >= MAX_INTERVAL_TIME || currentMessage.sendtime - prevMessage.sendtime >= MAX_INTERVAL_TIME) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>