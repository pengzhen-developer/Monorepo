import peace from '@src/library'

export default {
  /**
   * 认证授权
   *
   * @param {*} params 参数列表
   * @returns
   */
  auth(params) {
    const isMock = false

    const apiPath = 'console/Account/auth'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
}
