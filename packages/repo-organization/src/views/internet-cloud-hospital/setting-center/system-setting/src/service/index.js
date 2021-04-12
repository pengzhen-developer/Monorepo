export default {
  /**
   * 获取系统设置
   *
   */
  getAutomaticAudit() {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getAutomaticAudit'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 设置系统设置
   *
   */
  setAutomaticAudit(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/setAutomaticAudit'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 设置系统设置
   *
   */
  isFirstClinicalVisit(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/isFirstClinicalVisit'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
