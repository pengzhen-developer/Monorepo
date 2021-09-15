export default {

  /**
   * 获取药品成分
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'platformDrugChemicalComposition/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增药品成分
   *
   * @param {*} params
   */
  addData(params) {

    const isMock = false

    const apiPath = 'platformDrugChemicalComposition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改药品成分
   *
   * @param {*} params
   */
  modifyData(params) {

    const isMock = false

    const apiPath = 'platformDrugChemicalComposition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  getCategoryList(params) {
    const isMock = false

    const apiPath = 'platformDrugAtc/listAtcClassify'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {params}).then((res) => {
        return res
      })
  }
}
