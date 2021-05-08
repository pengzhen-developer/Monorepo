export default {
  /**
   * 查询及时号源
   *
   * @param {*} params
   */
  findTemporarySourceList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/findTemporarySourceList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 添加及时号源
   *
   * @param {*} params
   */
  addTemporarySource(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Register/addTemporarySource'
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
  }
}
