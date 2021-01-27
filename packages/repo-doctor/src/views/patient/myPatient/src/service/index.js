export default {
  /**
   * 校验身份证合法性
   *
   * @param {*} params
   */
  checkIdCard(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/checkIdCard'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
