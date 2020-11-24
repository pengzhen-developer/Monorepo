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
      this.getAll()
    })
  },
  methods: {
    getAll() {
      const params = {
        custCode: Util.user.getUserInfo().custCode
      }

      const paramsRuleCount1 = {
        hosCode: Util.user.getUserInfo().custCode,
        ruleType: 1
      }

      const paramsRuleCount2 = {
        hosCode: Util.user.getUserInfo().custCode,
        ruleType: 2
      }

      const iterable = [
        Service.drugCount(params),
        Service.PharCount(params),
        Service.PrescriptionCount(),
        Service.ruleCountOfOrgan(paramsRuleCount1),
        Service.ruleCount(paramsRuleCount2),
        Service.CustDrugsTotal(params)
      ]

      // 因为是历史遗留接口，所以使用多接口获取数据， 使用 Promise.all 合并请求
      Promise.all(iterable).then((values) => {
        this.totalStatis.custDrugCount = Peace.numeral(values[0].data).format('0,0')
        this.totalStatis.PharCount = Peace.numeral(values[1].data).format('0,0')
        this.totalStatis.totalCount = Peace.numeral(values[2].data.totalCount).format('0,0')
        this.auditStatis.checkedCount = Peace.numeral(values[2].data.checkedCount).format('0,0')
        this.auditStatis.uncheckedCount = Peace.numeral(values[2].data.uncheckedCount).format('0,0')
        this.auditStatis.applyCount = Peace.numeral(values[3].data).format('0,0')
        this.auditStatis.customCust = Peace.numeral(values[4].data).format('0,0')
        this.auditStatis.AwaitExamineCount = Peace.numeral(values[5].data.AwaitExamineCount).format('0,0')
        this.auditStatis.MappingCount = Peace.numeral(values[5].data.MappingCount).format('0,0')
        this.auditStatis.NotMappingCount = Peace.numeral(values[5].data.NotMappingCount).format('0,0')
      })
    }
  }
}
</script>

<style scoped>
</style>
