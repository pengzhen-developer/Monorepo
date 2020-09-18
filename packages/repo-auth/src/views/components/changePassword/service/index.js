import Peace from '@src/library'

export default {
  //修改个人信息
  userEdit(params) {
    let apiPath = `admin/user/edit`
    const serverPath = process.env.VUE_APP_SERVER_API
    let requestApi = serverPath + apiPath
    return Peace.http.put(requestApi, params)
  }
}
