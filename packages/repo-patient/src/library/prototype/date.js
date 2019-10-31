/*
 * @Author: PengZhen
 * @Description: 扩展 date 原型常用方法
 * @Date: 2018-07-06 11:24:10
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-10 09:39:58
 */

/* eslint-disable no-extend-native */

/**
 * 日期格式化
 * @formatStr: 格式化参数, 默认yyyy-MM-dd
 * @return:    Date
 * e.g.         new Date().formatDate('yyyy-MM-dd')  =>  '2016-12-12'
 */

Date.prototype.formatDate = function(formatStr) {
  if (!formatStr) {
    formatStr = 'yyyy-MM-dd'
  }

  var dict = {
    yyyy: this.getFullYear(),
    M: this.getMonth() + 1,
    d: this.getDate(),
    H: this.getHours(),
    m: this.getMinutes(),
    s: this.getSeconds(),
    MM: ('' + (this.getMonth() + 101)).substr(1),
    dd: ('' + (this.getDate() + 100)).substr(1),
    HH: ('' + (this.getHours() + 100)).substr(1),
    mm: ('' + (this.getMinutes() + 100)).substr(1),
    ss: ('' + (this.getSeconds() + 100)).substr(1)
  }
  return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
    return dict[arguments[0]]
  })
},
/**
 * 输入Unix时间戳，返回指定时间格式
 */
Date.prototype.calcTimeHeader = function() {
  // 格式化传入时间
  let date = new Date(parseInt(this.valueOf())),
      year = date.getUTCFullYear(),
      month = date.getUTCMonth(),
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getUTCMinutes()
  // 获取当前时间
  let currentDate = new Date(),
      currentYear = date.getUTCFullYear(),
      currentMonth = date.getUTCMonth(),
      currentDay = currentDate.getDate()

  // if(bool){
  //   return `${year}/${month + 1}/${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  // }
  // 计算是否是同一天
  if (currentYear == year && currentMonth == month && currentDay == day) {//同一天直接返回
        return `${hour}:${minute < 10 ? '0' + minute : minute}`
  }
  // 计算是否是昨天
  let yesterday = new Date(currentDate - 24 * 3600 * 1000); // 昨天
  let beforeOne = new Date(currentDate - 48 * 3600 * 1000); // 1天前
  let beforeTwo = new Date(currentDate - 72 * 3600 * 1000); // 2天前
  let beforeTHr = new Date(currentDate - 96 * 3600 * 1000); // 3天前
  if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth() && day == yesterday.getDate()) {//昨天
    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
  } else if (year == beforeOne.getUTCFullYear() && month == beforeOne.getUTCMonth() && day == beforeOne.getDate()) {
    return this.timeToDay() + `${hour}:${minute < 10 ? '0' + minute : minute}`
  } else if (year == beforeTwo.getUTCFullYear() && month == beforeTwo.getUTCMonth() && day == beforeTwo.getDate()) {
    return this.timeToDay() + `${hour}:${minute < 10 ? '0' + minute : minute}`
  } else if (year == beforeTHr.getUTCFullYear() && month == beforeTHr.getUTCMonth() && day == beforeTHr.getDate()) {
    return this.timeToDay() + `${hour}:${minute < 10 ? '0' + minute : minute}`
  } else {
    return `${year}/${month + 1}/${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  }
},

Date.prototype.timeToDay = function(){
  let date = new Date(parseInt(this.valueOf() || (new Date()).valueOf())),
      dic = {
        0: '星期日',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
      }
  return dic[date.getUTCDay()]
},

/**
 * 日期格式化
 * @formatStr: 格式化参数, 默认yyyy-MM-dd HH:mm
 * @return:    Date
 * e.g.         new Date().formatTime('yyyy-MM-dd HH:mm:ss')  =>  '2016-12-12 12:00:00'
 */
Date.prototype.formatTime = function(formatStr) {
  if (!formatStr) {
    formatStr = 'yyyy-MM-dd HH:mm:ss'
  }

  return this.formatDate(formatStr)
}

/**
 * des:        日期操作
 * @proStr:    格式化参数
 * @return:    Date
 * e.g.         new Date().proDate('{%y+1}-{%M+2}-{%d+1}-{%H+1}-{%m+1}-{%s+1}') //年月日时分秒全部加1
 */
Date.prototype.proDate = function(proStr) {
  var dealWith = function(str, date) {
    let t = str.substr(0, 1)
    let num = 0
    if (str.indexOf('+') > -1) {
      num = str.substr(str.indexOf('+'))
    } else if (str.indexOf('-') > -1) {
      num = str.substr(str.indexOf('-'))
    }
    switch (t) {
      case 'y':
        date.setFullYear(date.getFullYear() + parseInt(num))
        break
      case 'M':
        date.setMonth(date.getMonth() + parseInt(num))
        break
      case 'd':
        date.setDate(date.getDate() + parseInt(num))
        break
      case 'H':
        date.setHours(date.getHours() + parseInt(num))
        break
      case 'm':
        date.setMinutes(date.getMinutes() + parseInt(num))
        break
      case 's':
        date.setSeconds(date.getSeconds() + parseInt(num))
        break
    }
    return date
  }

  let arr = []
  let date
  arr = proStr.split('{%')
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].replace('}-', '')
    arr[i] = arr[i].replace('}', '')
    date = dealWith(arr[i], this)
  }
  return date
}

/*
 * 为了避免日期类型没有原型方法而扩展, 无实际意义
 */
Date.prototype.toDate = function() {
  return this
}
