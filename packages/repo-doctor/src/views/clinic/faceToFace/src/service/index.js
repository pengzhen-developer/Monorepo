export default {
  /**
   * 获取患者列表
   *
   */
  getPatientList() {
    const isMock = true

    const apiPath = 'client/face/prescription/patient/getMyList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   * 添加患者
   *
   * * @param {string} idcard 身份证
   * * @param {string} name 姓名
   * * @param {string} sex 性别
   * * @param {string} age 年龄
   * * @param {string} tel 手机号
   */
  addPatientList(params) {
    const isMock = true

    const apiPath = 'client/face/prescription/patient/addMyPatient'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取患者列表
   *
   */
  sendRecipe(params) {
    const isMock = true

    const apiPath = 'client/face/prescription/prescribeprescrip/submit'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取面诊处方列表
   *
   */
  getRecipeList(params) {
    const isMock = true

    const apiPath = 'client/face/prescription/prescribeprescrip/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *
   * 获取患者的开方信息
   *
   */
  getBaseInfo(params) {
    const isMock = true

    const apiPath = 'client/face/prescription/patient/getBaseInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
