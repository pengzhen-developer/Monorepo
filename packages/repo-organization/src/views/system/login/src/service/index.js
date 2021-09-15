export default {
  /**
   * 静默登录
   *
   * @param {*} params
   */
  doLogin() {
    const isMock = false

    const apiPath = 'zyyconsole/console/Account/auth'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取互联网医院信息
   *
   * @param {*} params
   */
  getHospitalInfo() {
    const isMock = false

    const apiPath = 'nethospital/external/hospital/authorize'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },

  getAccountMenuList(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/Service/getServiceSettingMenu'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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
    const serverPath = process.env.VUE_APP_API_AUTH
    const requestApi = serverPath + apiPath

    return Peace.http.get(requestApi, { params })
  }
}
