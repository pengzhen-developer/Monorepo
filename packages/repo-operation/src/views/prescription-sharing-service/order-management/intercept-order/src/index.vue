<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>

        <el-form-item label="订单编号">
          <el-input v-model.trim="model.OrderId"
                    placeholder="医院/平台编号"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="药房">
          <el-input v-model="model.DrugStoreName"
                    placeholder="请输入药房名称"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="订单来源">
          <el-input v-model="model.OrderSource"
                    placeholder="请输入订单来源"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="同步日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.TimeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item label="取货方式">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.ShippingMethod">
            <el-option v-for="item in remoteSource.ShippingMethod"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.OrderStatus"
                     :disabled="orderTypeDisabled">
            <el-option v-for="item in remoteSource.OrderStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="流转状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.CirculationStatus">
            <el-option v-for="item in remoteSource.SendWarehouseStatus"
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

      <peace-table pagination
                   ref="table">
        <PeaceTableColumn prop="OrderId"
                          label="订单编号"
                          min-width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showOrderDetail(scope.row)"
                       v-bind:class="{'split-icon':scope.row.IsSplitOrder==3}">{{ scope.row.OrderId }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="UserName"
                          label="客户姓名"
                          min-width="120px"></PeaceTableColumn>

        <PeaceTableColumn prop="CreateOrderTime"
                          label="同步时间"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn prop="DrugStoreName"
                          label="药房"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn prop="DrugStoreName"
                          label="取货方式"
                          min-width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.ShippingMethod | formatDictionary(remoteSource.ShippingMethod, '-') }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="120px">
          <template slot-scope="scope">
            <span>{{  getOrderStatus(scope.row.OrderStatus,scope.row.ShippingMethod, '-') }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="流转状态"
                          min-width="120px">
          <template slot-scope="scope">
            <span :class="{'text-red': scope.row.CirculationStatus == 2}">{{ scope.row.CirculationStatus | formatDictionary(remoteSource.SendWarehouseStatus, '-') }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn prop="OrderSource"
                          label="订单来源"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="180px"
                          fixed="right">
          <template slot-scope="scope">
            <DropdownButton v-bind:data="fifterButton(scope.row)"
                            v-bind:max="2"></DropdownButton>
          </template>
        </PeaceTableColumn>
      </peace-table>
    </div>

    <PeaceDialog title="订单详情"
                 width="1000px"
                 v-if="orderDetailDialog.visible"
                 v-bind:visible.sync="orderDetailDialog.visible">
      <OrderDetail v-bind:data="orderDetailDialog.data"></OrderDetail>
    </PeaceDialog>

    <PeaceDialog title="订单流转日志"
                 width="480px"
                 center
                 v-if="orderRecordDialog.visible"
                 v-bind:visible.sync="orderRecordDialog.visible">
      <OrderFlowLog v-bind:orderId="orderRecordDialog.orderId"></OrderFlowLog>
    </PeaceDialog>

    <PeaceDialog title="同步订单"
                 width="641px"
                 center
                 v-if="syncOrderDialog.visible"
                 v-bind:visible.sync="syncOrderDialog.visible">
      <SynchronousOrder v-bind:orderId="syncOrderDialog.orderId"
                        v-bind:IsSplitOrder="syncOrderDialog.IsSplitOrder"
                        v-on:refresh="fetch"
                        v-on:close="syncOrderDialog.visible = false"></SynchronousOrder>
    </PeaceDialog>

    <PeaceDialog title="分单日志"
                 width="597px"
                 center
                 v-if="splitOrderLogDialog.visible"
                 v-bind:visible.sync="splitOrderLogDialog.visible">
      <SplitOrderLog v-bind:orderId="splitOrderLogDialog.orderId"></SplitOrderLog>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'
import DropdownButton from '@src/views/dropdown-button'

import SynchronousOrder from './components/SynchronousOrder'
import SplitOrderLog from './components/SplitOrderLog'
import OrderFlowLog from './components/OrderFlowLog'
import OrderDetail from './../../order-detail'
export default {
  name: 'InterceptOrder',

  components: {
    DropdownButton,
    SynchronousOrder,
    SplitOrderLog,
    OrderFlowLog,
    OrderDetail
  },

  data() {
    return {
      model: {
        OrderId: '',
        DrugStoreName: '',
        OrderSource: '',
        CreateOrderStarDate: '',
        CreateOrderEndDate: '',
        ShippingMethod: '',
        OrderStatus: '',
        CirculationStatus: '',
        TimeRange: []
      },

      orderDetailDialog: {
        visible: false,
        data: undefined
      },

      orderRecordDialog: {
        visible: false,
        orderId: ''
      },

      syncOrderDialog: {
        visible: false,
        orderId: '',
        IsSplitOrder: 1
      },

      splitOrderLogDialog: {
        visible: false,
        orderId: ''
      },

      remoteSource: {
        //订单状态；
        OrderStatus: [],
        // 流转状态
        SendWarehouseStatus: [],
        //取货方式
        ShippingMethod: []
      }
    }
  },
  async mounted() {
    this.remoteSource.SendWarehouseStatus = await Peace.identity.dictionary.getList('SendWarehouseStatus')
    this.remoteSource.ShippingMethod = await peace.identity.dictionary.getList('ShippingMethod')
    this.remoteSource.SelfOrderStatus = await peace.identity.dictionary.getList('SelfOrderStatus')
    this.remoteSource.DistributionOrderStatus = await peace.identity.dictionary.getList('DistributionOrderStatus')
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  watch: {
    'model.TimeRange'(value) {
      this.model.CreateOrderStarDate = value?.[0] ?? ''
      this.model.CreateOrderEndDate = value?.[1] ?? ''
    },
    /**
     * 当配送方式更改时，需要切换对应的订单状态
     */
    'model.ShippingMethod': {
      async handler() {
        // DistributionOrderStatus  配送订单状态    1
        // SelfOrderStatus  自提订单状态  0
        this.model.OrderStatus = ''
        this.remoteSource.OrderStatus = this.model.ShippingMethod == 0 ? this.remoteSource.SelfOrderStatus : this.remoteSource.DistributionOrderStatus
      }
    }
  },
  computed: {
    orderTypeDisabled() {
      return this.model.ShippingMethod === ''
    }
  },
  filters: {
    formatDictionary(value, source, format = '') {
      if (!Peace.validate.isEmpty(value)) {
        return source.find((item) => item.value.toString() === value.toString())?.label
      }
      return format
    }
  },

  methods: {
    fetch() {
      const fetch = Service.getInterceptOrderList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },

    showOrderDetail(row) {
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

        this.orderDetailDialog.data = res.data
        this.orderDetailDialog.visible = true
      })
    },

    showOrderRecord(row) {
      this.orderRecordDialog.visible = true
      this.orderRecordDialog.orderId = row.OrderId
    },
    //显示分单日志弹窗
    showSplitOrderLog(row) {
      this.splitOrderLogDialog.visible = true
      this.splitOrderLogDialog.orderId = row.OrderId
    },
    // 显示同步订单弹窗
    showSyncOrder(row) {
      this.syncOrderDialog.orderId = row.OrderId
      this.syncOrderDialog.IsSplitOrder = row.IsSplitOrder
      this.syncOrderDialog.visible = true
    },
    //放弃流转
    abandonCirculation(row) {
      this.$confirm('放弃流转后，该订单将作废，不能再同步给下游，确认放弃？', '放弃流转确认', {
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        Service.cancelCirculation({ orderId: row.OrderId }).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      })
    },
    getOrderStatus(value, type, format = '') {
      const source = type == 0 ? this.remoteSource.SelfOrderStatus : this.remoteSource.DistributionOrderStatus
      return source.find((item) => Number(item.value) === Number(value))?.label ?? format
    },
    exportFile() {
      Service.exportFile(this.model)
    },
    fifterButton(row) {
      const controllList = [
        {
          component: (
            <el-button type="text" onclick={() => this.showOrderRecord(row)}>
              流转日志
            </el-button>
          ),
          filter: this.condition1
        },
        {
          component: (
            <el-button type="text" onclick={() => this.showSyncOrder(row)}>
              同步订单
            </el-button>
          ),
          filter: this.condition2
        },
        {
          component: (
            <el-button type="text" onclick={() => this.showSplitOrderLog(row)}>
              分单日志
            </el-button>
          ),
          filter: this.condition3
        },
        {
          component: (
            <el-button type="text" onclick={() => this.abandonCirculation(row)}>
              放弃流转
            </el-button>
          ),
          filter: this.condition4
        }
      ]
      return controllList.filter((item) => item.filter(row) == true)
    },
    condition1() {
      return true
    },
    condition2(row) {
      if (row.CirculationStatus == 2 && row.OrderStatus !== 5) {
        return true
      }
    },
    condition3(row) {
      if (row.IsSplitOrder == 2) {
        return true
      }
    },
    condition4(row) {
      if (row.CirculationStatus == 2) {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  overflow: unset;
}
.order-remark {
  width: 320px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}

.order-remark-item {
  margin-bottom: 8px;
}

.order-remark-item:last-child {
  margin-bottom: 0;
}
::v-deep .el-table__fixed-right::before {
  height: 0px;
}
.split-icon {
  position: relative;
}
.split-icon::after {
  content: '';
  width: 18px;
  height: 18px;
  position: absolute;
  right: -18px;
  top: -7px;
  background: url('./assets/img/split-icon.png') left center no-repeat;
}
</style>