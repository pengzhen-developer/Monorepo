import Peace from '@src/library'

export default {
  /**
   * 静默登录
   *
   * @param {*} params
   */
  doLogin(params) {
    const isMock = false

    const apiPath = 'console/Account/auth'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
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
  }
}
