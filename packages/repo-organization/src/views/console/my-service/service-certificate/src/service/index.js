export default {
  /**
   * 获取我的服务服务凭证列表
   *
   * @param {*} params
   */
  getMyCertificationList(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/Service/getMyCertificationList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取服务凭证
   *
   * @param {*} params
   */
  getCertification(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configure/getbycode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, params).then((res) => {
      return res
    })
  }
}
