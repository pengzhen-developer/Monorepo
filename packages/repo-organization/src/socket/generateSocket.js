import Util from '@src/util'

export default async function generateSocket() {
  const connectUrl = process.env.VUE_APP_API_WEBSOCKET
  const connectParams = {
    token: (await Peace.identity.auth.getAuth()).access_token
  }

  // 连接 ws
  Peace.identity.socket.connect(connectUrl, connectParams)

  // 心跳检测次数上限，检测已结束
  // 当配置 heartbeat.enable 时，在 heartbeat.heartbeatResponseDelay 未收到服务端响应，并且重试 heartbeat.heartbeatAttempts 失败后
  Peace.identity.socket.onHeartbeatDeath = () => {
    // 提示用户，执行下一步
    Peace.util.alert('网络异常，请重新登录')
    Util.user.removeUserInfo()

    setTimeout(() => {
      Util.referer.redirectToReferer('login')
    }, 3000)
  }

  // 重连次数上限，重连已结束
  // 当配置 reconnection.enable 时，并且重试 heartbeat.reconnectionAttempts 失败后
  Peace.identity.socket.onReconnectDeath = () => {
    // 提示用户，执行下一步
    Peace.util.alert('网络异常，请重新登录')
    Util.user.removeUserInfo()

    setTimeout(() => {
      Util.referer.redirectToReferer('login')
    }, 3000)
  }

  // 收到服务端消息
  Peace.identity.socket.onMessage = (message) => {
    const response = JSON.parse(message.data)
    const responseFuncList = [
      {
        // 其它端退出
        code: 'logout',
        callback: () => {
          Util.user.removeUserInfo()

          Util.referer.redirectToReferer('login')
        }
      },
      // token error
      {
        code: 401,
        callback: () => {
          Peace.util.alert('身份认证失败，请重新登录')
          Util.user.removeUserInfo()

          Util.referer.redirectToReferer('login')
        }
      }
    ]
    const responseFunc = responseFuncList.find((item) => item.code === response.code)

    responseFunc && responseFunc.callback(message)
  }
}
