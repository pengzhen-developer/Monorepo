export default {
  /**
   * 获系统审方结果
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getActionDetail(params) {
    const isMock = false
    const apiPath = 'durprescription/Phrams/ActionDetail'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
