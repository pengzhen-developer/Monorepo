/**
 * @description: 获取病历详情
 * @param {*} params
 * @return {*}
 */
export function getCaseDetail(params) {
  const isMock = false

  const apiPath = 'ehospital/center/case/getDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, {
    params,
    // TODO:
    // 聚合层不需要 token，移除所有 token
    // 更好的办法是兼容 token
    transformRequest: (data, headers) => {
      delete headers.token
      delete headers.accesstoken
    }
  })
}

/**
 * @description: 获取处方详情
 * @param {*}
 * @return {*}
 */
export function getPrescripDetail(params) {
  const isMock = false

  const apiPath = 'ehospital/center/prescription/getDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, {
    params,
    // TODO:
    // 聚合层不需要 token，移除所有 token
    // 更好的办法是兼容 token
    transformRequest: (data, headers) => {
      delete headers.token
      delete headers.accesstoken
    }
  })
}

/**
 * @description: 获取健康档案全部数据统计
 * @param {*} params
 * @return {*}
 */
export function getAllHealthList(params) {
  const isMock = false

  const apiPath = 'client/v1/health/allHealthList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 获取患者详情信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOneHealth(params) {
  const isMock = false

  const apiPath = 'client/v1/Health/getOneHealth'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取门诊病历详情详情，包含病历、处方
 * @param {*} params
 * @return {*}
 */
export function getHealthCase(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getHealthCase'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取检验详情
 * @param {*} params
 * @return {*}
 */
export function inspectionDetail(params) {
  const isMock = false

  const apiPath = 'client/report/v110/check/inspectionDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取影像详情
 * @param {*} params
 * @return {*}
 */
export function pacsDetail(params) {
  const isMock = false

  const apiPath = 'client/report/v110/check/pacsDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 问询列表接口 / 咨询列表接口
 * @param {*} params
 * @return {*}
 */
export function getPatientInquiryList(params) {
  const isMock = false

  const apiPath = 'client/v1/inquiry/getPatientInquiryListByPc'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取单次问诊历史消息
 * @param {*} params
 * @return {*}
 */
export function getOneInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/getOneInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params })
}

export default {
  inspectionDetail,
  pacsDetail,
  getCaseDetail,
  getPrescripDetail,
  getAllHealthList,
  getOneHealth,
  getHealthCase,
  getPatientInquiryList,
  getOneInquiry
}
