export default {
  /**
   * 药品目录列表
   *
   * @param {*} params
   * @returns {Object}
   */
  GetJntDrugsInfos(params) {
    const isMock = false

    const apiPath = 'psd/JntDrug/GetJntDrugsInfos'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 药品详情
   *
   * @param {*} params
   * @returns {Object}
   */
  GetJntDrugInfoDetailsByID(params) {
    const isMock = false

    const apiPath = `psd/JntDrug/GetJntDrugInfoDetailsByID?ID=${params.ID}`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取麻醉/精神药品属性
   *
   * @param {*} params
   * @returns {Object}
   */
  listDrugAttrEnum(params) {
    const isMock = false

    const apiPath = 'platformDrugBaseInfo/listDrugAttrEnum'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
