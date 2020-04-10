let ua = navigator.userAgent
let device = ''

// device & system
let ipod = ua.match(/(ipod).*\s([\d_]+)/i)
let ipad = ua.match(/(ipad).*\s([\d_]+)/i)
let iphone = ua.match(/(iphone)\sos\s([\d_]+)/i)
let android = ua.match(/(android)\s([\d\\.]+)/i)

if (android) {
  device = 'Android, ' + android[2]
} else if (iphone) {
  device = 'iPhone, iOS ' + iphone[2].replace(/_/g, '.')
} else if (ipad) {
  device = 'iPad, iOS ' + ipad[2].replace(/_/g, '.')
} else if (ipod) {
  device = 'iPod, iOS ' + ipod[2].replace(/_/g, '.')
}

export { device }
export default {
  device
}
