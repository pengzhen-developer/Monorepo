import Peace from '@src/library'

import IUserData from './../model/IUserData'

export default {
  /**
   * 账号密码登录
   *
   * @param {*} params
   */
  doLogin(params) {
    const isMock = false

    const apiPath = 'operate/index/doLogin'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      Peace.validate.jsonSchema(res, IUserData)

      return res
    })
  },
}
