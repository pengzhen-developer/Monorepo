import peace from '@src/library'

/**
 * 获取身体部位疾病
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getAllBodyArea() {
    const getAllBodyArea = 'client/v1/Guide/getAllBodyArea'

    return peace.http.post(getAllBodyArea)
}
/**
 * 获取人群疾病详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function diseaseInfo(params) {
    const diseaseInfo = 'client/v1/Crowd/diseaseInfo'

    return peace.http.post(diseaseInfo, params)
}
/**
 * 获取身体疾病详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getBodySymptomDetail(params) {
    const getBodySymptomDetail = 'client/v1/Guide/getBodySymptomDetail'

    return peace.http.post(getBodySymptomDetail, params)
}
/**
 * 获取疾病人群列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function diagnoseList() {
    const url = 'client/v1/Crowd/lists'

    return peace.http.post(url)
}
/**
 * 获取疾病人群详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function groupDetail(params) {
    const url = 'client/v1/Crowd/detail'

    return peace.http.post(url, params)
}
/**
 * 获取疾病人群推荐医生
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function doctorList(params) {
    const url = 'client/v1/recommend_doctor/lists'

    return peace.http.post(url, params)
}

export default {
    /** 获取身体部位疾病 **/
    getAllBodyArea,
    /** 获取人群疾病详情 **/
    diseaseInfo,
    /** 获取身体疾病详情 **/
    getBodySymptomDetail,
    /** 获取疾病人群列表 **/
    diagnoseList,
    /** 获取疾病人群详情 **/
    groupDetail,
    /** 获取疾病人群推荐医生 **/
    doctorList,
}
