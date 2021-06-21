export default {
  /**
   * 获取检验项目列表
   *
   * @param {*} params
   */
  getComboItemList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/getComboItemList'
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
   * 移除检验项目的某个检查项
   *
   * @param {*} params
   */
  removeComboItem(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/removeComboItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 检验项目停启用操作
   *
   * @param {*} params
   */
  operateComboItem(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/operateComboItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 下拉获取组件套列表
   *
   * @param {*} params
   */
  getCheckComboList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/checkComboList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 下拉获取检查名称
   *
   * @param {*} params
   */
  getCheckItemList(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/checkItemList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 检验项目名称新增
   *
   * @param {*} params
   */
  addComboItem(params) {
    const isMock = false

    const apiPath = 'nethospital/hospital/v1/checkorder/addComboItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
