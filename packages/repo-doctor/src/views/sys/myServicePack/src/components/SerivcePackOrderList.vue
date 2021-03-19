<template>
  <div>
    <div class="card q-mb-md">
      <el-form space-none
               inline
               label-suffix="："
               v-bind:model="model"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch">
        <el-form-item label="购买日期">
          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           v-model="model.dateRange"></PeaceDatePicker>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input placeholder="请输入"
                    v-model="model.tel"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.orderStatus">
            <el-option v-for="item in source.service_package_order_type"
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
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn width="60"
                          label="序号"
                          prop="orderNumber"></PeaceTableColumn>
        <PeaceTableColumn min-width="180"
                          label="订单号"
                          prop="orderNo"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="服务包名称"
                          prop="servicePackageName"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="用户手机号"
                          prop="tel"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="购买时间"
                          prop="payTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="订单金额/元"
                          prop="orderMoney"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="订单状态"
                          prop="orderStatus"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="支付状态"
                          prop="payStatus"></PeaceTableColumn>
        <PeaceTableColumn width="120"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <SerivcePackOrderDetail class="q-px-md"
                              v-bind:orderNo="dialog.orderNo"></SerivcePackOrderDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'

import SerivcePackOrderDetail from './SerivcePackOrderDetail'

export default {
  components: {
    SerivcePackOrderDetail
  },

  data() {
    return {
      model: {
        dateRange: [],
        startTime: '',
        endTime: '',
        tel: '',
        orderStatus: ''
      },

      source: {
        service_package_order_type: []
      },

      dialog: {
        visible: false,
        orderNo: ''
      }
    }
  },

  watch: {
    'model.dateRange'(value) {
      if (Peace.util.isArray(value) && value.length === 2) {
        this.model.startTime = Peace.dayjs(value[0]).format('YYYY-MM-DD')
        this.model.endTime = Peace.dayjs(value[1]).format('YYYY-MM-DD')
      } else {
        this.model.startTime = ''
        this.model.endTime = ''
      }
    }
  },

  async created() {
    this.source.service_package_order_type = await Peace.identity.dictionary.getList('service_package_order_type')
  },

  mounted() {
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

    showDetail(row) {
      this.dialog.visible = true
      this.dialog.orderNo = row.orderNo
    }
  }
}
</script>

<style>
</style>