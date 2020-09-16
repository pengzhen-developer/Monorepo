import peace from '@src/library'

export function getList(params) {
  const getList = 'client/v1/session/getList'

  return peace.http.post(getList, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 获取问诊记录列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function recordList(params) {
  const recordList = 'client/v1/inquiry/recordList'

  return peace.http.post(recordList, params)
}

/**
 * 获取转诊状态
 *
 * @export
 * @returns
 */
export function getRefferStatus() {
  const getRefferStatus = 'client/v1/inquiry/getRefferStatus'

  return peace.http.post(getRefferStatus)
}

/**
 * 获取转诊列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function doctorReferralListPc(params) {
  const doctorReferralListPc = 'client/v1/inquiry/DoctorReferralListPc'

  return peace.http.post(doctorReferralListPc, params)
}

/**
 * 接诊
 *
 * @export
 * @param {*} params
 * @returns
 */
export function receiveInquiry(params) {
  const receiveInquiry = 'client/v1/patient/receiveInquiry'

  return peace.http.post(receiveInquiry, params)
}

/**
 * 退诊
 *
 * @export
 * @param {*} params
 * @returns
 */
export function quitInquiry(params) {
  const quitInquiry = 'client/v1/patient/quitInquiry'

  return peace.http.post(quitInquiry, params)
}

/**
 * 正常结束
 *
 * @export
 * @param {*} params
 * @returns
 */
export function overInquiry(params) {
  const overInquiry = 'client/v1/patient/overInquiry'

  return peace.http.post(overInquiry, params)
}

/**
 * 校验问诊状态
 *
 * @export
 * @param {*} params
 * @returns
 */
export function checkOverInquiry(params) {
  const checkOverInquiry = 'client/v1/patient/checkOverInquiry'

  return peace.http.post(checkOverInquiry, params)
}

/**
 * 获取病历模板
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getRecordTemplate() {
  const getRecordTemplate = 'client/v1/Prescribeprescrip/getCaseTemplate'

  return peace.http.post(getRecordTemplate)
}

/**
 * 发病历
 *
 * @export
 * @param {*} params
 * @returns
 */
export function offlineAddCase({
  consultNo,
  inquiry_no,
  allergy_history,
  diagnose,
  base_illness,
  present_history,
  past_history,
  Inspection_index,
  summary,
  templateId
}) {
  const params = {
    consultNo: consultNo,
    inquiryNo: inquiry_no,
    allergyHistory: allergy_history,
    diagnose,
    baseIllness: base_illness,
    presentHistory: present_history,
    pastHistory: past_history,
    inspectionIndex: Inspection_index,
    summary,
    aliverId: templateId
  }
  const offlineAddCase = 'client/v1/Prescribeprescrip/offlineAddCase'

  return peace.http.post(offlineAddCase, params)
}

/**
 * 发会诊病历
 *
 * @export
 * @param {*} params
 * @returns
 */
export function addCase({ inquiry_no, allergy_history, diagnose, base_illness, present_history, past_history, Inspection_index, summary, templateId }) {
  const params = {
    inquiryNo: inquiry_no,
    allergyHistory: allergy_history,
    diagnose,
    baseIllness: base_illness,
    presentHistory: present_history,
    pastHistory: past_history,
    inspectionIndex: Inspection_index,
    summary,
    aliverId: templateId
  }
  const addCase = 'client/v1/Prescribeprescrip/addCase'

  return peace.http.post(addCase, params)
}

/**
 * 获取病历详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getCase(params) {
  const getCase = 'client/v1/inquiry/getCase'

  return peace.http.post(getCase, params)
}

/**
 * 获取新门诊病历详情详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getHealthCase({ dataNo }) {
  const params = { dataNo }
  const getHealthCase = 'client/v1/health/getHealthCase'

  return peace.http.post(getHealthCase, params)
}

/**
 * 获取转诊医生
 *
 * @export
 * @param {*} params
 * @returns
 */
export function referralDocListPc(params) {
  const referralDocListPc = 'client/v1/inquiry/referralDocListPc'

  return peace.http.post(referralDocListPc, params)
}

/**
 * 提交转诊申请
 *
 * @export
 * @param {*} params
 * @returns
 */
export function addReferral(params) {
  const addReferral = 'client/v1/inquiry/addReferral'

  return peace.http.post(addReferral, params)
}

/**
 * 获取转诊详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function referralDocPc(params) {
  const referralDocPc = 'client/v1/inquiry/referralDocPc'

  return peace.http.post(referralDocPc, params)
}

/**
 * 提交转诊意见
 *
 * @export
 * @param {*} params
 * @returns
 */
export function receiveReferralPc(params) {
  const receiveReferralPc = 'client/v1/inquiry/receiveReferralPc'

  return peace.http.post(receiveReferralPc, params)
}

/**
 * 获取检查项
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOrderDetail(params) {
  const getOrderDetail = 'client/v1/Checklist/getOrderDetail'

  return peace.http.post(getOrderDetail, params)
}

/**
 * 获取首诊记录列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFirstOptionList(params) {
  const isMock = false
  const apiPath = 'client/his/v060/record/getFirstOptionList'

  const mockPath = process.env.VUE_APP_MOCK_API + apiPath

  const serverPath = process.env.VUE_APP_BASE_API + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return peace.http.post(requestApi, params)
}

/**
 * 获取首诊记录详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFirstOptionDetail(params) {
  const isMock = false
  const apiPath = 'client/his/v060/record/getFirstOptionDetail'

  const mockPath = process.env.VUE_APP_MOCK_API + apiPath

  const serverPath = process.env.VUE_APP_BASE_API + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return peace.http.post(requestApi, params)
}

export default {
  /** 根据 session id 获取问诊状态 */
  getList,

  /** 获取问诊记录列表 */
  recordList,
  /** 获取转诊状态 */
  getRefferStatus,
  /** 获取转诊记录列表 */
  doctorReferralListPc,
  /** 获取检查项 */
  getOrderDetail,

  /** 接诊 */
  receiveInquiry,
  /** 退诊 */
  quitInquiry,
  /** 正常结束 */
  overInquiry,

  /** 校验问诊状态 */
  checkOverInquiry,
  /** 获取病历模板 */
  getRecordTemplate,
  /** 发病历 */
  addCase,
  offlineAddCase,
  /** 获取病历详情 */
  getCase,
  getHealthCase,
  /** 获取转诊医生 */
  referralDocListPc,
  /** 提交转诊 */
  addReferral,
  /** 获取转诊详情 */
  referralDocPc,
  /** 提交转诊意见 */
  receiveReferralPc,
  /** 获取首诊记录列表 */
  getFirstOptionList,
  /** 获取首诊记录详情 */
  getFirstOptionDetail
}
