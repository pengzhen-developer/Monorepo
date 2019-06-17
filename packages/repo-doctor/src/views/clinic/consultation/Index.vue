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
      <div :id="'remoteContaier' + item.account" :key="item.account" class="videoContaier" v-for="item in video.remoteUserList">
        <div style="position: absolute; text-align: center;">
          <p style="font-size: 14px;">{{ item.doctorName }}</p>
          <p style="font-size: 14px;">等待加入中</p>
          <i class="el-icon-loading" style="font-size: 20px; text-align: center;"></i>
        </div>
      </div>

      <template slot="footer">
        <el-button @click="leaveChannel" circle class="hang_up">
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
import WebRTC from '/public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.5.0'

import ChatTeams from './ChatTeams'
import ChatTeam from './ChatTeam'
import ChatConsultation from './ChatConsultation'

import { mapState, mapActions } from 'vuex'

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
      video: {
        visible: false,
        title: '',

        remoteUserList: [],
        remoteUserJoinedList: [],
        channelNotifyList: [],

        consultation: undefined
      }
    }
  },

  watch: {
    'chat.teams': {
      handler() {
        this.video.consultation = undefined

        if (this.chat.teams) {
          this.closeNotify()

          this.chat.teams.forEach(team => {
            // 当前会诊存在视频
            if (team.custom && team.custom.consultation && team.custom.consultation.channel) {
              this.video.consultation = team.custom.consultation

              // 将参与视频的所有人保存起来, 生成 html, 用于挂载视频流
              const remoteUserList = team.custom.consultation.startDoctor
                .concat(team.custom.consultation.receiveDoctor)
                .concat(team.custom.consultation.cooperationDoctors)

              remoteUserList.forEach(item => {
                item.account = item.doctorId
              })

              this.video.remoteUserList = remoteUserList

              // 提示当前用户是否存在视频邀请
              // 仅提醒一次
              if (!this.video.channelNotifyList.includes(team.custom.consultation.channel)) {
                this.video.channelNotifyList.push(team.custom.consultation.channel)

                if (team.custom.consultation.channelFromId !== this.user.userInfo.list.docInfo.doctor_id) {
                  this.showNotify(team)
                }
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
            setTimeout(() => {
              const scrollElement = document.body.querySelector('.chat-team-list-scrollbar .el-scrollbar__wrap')
              if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight
              }
            }, 100)
          })
        }
      },
      immediate: true
    },

    'video.visible': {
      handler() {
        this.video.title = '正在进行视频会议'
        let interval = undefined

        if (this.video.visible) {
          setInterval(() => {
            if (this.video.consultation && this.video.consultation.channelTime) {
              this.video.title = $peace.util.formatDuration(
                new Date(this.video.consultation.channelTime),
                new Date(new Date().getTime() + $peace.serverDateDiff)
              )
            }
          }, 1000)
        } else {
          window.clearInterval(interval)
        }
      },
      immediate: true
    }
  },

  computed: {
    ...mapState(['chat', 'user'])
  },

  created() {
    let loadingFullPage = undefined
    $peace.consultationComponent = this

    this.initNIM()
    this.initWebRTCForPersons()

    // IM 初始化完成后
    // 监听对方加入通话
    // 监听对方离开通话
    const interval = setInterval(() => {
      if ($peace.WebRTC) {
        loadingFullPage && loadingFullPage.close()

        $peace.WebRTC.on('remoteTrack', this.onRemoteTrack)
        $peace.WebRTC.on('leaveChannel', this.onLeaveChannel)

        window.clearInterval(interval)
      } else {
        loadingFullPage = $peace.$loading({
          lock: true,
          text: '正在初始化通讯功能，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.05)'
        })
      }
    }, 10)
  },

  methods: {
    ...mapActions('chat', ['clearTeam', 'initNIM', 'initWebRTCForPersons']),

    closeNotify() {
      $peace.consultationComponent && $peace.consultationComponent.channelMessage && $peace.consultationComponent.channelMessage.close()
    },

    showNotify(team) {
      const joinChannel = () => {
        this.joinChannel(team.custom.consultation.channel, team.custom.consultation.consultNo)
        this.closeNotify()
      }

      const refuseChannel = () => {
        const consultNo = this.chat.teams.find(item => item.custom && item.custom.consultation).custom.consultation.consultNo

        const params = {
          consultNo: consultNo,
          action: 'refuse'
        }

        // 发送拒绝请求
        this.$http.post('client/v1/video/processConsult', params)

        // 关闭弹框提示
        this.closeNotify()
      }

      const messageBody = (
        <div>
          <el-button type="success" onclick={() => joinChannel()}>
            接受
          </el-button>
          <el-button type="danger" onclick={() => refuseChannel()}>
            拒绝
          </el-button>
        </div>
      )

      $peace.consultationComponent.channelMessage = $peace.$notify.success({
        title: '你收到一个新的视频邀请',
        message: messageBody,
        position: 'bottom-right',
        duration: 0,
        showClose: false
      })
    },

    // 用户主动加入频道
    joinChannel(channelName, consultNo) {
      const joinChannelHandler = () => {
        return $peace.WebRTC.joinChannel({
          type: WebRTC.NETCALL_TYPE_VIDEO,
          sessionConfig: sessionConfig,
          channelName: channelName
        })
          .then(obj => {
            if (this.video.remoteUserJoinedList.findIndex(item => item.account === obj.account) === -1) {
              this.video.remoteUserJoinedList.push(obj)
            }
          })
          .then(() => {
            return $peace.WebRTC.startRtc()
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
                  width: 250,
                  height: 250
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
                // 设置互动者角色
                $peace.WebRTC.changeRoleToPlayer()
              })
              .catch(err => {
                console.error(err)
                $peace.WebRTC.hangup()
              })
          })
          .catch(obj => {
            $peace.util.alert(obj)
          })
      }

      const createChannelHandler = () => {
        return $peace.WebRTC.createChannel({
          channelName: channelName,
          custom: channelName,
          webrtcEnable: true
        }).then(obj => {
          console.log('create channel', obj)

          return obj
        })
      }

      if (this.video.consultation && this.video.consultation.channelFromId === this.user.userInfo.list.docInfo.doctor_id) {
        this.video.visible = true

        // 为避免 channel 异常，尝试先创建 channel，再加入
        createChannelHandler()
          .then(() => {
            joinChannelHandler()
          })
          .catch(error => {
            // 20110 : 重复操作，频道已创建
            // 20111 : 对象(用户/群/聊天室)不存在
            if (error.code === 20110 || error.code === 20111) {
              return joinChannelHandler()
            }

            console.error(error)
          })
      } else {
        const params = {
          consultNo: consultNo,
          action: 'join',
          channel: channelName
        }

        this.$http.post('client/v1/video/processConsult', params).then(() => {
          this.video.visible = true
          // 为避免 channel 异常，尝试先创建 channel，再加入
          createChannelHandler()
            .then(() => {
              joinChannelHandler()
            })
            .catch(error => {
              // 20110 : 重复操作，频道已创建
              // 20111 : 对象(用户/群/聊天室)不存在
              if (error.code === 20110 || error.code === 20111) {
                return joinChannelHandler()
              }

              console.error(error)
            })
        })
      }
    },

    // 用户主动离开频道
    leaveChannel() {
      $peace.WebRTC.hangup()

      $peace.WebRTC.leaveChannel().then(() => {
        const index = this.video.remoteUserJoinedList.findIndex(item => item.account === this.user.userInfo.list.docInfo.doctor_id)
        if (index !== -1) {
          this.video.remoteUserJoinedList.splice(index, 1)
        }

        this.video.visible = false

        // 验证当前频道是否还存在用户, 用以结束视频
        if (this.video.remoteUserJoinedList.length === 0) {
          const consultNo = this.chat.teams.find(item => item.custom && item.custom.consultation).custom.consultation.consultNo

          const params = {
            consultNo: consultNo,
            action: 'over'
          }

          this.$http.post('client/v1/video/processConsult', params)
        }
      })
    },

    // 监听到用户离开频道
    onLeaveChannel(obj) {
      console.log('on leave channel', obj)

      $peace.WebRTC.stopRemoteStream(obj.account)

      const index = this.video.remoteUserJoinedList.findIndex(item => item.account === obj.account)
      if (index !== -1) {
        this.video.remoteUserJoinedList.splice(index, 1)
      }

      const leaveUser = this.video.remoteUserList.find(item => item.account === obj.account)
      if (leaveUser) {
        $peace.util.alert(`${leaveUser.doctorName}离开房间`)
      }
    },

    // 收到远程轨道信息
    onRemoteTrack(obj) {
      console.log('on remote track', obj)

      if (this.video.remoteUserJoinedList.findIndex(item => item.account === obj.account) === -1) {
        this.video.remoteUserJoinedList.push(obj)
      }

      // 音频：播放对方的音频
      if (obj.track.kind === 'audio') {
        // 播放对方声音
        $peace.WebRTC.startDevice({
          type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
        }).catch(err => {
          console.log('播放对方的声音失败')
          console.error(err)
        })
      }

      // 视频：展示对方的画面
      if (obj.track.kind === 'video') {
        const joinUser = this.video.remoteUserList.find(item => item.account === obj.account)
        if (joinUser) {
          $peace.util.alert(`${joinUser.doctorName}进入房间`)
        }

        // 预览加入的同学的视频流
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
      }
    }
  },

  // 销毁 IM
  destroyed() {
    this.clearTeam()

    this.closeNotify()
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

