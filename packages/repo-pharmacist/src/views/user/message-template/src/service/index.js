export default {
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
  },

  /**
   * 审核模板列表新增
   *
   * @param {string} organCode 机构编码
   * @param {string} organName 机构名称
   * @param {string} templateCode 模板编码
   * @param {string} templateContent 模板内容
   *
   * @returns {Object}
   */
  addAuditingTemplates(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/addAuditingTemplates'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 审核模板列表编辑
   * @param {string} id 模板id(纯数字)
   * @param {string} organCode 机构编码
   * @param {string} organName 机构名称
   * @param {string} templateCode 模板编码
   * @param {string} templateContent 模板内容
   *
   * @returns {Object}
   */
  editAuditingTemplates(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/updateAuditingTemplates'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 审核模板列表删除
   *
   * @param {string} organCode 机构编码
   * @param {string} templatesId 模板id
   *
   * @returns {Object}
   */
  delAuditingTemplates(params) {
    const isMock = false
    const apiPath = 'prescription-comment/api/v1/prescription-comment/delAuditingTemplates'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath
    const api = `${requestApi}/${params['templatesId']}/${params['organCode']}`
    return Peace.http.get(api).then((res) => {
      return res
    })
  },

  /**
   * 点评模板列表查询
   *
   * @param {*} params
   * @returns {Object}
   */
  getCommentTemplatesList(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/getCommentTemplatesList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 点评模板列表新增
   *
   * @param {string} organCode 机构编码
   * @param {string} organName 机构名称
   * @param {string} commonCode 模板编码
   * @param {string} commonContent 模板内容
   *
   * @returns {Object}
   */
  addCommentTemplates(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/addCommentTemplates'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 点评模板列表编辑
   * @param {string} id 模板id(纯数字)
   * @param {string} organCode 机构编码
   * @param {string} organName 机构名称
   * @param {string} commonCode 模板编码
   * @param {string} commonContent 模板内容
   *
   * @returns {Object}
   */
  updateCommentTempTemplates(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/updateCommentTempTemplates'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 点评模板列表删除
   *
   * @param {string} organCode 机构编码
   * @param {string} templatesId 模板id
   *
   * @returns {Object}
   */
  delCommentTemplates(params) {
    const isMock = false

    const apiPath = 'prescription-comment/api/v1/prescription-comment/delCommentTemplates'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath
    const api = `${requestApi}/${params['templatesId']}/${params['organCode']}`
    return Peace.http.get(api).then((res) => {
      return res
    })
  }
}
