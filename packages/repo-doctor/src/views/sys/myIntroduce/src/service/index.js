/**
 * @description: 获取医生信息
 * @param {*} params
 * @return {*}
 */
export function getDoctorInfo(params) {
  const isMock = false

  const apiPath = 'client/v1/Personalcenter/getDoctorInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params })
}

/**
 * @description: 更新医生介绍
 * @param {*} params
 * @return {*}
 */
export function upDoctorIntroduce(params) {
  const isMock = false

  const apiPath = 'client/v1/Personalcenter/upDoctorIntroduce'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getDoctorInfo,
  upDoctorIntroduce
}
