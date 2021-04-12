export default {
  /**
   * 获取医生列表
   *
   * @param {*} params
   */
  getDoctorList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getDoctor'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取医生信息
   *
   * @param {*} params
   */
  getDoctorInfo(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getDoctorDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取多点执业详情信息
   *
   * @param {*} params
   */
  getEntryDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getEntryDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 更新医生状态
   *
   * @param {*} params
   */
  upDoctorStatus(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Doctor/upDoctorStatus'
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
    const apiPath = 'nethospital/hospital/v1/doctor/getDeptList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 编辑医生信息
   *
   * @param {*} params
   */
  editDoctorInfo(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/editDoc'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
