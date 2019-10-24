import service from '@src/service'
import config from '@src/config'

/**
 *
 *
 * @export
 * @param  data 调用微信时入参config
 * @param  paySuc 支付成功后的回调，因微信不能保证一定会有成功响应，所以在失败的时候亦会有调用。
 * @param  payCancel 支付取消回调
 * @returns
 */
export function payInvoke(data, paySuc=null, payCancel=null) {
    if(WeixinJSBridge) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res) {
            //alert(res.err_msg);
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                paySuc && paySuc();
            }
            if (res.err_msg == 'get_brand_wcpay_request:fail') {
                paySuc && paySuc();
            }
            if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                payCancel && payCancel();
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
export function pay(params, orderExp=null, paySuc=null, payCancel=null) {
    service.index
        .GetWxLoginStatus(params)
        .then(res => {
            if (res.code === 200) {
              console.log('订单入参', params)
              let data = res.data
              if (data) {
                  payInvoke(data,paySuc, payCancel)
              } else {
                // 进入微信授权
                let appid =  config.APPID;
                let redirect_uri = location.href
                let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`
                window.location.href = url
              }
            }
        })
        .catch(res => {
            if(res.data) {
                console.log('订单异常时响应', res.data)
                if(orderExp) {
                    orderExp(res);
                }
            }

        })
}
export default {
    pay,
    payInvoke
}
