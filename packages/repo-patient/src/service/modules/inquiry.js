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
  apply
}
