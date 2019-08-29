import peace from '@src/library'

/**
 * 获取待办事项
 *
 * @export
 * @returns
 */
export function waitList() {
  const waitList = 'client/v1/Patient/waitList'

  return peace.http.post(waitList)
}

/**
 * 获取患者来源
 *
 * @export
 * @returns
 */
export function getSource() {
  const getSource = 'client/v1/Patient/getSource'

  return peace.http.post(getSource)
}

/**
 * 获取患者列表信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function patientListPc(params) {
  const patientListPc = 'client/v1/Patient/patientListPc'

  return peace.http.post(patientListPc, params)
}

/**
 * 获取某个患者详情信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function patientListDescPc(params) {
  const patientListDescPc = 'client/v1/Patient/patientListDescPc'

  return peace.http.get(patientListDescPc, { params })
}

/**
 * 获取某个患者详情信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOneHealth(params) {
  const getOneHealth = 'client/v1/Health/getOneHealth'

  return peace.http.post(getOneHealth, params)
}

/**
 * 获取某个患者详情信息（新）
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getPatientHome(params) {
  const getPatientHome = 'client/v1/Patient/getPatientHome'

  return peace.http.post(getPatientHome, params)
}

/**
 * 获取过敏源
 *
 * @export
 * @param {*} params
 * @returns
 */
export function allergens(params) {
  const allergens = 'client/v1/Patient/allergens'

  return peace.http.post(allergens, params)
}

/**
 * 获取诊断
 *
 * @export
 * @param {*} params
 * @returns
 */
export function IllnessList(params) {
  const IllnessList = 'client/v1/Patient/IllnessList'

  return peace.http.post(IllnessList, params)
}

/**
 * 获取诊断
 *
 * @export
 * @param {*} params
 * @returns
 */
export function OldIllnessList(params) {
  const OldIllnessList = 'client/v1/Patient/OldIllnessList'

  return peace.http.post(OldIllnessList, params)
}

/**
 * 自动完成下拉 - 获取患者疾病信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getDiseaseInfo(params) {
  const getDiseaseInfo = 'client/v1/Patient/getDiseaseInfo'

  return peace.http.post(getDiseaseInfo, params)
}

/**
 * 自动完成下拉 - 获取患者过敏信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function allergenList(params) {
  const allergenList = 'client/v1/Patient/allergenList'

  return peace.http.post(allergenList, params)
}

/**
 * 获取单次问诊历史消息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOneInquiry(params) {
  const getOneInquiry = 'client/v1/Patient/getOneInquiry'

  return peace.http.get(getOneInquiry, { params })
}

/**
 * 获取咨询记录
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getAdvisoryRecord(params) {
  const getAdvisoryRecord = 'client/v1/Patient/getPatientInquiryList'

  return peace.http.post(getAdvisoryRecord, params)
}

/**
 * 获取咨询记录
 *
 * @export
 * @param {*} params
 * @returns
 */
export function myInstructionLists(params) {
  const myLists = 'client/v1/patient_instruction/myLists'

  return peace.http.post(myLists, params)
}

/**
 * 用户主页咨询列表接口
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getPatientInquiryList(params) {
  const getPatientInquiryList = 'client/v1/Patient/getPatientInquiryList'

  return peace.http.post(getPatientInquiryList, params)
}

/**
 * 新增或修改我的患教
 * @param {*} params
 */
export function addMyInstruction(params) {
  const addMyInstruction = '/client/v1/Patient_instruction/addMyInstruction'

  return peace.http.post(addMyInstruction, params)
}

/**
 * 删除我的患教
 * @param {*} params
 */
export function delInstruction(params) {
  const del = '/client/v1/Patient_instruction/del'

  return peace.http.post(del, params)
}

/**
 * 上传图片
 * @param {*} image
 */
export function uploadImage(image) {
  const uploadImage = '/client/v1/Patient_instruction/upload'

  return peace.http.post(uploadImage, image)
}

export default {
  /** 获取待办事项 */
  waitList,

  /** 获取患者来源 */
  getSource,
  /** 获取患者列表信息 */
  patientListPc,
  /** 获取某个患者详情信息 */
  patientListDescPc,
  getPatientHome,
  getOneHealth,

  /** 获取过敏源 */
  allergens,
  /** 获取诊断 */
  IllnessList,
  /** 获取既往史 */
  OldIllnessList,

  /** 自动完成下拉 - 获取患者疾病信息 */
  getDiseaseInfo,
  /** 自动完成下拉 - 获取患者过敏信息 */
  allergenList,

  /** 获取单次问诊历史消息 */
  getOneInquiry,

  /** 获取我的患教列表 */
  myInstructionLists,

  /** 获取咨询列表 */
  getPatientInquiryList,

  /** 新增或修改我的患教 */
  addMyInstruction,
  /** 删除我的患教 */
  delInstruction,
  /** 修改我的患教 - 上传图片 */
  uploadImage
}
