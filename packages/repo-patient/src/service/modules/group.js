import peace from '@src/library'

/**
 * 获取当前问诊的会诊单列表
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function getConsultList(params) {
  const getConsultList = 'wap/v1/Consult/lists'

  return peace.http.post(getConsultList, params)
}
/**
 * 获取当前问诊的转诊单列表
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 *
 * @returns
 */
export function getTransferList(params) {
  const getTransferList = 'wap/v1/Referral/lists'

  return peace.http.post(getTransferList, params)
}
/**
 * 获取当前问诊的检查单列表
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function getInspectList(params) {
  const getInspectList = 'wap/v1/checklist/getOrderList'

  return peace.http.post(getInspectList, params)
}

/**
 * 获取会诊单详情
 *
 * @export
 * @param {*consultNo:	string} params 参数列表
 * @returns
 */
export function getConsultDetail(params) {
  const getConsultDetail = 'wap/v1/Consult/detail'

  return peace.http.post(getConsultDetail, params)
}
/**
 * 获取转诊单详情
 *
 * @export
 * @param {*referralNo:	string} params 参数列表
 * @returns
 */
export function getTransferDetail(params) {
  const getTransferDetail = 'wap/v1/Referral/detail'

  return peace.http.post(getTransferDetail, params)
}
/**
 * 获取检查单详情
 *
 * @export
 * @param {*checkOrderNo:	string} params 参数列表
 * @returns
 */
export function getInspectDetail(params) {
  const getInspectDetail = 'wap/v1/checklist/getOrderDetail'

  return peace.http.post(getInspectDetail, params)
}
/**
 * 发起转诊问诊
 *
 * @export
 * @param {*referralNo:	string,*inquiryNo:	string} params 参数列表
 * @returns
 */
export function applyConsult(params) {
  const applyConsult = 'wap/v1/Referral/consultationDoctor'

  return peace.http.post(applyConsult, params)
}

/*评论相关*/
/**
 * 获取评论基础信息
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function getBaseInfo(params) {
  const getBaseInfo = 'client/v1/Comment/getBaseInfo'

  return peace.http.post(getBaseInfo, params)
}
/**
 * 获取我对该诊断的评价
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function commentDetail(params) {
  const commentDetail = 'client/v1/Comment/commentDetail'

  return peace.http.post(commentDetail, params)
}
/**
 * 判断是否评论过
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function isComment(params) {
  const isComment = 'client/v1/Comment/isComment'

  return peace.http.post(isComment, params)
}
/**
 * 新增评论
 *
 * @export
 * @param {*inquiryNo:	string,*starLevel:	number,*content: string,*tags:string} params 参数列表
 * @returns
 */
export function doComment(params) {
  const doComment = 'client/v1/Comment/doComment'

  return peace.http.post(doComment, params)
}
/**
 * 获取该医生的评论列表
 *
 * @export
 * @param {*doctorId:	string} params 参数列表
 * @returns
 */
export function commentLists(params) {
  const commentLists = 'client/v1/Comment/commentLists'

  return peace.http.post(commentLists, params)
}

/**
 * 添加就诊人
 *http://doc.hp.aijiayi.com/web/#/16?page_id=1154
 * @export
 * @param   params 参数列表
 * @returns
 */
export function addData(params) {
  const addData = 'wap/v1/HealthPatient/addData'

  return peace.http.post(addData, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 健康档案-会诊详情
 *
 * @export
 * @param   {*consultNo:string}params 参数列表
 * @returns
 */
export function consultDetail(params) {
  const consultDetail = 'wap/v1/health/consultDetail'

  return peace.http.post(consultDetail, params)
}
/**
 * 健康档案-更新是否已阅状态
 *
 * @export
 * @param   {*dataNo:string}params 参数列表
 * @returns
 */
export function updateCounsultRedDot(params) {
  const updateCounsultRedDot = 'wap/v1/health/updateCounsultRedDot'

  return peace.http.post(updateCounsultRedDot, params)
}
export default {
  /** 获取当前问诊的会诊单列表 */
  getConsultList,

  /** 获取当前问诊的转诊单列表 */
  getTransferList,

  /** 获取当前问诊的检查单列表 */
  getInspectList,

  /** 获取会诊单详情 */
  getConsultDetail,

  /** 获取转诊单详情 */
  getTransferDetail,

  /** 获取检查单详情 */
  getInspectDetail,

  /** 发起转诊问诊 */
  applyConsult,

  /*评论相关*/

  /*判断是否评论过*/
  isComment,
  /*获取评论基础信息*/
  getBaseInfo,

  /*获取我对该诊断的评价*/
  commentDetail,

  /*新增评论*/
  doComment,

  /*获取该医生的评论列表*/
  commentLists,

  /*新增就诊人*/
  addData,

  //健康档案- 会诊详情
  consultDetail,

  //健康档案-更新是否已阅状态
  updateCounsultRedDot
}
