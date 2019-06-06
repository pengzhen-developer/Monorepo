/*
 * @Author: PengZhen 
 * @Date: 2019-05/27
 * @Description: 我的诊室 - 我的会诊
 */

<template>
  <div class="consultation">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :title="video.title"
      :visible.sync="video.visible"
      center
      custom-class="video-class"
      v-drag
      width="520px"
    >
      <!-- 视频 -->
      <div :id="'remoteContaier' + item.account" :key="item.account" class="videoContaier" v-for="item in video.remoteList">
        <i class="el-icon-more-outline" style="position: absolute; font-size: 20px; text-align: center;">
          <p style="font-size: 14px;">{{ item.doctorName }}</p>
          <p style="font-size: 14px;">等待加入中</p>
        </i>
      </div>

      <template slot="footer">
        <el-button @click="leaveVideo" circle class="hang_up">
          <span class="video-bottom-text">挂断</span>
        </el-button>
      </template>
    </el-dialog>

    <!-- getters 调用，用于触发监听 -->
    <div v-show="false">{{ $peace.$store.getters['chat/teamNotifyForWatch'].length }}</div>

    <!-- 房间列表 -->
    <ChatTeams class="left" v-if="chat.teams"></ChatTeams>

    <!-- 房间明细 -->
    <ChatTeam class="center" v-if="chat.team"></ChatTeam>

    <!-- 会诊详情 -->
    <ChatConsultation class="right" v-if="chat.team"></ChatConsultation>
  </div>
</template>

<script>
import WebRTC from '/public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.3.0'

import ChatTeams from './ChatTeams'
import ChatTeam from './ChatTeam'
import ChatConsultation from './ChatConsultation'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ChatTeams,
    ChatTeam,
    ChatConsultation
  },

  provide: {
    consultStatus: [
      { consultStatus: 1, consultTxt: '发起待审核' },
      { consultStatus: 2, consultTxt: '发起已拒绝' },
      { consultStatus: 3, consultTxt: '邀请待审核' },
      { consultStatus: 4, consultTxt: '邀请已拒绝' },
      { consultStatus: 5, consultTxt: '等待会诊' },
      { consultStatus: 6, consultTxt: '会诊中' },
      { consultStatus: 7, consultTxt: '会诊已完成' },
      { consultStatus: 8, consultTxt: '会诊已关闭' }
    ]
  },

  data() {
    return {
      channelNotifyList: [],
      durationInterval: [],

      video: {
        visible: false,
        remoteList: [],
        remoteCurrentList: [],
        title: ''
      }
    }
  },

  computed: {
    ...mapState(['chat', 'user'])
  },

  created() {
    $peace.consultationComponent = this

    // 初始化 IM，会诊专用
    this.initNIM(true)

    // IM 初始化完成后，监听回调函数
    const interval = setInterval(() => {
      if ($peace.WebRTC) {
        // 在回调里监听对方加入通话，并显示对方的视频画面
        $peace.WebRTC.on('remoteTrack', this.remoteTrack)
        $peace.WebRTC.on('leaveChannel', this.leaveChannel)

        window.clearInterval(interval)
      }
    }, 100)
  },

  watch: {
    'chat.teams': {
      handler() {
        if (this.chat.teams) {
          this.chat.teams.forEach(item => {
            // 当前会诊存在视频
            if (item.custom && item.custom.consultation && item.custom.consultation.channel) {
              // 将参与视频的所有人保存起来
              const receiveDoctor = item.custom.consultation.receiveDoctor
              const startDoctor = item.custom.consultation.startDoctor
              const cooperationDoctors = item.custom.consultation.cooperationDoctors

              this.video.remoteList = receiveDoctor.concat(startDoctor).concat(cooperationDoctors)

              this.video.remoteList.forEach(item => {
                item.account = item.doctorId
              })

              // 提示视频消息
              if (
                !this.channelNotifyList.includes(item.custom.consultation.channel) &&
                item.custom.consultation.channelFromId !== this.user.userInfo.list.docInfo.doctor_id
              ) {
                const message = (
                  <div>
                    <el-button
                      type="success"
                      onclick={() => {
                        this.joinVideoRoom(item.custom.consultation.channel, item.custom.consultation.consultNo, false)
                        channel.close()
                      }}
                    >
                      接受
                    </el-button>
                    <el-button type="danger" onclick={() => channel.close()}>
                      拒绝
                    </el-button>
                  </div>
                )

                const channel = $peace.$notify.success({
                  title: '你收到一个新的视频邀请',
                  message: message,
                  position: 'top-right',
                  duration: 0,
                  showClose: false
                })

                setTimeout(() => {
                  channel.close()
                }, 30000)

                this.channelNotifyList.push(item.custom.consultation.channel)
              }
            }
          })
        }
      },
      immediate: true
    },

    'chat.teamMsgs': {
      handler() {
        if (this.chat.teamMsgs) {
          this.$nextTick(function() {
            const scrollElement = document.body.querySelector('.chat-team-list-scrollbar .el-scrollbar__wrap')
            if (scrollElement) {
              scrollElement.scrollTop = scrollElement.scrollHeight
            }
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('chat', ['clearTeam', 'initNIM']),

    createVideoRoom(channel) {
      return $peace.WebRTC.createChannel({
        //必填, 房间名
        channelName: channel,
        //可选
        custom: channel,
        // 是否支持WebRTC方式接入，可选，默认为不开启
        webrtcEnable: true
      })
        .then(obj => {
          console.log(obj)
        })
        .catch(obj => {
          console.log(obj)
        })
    },

    joinVideoRoom(channelName, consultNo, isCreateRoom = true) {
      const joinChannel = () => {
        const sessionConfig = {
          videoQuality: WebRTC.CHAT_VIDEO_QUALITY_HIGH,
          videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_15,
          videoEncodeMode: WebRTC.CHAT_VIDEO_ENCODEMODE_NORMAL,
          videoBitrate: 0,
          recordVideo: false,
          recordAudio: false,
          highAudio: false,
          bypassRtmp: false,
          rtmpUrl: '',
          rtmpRecord: false,
          splitMode: WebRTC.LAYOUT_SPLITLATTICETILE
        }

        $peace.WebRTC.joinChannel({
          type: WebRTC.NETCALL_TYPE_VIDEO,
          sessionConfig: sessionConfig,
          channelName: channelName
        })
          .then(obj => {
            this.video.visible = true

            // 加入房间成功后的上层逻辑操作
            // eg: 开启摄像头
            // eg: 开启麦克风
            // eg: 开启本地流
            // eg: 设置音量采集、播放
            // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式

            console.log('加入成功', obj)

            $peace.WebRTC.startRtc()
              .then(() => {
                // 开启麦克风
                return $peace.WebRTC.startDevice({
                  type: WebRTC.DEVICE_TYPE_AUDIO_IN
                }).catch(err => {
                  console.log('启动麦克风失败')
                  console.error(err)
                })
              })
              .then(() => {
                // 设置采集音量
                $peace.WebRTC.setCaptureVolume(255)
                // 开启摄像头
                return $peace.WebRTC.startDevice({
                  type: WebRTC.DEVICE_TYPE_VIDEO,
                  width: 640,
                  height: 480
                }).catch(err => {
                  console.log('启动摄像头失败')
                  console.error(err)
                })
              })
              .then(() => {
                //预览本地画面
                $peace.WebRTC.startLocalStream(document.getElementById('remoteContaier' + this.user.userInfo.list.docInfo.doctor_id))
                // 设置本地预览画面大小
                $peace.WebRTC.setVideoViewSize({
                  width: 250,
                  height: 250,
                  cut: true
                })
              })
              .then(() => {
                // 设置为互动者角色，可以发送自己的音频和视频给房间中的其他人
                $peace.WebRTC.changeRoleToPlayer()
              })
              .catch(err => {
                console.log('发生错误')
                console.log(err)
                $peace.WebRTC.hangup()
              })
          })
          .catch(res => {
            this.video.visible = false

            console.error(res)

            $peace.util.warning(res.desc)
          })
      }

      // 开始视频
      if (isCreateRoom) {
        const params = {
          consultNo: consultNo,
          action: 'start',
          channel: channelName
        }
        this.$http
          .post('client/v1/video/processConsult', params)
          .then(() => {
            joinChannel()
          })
          .catch(res => {
            $peace.util.warning(res.data.msg)
          })
      } else {
        const params = {
          consultNo: consultNo,
          action: 'join',
          channel: channelName
        }
        this.$http.post('client/v1/video/processConsult', params)

        joinChannel()
      }
    },

    remoteTrack(obj) {
      console.log('other user join', obj)

      if (this.video.remoteCurrentList.findIndex(item => item.account === obj.account) === -1) {
        this.video.remoteCurrentList.push(obj)
      }

      this.$nextTick(function() {
        // 播放对方声音
        $peace.WebRTC.startDevice({
          type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
        }).catch(err => {
          console.log('播放对方的声音失败')
          console.error(err)
        })
        // 预览对方视频画面
        $peace.WebRTC.startRemoteStream({
          account: obj.account,
          node: document.getElementById('remoteContaier' + obj.account)
        })
        // 设置对方预览画面大小
        $peace.WebRTC.setVideoViewRemoteSize({
          account: obj.account,
          width: 250,
          height: 250,
          cut: true
        })
      })
    },

    leaveChannel(obj) {
      console.log('other user leave', obj)

      const index = this.video.remoteCurrentList.findIndex(item => item.account === obj.account)

      if (index !== -1) {
        this.video.remoteCurrentList.splice(index, 1)

        console.log(this.video.remoteCurrentList)
      }
    },

    leaveVideo() {
      $peace.WebRTC.leaveChannel().then(obj => {
        console.log('user leave', obj)
        console.log(this.video.remoteCurrentList)

        if (this.video.remoteCurrentList.length === 0) {
          const consultNo = this.chat.teams.find(item => item.custom && item.custom.consultation && item.custom.consultation.channel).custom.consultation
            .consultNo

          // 结束视频
          const params = {
            consultNo: consultNo,
            action: 'over'
          }

          this.$http.post('client/v1/video/processConsult', params).then(() => {
            this.durationInterval.forEach(interval => window.clearInterval(interval))
            this.durationInterval = []
          })
        }

        this.video.visible = false
      })
    }
  },

  // 销毁 IM
  destroyed() {
    this.clearTeam()

    this.durationInterval.forEach(interval => window.clearInterval(interval))
    this.durationInterval = []
  }
}
</script>

<style lang="scss" scoped>
.consultation {
  margin: 0 !important;
  padding: 0 !important;

  display: flex;

  .left,
  .right {
    width: 230px;

    border: 1px solid #efefef;
  }

  .center {
    flex: 1;

    border: 1px solid #efefef;
    border-left: none;
    border-right: none;
  }
}

/deep/ .video-class {
  .el-dialog__header {
    background: linear-gradient(#1a1b1d, #2b2d2f);
  }

  .el-dialog__body,
  .el-dialog__footer {
    background: #2b2d2f;
  }

  .el-dialog__body {
    display: flex;
    justify-content: space-between;
  }

  .videoContaier {
    width: 250px;
    height: 250px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    background: #000;
  }

  .el-button {
    width: 30px;
    height: 30px;
    background-size: 30px auto;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    border: 0;
    display: inline-flex;
    justify-content: center;

    &.hang_up {
      background-image: url('~@/assets/images/icons/clinic/btn_hang_up@2x.png');
    }
    &.answer {
      background-image: url('~@/assets/images/icons/clinic/btn_answer@2x.png');
    }
    &.mute {
      background-image: url('~@/assets/images/icons/clinic/btn_mute_click@2x.png');
    }
    &.mute-not {
      background-image: url('~@/assets/images/icons/clinic/btn_mute_not clickable@2x.png');
    }

    & + .el-button {
      margin-left: 95px;
    }

    .el-button {
      /deep/ i {
        font-size: 28px;
      }
    }

    .video-bottom-text {
      line-height: 1;
      font-size: 12px;
      position: relative;
      top: 25px;
      color: #efefef;
    }
  }
}
</style>

