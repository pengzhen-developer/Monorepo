/**
 * 获取列表
 * @param params
 * @returns {*}
 */
export function CheckOptionHospitalList(params) {
  const isMock = false

  const apiPath = 'quake/prescriptionCheckConfig/list'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 查看详情
 * @param params
 * @returns {*}
 */
export function getDrugRuleConfigDetail(params) {
  const isMock = false

  const apiPath = 'quake/ruleCheckcConfig/getDrugRuleConfigDetailsByHospitalCode'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 获取日志
 * @param params
 * @returns {*}
 */
export function getLog(params) {
  const isMock = false

  const apiPath = 'quake/log/getModifyLogs'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_SITE_AUDITENGINE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

export default {
  CheckOptionHospitalList,
  getDrugRuleConfigDetail,
  getLog
}
