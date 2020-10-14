export default {
  /**
   * 获取机构列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'operate/Account/organizationList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取机构信息
   *
   * @param {*} params
   */
  getOrganizationInfo(params) {
    const isMock = false

    const apiPath = 'operate/account/getOneOrgInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增机构
   *
   * @param {*} params
   */
  addOrganization(params) {
    const isMock = false

    const apiPath = 'operate/Account/addOrganization'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 更新机构
   *
   * @param {*} params
   */
  editOrganization(params) {
    const isMock = false

    const apiPath = 'operate/account/editOperateOrg'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 上传凭证
   *
   * @param {*} params
   */
  uploadImage(formData) {
    const isMock = false

    const apiPath = 'operate/Account/uploadImage'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        return res
      })
  },

  /**
   * 已选服务
   *
   * @param {*} params
   */
  getService(params) {
    const isMock = false
    const apiPath = 'operate/service/chooseService'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取省市区
   *
   * @param {*} params
   */
  getRegion(params) {
    const isMock = false

    const apiPath = 'operate/Area/list'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 机构已开通服务操作
   *
   * @param {*} params
   */
  operateService(params) {
    const isMock = false

    const apiPath = 'operate/service/operateService'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取机构支付服务配置
   *
   * @param {*} params
   */
  getPaymentConfig(params) {
    const isMock = false

    const apiPath = 'operate/Service/getInsuranceConfig'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 更新医保配置
   *
   * @param {*} params
   */
  updateMedicalInsuranceConfig(params) {
    const isMock = false

    const apiPath = 'operate/Service/medicalInsuranceConfig'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 更新商保配置
   *
   * @param {*} params
   */
  updateCommercialInsuranceConfig(params) {
    const isMock = false

    const apiPath = 'operate/Service/commercialInsuranceConfig'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
