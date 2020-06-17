import Peace from '@src/library'
import Util from '@src/util'

export default {
  /**
   * 从服务端获取数据
   *
   * @param {*} params
   */
  fetch(params) {
    const isMock = false

    const apiPath = 'report/v110/check/inspectionDetail'
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
