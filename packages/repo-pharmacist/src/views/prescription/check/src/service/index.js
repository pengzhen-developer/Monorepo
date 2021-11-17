export default {
  /**
   * 获取用户状态
   *
   * @param {*} params
   * @returns {Object}
   */
  getUserStatus() {
    const isMock = false

    const apiPath = 'admin/user/getUserStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 更新用户状态
   *
   * @param {*} params
   * @returns {Object}
   */
  updateUserStatus(params) {
    const isMock = false

    const apiPath = 'admin/user/updateUserStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
