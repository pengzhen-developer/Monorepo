/**
 * 获取会诊 session 状态
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getInfoByTeamId(params) {
  const getChatRecord = 'client/v1/consult/getInfoByTeamId'

  return peace.http.post(getChatRecord, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 获取会诊状态
 *
 * @export
 * @returns
 */
export function getConsultStatusMap() {
  const getConsultStatusMap = 'client/v1/consult/getConsultStatusMap'

  return peace.http.post(getConsultStatusMap)
}

/**
 * 获取会诊列表， 发起
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOutConsultList(params) {
  const getOutConsultList = 'client/v1/consult/getOutConsultList'

  return peace.http.post(getOutConsultList, params)
}

/**
 * 获取会诊列表， 邀请
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getInConsultList(params) {
  const getInConsultList = 'client/v1/consult/getInConsultList'

  return peace.http.post(getInConsultList, params)
}

/**
 * 获取会诊医生
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function chooseDoctor(params) {
  const chooseDoctor = 'client/v1/consult/chooseDoctor'

  return peace.http.post(chooseDoctor, params)
}

/**
 * 提交会诊申请
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function doApply(params) {
  const doApply = 'client/v1/consult/doApply'

  return peace.http.post(doApply, params)
}

/**
 * 获取会诊详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getConsultInfo(params) {
  const getConsultInfo = 'client/v1/consult/getConsultInfo'

  return peace.http.post(getConsultInfo, params)
}

/**
 * 获取会诊历史记录
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getChatRecord(params) {
  const getChatRecord = 'client/v1/consult/getChatRecord'

  return peace.http.post(getChatRecord, params)
}

/**
 * 获取可邀请的协同的医生
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function inviteDoctor(params) {
  const inviteDoctor = 'client/v1/consult/inviteDoctor'

  return peace.http.post(inviteDoctor, params)
}

/**
 * 选择可邀请的会诊医生
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function chooseInviteDoctor(params) {
  const chooseInviteDoctor = 'client/v1/consult/chooseInviteDoctor'

  return peace.http.post(chooseInviteDoctor, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 提交会诊意见
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function submitSuggest(params) {
  const submitSuggest = 'client/v1/consult/submitSuggest'

  return peace.http.post(submitSuggest, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 获取正在会诊中的编号
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getConsultNo(params) {
  const getConsultNo = 'client/v1/consult/getConsultNo'

  return peace.http.post(getConsultNo, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 医生审核
 *
 * @export
 * @param {*} params
 * @returns
 */
export function doctorAudit(params) {
  const doctorAudit = 'client/v1/consult/doctorAudit'

  return peace.http.post(doctorAudit, params)
}

/**
 * 结束问诊
 *
 * @export
 * @param {*} params
 * @returns
 */
export function overConsult(params) {
  const overConsult = 'client/v1/consult/overConsult'

  return peace.http.post(overConsult, params)
}

/**
 * 会诊双方状态
 *
 * @export
 * @param {*} params
 * @returns
 */
export function doctorStatus(params) {
  const doctorStatus = 'client/v1/consult/doctorStatus'

  return peace.http.post(doctorStatus, params)
}

export default {
  getInfoByTeamId,

  /** 获取会诊状态 */
  getConsultStatusMap,
  /** 获取会诊列表， 发起 */
  getOutConsultList,
  /** 获取会诊列表， 邀请 */
  getInConsultList,
  /** 获取会诊详情 */
  getConsultInfo,
  /** 获取会诊历史记录 */
  getChatRecord,

  /** 获取会诊医生 */
  chooseDoctor,
  /** 提交会诊申请 */
  doApply,

  /** 获取可邀请的会诊医生 */
  inviteDoctor,
  /** 选择可邀请的会诊医生 */
  chooseInviteDoctor,
  /** 提交会诊意见 */
  submitSuggest,

  /** 获取正在会诊中的编号 */
  getConsultNo,

  /** 医生审核 */
  doctorAudit,
  /** 结束问诊 */
  overConsult,
  /** 会诊双方状态 */
  doctorStatus
}
