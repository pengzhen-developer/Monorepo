//import Peace from '@src/library'
import * as CryptoJS from 'crypto-js'

/** 加密key */
const ENCRYPTION_KEY = 'sksksksksksksksk'

/**
 *加密处理
 */
export function encryption(params) {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach((ele) => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 密码授权
 * @param {*} params
 */
export function authByPassword(params) {
  let data = {
    redirect_url: window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'auth',
    grant_type: 'password',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    username: params.username,
    password: params.password
  }

  let user = encryption({
    data: data,
    key: ENCRYPTION_KEY,
    param: ['password']
  })

  window.location.href = process.env.VUE_APP_AUTH_SITE + '?params=' + encodeURIComponent(JSON.stringify(user))
}

/**
 * 手机授权
 * @param {*} params
 */
export function authByMobile(params) {
  let data = {
    redirect_url: window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'auth',
    grant_type: 'mobile',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    mobile: params.mobile,
    code: params.code
  }

  window.location.href = process.env.VUE_APP_AUTH_SITE + '?params=' + encodeURIComponent(JSON.stringify(data))
}

export default {
  authByPassword,
  authByMobile
}
