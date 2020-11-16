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
        // 加载 IM SDK
        Peace.NIM = Util.IM.initIM()
        Peace.WebRTC = Util.IM.initWebRTC(Peace.NIM)
      }
    })
  }
}
