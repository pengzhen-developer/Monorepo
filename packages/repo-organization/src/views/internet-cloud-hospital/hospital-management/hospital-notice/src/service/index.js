export default {
  /**
   * 获取通知公告列表
   *
   * @param {*} params
   */
  getHospitalNotice(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/getNoticeList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 创建医院通知
   *
   * @param {*} params
   */
  createNotice(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/addNotice'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取医院通知详情
   *
   * @param {*} params
   */
  getNoticeDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/hospital/getNoticeDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
