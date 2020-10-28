export default {
  /**
   * 获取用户列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getUseAccountList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/getAdminList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取部门字典
   *
   * @param {*} params
   * @returns {Object}
   */
  getQueryDictionary(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/dictionary'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 添加角色
   *
   * @param {*} params
   * @returns {Object}
   */
  addUseAccount(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/addAdmin'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑角色
   *
   * @param {*} params
   * @returns {Object}
   */
  editUseAccount(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/editAdmin'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
