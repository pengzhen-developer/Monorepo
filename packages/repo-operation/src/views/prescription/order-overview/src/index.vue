<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="订单来源：">
          <el-input v-model.trim="model.OrderSource"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="统计日期：">
          <peace-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                             v-bind:default-time="['00:00:00', '23:59:59']"
                             format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button style="min-width: 80px;"
                   v-on:click="exportFile">导出</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column type="index"
                         width="100"
                         label="序号"
                         align="center"></el-table-column>
        <el-table-column label="订单来源"
                         prop="OrderSource"></el-table-column>
        <el-table-column label="订单总量"
                         prop="Zcount"
                         align="center"></el-table-column>
        <el-table-column label="仓配订单"
                         prop="Ccount"
                         align="center"></el-table-column>
        <el-table-column label="店配订单"
                         prop="Dcount"
                         align="center"></el-table-column>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'

export default {
  name: 'OrderOverview',

  components: {},

  data() {
    return {
      DateValue: [],
      model: {
        OrderSource: '',
        StarDate: '',
        EndDate: ''
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.StarDate = value?.[0] ?? ''
      this.model.EndDate = value?.[1] ?? ''
    }
  },
  mounted() {
    this.timeDefault()
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    //默认日期
    timeDefault() {
      const year = Peace.util.formatDate(new Date(), 'YYYY')
      const month = Peace.util.formatDate(new Date(), 'MM')
      this.DateValue.push(year + '-' + month + '-' + '01' + ' 00:00:00')
      this.DateValue.push(Peace.util.formatDate(new Date(), 'YYYY-MM-DD') + ' 23:59:59')
    },
    get() {
      const fetch = Service.GetOrderInformation
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    exportFile() {
      Service.exportFile(this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>