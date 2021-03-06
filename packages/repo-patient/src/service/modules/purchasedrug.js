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
  const SelectOrderDetApi = 'client/v1/MedicineOrder/detail'

  return peace.http.post(SelectOrderDetApi, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 取消订单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function CancelOrder(params) {
  const CancelOrder = 'client/v1/MedicineOrder/CancelOrder'

  return peace.http.post(CancelOrder, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 确认收货
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function ConfirmReceipt(params) {
  const ConfirmReceipt = 'client/v1/MedicineOrder/ConfirmReceipt'

  return peace.http.post(ConfirmReceipt, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
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
  const SelectOrderListApi = 'client/v1/MedicineOrder/lists'

  return peace.http.post(SelectOrderListApi, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

/**
 * 快递信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function ExpressQuery(params) {
  const ExpressQuery = 'client/v1/Purchasedrug/expressQuery'

  return peace.http.post(ExpressQuery, params)
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
  SelectOrderListApi,
  /**快递信息 */
  ExpressQuery
}
