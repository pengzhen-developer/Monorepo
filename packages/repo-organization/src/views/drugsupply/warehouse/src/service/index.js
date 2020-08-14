import Peace from '@src/library'

export default {
  /**
   * 获取云仓详情
   *
   * @param {*} params
   */
  getInfo(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/CircConfig/GetCustIn3PartByCust'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增云仓或机构开户信息
   *
   * @param {*} params
   */
  InsertCircconfig(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/CircConfig/Insert'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改机构开户信息
   *
   * @param {*} params
   */
  updateCircconfig(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/CircConfig/Update'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 加载机构下拉框
   *
   * @param {*} params
   */
  getCustlist() {
    const isMock = false

    const apiPath = 'mds/openapi/psd/Cust/GetCodeNameByHome'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  }
}
