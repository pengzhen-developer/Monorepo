export default {
  /**
   * 获取转出列表
   *
   * @param {*} params
   */
  getReferralOutList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/outReferralList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取转诊详情
   *
   * @param {*} params
   */
  getReferralDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/referralInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 转诊审核
   *
   * @param {*} params
   */
  examineReferral(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/examineReferral'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
