export default {

  /**
   * 获取广告内容列表
   * @param params 标题
   */
  getContentList(params) {
    const apiPath = 'nethospital/operate/Advertisement/advertisementContentList'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, params)

  },

  /**
   * 获取广告内容
   * @param id 广告ID
   */
  getContentById(id) {
    const apiPath = 'nethospital/operate/Advertisement/advertisementContentInfo'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, { id })

  },

  /**
   * 新增一条广告内容
   * @param {string} params.title 标题
   * @param {string} params.sonTitle 副标题
   * @param {string} params.content 内容
   * @param {string} params.templateHtml HTML_Template
   * @param {string} params.displayPosition 展示位置
   */
  createContent(params) {
    const apiPath = 'nethospital/operate/Advertisement/upholdAdvertisementContent'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, {
      ...params,
      type: 1
    })
  },


  /**
   * 更新广告内容
   * @param {string} params.id 广告Id
   * @param {string} params.title 标题
   * @param {string} params.sonTitle 副标题
   * @param {string} params.content 内容
   * @param {string} params.templateHtml HTML_Template
   * @param {string} params.displayPosition 展示位置
   */
  updateContent(params) {
    const apiPath = 'nethospital/operate/Advertisement/upholdAdvertisementContent'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, {
      ...params,
      type: 2
    })
  },

}
