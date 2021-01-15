export default {
  /**
   *  获取药品搜索记录列表
   *
   * @param {*} params
   */
  getStockLog(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/getStockLog'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  获取药品搜索记录列表
   *
   * @param {*} params
   */
  getStockDrugList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/getStockDrugList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *  导出药品搜索记录列表
   *
   * @param {*} params
   */
  exportGetStockLog(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/exportGetStockLog'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params).then((res) => {
      return res
    })
  }
}
