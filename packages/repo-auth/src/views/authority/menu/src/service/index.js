export default {
  /**
   * 终端模块
   */
  client() {
    let apiPath = `admin/client`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return {
      //获取终端列表-侧边栏
      getList(params) {
        apiPath = `admin/client/list`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },
  /**
   * 菜单管理模块
   */
  menu() {
    let apiPath = `admin/menu`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return {
      //获取终端byID
      get(params) {
        apiPath = `admin/menu/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //添加
      post(params) {
        return Peace.http.post(requestApi, params)
      },
      //编辑
      put(params) {
        return Peace.http.put(requestApi, params)
      },
      //删除
      delete(params) {
        apiPath = `admin/menu/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },

      //树形菜单列表
      getList(params) {
        apiPath = `admin/menu/tree`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },
  /**
   * 菜单路由管理模块
   */
  menuRoute() {
    let apiPath = `admin/menuRoute`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return {
      //添加
      post(params) {
        return Peace.http.post(requestApi, params)
      },
      //编辑
      put(params) {
        return Peace.http.put(requestApi, params)
      },
      //删除
      delete(params) {
        apiPath = `admin/menuRoute/${params.routeId}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },

      //列表
      getList(params) {
        apiPath = `admin/menuRoute/list`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },

  /**
   * @description: 获取菜单元素列表
   * @param {*} params
   * @return {*}
   */
  getMenuElements(params) {
    const isMock = false

    const apiPath = 'admin/menuElement/list'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * @description: 新增菜单元素
   * @param {*} params
   * @return {*}
   */
  saveMenuElements(params) {
    const isMock = false

    const apiPath = 'admin/menuElement/save'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * @description: 修改菜单元素
   * @param {*} params
   * @return {*}
   */
  modifyMenuElements(params) {
    const isMock = false

    const apiPath = 'admin/menuElement/modify'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * @description: 修改菜单元素
   * @param {*} params
   * @return {*}
   */
  removeMenuElements(params) {
    const isMock = false

    const apiPath = 'admin/menuElement/remove'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
