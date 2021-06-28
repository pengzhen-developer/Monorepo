export default {
  /**
   * 获取省市区列表
   * @param {*} params
   */
  getAreaList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/getAreaList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取入驻列表
   * @param {*} params
   */
  getEntryList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/getEntryList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取互联网医院列表
   * @param {*} params
   */
  getOrgList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/getOrgList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除区域
   * @param {*} params
   */
  delEntryList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/delEntryList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 添加入驻区域信息
   * @param {*} params
   */
  addEntryArea(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/addEntryArea'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 添加入驻机构
   * @param {*} params
   */
  addEntryOrg(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/addEntryOrg'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除机构
   * @param {*} params
   */
  delEntryOrg(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Entry/delEntryOrg'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
