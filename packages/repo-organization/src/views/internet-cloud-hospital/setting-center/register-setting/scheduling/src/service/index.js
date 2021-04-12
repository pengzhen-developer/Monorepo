export default {
  /**
   * 检查是否开通挂号
   *
   * @param {*} params
   */
  checkRegisterOpen(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/isOpenRegister'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取预约挂号配置
   *
   * @param {*} params
   */
  getRegisterSetting(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/getBasicsSetInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取科室列表
   *
   * @param {*} params
   */
  getDeptList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/realDeptList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 预约挂号配置
   *
   * @param {*} params
   */
  registerSetting(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/syncHospitalAndDepartment'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取科室医生列表
   *
   * @param {*} params
   */
  getDoctorByDept(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/getDoctorListByDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取排班
   *
   * @param {*} params
   */
  getDoctorScheduling(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/queryScheduling'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 设置排班
   *
   * @param {*} params
   */
  setDoctorScheduling(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/syncDoctorSchedule'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
