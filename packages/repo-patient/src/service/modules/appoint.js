import peace from '@src/library'

/**
 * 预约挂号医生列表页
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function choiceDoctor(params) {
    const choiceDoctor = 'register/v1/Register/choiceDoctor'

    return peace.http.post(choiceDoctor, params)
}

/**
 * 预约挂号医生排班页
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function choiceVisitingTime(params) {
    const choiceVisitingTime = 'register/v1/Register/choiceVisitingTime'

    return peace.http.post(choiceVisitingTime, params)
}

/**
 * 预约挂号医生排班
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function choiceVisitingTimeByWeek(params) {
    const choiceVisitingTimeByWeek = 'register/v1/Register/choiceVisitingTimeByWeek'

    return peace.http.post(choiceVisitingTimeByWeek, params)
}

export default {
    choiceDoctor, // 预约挂号医生列表
    choiceVisitingTime, // 预约挂号医生排班页
    choiceVisitingTimeByWeek, // 预约挂号医生排班
}
