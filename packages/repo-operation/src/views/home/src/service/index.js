import Peace from '@src/library'

export default {
  /**
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'operate/Log/getLogList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  数据总览
   *
   * @param {*} params
   */
  getOverview(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/stat/overview'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  近7天订单量
   *
   * @param {*} params
   */
  get7DaysOrderNum(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/Stat/Get7DaysOrderNum'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
