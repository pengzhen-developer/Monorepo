import service from '@src/service'
//share
import share from './share'
/**
 *
 *
 * @export
 * @param  data 调用微信时入参config
 * @param  paySuc 支付成功后的回调，因微信不能保证一定会有成功响应，所以在失败的时候亦会有调用。
 * @param  payCancel 支付取消回调
 * @returns
 */
export function payInvoke(data, paySuc = null, payCancel = null) {
  if (WeixinJSBridge) {
    WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
      if (res.err_msg == 'get_brand_wcpay_request:ok') {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        paySuc && paySuc()
      }
      if (res.err_msg == 'get_brand_wcpay_request:fail') {
        paySuc && paySuc()
      }
      if (res.err_msg == 'get_brand_wcpay_request:cancel') {
        payCancel && payCancel()
      }
    })
  }
}

/**
 *
 *
 * @export
 * @param  params 微信支付前请求接口入参
 * @param  {funciton} orderExp 订单状态异常时候的回调处理
 * @param {funciton} paySuc 支付成功的微信回调
 * @param {function} payCancel 支付取消时候的回调
 * @returns
 */
export function pay(params, orderExp = null, paySuc = null, payCancel = null) {
  //根据当前浏览器环境 区分支付  JSAPI公众号支付  MWEB H5支付
  //2020-12-17  H5支付申请中 ，两个接口用以区分 公众号支付 H5支付  待申请通过用 接口 pay
  const UA = window.navigator.userAgent.toLowerCase()
  let tradeType = ''
  if (UA.match(/MicroMessenger/i) == 'micromessenger') {
    tradeType = 'JSAPI'

    params.tradeType = tradeType

    return service.index
      .pay(params)
      .then((res) => {
        if (res.code === 200) {
          let data = res.data
          if (data) {
            payInvoke(data, paySuc, payCancel)
          }
        }
      })
      .catch((res) => {
        if (res.data) {
          if (res.data.code == 204) {
            console.warn('订单金额为0：', res.data)
            paySuc && paySuc()
          } else {
            console.warn('订单异常时响应', res.data)
            orderExp && orderExp(res)
          }
        }
      })
  } else {
    tradeType = 'MWEB'

    params.tradeType = tradeType

    return service.index
      .payMultiple(params)
      .then((res) => {
        if (res.code === 200) {
          let data = res.data

          for (const key in $peace.config.system.NIMS) {
            if (Object.hasOwnProperty.call($peace.config.system.NIMS, key)) {
              const element = $peace.config.system.NIMS[key]
              element.im.destroy()
            }
          }

          window.location.href = data.mwebUrl
        }
      })
      .catch((res) => {
        if (res.data) {
          if (res.data.code == 204) {
            console.warn('订单金额为0：', res.data)
            paySuc && paySuc()
          } else {
            console.warn('订单异常时响应', res.data)
            orderExp && orderExp(res)
          }
        }
      })
  }
}

export function auth(appId, redirectUrl) {
  let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect`
  window.location.replace(url)
}
export default {
  pay,
  payInvoke,
  auth,
  share
}
