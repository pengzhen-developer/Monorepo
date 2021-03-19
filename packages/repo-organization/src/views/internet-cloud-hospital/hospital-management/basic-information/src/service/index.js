export default {
  /**
   * 获取医院信息
   *
   */
  getHospitalInfo() {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 编辑医院信息
   *
   * @param {*} params
   */
  updateHospitalInfo(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1//hospital/editOperateHospital'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
