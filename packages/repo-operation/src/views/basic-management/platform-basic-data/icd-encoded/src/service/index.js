export default {
  /**
   * 获取ICD编码列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'platformDiagnosis/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增ICD编码
   *
   * @param {*} params
   */
  addData(params) {

    const isMock = false

    const apiPath = 'platformDiagnosis'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改ICD编码
   *
   * @param {*} params
   */
  modifyData(params) {

    const isMock = false

    const apiPath = 'platformDiagnosis'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取父级编码
   *
   * @param {*} params
   */
  getPatientList() {

    const isMock = false

    const apiPath = `platformDiagnosis/listDiagnosis?code=`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },


}
