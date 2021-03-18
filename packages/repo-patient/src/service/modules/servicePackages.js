import peace from '@src/library'

/**
 * 获取该医生的服务包列表
 *
 * @export
 * @param params 参数列表
 * @returns
 */
export function getServicePackageList(params) {
  const getServicePackageList = 'client/v1/servicePackage/lists'

  return peace.http.post(getServicePackageList, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 获取医生的服务包详情
 *
 * @export
 * @param params 参数列表
 * @returns
 */
export function getServicePackageDetail(params) {
  const getServicePackageDetail = 'client/v1/servicePackage/detail'

  return peace.http.post(getServicePackageDetail, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 服务包-提交订单
 *
 * @export
 * @param params 参数列表
 * @returns
 */
export function submitOrder(params) {
  const submitOrder = 'client/v1/servicePackage/submitOrder'

  return peace.http.post(submitOrder, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 服务包订单-订单详情
 *
 * @export
 * @param params 参数列表
 * @returns
 */
export function OrderDetail(params) {
  const OrderDetail = 'client/v1/servicePackage/OrderDetail'

  return peace.http.post(OrderDetail, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 服务权益
 *
 * @export
 * @param  params 参数列表
 * @returns
 */
export function equities(params) {
  const equities = 'client/v1/servicePackage/equities'

  return peace.http.post(equities, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 服务包以及权益列表
 *
 * @export
 * @param  params 参数列表
 * @returns
 */
export function getRecord(params) {
  const getRecord = 'client/v1/servicePackage/record'

  return peace.http.post(getRecord, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 获取医生开通的服务
 *
 * @export
 * @param  params 参数列表
 * @returns
 */
export function doctorServiceManage(params) {
  const doctorServiceManage = 'client/v1/servicePackage/doctorServiceManage'

  return peace.http.post(doctorServiceManage, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 申请取消服务包订单
 *
 * @export
 * @param  params 参数列表
 * @returns
 */
export function applyCancel(params) {
  const applyCancel = 'client/v1/servicePackage/applyCancel'

  return peace.http.post(applyCancel, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 未支付的订单数
 *
 * @export
 * @param  params 参数列表
 * @returns
 */
export function getWaitPayOrderNum(params) {
  const waitPayOrderNum = 'client/v1/order/waitPayOrderNum'

  return peace.http.post(waitPayOrderNum, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
export default {
  /** 获取该医生的服务包列表 */

  getServicePackageList,
  /** 获取医生的服务包详情 */

  getServicePackageDetail,
  /** 服务包-提交订单 */

  submitOrder,
  /** 服务包订单-订单详情 */

  OrderDetail,
  /** 服务权益 */

  equities,
  /** 服务包以及权益列表 */

  getRecord,
  /** 获取医生开通的服务 */

  doctorServiceManage,
  /** 申请取消服务包订单 */

  applyCancel,
  /** 未支付的订单数 */

  getWaitPayOrderNum
}
