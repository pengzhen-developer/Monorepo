import Peace from '@src/library'
import Util from '@src/util'
import http from './http'
import qs from 'qs'

export default {
  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  login(params) {
    let user = Util.encryption({
      data: params,
      key: 'sksksksksksksksk',
      param: ['password']
    })
    let dataObj = qs.stringify({ username: user.username, password: user.password })
    let grant_type = 'password'
    const apiPath = 'auth/oauth/token'
    const serverPath = process.env.VUE_APP_SERVER_API
    const requestApi = serverPath + apiPath
    return http.request({
      method: 'post',
      url: requestApi,
      headers: {
        //未登录 Authorization='Basic '+ client_id:client_secret（base64加密）
        // upms:upms
        Authorization: `Basic ${Peace.util.encode('upms:upms')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: { grant_type },
      data: dataObj
    })
  },

  /**
   * 获取角色权限信息
   *
   * @param {*} params
   */
  userMenuOfList(params) {
    const apiPath = `admin/menu/userMenuOfList`
    const serverPath = process.env.VUE_APP_SERVER_API
    const requestApi = serverPath + apiPath
    return {
      get() {
        return Peace.http.get(requestApi, { params })
      }
    }
  }
}
