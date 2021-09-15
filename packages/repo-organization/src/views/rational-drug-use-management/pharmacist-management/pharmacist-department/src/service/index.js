export default {
  /**
   * 部门列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getDepartList(params) {
    const isMock = false

    const apiPath = 'webapi/api/Depart/List'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取部门树结构
   *
   * @param {*} params
   * @returns {Object}
   */
  getDepartTree() {
    const isMock = false

    const apiPath = 'webapi/api/Depart/Tree'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取部门信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getDepartInfo(params) {
    const isMock = false

    const apiPath = 'webapi/api/Depart/Get'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增部门
   *
   * @param {*} params
   * @returns {Object}
   */
  CreateDepart(params) {
    const isMock = false

    const apiPath = 'webapi/api/Depart/Create'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 更新部门
   *
   * @param {*} params
   * @returns {Object}
   */
  UpdateDepart(params) {
    const isMock = false

    const apiPath = 'webapi/api/Depart/Update'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
