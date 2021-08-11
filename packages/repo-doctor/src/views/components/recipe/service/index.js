export default {
  getLastInfo(params) {
    const isMock = false

    const apiPath = '/client/v100/prescription/prescribeprescrip/getLastInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

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
   * 获取处方详情
   *
   * @param {*} params
   */
  getPrescripInfo(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/getPrescripInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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
   * 发送线下处方
   *
   * 咨询 / 复诊续方
   *
   * @param {*} params
   */
  offlineSubPrescrip(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/prescribeprescrip/offlineSubmit'
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
  },

  /**
   * 坚持开具处方
   *
   * @param {*} params
   */
  usePrescription(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/usePrescription'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 同意药师质疑，作废处方
   *
   * @param {*} params
   */
  voidPrescription(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/voidPrescription'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取处方明细，包含处方来源
   *
   * @param {*} params
   */
  getBackInfo(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/getBackInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
