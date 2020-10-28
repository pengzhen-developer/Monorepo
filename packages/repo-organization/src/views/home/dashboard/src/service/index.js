export default {
  /**
   * 获取基础服务
   *
   * @param {*} params
   */
  getBaseInfo(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/Service/getBaseInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 提交申请
   *
   * @param {*} params
   */
  doApply(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/Service/doApply'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 跳转前判断服务是否启用接口-V0.3.0
   *
   * @param {*} params
   */
  isExistService(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/Service/isExistService'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 检查该角色是否能开通此服务V0.4.0
   *
   * @param {*} params
   */
  checkServiceType(params) {
    const isMock = false

    const apiPath = 'zyyconsole/console/Service/checkServiceType'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
