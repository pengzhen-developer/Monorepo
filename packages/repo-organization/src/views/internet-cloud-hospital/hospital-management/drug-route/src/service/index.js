export default {
  /**
   * 获取给药途径列表
   *
   * @param {*} params
   */
  getDrugwayGetList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugway/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 添加给药途径
   *
   * @param {*} params
   */
  addDrugway(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugway/add'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改给药途径
   *
   * @param {*} params
   */
  editDrugway(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugway/edit'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 删除给药途径
   *
   * @param {*} params
   */
  delDrugway(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugway/del'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 设置启用停用
   *
   * @param {*} params
   */
  setStatus(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugway/setStatus'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
