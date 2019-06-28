import peace from '@src/library'

/**
 * 获取健康数据
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getPatientHealthData(params) {
  const getPatientHealthData = 'client/v1/health/allHealthList'

  return peace.http.post(getPatientHealthData, params)
}
/**
 * 获取健康分析报告列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getPatientReport(params) {
  const getPatientReport = 'client/v1/health/allHealthList'

  return peace.http.post(getPatientReport, params)
}

export default {
  getPatientHealthData,
  getPatientReport
}
