export default {
  /**
   * 获取广告管理列表
   *
   */
  getAdvertisements(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Advertisement/advertisementList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 新增广告
   *
   */
  createAdvertisement(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Advertisement/upholdAdvertisement'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 编辑广告
   *
   */
  updateAdvertisement(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Advertisement/upholdAdvertisement'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 广告排序
   *
   */
  updateSorts(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Advertisement/editAdvertisementSort'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 获取关联广告内容
   *
   */
  getAssociatedContentList(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/Advertisement/advertisementContentListByWhere'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   *  获取图库
   *
   */
  getImages(params) {
    const isMock = false
    const apiPath = 'nethospital/operate/department/getGalleryList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
