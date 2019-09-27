import peace from '@src/library'

/**
 * 获取医院列表接口（取单报告业务）
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
 * 获取医院科室二联动接口（咨询业务）
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDeptList(params) {
    const url = 'wap/v1/Hospital/getNewDeptLists'

    return peace.http.post(url, params)
}
/**
 * 获取预约挂号医院列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getHospitalByRegister(params) {
    const url = 'register/v1/Register/getHospitalByRegister'

    return peace.http.post(url, params)
}
/**
 * 获取预约挂号医院科室
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getRealDeptByRegister(params) {
    const url = 'register/v1/Register/getRealDeptByRegister'

    return peace.http.post(url, params)
}
export default {
    getNethospitalList, // 医院列表 [取单业务]

    getHospitalInfo, // 医院详情

    getDeptList, // 科室列表[咨询业务]

    getHospitalByRegister, // 医院列表[预约业务]
    getRealDeptByRegister, // 科室列表[预约业务]
}
