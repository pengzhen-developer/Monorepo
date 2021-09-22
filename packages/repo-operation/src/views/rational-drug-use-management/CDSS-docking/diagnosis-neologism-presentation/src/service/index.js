export default {
  /**
   * 诊断新词提报列表
   * @param params
   * @returns {*}
   */
  getList(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/queryPage'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取ICD版本
   * @param params
   * @returns {*}
   */
  getIcdVersion(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/queryIcdVersion'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取机构列表
   * @param params
   * @returns {*}
   */
  getOrganList(params) {
    const isMock = false

    const apiPath = 'idic/organ/list'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取建议词
   * @param params
   * @returns {*}
   */
  getSuggestWord(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/querySuggestWord'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 新增
   * @param params
   * @returns {*}
   */
  save(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/save'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改
   * @param params
   * @returns {*}
   */
  update(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/updateCdssWordByIcdCode'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 查看详情
   * @param params
   * @returns {*}
   */
  getWordDetail(params) {
    const isMock = false

    const apiPath = 'idic/cdss/word/get'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
