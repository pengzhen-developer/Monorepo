export default {
  /**
   * 新增服务
   * @param {name} string 权益名称
   * @param {type} string 业务类别
   *
   */
  addServices(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/servicepackage/addEquitiesDictionary'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取权益字典列表
   * @param {name} string 权益名称
   * @param {type} number 业务类别  1：在线咨询
   * @param {status} number 1：启用   2：停用
   *
   */
  getServiceList(params) {
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
   * 修改服务
   * @param {equitiesDictionaryId} string 权益字典id
   * @param {name} string 权益名称
   * @param {type} string 业务类别
   *
   */
  editServices(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/servicepackage/editEquitiesDictionary'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改服务状态
   * @param {status} number 1：启用   2：停用
   *
   */
  modifyServicesStatus(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/servicepackage/changeStatusByDictionary'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
