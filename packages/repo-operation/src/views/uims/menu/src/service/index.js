export default {
  /**
   * 获取菜单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getMenuList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/getMenuList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增菜单
   *
   * @param {*} params
   * @returns
   */
  addMenu(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/addMenu'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑菜单
   *
   * @param {*} params
   * @returns
   */
  editMenu(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/editMenu'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除菜单
   *
   * @param {*} params
   * @returns
   */
  delMenu(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/permission/delMenu'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
