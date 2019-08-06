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
export default {
    /** 获取身体部位疾病 **/
    getAllBodyArea,
}
