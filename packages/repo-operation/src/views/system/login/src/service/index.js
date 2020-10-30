export default {
  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  doLogin(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/index/doLogin'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      //登录成功设置请求头
      Peace.http.defaults.headers.common = {
        token: res?.data?.token
      }
      return res
    })
  },

  /**
   * 获取角色权限信息
   *
   * @param {*} params
   */
  getAccountMenuList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/getAccountMenuList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
