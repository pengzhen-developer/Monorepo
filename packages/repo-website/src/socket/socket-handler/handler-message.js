// Strategy Design
// 使用策略模式，实现 message 后续处理

import Util from '@src/util'

const strategy = {
  /**
   * 用户退出登录
   *
   */
  ['logout']: (/** message */) => {
    Util.user.removeUserInfo()
    Util.referer.redirectToReferer('home')
  },

  /**
   * 账号被禁用
   *
   */
  ['userlock']: (/** message */) => {
    Util.user.removeUserInfo()
    Peace.util.warning('您的账号已被禁用，请联系管理员')

    setTimeout(() => {
      Util.referer.redirectToReferer('home')
    }, 3000)
  },

  /**
   * 身份认证失败
   *
   * @param {*} message
   */
  [401]: (/* message */) => {
    Util.user.removeUserInfo()
    Peace.util.warning('您的登录状态已失效，请重新登录')

    setTimeout(() => {
      Util.referer.redirectToReferer('home')
    }, 3000)
  }
}

export default (message) => {
  try {
    const response = JSON.parse(message.data)
    const messageCode = response.code
    const strategyHandler = strategy[messageCode]

    if (strategyHandler) {
      strategyHandler(message)
    } else {
      console.warn('尚未实现的消息策略：', message)
    }
  } catch (error) {
    throw new Error(error)
  }
}
