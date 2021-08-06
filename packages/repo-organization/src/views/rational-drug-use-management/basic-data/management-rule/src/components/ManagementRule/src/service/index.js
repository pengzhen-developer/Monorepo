export default {
  /**
   * 获取规则详情
   * @param params
   */
  getRulesDetail(params) {
    const isMock = false
    const apiPath = 'quake/manageRule/getManageRuleDetail'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取医生列表
   * @param {*} params
   */
  custDoctorListByFilter(params) {
    params.custCode = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'quake/manageRule/doctorListByFilter'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取科室列表
   * @param {*} params
   */
  custDeptListByFilter(params) {
    params.custCode = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'quake/manageRule/deptListByFilter'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取职级列表
   * @param {*} params
   */
  commonDictDoctorTitleList(params) {
    params.custCode = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'quake/manageRule/doctorTitleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取处方类别列表
   * @param {*} params
   */
  commonDictPrescriptionSourceList(params) {
    params.custCode = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'quake/manageRule/prescriptionSourceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取药品列表
   * @param {*} params
   */
  drugDictListByFilter(params) {
    params.custCode = Peace.cache.localStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'quake/manageRule/drugDicList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 剂量单位/包装单位  列表
   * @param params
   */
  getPlatformUnitDicPage(params) {
    const isMock = false
    const apiPath = 'idic/platformUnitDic/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
