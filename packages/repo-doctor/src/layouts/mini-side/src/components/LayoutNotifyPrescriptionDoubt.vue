// 诊室新提醒

<template>
  <div>
    <audio id="receiverMusic_PrescriptionDoubt"
           muted>
      <source v-bind:src="require('@public/static/mp3/inquiry_notify_receiver.mp3')"
              type="audio/mp3">
    </audio>
  </div>
</template>


<script>
import Service from './../service'

export default {
  inject: ['provideGetTab', 'provideAddTab'],

  data() {
    return {
      orderVoiceRemind: undefined
    }
  },

  watch: {
    // 监听【自定义】系统消息，最新一条是【质疑处方】则提醒
    '$store.state.notification.notify'(notifyObject) {
      // 验证消息并提醒
      if (this.valid(notifyObject)) {
        this.getOrderVoiceRemind().then(() => {
          this.notify(notifyObject)
        })
      }
    }
  },

  methods: {
    getOrderVoiceRemind() {
      return Service.getBaseConfig({ tag: 'orderVoiceRemind' }).then((res) => {
        this.orderVoiceRemind = res.data.switch
      })
    },

    valid(notifyObject) {
      notifyObject.content = JSON.parse(notifyObject.content)

      if (notifyObject.content.tag === 'queryPrescription') {
        return true
      }

      return false
    },

    notify(notifyObject) {
      // 生成消息
      this.generateMessage(notifyObject)

      // 播放声音
      if (this.orderVoiceRemind) {
        this.playAudio()
      }
    },

    generateMessage(notifyObject) {
      const message = {}

      message.onChangeOrderVoiceRemind = (e) => {
        // message 在不同实例空间内，不能使用 v-model 的形式控制
        document.body.querySelectorAll('.notify-menssage.notify-message-inquiry input[type=checkbox]').forEach((element) => {
          element.checked = e.target.checked
        })

        Service.setBaseConfig({ tag: 'orderVoiceRemind', switch: e.target.checked })
        this.fecth()
      }

      message.onAccept = () => {
        message.onReject()

        const currentMenu = this.provideGetTab('PrescriptionDoubt')
        currentMenu.menuRoute = '/record/prescription-doubt/' + notifyObject.content.prescriptionId

        // 跳转当前路由
        this.provideAddTab(currentMenu)
      }

      message.onReject = () => {
        message.instance.close()

        this.pauseAudio()
      }

      message.messageContainer = (
        <div>
          <div>{notifyObject.content.detail}</div>
          <div class="q-mb-md">
            <div class="flex items-center">
              <input id="11" class="q-mr-xs" type="checkbox" checked={this.orderVoiceRemind} on-change={message.onChangeOrderVoiceRemind}></input>
              <label for="11">开启声音提醒</label>
            </div>
          </div>
          <div class="text-right">
            <el-button onclick={message.onReject}>暂不处理</el-button>
            <el-button type="primary" onclick={message.onAccept}>
              立即处理
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
      var audio = this.$el.querySelector('#receiverMusic_PrescriptionDoubt')

      audio.play()
    },

    /**
     * 停止播放音频提醒
     */
    pauseAudio() {
      var audio = this.$el.querySelector('#receiverMusic_PrescriptionDoubt')

      audio.pause()
      audio.currentTime = 0
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