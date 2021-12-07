<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               label-width="auto"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               inline>
        <el-form-item label="服务包名称">
          <el-input placeholder="请输入"
                    v-model="model.servicePackageName"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="下单手机号">
          <el-input placeholder="请输入"
                    v-model="model.tel"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="签约主体">
          <el-input placeholder="请输入"
                    v-model="model.mainPartName"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="下单日期">
          <peace-date-picker type="daterange"
                             end-placeholder="至今"
                             start-placeholder="开始日期"
                             value-format="yyyy-MM-dd"
                             v-model="TimeRange"></peace-date-picker>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="model.orderStatus"
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="'order'+item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.orderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="model.payStatus"
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="'pay' + item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.payStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="售后状态">
          <el-select v-model="model.afterSaleStatus"
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="'afterSale' + item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.afterSaleStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单号">
          <el-input placeholder="请输入"
                    v-model="model.orderNo"
                    clearable
                    style="width:260px;"></el-input>
        </el-form-item>
        <el-form-item label="交易医院">
          <el-select v-model="model.hosId"
                     filterable
                     clearable
                     placeholder="全部">
            <el-option v-bind:key="item.hosId"
                       v-bind:label="item.hosName"
                       v-bind:value="item.hosId"
                       v-for="item in source.hosId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级科室">
          <el-select v-model="model.deptId"
                     clearable
                     :disabled="deptDisable"
                     placeholder="全部">
            <el-option v-for="item in deptList"
                       :key="item.deptId"
                       :label="item.netdeptChild"
                       :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="search-btn">
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-lg">
        <el-button v-permission="`export`"
                   v-on:click="exportFile"
                   :loading="exportLoading"
                   type="primary">导出</el-button>
      </div>
      <peace-table pagination
                   ref="table">
        <PeaceTableColumn prop="orderNumber"
                          label="序号"
                          min-width="60px"></PeaceTableColumn>
        <PeaceTableColumn label="订单号"
                          width="260px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showOrderDetail(scope.row)">{{ scope.row.orderNo}}
            </el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="servicePackageName"
                          label="服务包名称"
                          min-width="140px"></PeaceTableColumn>

        <PeaceTableColumn prop="createdTime"
                          label="下单时间"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn prop="orderMoney"
                          label="订单金额"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn prop="hospitalName"
                          label="交易医院"
                          min-width="160px">
        </PeaceTableColumn>
        <PeaceTableColumn label="签约主体"
                          prop="mainPartName"
                          min-width="120px">
        </PeaceTableColumn>

        <PeaceTableColumn label="二级科室"
                          min-width="120"
                          prop="deptName"></PeaceTableColumn>

        <PeaceTableColumn label="下单人"
                          min-width="120px">
          <template slot-scope="scope">
            {{scope.row.orderPerson||"——"}}
          </template>?
        </PeaceTableColumn>
        <PeaceTableColumn label="下单手机号"
                          prop="tel"
                          min-width="120px">
        </PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="100px">
          <template slot-scope="scope">
            {{scope.row.orderStatusDisplay||"——"}}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="支付状态"
                          min-width="100px">
          <template slot-scope="scope">
            {{scope.row.payStatusDisplay||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="completionExplain"
                          label="完成说明"
                          min-width="180px">
          <template slot-scope="scope">
            {{scope.row.completionExplain||"——"}}
          </template>?
        </PeaceTableColumn>
        <PeaceTableColumn label="售后状态"
                          min-width="100px">
          <template slot-scope="scope">
            {{scope.row.afterSaleStatusDisplay||"——"}}
          </template>?
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="180px"
                          fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.afterSaleStatus==1">
              <el-button type="text"
                         v-on:click="cancelOrder(scope.row,2)">同意退款</el-button>
              <el-button type="text"
                         v-on:click="cancelOrder(scope.row,3)">拒绝退款</el-button>
            </div>
            <div v-else></div>
          </template>
        </PeaceTableColumn>
      </peace-table>
    </div>

    <PeaceDialog title="订单详情"
                 width="800px"
                 v-if="orderDetailDialog.visible"
                 v-bind:visible.sync="orderDetailDialog.visible">
      <OrderDetail v-bind:data="orderDetailDialog.data"></OrderDetail>
    </PeaceDialog>
  </div>
</template>
<script>
import Service from './service'
import OrderDetail from './components/OrderDetail'

export default {
  name: 'ServicePackOrder',
  components: {
    OrderDetail
  },
  data() {
    return {
      TimeRange: [],
      model: {
        servicePackageName: '',
        tel: '',
        mainPartName: '',
        orderStatus: '',
        payStatus: '',
        afterSaleStatus: '',
        orderNo: '',
        hosId: '',
        deptId: '',
        startDate: '',
        endDate: ''
      },
      deptList: [],
      exportLoading: false,
      source: {
        //订单状态；
        orderStatus: [],
        //支付状态
        payStatus: [],
        //售后状态
        afterSaleStatus: [],
        //签约医院
        hosId: []
      },
      orderDetailDialog: {
        visible: false,
        data: ''
      }
    }
  },
  watch: {
    TimeRange(value) {
      this.model.startDate = value?.[0] ?? ''
      this.model.endDate = value?.[1] ?? ''
    },
    'model.hosId': function(val, oldVal) {
      if (val !== oldVal) {
        this.model.deptId = ''
        this.deptList = []
        if (!Peace.validate.isEmpty(val)) {
          this.getDepartmentList()
        }
      }
    }
  },
  created() {
    this.getAllHospitalList()
  },
  async mounted() {
    this.source.orderStatus = await Peace.identity.dictionary.getList('service_package_order_type')
    this.source.payStatus = await peace.identity.dictionary.getList('service_package_pay_type')
    this.source.afterSaleStatus = await peace.identity.dictionary.getList('service_after_sales_type')
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  computed: {
    deptDisable() {
      return Peace.validate.isEmpty(this.model.hosId)
    }
  },
  methods: {
    fetch() {
      const fetch = Service.getList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },

    // 获取所有签约医院
    getAllHospitalList() {
      Service.getHosList({}).then((res) => {
        this.source.hosId = res.data.list || []
      })
    },

    /// 获取机构下的二级科室列表接口
    getDepartmentList() {
      Service.getDeptList({ orgId: this.model.hosId }).then((res) => {
        this.deptList = res.data?.list || []
      })
    },

    exportFile() {
      this.exportLoading = true
      Service.exportFile(this.model).finally(() => {
        this.exportLoading = false
      })
    },

    showOrderDetail(row) {
      this.orderDetailDialog.data = row.orderNo
      this.orderDetailDialog.visible = true
    },
    //同意2 拒绝3
    cancelOrder(row, statu) {
      const params = {
        orderNo: row.orderNo,
        afterSaleStatus: statu
      }
      Service.cancelOrder(params).then((res) => {
        Peace.util.success(res.msg)
        this.fetch()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
