import peace from '@src/library'

/**
 * 新增医保卡
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function AddMedicareCard(params) {
  const AddMedicareCard = 'client/v1/MedicareCard/addMedicareCard'

  return peace.http.post(AddMedicareCard, params)
}
/**
 * 修改医保卡
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function UpdateMedicareCard(params) {
  const UpdateMedicareCard = 'client/v1/MedicareCard/updateMedicareCard'

  return peace.http.post(UpdateMedicareCard, params)
}
/**
 * 删除医保卡
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function DelMedicareCard(params) {
  const DelMedicareCard = 'client/v1/MedicareCard/delMedicareCard'

  return peace.http.post(DelMedicareCard, params)
}

/**
 * 获取医保卡列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function GetMedicareCardList(params) {
  const Lists = 'client/v1/MedicareCard/lists'

  return peace.http.post(Lists, params)
}
/**
 * 查询首诊记录列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function GetFirstOptionList(params) {
  const GetFirstOptionList = '/client/v1/His/getFirstOptionRecord'

  return peace.http.post(GetFirstOptionList, params)
}
/**
 * 复诊选择医保划价
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function GetPriceByRegistration(params) {
  const GetPriceByRegistration = '/client/v1/Insurance/getPriceByRegistration'

  return peace.http.post(GetPriceByRegistration, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
/**
 * 购药选择医保划价
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function GetPriceByPayDrug(params) {
  const GetPriceByPayDrug = '/client/v1/Insurance/getPriceByPayDrug'

  return peace.http.post(GetPriceByPayDrug, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}
export default {
  /**新增医保卡 */
  AddMedicareCard,
  /**修改医保卡 */
  UpdateMedicareCard,
  /**删除医保卡 */
  DelMedicareCard,
  /**新增医保卡 */
  GetMedicareCardList,
  /** 查询首诊记录列表 */
  GetFirstOptionList,
  /** 复诊选择医保划价 */
  GetPriceByRegistration,
  /** 购药选择医保划价 */
  GetPriceByPayDrug
}
