export default {
  /**
   * 获取二级科室列表接口
   *
   * @param {*} params
   */
  getSecondDept(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getSecondDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医生排序列表
   *
   * @param {*} params
   */
  getSortDoctorList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/getSortDoctorList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 设置推荐医生
   *
   * @param {*} params
   */
  setRecommendDoctor(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/setRecommendDoctor'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 排序医生
   *
   * @param {*} params
   */
  sortDoctor(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/sortDoctor'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
