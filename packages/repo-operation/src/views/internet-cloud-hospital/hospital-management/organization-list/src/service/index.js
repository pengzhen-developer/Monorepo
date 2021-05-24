export default {
  /**
   * 获取互联网医院列表
   * @param {*} params
   */
  getOrgList(params) {
    const apiPath = 'nethospital/operate/Hospital/hosList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  },
  /**
   * 互联网医院状态
   * @param {*} params
   */
  upOrgStatus(params) {
    const apiPath = 'nethospital/operate/Hospital/upOrgStatus'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取当前服务协议列表接口
   *
   * @param {*} params
   * @returns {Object}
   */
  getServiceList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getServiceList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增机构服务协议
   *
   * @param {*} params
   * @returns {Object}
   */
  addServiceInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/addServiceInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取单条服务详情信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getOneService(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getOneService'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 编辑机构服务协议
   *
   * @param {*} params
   * @returns {Object}
   */
  editService(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/editService'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 协议状态开关接口
   *
   * @param {*} params
   * @returns {Object}
   */
  operateStatus(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/operateStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取签约列表接口
   *
   * @param {*} params
   * @returns {Object}
   */
  getSignList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/order/getSignList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
