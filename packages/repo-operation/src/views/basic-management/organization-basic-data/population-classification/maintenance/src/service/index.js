export default {
  /**
   * 获取人群分类（维护）
   *
   * @param {*} params
   * @returns {Object}
   */
  getHumanClassHospitals(params) {
    const isMock = false

    const apiPath = 'orgHumanClass/getHospitals'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取机构人群
   *
   * @param {*} params
   * @returns {Object}
   */
  getHumanClassList(params) {
    const isMock = false

    const apiPath = 'orgHumanClass/page'
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
  addOrgHumanClass(params) {
    const isMock = false

    const apiPath = 'orgHumanClass'
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
  updateOrgHumanClass(params) {
    const isMock = false

    const apiPath = 'orgHumanClass'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
