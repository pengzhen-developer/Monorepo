import Peace from '@src/library'

export default {
  /**
   * 注册
   *
   * @param {*} params 参数列表
   * @returns
   */
  register(params) {
    const isMock = false

    const apiPath = 'hospital/v070/Account/register'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 发送验证码
   *
   * @param {*} params
   */
  sendCode(params) {
    const isMock = false

    const apiPath = 'hospital/v070/Account/sendCode'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取用户信息
   *
   * @param {*} params
   * @returns
   */
  getAccountInfo(params) {
    const isMock = false

    const apiPath = 'hospital/v070/Account/getAccountInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
