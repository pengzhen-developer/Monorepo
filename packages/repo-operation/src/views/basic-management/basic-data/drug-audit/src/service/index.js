export default {
  /**
   * 获取审批数据
   * @param {*} params
   */
  GetJntDrugsInfo(params) {
    const apiPath = 'psd/JntDrug/GetJntDrugsInfo'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 根据 ID 获取单条审批数据
   * @param {*} params
   */
  GetJntDrugsInfoById(params) {
    const apiPath = 'psd/JntDrug/GetJntDrugsInfoById'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 提交包装规格审批
   * @param {*} params
   */
  SaveJntDrugsInfo(params) {
    const apiPath = 'psd/JntDrug/SaveJntDrugsInfo'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  }
}
