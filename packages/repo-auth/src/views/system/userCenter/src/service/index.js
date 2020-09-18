import Peace from '@src/library'

export default {
  /**
   * 用户管理模块
   */
  user() {
    return {
      //修改个人信息
      edit(params) {
        let apiPath = `admin/user/edit`
        const serverPath = process.env.VUE_APP_SERVER_API
        let requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, params)
      },
      get(params) {
        let apiPath = `admin/user/${params.id}`
        const serverPath = process.env.VUE_APP_SERVER_API
        let requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, params)
      }
    }
  }
}
