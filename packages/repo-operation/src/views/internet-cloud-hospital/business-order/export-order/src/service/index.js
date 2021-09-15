export default {
  /**
   * 获取筛选条件数据
   *
   * @param {*} params
   * @returns {Object}
   */
  getCondition(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/getOrgInfos'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取所有机构
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllHospitalList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Orderdrug/getAllHosList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 筛选订单信息
   *
   * @param {*} params
   * @returns {Object}
   */
  checkOrder(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/isExistList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取所有机构
   *
   * @param {*} params
   * @returns {Object}
   */
  exportOrder(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/exportOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params).then((res) => {
      return res
    })
  }
}
