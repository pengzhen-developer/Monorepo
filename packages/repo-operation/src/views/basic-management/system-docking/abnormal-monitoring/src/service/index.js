export default {
  /**
   * 异常监控列表
   *
   * @param {*} params
   * @returns {Object}
   */
  exceptionMonitorList(params) {
    const isMock = false

    const apiPath = 'shared/exceptionMonitor/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 查询同步异常短信提醒信息
   *
   * @param {*} params
   * @returns {Object}
   */
  exceptionSmsWarn(params) {
    const isMock = false

    const apiPath = 'shared/exceptionSmsWarn'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 修改异常短信提醒
   *
   * @param {*} params
   * @returns {Object}
   */
  updataExceptionSmsWarn(params) {
    const isMock = false

    const apiPath = 'shared/exceptionSmsWarn'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *异常监控详情
   *
   * @param {*} params
   * @returns {Object}
   */
  exceptionMonitorDetails(params) {
    const isMock = false

    const apiPath = 'shared/exceptionMonitorDetails/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   *手工同步
   *
   * @param {*} params
   * @returns {Object}
   */
  manualSyn(params) {
    const isMock = false

    const apiPath = `shared/exceptionMonitorDetails/manualSyn?id=${params.id}`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  }
}
