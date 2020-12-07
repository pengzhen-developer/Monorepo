<template>
  <div class="jzt-chat-container">
    <template v-for="(message,index) in displayList">
      <chat-images v-if="message.type === MESSAGE_TYPE.IMAGES"
                   :key="message.id"
                   :id="message.id"
                   :position="message.position"
                   :images="message.images"
                   :ifShowUpdateBtn="canShowUpdateBtn(index,message,displayList)"
                   @after-enter="onAfterEnter"
                   @click-update-btn="onClickUpdateBtn" />
      <chat-text v-if="message.type === MESSAGE_TYPE.TEXT"
                 :key="message.id"
                 :id="message.id"
                 :position="message.position"
                 :context="message.context"
                 :ifShowUpdateBtn="canShowUpdateBtn(index,message,displayList)"
                 @after-enter="onAfterEnter"
                 @click-update-btn="onClickUpdateBtn" />
    </template>
  </div>
</template>

<script>
import { diffByKey } from './utils'
import { MESSAGE_TYPE } from './enum'
import ChatText from './chat-text'
import ChatImages from './chat-images'
import { validatorType } from './validator'

const validatorList = [validatorType]

export default {
  name: 'JztChat',

  components: {
    ChatText,
    ChatImages
  },

  props: {
    list: {
      validator: function(list) {
        if (!Array.isArray(list)) return false
        for (let i = 0; i < list.length; i++) {
          const one = list[i]

          const failureOne = validatorList.find((valid) => {
            return !valid(one)
          })
          // 失败退出
          if (failureOne !== undefined) return false
        }
        // 成功通过所有验证
        return true
      }
    }
  },

  data() {
    return {
      MESSAGE_TYPE,

      displayList: [],
      waitQueue: [],
      suspend: false,
      timer: null
    }
  },

  watch: {
    list: {
      handler(val) {
        if (val) {
          this.tryRefresh()
        }
      },
      immediate: true
    }
  },
  methods: {
    canShowUpdateBtn(index, item, list) {
      if (item.position == 'left') {
        return false
      }
      return index == list.length - 1 ? true : false
    },
    onClickUpdateBtn(id) {
      this.$emit('click-update-btn', id)
    },

    onAfterEnter() {
      this.next()
    },

    mutationSuspend(bool) {
      this.suspend = bool
    },

    animationRemove(chatNode) {
      const { id } = chatNode
      const chatMessage = this.$children.find((chatMessage) => {
        return chatMessage.id === id
      })

      chatMessage.remove(() => {
        const index = this.displayList.findIndex((v) => {
          return v.id === id
        })
        this.displayList.splice(index, 1)
        this.next()
      })
    },

    next() {
      this.mutationSuspend(false)
      this.$emit('after-refresh')
      this.action()
    },

    diff() {
      const { added, removed } = diffByKey(this.list, this.displayList)
      return { added, removed }
    },

    tryRefresh() {
      if (this.timer !== null) return false
      const result = this.refresh()
      if (result === false) {
        this.timer = setTimeout(() => {
          this.tryRefresh()
          this.timer = null
        }, 500)
      }
    },

    refresh() {
      if (this.waitQueue.length > 0) return false
      const { added, removed } = this.diff()

      removed.forEach((el) => {
        el.action = 'remove'
        this.waitQueue.push(el)
      })
      added.forEach((el) => {
        el.action = 'add'
        this.waitQueue.push(el)
      })

      this.action()
    },

    action() {
      // 如果目前有其他的next 在执行, 不允许执行
      if (this.suspend) return
      const chatNode = this.waitQueue.shift()

      if (chatNode === undefined) return
      // 同一时间只允许一个next 执行
      this.mutationSuspend(true)
      if (chatNode.action === 'add') {
        this.displayList.push(chatNode)
      } else {
        this.animationRemove(chatNode)
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.jzt-chat-container {
  width: 100%;

  .chat-item-wrapper {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    &--left {
      align-items: flex-start;
    }

    &--right {
      align-items: flex-end;
    }
  }
}

// animation
$jzt--animation-duration-base: 0.3s;

@keyframes jzt-slide-left-enter {
  from {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes jzt-slide-left-leave {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes jzt-slide-right-enter {
  from {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes jzt-slide-right-leave {
  to {
    transform: translate3d(100%, 0, 0);
  }
}

.jzt-slide-left {
  &-enter-active {
    animation: jzt-slide-left-enter $jzt--animation-duration-base both ease-in-out;
  }

  &-leave-active {
    animation: jzt-slide-left-leave $jzt--animation-duration-base both ease-in-out;
  }
}

.jzt-slide-right {
  &-enter-active {
    animation: jzt-slide-right-enter $jzt--animation-duration-base both ease-in-out;
  }

  &-leave-active {
    animation: jzt-slide-right-leave $jzt--animation-duration-base both ease-in-out;
  }
}
</style>
