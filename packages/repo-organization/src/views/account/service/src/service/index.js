import Peace from '@src/library'

import IServiceBaseInfo from './../model/IServiceBaseInfo'

export default {
  /**
   * 获取基础服务
   *
   * @param {*} params
   */
  getBaseInfo(params) {
    const isMock = false

    const apiPath = 'console/Service/getBaseInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      Peace.validate.jsonSchema(res, IServiceBaseInfo)

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

    const apiPath = 'console/Service/doApply'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
}
