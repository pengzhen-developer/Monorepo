export default {
  /**
   * 获取机构名称
   *
   * @param {*} params
   * @returns {Object}
   */
  getCustName(params) {
    const isMock = false

    const apiPath = 'webapi/api/Pharmacist/CustName'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
