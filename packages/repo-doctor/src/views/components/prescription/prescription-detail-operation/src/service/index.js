/**
 * @description: 坚持使用处方
 * @param {*}
 * @return {*}
 */
export const usePrescription = (params) => {
  const isMock = false

  const apiPath = 'client/v1/Prescribeprescrip/usePrescription'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 作废处方
 * @param {*}
 * @return {*}
 */
export const voidPrescription = (params) => {
  const isMock = false

  const apiPath = 'client/v1/Prescribeprescrip/voidPrescription'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取处方来源
 * @param {*}
 * @return {*}
 */
export const getBackInfo = (params) => {
  const isMock = false

  const apiPath = 'client/v1/Prescribeprescrip/getBackInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  usePrescription,
  voidPrescription,
  getBackInfo
}
