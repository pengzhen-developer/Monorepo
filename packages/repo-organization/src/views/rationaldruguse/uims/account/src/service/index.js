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
      }
    }
  }
}
