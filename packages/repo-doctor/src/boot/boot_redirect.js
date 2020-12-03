import Util from '@src/util'

// export boot install function
// async is optional
export default async () => {
  if (Util.user.isSignIn()) {
    // Vue 暂未实例化
    // 追加到此轮循环
    setImmediate(() => {
      const userInfo = Util.user.getUserInfo()

      // 更新 vuex
      Peace.$store.commit('user/setUserInfo', userInfo)

      if (!Peace?.NIM?.isConnected()) {
        // 同步执行会造成 quasar loading bar 无限加载状态
        // 暂时关闭 loading bar
        Peace.$q.loadingBar.stop()
        Peace.NIM = Util.IM.initIM()
        Peace.WebRTC = Util.IM.initWebRTC(Peace.NIM)
      }
    })
  }
}
