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

  controlledMenu() {
    let apiPath = `admin/controlledMenu`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return {
      //获取终端byID
      page(params) {
        apiPath = `admin/controlledMenu/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
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
        apiPath = `admin/controlledMenu/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
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
      },

      // 菜单列表
      menuList(params) {
        apiPath = `admin/menu/list`
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
  }
}
