import peace from '@src/library'

/**
 * 获取医院列表接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getNethospitalList(params) {
    const url = 'client/v1/Nethospital/getNethospitalList'

    return peace.http.post(url, params)
}
/**
 * 获取医院主页接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getHospitalInfo(params) {
    const url = 'client/v1/Doctor/getHospitalInfo'

    return peace.http.post(url, params)
}
/**
 * 获取医院科室二联动接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDeptList(params) {
    const url = 'client/v1/Doctor/getDeptList'

    return peace.http.post(url, params)
}
export default {
    getNethospitalList,
    getHospitalInfo,
    getDeptList,
}
