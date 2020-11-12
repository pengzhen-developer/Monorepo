import Util from '@src/util'

// export boot install function
// async is optional
export default async () => {
  // 从控制台返回，标记清除用户信息
  if (Peace.util.queryUrlParam('clear') === 'true') {
    Util.user.removeUserInfo()

    window.location.href = window.location.href.replace('?clear=true', '').replace('clear=true', '')
  }
}
