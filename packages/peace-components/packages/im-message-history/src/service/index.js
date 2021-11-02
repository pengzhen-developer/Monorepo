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
 * @description:  获取首次诊疗记录列表
 * @param {*} params
 * @return {*}
 */
export function getFirstOptionList(params) {
  const isMock = false

  const apiPath = 'client/his/v060/record/getFirstOptionList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取首次诊疗记录详情
 * @param {*} params
 * @return {*}
 */
export function getFirstOptionDetail(params) {
  const isMock = false

  const apiPath = 'client/his/v060/record/getFirstOptionDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getCaseDetail,
  getPrescripDetail,
  getFirstOptionList,
  getFirstOptionDetail
}
