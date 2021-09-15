export default {
  /**
   * 获取患者列表
   *
   * @param {*} params
   */
  getPatientList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getPatientWC'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
