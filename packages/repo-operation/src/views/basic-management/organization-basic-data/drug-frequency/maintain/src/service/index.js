export default {
  /**
   * 获取频次维护列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugFrequency/getHospitals'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_ICDC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取频次管理列表
   *
   * @param {*} params
   */
  getManagementList(params) {
    const isMock = false

    const apiPath = 'orgUseDrugFrequency/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_ICDC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增给药频次
   *
   * @param {*} params
   */
  add(params) {
    const isMock = false

    const apiPath = 'orgUseDrugFrequency'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_ICDC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改频次
   *
   * @param {*} params
   */
  edit(params) {
    const isMock = false

    const apiPath = 'orgUseDrugFrequency'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_ICDC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  }
}
