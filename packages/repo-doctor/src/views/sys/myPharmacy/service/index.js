import Peace from '@src/library'

export default {
  /**
   * 获取药品列表(根据关键字，查询药品基础库所有药品)
   *
   * @param {*} params
   */
  getDrugList(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/drug/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取常用药品列表
   *
   * @param {*} params
   */
  getCommonlyDrugList(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commondrug/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 添加常用药品
   *
   * @param {*} params
   */
  addCommonlyDrug(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commondrug/add'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 移除常用药品
   *
   * @param {*} params
   */
  removeCommonlyDrug(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commondrug/del'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取药品说明书列表
   *
   * @param {*} params
   */
  getDrugBookList(params) {
    const isMock = false

    const apiPath = 'client/v1/Commonlyuseddrug/getDrugBookList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取药品说明书详情
   *
   * @param {*} params
   */
  getDrugbookinfo(params) {
    const isMock = false

    const apiPath = 'client/v1/Commonlyuseddrug/getDrugbookinfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取常用处方列表
   *
   * @param {*} params
   */
  getCommonlyPrescriptionList(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commonprescription/getList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 添加常用处方
   *
   * @param {*} params
   */
  addCommonlyPrescription(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commonprescription/add'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, params, {
        headers: {
          post: { 'Content-Type': 'application/json' }
        }
      })
      .then((res) => {
        return res
      })
  },

  /**
   * 修改常用处方
   *
   * @param {*} params
   */
  editCommonlyPrescription(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commonprescription/edit'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http
      .post(requestApi, params, {
        headers: {
          post: { 'Content-Type': 'application/json' }
        }
      })
      .then((res) => {
        return res
      })
  },

  /**
   * 删除常用处方
   *
   * @param {*} params
   */
  removeCommonlyPrescription(params) {
    const isMock = false

    const apiPath = 'client/v100/prescription/commonprescription/del'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 获取用药频次字典
   *
   * @param {*} params
   */
  drugFrequencyList(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/drugFrequencyList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取给药途径字典
   *
   * @param {*} params
   */
  drugUsageList(params) {
    const isMock = false

    const apiPath = 'client/v1/Prescribeprescrip/drugUsageList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 获取疾病诊断字典
   *
   * @param {*} params
   */
  getDiagnosisInfo(params) {
    const isMock = false

    const apiPath = 'client/v1/patient/getDiseaseInfo'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }

  // // 获取常用处方列表
  // getPrescList: '/client/v1/Commonprescriptions/getCommonPrescriptionsList',
  // // 常用处方药品查询列表
  // getPrescDrugList: '/client/v1/Prescribeprescrip/drugsList',
  // // 加入常用处方
  // intoPresc: '/client/v1/Commonprescriptions/AddCommonPrescriptions',
  // // 修改常用处方
  // editPresc: '/client/v1/Commonprescriptions/editCommonPrescriptions',
  // // 删除常用处方
  // removePresc: '/client/v1/Commonprescriptions/delCommonPrescriptions',
  // // 用药频次
  // getFrequencys: '/client/v1/Prescribeprescrip/drugFrequencyList',
  // // 给药途径
  // getUsages: '/client/v1/Prescribeprescrip/drugUsageList',
  // // 获取患者疾病信息
  // getDiseaseInfo: 'client/v1/patient/getDiseaseInfo'
}
