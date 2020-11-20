import Util from '@src/util'

export default async function() {
  if (Peace.identity.auth.isLogin()) {
    const auth = await Peace.identity.auth.getAuth()
    const connectUrl = process.env.VUE_APP_API_WEBSOCKET + '?token=' + auth.access_token

    // 连接
    Peace.identity.socket.connect(connectUrl)

    // 监听消息
    Peace.identity.socket.onmessage = function(messageEvent) {
      if (messageEvent.data === 'ping' || messageEvent.data === 'pong') {
        return
      }

      const message = JSON.parse(messageEvent.data)

      if (message.code === 'logout') {
        Util.user.removeUserInfo()
        Util.location.redirectToIndex()

        return
      }

      if (message.code === 'concurrentlogin') {
        Util.user.removeUserInfo()
        Peace.util.warning('您的账号在其它地方登录')
        setTimeout(Util.location.redirectToIndex(), 3000)

        return
      }

      if (message.code === 'userlock') {
        Util.user.removeUserInfo()
        Peace.util.warning('您的账号已被禁用')
        setTimeout(Util.location.redirectToIndex(), 3000)

        return
      }

      if (message.code === 401) {
        Peace.util.warning('您的登录状态已失效，请重新登录')
        Util.user.removeUserInfo()
        setTimeout(Util.location.redirectToLogin(), 3000)

        return
      }
    }

    // 监听重连
    Peace.identity.socket.onreconnect = function() {
      Peace.util.warning('您的网络异常，正在重新连接')
    }
  }
}
