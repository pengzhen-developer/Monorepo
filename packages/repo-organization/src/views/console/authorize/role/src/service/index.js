import Peace from '@src/library'

export default {
  /**
   * 角色
   */
  role() {
    let apiPath = `admin/role`
    const serverPath = process.env.VUE_APP_AUTH_API
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
  },

  /**
   * 产品
   */
  product() {
    let apiPath = `admin/product`
    const serverPath = process.env.VUE_APP_AUTH_API
    let requestApi = serverPath + apiPath
    return {
      //获取产品列表
      list(params) {
        apiPath = `admin/product/list`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      // 获取产品字典列表
      dict() {
        apiPath = `admin/product/dict`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      }
    }
  }
}
