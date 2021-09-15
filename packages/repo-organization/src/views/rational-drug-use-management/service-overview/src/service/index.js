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
   * 药品总数
   *
   * @param {*} params
   * @returns {Object}
   */
  drugCount(params) {
    const isMock = false

    const apiPath = 'custdict/drugDict/drugCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 药师总数
   *
   * @param {*} params
   * @returns {Object}
   */
  PharCount(params) {
    const isMock = false

    const apiPath = 'webapi/api/NoAuth/PharCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 处方数量统计
   *
   * @param {*} params
   * @returns {Object}
   */
  PrescriptionCount(params) {
    const isMock = false

    const apiPath = 'webapi/api/ApothecaryPrescription/PrescriptionCountsByCust'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 通用规则 自定义规则
   *
   * @param {*} params
   * @returns {Object}
   */
  ruleCountOfOrgan(params) {
    const isMock = false

    const apiPath = `quake/commonRule/ruleCount?custCode=${params.custCode}`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 药品数量统计
   *
   * @param {*} params
   * @returns {Object}
   */
  CustDrugsTotal(params) {
    const isMock = false

    const apiPath = 'webapi/api/DrugsMapping/CustDrugsTotal'
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
