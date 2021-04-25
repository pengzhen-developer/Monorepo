<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="订单编号">
          <el-input v-model="model.OrderId"
                    placeholder="请输入医院/平台编号"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="订单来源">
          <el-input v-model="model.Source"
                    placeholder="请输入订单来源"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="药房">
          <el-input v-model="model.DrugsStoreName"
                    placeholder="请输入药房名称"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="申请取消日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.TimeRange"></peace-date-picker>
        </el-form-item>
        <el-form-item label="取消状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.Result">
            <el-option v-for="item in source.Result"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发起人">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.Sponsor">
            <el-option v-for="item in source.Sponsor"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button v-on:click="exportFile">导出</el-button>
      </div>

      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn prop="OrderId"
                          label="订单编号"
                          min-width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelDetail(scope.row)">{{ scope.row.OrderId }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="UserName"
                          label="客户姓名"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn prop="TotalAmoun"
                          label="订单总额"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn prop="Source"
                          label="订单来源"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn prop="DrugStoreName"
                          label="药房"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn prop="Sponsor"
                          label="发起人"
                          min-width="120px"
                          v-bind:formatter="formatSponsor"></PeaceTableColumn>
        <PeaceTableColumn prop="CreateTime"
                          label="申请取消时间"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn prop="Result"
                          label="取消状态"
                          min-width="120px"
                          v-bind:formatter="formatResult"></PeaceTableColumn>
        <PeaceTableColumn prop="OrderStatus"
                          label="订单状态"
                          min-width="120px"
                          v-bind:formatter="formatOrderStatus"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="100px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelRecord(scope.row)">取消记录</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="取消记录"
                 width="400px"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in dialog.data"
                          v-bind:key="index"
                          v-bind:timestamp="activity.CreateTime">
          {{ activity.Remark }}
        </el-timeline-item>
      </el-timeline>
    </PeaceDialog>

    <PeaceDialog title="订单详情"
                 width="1000px"
                 v-if="dialog2.visible"
                 v-bind:visible.sync="dialog2.visible">
      <OrderDetail v-bind:data="dialog2.data"></OrderDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'

import OrderDetail from './../../order-detail'

export default {
  name: 'AfterSalesOrder',

  components: {
    OrderDetail
  },

  data() {
    return {
      model: {
        OrderId: '',
        Sponsor: '',
        Source: '',
        TimeRange: [],
        StartTime: '',
        EndTime: '',
        DrugsStoreName: '',
        Result: ''
      },

      dialog: {
        visible: false,
        data: []
      },

      dialog2: {
        visible: false,
        data: undefined
      },

      source: {
        Result: [
          { label: '已拒绝', value: 0 },
          { label: '已同意', value: 1 },
          { label: '待处理', value: 2 }
        ],
        Sponsor: [
          { label: '医疗机构', value: 0 },
          { label: '药店', value: 1 }
        ]
      }
    }
  },

  watch: {
    'model.TimeRange'(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    }
  },

  mounted() {
    this.$nextTick().then(this.fetch)
  },

  methods: {
    fetch() {
      const fetch = Service.getOrderCancelApplyList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    exportFile() {
      Service.exportFile(this.model)
    },

    showCancelDetail(row) {
      const params = { ID: row.ID }

      Service.getOrderInfo(params).then((res) => {
        // 处理 Stream timeline
        if (res.data?.LogisticsInfo?.length > 0) {
          res.data.LogisticsInfo.forEach((log) => {
            log.Stream?.forEach((item) => {
              item.MonthVisible = date.formatDate(item.Time, 'MM-DD')
              item.TimeVisible = date.formatDate(item.Time, 'HH:mm')
            })
          })
        }

        this.dialog2.data = res.data
        this.dialog2.visible = true
      })
    },

    showCancelRecord(row) {
      this.dialog.visible = true

      this.$nextTick(() => {
        const params = { OrderId: row.OrderId }

        Service.getOrderCancelRecord(params).then((res) => {
          this.dialog.data = res.data.list
        })
      })
    },

    formatSponsor(row) {
      const map = [
        { label: '医疗机构', value: 0 },
        { label: '药店', value: 1 }
      ]

      return map.find((item) => item.value === row.Sponsor)?.label
    },
    formatResult(row) {
      const map = [
        { label: '已拒绝', value: 0 },
        { label: '已同意', value: 1 },
        { label: '待处理', value: 2 }
      ]

      return map.find((item) => item.value === row.Result)?.label
    },
    formatOrderStatus(row) {
      const map = [
        { label: '已下单', value: 1 },
        { label: '已接单', value: 2 },
        { label: '已发货', value: 3 },
        { label: '已签收', value: 4 },
        { label: '已取消', value: 5 },
        { label: '已完成', value: 6 }
      ]

      return map.find((item) => item.value === row.OrderStatus)?.label
    }
  }
}
</script>

<style>
</style>