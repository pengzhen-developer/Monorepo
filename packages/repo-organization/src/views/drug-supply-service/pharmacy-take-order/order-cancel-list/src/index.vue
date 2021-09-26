<template>
  <div class="layout-route bg-grey-3">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-model="model"
               v-on:keyup.enter.native="fetch">

        <el-form-item>
          <span slot="label">
            <span>订单编号：</span>
          </span>

          <el-input v-model="model.OrderId"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>订单来源：</span>
          </span>

          <el-input v-model="model.MedicalInstitutionName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="取消状态：">
          <el-select v-model="model.Result"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.OrderChangeResult"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>申请取消日期</span>
            <span>：</span>
          </span>

          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             placeholder=""
                             v-model="TimeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  pagination>

        <PeaceTableColumn label="订单编号"
                          min-width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelDetail(scope.row)">
              {{ scope.row.OrderId }}
            </el-button>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn prop="OrderAmount"
                          min-width="100px"
                          label="订单总额">
        </PeaceTableColumn>

        <PeaceTableColumn prop="MedicalInstitutionName"
                          label="订单来源"
                          min-width="180px">
        </PeaceTableColumn>

        <PeaceTableColumn label="订单状态"
                          prop="OrderStatusStr"
                          min-width="120px">
        </PeaceTableColumn>

        <PeaceTableColumn label="取消状态"
                          min-width="120px">
          <template slot-scope="scope">
            <div :class="{operatingColor : isPending(scope.row.Result)}">
              {{ (scope.row.Result).toString() | filterDictionary(source.OrderChangeResult, '--') }}
            </div>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn prop="DrugStoreName"
                          label="药房"
                          min-width="180px">
        </PeaceTableColumn>

        <PeaceTableColumn prop="CreateTime"
                          label="申请取消时间"
                          width="180px">
        </PeaceTableColumn>

        <PeaceTableColumn label="操作时间"
                          width="180px">
          <template slot-scope="scope">
            {{ scope.row.OperatingTime ? scope.row.OperatingTime : "——"  }}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="备注"
                          min-width="180px"
                          v-bind:show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Remarks ? scope.row.Remarks : "——"  }}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="140px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-if="isPending(scope.row.Result)"
                       v-on:click="agree(scope.row)">同意</el-button>
            <el-button type="text"
                       v-if="isPending(scope.row.Result)"
                       v-on:click="toRole( scope.row)">拒绝</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <peace-dialog title="订单详情"
                  width="800px"
                  v-if="dialog2.visible"
                  v-bind:visible.sync="dialog2.visible">
      <OrderDetail v-bind:data="dialog2.data"></OrderDetail>
    </peace-dialog>

    <peace-dialog title="拒绝取消申请"
                  width="422px"
                  top="calc((100vh - 240px) / 2)"
                  v-if="toRoleDialog.visible"
                  :close-on-click-modal='true'
                  v-bind:visible.sync="toRoleDialog.visible">
      <ToRoleDialog v-bind:data="toRoleDialog.data"
                    v-on:close="toRoleDialog.visible = false"
                    v-on:success="roleSuccess()">

      </ToRoleDialog>
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'

import OrderDetail from '@src/views/prescription-sharing-service/order-management/order-detail'
import ToRoleDialog from './components/ToRoleDialog'

export default {
  name: 'OrderCancelList',

  components: {
    OrderDetail,
    ToRoleDialog
  },

  data() {
    return {
      TimeRange: [],

      model: {
        OrderId: '',
        MedicalInstitutionName: '',
        Result: undefined,
        StartTime: '',
        EndTime: ''
      },

      source: {
        OrderChangeResult: [] //取消状态
      },

      toRoleDialog: {
        visible: false,
        data: undefined
      },

      dialog2: {
        visible: false,
        data: undefined
      }
    }
  },

  mounted() {
    this.$nextTick().then(async () => {
      this.source.OrderChangeResult = await Peace.identity.dictionary.getList('order_change_result')
    })
    this.$nextTick().then(this.fetch)
  },

  watch: {
    TimeRange(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    }
  },

  methods: {
    fetch() {
      this.getOrderChargebackList()
    },

    getOrderChargebackList() {
      const fetch = Service.getOrderChargebackList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },

    agree(row) {
      this.$confirm('是否确认同意取消订单?', '同意取消申请', {
        confirmButtonText: '确定',
        cancelButtonText: '再考虑一下'
      }).then(() => {
        const params = {
          OrderID: row.OrderId,
          Operating: 1
        }
        Service.HasWaitReceiveOrder(params).then(() => {
          this.fetch()
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
        })
      })
    },

    toRole(row) {
      this.toRoleDialog.data = row
      this.toRoleDialog.visible = true
    },

    roleSuccess() {
      this.toRoleDialog.visible = false
      this.fetch()
    },

    isPending(code) {
      return code === 2
    },

    showCancelDetail(row) {
      this.dialog2.visible = true

      const params = { ID: row.ID }

      Service.getOrderInfo(params).then((res) => {
        // 处理 Stream timeline
        res.data?.LogisticsInfo?.Stream?.forEach((item) => {
          item.MonthVisible = date.formatDate(item.Time, 'MM-DD')
          item.TimeVisible = date.formatDate(item.Time, 'HH:mm')
        })
        this.dialog2.data = res.data
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.operatingColor {
  color: red;
}
</style>