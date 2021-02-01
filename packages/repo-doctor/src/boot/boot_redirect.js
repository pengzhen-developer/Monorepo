import Util from '@src/util'

/** 初始化 IM */
const initNIM = () => {
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
}

/** 提醒密码安全性 */
const notifyPasswordSafety = () => {
  const userInfo = Util.user.getUserInfo()
  const hasNotifyPasswordSafety = window.localStorage.getItem('hasNotifyPasswordSafety') ?? false

  if (userInfo.list.docInfo.isUpdate === 0 && hasNotifyPasswordSafety === false) {
    Peace.$confirm('您的登录密码为初始密码，为了账号安全建议进行密码修改', '提示', {
      confirmButtonText: '去修改',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Peace.$router.push({ path: '/sys/myInfo', query: { active: 1 } })
      })
      .catch(() => {
        Peace.$router.push({ path: '/home' })
      })
      .finally(() => {
        window.localStorage.setItem('hasNotifyPasswordSafety', true)
      })
  }
}

// export boot install function
// async is optional
export default async () => {
  if (Util.user.isSignIn()) {
    // Vue 暂未实例化
    // 追加到此轮循环
    setImmediate(() => {
      notifyPasswordSafety()

      initNIM()
    })
  }
}
