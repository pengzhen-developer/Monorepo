export default {

  /**
   * 获取单位转换列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'platformUnitConversionFormula/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增单位转换
   *
   * @param {*} params
   */
  addData(params) {

    const isMock = false

    const apiPath = 'platformUnitConversionFormula'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改单位转换
   *
   * @param {*} params
   */
  modifyData(params) {

    const isMock = false

    const apiPath = 'platformUnitConversionFormula'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  getUnitList() {

    const isMock = false

    const apiPath = `platformUnitConversionFormula/listDic?ucfName`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  }
}
