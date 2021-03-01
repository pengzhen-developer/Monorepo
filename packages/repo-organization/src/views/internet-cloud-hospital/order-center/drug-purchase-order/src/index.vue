<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>患者姓名</span>
            <span>：</span>
          </span>
          <el-input v-model="model.patientName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>意向药店</span>
            <span>：</span>
          </span>
          <el-input v-model="model.drugstore"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>支付类型</span>
            <span>：</span>
          </span>
          <el-select v-model="model.payType"
                     clearable
                     placeholder="全部">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_PAYMENT"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>支付状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.orderPayStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_ORDER_PAY_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>配送类型</span>
            <span>：</span>
          </span>
          <el-select v-model="model.sendType"
                     v-on:change="model.orderStatus = ''"
                     clearable
                     placeholder="全部">
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ShippingMethod"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>订单状态</span>
            <span>：</span>
          </span>
          <!-- 自提 -->
          <template v-if="model.sendType === '0'">
            <el-select v-model="model.orderStatus"
                       clearable
                       placeholder="全部">
              <el-option :key="'order' + item.value"
                         :label="item.label"
                         :value="item.value"
                         v-for="item in source.SelfOrderStatus"></el-option>
            </el-select>
          </template>
          <!-- 配送 -->
          <template v-else-if="model.sendType === '1'">
            <el-select v-model="model.orderStatus"
                       clearable
                       placeholder="全部">
              <el-option :key="'order' + item.value"
                         :label="item.label"
                         :value="item.value"
                         v-for="item in source.DistributionOrderStatus"></el-option>
            </el-select>
          </template>
          <!-- 未选择 -->
          <template v-else>
            <el-select v-model="model.orderStatus"
                       disabled
                       placeholder="全部"></el-select>
          </template>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>下单日期</span>
            <span>：</span>
          </span>
          <peace-date-picker type="daterange"
                             v-model="timeRange"
                             :picker-options="pickerOptions"
                             format="yyyy-MM-dd"
                             value-format="yyyy-MM-dd"></peace-date-picker>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button type="default"
                   @click="showExportModel">导出</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="序号"
                          prop="code"
                          width="70"></PeaceTableColumn>
        <PeaceTableColumn label="患者姓名"
                          min-width="120">
          <template slot-scope="scope">
            <span @click="toPatientPage(scope.row.familyId, scope.row.patientName, scope.row.patientNo)"
                  class="primary">{{ scope.row.patientName }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药店"
                          min-width="180"
                          prop="drugStore"></PeaceTableColumn>
        <PeaceTableColumn label="配送类型"
                          min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.sendType | getEnumLabel(source.ShippingMethod) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单金额（元）"
                          prop="orderMoney"
                          width="125">
        </PeaceTableColumn>
        <PeaceTableColumn label="支付类型"
                          min-width="120">
          <template slot-scope="scope">
            <span>{{ getPaymentStatus(scope.row.paymentType) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="120">
          <template slot-scope="scope">
            <span>{{ getOrderStatusText(scope.row) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="支付状态"
                          min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.orderPayStatus | getEnumLabel(source.ENUM_ORDER_PAY_STATUS) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="下单时间"
                          prop="createdTime"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="180">
          <template slot-scope="scope">
            <div class="seeMore">
              <el-button @click="getDrugPurchaseOrderDetail(scope.row)"
                         type="text">查看详情</el-button>
              <el-button @click="getPrescriptionDetail(scope.row.prescribeId)"
                         type="text">查看处方</el-button>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="prescriptionDialogVisible"
                 append-to-body
                 title="处方详情"
                 v-if="prescriptionDialogVisible"
                 width="580px">
      <prescription-info :id="currentPrescription"
                         @viewPres="viewPres"></prescription-info>
    </PeaceDialog>
    <PeaceDialog :visible.sync="drugPurchaseOrder.visible"
                 append-to-body
                 title="购药详情"
                 v-if="drugPurchaseOrder.visible"
                 width="580px">
      <drug-purchase-detail :info="drugPurchaseOrder.data"
                            @viewPres="viewPres"></drug-purchase-detail>
    </PeaceDialog>
    <!-- 导出 -->
    <PeaceDialog :visible.sync="exportDialogVisible"
                 append-to-body
                 title="订单导出条件"
                 v-if="exportDialogVisible"
                 width="420px">
      <export-order :query="model"></export-order>
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import PrescriptionInfo from './components/PrescriptionInfo.js'
import DrugPurchaseDetail from './components/DrugPurchaseDetail'
import ExportOrder from './components/ExportOrder'

export default {
  name: 'DrugPurchaseOrder',
  components: { PrescriptionInfo, DrugPurchaseDetail, ExportOrder },
  data() {
    return {
      model: {
        patientName: '',
        drugstore: '',
        payType: '',
        orderPayStatus: '',
        sendType: '',
        orderStatus: '',
        startTime: '',
        endTime: ''
      },
      timeRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      currentPrescription: '',
      prescriptionDialogVisible: false,

      drugPurchaseOrder: {
        data: '',
        visible: false
      },
      exportDialogVisible: false,

      source: {
        ENUM_PAYMENT: CONSTANT.ENUM_PAYMENT,
        ENUM_ORDER_PAY_STATUS: CONSTANT.ENUM_ORDER_PAY_STATUS,
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: []
      }
    }
  },
  watch: {
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.startTime = timeRange[0] ? timeRange[0] : ''
        this.model.endTime = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.startTime = ''
        this.model.endTime = ''
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  async created() {
    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')
    // 订单状态
    this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
    this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getOrderStatusText(row) {
      if (row.sendType.toString() === '0') {
        return this.source.SelfOrderStatus.find((item) => item.value === row.orderStatus.toString())?.label
      } else {
        return this.source.DistributionOrderStatus.find((item) => item.value === row.orderStatus.toString())?.label
      }
    },
    getPaymentStatus(status) {
      let list = status.split(',')
      const result = list.map((payment) => {
        return this.source.ENUM_PAYMENT.find((item) => item.value == payment)?.label
      })
      return result.join(',')
    },
    showExportModel() {
      this.exportDialogVisible = true
    },
    getList() {
      const fetch = Service.getDrugOrderList
      let params = Peace.util.deepClone(this.model)
      params.startTime = params.startTime ? params.startTime + ' 00:00:00' : ''
      params.endTime = params.endTime ? params.endTime + ' 23:59:59' : ''

      this.$refs.table.reloadData({ fetch, params })
    },
    getDrugPurchaseOrderDetail(row) {
      Service.getDrugPurchaseOrderDetail({ orderNo: row.orderNo }).then((res) => {
        this.drugPurchaseOrder.data = Object.assign({}, res.data)
        this.drugPurchaseOrder.visible = true
      })
    },
    getPrescriptionDetail(id) {
      this.currentPrescription = id
      this.prescriptionDialogVisible = true
    },
    // 查看处方（购药订单子组件触发,处方详情子组件触发）
    viewPres(param) {
      return this.getPrescriptionDetail(param.presIds)
    },

    toPatientPage(id, name, patientNo) {
      this.$router.push({
        path: '/internet-cloud-hospital/patient-management/patient-detail',
        query: { id, patientNo, name, type: 'inquiry' }
      })
    }
  }
}
</script>

<style scoped>
.top-menu {
  margin-bottom: 20px;
}
.primary {
  color: var(--q-color-primary);
  cursor: pointer;
}
.seeMore {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>