export const calcTimeHeader = (data) => {
  const date = new Date(data)
  const now = new Date()

  if (isThisYear(date, now)) {
    if (isToday(date, now)) {
      return Peace.util.formatTime(date, 'HH:mm')
    }

    if (isYesterday(date, now)) {
      return '昨天 ' + Peace.util.formatTime(date, 'HH:mm')
    }

    if (isThisWeek(date, now)) {
      const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weekday[date.getDay()] + ' ' + Peace.util.formatTime(date, 'HH:mm')
    }

    return Peace.util.formatTime(date, 'MM-DD HH:mm')
  } else {
    return Peace.util.formatTime(date, 'YYYY-MM-DD HH:mm')
  }
}
export const isThisYear = (date, now) => {
  return date.getFullYear() == now.getFullYear()
}

export const isThisWeek = (date, now) => {
  if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
    if (now.getDay() - date.getDay() < now.getDay() && now.getDate() - date.getDate() > 0 && now.getDate() - date.getDate() < 7) {
      return true
    }
  }
  return false
}

export const isYesterday = (date, now) => {
  return date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() + 1 == now.getDate()
}

export const isToday = (date, now) => {
  return date.getYear() == now.getYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate()
}

export default {
  calcTimeHeader,
  isThisYear,
  isThisWeek,
  isYesterday,
  isToday
}
