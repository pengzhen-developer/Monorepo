export default {
  /**
   * 获取基础药品
   *otherAttributes
   * @param {*}
   */
  getDrugList(params) {
    const isMock = false

    const apiPath = 'custdict/drugAttrDict/baseDrugListPaging'
    const mockPath = process.env.VUE_APP_BASE_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
