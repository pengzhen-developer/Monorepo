import User from '../user'
import Service from './service'

export function login() {
  doLogin()
    .then(getAccountMenuList)
    .then(redirectToOriginal)
}

function doLogin() {
  let original = Peace.cache.sessionStorage.get('original-href')
  let token = Peace.util.queryUrlParam('token', original)

  if (token) {
    Peace.identity.auth.setAuth({
      access_token: token
    })
    Peace.identity.auth.setHeaderAfterAuth(token)

    User.setUserToken(token)

    return Service.doLogin().then((res) => {
      User.setUserInfo(res.data)

      return Promise.resolve()
    })
  } else {
    Peace.util.error('缺少必要参数【token】，请重新登录。')
    return Promise.reject('缺少必要参数【token】，请重新登录。')
  }
}

function getAccountMenuList() {
  let original = Peace.cache.sessionStorage.get('original-href')
  let productId = Peace.util.queryUrlParam('productId', original) || ''
  // 获取子系统
  const params = {
    type: 'left',
    productCode: productId || 'kzt',
    processEnv: process.env
  }

  return Peace.identity.auth.getAccountMenu(params).then((res) => {
    User.setAccountMenuList(res)
    return Promise.resolve()
  })
}

function redirectToOriginal() {
  let original = Peace.cache.sessionStorage.get('original-href')
  window.location.href = original
}

export default {
  login
}
