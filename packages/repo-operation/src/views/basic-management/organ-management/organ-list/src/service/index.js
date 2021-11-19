export default {
  /**
   * 获取机构列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/Account/organizationList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/account/getOneOrgInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/Account/addOrganization'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/account/editOperateOrg'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/Account/uploadImage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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
    const apiPath = 'zyyoperate/operate/service/chooseService'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/Area/list'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/service/operateService'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/Service/getInsuranceConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/Service/medicalInsuranceConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

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

    const apiPath = 'zyyoperate/operate/Service/commercialInsuranceConfig'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取对接配置
   *
   * @param {*} params
   */
  getDockingConfig(params) {
    const isMock = false

    const apiPath = `psd/CircConfig/GetChannelSysDockingsByCustCode`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存对接配置
   *
   * @param {*} params
   */
  saveDockingConfig(params) {
    const isMock = false

    const apiPath = `psd/CircConfig/InsertCheelSysDock`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医院等级列表接口
   *
   * @param {*} params
   */
  getHosLevelList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/service/getHosLevelList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医院类型一级列表
   *
   * @param {*} params
   */
  getHosTypeList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/service/getHosTypeList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医院类型子集列表接口
   *
   * @param {*} params
   */
  getHosTypeChildrenList(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/service/getHosTypeChildrenList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
