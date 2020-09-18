import Peace from '@src/library'
import http from './http'
import qs from 'qs'

export default {
  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  loginByPassword(params) {
    let dataObj = qs.stringify({ username: params.username, password: params.password })
    let grant_type = 'password'
    let authorization = `Basic ${Peace.util.encode(params.client_id + ':' + params.client_secret)}`
    const apiPath = 'auth/oauth/token'
    const serverPath = process.env.VUE_APP_SERVER_API
    const requestApi = serverPath + apiPath
    return http.request({
      method: 'post',
      url: requestApi,
      headers: {
        //未登录 Authorization='Basic '+ client_id:client_secret（base64加密）
        Authorization: authorization,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: { grant_type },
      data: dataObj
    })
  },

  /**
   * 手机验证码登录
   *
   * @param {*} params
   */
  loginByMobile(params) {
    let grant_type = 'mobile'
    let authorization = `Basic ${Peace.util.encode(params.client_id + ':' + params.client_secret)}`
    const apiPath = 'auth/mobile/token/sms'
    const serverPath = process.env.VUE_APP_SERVER_API
    const requestApi = serverPath + apiPath
    return http.request({
      method: 'post',
      url: requestApi,
      headers: {
        //未登录 Authorization='Basic '+ client_id:client_secret（base64加密）
        Authorization: authorization,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: { mobile: params.mobile, code: params.code, grant_type }
    })
  }
}
