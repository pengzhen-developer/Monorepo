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

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询机构部门统计信息
   * http://devyapi.holoalpha.com/project/542/interface/api/12918
   *
   * @param {*} params
   */
  orgDepartmentCount(params) {
    const isMock = false

    const apiPath = 'orgDepartmentCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询机构部门信息
   * http://devyapi.holoalpha.com/project/542/interface/api/12919
   *
   * @param {*} params
   */
  orgDepartmentList(params) {
    const isMock = false

    const apiPath = 'orgDepartmentList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
