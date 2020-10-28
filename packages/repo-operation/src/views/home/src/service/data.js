import http from './http'

export default {
  // 数据大屏接口

  /**
   *  平台所有处方数
   *
   * @param {*} params
   */
  getPrescriptionCountOfAll(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/prescriptionCountOfAll'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  药品总数
   *
   * @param {*} params
   */
  getDrugCount(params) {
    const isMock = false

    const apiPath = 'custdict/jntDrug/getJntDrugCount'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.get(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  数据总览 获取医疗机构、仓配机构数量
   *
   * @param {*} params
   */
  getMedicalAndWarehouse(params) {
    const isMock = false

    const apiPath = 'psd/stat/overview'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.get(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * new
   * 数据总览     获取医疗机构，仓配机构数量
   */
  getMechanismCount(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/index/getMechanismCount'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.get(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *  药店列表 获取地图数据
   *
   * @param {*} params
   */
  getMapData() {
    const isMock = false
    const apiPath = 'psd/Stat/GetCityDrugStoreNum'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.get(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   *  订单总量、店配机构、近7日机构订单排名、近7日订单完成率、订单列表、近7日订单价格区间、近半年商品数量排名、近半年订单销售额
   *
   * @param {*} params
   */
  getData() {
    const isMock = false
    const apiPath = 'psd/Order/ReportData '
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.get(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   *  近7天处方量统计
   *
   * @param {*} params
   */
  getPreCountOfSevenDays(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/preCountOfSevenDays'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  近7天机构处方排名
   *
   * @param {*} params
   */
  getPreSortOfSevenDays(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/preSortOfSevenDays'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  近7天处方诊断关键词
   *
   * @param {*} params
   */
  getPreDiagnosisKeyOfSevenDays(params) {
    const isMock = false

    const apiPath = 'prescription/statisticalAnalysis/preDiagnosisKeyOfSevenDays'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
