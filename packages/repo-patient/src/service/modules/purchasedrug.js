import peace from '@src/library'

/**
 * 获取药品说明书列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDrugBookList(params) {
  const getDrugBookList = 'client/v1/Purchasedrug/getDrugBookList'

  return peace.http.get(getDrugBookList, { params })
}

/**
 * 获取药品说明书详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDrugbookinfo(params) {
  const getDrugbookinfo = 'client/v1/Purchasedrug/getDrugbookinfo'

  return peace.http.get(getDrugbookinfo, { params })
}

/**
 * 获取订单详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function SelectOrderDetApi(params) {
  const SelectOrderDetApi = 'client/v1/Purchasedrug/SelectOrderDetApi'

  return peace.http.post(SelectOrderDetApi, params)
}

/**
 * 取消订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function CancelOrder(params) {
  const CancelOrder = 'client/v1/Purchasedrug/CancelOrder'

  return peace.http.post(CancelOrder, params)
}

/**
 * 确认收货
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function ConfirmReceipt(params) {
  const ConfirmReceipt = 'client/v1/Purchasedrug/ConfirmReceipt'

  return peace.http.post(ConfirmReceipt, params)
}

/**
 * 订单详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function SelectOrderStreamApi(params) {
  const SelectOrderStreamApi = 'client/v1/Purchasedrug/SelectOrderStreamApi'

  return peace.http.post(SelectOrderStreamApi, params)
}

/**
 * 购药列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function SelectOrderListApi(params) {
  const SelectOrderListApi = 'client/v1/Purchasedrug/SelectOrderListApi'

  return peace.http.post(SelectOrderListApi, params)
}

export default {
  /** 获取药品说明书列表 */
  getDrugBookList,
  /** 获取药品说明书详情 */
  getDrugbookinfo,
  /** 获取订单详情 */
  SelectOrderDetApi,
  /** 取消订单 */
  CancelOrder,
  /** 确认收货 */
  ConfirmReceipt,
  /** 订单详情 */
  SelectOrderStreamApi,
  /** 购药列表 */
  SelectOrderListApi
}
