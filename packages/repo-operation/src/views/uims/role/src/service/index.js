import Peace from '@src/library'

export default {
  /**
   * 获取角色列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getRoleList(params) {
    const isMock = false

    const apiPath = 'operate/permission/getRoleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增角色
   *
   * @param {*} params
   * @returns
   */
  addRole(params) {
    const isMock = false

    const apiPath = 'operate/permission/addRole'
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

    const apiPath = 'operate/permission/editMenu'
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

    const apiPath = 'operate/permission/delMenu'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
