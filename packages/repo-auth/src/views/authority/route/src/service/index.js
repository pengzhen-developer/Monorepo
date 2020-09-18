import Peace from '@src/library'
import Util from '@src/util'
export default {
  //获取路由
  getRoute() {
    let apiPath = `admin/route`
    apiPath = Util.service.urlFormat(apiPath)
    const serverPath = process.env.VUE_APP_SERVER_API
    let requestApi = serverPath + apiPath
    return Peace.http.get(requestApi)
  },
  //修改路由
  editRoute(params) {
    let apiPath = `admin/route`
    apiPath = Util.service.urlFormat(apiPath, params)
    const serverPath = process.env.VUE_APP_SERVER_API
    let requestApi = serverPath + apiPath
    return Peace.http.put(requestApi, params)
  }
}
