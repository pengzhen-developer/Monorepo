import Peace from '@src/library'

export default {
  /**
   * 获取用户信息
   *
   * @param {*} params
   * @returns
   */
  getAccountInfo(params) {
    const isMock = false

    const apiPath = 'hospital/Account/getAccountInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
}
