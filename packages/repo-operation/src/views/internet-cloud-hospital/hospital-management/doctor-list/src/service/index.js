export default {
  /**
   * 获取医生列表
   * @param {*} params
   */
  getDoctorList(params) {
    const apiPath = 'nethospital/operate/Doctor/lisDoctor'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  },
  /**
   * 获取医生信息
   * @param {*} params
   */
  getDoctorInfo(params) {
    const apiPath = 'nethospital/operate/Doctor/getDoctorInfo'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  },
  /**
   * 编辑医生信息
   * @param {*} params
   */
  editDoctorInfo(params) {
    const apiPath = 'nethospital/operate/doctor/editDoc'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取科室列表
   * @param {*} params
   */
  getDeptList(params) {
    const apiPath = 'nethospital/operate/Doctor/getDeptList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 更新医生状态
   * @param {*} params
   */
  upDoctorStatus(params) {
    const apiPath = 'nethospital/operate/Doctor/upDoctorStatus'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取多点执业详情信息
   * @param {*} params
   */
  getEntryDetail(params) {
    const apiPath = 'nethospital/operate/Doctor/getEntryDetail'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 查询一级科室
   * @param {*} params
   */
  getPlatDeptLevel1List(params) {
    const apiPath = 'nethospital/operate/department/getPlatDeptLevel1List'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  }
}
