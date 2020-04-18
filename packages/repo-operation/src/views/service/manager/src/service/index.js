import Peace from '@src/library'

export default {
  /**
   * 获取服务列表
   *
   * @param {*} params
   */
  getServiceList(params) {
    const isMock = false

    const apiPath = 'operate/index/getServiceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取账号管理列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'operate/service/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 审核
   *
   * @param {*} params
   */
  doCheck(params) {
    const isMock = false

    const apiPath = 'operate/service/doCheck'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
}
