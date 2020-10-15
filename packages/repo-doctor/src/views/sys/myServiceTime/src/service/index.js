export default {
  /**
   * 获取排班信息
   *
   * @param {*} params
   */
  getSchedules(params) {
    const isMock = false

    const apiPath = 'client/v1/personalcenter/getSchedules'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 设置线下排班
   *
   * @param {*} params
   */
  setOfflineSchedules(params) {
    const isMock = false

    const apiPath = 'client/v1/doctorset/setOfflineSchedules'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
