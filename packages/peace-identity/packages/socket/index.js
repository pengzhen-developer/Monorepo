import Logger from './logger'

export default class Socket {
  static getInstance(options) {
    if (!Socket.instance) {
      Socket.instance = new Socket(options)

      return Socket.instance
    }
    return Socket.instance
  }

  constructor(config) {
    Logger.debug = config.debug

    this.opts = {
      pingTimeout: config.pingTimeout || 10000,
      pongTimeout: config.pongTimeout || 5000,
      reconnectTimeout: config.reconnectTimeout || 5000,
      pingRequest: config.pingRequest || 'ping',
      repeatLimit: config.repeatLimit || Infinity
    }

    this.ws = null
    this.repeat = 0

    //override hook function
    this.onclose = () => {}
    this.onerror = () => {}
    this.onopen = () => {}
    this.onmessage = () => {}
    this.onreconnect = () => {}
  }

  connect(url) {
    if (url) {
      this.opts.url = url
    }

    try {
      Logger.info('正在连接...')

      this.ws = new WebSocket(this.opts.url)
      this.initEventHandle()
    } catch (e) {
      this.reconnect()
      throw e
    }
  }

  initEventHandle() {
    this.ws.onclose = (error) => {
      Logger.info('连接已关闭', error)

      this.onclose()
      this.reconnect()
    }
    this.ws.onerror = (error) => {
      Logger.info('连接错误', error)

      this.onerror()
      this.reconnect()
    }
    this.ws.onopen = () => {
      Logger.info('连接成功')

      this.repeat = 0
      this.onopen()
      // 心跳检测重置
      this.heartCheck()
    }
    this.ws.onmessage = (event) => {
      Logger.info('<<===', event.data)

      this.onmessage(event)
      // 如果获取到消息，心跳检测重置
      // 拿到任何消息都说明当前连接是正常的
      this.heartCheck()
    }
  }

  reconnect() {
    if (this.opts.repeatLimit > 0 && this.opts.repeatLimit <= this.repeat) {
      return
    }
    if (this.lockReconnect || this.forbidReconnect) {
      return
    }
    // 设定重连锁
    this.lockReconnect = true
    // 必须在 lockReconnect 之后，避免进行无效计数
    this.repeat++
    this.onreconnect()

    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.connect()
      this.lockReconnect = false
    }, this.opts.reconnectTimeout)
  }

  send(message) {
    Logger.info(`===>> ${message}`)

    this.ws.send(message)
  }

  heartCheck() {
    this.heartReset()
    this.heartStart()
  }

  heartStart() {
    if (this.forbidReconnect) {
      return
    }

    // 心跳检测
    this.pingTimeoutId = setTimeout(() => {
      // 发送心跳消息
      this.send(this.opts.pingRequest)
      // 如果超过一定时间还没收到消息，说明连接断开了
      this.pongTimeoutId = setTimeout(() => {
        Logger.info(`<<===>> ${this.opts.pongTimeout}ms 未收到响应，等待重连...`)

        this.ws.close()
      }, this.opts.pongTimeout)
    }, this.opts.pingTimeout)
  }

  heartReset() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }

  close() {
    // 如果手动关闭连接，不再重连
    this.forbidReconnect = true

    this.heartReset()
    this.ws.close()
  }
}
