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
          <el-input v-model.trim="model.OrderNumber"
                    placeholder="医院/平台/物流编号"
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
                   type="primary"
                   v-on:click="exportFile">导出</el-button>
        <el-button style="width: 144px;"
                   type="primary"
                   class="q-ml-md"
                   v-on:click="showSetting">异常提醒设置</el-button>
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
            <span>{{ scope.row.ShippingMethod | filterDictionary(remoteSource.ShippingMethod, '-') }}</span>
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
            <span>{{ scope.row.IsPay | filterDictionary(remoteSource.PayStatus, '-') }}</span>
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
            <span>{{ scope.row.OrderTypeDisplay }}</span>
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

            <el-button type="text"
                       v-on:click="showCancelRecord(scope.row)">处方详情</el-button>

            <el-button v-if="scope.row.DrugCode"
                       type="text"
                       v-on:click="showLogistics(scope.row)">发货信息</el-button>

            <el-button v-if="showChangeOrderNo(scope.row)"
                       type="text"
                       v-on:click="showChangeOrderNoDialog(scope.row)">
              修改运单号
            </el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>
    <!-- 异常提醒设置 -->
    <PeaceDialog title="异常提醒设置"
                 :visible.sync="settingDialog.visible"
                 append-to-body
                 v-if="settingDialog.visible">
      <ExceptionReminder v-bind:info="settingDialog.data"
                         v-on:onCancel="onCancel"></ExceptionReminder>
    </PeaceDialog>

    <!-- 处方详情 -->
    <PeaceDialog title="处方详情"
                 :visible.sync="dialog.visible"
                 append-to-body
                 v-show="dialog.visible">
      <prescriptionDetail v-bind:prescriptionInfo="dialog.data"></prescriptionDetail>
    </PeaceDialog>

    <PeaceDialog title="订单详情"
                 width="1000px"
                 v-if="dialog2.visible"
                 v-bind:visible.sync="dialog2.visible">
      <OrderDetail v-bind:data="dialog2.data"></OrderDetail>
    </PeaceDialog>

    <!-- 发货信息 -->
    <PeaceDialog title="发货信息"
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
        <el-table-column prop="DrugNumber"
                         label="数量"
                         align="center"
                         min-width="70px">
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
    </PeaceDialog>

    <PeaceDialog width="400px"
                 v-if="dialog4.visible"
                 v-bind:visible.sync="dialog4.visible"
                 v-bind:title="dialog4.title">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="dialog4.model"
               v-bind:rules="dialog4.rules">

        <el-form-item prop="logisticsCompany">
          <template slot="label">
            <span>物流公司名称</span>
            <span>：</span>
          </template>

          <el-input v-model="dialog4.model.logisticsCompany"></el-input>
        </el-form-item>
        <el-form-item prop="expressNo">
          <template slot="label">
            <span>物流单号</span>
            <span>：</span>
          </template>

          <el-input v-model="dialog4.model.expressNo"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="text-center">
        <el-button style="min-width: 120px;"
                   type="primary"
                   v-on:click="changeOrderNo">确定</el-button>
        <el-button style="min-width: 120px;"
                   v-on:click="closeChangeOrderNoDialog">取消</el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'
import { date } from 'quasar'

import OrderDetail from '@src/views/prescription/order-detail'
import prescriptionDetail from './components/prescription-detail'
import ExceptionReminder from './components/exception-reminder'
export default {
  name: 'OrderList',

  components: {
    OrderDetail,
    prescriptionDetail,
    ExceptionReminder
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
      settingDialog: {
        visible: false,
        data: {
          Code: ''
        }
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

      dialog4: {
        visible: false,
        title: '',

        model: {
          platOrderID: '',
          logisticsCompany: '',
          expressNo: ''
        },

        rules: {
          logisticsCompany: [{ required: true, message: '请输入物流公司名称', trigger: 'change' }],
          expressNo: [{ required: true, message: '请输入物流单号', trigger: 'change' }]
        }
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
    this.settingDialog.data.Code = (await peace.identity.dictionary.getList('SmsRemind')).find((item) => item.value == 'Code').label
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
    showSetting() {
      Service.getByCode({ code: this.settingDialog.data.Code }).then((res) => {
        this.settingDialog.data = Object.assign(this.settingDialog.data, res.data)
        this.settingDialog.visible = true
      })
    },
    onCancel() {
      this.settingDialog.visible = false
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

    showChangeOrderNo(row) {
      // 临时处理
      // 当 药房为：‘xxx 药房’ & 取货方式为： ‘配送’ & 订单状态： ‘已发货’
      return (
        this.remoteSource.ShippingMethod.find((item) => item.value === row.ShippingMethod)?.label === '配送' &&
        this.remoteSource.OrderStatus.find((item) => item.value === row.OrderStatus)?.label === '已发货'
      )
    },

    changeOrderNo() {
      this.$refs.form.validate().then(() => {
        const params = this.dialog4.model

        Service.setOrderLogistics(params).then(() => {
          Peace.util.success('操作成功')

          this.closeChangeOrderNoDialog()
          this.fetch()
        })
      })
    },

    showChangeOrderNoDialog(row) {
      this.dialog4.visible = true

      this.dialog4.model = {
        platOrderID: '',
        logisticsCompany: '',
        expressNo: ''
      }

      this.dialog4.model.platOrderID = row.OrderId
      this.dialog4.title = '修改物流信息'
    },

    closeChangeOrderNoDialog() {
      this.dialog4.visible = false
    },

    showCancelRecord(row) {
      Service.GetPresByOrderId({ OrderId: row.OrderId }).then((res) => {
        this.dialog.data = Object.assign({}, res.data)
        this.dialog.visible = true
      })
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