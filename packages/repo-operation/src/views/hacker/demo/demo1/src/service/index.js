import peace from '@src/library'

import IData from '../model/IData'

export default {
  /**
   * Demo
   * Use Mock Data
   * Use JSON Schema Validator
   *
   * @returns
   */
  get(params) {
    const isMock = true

    const apiPath = 'mock'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath + '.json'
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestType = isMock ? 'mock' : 'post'
    const requestApi = isMock ? mockPath : serverPath

    return peace.http[requestType](requestApi, params).then(res => {
      peace.validate.jsonSchema(res, IData)

      return res
    })
  }
}
