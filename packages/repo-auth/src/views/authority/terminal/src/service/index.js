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
      //获取终端byID
      get(params) {
        apiPath = `admin/client/${params.clientId}`
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
        apiPath = `admin/client/${params.clientId}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },
      //获取终端列表
      getList(params) {
        apiPath = `admin/client/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  }
}
