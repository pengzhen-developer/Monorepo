<template>
  <div>
    <!-- 距开始 -->
    <template v-if="!data && teamStatus === TEAM_STATUS.距开始">
      <div class="consultation-content">
        <div class="consultation-status">
          <div class="clock">
            <img src="~@/assets/images/icons/clinic/ic_daojishi_green@2x.png">
          </div>

          <div class="count-down">
            <span>距会诊开始时间还剩</span>
            <span class="count-down-time">
              <template v-if="$peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).dd !== 0">
                <span style="margin: 0 0 0 5px;">{{ duration[chat.team.id] && duration[chat.team.id].dd }} 天</span>
              </template>

              <template v-if="$peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).HH !== 0">
                <span style="margin: 0 0 0 5px;">{{ duration[chat.team.id] && duration[chat.team.id].HH }} 时</span>
              </template>

              <template
                v-if="$peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).dd === 0 && 
                      $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).HH === 0 && 
                      $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).mm !== 0"
              >
                <span style="margin: 0 0 0 5px;">{{ duration[chat.team.id] && duration[chat.team.id].mm }} 分</span>
              </template>

              <template
                v-if="$peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).dd === 0 && 
                      $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).HH === 0 && 
                      $peace.util.getDuration(new Date(), new Date(chat.team.custom.consultation.expectTime)).mm === 0"
              >
                <span style="margin: 0 0 0 5px;">{{ duration[chat.team.id] && duration[chat.team.id].ss }} 秒</span>
              </template>
            </span>
          </div>
          <div class="count-down-message">
            <span>请在</span>
            <span class="count-down-time" style="margin: 0 5px;">
              <span>{{ chat.team.custom.consultation.expectTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}</span>
              <span>-</span>
              <span>{{ chat.team.custom.consultation.expectOverTime.toDate().formatDate('HH:mm') }}</span>
            </span>
            <span>发起视频会诊，超期系统将自动关闭会诊单</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 距关闭 -->
    <template v-if="!data && teamStatus === TEAM_STATUS.距结束">
      <div class="consultation-content">
        <div class="consultation-status danger">
          <div class="clock">
            <img src="~@/assets/images/icons/clinic/ic_daojishi_red@2x.png">
          </div>

          <div class="count-down">
            <span>距会诊关闭时间还剩</span>
            <span class="count-down-time" style="margin: 0 5px;">
              <template v-if=" durationEnd[chat.team.id] && durationEnd[chat.team.id].mm !== 0">
                <span style="color: #FF0000;">{{ durationEnd[chat.team.id] && durationEnd[chat.team.id].mm }} 分</span>
              </template>

              <template v-if="durationEnd[chat.team.id] && durationEnd[chat.team.id].mm === 0">
                <span style="color: #FF0000;">{{ durationEnd[chat.team.id] && durationEnd[chat.team.id].ss }} 秒</span>
              </template>
            </span>
          </div>
          <div class="count-down-message">请尽快发起视频会诊，超期系统将自动关闭会诊单</div>
        </div>
      </div>
    </template>

    <!-- 会诊中 -->
    <template v-if="!data && teamStatus === TEAM_STATUS.会诊中"></template>

    <el-alert
      :closable="false"
      class="chat-team-waring"
      show-icon
      style="position: absolute; z-index: 1"
      title
      type="warning"
      v-if="chat.team && chat.team.custom && chat.team.custom.consultation && chat.team.custom.consultation.channel"
    >
      <div slot="title" style="color: rgba(102,102,102,1); font-size: 12px; background: rgba(255,170,0,1) rgba(255,255,255,0.9); ">
        <span>你有一个视频会议正在进行中，</span>

        <el-button
          @click="$peace.consultationComponent.joinVideoRoom(chat.team.custom.consultation.channel, chat.team.custom.consultation.consultNo)"
          type="text"
        >点击进入</el-button>
      </div>
    </el-alert>

    <template v-if="data || teamMsgs">
      <ul :class="{ showVideo: chat.team && chat.team.custom && chat.team.custom.consultation && chat.team.custom.consultation.channel }">
        <li :key="msg.time" v-for="(msg, index) in data || teamMsgs">
          <!-- 消息时间 -->
          <div class="msg-body system system-time" v-if="needShowMsgTime(index)">
            <span>{{ showMsgTime(msg) }}</span>
          </div>

          <!-- 消息发送者 -->
          <!-- <div :style="{ 'text-align': getMsgFlow(msg) === 'out' ? 'right' : 'left' }" style="margin: 0 10px 0 5px;">{{ msg.fromNick }}</div> -->

          <!-- 文本消息 -->
          <div :class="getMsgFlow(msg)" class="msg-body">
            <template v-if="msg.custom.type === 'video'">
              <div class="msg-detail">
                <i class="icon_ic_video_right" style="margin: 0 10px 0 0;" v-show="msg.flow === 'in'"></i>
                <span>{{ msg.custom.text }}</span>
                <i class="icon_ic_video_left" style="margin: 0 0 0 10px;" v-show="msg.flow === 'out'"></i>
              </div>
            </template>

            <template v-else>
              <span class="msg-detail" v-html="msg.custom && msg.custom.text || msg.text"></span>
            </template>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const TEAM_STATUS = {
  距开始: '距开始',
  距结束: '距结束',
  会诊中: '会诊中'
}

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
      TEAM_STATUS,

      durationInterval: [],
      durationEnd: {},
      duration: {}
    }
  },

  computed: {
    ...mapState(['chat', 'user']),

    teamMsgs() {
      if (this.chat.teamMsgs) {
        const temp = $peace.util.clone(this.chat.teamMsgs.msgs)
        return temp.reverse().filter(item => item.custom && item.type !== 'custom')
      }

      return undefined
    },

    // 获取当前群组（会诊）状态
    teamStatus() {
      if (!this.data && this.chat.team && this.chat.team.custom) {
        const consultStatus = this.chat.team.custom.consultation.consultStatus
        const expectTime = this.chat.team.custom.consultation.expectTime
        const expectOverTime = this.chat.team.custom.consultation.expectOverTime

        if (consultStatus === 5) {
          if (new Date() < new Date(expectTime)) {
            return TEAM_STATUS.距开始
          }

          if (new Date() > new Date(expectTime) && new Date() < new Date(expectOverTime)) {
            return TEAM_STATUS.距结束
          }
        }

        if (consultStatus === 6) {
          return TEAM_STATUS.会诊中
        }
      }

      return ''
    }
  },

  watch: {
    'chat.team': {
      handler(newValue) {
        // 移除所有定时器
        this.durationInterval.forEach(interval => window.clearInterval(interval))
        this.durationInterval = []
        this.duration = {}
        this.durationEnd = {}

        if (newValue) {
          const interval = setInterval(() => {
            if (new Date() < new Date(this.chat.team.custom.consultation.expectTime)) {
              const duration = $peace.util.getDuration(new Date(), new Date(this.chat.team.custom.consultation.expectTime))
              this.$set(this.duration, this.chat.team.id, duration)
            } else {
              this.$set(this.duration, this.chat.team.id, undefined)
            }

            if (new Date() < new Date(this.chat.team.custom.consultation.expectOverTime)) {
              const durationEnd = $peace.util.getDuration(new Date(), new Date(this.chat.team.custom.consultation.expectOverTime))
              this.$set(this.durationEnd, this.chat.team.id, durationEnd)
            } else {
              this.$set(this.durationEnd, this.chat.team.id, undefined)
            }
          }, 1000)

          this.durationInterval.push(interval)
        }
      },
      immediate: true
    }
  },

  destroyed() {
    // clear all interval
    this.durationInterval.forEach(interval => window.clearInterval(interval))
  },

  methods: {
    // 是否需要显示系统时间
    needShowMsgTime(index) {
      if (index === 0) {
        return true
      } else {
        const prevMsg = (this.data && this.data[index - 1]) || this.chat.teamMsgs.msgs[index - 1]
        const currentMsg = (this.data && this.data[index]) || this.chat.teamMsgs.msgs[index]

        if (currentMsg.time - prevMsg.time >= 1000 * 60 * 2) {
          return true
        }

        return false
      }
    },

    showMsgTime(msg) {
      const time = msg.time || msg.sendtime

      return time.toDate().formatDate('MM月dd日 HH:mm:ss')
    },

    getMsgFlow(msg) {
      // 显示为系统消息
      if (msg.type === 'custom') {
        if (msg.custom && msg.custom.type === 'video') {
          return 'system'
        }
      }

      if (msg.type === 'text') {
        return msg.flow
      }

      return msg.flow
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-content {
  padding: 40px 20px;
}

.consultation-status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0fcfa;

  width: 100%;
  height: 160px;
  background: rgba(240, 252, 250, 1);
  border-radius: 6px;

  &.danger {
    background: #fff0f0;

    .count-down {
      .count-down-time {
        color: #ff0000;
      }
    }
  }

  .clock img {
    width: 35px;
    height: 35px;
    margin: 0 0 20px 0;
  }

  .count-down {
    text-align: center;

    font-size: 16px;
    font-weight: 400;
    color: #333;
    margin: 0 0 5px 0;
  }

  .count-down-time {
    font-size: 18px;
    color: #00c6ae;
  }

  .count-down-message {
    color: #333;
    font-size: 14px;
    font-weight: 400;

    display: flex;
    align-items: center;
  }
}

ul {
  &.showVideo {
    position: relative;
    left: 0;
    right: 0;
    top: 60px;
    height: calc(100% - 60px);
    z-index: 0;
  }
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.msg-body {
  display: flex;
  align-items: center;

  margin: 5px 0;

  &.image {
    img {
      cursor: zoom-in;
      max-width: 400px;
    }

    .msg-detail {
      border: 1px solid #f3f3f3;
      padding: 0 !important;
      margin: 0 !important;
    }
  }

  &.system {
    justify-content: center;

    .msg-detail {
      padding: 4px 10px;
      margin: 6px 0;
      color: rgba(155, 155, 155, 1);
      background: rgba(242, 242, 242, 1);
      border-radius: 4px;
    }
  }

  &.system-time {
    color: #9b9b9b;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  &.in {
    margin-left: 5px;
    justify-content: flex-start;

    .msg-detail {
      background: rgba(243, 243, 243, 1);
      color: rgba(51, 51, 51, 1);
      border-radius: 4px;
      padding: 6px 10px 6px 10px;
      margin: 6px 0;
      display: inline-block;
      max-width: 400px;
      word-break: break-all;
      white-space: normal;
    }
  }

  &.out {
    margin-right: 10px;
    justify-content: flex-end;

    .msg-detail {
      background: #00c6ae;
      color: #ffffff;
      border-radius: 4px;
      padding: 6px 10px 6px 10px;
      margin: 6px 0;
      display: inline-block;
      max-width: 400px;
      word-break: break-all;
      white-space: normal;

      &.medical,
      &.prescription {
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

      &.video {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          margin: 0 0 0 10px;
          width: 16px;
        }
      }
    }
  }
}
</style>
