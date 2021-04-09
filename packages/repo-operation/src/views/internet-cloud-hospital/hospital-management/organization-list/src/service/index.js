export default {
  /**
   * 获取互联网医院列表
   * @param {*} params
   */
  getOrgList(params) {
    const apiPath = 'nethospital/operate/Hospital/hosList'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.get(requestApi, { params })
  },
  /**
   * 互联网医院状态
   * @param {*} params
   */
  upOrgStatus(params) {
    const apiPath = 'nethospital/operate/Hospital/upOrgStatus'
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = serverPath
    return Peace.http.post(requestApi, params)
  }
}
