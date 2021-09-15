export default {
  /**
   * 获取医院列表
   * @param {*} params
   */
  getHospitals(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/getDeptList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取医院科室信息
   * @param {*} params
   */
  getDepartmentInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/getDeptInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 编辑医院科室信息
   * @param {*} params
   */
  editDepartmentInfo(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/maintain/editDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询平台科室
   * @param {*} params
   */
  getPlatList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/department/getPlatList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取一级科室
   *
   * @param {*} params
   */
  getLevel1DepartmentList(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/department/getPlatDeptLevel1List'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取二级科室
   *
   * @param {*} params
   */
  getLevel2DepartmentList(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/department/getPlatDeptLevel2List'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 添加科室
   *
   * @param {*} params
   */
  addDepartment(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Department/addDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
