export default {
  /**
   * 获取处方详情
   *
   * @param {*} params
   */
  getPrescriptionInfo(params) {
    const isMock = false

    const apiPath = 'psd/Prescription/GetPrescriptionInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取处方图片
   *
   * @param {*} params
   */
  getPresImgUrl(params) {
    const isMock = false

    const apiPath = 'psd/Pres/GetPresImgUrl'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 下载处方图片文件
   *
   * @param {*} params
   */
  getPresImgFile(params) {
    const isMock = false

    const apiPath = 'durpsd/Pres/GetPresImgFile'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.download(requestApi, params).then((res) => {
      return res
    })
  }
}
