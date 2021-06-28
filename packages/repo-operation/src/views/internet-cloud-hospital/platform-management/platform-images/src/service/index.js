// 获取图库


export default {

  /**
   * 获取医生列表
   * @param imageName 图片名称
   * @param usageScenarios 图片用途
   * @param p pageIndex
   * @param size pageSize
   */
  getImages(imageName, usageScenarios, p, size) {
    const apiPath = 'nethospital/operate/department/getGalleryList'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, {
      imageName,
      usageScenarios,
      p,
      size
    })
  },

  /**
   * 上传图片
   * @param file 图片路径
   */
  uploadImage(file) {
    const apiPath = 'nethospital/operate/department/uploadImages'
    const requestApi = process.env.VUE_APP_API_BASE + apiPath
    return Peace.http.post(requestApi, file)
  }
}
