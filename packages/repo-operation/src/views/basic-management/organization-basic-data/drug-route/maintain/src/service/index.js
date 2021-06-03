export default {
  /**
   * 获取途径维护列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/getHospitals'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取途径管理列表
   *
   * @param {*} params
   */
  getManagementList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增给药途径
   *
   * @param {*} params
   */
  add(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改途径
   *
   * @param {*} params
   */
  edit(params) {
    const isMock = false

    const apiPath = 'orgUseDrugRoute'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
