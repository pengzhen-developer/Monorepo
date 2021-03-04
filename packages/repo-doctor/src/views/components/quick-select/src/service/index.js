export default {
  /**
   * 获取常见诊断
   *
   * @export
   * @param {*} params
   * @returns
   */
  getCommomDiagnose(params) {
    const isMock = false

    const apiPath = 'client/v1/Patient/IllnessList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取诊断
   *
   * @export
   * @param {*} params
   * @returns
   */
  getDisease(params) {
    const isMock = false

    const apiPath = 'client/v1/Patient/getDiseaseInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取常见过敏史
   *
   * @export
   * @param {*} params
   * @returns
   */
  getCommomAllergens(params) {
    const isMock = false

    const apiPath = 'client/v1/Patient/allergens'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取过敏史
   *
   * @export
   * @param {*} params
   * @returns
   */
  getAllergenList(params) {
    const isMock = false

    const apiPath = 'client/v1/Patient/allergenList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
