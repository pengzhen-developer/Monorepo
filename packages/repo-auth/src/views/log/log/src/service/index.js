import Peace from '@src/library'
import Util from '@src/util'
export default {
  //分页查询日志
  log() {
    return {
      getLogList(params) {
        let apiPath = `admin/log/page`
        apiPath = Util.service.RSETfulFormat(apiPath, params)
        const serverPath = process.env.VUE_APP_AUTH_API
        let requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      deleteLog(params) {
        let apiPath = `admin/log/{id}`
        apiPath = Util.service.RSETfulFormat(apiPath, params)
        const serverPath = process.env.VUE_APP_AUTH_API
        let requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      }
    }
  }
}
