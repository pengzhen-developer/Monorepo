export default {
  /**
   *  获取药品搜索记录列表
   *
   * @param {*} params
   */
  getSearchLog(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/getSearchLog'
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
  exportGetSearchLog(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/data/exportGetSearchLog'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params).then((res) => {
      return res
    })
  }
}
