import Peace from '@src/library'
import Util from "@src/util";

export default {
  /**
   * 从服务端获取数据
   *
   * @param {*} params
   */
  fetch(params) {
    const isMock = true

    const apiPath = `${Util.hybrid.getURIPrefix()}/report/v110/check/inspectionDetail`
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, params, {
        headers: {
          accesstoken: Util.hybrid.getURIToken()
        }
      })
      .then((res) => {
        return res
      })
  }
}
