// 处方提醒
<template>
  <div>
    <audio id="receiver-music-prescription"
           muted>
      <source v-bind:src="require('@public/static/mp3/notify_receiver.mp3')"
              type="audio/mp3">
    </audio>
  </div>
</template>


<script>
import Service from './../service'

import Observable_Layout from './../observable'

export default {
  data() {
    return {
      orderVoiceRemind: undefined,
      userId: '',
      menuList: []
    }
  },

  watch: {
    // 监听消息
    '$store.state.notification.notify'(notifyObject) {
      // 验证消息并提醒
      if (this.valid(notifyObject)) {
        this.getOrderVoiceRemind().then(() => {
          this.notify(notifyObject)
        })
      }
    }
  },

  mounted() {
    this.$nextTick().then(async () => {
      const userInfo = await Peace.identity.auth.getAccountInfo()
      this.userId = userInfo.id
      const accountMenu = await Peace.identity.auth.getAccountMenu()
      this.menuList = Peace.util.deepClone(accountMenu)
    })
  },

  methods: {
    getOrderVoiceRemind() {
      return Service.getVoiceRemind({ userId: this.userId }).then((res) => {
        this.orderVoiceRemind = Number(res.data)
      })
    },

    valid(notifyObject) {
      // Prescription 0 已预审 1 待审核 2 质疑中 3 未通过 4 已作废 5已通过
      if (notifyObject.code === 'prescription_status' && (notifyObject?.data.Prescription === 1 || notifyObject?.data.Prescription === 2)) {
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
      let message = {}

      message.onChangeOrderVoiceRemind = (e) => {
        // message 在不同实例空间内，不能使用 v-model 的形式控制
        document.body.querySelectorAll('.notify-menssage.notify-message-inquiry input[type=checkbox]').forEach((element) => {
          element.checked = e.target.checked
        })

        Service.setVoiceRemind({ userId: this.userId, voice: e.target.checked ? 1 : 0 })
      }

      message.onAccept = () => {
        message.onReject()

        const menu = this.menuList.find((item) => item.menuRoute === '/prescription/check')

        Observable_Layout.mutations.addTab(menu)
        Observable_Layout.mutations.setTab(menu)

        Service.lockPrescription({ JZTClaimNo: notifyObject.data.JZTClaimNo }).then((res) => {
          if (res.code === 200) {
            Peace.$router.push({
              path: '/prescription/check',
              query: {
                JZTClaimNo: notifyObject.data.JZTClaimNo,
                t: new Date().getTime() // 参数增加时间戳，防止路由重复push报错
              }
            })
          } else {
            Peace.util.error(res.msg)
          }
        })
      }

      message.onReject = () => {
        message.instance.close()
        this.pauseAudio()
      }

      message.messageContainer = (
        <div class="text-grey-333">
          <div class="q-my-md">{notifyObject.msg}</div>
          <div class="q-mb-md">
            <div class="flex items-center">
              <input id="11" class="q-mr-xs" type="checkbox" checked={this.orderVoiceRemind} on-change={message.onChangeOrderVoiceRemind}></input>
              <label for="11">开启声音提醒</label>
            </div>
          </div>
          <div class="text-right">
            <el-button onclick={message.onReject}>暂不处理</el-button>
            <el-button type="primary" onclick={message.onAccept}>
              立即审核
            </el-button>
          </div>
        </div>
      )

      message.instance = this.$notify({
        title: notifyObject.data.Prescription === 1 ? '新订单提醒' : '质疑处方提醒',
        message: message.messageContainer,
        position: 'bottom-right',
        customClass: 'notify-menssage notify-message-inquiry',
        duration: 15000
      })

      return message
    },

    /**
     * 播放发起者音频提醒
     */
    playAudio() {
      var audio = this.$el.querySelector('#receiver-music-prescription')
      audio.muted = false
      audio.play()
    },

    /**
     * 停止播放音频提醒
     */
    pauseAudio() {
      var audio = this.$el.querySelector('#receiver-music-prescription')
      audio.pause()
      audio.currentTime = 0
    }
  }
}
</script>

<style lang="scss">
.notify-menssage {
  .el-notification__title {
    font-size: 18px;
    color: #333333;
    height: 24px;
    line-height: 24px;
  }
}
</style>