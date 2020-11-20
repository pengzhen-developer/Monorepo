import Util from '@src/util'

// export boot install function
// async is optional
export default async () => {
  if (Util.user.isSignIn()) {
    setImmediate(() => {
      const userInfo = Util.user.getUserInfo()

      // 更新 vuex
      Peace.$store.commit('user/setUserInfo', userInfo)

      if (!Peace?.NIM?.isConnected()) {
        // 同步执行会造成 quasar loading bar 无限加载状态
        // 追加在次轮循环执行
        setImmediate(() => {
          Peace.NIM = Util.IM.initIM()
          Peace.WebRTC = Util.IM.initWebRTC(Peace.NIM)
        })
      }
    })
  }
}
