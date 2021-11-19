export default {
  /**
   * 获审方记录
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getPrescriptionLog(params) {
    const isMock = false

    const apiPath = 'durprescription/GetLog/PrescriptionLog'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
