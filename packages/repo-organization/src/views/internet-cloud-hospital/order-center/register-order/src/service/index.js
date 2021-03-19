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
   * 开通挂号
   *
   * @param {*} params
   */
  openRegister(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/openRegister'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 挂号配置
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
   * 获取挂号订单列表
   *
   * @param {*} params
   */
  getRegisterOrderList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/getOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取二级科室列表
   *
   * @param {*} params
   */
  getDepartmentList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/returnvisit/getDeptByOrgId'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
