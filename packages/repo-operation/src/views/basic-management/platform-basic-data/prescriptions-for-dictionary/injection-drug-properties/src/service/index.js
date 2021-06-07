export default {
  /**
   * 分页获取注射剂/抗菌药品属性列表
   *
   * @param {*} params
   * @returns {Object}
   */
  pageInjectionAndAntibacterials(params) {
    const isMock = false

    const apiPath = 'platformDrugBaseInfo/pageInjectionAndAntibacterials'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改麻醉/精神（注射剂/抗菌）药品属性
   *
   * @param {*} params
   * @returns {Object}
   */
  updatePlatformDrugExtInfo(params) {
    const isMock = false

    const apiPath = 'platformDrugBaseInfo/updatePlatformDrugExtInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
