// 诊室新提醒

<template>
  <div>
    <audio id="receiverMusic"
           muted>
      <source v-bind:src="require('@public/static/mp3/inquiry_notify_receiver.mp3')"
              type="audio/mp3">
    </audio>
  </div>
</template>


<script>
import Util from '@src/util'
import Service from './../service'

const notifyInquiryCacheKey = 'NOTIFY_INQUIRY'

export default {
  data() {
    return {
      orderVoiceRemind: undefined,

      notifiedInquiryList: []
    }
  },

  watch: {
    // 监听 notifiedInquiryList ，同步到缓存
    notifiedInquiryList(value) {
      Peace.cache.sessionStorage.set(notifyInquiryCacheKey, value)
    },

    // 监听问诊，存在新问诊则提醒
    '$store.state.inquiry.sessions'(value) {
      value.forEach((session) => {
        // 验证会话并提醒
        this.valid(session) && this.notify(session)
      })
    }
  },

  created() {
    this.fecth()
  },

  methods: {
    async fecth() {
      this.notifiedInquiryList = Peace.cache.sessionStorage.get(notifyInquiryCacheKey) ?? []

      await Service.getBaseConfig({ tag: 'orderVoiceRemind' }).then((res) => {
        this.orderVoiceRemind = res.data.switch
      })
    },

    valid(session) {
      const inquiryStatus = session.content.inquiryInfo.inquiryStatus
      const inquiryNo = session.content.inquiryInfo.inquiryNo

      return inquiryStatus === Peace.type.INQUIRY.INQUIRY_STATUS.待接诊 && !this.notifiedInquiryList.includes(inquiryNo)
    },

    async notify(session) {
      await this.fecth()

      // 已提醒在本次 session 中，不再提醒
      const inquiryNo = session.content.inquiryInfo.inquiryNo
      this.notifiedInquiryList.push(inquiryNo)

      // 生成消息
      this.generateMessage(session)

      // 播放声音
      if (this.orderVoiceRemind) {
        this.playAudio()
      }
    },

    generateMessage(session) {
      const inquiryNo = session.content.inquiryInfo.inquiryNo
      const inquiryType = session.content.inquiryInfo.inquiryType
      const familyName = session.content.patientInfo.familyName

      const message = {}

      message.onChangeOrderVoiceRemind = (e) => {
        // message 在不同实例空间内，不能使用 v-model 的形式控制
        document.body.querySelectorAll('.notify-menssage.notify-message-inquiry input[type=checkbox]').forEach((element) => {
          element.checked = e.target.checked
        })

        Service.setBaseConfig({ tag: 'orderVoiceRemind', switch: e.target.checked })
        this.fecth()
      }

      message.onReceive = () => {
        message.onClose()

        // 在线咨询
        if (inquiryType === Peace.type.INQUIRY.INQUIRY_TYPE.图文 || inquiryType === Peace.type.INQUIRY.INQUIRY_TYPE.视频) {
          if (this.validSession(session)) {
            this.$router
              .push('/clinic/inquiry')
              .then(() => {
                this.selectSession(session)
              })
              .catch((e) => {
                if (e?.name === 'NavigationDuplicated') {
                  this.selectSession(session)
                }
              })
          }
        }
        // 复诊续方
        else if (inquiryType === Peace.type.INQUIRY.INQUIRY_TYPE.复诊) {
          if (this.validSession(session)) {
            this.$router
              .push('/clinic/returnVisit')
              .then(() => {
                this.selectSession(session)
              })
              .catch((e) => {
                if (e?.name === 'NavigationDuplicated') {
                  this.selectSession(session)
                }
              })
          }
        }
      }

      message.onClose = () => {
        message.instance.close()

        this.pauseAudio()
      }

      message.messageContainer = (
        <div>
          <div>有新的患者【{familyName}】进入您的诊室，是否接诊？</div>
          <div class="q-mb-md">
            <div class="flex items-center">
              <input id={inquiryNo} class="q-mr-xs" type="checkbox" checked={this.orderVoiceRemind} on-input={message.onChangeOrderVoiceRemind}></input>
              <label for={inquiryNo}>开启声音提醒</label>
            </div>
          </div>
          <div class="text-right">
            <el-button onclick={message.onClose}>暂不处理</el-button>
            <el-button type="primary" onclick={message.onReceive}>
              立即接诊
            </el-button>
          </div>
        </div>
      )

      message.instance = this.$notify({
        title: '提示',
        message: message.messageContainer,
        position: 'bottom-right',
        customClass: 'notify-menssage notify-message-inquiry',
        duration: 5000
      })

      return message
    },

    /**
     * 播放发起者音频提醒
     */
    playAudio() {
      var audio = this.$el.querySelector('#receiverMusic')

      audio.play()
    },

    /**
     * 停止播放音频提醒
     */
    pauseAudio() {
      var audio = this.$el.querySelector('#receiverMusic')

      audio.pause()
      audio.currentTime = 0
    },

    validSession(session) {
      const sessions = this.$store.state.inquiry.sessions

      if (sessions.some((item) => item.id === session.id)) {
        return true
      } else {
        const familyName = session.content.patientInfo.familyName
        Peace.util.warning(`该患者【${familyName}】已经取消问诊，不用处理`)

        return false
      }
    },

    // 在线咨询与复诊续方选中会话的方法是一致的
    // copy from src\views\clinic\inquiry\src\components\SessionList.vue
    // copy from src\views\clinic\returnVisit\src\components\SessionList.vue
    selectSession(session) {
      Peace.NIM.resetSessionUnread(session.id)

      Util.IM.inquiryHelper.resetInquirySession()
      Util.IM.inquiryHelper.setInquirySession(session)

      this.getHistoryMsgs(session)
    },

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

<style lang="scss">
.notify-menssage {
  bottom: 20px !important;

  .el-notification__title {
    height: 32px;
    line-height: 32px;
  }
}
</style>