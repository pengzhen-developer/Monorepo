import Peace from '@src/library'

export default {
  /**
   * 是否有待接订单
   *
   * @param {*} params
   */
  HasWaitReceiveOrder(params) {
    const isMock = false

    const apiPath = 'psd/ReceiveOrder/HasWaitReceiveOrder'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_MDS_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
