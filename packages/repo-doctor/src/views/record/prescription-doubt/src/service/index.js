export default {
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
   * 获取审方记录
   *
   * @param {*} params
   * @returns
   */
  getRecordPrescription(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/recordPrescription'
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
