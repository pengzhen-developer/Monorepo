export default {
  /**
   * 获取病历详情
   *
   * @param {*} params
   */
  getCase(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getCase'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取处方详情
   *
   * @param {*} params
   */
  getPrescripInfo(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/getPrescripInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
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
  subPrescrip(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/prescribeprescrip/onlineSubmit'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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
   * 发送线下处方
   *
   * 咨询 / 复诊续方
   *
   * @param {*} params
   */
  offlineSubPrescrip(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/prescribeprescrip/offlineSubmit'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

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
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
