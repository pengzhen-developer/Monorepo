export default {
  /**
   * 账号列表
   *
   * @param {*} params
   * @returns {Object}
   */
  getPharmacistList(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/PharmacistList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 启用/禁用药师账号
   *
   * @param {*} params
   * @returns {Object}
   */
  EnablePharmacist(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/EnablePharmacist'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 药学专业技术资格证书字典
   *
   * @param {*} params
   * @returns {Object}
   */
  MedicalLevelList(params) {
    const isMock = false

    const apiPath = 'webapi/api/DictItem/MedicalPharmacistLevelList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 职业药师资格证书字典
   *
   * @param {*} params
   * @returns {Object}
   */
  LicensedLevelList(params) {
    const isMock = false

    const apiPath = 'webapi/api/DictItem/LicensedPharmacistLevelList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取部门树结构
   *
   * @param {*} params
   * @returns {Object}
   */
  getDepartTree() {
    const isMock = false

    const apiPath = 'webapi/api/Depart/Tree'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取药师角色列表
   *
   * @param {*} params
   * @returns {Object}
   */
  roleList(params) {
    const isMock = false

    const apiPath = 'admin/role/list'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 上传凭证
   *
   * @param {*} params
   */
  uploadImage(params) {
    const isMock = false

    const apiPath = 'psd/Upload/Image'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增药师账号
   *
   * @param {*} params
   */
  CreatePharmacist(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/CreatePharmacist'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增药师账号
   *
   * @param {*} params
   */
  PharmacistInfo(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/PharmacistInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增药师账号
   *
   * @param {*} params
   */
  UpdatePharmacist(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/UpdatePharmacist'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 批量导入药师账号
   *
   * @param {*} params
   */
  ImportExcelByZYY(params) {
    const isMock = false
    const apiPath = 'psd/Excel/ImportExcelByZYY'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
