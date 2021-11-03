export default {
  /**
   * 获取排班信息
   *
   * @param {*} params
   */
  getSchedules(params) {
    const isMock = false

    const apiPath = 'client/v1/personalcenter/getSchedules'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params })
  },

  /**
   * 设置线下排班
   *
   * @param {*} params
   */
  setOfflineSchedules(params) {
    const isMock = false

    const apiPath = 'client/v1/doctorset/setOfflineSchedules'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
