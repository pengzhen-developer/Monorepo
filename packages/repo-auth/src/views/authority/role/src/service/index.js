import Peace from '@src/library'

export default {
  /**
   * 终端模块
   */
  client() {
    let apiPath = `admin/client`
    const serverPath = process.env.VUE_APP_SERVER_API
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
   * 菜单
   */
  menu() {
    let apiPath = `admin/menu`
    const serverPath = process.env.VUE_APP_SERVER_API
    let requestApi = serverPath + apiPath
    return {
      // 全量s树形菜单
      allMenuTree(params) {
        apiPath = `admin/menu/tree`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      //角色的菜单集合
      roleMenu(params) {
        apiPath = `admin/menu/tree/${params.roleId}`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      }
    }
  },

  /**
   * 角色
   */
  role() {
    let apiPath = `admin/role`
    const serverPath = process.env.VUE_APP_SERVER_API
    let requestApi = serverPath + apiPath
    return {
      //获取角色byID
      get(params) {
        apiPath = `admin/role/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //添加
      add(params) {
        return Peace.http.post(requestApi, params)
      },
      //编辑
      edit(params) {
        return Peace.http.put(requestApi, params)
      },
      //删除
      delete(params) {
        apiPath = `admin/role/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },
      //获取角色列表
      list(params) {
        apiPath = `admin/role/list`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      //获取角色类型字典列表
      dict(params) {
        apiPath = `admin/role/dict`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      // 更新角色菜单
      updateMenu(params) {
        apiPath = `admin/role/menu`
        requestApi = serverPath + apiPath
        return Peace.http.put(requestApi, params)
      }
    }
  }
}
