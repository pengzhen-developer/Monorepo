export default {
  /**
   * 获取处方列表
   *
   * @param {*} params
   */
  getPrescriptionList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/getPrescribeList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取处方详情
   *
   * @param {*} params
   */
  getPrescriptionDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/getPrescripInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取处方图片
   *
   * @param {*} params
   */
  getPrescriptionImage(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Returnvisit/getPrescriptionImage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
