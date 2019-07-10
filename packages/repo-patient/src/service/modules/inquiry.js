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

  return peace.http.post(getList, params, {
    headers: {
      post: { 'Content-Type': 'application/json' }
    }
  })
}

export default {
  /** 根据 session id 获取问诊状态 */
  getList
}
