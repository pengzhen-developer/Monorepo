import Peace from '@src/library'

export default {
  /**
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
    const apiPath = 'custdict/CustDrugAttr/createDrugRoute'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_MDS_API + apiPath

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
   * 新增给药频次
   *
   * @param {*} params
   */
  createDrugFrequency(params) {
    const isMock = false
    const apiPath = 'custdict/CustDrugAttr/createDrugFrequency'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_MDS_API + apiPath

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
   * 新增药品单位
   *
   * @param {*} params
   */
  createDrugUnit(params) {
    const isMock = false
    const apiPath = 'mds/openapi/custdict/CustDrugAttr/createDrugUnit'
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

    const apiPath = 'mds/openapi/jztdurengine/OrganICD10Info/getICD10InfoPaging'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
