export default {
  /**
   * 获取问诊订单列表
   *
   * @param {*} params
   */
  getConsultOrderList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/getHospitalInquiry'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取咨询订单详情
   *
   * @param {*} params
   */
  getConsultOrderDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/inquiry/inquiryOrderInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取咨询记录
   *
   * @param {*} params
   */
  getConsulRecord(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/getOneInquiry'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取二级科室列表
   *
   * @param {*} params
   */
  getDepartmentList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/returnvisit/getDeptByOrgId'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },
  /**
   * 检查是否能导出
   *
   * @param {*} params
   */
  isExistList(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/data/isExistList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 导出
   *
   * @param {*} params
   */
  exportOrder(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/data/exportOrder'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.download(requestApi, params).then((res) => {
      return res
    })
  }
}
