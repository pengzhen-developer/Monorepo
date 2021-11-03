/**
 * @description: 发送消息提醒（小程序订阅消息）
 * @param {*} params
 * @return {*}
 */
export function sendSubscribeMsg(params) {
  const isMock = false

  const apiPath = 'client/v1/Notification/sendSubscribeMsg'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取预约列表
 * @param {*} params
 * @return {*}
 */
export function getReservationList(params) {
  const isMock = false

  const apiPath = 'client/v1/returnvisit/getReservationList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 接诊
 * @param {*} params
 * @return {*}
 */
export function receiveInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/patient/receiveInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

/**
 * @description: 结束问诊
 * @param {*} params
 * @return {*}
 */
export function overInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/patient/overInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 退诊
 * @param {*} params
 * @return {*}
 */
export function quitInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/patient/quitInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 校验会话有效性
 * @param {*} params
 * @return {*}
 */
export function checkOverInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/patient/checkOverInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 检查当前咨询能否发送处方
 * @param {*} params
 * @return {*}
 */
export function checkSendPRStatus(params) {
  const isMock = false

  const apiPath = 'client/prescription/patient/getHistoryRegisteringInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

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
 * @description: 获取健康档案
 * @param {*} params
 * @return {*}
 */
export function getOneHealth(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getOneHealth'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  sendSubscribeMsg,
  getReservationList,
  receiveInquiry,
  overInquiry,
  quitInquiry,
  checkOverInquiry,
  checkSendPRStatus,
  getCaseDetail,
  getOneHealth
}
