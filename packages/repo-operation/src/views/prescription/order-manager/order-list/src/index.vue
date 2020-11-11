<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>

        <el-form-item label="订单来源">
          <el-input v-model="model.Source"
                    placeholder="请输入订单来源"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="订单编号">
          <el-input v-model="model.OrderNumber"
                    placeholder="请输入订单编号"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="处方类型">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.OrderType">
            <el-option v-for="item in remoteSource.OrderType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="系统属性">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.sys_attribute_code">
            <el-option v-for="item in remoteSource.SysAttributeCode"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下单日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.TimeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item label="客户姓名">
          <el-input v-model="model.CustName"
                    placeholder="请输入客户姓名"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input v-model="model.Phone"
                    placeholder="请输入手机号码"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="药房">
          <el-input v-model="model.DrugName"
                    placeholder="请输入药房名称"
                    clearable></el-input>
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
                     :disabled="orderTypeDisabled"
                     v-model="model.OrderStatus">
            <el-option v-for="item in remoteSource.OrderStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.PayStatus">
            <el-option v-for="item in remoteSource.PayStatus"
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
                         width="180px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showCancelDetail(scope.row)">{{ scope.row.OrderId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="UserName"
                         label="客户姓名"
                         align="center"
                         width="120px"></el-table-column>

        <el-table-column prop="TotalAmoun"
                         label="订单总额"
                         align="center"
                         width="120px"></el-table-column>

        <el-table-column prop="CreateTime"
                         label="下单时间"
                         align="center"
                         width="160px"></el-table-column>

        <el-table-column prop="DrugStoreName"
                         label="药房"
                         align="center"
                         width="160px"></el-table-column>

        <el-table-column label="取货方式"
                         align="center"
                         width="120px">

          <template slot-scope="scope">
            <span>{{ scope.row.ShippingMethod | filterDictionary(remoteSource.ShippingMethod, '--') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderStatusStr || '--' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.IsPay | filterDictionary(remoteSource.PayStatus, '--') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="Source"
                         label="订单来源"
                         align="center"
                         width="120px"></el-table-column>

        <el-table-column label="处方类型"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderType | filterDictionary(remoteSource.OrderType, '--') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="sys_name"
                         label="系统名称"
                         align="center"
                         width="120px">
        </el-table-column>

        <el-table-column prop="sys_attribute_name"
                         label="系统属性"
                         align="center"
                         width="120px">
        </el-table-column>

        <el-table-column label="操作"
                         align="center"
                         min-width="180px"
                         fixed="right">
          <template slot-scope="scope">

            <el-button :disabled="!scope.row.PrescriptionImageUrl"
                       type="text"
                       v-on:click="showCancelRecord(scope.row)">处方详情</el-button>

            <el-button v-if="scope.row.DrugCode"
                       type="text"
                       v-on:click="showLogistics(scope.row)">发货信息</el-button>
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

    <!-- 发货信息 -->
    <peace-dialog title="发货信息"
                  width="1100px"
                  :v-if="dialog3.visible"
                  v-bind:visible.sync="dialog3.visible">

      <peace-table :data="dialog3.data">

        <el-table-column prop="DrugCode"
                         label="药品编码"
                         align="center"
                         width="120px"></el-table-column>

        <el-table-column prop="DrugName"
                         label="药品名称"
                         align="center"
                         min-width="160px"></el-table-column>

        <el-table-column label="药品规格"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            {{ scope.row.DrugSpecifications || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="包装单位"
                         align="center"
                         min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.PackUnit || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="生产厂家"
                         align="center"
                         min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.EnterpriseName || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="批次号"
                         align="center"
                         min-width="100px">
          <template slot-scope="scope">
            {{ scope.row.BatchNumber || '--' }}
          </template>
        </el-table-column>

        <el-table-column prop="ValidityDate"
                         label="有效期"
                         align="center"
                         width="160px"></el-table-column>

        <el-table-column prop="ManufactureDate"
                         label="生产日期"
                         align="center"
                         width="160px"></el-table-column>
      </peace-table>
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'

import OrderDetail from '@src/views/prescription/order-detail'

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
        OrderType: [],
        //订单状态；
        OrderStatus: [],
        //支付状态
        PayStatus: [],
        //取货方式
        ShippingMethod: [],
        //系统属性
        SysAttributeCode: []
      }
    }
  },

  async mounted() {
    this.remoteSource.OrderType = await peace.identity.dictionary.getList('OrderType')
    this.remoteSource.ShippingMethod = await peace.identity.dictionary.getList('ShippingMethod')
    this.remoteSource.PayStatus = await peace.identity.dictionary.getList('PayStatus')
    this.remoteSource.SysAttributeCode = await peace.identity.dictionary.getList('sysattribute')
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
     */
    'model.OrderMethod': {
      async handler() {
        //DistributionOrderStatus  配送订单状态    1
        //SelfOrderStatus  自提订单状态  0
        const requestKey = this.model.OrderMethod == 0 ? 'SelfOrderStatus' : 'DistributionOrderStatus'
        this.model.OrderStatus = ''
        this.remoteSource.OrderStatus = await peace.identity.dictionary.getList(requestKey)
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
        res.data.list?.LogisticsInfo?.Stream?.forEach((item) => {
          item.MonthVisible = date.formatDate(item.Time, 'MM-DD')
          item.TimeVisible = date.formatDate(item.Time, 'HH:mm')
        })

        this.dialog2.data = res.data
      })
    },

    showCancelRecord(row) {
      this.dialog.data.prescriptionImageUrl = row.PrescriptionImageUrl
      this.dialog.visible = true
    },

    showLogistics(row) {
      const params = { OrderId: row.OrderId }
      Service.getLogisticsInfo(params).then((res) => {
        this.dialog3.data = res.data.list
        this.dialog3.visible = true
      })
    },

    onLoad() {
      this.dialog.data.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>