export default {
  /**
   * 获取所有的子商户
   * @param {*} params
   */
  getSubMchList(params) {
    const apiPath = 'nethospital/operate/WechatAccount/getSubMchList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 获取机构列表
   * @param {*} params
   */
  getOrganizationList(params) {
    const apiPath = 'nethospital/operate/WechatAccount/getOrganizationList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 批量添加子商户号信息
   * @param {*} params
   */
  addSubMch(params) {
    const apiPath = 'nethospital/operate/WechatAccount/addSubMch'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 批量更新子商户号信息
   * @param {*} params
   */
  updateSubMch(params) {
    const apiPath = 'nethospital/operate/WechatAccount/updateSubMch'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 删除子商户号信息
   */
  delSubMch(params) {
    const apiPath = 'nethospital/operate/WechatAccount/delSubMch'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },

  /**
   * 分账人列表
   * @param {*} params
   */
  receiverManage(params) {
    const apiPath = 'nethospital/operate/WechatAccount/receiverManage'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 新增编辑分账人
   * @param {*} params
   */
  addReceiver(params) {
    const apiPath = 'nethospital/operate/WechatAccount/addReceiver'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 删除分账人
   * @param {*} params
   */
  delReceiver(params) {
    const apiPath = 'nethospital/operate/WechatAccount/delReceiver'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 查询机构下的特约商户
   * @param {*} params
   */
  getMchByCustCode(params) {
    const apiPath = 'nethospital/operate/WechatAccount/getMchByCustCode'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  }
}
