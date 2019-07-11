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

export default {
    /** 获取首页接口 */
    getMenu,
}
