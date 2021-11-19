export default {
  /**
   * 更新用户状态
   *
   * @param {*} params
   * @returns {Object}
   */
  updateUserStatus(params) {
    const isMock = false

    const apiPath = 'admin/user/updateUserStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取药师医网信签名设置
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getPharmacistAutograph() {
    const isMock = false

    const apiPath = 'webapi/api/ApothecaryPrescription/GetPharmacistAutograph'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取处方信息
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getPrescriptionInfo(params) {
    const isMock = false

    const apiPath = 'durprescription/v2/pharmacist/getPrescriptionDetail'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取科室
   *
   * @param {*} params
   * @returns {Object}
   */
  getDepartment(params) {
    const isMock = false

    const apiPath = 'webapi/api/ApothecaryPrescription/GetDepartment'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取机构
   *
   * @param {*} params
   * @returns {Object}
   */
  getCustomerTeamRelaction(params) {
    const isMock = false

    const apiPath = 'webapi/api/ApothecaryPrescription/GetCustomerTeamRelaction'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取第一张处方
   *
   * @param {*} params
   * @returns {Object}
   */
  getNotCheckedPrescription() {
    const isMock = false

    const apiPath = 'durprescription/v2/pharmacist/getNotCheckedPrescription'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 再次审方
   *
   * @param {*} params
   * @returns {Object}
   */
  againCheckPrescription(params) {
    const isMock = false

    const apiPath = 'durprescription/prescription/againCheckPrescription'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获系统审方结果
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getActionDetail(params) {
    const isMock = false
    const apiPath = 'durprescription/Phrams/ActionDetail'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取未审处方列表
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getUnhandledPrescriptions(params) {
    const isMock = false
    const apiPath = 'durprescription/v2/pharmacist/unhandledPrescriptions'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取未审处方列表
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  lockPre(params) {
    const isMock = false
    const apiPath = 'durprescription/v2/pharmacist/lockPre'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 审核模板列表查询
   *
   * @param {*} params
   * @returns {Object}
   */
  getAuditingTemplatesList(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/getAuditingTemplatesList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
