
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
 * 分享标识, 机构主页分享进入会有此参数，用以区分 用户是否通过分享进入程序
 *
 */
const isShare = peace.util.queryUrlParam('isShare')
/**
 * 医生ID 扫码进入
 * 例如在首页 /home/index 中判断是否存在 ID ，用于加载不同的组件
 */
const doctorId = peace.util.queryUrlParam('doctorId')
const isEwm = peace.util.queryUrlParam('isEwm')

/**
 * 处方详情
 * prescribeId
 */
const prescribeId = peace.util.queryUrlParam('prescribeId')
/**
 * 购药订单详情-预约挂号详情
 * orderNo
 * orderType
 */
const orderNo = peace.util.queryUrlParam('orderNo')
const orderType = peace.util.queryUrlParam('orderType')
/**
 * 问诊-复诊详情
 * prescribeId
 */
const inquiryId = peace.util.queryUrlParam('inquiryId')
/**
 *
 * H5支付 回调标识 用以刷新订单详情
 * tradeType
 */
const tradeType = peace.util.queryUrlParam('tradeType')
export default {
  data() {
    return {
      lockEventPopstate: false,
      redirectMap: {
        /** 首页 */
        home: '/home/index',
        /** 预约挂号 */
        registered: '/hospital/depart/hospitalDepartSelect',
        /** 在线问诊 */
        inquiry: '/components/doctorList',
        /** 我的处方 */
        prescription: '/components/theRecipeList',
        /** 医生主页 */

        doctorDetail: '/components/doctorDetail',
        /** 处方详情 */

        prescriptionDetail: '/components/theRecipe',
        /** 购药订单详情 */
        medicineOrderDetail: '/order/userDrugDetail',
        /** 复诊-问诊订单详情 */
        visitOrderDetail: '/setting/userConsultDetail',
        /** 挂号订单详情 */
        registerDetail: '/setting/order/userOrderDetail',

        /** 服务包订单详情 */
        servicePackageDetail: '/setting/order/userServicePackageDetail'
      }
    }
  },

  created() {
    // step_1 替换浏览器历史
    history.pushState(null, null, document.URL)

    // step_2 监听回退
    if (!peace.lockEventPopstate) {
      peace.lockEventPopstate = true

      window.addEventListener('popstate', this.goBack, false)
    }

    if (this.validateParams()) {
      this.removeCache()
      this.cacheParams()
      this.redirectByKey()
    }
  },

  methods: {
    goBack(e) {
      const params = peace.util.decode(this.$route.params.json)
      //仅H5支付返回应用需监听
      if (params.tradeType) {
        // 回到中间页，跳转首页
        const pathNameList = ['/order/userDrugDetail', '/setting/userConsultDetail', '/setting/order/userOrderDetail']
        pathNameList.forEach((pathName) => {
          if (e.currentTarget.location.pathname.indexOf(pathName) != -1) {
            //购药订单-单独处理 回到处方详情 - 处方id 在缓存取
            if (e.currentTarget.location.pathname.indexOf('/order/userDrugDetail') != -1) {
              const json = peace.util.encode({
                tradeType: 'tradeType'
              })
              this.$router.replace(`/components/theRecipe/${json}`)
            } else {
              this.$router.push(peace.config.system.homePage)
            }
          }
        })
      }
    },
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

      // if (!((channelId && netHospitalId) || (!channelId && !netHospitalId))) {
      //   peace.util.alert('参数异常')

      //   return false
      // }
      const UA = window.navigator.userAgent.toLowerCase()
      var SOURCE = UA.match(/MicroMessenger/i) !== 'micromessenger' ? 'h5' : 'gzh'
      if (!((channelId && netHospitalId) || (!channelId && !netHospitalId) || (SOURCE == 'h5' && netHospitalId))) {
        peace.util.alert('渠道参数异常，请退出后重新访问')

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
            netHospitalId: netHospitalId,
            isShare: isShare
          })
          this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
        } else {
          this.$router.replace(`${this.redirectMap[redirectKey]}`)
        }
      } else if (redirectKey === 'registered') {
        const json = peace.util.encode({
          id: 'appointment',
          netHospitalId: netHospitalId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'inquiry') {
        const json = peace.util.encode({
          netHospitalId: netHospitalId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'prescription') {
        const json = peace.util.encode({
          netHospitalId: netHospitalId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'doctorDetail') {
        const json = peace.util.encode({
          doctorId,
          isEwm
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'prescriptionDetail') {
        const json = peace.util.encode({
          prescribeId
        })
        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'medicineOrderDetail') {
        const json = peace.util.encode({
          orderNo,
          tradeType
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'visitOrderDetail') {
        const json = peace.util.encode({
          inquiryId,
          tradeType
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'registerDetail') {
        const json = peace.util.encode({
          orderInfo: {
            orderNo,
            orderType
          },

          tradeType
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      } else if (redirectKey === 'servicePackageDetail') {
        const json = peace.util.encode({
          orderNo
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      }
    },

    // 清除缓存
    removeCache() {
      // 渠道发生变化（平台 < - > 渠道），清除登录信息，需要重新进行登录并授权
      // 非微信环境不区分渠道
      const UA = window.navigator.userAgent.toLowerCase()
      if (
        UA.match(/MicroMessenger/i) == 'micromessenger' &&
        (peace.cache.get(peace.type.SYSTEM.CHANNELID) !== channelId || peace.cache.get(peace.type.SYSTEM.NETHOSPITALID)) !== netHospitalId
      ) {
        peace.cache.remove(peace.type.USER.INFO)
        peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CODE)
      }

      peace.cache.remove(peace.type.SYSTEM.NETHOSPITALID)
      peace.cache.remove(peace.type.SYSTEM.NETHOSPITALNAME)
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
