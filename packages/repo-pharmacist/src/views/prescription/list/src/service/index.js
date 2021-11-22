export default {
  /**
   * 获取处方列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getPrescriptionsList(params) {
    const isMock = false

    const apiPath = 'durprescription/v2/pharmacist/pharmacistPrescriptions'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
