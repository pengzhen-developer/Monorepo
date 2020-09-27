import Peace from '@src/library'

export default {
  /**
   * 获取基础服务
   *
   * @param {*} params
   */
  getDrugList(params) {
    const isMock = false

    const apiPath = 'custdict/drugAttrDict/otherDrugListPaging'
    const mockPath = process.env.VUE_APP_MDS_API + apiPath
    const serverPath = process.env.VUE_APP_MDS_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
