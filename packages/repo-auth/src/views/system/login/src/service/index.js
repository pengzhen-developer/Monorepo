import Peace from '@src/library'

// import qs from 'qs'

export default {
  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  login(params) {
    // params = qs.stringify(params)
    params.grant_type = 'password'
    const apiPath = 'auth/oauth/token'
    const serverPath = process.env.VUE_APP_SERVER_API
    const requestApi = serverPath + apiPath
    //upms
    // const grant_type = 'password'
    return Peace.http.get(requestApi, { params })
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
