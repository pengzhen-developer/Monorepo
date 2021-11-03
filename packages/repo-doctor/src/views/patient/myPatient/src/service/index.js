/**
 * @description: 校验身份证合法性
 * @param {*} params
 * @return {*}
 */
export function checkIdCard(params) {
  const isMock = false

  const apiPath = 'client/face/prescription/patient/checkIdCard'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取患者来源 - 字典
 * @param {*} params
 * @return {*}
 */
export function getSource(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/getSource'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取民族 - 字典
 * @param {*} params
 * @return {*}
 */
export function getNationList(params) {
  const isMock = false

  const apiPath = '/client/v1/Patient/getNationList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取我的患者列表
 * @param {*} params
 * @return {*}
 */
export function patientListPc(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/patientListPc'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 添加我的患者
 * @param {*} params
 * @return {*}
 */
export function addPatient(params) {
  const isMock = false

  const apiPath = '/client/face/prescription/patient/addMyPatient'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  checkIdCard,
  getSource,
  getNationList,
  patientListPc,
  addPatient
}
