export default {
  /**
   * 获取所有的子商户
   * @param {*} params
   */
  getSubMchList(params) {
    const apiPath = 'nethospital/operate/wechat_account/getSubMchList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 获取机构列表
   * @param {*} params
   */
  getOrganizationList(params) {
    const apiPath = 'nethospital/operate/wechat_account/getOrganizationList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 批量添加子商户号信息
   * @param {*} params
   */
  addSubMch(params) {
    const apiPath = 'nethospital/operate/wechat_account/addSubMch'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 批量更新子商户号信息
   * @param {*} params
   */
  updateSubMch(params) {
    const apiPath = 'nethospital/operate/wechat_account/updateSubMch'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 删除子商户号信息
   */
  delSubMch(params) {
    const apiPath = 'nethospital/operate/wechat_account/delSubMch'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 分账人列表
   * @param {*} params
   */
  receiverManage(params) {
    const apiPath = 'nethospital/operate/wechat_account/receiverManage'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 新增编辑分账人
   * @param {*} params
   */
  addReceiver(params) {
    const apiPath = 'nethospital/operate/wechat_account/addReceiver'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 删除分账人
   * @param {*} params
   */
  delReceiver(params) {
    const apiPath = 'nethospital/operate/wechat_account/delReceiver'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 查询机构下的特约商户
   * @param {*} params
   */
  getMchByCustCode(params) {
    const apiPath = 'nethospital/operate/wechat_account/getMchByCustCode'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  }
}
