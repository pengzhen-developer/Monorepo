export default {
  /**
   * 获取检查项目列表
   *
   * @param {*} params
   */
  getItemOrderList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getItemOrderList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取一级项目
   *
   * @param {*} params
   */
  getParentList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getParentList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取二级项目
   *
   * @param {*} params
   */
  getChilds(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getChilds'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取检查项目详情
   *
   * @param {*} params
   */
  getProjectDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getItemOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 添加检查项目
   *
   * @param {*} params
   */
  addItemOrder(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/addItemOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 编辑检查项目
   *
   * @param {*} params
   */
  editItemOrder(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/editItemOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 删除检查项目
   *
   * @param {*} params
   */
  delItemOrder(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/delItemOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取项目级别列表
   *
   */
  getItemList() {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/getItemList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 添加项目级别
   *
   * @param {*} params
   */
  addItem(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/addItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 编辑项目级别
   *
   * @param {*} params
   */
  editItem(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/editItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 删除项目级别
   *
   * @param {*} params
   */
  deleteItem(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/deleteItem'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 上传项目图片
   *
   * @param {*} params
   */
  uploadImages(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/doctor/uploadImages'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
