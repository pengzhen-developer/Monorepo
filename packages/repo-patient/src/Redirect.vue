<template>
  <div>
    <h4>正在为您跳转，请稍后</h4>
  </div>
</template>

<script>
import peace from '@src/library'

/**
 * 跳转标识
 * home：首页
 * registered: 预约挂号
 * inquiry: 在线问诊
 * prescription: 我的处方
 */
const redirectKey = peace.util.queryUrlParam('redirect')

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
        doctorDetail:  '/components/doctorDetail'
      }
    }
  },

  created() {
    if (this.redirectMap[redirectKey]) {
      this.cacheParams()
      this.redirect()
    } else {
      peace.util.alert('未找到 Redirect 对照字典')
    }
  },

  methods: {
    cacheParams() {
      peace.cache.remove(peace.type.SYSTEM.NETHOSPITALID)
      peace.cache.remove(peace.type.SYSTEM.CHANNELID)
      peace.cache.set(peace.type.SYSTEM.NETHOSPITALID, netHospitalId)
      peace.cache.set(peace.type.SYSTEM.CHANNELID, channelId)
    },

    redirect() {
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
          doctorId
        })

        this.$router.replace(`${this.redirectMap[redirectKey]}/${json}`)
      }
    }
  }
}
</script>

<style>
</style>
