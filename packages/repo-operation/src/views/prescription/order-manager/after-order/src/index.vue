<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="订单来源">
          <el-input v-model="model.Source"></el-input>
        </el-form-item>

        <el-form-item label="申请取消日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.TimeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item label="药房">
          <el-input v-model="model.DrugsStoreName"></el-input>
        </el-form-item>

        <el-form-item label="取消结果">
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

        <el-button type="primary"
                   style="width: 80px;"
                   v-on:click="fetch">查询</el-button>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button style="width: 80px;"
                   v-on:click="exportFile">导出</el-button>
      </div>

      <peace-table pagination
                   ref="table">
        <el-table-column prop="OrderId"
                         label="订单编号"
                         width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelDetail(scope.row)">{{ scope.row.OrderId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="UserName"
                         label="客户姓名"
                         width="120px"></el-table-column>
        <el-table-column prop="TotalAmoun"
                         label="订单总额"
                         width="120px"></el-table-column>
        <el-table-column prop="Source"
                         label="订单来源"
                         width="120px"></el-table-column>
        <el-table-column prop="DrugStoreName"
                         label="药房"
                         width="120px"></el-table-column>
        <el-table-column prop="Sponsor"
                         label="发起人"
                         width="120px"
                         v-bind:formatter="formatSponsor"></el-table-column>
        <el-table-column prop="CreateTime"
                         label="发起取消时间"
                         width="180px"></el-table-column>
        <el-table-column prop="Result"
                         label="取消结果"
                         width="120px"
                         v-bind:formatter="formatResult"></el-table-column>
        <el-table-column prop="OrderStatus"
                         label="订单状态"
                         width="120px"
                         v-bind:formatter="formatOrderStatus"></el-table-column>
        <el-table-column label="操作"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelRecord(scope.row)">取消记录</el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>

    <peace-dialog title="取消记录"
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
    </peace-dialog>

    <peace-dialog title="订单详情"
                  width="800px"
                  v-if="dialog2.visible"
                  v-bind:visible.sync="dialog2.visible">
      <OrderDetail v-bind:data="dialog2.data"></OrderDetail>
    </peace-dialog>
  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'

import OrderDetail from '@src/views/prescription/order-detail'

export default {
  name: 'AfterOrder',

  components: {
    OrderDetail
  },

  data() {
    return {
      model: {
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
          { label: '未取消', value: 0 },
          { label: '已取消', value: 1 }
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
      this.dialog2.visible = true

      const params = { ID: row.ID }

      Service.getOrderInfo(params).then((res) => {
        // 处理 Stream timeline
        res.data.list?.LogisticsInfo?.Stream?.forEach((item) => {
          item.MonthVisible = date.formatDate(item.Time, 'MM-DD')
          item.TimeVisible = date.formatDate(item.Time, 'HH:mm')
        })

        this.dialog2.data = res.data
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
        { label: '失败', value: 0 },
        { label: '成功', value: 1 }
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