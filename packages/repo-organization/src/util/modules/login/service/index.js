export default {
  /**
   * 静默登录
   *
   * @param {*} params
   */
  doLogin() {
    const isMock = false

    const apiPath = 'console/Account/auth'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },

  getAccountMenuList(params) {
    const isMock = false

    const apiPath = 'console/Service/getServiceSettingMenu'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取角色权限信息
   *
   * @param {*} params
   */
  userMenuOfList(params) {
    const apiPath = `admin/menu/userMenuOfList`
    const serverPath = process.env.VUE_APP_AUTH_API
    const requestApi = serverPath + apiPath

    return Peace.http.get(requestApi, { params })
  }
}
