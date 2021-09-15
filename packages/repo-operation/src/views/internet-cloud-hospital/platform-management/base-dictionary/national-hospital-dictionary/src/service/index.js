export default {
  /**
   * 获取医院列表
   * @param {*} params
   */
  getNationalList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/getHospital'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 医院列表详情
   * @param {*} params
   */
  detailHospital(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/detailHospital'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 医院列表详情
   * @param {*} params
   */
  editHospital(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/maintain/editHospital'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
