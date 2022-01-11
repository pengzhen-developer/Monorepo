export default {
  /**
   * 查询日志列表信息
   * http://devyapi.holoalpha.com/project/542/interface/api/12931
   *
   * @param {*} params
   */
  queryDicLog(params) {
    const isMock = false

    const apiPath = 'queryDicLog'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
