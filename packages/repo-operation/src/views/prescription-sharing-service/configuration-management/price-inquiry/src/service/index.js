export default {
  /**
   * 价格配置查询
   *
   * @param {*} params
   * @returns {Object}
   */
  GetPriceAuthority(params) {
    const isMock = false

    const apiPath = 'psd/DrugStock/GetPriceAuthority'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取医疗机构字典
   *
   * @param {*} params
   * @returns {Object}
   */
  GetCustByCirculation() {
    const isMock = false

    const apiPath = 'psd/Cust/GetCustByCirculation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },

  /**
   * 根据医疗机构编码获取药品供应方编码
   *
   * @param {*} params
   * @returns {Object}
   */
  GetTargetCustCodeByCustCode(params) {
    const isMock = false

    const apiPath = 'psd/HospitalConf/GetTargetCustCodeByCustCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存价格配置接口
   *
   * @param {*} params
   * @returns {Object}
   */
  SavePriceAuthority(params) {
    const isMock = false

    const apiPath = 'psd/DrugStock/SavePriceAuthority'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除配置接口
   *
   * @param {*} params
   * @returns {Object}
   */
  DeletePriceAuthority(params) {
    const isMock = false

    const apiPath = 'psd/DrugStock/DeletePriceAuthority'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
