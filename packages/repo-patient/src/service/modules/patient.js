import peace from '@src/library'

/**
 * 获取医生列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDoctorList(params) {
  const getDoctorList = 'client/v1/Doctor/getDoctorList'

  return peace.http.post(getDoctorList, params)
}

/**
 * 获取所有医生（明星医生）列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getNetHospitalDoctorList(params) {
  const getNetHospitalDoctorList = 'client/v1/Doctor/getNetHospitalDoctorList'

  return peace.http.post(getNetHospitalDoctorList, params)
}

/**
 * 获取我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMyFamilyList(params) {
  const getMyFamilyList = 'client/v1/Patient/getMyFamilyList'

  return peace.http.post(getMyFamilyList, params)
}

/**
 * 新增我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function bindFamily(params) {
  const bindFamily = 'client/v1/Patient/bindFamily'

  return peace.http.post(bindFamily, params)
}

/**
 * 修改我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function upbindFamily(params) {
  const upbindFamily = 'client/v1/Patient/upbindFamily'

  return peace.http.post(upbindFamily, params)
}

/**
 * 删除我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function DelFamily(params) {
  const DelFamily = 'client/v1/Patient/DelFamily'

  return peace.http.post(DelFamily, params)
}

/**
 * 获取病历详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCaseInfo(params) {
  const getCaseInfo = 'client/v1/Patient/getCaseInfo'

  return peace.http.post(getCaseInfo, params)
}

/**
 * 获取处方详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getPrescripInfo(params) {
  const getPrescripInfo = 'client/v1/Patient/getPrescripInfo'

  return peace.http.post(getPrescripInfo, params)
}

/**
 * 获取咨询列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function inquiryList(params) {
  const inquiryList = 'client/v1/account/inquiryList'

  return peace.http.post(inquiryList, params)
}

/**
 * 获取问诊详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function inquiryDetail(params) {
  const inquiryDetail = 'client/v1/account/inquiryDetail'

  return peace.http.post(inquiryDetail, params)
}

/**
 * 获取咨询详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function chatDetail(params) {
  const chatDetail = 'client/v1/account/chatDetail'

  return peace.http.post(chatDetail, params)
}

/**
 * 获取最后一个就诊人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getLast(params) {
  const getLast = 'client/v1/inquiry/getLast'

  return peace.http.post(getLast, params)
}

/**
 * 取消咨询
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function cancel(params) {
  const cancel = 'client/v1/order/cancel'

  return peace.http.post(cancel, params)
}
/**
 * 复诊报道
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function report(params) {
  const report = 'client/v1/inquiry/report'

  return peace.http.post(report, params)
}

/**
 * 获取处方列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMyPrescripList(params) {
  const getMyPrescripList = 'client/v1/Patient/getMyPrescripList'

  return peace.http.post(getMyPrescripList, params)
}

/**
 * 关注医生
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function attention(params) {
  const attention = 'client/v1/Patient/attention'

  return peace.http.post(attention, params)
}

/**
 * 获取我的医生列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getUserDctList() {
  const getUserDctList = 'client/v1/account/getMyDoctor'

  return peace.http.post(getUserDctList)
}

/**
 * 获取我的订单列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOrderList(params) {
  const getOrderList = 'client/v1/order/getList'

  return peace.http.post(getOrderList, params)
}

/**
 * 获取我的订单详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOrderDetail(params) {
  const getOrderDetail = 'client/v1/order/getDetail'

  return peace.http.post(getOrderDetail, params)
}

/**
 * 获取用药商店列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getStoresList(params) {
  const getStoreLists = 'client/v1/MedicineOrder/matchDrugStore'

  return peace.http.post(getStoreLists, params)
}

/**
 * 获取生成订单页面
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOrderBefore(params) {
  const getOrderBefore = 'client/v1/MedicineOrder/drugStoreInfo'

  return peace.http.post(getOrderBefore, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

export function submitOrder(params) {
  const submitOrder = 'client/v1/MedicineOrder/createOrder'

  return peace.http.post(submitOrder, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 获取我的地址列表
 *
 * @export
 * @returns
 */
export function getAddressLists() {
  const getAddressLists = 'client/v1/Address/getAddressLists'
  return peace.http.post(getAddressLists)
}

/**
 * 删除地址
 *
 * @export
 * @returns
 */
export function addAddress(params) {
  const getAddressLists = 'client/v1/Address/addAddress'
  return peace.http.post(getAddressLists, params)
}

export function delAddress(params) {
  const delAddress = 'client/v1/Address/delAddress'
  return peace.http.post(delAddress, params)
}

export function getFamilyInfo(params) {
  const getFamilyInfo = 'client/v1/Patient/getFamilyInfo'
  return peace.http.get(getFamilyInfo, { params })
}

export function getNationList(params) {
  const getNationList = 'client/v1/Patient/getNationList'
  return peace.http.post(getNationList, params)
}

export function isExistCardRelation(params) {
  const isExistCardRelation = 'client/v1/Healthcard/isExistCardRelation'
  return peace.http.post(isExistCardRelation, params)
}
export function createHealthcard(params) {
  const createHealthcard = 'client/v1/Healthcard/createHealthcard'
  return peace.http.post(createHealthcard, params)
}
export function getCardList(params) {
  const getCardList = 'client/v1/Healthcard/getCardList'
  return peace.http.post(getCardList, params)
}
export function healthcardInfo(params) {
  const healthcardInfo = 'client/v1/Healthcard/healthcardInfo'
  return peace.http.post(healthcardInfo, params)
}
export function getGuardianList(params) {
  const getGuardianList = 'client/v1/Patient/getGuardianList'
  return peace.http.post(getGuardianList, params)
}

export function perfectInfo(params) {
  const perfectInfo = 'client/v1/Patient/perfectInfo'
  return peace.http.post(perfectInfo, params)
}

export function getDefaultAddress(params) {
  const getDefaultAddress = 'client/v1/Address/getDefaultAddress'
  return peace.http.post(getDefaultAddress, params)
}

export function setDefaultAddress(params) {
  const setDefaultAddress = 'client/v1/Address/setDefaultAddress'
  return peace.http.post(setDefaultAddress, params)
}

export function getLastAppoint(params) {
  const getLastAppoint = 'register/v1/Register/getLast'
  return peace.http.post(getLastAppoint, params)
}

/**
 * 判断问诊状态
 *
 * @export
 * @param {*doctorId,*consultingType} params
 * @returns
 */
export function inquiryStatus(doctorId, familyId, consultingType, serviceType) {
  const inquiryStatus = 'client/v1/inquiry/inquiryStatus'

  return peace.http.post(inquiryStatus, { doctorId, familyId, consultingType, serviceType })
}
/**
 * 获取药店信息
 *
 * @export
 * @param {*DrugStoreId} params
 * @returns
 */
export function getDrugStoreApi(AccessCode, DrugStoreId, JZTClaimNo) {
  const getDrugStoreApi = 'client/v1/Purchasedrug/GetDrugStoreApi'

  return peace.http.post(
    getDrugStoreApi,
    { AccessCode, DrugStoreId, JZTClaimNo },
    {
      headers: {
        post: { 'Content-Type': 'application/json' }
      }
    }
  )
}
/**
 * 获取处方信息电子版本
 *
 * @export
 * @param {*prescriptionId} params
 * @returns
 */
export function getPrescriptionImage(prescriptionId) {
  const getPrescriptionImage = 'wap/v1/checklist/getPrescriptionImage'

  return peace.http.post(getPrescriptionImage, { prescriptionId })
}
export default {
  /** 获取医生列表 */
  getDoctorList,
  /** 获取所有医生（明星医生）列表 */
  getNetHospitalDoctorList,
  /** 获取我的医生列表 */
  getUserDctList,
  /** 获取我的家人 */
  getMyFamilyList,
  /** 新增我的家人 */
  bindFamily,
  /** 修改我的家人 */
  upbindFamily,
  /** 删除我的家人 */
  DelFamily,
  /** 获取病历详情 */
  getCaseInfo,
  /** 获取处方列表 */
  getMyPrescripList,
  /** 获取处方详情 */
  getPrescripInfo,
  /** 获取咨询列表 */
  inquiryList,
  /** 获取咨询详情 */
  chatDetail,
  /** 获取问诊详情 */
  inquiryDetail,
  /** 取消咨询 */
  cancel,
  /**复诊报道 */
  report,
  /** 获取订单列表 */
  getOrderList,
  /** 获取订单详情 */
  getOrderDetail,
  /** 获取最后一个就诊人 */
  getLast,
  /* 获取最后一个预约挂号就诊人 */
  getLastAppoint,
  /** 关注医生 */
  attention,
  /** 获取附近商店列表**/
  getStoresList,
  /** 获取提交订单页面**/
  getOrderBefore,
  /** 提交订单 **/
  submitOrder,
  /** 获取我的地址列表 **/
  getAddressLists,
  /** 添加地址 */
  addAddress,
  /** 删除地址 */
  delAddress,
  getFamilyInfo,
  getNationList,
  isExistCardRelation,
  createHealthcard,
  getCardList,
  healthcardInfo,
  getGuardianList,
  perfectInfo,
  getDefaultAddress,
  setDefaultAddress,

  inquiryStatus,
  /** 获取药店信息 **/
  getDrugStoreApi,
  /** 获取处方信息电子版本 **/
  getPrescriptionImage
}
