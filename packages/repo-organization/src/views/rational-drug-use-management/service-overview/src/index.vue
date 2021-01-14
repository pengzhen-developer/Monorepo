<template>
  <div class="layout-route bg-grey-2">
    <!-- 药品总数、药师总数、处方/医嘱总数 -->
    <TotalStatistic v-bind:data="totalStatis"
                    v-bind:controlledMenuList="controlledMenuList"></TotalStatistic>
    <!-- 匹配药品、待审核药品、尚未配码、通用规则、自定义规则 -->
    <AuditStatistic v-bind:data="auditStatis"
                    v-bind:controlledMenuList="controlledMenuList"></AuditStatistic>
    <!-- 分割线 -->
    <el-divider v-if="isShow"></el-divider>

    <!-- 未审处方、已审处方 -->
    <PrescripStatistic v-bind:data="prescripStatis"
                       v-bind:controlledMenuList="controlledMenuList"></PrescripStatistic>

    <div class="row q-gutter-md q-mb-20">
      <!-- 处方审核情况 -->
      <div class="col">
        <PrescripReview v-bind:controlledMenuList="controlledMenuList"></PrescripReview>
      </div>
      <!-- 系统审方统计 -->
      <div class="col">
        <SystemReview v-bind:controlledMenuList="controlledMenuList"></SystemReview>
      </div>
    </div>
    <!-- 规则触发统计 -->
    <RuleTrigger v-bind:controlledMenuList="controlledMenuList"></RuleTrigger>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from './service'
import TotalStatistic from './components/TotalStatistic'
import AuditStatistic from './components/AuditStatistic'
import PrescripStatistic from './components/PrescripStatistic'
import PrescripReview from './components/PrescripReview'
import SystemReview from './components/SystemReview'
import RuleTrigger from './components/RuleTrigger'

export default {
  name: 'ServiceOverview',
  components: {
    TotalStatistic,
    AuditStatistic,
    PrescripStatistic,
    PrescripReview,
    SystemReview,
    RuleTrigger
  },
  data() {
    return {
      isShow: false,
      totalStatis: {
        custDrugCount: 0,
        PharCount: 0,
        totalCount: 0
      },
      auditStatis: {
        applyCount: 0,
        customCust: 0,
        AwaitExamineCount: 0,
        MappingCount: 0,
        NotMappingCount: 0
      },
      prescripStatis: {
        checkedCount: 0,
        uncheckedCount: 0
      },
      controlledMenuList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getAll()
    })
  },
  methods: {
    getAll() {
      const controlledParams = {
        controlledType: 'organization-drug-dashboard',
        productCode: 'hlyygl'
      }

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
        Service.getControlledMenuList(controlledParams),
        Service.drugCount(params),
        Service.PharCount(params),
        Service.PrescriptionCount(),
        Service.ruleCountOfOrgan(paramsRuleCount1),
        Service.ruleCount(paramsRuleCount2),
        Service.CustDrugsTotal(params)
      ]

      // 因为是历史遗留接口，所以使用多接口获取数据， 使用 Promise.all 合并请求
      Promise.all(iterable).then((values) => {
        this.isShow = true
        this.controlledMenuList = values[0].data
        this.totalStatis.custDrugCount = Peace.numeral(values[1].data).format('0,0')
        this.totalStatis.PharCount = Peace.numeral(values[2].data).format('0,0')
        this.totalStatis.totalCount = Peace.numeral(values[3].data.totalCount).format('0,0')
        this.prescripStatis.checkedCount = Peace.numeral(values[3].data.checkedCount).format('0,0')
        this.prescripStatis.uncheckedCount = Peace.numeral(values[3].data.uncheckedCount).format('0,0')
        this.auditStatis.applyCount = Peace.numeral(values[4].data).format('0,0')
        this.auditStatis.customCust = Peace.numeral(values[5].data).format('0,0')
        this.auditStatis.AwaitExamineCount = Peace.numeral(values[6].data.AwaitExamineCount).format('0,0')
        this.auditStatis.MappingCount = Peace.numeral(values[6].data.MappingCount).format('0,0')
        this.auditStatis.NotMappingCount = Peace.numeral(values[6].data.NotMappingCount).format('0,0')
      })
    }
  }
}
</script>

<style scoped>
.el-divider {
  background-color: rgba(0, 0, 0, 0.05);
}
.el-divider--horizontal {
  margin: 40px 0;
}
</style>
