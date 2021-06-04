export default {
  /**
   *分页查询机构人群分类配码审核信息
   *
   * @param {*} params
   * @returns {Object}
   */
  getHumanClassReviewByCondition(params) {
    const isMock = false

    const apiPath = 'orgHumanClass/getPageMatchCodeReviewByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取机构人群
   *
   * @param {*} params
   * @returns {Object}
   */
  getHumanClassList(params) {
    const isMock = false

    const apiPath = 'orgHumanClass/page'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 修改机构人群分类审核状态
   *
   * @param {*} params
   * @returns {Object}
   */
  updateHumanClassReviewStatus(params) {
    const isMock = false

    const apiPath = 'orgHumanClass/updateReviewStatus'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.put(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 人群分类-审核——跳过
   *
   * @param {*} params
   * @returns {Object}
   */
  humanClassNextData(params) {
    const isMock = false
    const apiPath = 'orgHumanClass/nextData'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *配码审核记录
   *
   * @param {*} params
   * @returns {Object}
   */
  humanClassReviewLog(params) {
    const isMock = false
    const apiPath = 'ReviewLog/getPageByCondition'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_IDIC + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
