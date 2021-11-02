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

/**
 * @description: 微信时间格式化
 * @param {*} date
 * @return {*}
 */
export function formatWXDate(date) {
  const isThisYear = (date, now) => {
    return date.getFullYear() == now.getFullYear()
  }

  const isThisWeek = (date, now) => {
    if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
      if (now.getDay() - date.getDay() < now.getDay() && now.getDate() - date.getDate() > 0 && now.getDate() - date.getDate() < 7) {
        return true
      }
    }
    return false
  }

  const isYesterday = (date, now) => {
    return date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() + 1 == now.getDate()
  }

  const isToday = (date, now) => {
    return date.getYear() == now.getYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate()
  }

  date = new Date(date)
  const now = new Date()

  if (isThisYear(date, now)) {
    if (isToday(date, now)) {
      return formatTime(date, 'HH:mm')
    }

    if (isYesterday(date, now)) {
      return '昨天 ' + formatTime(date, 'HH:mm')
    }

    if (isThisWeek(date, now)) {
      const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weekday[date.getDay()] + ' ' + formatTime(date, 'HH:mm')
    }

    return formatTime(date, 'MM-DD HH:mm')
  } else {
    return formatTime(date, 'YYYY-MM-DD HH:mm')
  }
}

export default {
  formatDate,
  formatTime,
  formatWXDate
}
