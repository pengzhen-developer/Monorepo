export default {
  /**
   * 获取医生列表
   * @param {*} params
   */
  getDoctors(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/maintain/doctorList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医生信息
   * @param {*} params
   */
  getDoctorDetail(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/maintain/doctorDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑医生信息
   * @param {*} params
   */
  editDoctorDetail(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/maintain/editBaseDoctor'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
