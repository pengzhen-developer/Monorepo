export default {
  /**
   * 获取科室
   *
   * @param {*} params
   */
  getDepartment(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getDepartment'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取一级科室列表信息
   *
   * @param {*} params
   */
  getParentDeptList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getParentDeptList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 一级科室拖拽排序接口
   *
   * @param {*} params
   */
  editParentDeptSort(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/editParentDeptSort'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 设置特色科室
   *
   * @param {*} params
   */
  setSpecDepartment(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/setCharacteristicDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
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
    const apiPath = 'nethospital/hospital/v1/Hospital/getPlatDeptLevel1List'
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
    const apiPath = 'nethospital/hospital/v1/Hospital/getPlatDeptLevel2List'
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
    const apiPath = 'nethospital/hospital/v1/Hospital/addDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 编辑科室
   *
   * @param {*} params
   */
  editDepartment(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/editDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
