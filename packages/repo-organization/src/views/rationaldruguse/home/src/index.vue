<template>
  <div class="layout-route bg-grey-2">
    <!-- 药品总数、药师总数、处方/医嘱总数 -->
    <TotalStatistic v-bind:data="totalStatis"></TotalStatistic>
    <!-- 审核统计 -->
    <AuditStatistic v-bind:data="auditStatis"></AuditStatistic>

    <div class="row q-gutter-md q-mb-20">
      <!-- 处方审核情况 -->
      <div class="col">
        <PrescripReview></PrescripReview>
      </div>
      <!-- 系统审方统计 -->
      <div class="col">
        <SystemReview></SystemReview>
      </div>
    </div>
    <!-- 规则触发统计 -->
    <RuleTrigger></RuleTrigger>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from './service'
import TotalStatistic from './components/TotalStatistic'
import AuditStatistic from './components/AuditStatistic'
import PrescripReview from './components/PrescripReview'
import SystemReview from './components/SystemReview'
import RuleTrigger from './components/RuleTrigger'

export default {
  name: 'Home',
  components: {
    TotalStatistic,
    AuditStatistic,
    PrescripReview,
    SystemReview,
    RuleTrigger
  },
  data() {
    return {
      totalStatis: {
        custDrugCount: 0,
        PharCount: 0,
        totalCount: 0
      },
      auditStatis: {
        checkedCount: 0,
        uncheckedCount: 0,
        applyCount: 0,
        customCust: 0,
        AwaitExamineCount: 0,
        MappingCount: 0,
        NotMappingCount: 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDrugCount()
      this.getPharCount()
      this.getPrescriptionCount()
      this.getRuleCount(1)
      this.getRuleCount(2)
      this.getCustDrugsTotal()
    })
  },
  methods: {
    //药品总数
    getDrugCount() {
      const params = {
        custCode: Util.user.getUserInfo().custCode
      }
      Service.drugCount(params).then((res) => {
        this.totalStatis.custDrugCount = Peace.numeral(res.data).format('0,0')
      })
    },
    //药师总数
    getPharCount() {
      const params = {
        custCode: Util.user.getUserInfo().custCode
      }
      Service.PharCount(params).then((res) => {
        this.totalStatis.PharCount = Peace.numeral(res.data).format('0,0')
      })
    },
    //处方数量统计-处方/医嘱总数 未审处方 已审处方
    getPrescriptionCount() {
      Service.PrescriptionCount().then((res) => {
        let data = res.data
        this.totalStatis.totalCount = Peace.numeral(data.totalCount).format('0,0')
        this.auditStatis.checkedCount = Peace.numeral(data.checkedCount).format('0,0')
        this.auditStatis.uncheckedCount = Peace.numeral(data.uncheckedCount).format('0,0')
      })
    },
    //通用规则传type为1，自定义规则传type为2
    getRuleCount(type) {
      const params = {
        hosCode: Util.user.getUserInfo().custCode,
        ruleType: type
      }
      Service.ruleCount(params).then((res) => {
        if (type == 1) {
          this.auditStatis.applyCount = Peace.numeral(res.data).format('0,0')
        } else {
          this.auditStatis.customCust = Peace.numeral(res.data).format('0,0')
        }
      })
    },
    //药品数量统计
    getCustDrugsTotal() {
      const params = {
        custCode: Util.user.getUserInfo().custCode
      }
      Service.CustDrugsTotal(params).then((res) => {
        let data = res.data
        this.auditStatis.AwaitExamineCount = Peace.numeral(data.AwaitExamineCount).format('0,0')
        this.auditStatis.MappingCount = Peace.numeral(data.MappingCount).format('0,0')
        this.auditStatis.NotMappingCount = Peace.numeral(data.NotMappingCount).format('0,0')
      })
    }
  }
}
</script>

<style scoped>
</style>
