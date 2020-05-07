import peace from "@src/library";

/**
 * 获取处方列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function prescripList(params) {
  const prescripList = "client/v1/Prescribeprescrip/prescripList";

  return peace.http.post(prescripList, params);
}

/**
 * 发处方
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function subPrescrip({
  allergy_history,
  diagnose,
  drugsJson,
  openId,
  inquiry_no
}) {
  const params = {
    allergyHistory: allergy_history,
    diagnose,
    drugsJson,
    openId,
    inquiryNo: inquiry_no
  };
  const subPrescrip = "client/v1/Prescribeprescrip/subPrescrip";

  return peace.http.post(subPrescrip, params);
}

/**
 * 发会诊处方
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function offlineSubPrescrip({
  allergy_history,
  diagnose,
  drugsJson,
  openId,
  consultNo
}) {
  const params = {
    allergyHistory: allergy_history,
    diagnose,
    drugsJson,
    openId,
    consultNo: consultNo
  };
  const offlineSubPrescrip = "client/v1/Prescribeprescrip/offlineSubPrescrip";

  return peace.http.post(offlineSubPrescrip, params);
}

/**
 * 自动完成 - 获取药品列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function drugsList(params) {
  const drugsList = "client/v1/Prescribeprescrip/drugsList";

  return peace.http.get(drugsList, { params });
}

/**
 * 获取药品用法
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function drugUsageList(params) {
  const drugUsageList = "client/v1/Prescribeprescrip/drugUsageList";

  return peace.http.get(drugUsageList, { params });
}

/**
 * 获取药品频次字典
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function drugFrequencyList(params) {
  const drugFrequencyList = "client/v1/Prescribeprescrip/drugFrequencyList";

  return peace.http.get(drugFrequencyList, { params });
}

/**
 * 获取处方详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getPrescripInfo(params) {
  const getPrescripInfo = "client/v1/Prescribeprescrip/getPrescripInfo";

  return peace.http.get(getPrescripInfo, { params });
}

/**
 * 获取处方列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getConsultPrescripList(params) {
  const getConsultPrescripList = "client/v1/Consult/getConsultPrescripList";

  return peace.http.post(getConsultPrescripList, params);
}

export default {
  /** 获取处方列表 */
  prescripList,

  /** 获取药品用法 */
  drugUsageList,
  /** 获取药品频次字典 */
  drugFrequencyList,
  /** 发处方 */
  subPrescrip,
  /** 发会诊处方 */
  offlineSubPrescrip,
  /** 获取处方详情 */
  getPrescripInfo,
  /** 获取处方列表 */
  getConsultPrescripList,

  /** 自动完成 - 获取药品列表 */
  drugsList
};
