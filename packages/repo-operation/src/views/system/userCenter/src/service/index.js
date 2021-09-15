export default {
  user() {
    let apiPath = `admin/user`
    const serverPath = process.env.VUE_APP_API_AUTH
    let requestApi = serverPath + apiPath
    return {
      //获取用户基本信息
      get() {
        apiPath = `admin/user/getUserInfo`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //添加
      add(params) {
        return Peace.http.post(requestApi, params)
      },
      //编辑
      edit(params) {
        apiPath = `admin/user/edit`
        requestApi = serverPath + apiPath
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
  }
}
