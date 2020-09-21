import Peace from '@src/library'

export default {
  /**
   * 验证 token 是否有效
   *
   * @param {*} params
   * @returns
   */
  getBaseInfo(params) {
    const isMock = false

    const apiPath = 'hospital/Account/getBaseInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
