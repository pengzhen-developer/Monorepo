import Peace from '@src/library'
import Util from '@src/util'

// iOS: 'iOS',
// Android: 'Android',
// H5: 'H5',
// Wechat: 'Wechat',
// PC: 'PC'
export const urlMap = {
  iOS: 'his/v060/record/getFirstOptionDetail',
  Android: 'his/v060/record/getFirstOptionDetail',
  H5: 'v1/His/getPrescriptionDetail',
  Wechat: 'v1/His/getPrescriptionDetail',
  PC: 'his/v060/record/getFirstOptionDetail'
}

export default {
  /**
   * 从服务端获取数据
   *
   * @param {*} params
   */

  fetch(params) {
    const isMock = false
    const key = Util.hybrid.getPlatform()
    const apiPath = urlMap[key]
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
