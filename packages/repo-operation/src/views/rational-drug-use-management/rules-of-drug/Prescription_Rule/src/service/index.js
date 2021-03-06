export default {
  /**
   * 禁忌症列表（平台）  //适应症列表（平台）
   * @param {*} params
   */
  getPageContainsDiagnosisList(params) {
    const isMock = false

    const apiPath = 'idic/platformDisease/pageContainsDiagnosis'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取规则详情
   * @param params
   */
  getRulesDetail(params) {
    const isMock = false
    const apiPath = 'quake/drugRules/drugRulesDetails'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 给药途径列表（平台）
   * @param params
   */
  getPlatformUseDrugRoutePage(params) {
    const isMock = false
    const apiPath = 'idic/platformUseDrugRoute/page'
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
  },

  /**
   * 人群列表（平台）
   * @param params
   */
  getPlatformHumanClassPage(params) {
    const isMock = false
    const apiPath = 'idic/platformHumanClass/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 过敏列表（平台）
   * @param params
   */
  getPlatformAllergyInfoPage(params) {
    const isMock = false
    const apiPath = 'idic/platformAllergyInfo/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 频次字典（平台）
   * @param params
   */
  getPlatformUseDrugFrequencyPage(params) {
    const isMock = false
    const apiPath = 'idic/platformUseDrugFrequency/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取药品的成分列表
   * @param params
   */
  getListDrugIngredients(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugIngredient/listDrugIngredients'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取平台的成分列表
   * @param params
   */
  getPlatformDrugChemicalComposition(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugChemicalComposition/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取药品的成分类别列表
   * @param params
   */
  getListAtcByDrugStandardCode(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugAtc/listAtcByDrugStandardCode'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取平台的成分类别列表
   * @param params
   */
  getPlatformDrugAtc(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugAtc/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取平台的溶媒列表
   * @param params
   */
  getPlatformDrugMenstruumDic(params) {
    const isMock = false
    const apiPath = 'idic/platformDrugMenstruumDic/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 年龄里的人群选择列表
   */
  getPlatformAgeClass() {
    const isMock = false
    const apiPath = 'idic/platformAgeClass/listAll'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   * ICD列表
   */
  getPlatformDiagnosis(params) {
    const isMock = false
    const apiPath = 'idic/platformDiagnosis/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /** 三方数据的接口**/

  /**
   * 年龄列表（三方）
   */
  getOrgAgeClass(params = {}) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'idic/orgAgeClass/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 禁忌症列表（三方）
   */
  getPageContainsDiagnosis(params = {}) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'idic/orgDisease/pageContainsDiagnosis'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 频次列表（三方）
   */
  getPageByCondition(params = {}) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'idic/orgUseDrugFrequency/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 给药途径列表（三方）
   */
  getOrgUseDrugRoute(params = {}) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'idic/orgUseDrugRoute/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 过敏列表（三方）
   */
  getOrgAllergyInfo(params = {}) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'idic/orgAllergyInfo/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 人群列表（三方）
   */
  getOrgHumanClass(params = {}) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'idic/orgHumanClass/page'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取ICD10列表（三方）
   *
   * @param {*} params
   */
  getICDList(params) {
    params.orgCode = Peace.cache.sessionStorage.get('user_info')?.custCode
    const isMock = false
    const apiPath = 'orgDiagnosis/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 相互作用规则列表
   * @param params
   * @returns {*}
   */
  getDdiRuleList(params) {
    const isMock = false

    const apiPath = 'quake/unionCheckPrescription/getDdiRuleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 查看相互作用规则详情
   * @param params
   */
  getDdiRuleInfoById(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/getDdiRuleInfoById'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 重复用药规则列表
   * @param params
   * @returns {*}
   */
  getDupRuleList(params) {
    const isMock = false

    const apiPath = 'quake/unionCheckPrescription/getDupRuleList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 查看重复用药规则详情
   * @param params
   */
  getDupRuleInfoById(params) {
    const isMock = false
    const apiPath = 'quake/unionCheckPrescription/getDupRuleInfoById'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
