export default {
  /**
   * 检测当前患者是否建档
   *
   */
  checkIsBuilding(params) {
    const isMock = false

    const apiPath = 'client/v1/patient/checkIsBuilding'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取病历详情
   *
   * @param {*} params
   */
  getCase(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getCase'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 发送线上处方
   *
   * 咨询 / 复诊续方
   *
   * @param {*} params
   */
  onlineSubmit(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/prescribeprescrip/onlineSubmit'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, params, {
        headers: {
          post: { 'Content-Type': 'application/json' }
        }
      })
      .then((res) => {
        return res
      })
  },

  /**
   * 确认发送处方
   *
   * @param {*} params
   */
  confirmSend(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/confirmSend'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
