export default {
  /**
   * 分页获取平台药品成分表 （药品成分属性）
   *
   * @param {*} params
   * @returns {Object}
   */
  platformDrugIngredientPage(params) {
    const isMock = false

    const apiPath = 'platformDrugIngredient/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 根据ID获取平台药品成分表 （药品成分属性）
   *
   * @param {*} params
   * @returns {Object}
   */
  getPlatformDrugIngredient(params) {
    const isMock = false

    const apiPath = 'platformDrugIngredient'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 修改平台药品成分表 （药品成分属性）
   *
   * @param {*} params
   * @returns {Object}
   */
  editPlatformDrugIngredient(params) {
    const isMock = false

    const apiPath = 'platformDrugIngredient'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取平台字典（药品成分）列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getPlatformDrugChemicalCompositionListAll(params) {
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
   * 根据成分编码批量获取药品成分名称
   *
   * @param {*} params
   * @returns {Object}
   */
  getListNameByCodes(params) {
    const isMock = false

    const apiPath = 'platformDrugChemicalComposition/listNameByCodes'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
