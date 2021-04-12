export default {
  /**
   * 获取H5信息
   *
   */
  getWechatH5() {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/getWechatH5'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },
  /**
   * 生成机构H5页面
   *
   */
  createWechatH5() {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Hospital/createWechatH5'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  }
}
