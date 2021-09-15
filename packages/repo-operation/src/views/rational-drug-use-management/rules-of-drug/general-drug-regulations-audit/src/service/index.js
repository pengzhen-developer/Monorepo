export default {
  /**
   * 获取通用药品规则审核列表
   *
   * @param {*} params
   * @returns
   */
  get(params) {
    const isMock = false

    const apiPath = 'quake/commonRule/pageCommonRule'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取通用药品规则审核日志
   *
   * @param {*} params
   * @returns
   */
  getLog(params) {
    const isMock = false

    const apiPath = 'quake/commonRule/getLog'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取通用药品规则审核
   *
   * @param {*} params
   * @returns
   */
  audit(params) {
    const isMock = false

    const apiPath = 'quake/commonRule/audit'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
