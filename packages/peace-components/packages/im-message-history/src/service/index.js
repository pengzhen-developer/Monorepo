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
export function getPrescriptionDetail(params) {
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
 * @description: 获取首次诊疗记录详情
 * @param {*} params
 * @return {*}
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

export default {
  getCaseDetail,
  getPrescriptionDetail,
  getFirstOptionList,
  getFirstOptionDetail
}
