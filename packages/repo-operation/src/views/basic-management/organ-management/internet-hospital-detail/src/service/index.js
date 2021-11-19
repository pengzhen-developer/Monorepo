export default {
  /**
   * 获取互联网医院详情
   *
   * @param {*} params
   */
  getOrgDetail(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/getOrgInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑互联网医院
   *
   * @param {*} params
   */
  editOrgDetail(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/editOperateHospital'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取科室信息
   *
   * @param {*} params
   */
  getDepartList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/department/departmentList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
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
  },

  /**
   * 编辑科室
   *
   * @param {*} params
   */
  editDepartment(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Department/editDept'
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

    const apiPath = 'nethospital/operate/department/setCharacteristicDept'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询平台科室
   *
   * @param {*} params
   */
  getPlatList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/department/getPlatList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询二级科室
   *
   * @param {*} params
   */
  getLevel2DeptList(params) {
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
   * 查询一级科室
   *
   * @param {*} params
   */
  getDeptList(params) {
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
   * 查询药品列表
   *
   * @param {*} params
   */
  getDrugList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Hospital/drugList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 修改药品状态
   *
   * @param {*} params
   */
  operateDrugStatus(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/operateStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查看药品详情
   *
   * @param {*} params
   */
  getDrugDetails(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/getDrugInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 判断药品编号存在
   *
   * @param {*} params
   */
  checkDrugNumber(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/checkDrugNumber'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 新增药品数据
   *
   * @param {*} params
   */
  saveDrugModel(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/hospital/addDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 更新药品数据
   *
   * @param {*} params
   */

  updateDrugModel(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/editDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 给药频次列表
   *
   * @param {*} params
   */

  getDrugFrequencyList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/drugtimesList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 查询给药频次库
   *
   * @param {*} params
   */

  getAllDrugFrequency(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Drug/getDrugTimes'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增给药频次库
   *
   * @param {*} params
   */

  addDrugFrequency(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/addDrugtimes'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 给药途径列表
   *
   * @param {*} params
   */

  getDrugWayList(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/drugwayList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取给药途径库
   *
   * @param {*} params
   */

  getAllDrugWay(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/Drug/getDrugWay'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增给药频次库
   *
   * @param {*} params
   */

  addDrugWay(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/drug/addDrugway'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   *
   * @param {*} params
   */

  lists(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/wechat_account/lists'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 小程序列表
   *
   * @param {*} params
   */

  programLists(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/AppletConfig/lists'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * @param {*} params
   */

  insertData(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/wechat_account/insertData'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 添加小程序配置
   *
   * @param {*} params
   */
  programInsertData(params) {
    const isMock = false

    const apiPath = 'nethospital/operate/AppletConfig/insertData'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
