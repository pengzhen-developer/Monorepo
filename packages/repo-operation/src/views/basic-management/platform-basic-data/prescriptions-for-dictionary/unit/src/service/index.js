export default {

  /**
   * 获取单位列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'platformUnitDic/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增单位
   *
   * @param {*} params
   */
  addData(params) {

    const isMock = false

    const apiPath = 'platformUnitDic'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改单位
   *
   * @param {*} params
   */
  modifyData(params) {

    const isMock = false

    const apiPath = 'platformUnitDic'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params)
  }
}
