import peace from '@src/library'

/**
 * 获取首页接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMenu(params) {
    const url = 'client/v1/index/page'

    return peace.http.post(url, params)
}

/**
 * 获取微信登录状态
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function GetWxLoginStatus(params) {
    const GetWxLoginStatus = 'wap/v1/Wx/pay'

    return peace.http.post(GetWxLoginStatus, params)
}


/**
 * 获取订单时间
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function GetOrderTime(params) {
    const GetOrderTime = '/wap/v1/Wx/getOrderInfo'

    return peace.http.post(GetOrderTime, params)
}



export default {
    /** 获取首页接口 */
    getMenu,
    /** 获取微信登录状态 */
    GetWxLoginStatus,
    /** 获取订单时间 **/
    GetOrderTime
}
