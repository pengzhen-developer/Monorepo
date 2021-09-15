<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model"
               label-width="auto">
        <el-form-item label="交易日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn prop="orderNumber"
                          label="序号"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="交易时间"
                          prop="makeTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="业务类型"
                          prop="busTypeText"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="HIS订单号"
                          prop="businessCode"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="外部系统订单号"
                          prop="orderNo"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="个人支付金额"
                          prop="cashPay"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="患者ID"
                          prop="hisPatientId"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="交易类型"
                          prop="businessFlagText"
                          min-width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="入库时间"
                          prop="createdTime"
                          min-width="180px"></PeaceTableColumn>
      </PeaceTable>

    </div>
  </div>
</template>

<script>
import Service from './service'
export default {
  name: 'HisBill',
  data() {
    return {
      DateValue: [],
      model: {
        startDate: '',
        endDate: ''
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.startDate = value?.[0] ?? ''
      this.model.endDate = value?.[1] ?? ''
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getHisCheckList
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style>
</style>