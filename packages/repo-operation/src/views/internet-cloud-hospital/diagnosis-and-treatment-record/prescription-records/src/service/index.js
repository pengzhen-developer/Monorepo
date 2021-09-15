export default {
  /**
   * 获取处方列表接口
   * @param {*} params
   */
  getPrescribeList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getPrescribeList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取处方
   *
   * @param {*} params prescribeId
   * @returns {Object}
   */
  getPresInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Order/getPrescripInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取原始处方
   *
   * @param {*} params
   * @returns {Object}
   */
  getPrescriptionImage(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getPrescriptionImage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *  导出处方记录列表
   *
   * @param {*} params
   */
  exportFile(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/exportPrescrib'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params, 'post').then((res) => {
      return res
    })
  },
  /**
   *  日志记录
   *
   * @param {*} params
   */
  isExistList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/isExistList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
