export default {
  /**
   * 完善信息
   *
   * @param {*} params
   */
  updateBaseInfo(params) {
    const isMock = false

    const apiPath = 'hospital/v070/Account/updateBaseInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取用户信息
   *
   * @param {*} params
   */
  getAccountInfo(params) {
    const isMock = false

    const apiPath = 'hospital/v070/Account/getAccountInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 上传图片
   *
   * @param {*} params
   */
  uploadImage(params) {
    const isMock = false

    const apiPath = 'hospital/Account/uploadImage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, params, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        return res
      })
  },
  /**
   * 省市区
   *
   * @param {*} params
   */
  getRegion() {
    const isMock = false

    const apiPath = 'hospital/Area/list'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },

  /**
   * 获取医院等级列表接口
   *
   * @param {*} params
   */
  getHosLevelList(params) {
    const isMock = false

    const apiPath = 'hospital/v070/account/getHosLevelList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医院类型一级列表
   *
   * @param {*} params
   */
  getHosTypeList(params) {
    const isMock = false

    const apiPath = 'hospital/v070/account/getHosTypeList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医院类型子集列表接口
   *
   * @param {*} params
   */
  getHosTypeChildrenList(params) {
    const isMock = false

    const apiPath = 'hospital/v070/account/getHosTypeChildrenList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
