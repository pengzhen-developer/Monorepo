export default {
  /**
   * 用户
   */
  user() {
    let apiPath = `admin/user`
    const serverPath = process.env.VUE_APP_API_AUTH
    let requestApi = serverPath + apiPath
    return {
      //获取用户byID
      get(params) {
        apiPath = `admin/user/${params.id}`
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
      // 更新账号状态
      updateUser(params) {
        apiPath = `admin/user/updateUser`
        requestApi = serverPath + apiPath
        return Peace.http.put(requestApi, params)
      },
      // 重置密码
      resetPassword(params) {
        apiPath = `admin/user/resetPassword?userId=${params.userId}`
        requestApi = serverPath + apiPath
        return Peace.http.put(requestApi)
      },
      //分页获取用户列表
      page(params) {
        apiPath = `admin/user/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },

  /**
   * 角色
   */
  role() {
    let apiPath = `admin/role`
    const serverPath = process.env.VUE_APP_API_AUTH
    let requestApi = serverPath + apiPath
    return {
      //获取角色列表
      list(params) {
        apiPath = `admin/role/list`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },

  getOrgList() {
    let apiPath = `zyyoperate/operate/service/getOrgList`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return Peace.http.post(requestApi)
  }
}
