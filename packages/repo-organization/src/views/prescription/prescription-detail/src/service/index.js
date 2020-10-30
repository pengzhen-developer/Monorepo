export default {
  /**
   * 获取处方详情
   *
   * @param {*} params
   */
  getPrescriptionInfo(params) {
    const isMock = false

    const apiPath = 'psd/Prescription/GetPrescriptionInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
