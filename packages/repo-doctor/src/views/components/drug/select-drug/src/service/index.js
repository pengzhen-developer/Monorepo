export default {
  /**
   * 获取历史处方列表
   *
   * @param {*} params
   */
  getHistoryPrescriptionList(params) {
    const isMock = false

    const apiPath = 'client/v1/history/getPrescriptionList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取常用处方列表
   *
   * @param {*} params
   */
  getCommonlyPrescriptionList(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commonprescription/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取常用药品列表
   *
   * @param {*} params
   */
  getCommonlyDrugList(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commondrug/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取药品列表(根据关键字)
   *
   * @param {*} params
   */
  getDrugList(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/drug/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取用药频次字典
   *
   * @param {*} params
   */
  drugFrequencyList(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/drugFrequencyList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取给药途径字典
   *
   * @param {*} params
   */
  drugUsageList(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/drugUsageList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取药品推荐信息
   *
   * @param {*} params
   */
  getRecommendDrugInfo(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/getRecommendDrugInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
