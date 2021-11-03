/**
 * @description: 获取通知列表
 * @param {*} params
 * @return {*}
 */
export function getNoticeMsgList(params) {
  const isMock = false

  const apiPath = 'client/v1/Notice/getMsgList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取通知详情
 * @param {*} params
 * @return {*}
 */
export function getNoticeMsgDetail(params) {
  const isMock = false

  const apiPath = 'client/v1/Notice/getDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 修改工作状态
 * @param {*} params
 * @return {*}
 */
export function updateWorkStatus(params) {
  const isMock = false

  const apiPath = 'client/v1/Personalcenter/updateWorkStatus'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取服务协议
 * @param {*} params
 * @return {*}
 */
export function getAgreement(params) {
  const isMock = false

  const apiPath = 'client/base/agreement/getInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 同意服务协议
 * @param {*} params
 * @return {*}
 */
export function agreeAgreement(params) {
  const isMock = false

  const apiPath = 'client/base/agreement/agree'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取基础配置
 * @param {*} params
 * @return {*}
 */
export function getBaseConfig(params) {
  const isMock = false

  const apiPath = 'client/v1/doctorset/getBaseConfig'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 设置基础配置
 * @param {*} params
 * @return {*}
 */
export function setBaseConfig(params) {
  const isMock = false

  const apiPath = 'client/v1/doctorset/setBaseConfig'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取处方详情
 * @param {*} params
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
 * @description: 记录视频时长
 * @param {*} params
 * @return {*}
 */
export function processVideo(params) {
  const isMock = false

  const apiPath = 'client/v1/video/process'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getNoticeMsgList,
  getNoticeMsgDetail,
  updateWorkStatus,
  getAgreement,
  agreeAgreement,
  getBaseConfig,
  setBaseConfig,
  getPrescripDetail,
  processVideo
}
