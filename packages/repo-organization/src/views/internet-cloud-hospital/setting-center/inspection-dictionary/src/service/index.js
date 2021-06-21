export default {
  /**
   * 获取项目字典列表
   *
   * @param {*} params
   */
  getCheckItemList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getCheckItemList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新建项目字典
   *
   * @param {*} params
   */
  addCheckItem(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/addCheckItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 编辑项目字典
   *
   * @param {*} params
   */
  editCheckItem(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/editCheckItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取项目字典名称简称
   *
   * @param {*} params
   */
  getAbbreviation(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getAbbreviation'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取项目字典详情
   *
   * @param {*} params
   */
  getCheckItemInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getCheckItemInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 项目字典停用启用
   *
   * @param {*} params
   */
  operateStatus(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/operateStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 组套字典列表的二级科室
   *
   * @param {*} params
   */
  getDeptList() {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getDeptList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 获取组套字典列表
   *
   * @param {*} params
   */
  getCheckComboList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getCheckComboList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取组套字典详情
   *
   * @param {*} params
   */
  getcheckComboInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getcheckComboInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 组套字典新增
   *
   * @param {*} params
   */
  addCheckCombo(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/addCheckCombo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 组套字典编辑
   *
   * @param {*} params
   */
  editCheckCombo(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/editCheckCombo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 组套字典启用，停用
   *
   * @param {*} params
   */
  operateCheckComboStatus(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/operateCheckComboStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
