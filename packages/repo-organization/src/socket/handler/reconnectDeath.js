import Util from '@src/util'

export default () => {
  // 提示用户，引导下一步
  Peace.util.warning('网络异常，请重新登录')

  // 清除用户信息
  Util.user.removeUserInfo()

  // 给出反应时间，重定向到登录页
  setTimeout(() => {
    Util.location.redirectToLoginAndClear()
  }, 3000)
}
