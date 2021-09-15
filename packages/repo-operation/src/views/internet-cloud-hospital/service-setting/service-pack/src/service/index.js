export default {
  /**
   * 获取服务包列表接口
   *
   * @param {*} params
   */
  getServicePackageList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getServicePackageList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取服务包权益详情接口
   *
   * @param {*} params
   */
  getServicePackageInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getServicePackageInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取签约医院列表接口
   *
   * @param {*} params
   */
  getHosList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getHosList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取科室医生树形列表接口
   *
   * @param {*} params
   */
  getMainPartList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Servicepackage/getMainPartList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取权益字典列表接口
   *
   * @param {*} params
   */
  getEquitiesDictionaryList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getEquitiesDictionaryList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 根据服务包名称模糊获取列表接口
   *
   * @param {*} params
   */
  getServicePackageByName(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/getServicePackageByName'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 服务包新增接口
   *
   * @param {*} params
   */
  addServicePackage(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/addServicePackage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 删除服务包状态接口
   *
   * @param {*} params
   */
  deleteServicePackage(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/deleteServicePackage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 服务包编辑接口
   *
   * @param {*} params
   */
  editServicePackage(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/editServicePackage'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 服务包上下架状态修改接口
   *
   * @param {*} params
   */
  changeServicePackageSatus(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/servicepackage/changeServicePackageSatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
