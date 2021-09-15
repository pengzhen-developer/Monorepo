export default {
  /**
   * 查询诊断库列表
   *
   * @param {*} params
   */
  getDiagnoseList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/diagnose/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 常见诊断编辑接口
   *
   * @param {*} params
   */
  editDiagnose(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/diagnose/editDiagnose'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
