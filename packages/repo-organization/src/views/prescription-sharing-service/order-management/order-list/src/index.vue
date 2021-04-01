<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>

        <el-form-item label="订单编号">
          <el-input v-model.trim="model.OrderNumber"
                    placeholder="请输入订单编号"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="客户姓名">
          <el-input v-model="model.CustName"
                    placeholder="请输入客户姓名"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="药房">
          <el-input v-model="model.DrugName"
                    placeholder="请输入药房名称"
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
                     v-model="model.OrderMethod">
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
                         align="center"
                         min-width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelDetail(scope.row)">{{ scope.row.OrderId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="UserName"
                         label="客户姓名"
                         align="center"
                         min-width="120px"></el-table-column>

        <el-table-column prop="TotalAmoun"
                         label="订单总额"
                         align="center"
                         min-width="120px"></el-table-column>

        <el-table-column prop="CreateTime"
                         label="同步时间"
                         align="center"
                         min-width="180px"></el-table-column>

        <el-table-column prop="DrugStoreName"
                         label="药房"
                         align="center"
                         min-width="160px"></el-table-column>

        <el-table-column label="取货方式"
                         align="center"
                         min-width="120px">

          <template slot-scope="scope">
            <span>{{ scope.row.ShippingMethod | filterDictionary(remoteSource.ShippingMethod, '--') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付状态"
                         align="center"
                         min-width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.IsPay | filterDictionary(remoteSource.PayStatus, '--') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单状态"
                         align="center"
                         min-width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderStatusStr || '--' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center"
                         width="120px"
                         fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.PrescriptionImageUrl"
                       type="text"
                       v-on:click="showCancelRecord(scope.row)">处方详情</el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>

    <!-- 原始处方 -->
    <peace-dialog title="原始处方"
                  :visible.sync="dialog.visible"
                  append-to-body
                  v-show="dialog.visible&&dialog.data.show">
      <el-image v-bind:src="dialog.data.prescriptionImageUrl"
                v-on:load="onLoad"></el-image>
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
import Util from '@src/util'
import Service from './service'
import { date } from 'quasar'

import OrderDetail from './../../order-detail'

export default {
  name: 'OrderList',

  components: {
    OrderDetail
  },

  data() {
    return {
      model: {
        Source: '',
        OrderNumber: '',
        OrderType: '',
        OrderStatus: '',
        DrugName: '',
        CustName: '',
        Phone: '',
        StartTime: '',
        EndTime: '',
        PayStatus: '',
        OrderMethod: '',
        sys_attribute_code: '',
        TimeRange: []
      },

      dialog2: {
        visible: false,
        data: undefined
      },

      dialog: {
        visible: false,
        data: {
          prescriptionImageUrl: '',
          show: false
        }
      },

      dialog3: {
        visible: false,
        data: undefined
      },

      remoteSource: {
        //处方类型
        // OrderType: [],
        //订单状态；
        OrderStatus: [],
        //支付状态
        PayStatus: [],
        //取货方式
        ShippingMethod: []
        //系统属性
        // SysAttributeCode: []
      }
    }
  },

  async mounted() {
    this.remoteSource.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')
    this.remoteSource.PayStatus = await Peace.identity.dictionary.getList('PayStatus')

    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  watch: {
    'model.TimeRange'(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    },
    /**
     * 当配送方式更改时，需要切换对应的订单状态
     */ 'model.OrderMethod': {
      async handler() {
        //DistributionOrderStatus  配送订单状态    1
        //SelfOrderStatus  自提订单状态  0
        const requestKey = this.model.OrderMethod == 0 ? 'SelfOrderStatus' : 'DistributionOrderStatus'
        this.model.OrderStatus = ''
        this.remoteSource.OrderStatus = await Peace.identity.dictionary.getList(requestKey)
      }
    }
  },

  computed: {
    orderTypeDisabled() {
      return this.model.OrderMethod === ''
    }
  },

  methods: {
    fetch() {
      const fetch = Service.getOrderList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },

    exportFile() {
      Service.exportFile({ ...this.model })
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
    },

    showCancelRecord(row) {
      if (row.FileType === 0) {
        Util.location.redirectToPath(row.PrescriptionImageUrl, '_blank')
      } else {
        this.dialog.data.prescriptionImageUrl = row.PrescriptionImageUrl
        this.dialog.visible = true
      }
    },

    onLoad() {
      this.dialog.data.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>