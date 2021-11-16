export default {
  /**
   * 处方记录列表
   *
   * @param {*} params
   */
  getPrescriptionList(params) {
    const isMock = true

    const apiPath = 'prescriptionCenter/getPrescriptionList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询处方信息
   *
   * @param {*} params
   */
  getPrescription(params) {
    const isMock = false

    const apiPath = 'prescriptionCenter/getPrescription'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
