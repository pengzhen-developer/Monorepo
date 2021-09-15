export default {
  /**
   * 凭证分配列表
   * @param {*} params
   */
  getConfigureList(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configure/list'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存凭证分配
   * @param {*} params
   */
  configureSave(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configure/save'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改凭证启用状态
   * @param {*} params
   */
  updateStatus(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configure/updateStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取字典接口
   * @param {*} params
   */
  getDictType(params) {
    const isMock = false

    const apiPath = `admin/dict/type/${params.type}`
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, {}).then((res) => {
      return res
    })
  },

  /**
   * 获取机构数据接口
   * @param {*} params
   */
  getCustByVoucher(params) {
    const isMock = false

    const apiPath = 'psd/Cust/GetCustByVoucher'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
