import WebSocketAsPromised from 'websocket-as-promised'

// checkConnectCount 做为控制变量
// 检测成功时，重置为 0
// 大于 5 次时， 不再检测， 提示联系运营
let checkConnectCount = 0

const checkConnect = () => {
  const disconnect = []
  const connectPromise = []
  const connectUrl = [
    'weblink.netease.im',
    'weblink01.netease.im',
    'weblink02.netease.im',
    'weblink03.netease.im',
    'weblink04.netease.im',
    'weblink05.netease.im',
    'weblink06.netease.im',
    'weblink07.netease.im'
  ]

  connectUrl.forEach((url) => {
    const wssUrl = `wss://${url}/socket.io/1/websocket/00000000-0000-0000-0000-000000000000`
    const wsp = new WebSocketAsPromised(wssUrl, { timeout: 5000 })

    connectPromise.push(wsp.open().then(() => wsp.close()))
  })

  Promise.allSettled(connectPromise).then((wspList) => {
    wspList.forEach((wsp, index) => {
      if (wsp.status === 'rejected') {
        disconnect.push(connectUrl[index])
      }
    })

    if (disconnect.length > 0) {
      checkConnectCount += 1

      if (checkConnectCount >= 5) {
        Peace.$message({
          showClose: true,
          message: '检测到网络接入问题，多次修复失败，请联系运营...',
          type: 'error',
          duration: 0
        })
      } else {
        Peace.$message({
          showClose: true,
          message: '检测到网络接入问题，正在尝试为你修复...',
          type: 'warning',
          duration: 1000 * 60 * 5
        })

        Peace.identity.dictionary
          .getList('ext_url')
          .then((res) => {
            const url = res.find((item) => item.label === 'dll_invoke_script_beichen').value

            Peace.http.create().get(url)
          })
          .then(() => {
            setTimeout(checkConnect, 1000 * 60 * 5)
          })
      }
    } else {
      checkConnectCount = 0
    }
  })
}

// export boot install function
// async is optional
export default async () => {
  const config = Peace.cache.sessionStorage.get('config')

  if (config.hospitalTag === 'beichen') {
    // check is connect ?
    setTimeout(checkConnect, 0)
  }
}
