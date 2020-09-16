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
   * 编辑角色
   *
   * @param {*} params
   * @returns
   */
  editRole(params) {
    const isMock = false

    const apiPath = 'operate/permission/editRole'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑角色状态
   *
   * @param {*} params
   * @returns
   */
  editRoleStatus(params) {
    const isMock = false

    const apiPath = 'operate/permission/editRoleStatus'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取菜单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getMenuList(params) {
    const isMock = false

    const apiPath = 'operate/permission/getMenuList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取角色菜单列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getRoleMenuList(params) {
    const isMock = false

    const apiPath = 'operate/permission/getRoleMenuList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
