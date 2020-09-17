import Peace from '@src/library'
import qs from 'qs'

export default {
  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  login(params) {
    let user = Peace.util.encryption({
      data: params,
      key: 'sksksksksksksksk',
      param: ['password']
    })
    let dataObj = qs.stringify({ username: user.username, password: user.password })
    let grant_type = 'password'
    const apiPath = 'auth/oauth/token'
    const serverPath = process.env.VUE_APP_SERVER_API
    const requestApi = serverPath + apiPath
    return Peace.http({
      url: requestApi,
      headers: {
        isToken: false,
        'TENANT-ID': '1',
        Authorization: 'Basic dXBtczp1cG1z=',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
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
