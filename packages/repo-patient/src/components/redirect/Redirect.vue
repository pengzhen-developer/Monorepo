
/**
 * ▼▼▼▼▼▼▼▼▼▼▼  系统中转页，如有逻辑新增和修改，务必注释清楚  ▼▼▼▼▼▼▼▼▼▼▼
 *
 * step 1，判断当前 url 参数是否合法
 *      1.1，当前参数不合法，跳转提示页
 *
 * step 2，根据策略模式，跳转不同业务
 *
 * ▲▲▲▲▲▲▲▲▲▲▲  系统中转页，如有逻辑新增和修改，务必注释清楚  ▲▲▲▲▲▲▲▲▲▲▲
 */

<template>
  <div class="redirect">
    <van-loading />
    <span>加载中</span>
  </div>
</template>

<script>
import peace from '@src/library'

/**
 * 跳转标识, 当没有参数时，默认跳转大平台首页
 * home：首页
 * registered: 预约挂号
 * inquiry: 在线问诊
 * prescription: 我的处方
 */
const redirectKey = peace.util.queryUrlParam('redirect') || 'home'

/**
 * 渠道ID, 渠道 ID 会在 http 请求放置于 header
 */
const channelId = peace.util.queryUrlParam('channelId')

/**
 * 机构ID, 机构 ID 会带入页面初始化时的查询参数
 * 例如在首页 /home/index 中判断是否存在 netHospitalId ，用于加载不同的组件
 */
const netHospitalId = peace.util.queryUrlParam('netHospitalId')

/**
 * 医生ID 扫码进入
 * 例如在首页 /home/index 中判断是否存在 ID ，用于加载不同的组件
 */
const doctorId = peace.util.queryUrlParam('doctorId')
const isEwm = peace.util.queryUrlParam('isEwm')
export default {
  data() {
    return {
      redirectMap: {
        /** 首页 */
        home: '/home/index',
        /** 预约挂号 */
        registered: '/hospital/depart/hospitalDepartSelect',
        /** 在线问诊 */
        inquiry: '/components/doctorList',
        /** 我的处方 */
        prescription: '/components/theRecipeList',
        // 医生主页
        doctorDetail: '/components/doctorDetail'
      }
    }
  },

  created() {
    if (this.validateParams()) {
      this.removeCache()
      this.cacheParams()
      this.redirectByKey()
    }
  },

  methods: {
    /**
     * 验证跳转参数是否合法
     * 参数 redirect 必须
     * 参数 channelId / netHospitalId 必须同时存在或者同时不存在
     */
    validateParams() {
      if (!redirectKey || !this.redirectMap[redirectKey]) {
        peace.util.alert('未匹配到 redirectKey')

        return false
      }

      if (!((channelId && netHospitalId) || (!channelId && !netHospitalId))) {
        peace.util.alert('参数异常')

        return false
      }

      return true
    },

    /**
     * 判断当前 url 参数，跳转不同的业务页
     * 通过策略模式，在 redirectMap[redirectKey] 处理中转逻辑
     */
    redirectByKey() {
      if (redirectKey === 'home') {
        if (netHospitalId && channelId) {
          const json = peace.util.encode({
            netHospitalId: netHospitalId
          })
          
          this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
        } else {
          this.$router.replace(`${this.redirectMap[redirectKey]}`)
        }
      }

      if (redirectKey === 'registered') {
        const json = peace.util.encode({
          id: 'appointment',
          netHospitalId: netHospitalId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      }

      if (redirectKey === 'inquiry') {
        const json = peace.util.encode({
          netHospitalId: netHospitalId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      }

      if (redirectKey === 'prescription') {
        const json = peace.util.encode({
          netHospitalId: netHospitalId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      }

      if (redirectKey === 'doctorDetail') {
        const json = peace.util.encode({
          doctorId,
          isEwm
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      }
    },

    // 清除缓存
    removeCache() {
      // 渠道发生变化（平台 < - > 渠道），清除登录信息，需要重新进行登录并授权
      if (
        peace.cache.get(peace.type.SYSTEM.CHANNELID) !== channelId ||
        peace.cache.get(peace.type.SYSTEM.NETHOSPITALID) !== netHospitalId
      ) {
        peace.cache.remove(peace.type.USER.INFO)
        peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CODE)
      }

      peace.cache.remove(peace.type.SYSTEM.NETHOSPITALID)
      peace.cache.remove(peace.type.SYSTEM.CHANNELID)
    },

    // 缓存
    cacheParams() {
      peace.cache.set(peace.type.SYSTEM.NETHOSPITALID, netHospitalId)
      peace.cache.set(peace.type.SYSTEM.CHANNELID, channelId)
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
