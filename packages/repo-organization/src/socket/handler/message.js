// Strategy Design
// 使用策略模式，实现 message 后续处理

import Util from '@src/util'

const strategy = {
  /**
   * 用户退出登录
   *
   */
  ['logout']: (/** message */) => {
    // 提示用户，引导下一步
    // To be optimized
    // 因为退出登录，会提示当前 token 所有在线的 socket，暂无法识别退出操作是否为当前用户
    // 所以暂时无法提示非本人的操作引起的重定向
    // 以下引导暂时屏蔽
    // Peace.util.warning('您的账号在其它地方登录')

    // 清除用户信息
    Util.user.removeUserInfo()

    // 重定向到索引页
    Util.location.redirectToLoginAndClear()
  },

  /**
   * 该用户在其它地方登陆
   *
   */
  ['concurrentlogin']: (/** message */) => {
    // 提示用户，引导下一步
    Peace.util.warning('您的账号在其它地方登录')

    // 清除用户信息
    Util.user.removeUserInfo()

    // 给出反应时间，重定向到索引页
    setTimeout(() => {
      Util.location.redirectToLoginAndClear()
    }, 3000)
  },

  /**
   * 账号被禁用
   *
   */
  ['userlock']: (/** message */) => {
    // 提示用户，引导下一步
    Peace.util.warning('您的账号已被禁用')

    // 清除用户信息
    Util.user.removeUserInfo()

    // 给出反应时间，重定向到索引页
    setTimeout(() => {
      Util.location.redirectToLoginAndClear()
    }, 3000)
  },

  /**
   * 身份认证失败
   *
   * @param {*} message
   */
  [401]: (/* message */) => {
    // 提示用户，引导下一步
    Peace.util.warning('您的登录状态已失效，请重新登录')

    // 清除用户信息
    Util.user.removeUserInfo()

    // 给出反应时间，重定向到登录页
    setTimeout(() => {
      Util.location.redirectToLogin()
    }, 3000)
  }
}

export default (message) => {
  const response = JSON.parse(message.data)
  const messageCode = response.code
  const strategyHandler = strategy[messageCode]

  if (strategyHandler) {
    strategyHandler(message)
  } else {
    console.warn('尚未实现的消息策略：', message)
  }
}
