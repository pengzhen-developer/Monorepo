export default {
  /**
   * 获取药品列表
   *
   * @param {*} params
   */
  getDrugList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drug/getDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 更新药品状态
   *
   * @param {*} params
   */
  updateDrugStatus(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drug/operateStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 添加药品
   *
   * @param {*} params
   */
  addDrug(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drug/addDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 检查药品编号是否存在
   *
   * @param {*} params
   */
  checkDrugNumber(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drug/checkDrugNumber'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 更新药品
   *
   * @param {*} params
   */
  updateDrug(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drug/editDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 批量编辑
   *
   * @param {*} params
   */
  batchDrug(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Drug/batchDrug'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
