export default {
  /**
   * 获取用药频次列表
   *
   * @param {*} params
   */
  getDrugtimesGetList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugtimes/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 添加用药频次
   *
   * @param {*} params
   */
  addDrugtimes(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugtimes/add'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改用药频次
   *
   * @param {*} params
   */
  editDrugtimes(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugtimes/edit'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 删除用药频次
   *
   * @param {*} params
   */
  delDrugtimes(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drugtimes/del'
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
    const apiPath = 'nethospital/hospital/v1/Drugtimes/setStatus'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
