export default {
  /**
   * 获取过敏信息（维护）
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllergyInfoHospitals(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo/getHospitals'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取机构过敏
   *
   * @param {*} params
   * @returns {Object}
   */
  getAllergyInfoList(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增机构人群
   *
   * @param {*} params
   * @returns {Object}
   */
  addOrgAllergyInfo(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改机构人群
   *
   * @param {*} params
   * @returns {Object}
   */
  updateOrgAllergyInfo(params) {
    const isMock = false

    const apiPath = 'orgAllergyInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
