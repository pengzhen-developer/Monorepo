import Util from '@src/util'

export default {
  /**
   * 获取影像报告详情
   *
   * @param {*} params
   */
  getPacsDetail(params) {
    const isMock = false

    const apiPath = 'report/v110/check/pacsDetail'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = Util.hybrid.getURIPrefix() + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, params, {
        headers: {
          ['accesstoken']: Util.hybrid.getURIToken()
        }
      })
      .then((res) => {
        return res
      })
  }
}
