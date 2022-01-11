export default {
  /**
   * 查询当前登录人所属渠道
   * https://devyapi.holoalpha.com/project/542/interface/api/12945
   *
   * @param {*} params
   */
  userSourceInfo(params) {
    const isMock = false

    const apiPath = 'userSourceInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 查询机构ICD字典统计信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12920
   *
   * @param {*} params
   */
  orgIcdCountList(params) {
    const isMock = false

    const apiPath = 'orgIcdCountList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 查询机构ICD疾病列表信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12934
   *
   * @param {*} params
   */
  queryOrgIcdList(params) {
    const isMock = false

    const apiPath = 'queryOrgIcdList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
