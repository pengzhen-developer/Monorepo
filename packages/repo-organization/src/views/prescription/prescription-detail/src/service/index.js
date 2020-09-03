import Peace from '@src/library'

export default {
  /**
   * 获取处方详情
   *
   * @param {*} params
   */
  getPrescriptionInfo(params) {
    const isMock = false

    const apiPath = 'mds/openapi/psd/Prescription/GetPrescriptionInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
