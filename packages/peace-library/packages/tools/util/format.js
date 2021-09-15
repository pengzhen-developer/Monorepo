import dayjs from './../dayjs/index'

/**
 * 日期格式化
 *
 * .e.g
 *
 * formatDate(new Date(), 'YYYY')
 *
 * @export
 * @param {*} date
 * @param {*} template
 * @returns
 */
export function formatDate(date, template = 'YYYY-MM-DD') {
  console.warn('peace.util.formatDate() has been deprecated. Use peace.dayjs().format() instead')

  return dayjs(date).format(template)
}

/**
 * 时间格式化
 *
 * .e.g
 *
 * formatDate(new Date(), 'YYYY')
 *
 * @export
 * @param {*} date
 * @param {*} template
 * @returns
 */
export function formatTime(date, template = 'YYYY-MM-DD HH:mm:ss') {
  console.warn('peace.util.formatTime() has been deprecated. Use peace.dayjs().format() instead')

  return dayjs(date).format(template)
}

export default {
  formatDate,
  formatTime
}
