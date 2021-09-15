export default {
  /**
   * 获取ICD10列表
   *
   * @param {*} params
   */
  getICDList(params) {
    const isMock = false

    const apiPath = 'orgDiagnosis/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
