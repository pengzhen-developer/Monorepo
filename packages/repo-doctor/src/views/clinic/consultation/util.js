import WebRTC from '/public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.3.0'
import config from './config'

/**
 * 创建视频房间
 *
 * @export
 * @param {*} channelName
 */
export function createChannel(channelName) {
  console.log('*** create channel begin ***', channelName)

  const createChannel = $peace.WebRTC.createChannel({
    channelName: channelName,
    custom: channelName,
    webrtcEnable: true
  })
    .then(obj => {
      console.log('*** create channel success ***', obj)

      return obj
    })
    .catch(obj => {
      console.error('*** create channel error ***', obj)

      return obj
    })

  return createChannel
}

/**
 * 加入视频房间
 *
 * @export
 * @param {*} channelName
 */
export function joinChannel(channelName) {
  console.log('*** join channel begin ***', channelName)

  const sessionConfig = {
    videoQuality: WebRTC.CHAT_VIDEO_QUALITY_HIGH,
    videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_15,
    videoEncodeMode: WebRTC.CHAT_VIDEO_ENCODEMODE_NORMAL,
    splitMode: WebRTC.LAYOUT_SPLITLATTICETILE,
    recordVideo: false,
    recordAudio: false,
    highAudio: false,
    bypassRtmp: false,
    rtmpRecord: false,
    videoBitrate: 0,
    rtmpUrl: ''
  }

  const joinChannel = $peace.WebRTC.joinChannel({
    channelName: channelName instanceof MouseEvent ? this.chat.team.custom.consultation.channel : channelName,
    sessionConfig: sessionConfig,
    type: WebRTC.NETCALL_TYPE_VIDEO
  })
    .then(res => {
      console.log('*** join channel success ***', res)

      return res
    })
    .catch(res => {
      console.error('*** join channel error ***', res)

      return res
    })

  return joinChannel
}

/**
 * 开启RTC连接
 * 开启音频
 * 开启视频
 * 本地画面预览
 * 设置为互动者角色
 *
 * @export
 * @param {*} remoteStreamObj 用户媒体流信息
 * @param {*} { contaierId = '', width = 250, height = 250 } 用于决定如何渲染该用户
 * @returns
 */
export function startRtc(remoteStreamObj, { contaierId = '', width = 250, height = 250 }) {
  console.log('*** startRtc begin ***', remoteStreamObj)

  // 如果存在用户媒体流信息，
  // 说明发起视频成功，其它用户加入
  // 当前回调为 other user
  // 否则当前回调为 current user
  const isOtherUserStream = remoteStreamObj ? true : false

  const startRtc = isOtherUserStream ? new Promise() : $peace.WebRTC.startRtc()

  startRtc
    // 设置采集音量大小
    .then(() => {
      $peace.WebRTC.setCaptureVolume(255)
    })
    // 开始播放用户媒体流声音
    .then(() => {
      $peace.WebRTC.startDevice({
        type: WebRTC.DEVICE_TYPE_AUDIO_IN
      }).then(obj => {
        console.log('*** startDevice DEVICE_TYPE_AUDIO_IN success ***', obj)
      })
    })
    // 开始播放用户媒体流视频
    .then(() => {
      $peace.WebRTC.startDevice({
        type: WebRTC.DEVICE_TYPE_VIDEO
      }).then(obj => {
        console.log('*** startDevice DEVICE_TYPE_VIDEO success ***', obj)
      })
    })
    // 开始显示用户媒体流视频画面
    .then(() => {
      if (isOtherUserStream) {
        $peace.WebRTC.startRemoteStream({
          account: remoteStreamObj ? remoteStreamObj.account : undefined,
          node: document.getElementById(contaierId)
        }).then(obj => {
          console.log('*** startRemoteStream ***', obj)
        })

        $peace.WebRTC.setVideoViewRemoteSize({
          account: remoteStreamObj.account,
          width: width,
          height: height,
          cut: true
        })
      } else {
        $peace.WebRTC.startLocalStream(document.getElementById(contaierId)).then(obj => {
          console.log('*** startLocalStream ***', obj)
        })

        $peace.WebRTC.setVideoViewSize({
          width: 250,
          height: 250,
          cut: true
        })
      }
    })
    // 设置为互动者角色，可以发送自己的音频和视频给房间中的其他人
    .then(() => {
      $peace.WebRTC.changeRoleToPlayer().then(obj => {
        console.log('*** changeRoleToPlayer ***', obj)
      })
    })
    // 发生未知状况
    .catch(obj => {
      console.error('*** startRtc error ***', obj)

      // 当前用户媒体流信息为自己
      // 视频发起失败，直接挂断
      if (!isOtherUserStream) {
        $peace.WebRTC.hangup()
      }
    })

  return startRtc
}

export default {
  createChannel,
  joinChannel,
  startRtc
}
