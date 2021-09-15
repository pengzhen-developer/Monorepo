export default {
  /**
   * 个人信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getUserInformations(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/GetUserInformations'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改基本信息
   *
   * @param {string} CertificateImage 证书扫描件（Base64）
   * @param {string} CertificateImageFileSuffix 证书扫描件文件后缀
   * @param {string} CertificateCode 证书编号
   * @param {string} QualificationsLevel 资质级别
   * @param {string} ProveType 任职资格类型
   *
   * @returns {Object}
   */
  updateInformations(params) {
    const isMock = false

    const apiPath = 'webapi/api/Customer/UpdInformation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 发送验证码
   *
   * @param {string} ManagerPhone 手机号
   *
   * @returns {Object}
   */
  sendSms(params) {
    const isMock = false

    const apiPath = 'webapi/api/Register/ActivationSMS'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 发送验证码
   *
   * @param {string} Phone 手机号
   * @param {string} SMSCode 验证码
   *
   * @returns {Object}
   */
  modifyPhoneNum(params) {
    const isMock = false

    const apiPath = 'webapi/api/Register/ActivationSMS'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改账号以及密码
   *
   * @param {string} Phone 手机号
   * @param {string} SMSCode 验证码
   * @param {string} Pwd 旧密码
   * @param {string} NewPwd 新密码
   *
   * @returns {Object}
   */
  modifyAccount(params) {
    const isMock = false

    const apiPath = 'webapi/api/User/UpdatePersonalCenter'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 同步医师资料给医网信
   *
   *
   */
  updateYwqStatus() {
    const isMock = false

    const apiPath = 'webapi/api/User/RequestYwq'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, {}).then((res) => {
      return res
    })
  }
}
