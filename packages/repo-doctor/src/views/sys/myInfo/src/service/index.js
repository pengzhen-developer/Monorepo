/**
 * @description: 获取医生信息
 * @param {*} params
 * @return {*}
 */
export function getDoctorInfo(params) {
  const getDoctorInfo = 'client/v1/Personalcenter/getDoctorInfo'

  return Peace.http.get(getDoctorInfo, { params })
}

/**
 * @description: 更新医生个人信息
 * @param {*} params
 * @return {*}
 */
export function upDoctorInfo(params) {
  const upDoctorInfo = 'client/v1/Personalcenter/upDoctorInfo'

  return Peace.http.post(upDoctorInfo, params)
}

/**
 * @description: 更新医生介绍
 * @param {*} params
 * @return {*}
 */
export function upDoctorIntroduce(params) {
  const upDoctorIntroduce = 'client/v1/Personalcenter/upDoctorIntroduce'

  return Peace.http.post(upDoctorIntroduce, params)
}

/**
 * @description: 获取验证码
 * @param {*} params
 * @return {*}
 */
export function getSmsCode(params) {
  const isMock = false

  const apiPath = 'client/v1/Personalcenter/getSmsCode'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

/**
 * @description: 校验验证码有效性
 * @param {*} params
 * @return {*}
 */
export function checkOldSmsCode(params) {
  const isMock = false

  const apiPath = 'client/v1/Personalcenter/checkOldSmsCode'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

/**
 * @description: 修改手机号
 * @param {*} params
 * @return {*}
 */
export function updateTel(params) {
  const isMock = false

  const apiPath = 'client/v1/Personalcenter/updateTel'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

export default {
  getDoctorInfo,
  upDoctorInfo,
  upDoctorIntroduce,
  getSmsCode,
  checkOldSmsCode,
  updateTel
}
