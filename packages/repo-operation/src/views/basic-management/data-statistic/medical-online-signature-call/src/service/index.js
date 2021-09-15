export default {
  /**
   * 医网签调用记录
   * @param {*} params
   */
  getLogListByYwq(params) {
    const isMock = false

    const apiPath = 'zyyoperate/operate/Log/getLogListByYwq'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
