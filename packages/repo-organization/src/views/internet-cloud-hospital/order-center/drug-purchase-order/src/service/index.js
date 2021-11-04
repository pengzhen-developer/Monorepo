export default {
  /**
   * 获取购药订单列表
   *
   * @param {*} params
   */
  getDrugOrderList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/orderdrug/orderDrugList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取购药订单详情
   *
   * @param {*} params
   */
  getDrugPurchaseOrderDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Orderdrug/detail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取导出配置信息
   *
   * @param {*} params
   */
  getDocStoreList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/getDocStoreList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 检查是否能导出
   *
   * @param {*} params
   */
  isExistList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/data/isExistList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 导出
   *
   * @param {*} params
   */
  exportOrder(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/data/exportOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.download(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * @description: 获取处方详情
   * @param {*}
   * @return {*}
   */
  getPrescriptionDetail(params) {
    const isMock = false

    const apiPath = 'ehospital/center/prescription/getDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {
      params,
      // TODO:
      // 聚合层不需要 token，移除所有 token
      // 更好的办法是兼容 token
      transformRequest: (data, headers) => {
        delete headers.token
        delete headers.accesstoken
      }
    })
  },

  /**
   * 获取处方图片
   *
   * @param {*} params
   */
  getPrescriptionImage(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Returnvisit/getPrescriptionImage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
