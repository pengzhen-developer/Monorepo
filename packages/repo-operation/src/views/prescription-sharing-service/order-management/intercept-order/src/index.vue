<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
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

        <el-form-item label="订单状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.OrderStatus">
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

        <el-button type="primary"
                   v-on:click="fetch">查询</el-button>
      </el-form>
    </div>

    <div class="card">
      <peace-table pagination
                   ref="table">
        <el-table-column prop="OrderId"
                         label="订单编号"
                         align="center"
                         width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showOrderDetail(scope.row)">{{ scope.row.OrderId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="UserName"
                         label="客户姓名"
                         align="center"
                         width="120px"></el-table-column>

        <el-table-column prop="CreateOrderTime"
                         label="同步时间"
                         align="center"
                         width="160px"></el-table-column>

        <el-table-column prop="DrugStoreName"
                         label="药房"
                         align="center"
                         width="160px"></el-table-column>

        <el-table-column label="订单状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderStatus | formatDictionary(remoteSource.OrderStatus, '-') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="流转状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span :class="{'text-red': scope.row.CirculationStatus == 2}">{{ scope.row.CirculationStatus | formatDictionary(remoteSource.SendWarehouseStatus, '-') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="OrderSource"
                         label="订单来源"
                         align="center"
                         width="120px"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         min-width="180px"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showOrderRecord(scope.row)">订单流转日志</el-button>
            <el-button v-if="scope.row.CirculationStatus == 2 && scope.row.OrderStatus !== 5"
                       type="text"
                       v-on:click="showSyncOrder(scope.row)">同步订单</el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>

    <PeaceDialog title="订单详情"
                 width="1000px"
                 v-if="orderDetailDialog.visible"
                 v-bind:visible.sync="orderDetailDialog.visible">
      <OrderDetail v-bind:data="orderDetailDialog.data"></OrderDetail>
    </PeaceDialog>

    <PeaceDialog title="订单流转日志"
                 width="800px"
                 center
                 v-if="orderRecordDialog.visible"
                 v-bind:visible.sync="orderRecordDialog.visible">
      <el-table :data="orderRecordDialog.list">

        <el-table-column label="流转状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.Status | formatDictionary(remoteSource.SendWarehouseStatus, '-') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="拦截方"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            {{scope.row.InterceptName || '——'}}

          </template>
        </el-table-column>

        <el-table-column label="备注"
                         width="360px">
          <template slot-scope="scope">
            <div v-if="scope.row.RemarkList === null || scope.row.RemarkList.length === 0">——</div>
            <div v-else>
              <div v-popover="'popover' + scope.row.ID"
                   class="order-remark">{{scope.row.RemarkList.join('')}}</div>
              <el-popover :ref="'popover'+ scope.row.ID"
                          placement="bottom-start"
                          title=""
                          width="340"
                          trigger="hover">
                <div class="order-remark-list">
                  <div class="order-remark-item"
                       v-for="(item, index) in scope.row.RemarkList"
                       :key="index">{{item}}</div>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="CreateTime"
                         label="拦截/流转时间"
                         align="center"
                         width="150px"></el-table-column>
      </el-table>
    </PeaceDialog>

    <PeaceDialog title="订单同步确认"
                 width="500px"
                 center
                 v-if="syncOrderDialog.visible"
                 v-bind:visible.sync="syncOrderDialog.visible">
      <div>进行同步操作前，请先确认供应方库存充足，否则同步后若库存不足可能会被供应方拦截订单</div>
      <div slot="footer">
        <el-button type="primary"
                   @click="syncOrder">确认同步</el-button>
        <el-button @click="syncOrderDialog.visible = false">取消</el-button>
      </div>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'

import OrderDetail from './../../order-detail'
export default {
  name: 'InterceptOrder',

  components: {
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
        OrderMethod: '',
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
        list: []
      },

      syncOrderDialog: {
        visible: false,
        orderId: ''
      },

      remoteSource: {
        //订单状态；
        OrderStatus: [],
        // 流转状态
        SendWarehouseStatus: []
      }
    }
  },

  async mounted() {
    this.remoteSource.OrderStatus = await peace.identity.dictionary.getList('DistributionOrderStatus')
    this.remoteSource.SendWarehouseStatus = await Peace.identity.dictionary.getList('SendWarehouseStatus')

    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  watch: {
    'model.TimeRange'(value) {
      this.model.CreateOrderStarDate = value?.[0] ?? ''
      this.model.CreateOrderEndDate = value?.[1] ?? ''
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
        res.data?.LogisticsInfo?.Stream?.forEach((item) => {
          item.MonthVisible = date.formatDate(item.Time, 'MM-DD')
          item.TimeVisible = date.formatDate(item.Time, 'HH:mm')
        })
        this.orderDetailDialog.visible = true
        this.orderDetailDialog.data = res.data
      })
    },

    showOrderRecord(row) {
      this.orderRecordDialog.list = []
      Service.getInterceptOrderDetails({ orderId: row.OrderId }).then((res) => {
        this.orderRecordDialog.list = res.data?.list || []
        this.orderRecordDialog.visible = true
      })
    },

    // 显示同步订单弹窗
    showSyncOrder(row) {
      this.syncOrderDialog.orderId = row.OrderId
      this.syncOrderDialog.visible = true
    },
    // 同步订单
    syncOrder() {
      Service.syncOrderSend({ orderId: this.syncOrderDialog.orderId }).then((res) => {
        Peace.util.success(res.msg)
        this.fetch()
        this.syncOrderDialog.visible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>