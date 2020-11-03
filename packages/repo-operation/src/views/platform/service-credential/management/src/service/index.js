export default {
  /**
   * 凭证管理列表
   * @param {*} params
   */
  getConfiguretoselfList(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configuretoself/list'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 凭证管理保存
   * @param {*} params
   */
  configuretoselfSave(params) {
    const isMock = false

    const apiPath = 'zyy-psd/configuretoself/save'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除凭证
   * @param {*} params
   */
  configuretoselfRemove(params) {
    const isMock = false

    const apiPath = `zyy-psd/configuretoself/remove/${params.id}`
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.delete(requestApi, {}).then((res) => {
      return res
    })
  }
}
