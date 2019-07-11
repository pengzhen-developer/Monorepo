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

export default {
  /** 根据 session id 获取问诊状态 */
  getList,

  /** 搜索过敏史以及疾病既往史 */
  searchIllInfo
}
