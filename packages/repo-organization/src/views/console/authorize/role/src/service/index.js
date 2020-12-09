export default {
  // 获取开通服务
  getOpenServiceList() {
    const isMock = false

    const apiPath = 'zyyconsole/console/service/getOpenServiceList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },

  /**
   * 角色
   */
  role() {
    let apiPath = `admin/role`
    const serverPath = process.env.VUE_APP_API_AUTH
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
        apiPath = `admin/role/saveOfSpecial`
        requestApi = serverPath + apiPath
        return Peace.http.post(requestApi, params)
      },
      //编辑
      edit(params) {
        apiPath = `admin/role/updateOfSpecial`
        requestApi = serverPath + apiPath
        return Peace.http.put(requestApi, params)
      },
      //分页获取角色列表
      page(params) {
        apiPath = `admin/role/page`
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
    const serverPath = process.env.VUE_APP_API_AUTH
    let requestApi = serverPath + apiPath
    return {
      // 查询树形菜单
      menuTree(params) {
        apiPath = `admin/menu/tree`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  }
}
