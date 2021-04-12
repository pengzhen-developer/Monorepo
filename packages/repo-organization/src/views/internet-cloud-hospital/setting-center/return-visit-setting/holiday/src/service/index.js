export default {
  /**
   * 获取节假日
   *
   * @param {*} params
   */
  getHoliday(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/getHolidayList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 设置节假日
   *
   * @param {*} params
   */
  setHoliday(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/syncHoliday'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
