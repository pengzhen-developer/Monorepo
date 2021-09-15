export default {
  /**
   * 添加服务分账规则
   *
   * @param {*} params
   */
  addProfitsharingRule(params) {
    const apiPath = 'nethospital/operate/wechat_account/addProfitsharingRule'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 批量修改分账规则
   *
   * @param {*} params
   */
  editProfitsharingRule(params) {
    const apiPath = 'nethospital/operate/wechat_account/editProfitsharingRule'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 获取机构列表
   *
   * @param {*} params
   */
  getOrganizationList(params) {
    const apiPath = 'nethospital/operate/wechat_account/getOrganizationList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 分账人列表
   *
   * @param {*} params
   */
  getReceiverList(params) {
    const apiPath = 'nethospital/operate/wechat_account/receiverList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 分账规则列表
   *
   * @param {*} params
   */
  getProfitsharingRuleList(params) {
    const apiPath = 'nethospital/operate/wechat_account/profitsharingRuleList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  },
  /**
   * 删除分账规则
   *
   * @param {*} params
   */
  delProfitsharingRule(params) {
    const apiPath = 'nethospital/operate/wechat_account/delProfitsharingRule'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  }
}
