<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>

        <!-- <el-form-item label="订单来源">
          <el-input v-model="model.Source"></el-input>
        </el-form-item> -->

        <el-form-item label="订单编号">
          <el-input v-model="model.OrderNumber"></el-input>
        </el-form-item>

        <!-- <el-form-item label="处方类型">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.OrderType">
            <el-option v-for="item in remoteSource.OrderType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item label="系统属性">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.sys_attribute_code">
            <el-option v-for="item in remoteSource.SysAttributeCode"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="客户姓名">
          <el-input v-model="model.CustName"></el-input>
        </el-form-item>

        <!-- <el-form-item label="手机号码">
          <el-input v-model="model.Phone"></el-input>
        </el-form-item> -->

        <el-form-item label="药房">
          <el-input v-model="model.DrugName"></el-input>
        </el-form-item>

        <el-form-item label="下单日期">
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
                     v-model="model.OrderStatus">
            <el-option v-for="item in remoteSource.OrderStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="支付状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.PayStatus">
            <el-option v-for="item in remoteSource.PayStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item> -->

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

        <el-table-column label="支付状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.IsPay | filterDictionary(remoteSource.PayStatus, '--') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderStatus | filterDictionary(remoteSource.OrderStatus, '--') }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="Source"
                         label="订单来源"
                         align="center"
                         width="120px"></el-table-column> -->

        <!-- <el-table-column label="处方类型"
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
        </el-table-column> -->

        <el-table-column label="操作"
                         align="center"
                         width="120px"
                         fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.JZTClaimNo"
                       type="text"
                       v-on:click="showCancelRecord(scope.row)">处方详情</el-button>

            <!-- <el-button type="text"
                       v-on:click="showLogistics(scope.row)">发货信息</el-button> -->
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

  watch: {
    'model.TimeRange'(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    }
  },

  async mounted() {
    //this.remoteSource.OrderType = await peace.identity.dictionary.getList('OrderType')
    //this.remoteSource.SysAttributeCode = await peace.identity.dictionary.getList('sys_attr')
    this.remoteSource.OrderStatus = await Peace.identity.dictionary.getList('OrderStatus')
    this.remoteSource.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')
    this.remoteSource.PayStatus = await Peace.identity.dictionary.getList('PayStatus')

    this.$nextTick().then(() => {
      this.fetch()
    })
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
      const params = { JZTClaimNo: row.JZTClaimNo }
      Service.getPrescriptionDetail(params).then((res) => {
        this.dialog.data.prescriptionImageUrl = res.data.prescriptionImageUrl
        this.dialog.visible = true
      })
    },

    onLoad() {
      this.dialog.data.show = true
    }
  }
}
</script>

<style>
</style>