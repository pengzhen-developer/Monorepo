export default {
  /**
   * 获取机构列表
   * @param {*} params
   * @returns { Array } [{ Code: 机构编码,  Name: 机构名称 }]
   */
  getOrganizationList(params) {
    const isMock = false

    const apiPath = 'webapi/api/HospitalManage/List'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取科室列表
   * @param { string } custCode 机构编码 （全部 空字符串）
   * @param { source } 处方来源  全部 -1 | 门诊 0 | 急诊 1 | 住院 2 | 互联网 3
   * @returns { Array } [{ Code: 科室编码,  Name: 科室名称 }]
   */
  getDepartmentList(params) {
    const isMock = false

    const apiPath = 'webapi/api/SectionManage/CustSourceSections'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取处方列表
   * @param { string } actionMsg 系统审核结果 空字符串 全部， OK 通过，D 禁用 ，R 慎用，I 提示
   * @param { string } auditorSettings
   * @param { string } deptCode 科室编码
   * @param { string } endTime 结束时间
   * @param { string } hosCode 机构编码
   * @param { string } pharmacistCode 药师编码
   * @param { string } prescriptionState 处方状态
   * @param { string } prescriptionNo 处方编号
   * @param { string } pharmacistCheckMode 审核模式
   * @param { string } prescriptionSource 处方来源
   * @param { string } startTime 开始时间
   * @param { string } submitType 提交方式
   * @param { string } patientName 患者姓名
   * @param { string } pharmacistCheckResult 药师审核结果
   * @param { string } prescriptionType 处方类型
   *
   */
  getPrescriptionList(params) {
    const isMock = false

    const apiPath = 'webapi/api/PrescriptionManage/PrescriptionList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取药师列表
   * @param {*} params
   * @returns { Array } [{ Code: 药师编码,  Name: 药师名称 }]
   */
  getPharmacistList(params) {
    const isMock = false

    const apiPath = 'webapi/api/PharmacistManage/AllPharmacists'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获处方信息
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getPrescriptionInfo(params) {
    const isMock = false

    const apiPath = 'psd/Prescription/GetPrescriptionInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获审方记录
   * @param { string } jztClaimNo 平台处方编号
   * @returns { Object }
   */
  getPrescriptionLog(params) {
    const isMock = false

    const apiPath = 'durprescription/GetLog/PrescriptionLog'
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
  }
}
