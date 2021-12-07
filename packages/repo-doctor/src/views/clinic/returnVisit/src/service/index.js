/**
 * 发送消息提醒（小程序订阅消息）
 *
 * @param {*} params
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
 * 【个性化需求】获取天津北辰医保就医记录基础信息
 *
 * @param {*} params
 */
export function getExtDllInfo(params) {
  const isMock = false

  const apiPath = 'client/v1/inquiry/getExtDllInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 【个性化需求】通过接口调起第三方 DLL
 *
 * @param {*} params
 */
export function invokeExtDLL(params) {
  const isMock = false

  const apiPath = 'client/v1/inquiry/invokeExtDLL'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 获取预约列表
 *
 * @param {*} params
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
 * 接诊
 *
 * @param {*} params
 */
export function receiveInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/patient/receiveInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 结束
 *
 * @param {*} params
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
 * 退诊
 *
 * @param {*} params
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
 * 检查会话有效性
 *
 * @param {*} params
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
 * 获取病历详情
 *
 * @param {*} params
 */
export function getCase(params) {
  const isMock = false

  const apiPath = 'client/v1/inquiry/getCase'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 获取健康档案
 *
 * @param {*} params
 */
export function getOneHealth(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getOneHealth'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * 获取诊疗记录列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFirstOptionList(params) {
  const isMock = false

  const apiPath = 'ehospital/center/record/getFirstOptionList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  // TODO:
  // 聚合层不需要 token，移除所有 token
  // 更好的办法是兼容 token
  return Peace.http.post(requestApi, params, {
    headers: {
      'content-type': 'application/json'
    },
    transformRequest: [
      function(data, headers) {
        delete headers.accesstoken

        return JSON.stringify(data)
      }
    ]
  })
}

/**
 * 获取诊疗记录详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFirstOptionDetail(params) {
  const isMock = false

  const apiPath = 'ehospital/center/record/getFirstOptionDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  // TODO:
  // 聚合层不需要 token，移除所有 token
  // 更好的办法是兼容 token
  return Peace.http.post(requestApi, params, {
    headers: {
      'content-type': 'application/json'
    },
    transformRequest: [
      function(data, headers) {
        delete headers.accesstoken

        return JSON.stringify(data)
      }
    ]
  })
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
 * 获取健康档案
 *
 * @param {*} params
 */
export function getBeforeUrl(params) {
  const isMock = false

  const apiPath = 'client/v1/Beforehand/getBeforeUrl'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  sendSubscribeMsg,
  getExtDllInfo,
  invokeExtDLL,
  getReservationList,
  receiveInquiry,
  overInquiry,
  quitInquiry,
  checkOverInquiry,
  getCase,
  getCaseDetail,
  getOneHealth,
  getFirstOptionList,
  getFirstOptionDetail,
  getBeforeUrl
}
