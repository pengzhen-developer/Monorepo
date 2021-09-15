export default {
  /**
   * 获取医生列表
   * @param {*} params
   */
  getDepartments(params) {
    const apiPath = 'nethospital/operate/department/platformDeptList'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 获取医生列表
   * @param {string} imageName
   * @param {string} usageScenarios
   */
  getImages(imageName, usageScenarios) {
      const apiPath = 'nethospital/operate/department/getGalleryList'
      const requestApi = process.env.VUE_APP_API_BASE + apiPath
      return Peace.http.post(requestApi, {imageName, usageScenarios})
    },

  /**
   * 新增科室
   * @param {string} params.deptName 科室名称
   * @param {string} params.attribute 科室属性
   * @param {string} params.displayPosition 展示位置
   * @param {string} params.imgUrl 图片地址
   */
  addData(params) {

    const apiPath = 'nethospital/operate/department/addPlatformDept'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 编辑科室
   * @param {string} params.deptId 科室ID
   * @param {string} params.deptName 科室名称
   * @param {string} params.attribute 科室属性
   * @param {string} params.displayPosition 展示位置
   * @param {string} params.imgUrl 图片地址
   */
  modifyData(params) {

    const apiPath = 'nethospital/operate/department/editPlatformDept'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 批量排序更新
   * @param {*} platDeptList
   */
  updateSorts(platDeptList) {
    const apiPath = 'nethospital/operate/department/editPlatDeptDragSort'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, platDeptList)

  }
}
