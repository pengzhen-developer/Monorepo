import Peace from '@src/library'

export default {
  /**
   * 获取复诊续方列表
   *
   * @param {*} params
   */
  getReturnVisitList(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getReturnVisitList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取复诊续方详情
   *
   * @param {*} params
   */
  getReturnVisitDetail(params) {
    const isMock = false

    const apiPath = 'client/v1/inquiry/getReturnVisitDetail'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
