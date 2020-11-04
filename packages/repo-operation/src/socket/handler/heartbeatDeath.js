import Util from '@src/util'

export default () => {
  // 提示用户，执行下一步
  Peace.util.warning('网络异常，请重新登录')
  Util.user.removeUserInfo()

  setTimeout(() => {
    Util.referer.redirectToReferer('home')
  }, 3000)
}
