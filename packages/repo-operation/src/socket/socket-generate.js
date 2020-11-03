import HandlerMessage from './handler/message'
import HandlerReconnectDeath from './handler/reconnectDeath'
import HandlerHeartbeatDeath from './handler/heartbeatDeath'

export default async function generateSocket() {
  const auth = await Peace.identity.auth.getAuth()
  const connectUrl = process.env.VUE_APP_API_WEBSOCKET
  const connectParams = {
    token: auth.access_token
  }

  // 连接
  Peace.identity.socket.connect(connectUrl, connectParams)

  // 监听
  Peace.identity.socket.onMessage = HandlerMessage
  Peace.identity.socket.onReconnectDeath = HandlerReconnectDeath
  Peace.identity.socket.onHeartbeatDeath = HandlerHeartbeatDeath
}
