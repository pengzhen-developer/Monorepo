
/**
 * ▼▼▼▼▼▼▼▼▼▼▼  微信授权页（中转页），如有逻辑新增和修改，务必注释清楚  ▼▼▼▼▼▼▼▼▼▼▼
 *
 * step 1，判断当前 url 参数是否合法
 *      1.1，当前参数不合法，跳转提示页
 *
 * step 2，判断当前用户是否需要微信授权信息
 *      2.1，进行平台微信授权（用于支付）
 *
 * step 3，判断当前 url 参数，跳转不同的业务页
 *
 * ▲▲▲▲▲▲▲▲▲▲▲  微信授权页（中转页），如有逻辑新增和修改，务必注释清楚  ▲▲▲▲▲▲▲▲▲▲▲
 */

<template>
  <div class="redirect">
    <van-loading />
    <span>加载中</span>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  created() {
    // 未登录状态下，不能进行授权，直接返回登录页
    if (!peace.cache.get(peace.type.USER.INFO)) {
      this.$router.replace(peace.config.system.loginPage)
      return
    }

    // step 1
    if (!this.validateParams()) {
      return
    }

    // 首次进入，非微信回调
    if (!peace.util.queryUrlParam('code') && !peace.util.queryUrlParam('codeType')) {
      this.init()
    }

    // 微信授权回调，获取 openId
    else {
      if (this.needWxPlateformAuth() && peace.util.queryUrlParam('codeType') === 'plateform') {
        this.getOpenIdToPlateform()
      } else if (this.needWxChannelAuth() && peace.util.queryUrlParam('codeType') === 'channel') {
        this.getOpenIdToChannel()
      } else {
        this.init()
      }
    }
  },

  methods: {
    init() {
      // step 2
      if (!this.wxAuth()) {
        return
      }

      // step 3
      this.redirect()
    },

    /**
     * step 1，验证跳转参数是否合法
     *
     *      参数 channelId / netHospitalId 必须同时存在或者同时不存在
     *      参数 code / codeType 必须同时存在或者同时不存在
     *      参数 code 必须未被使用过
     */
    validateParams() {
      const WX_AUTH_CODE = peace.cache.get(peace.type.SYSTEM.WX_AUTH_CODE) || []
      const CHANNELID = peace.cache.get(peace.type.SYSTEM.CHANNELID)
      const NETHOSPITALID = peace.cache.get(peace.type.SYSTEM.NETHOSPITALID)
      const code = peace.util.queryUrlParam('code')
      const codeType = peace.util.queryUrlParam('codeType')

      if (!((CHANNELID && NETHOSPITALID) || (!CHANNELID && !NETHOSPITALID))) {
        peace.util.alert('渠道参数异常，请退出后重新访问')

        return false
      }

      if (!((code && codeType) || (!code && !codeType))) {
        peace.util.alert('授权参数异常，请退出后重新访问')

        return false
      }

      // 当前授权 code 已被使用
      if (code && WX_AUTH_CODE && WX_AUTH_CODE.includes(code)) {
        setTimeout(this.redirect)

        return false
      } else {
        if (code) {
          WX_AUTH_CODE.push(code)
        }

        peace.cache.set(peace.type.SYSTEM.WX_AUTH_CODE, WX_AUTH_CODE)
      }

      return true
    },

    /**
     * step 2，判断当前用户是否需要微信授权信息
     *      2.1，进行平台微信授权（用于支付）
     *      2.2，如果缓存存在 channelId，进行渠道微信授权（用于通知）
     */
    wxAuth() {
      if (this.needWxPlateformAuth()) {
        this.wxPlateformAuth()

        return false
      }

      if (this.needWxChannelAuth()) {
        this.wxChannelAuth()

        return false
      }

      return true
    },

    /**
     * step 3，判断当前 url 参数，跳转不同的业务页
     */
    redirect() {
      // 授权完成，清除 open id，回跳业务页
      peace.cache.remove(peace.type.SYSTEM.WX_AUTH_PLATEFORM_OPEN_ID)
      peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CHANNEL_OPEN_ID)

      this.$router.replace(this.$route.query.referrer)
    },

    /** 是否需要平台微信授权 */
    needWxPlateformAuth() {
      // 已经存在授权信息
      if (peace.cache.get(peace.type.SYSTEM.WX_AUTH_PLATEFORM_OPEN_ID)) {
        return false
      }
      // 不存在授权信息，需要进行授权
      else {
        return true
      }
    },

    /** 是否需要渠道微信授权 */
    needWxChannelAuth() {
      // 已经存在授权信息
      if (peace.cache.get(peace.type.SYSTEM.WX_AUTH_CHANNEL_OPEN_ID)) {
        return false
      }
      // 非渠道进入
      if (!peace.cache.get(peace.type.SYSTEM.CHANNELID)) {
        return false
      }
      // 不存在授权信息，需要进行授权
      else {
        return true
      }
    },

    /** 根据 code 获取 openId (平台) */
    getOpenIdToPlateform() {
      peace.http
        .post('/wap/v1/Account/wxAuth', {
          code: peace.util.queryUrlParam('code')
        })
        .then(res => {
          peace.cache.set(peace.type.SYSTEM.WX_AUTH_PLATEFORM_OPEN_ID, res.data.openId)
        })
        .finally(() => {
          this.init()
        })
    },

    /** 根据 code 获取 openId (渠道) */
    getOpenIdToChannel() {
      peace.http
        .post('/wap/v1/Account/wxAuth', {
          otherCode: peace.util.queryUrlParam('code')
        })
        .then(res => {
          peace.cache.set(peace.type.SYSTEM.WX_AUTH_CHANNEL_OPEN_ID, res.data.openId)
        })
        .finally(() => {
          this.init()
        })
    },

    /** 平台微信授权，授权完成后，会重定向，在 url 参数通过 codeType === plateform 判断是平台微信授权 */
    wxPlateformAuth() {
      const prefix = window.location.href.split('&split=1')[0]
      const url = encodeURIComponent(prefix + '&split=1&codeType=plateform')
      peace.wx.auth(peace.config.APPID, url)
    },

    /** 渠道微信授权，授权完成后，会重定向，在 url 参数通过 codeType === channel 判断是渠道微信授权 */
    wxChannelAuth() {
      peace.http.post('/wap/v1/Account/getAppId').then(res => {
        const prefix = window.location.href.split('&split=1')[0]
        const url = encodeURIComponent(prefix + '&split=1&codeType=channel')
        peace.wx.auth(res.data.appId, url)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.redirect {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;

  span {
    color: #aaaaaa;
  }
}
</style>
