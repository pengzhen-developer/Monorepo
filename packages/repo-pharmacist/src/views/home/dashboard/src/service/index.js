export default {
  /**
   * 处方审核情况
   *
   * @param {*} params
   * @returns {Object}
   */
  prescriptionExeStatisticsChart(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/prescriptionExeStatisticsChart'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 系统审方统计
   *
   * @param {*} params
   * @returns {Object}
   */
  systemExeStatisticsChart(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/systemExeStatisticsChart'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 规则触发统计
   *
   * @param {*} params
   * @returns {Object}
   */
  ruleTriggerStatisticsChart(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/ruleTriggerStatisticsChart'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *处方数据(未审核总数和已审核总数)
   *
   * @param {*} params
   * @returns {Object}
   */
  // phaPreCountsByCust(params) {
  //   const isMock = false

  //   const apiPath = `prescription/data/phaPreCountsByCust?hosCode=${params.hosCode}&phaUserId=${params.phaUserId}`
  //   const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  //   const serverPath = process.env.VUE_APP_API_BASE + apiPath

  //   const requestApi = isMock ? mockPath : serverPath

  //   return Peace.http.get(requestApi).then((res) => {
  //     return res
  //   })
  // },
  /**
   * 获取未审处方数
   *
   * @param {*} params
   * @returns {Object}
   */
  getNotCheckedPrenCount(params) {
    const isMock = false

    const apiPath = 'durprescription/v2/pharmacist/notCheckedPrescriptionCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取已审处方数
   *
   * @param {*} params
   * @returns {Object}
   */
  getCheckedPrenCount(params) {
    const isMock = false

    const apiPath = 'durprescription/v2/pharmacist/checkedPrescriptionCount'
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
