export default {
  /**
   * 获取机构详情
   *
   * @param {*} params
   */
  getOrgDetail(params) {
    const isMock = true

    const apiPath = 'institution/queryDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
