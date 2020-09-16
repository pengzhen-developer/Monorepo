import Peace from '@src/library'

export default {
  /**
<<<<<<< HEAD
   * 获取给药途径列表
   *
   * @param {*} params
   */
  DrugRoutePaging(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/CustDrug/DrugRoutePaging'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增给药途径列表
   *
   * @param {*} params
   */
  addDrugChannel(params) {
    const isMock = false
    // custdict/CustDrugAttr/addDrugChannel
    const apiPath = 'mds/openapi/psd/custdict/CustDrugAttr/addDrugChannel'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取给药频次列表
   *
   * @param {*} params
   */
  DrugFrequencyPaging(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/CustDrug/DrugFrequencyPaging'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取药品单位列表
   *
   * @param {*} params
   */
  DrugUnitPaging(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/CustDrug/DrugUnitPaging'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取ICD10列表
   *
   * @param {*} params
   */
  getICD10Info(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/dictionary/OrganICD10Info/getICD10Info'
=======
   * 获取基础服务
   *
   * @param {*} params
   */
  getAccountDetailInfo(params) {
    const isMock = false

    const apiPath = 'console/bank/getAccountDetailInfo'
>>>>>>> 药品属性UI目录结构
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
