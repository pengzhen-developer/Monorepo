export default {
  /**
   *  数据总览
   *
   * @param {*} params
   */
  getOverview(params) {
    const isMock = false

    const apiPath = 'psd/stat/overview'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, params).then((res) => {
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

    const apiPath = 'psd/Stat/Get7DaysOrderNum'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, params).then((res) => {
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
    const apiPath = 'zyyoperate/operate/indexpage/schedule'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
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
    const apiPath = 'prescription/statisticalAnalysis/preCountOfSevenDays'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
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
    const apiPath = 'psd/Stat/GetCityDrugStoreNum'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {}).then((res) => {
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
    const apiPath = 'prescription/statisticalAnalysis/prescriptionCountOfAll'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *  获取受控菜单列表
   *
   * @param {*} params
   */

  getControlledMenuList(params) {
    const isMock = false
    const apiPath = 'admin/controlledMenu/getControlledMenuList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
