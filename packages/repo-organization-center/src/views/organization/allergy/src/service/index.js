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
   * 查询机构过敏统计信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12911
   *
   * @param {*} params
   */
  allergyCount(params) {
    const isMock = false

    const apiPath = 'allergyCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 查询机构过敏信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12912
   *
   * @param {*} params
   */
  allergyList(params) {
    const isMock = false

    const apiPath = 'allergyList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
