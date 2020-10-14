import http from './http'

export default {
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

    return http.get(requestApi, params).then((res) => {
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

    return http.get(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *
   *
   * @param {*} params
   */
  getSchedule(params) {
    const isMock = false
    const apiPath = 'operate/indexpage/schedule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  近7天处方量统计
   *
   * @param {*} params
   */
  preCountOfSevenDays(params) {
    const isMock = false
    const apiPath = 'mds/openapi/prescription/statisticalAnalysis/preCountOfSevenDays'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  药店列表
   *
   * @param {*} params
   */
  getDrugStoreList() {
    const isMock = false
    const apiPath = 'mds/openapi/psd/Stat/GetCityDrugStoreNum'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.get(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   *  获取处方总数
   *
   * @param {*} params
   */
  prescriptionCountOfAll(params) {
    const isMock = false
    const apiPath = 'mds/openapi/prescription/statisticalAnalysis/prescriptionCountOfAll'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
