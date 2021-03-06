export default {
  /**
   * 可选患者列表
   *
   */
  choicePatientList(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/choicePatientList'
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
  getPatientList() {
    const isMock = false

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
  addPatient(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/addMyPatient'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 发送处方
   *
   */
  sendRecipe(params) {
    const isMock = false

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
    const isMock = false

    const apiPath = 'client/face/prescription/prescribeprescrip/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  getPrescriptionDetail(params) {
    const isMock = false

    const apiPath = 'ehospital/center/prescription/getDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_CONVERGE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {
      params,
      // TODO:
      // 聚合层不需要 token，移除所有 token
      // 更好的办法是兼容 token
      transformRequest: (data, headers) => {
        delete headers.token
        delete headers.accesstoken
      }
    })
  },

  /**
   *
   * 获取患者的开方信息
   *
   */
  getBaseInfo(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/getBaseInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 确认发送处方
   *
   * @param {*} params
   */
  confirmSend(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/prescribeprescrip/confirmSend'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 患者搜索列表接口
   *
   */
  searchPatient(searchWord) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/searchPatient'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, { patientName: searchWord }).then((res) => {
      return res
    })
  },

  /**
   * 校验身份证合法性
   *
   * @param {*} params
   */
  checkIdCard(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/checkIdCard'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取面诊患者挂号列表
   *
   */
  getRegisterPatientList() {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/getRegList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   * 获取面诊挂号患者的数据详情
   *
   */
  getRegisterPatientRegDetail(params) {
    const isMock = false

    const apiPath = 'client/face/prescription/patient/getRegDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
