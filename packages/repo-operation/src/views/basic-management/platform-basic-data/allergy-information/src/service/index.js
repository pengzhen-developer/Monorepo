export default {
  /**
   * 获取过敏信息列表
   *
   * @param {*} params
   */
  getList(params) {
    const isMock = false

    const apiPath = 'platformAllergyInfo/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增过敏信息
   *
   * @param {*} params
   */
  addData(params) {
    const isMock = false

    const apiPath = 'platformAllergyInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改过敏信息
   *
   * @param {*} params
   */
  modifyData(params) {
    const isMock = false

    const apiPath = 'platformAllergyInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, {
      id: params.id,
      name: params.name
    })
  }
}
