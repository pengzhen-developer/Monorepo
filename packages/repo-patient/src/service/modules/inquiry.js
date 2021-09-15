import peace from '@src/library'

/**
 * 根据 session ids 获取问诊状态
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getList(params) {
  const getList = 'client/v1/session/getList'
  params.hideLoad = true
  return peace.http.post(getList, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 搜索过敏史以及疾病既往史
 *
 * @export
 * @param {*} params
 * @returns
 */
export function searchIllInfo(params) {
  const searchIllInfo = 'client/v1/inquiry/searchIllInfo'

  return peace.http.post(searchIllInfo, params)
}
/**
 * 添加到过敏史个人库
 *
 * @export
 * @param {*} params
 * @returns
 */
export function addAllergen(params) {
  const addAllergen = 'client//v1/Inquiry/addAllergen'

  return peace.http.post(addAllergen, params)
}

/**
 * 提交问诊时，图片上传
 *
 * @export
 * @param {*} params
 * @returns
 */
export function images(params) {
  const images = 'client/v1/file/images'

  return peace.http.post(images, params, {
    headers: {
      post: { 'Content-Type': 'multipart/form-data' }
    }
  })
}

/**
 * 提交问诊
 *
 * @export
 * @param {*} params
 * @returns
 */
export function apply(params) {
  const apply = 'client/v1/inquiry/apply'

  return peace.http.post(apply, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 复诊号源校验
 *
 * @export
 * @param {*} params
 * @returns
 */

export function checkSource(params) {
  const checkSource = 'client/v1/inquiry/checkSource'

  return peace.http.post(checkSource, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 预售订单-医生患者信息
 *
 * @export
 * @param {*} params
 * @returns
 */

export function getFamilyDoctorInfo(params) {
  const getFamilyDoctorInfo = 'client/v1/inquiry/getFamilyDoctorInfo'

  return peace.http.post(getFamilyDoctorInfo, params)
}

/**
 * 权益抵扣
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getPermissionsDeduction(params) {
  const PermissionsDeduction = 'client/v1/Insurance/permissionsDeduction'

  return peace.http.post(PermissionsDeduction, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 检验挂号单 - 订单详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCheckRegisterOrderDetail(params) {
  const CheckRegisterOrderDetail = 'client/v1/checkRegisteringOrder/detail'

  return peace.http.post(CheckRegisterOrderDetail, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 检验挂号单 -  预售订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCheckRegisterOrderDetailBefore(params) {
  const preSale = 'client/v1/checkRegisteringOrder/preSale'

  return peace.http.post(preSale, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 检验挂号单 - 提交订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function submitCheckRegisteringOrder(params) {
  const Submit = 'client/v1/checkRegisteringOrder/submit'

  return peace.http.post(Submit, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 检验挂号单 - 取消订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function cancelCheckRegisteringOrder(params) {
  const Submit = 'client/v1/checkRegisteringOrder/cancel'

  return peace.http.post(Submit, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 检验单 - 订单详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCheckOrderDetail(params) {
  const CheckOrderDetail = 'client/v1/checkOrder/detail'

  return peace.http.post(CheckOrderDetail, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 检验单 -  预售订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCheckOrderDetailBefore(params) {
  const preSale = 'client/v1/checkOrder/preSale'

  return peace.http.post(preSale, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 检验单 - 提交订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function submitCheckOrder(params) {
  const Submit = 'client/v1/checkOrder/submit'

  return peace.http.post(Submit, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 检验单 - 取消订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function cancelcheckOrder(params) {
  const Submit = 'client/v1/checkOrder/cancel'

  return peace.http.post(Submit, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

export default {
  /** 根据 session id 获取问诊状态 */
  getList,

  /** 搜索过敏史以及疾病既往史 */
  searchIllInfo,

  /** 添加到过敏史个人库 */
  addAllergen,
  /** 提交问诊时，图片上传 */
  images,
  /** 提交问诊 */
  apply,
  /** 复诊号源校验 */
  checkSource,

  /** 预售订单-医生患者信息 */
  getFamilyDoctorInfo,

  /** 权益抵扣 */
  getPermissionsDeduction,

  /** 检验挂号单 - 订单详情 */
  getCheckRegisterOrderDetail,

  /** 检验挂号单 - 预售订单 */
  getCheckRegisterOrderDetailBefore,
  /** 检验挂号单 -提交订单 */
  submitCheckRegisteringOrder,

  /** 检验挂号单 - 取消订单 */
  cancelCheckRegisteringOrder,

  /** 检验单 - 订单详情 */
  getCheckOrderDetail,

  /** 检验单 - 预售订单 */
  getCheckOrderDetailBefore,

  /** 检验单 - 提交订单 */
  submitCheckOrder,

  /** 检验单 - 取消订单 */
  cancelcheckOrder
}
