/**
 * 处理会诊视频
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function processConsult(params) {
  const processConsult = 'client/v1/video/processConsult'

  return peace.http.post(processConsult, params)
}

/**
 * 处理问诊视频
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function process(params) {
  const process = 'client/v1/video/process'

  return peace.http.post(process, params)
}

export default {
  /** 处理会诊视频 */
  processConsult,

  /** 处理问诊视频 */
  process
}
