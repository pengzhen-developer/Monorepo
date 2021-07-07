const sensors = require('sa-sdk-javascript')
const server_url = process.env.VUE_APP_SA_SERVER_URL

function getSensors() {
  const userId = $peace.cache.get($peace.type.USER.INFO)?.patientInfo?.id || ''
  sensors.init({
    server_url: server_url,
    //子配置项 true 表示采集,false 表示不采集,未设置的参数取默认值。
    preset_properties: {
      //是否采集 $latest_utm 最近一次广告系列相关参数，默认值 true。
      latest_utm: true,
      //是否采集 $latest_traffic_source_type 最近一次流量来源类型，默认值 true。
      latest_traffic_source_type: true,
      //是否采集 $latest_search_keyword 最近一次搜索引擎关键字，默认值 true。
      latest_search_keyword: true,
      //是否采集 $latest_referrer 最近一次前向地址，默认值 true。
      latest_referrer: true,
      //是否采集 $latest_referrer_host 最近一次前向地址，1.14.8 以下版本默认是true，1.14.8 及以上版本默认是 false，需要手动设置为 true 开启。
      latest_referrer_host: true,
      //是否采集 $latest_landing_page 最近一次落地页地址，默认值 false。
      latest_landing_page: true,
      //是否采集 $url 页面地址作为公共属性，1.16.5 以下版本默认是 false，1.16.5 及以上版本默认是 true。
      url: true,
      //是否采集 $title 页面标题作为公共属性，1.16.5 以下版本默认是 false，1.16.5 及以上版本默认是 true。
      title: true
    },
    heatmap: {
      //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap: 'not_collect',
      //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map: 'not_collect'
    }
  })
  sensors.registerPage({
    platform_type: 'H5', // 平台类型
    app_name: '智药云H5', // 应用名称
    login_id: userId, // 用户ID
    is_login: userId ? true : false, // 是否为登录状态
    // app_id: '业务端的ID', //业务端的ID
    $url: window.location.href,
    $os: getOS(),
    $os_version: getOS(true),
    $browser: Browse(),
    $browser_version: Browse(true),
    $time: new Date()
  })
  if (!$peace.$sensors) {
    // sensors.quick('isReady', function() {
    //   sensors.quick('autoTrackSinglePage')
    // })
    $peace.$sensors = sensors
  }
}

// 获取操作系统版本
function getOS(version) {
  var sUserAgent = navigator.userAgent
  var isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows'
  var isMac = navigator.platform == 'Mac68K' || navigator.platform == 'MacPPC' || navigator.platform == 'Macintosh' || navigator.platform == 'MacIntel'
  if (isMac) return 'Mac'
  var isUnix = navigator.platform == 'X11' && !isWin && !isMac
  if (isUnix) return 'Unix'
  var isLinux = String(navigator.platform).indexOf('Linux') > -1
  if (isLinux) return 'Linux'
  if (isWin) {
    if (!version) return 'Windows'
    var isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1
    if (isWin2K) return 'Win2000'
    var isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1
    if (isWinXP) return 'WinXP'
    var isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1
    if (isWin2003) return 'Win2003'
    var isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1
    if (isWinVista) return 'WinVista'
    var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1
    if (isWin7) return 'Win7'
    var isWin10 = sUserAgent.indexOf('Windows NT 10') > -1 || sUserAgent.indexOf('Windows 10') > -1
    if (isWin10) return 'Win10'
  }
  return 'other'
}

/**获得浏览器***/
function Browse(detail) {
  var browser = {}
  var userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.match(/msie ([\d.]+)/)) {
    browser.ie = userAgent.match(/msie ([\d.]+)/)[1]
  } else if (userAgent.match(/firefox\/([\d.]+)/)) {
    browser.firefox = userAgent.match(/firefox\/([\d.]+)/)[1]
  } else if (userAgent.match(/chrome\/([\d.]+)/)) {
    browser.chrome = userAgent.match(/chrome\/([\d.]+)/)[1]
  } else if (userAgent.match(/opera\/([\d.]+)/)) {
    browser.opera = userAgent.match(/opera\/([\d.]+)/)[1]
  } else if (userAgent.match(/version\/([\d.]+).*safari/)) {
    browser.safari = userAgent.match(/version\/([\d.]+).*safari/)[1]
  }
  var version = ''
  if (browser.ie) {
    version = 'IE ' + browser.ie
  } else {
    if (browser.firefox) {
      version = detail ? 'firefox ' + browser.firefox : 'firefox'
    } else {
      if (browser.chrome) {
        version = detail ? 'chrome ' + browser.chrome : 'chrome'
      } else {
        if (browser.opera) {
          version = detail ? 'opera ' + browser.opera : 'opera'
        } else {
          if (browser.safari) {
            version = detail ? 'safari ' + browser.safari : 'safari'
          } else {
            version = '未知浏览器'
          }
        }
      }
    }
  }
  return version
}

/**
 * 全局页面停留事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function globalPageStop(params) {
  $peace.$sensors.track('GlobalPageStop', {
    page_name: params.page_name,
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    event_duration: params.event_duration
  })
}

/**
 * 首页打开事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function homeTrackByOpen(params) {
  $peace.$sensors.track('OpenHomePage', {
    page_app_name: 'H5',
    from_page: params.from_page,
    load_duration: params.load_duration,
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_name: '首页'
  })
}
/**
 * 首页点击事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function homeTrackByClick(params) {
  $peace.$sensors.track('ClickHomePage', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_name: '首页',
    click_object: params.click_object,
    area: params.area
  })
}
/**
 * 医生主页点击
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function clickDoctorHomePage(params) {
  $peace.$sensors.track('ClickDoctorHomePage', {
    app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_name: '医生主页',
    click_object: params.click_object,
    page_area: params.page_area
  })
}

/**
 * 预约号源点击事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function appointmentRegister(params) {
  $peace.$sensors.track('AppointmentRegister', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_name: '复诊预约',
    click_object: params.click_object
  })
}

/**
 * 医生助手点击
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function clickDoctorAssistant(params) {
  $peace.$sensors.track('ClickDoctorAssistant', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_name: '医生助手',
    business_type: params.business_type,
    make_appointment_click: params.make_appointment_click,
    supplement_question_click: params.supplement_question_click,
    supplement_question_shorter: params.supplement_question_shorter
  })
}

/**
 * 医生助手跳转/关闭事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function jumpDoctorAssistant(params) {
  $peace.$sensors.track('JumpDoctorAssistant', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    business_type: params.business_type,
    end_question_id: params.end_question_id,
    to_page: params.to_page
  })
}

/**
 * 确认订单关闭/离开事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function confirmOrder(params) {
  $peace.$sensors.track('ConfirmOrder', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_address: params.page_address,
    business_type: params.business_type,
    order_type: params.order_type,
    pay_method: params.pay_method,
    event_duration: params.event_duration
  })
}

/**
 * 提交订单点击事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function commitOrder(params) {
  $peace.$sensors.track('CommitOrder', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    page_name: '订单确认页面',
    business_type: params.business_type,
    click_object: params.click_object,
    pay_method_on_submit: params.pay_method_on_submit
  })
}

/**
 * 支付订单点击事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function payOrder(params) {
  $peace.$sensors.track('PayOrder', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    business_type: params.business_type,
    order_id: params.order_id,
    trigger_page: params.trigger_page,
    click_object: params.click_object,
    own_expense_pay_method: params.own_expense_pay_method
  })
}

/**
 * 取消订单点击事件
 * @export
 * @param {*} params 参数列表
 * @returns
 * */
function cancelOrder(params) {
  $peace.$sensors.track('CancelOrder', {
    page_app_name: 'H5',
    organization_name: params.organization_name || $peace.cache.get($peace.type.SYSTEM.NETHOSPITALNAME),
    business_type: params.business_type,
    trigger_page: params.trigger_page,
    order_status_on_cancel: params.order_status_on_cancel,
    click_object: params.click_object
  })
}
export default {
  getSensors,

  globalPageStop,
  homeTrackByOpen,
  homeTrackByClick,
  clickDoctorHomePage,
  appointmentRegister,
  clickDoctorAssistant,
  jumpDoctorAssistant,
  confirmOrder,
  commitOrder,
  payOrder,
  cancelOrder
}
