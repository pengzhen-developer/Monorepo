<template>
  <div class="layout-route bg-grey-2"
       v-if="load">
    <!-- 未审处方、已审处方 -->
    <PrescripStatistic v-bind:data="prescripStatis"
                       v-bind:controlledMenuList="controlledMenuList"></PrescripStatistic>

    <div class="row q-gutter-md q-mb-20">
      <!-- 处方审核情况 -->
      <div class="col">
        <PrescripReview v-bind:data="model"></PrescripReview>
      </div>
      <!-- 系统审方统计 -->
      <div class="col">
        <SystemReview v-bind:data="model"></SystemReview>
      </div>
    </div>
    <!-- 规则触发统计 -->
    <RuleTrigger v-bind:data="model"></RuleTrigger>
  </div>
</template>

<script>
import Service from './service'
import PrescripStatistic from './components/PrescripStatistic'
import PrescripReview from './components/PrescripReview'
import SystemReview from './components/SystemReview'
import RuleTrigger from './components/RuleTrigger'

export default {
  name: 'Dashboard',

  components: {
    PrescripStatistic,
    PrescripReview,
    SystemReview,
    RuleTrigger
  },

  data() {
    return {
      load: false,
      prescripStatis: {
        checkedCount: 0,
        uncheckedCount: 0
      },
      model: {
        hosCode: '',
        phaUserId: 0
      },
      controlledMenuList: []
    }
  },

  async created() {
    // 获取受控菜单
    const controlledParams = {
      controlledType: 'pharmacist-dashboard'
    }
    Service.getControlledMenuList(controlledParams).then((res) => {
      this.controlledMenuList = res.data
    })
    const iterable = [Service.getCheckedPrenCount({}), Service.getNotCheckedPrenCount({})]

    Promise.all(iterable).then((values) => {
      this.load = true
      this.prescripStatis.checkedCount = Peace.numeral(values[0].data.checkedCount).format('0,0')
      this.prescripStatis.uncheckedCount = Peace.numeral(values[1].data.notCheckedCount).format('0,0')
    })

    // const userinfo = await Peace.identity.auth.getAccountInfo()
    // this.model.hosCode = userinfo.organCode
    // this.model.phaUserId = userinfo.id
    //this.load = true
    //const params = Peace.util.deepClone(this.model)
    // Service.phaPreCountsByCust(params).then((res) => {
    //   this.prescripStatis.checkedCount = Peace.numeral(res.data.list.checkedCount).format('0,0')
    //   this.prescripStatis.uncheckedCount = Peace.numeral(res.data.list.uncheckedCount).format('0,0')
    // })
  }
}
</script>

<style>
</style>