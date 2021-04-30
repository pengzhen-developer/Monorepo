<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               label-suffix="："
               label-width="auto"
               inline>
        <el-form-item label="机构名称">
          <el-select v-model="search.orgName">
            <el-option label="全部"
                       value=""></el-option>
            <el-option :key="index"
                       :label="item.orgName"
                       :value="item.orgName"
                       v-for="(item, index) in orgNameList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药店">
          <el-select v-model="search.drugstore">
            <el-option label="全部"
                       value=""></el-option>
            <el-option :key="index"
                       :label="item.drugStoreName"
                       :value="item.drugStoreName"
                       v-for="(item, index) in drugstoreList"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="取货方式">
          <el-select v-model="search.orderType"
                     v-on:change="search.orderStatus = ''"
                     clearable=""
                     placeholder="全部">
            <el-option :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ShippingMethod"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态">
          <!-- 自提 -->
          <template v-if="search.orderType === '0'">
            <el-select v-model="search.orderStatus"
                       clearable=""
                       placeholder="全部">
              <el-option :key="'order' + item.value"
                         :label="item.label"
                         :value="item.value"
                         v-for="item in source.SelfOrderStatus"></el-option>
            </el-select>
          </template>
          <!-- 配送 -->
          <template v-else-if="search.orderType === '1'">
            <el-select v-model="search.orderStatus"
                       clearable=""
                       placeholder="全部">
              <el-option :key="'order' + item.value"
                         :label="item.label"
                         :value="item.value"
                         v-for="item in source.DistributionOrderStatus"></el-option>
            </el-select>
          </template>
          <!-- 未选择 -->
          <template v-else>
            <el-select v-model="search.orderStatus"
                       disabled
                       placeholder="全部"></el-select>
          </template>
        </el-form-item>

        <el-form-item label="订单支付状态">
          <el-select v-model="search.orderPayStatus">
            <el-option value=""
                       label="全部"></el-option>
            <el-option :key="'order' + item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.orderPayStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-select v-model="search.payType">
            <el-option label="全部"
                       value=""></el-option>
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.payTypeList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input placeholder="输入订单编号"
                    v-model="search.orderNo"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="下单日期">
          <PeaceDatePicker v-model="search.time"
                           type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="至今"
                           value-format="yyyy-MM-dd"
                           :picker-options="pickerOptions">
          </PeaceDatePicker>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="fetch()"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn label="订单编号"
                          width="250">
          <template slot-scope="scope">
            <el-button @click="getPurchaseOrder(scope.row,scope.row.orderNo)"
                       size="mini"
                       style="white-space:normal;text-align:left;"
                       type="text">{{ scope.row.orderNo}}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单应用"
                          width="100"
                          prop="source">
        </PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          min-width="180"
                          prop="hospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn label="就诊人"
                          width="100"
                          prop="patientName"></PeaceTableColumn>
        <PeaceTableColumn label="意向药店"
                          min-width="150"
                          prop="drugStore"></PeaceTableColumn>
        <PeaceTableColumn label="订单金额（元）"
                          min-width="140"
                          prop="orderMoney">
          <template slot-scope="scope">
            <span>{{ scope.row.orderMoney }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="100"
                          prop="orderStatus">
          <template slot-scope="scope">
            <span>{{ getOrderStatusText(scope.row) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单支付状态"
                          min-width="120"
                          prop="orderPayStatus">
          <template slot-scope="scope">
            <span>{{ scope.row.orderPayStatus | getEnumLable(source.orderPayStatus) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="下单时间"
                          min-width="180"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right"
                          min-width="100">
          <template slot-scope="scope">
            <template>
              <el-button @click="getPres(scope.row.prescribeId)"
                         size="mini"
                         type="text">查看处方</el-button>
            </template>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <!-- 处方详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="presDialogVisible"
                  title="处方详情"
                  v-if="presDialogVisible"
                  append-to-body
                  width="580px">
      <pres-info :info="currentPres"></pres-info>
    </peace-dialog>
    <!-- 购药订单详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="purchaseDialogVisible"
                  title="购药订单详情"
                  v-if="purchaseDialogVisible"
                  append-to-body
                  width="576px">
      <purchase-order-info :info="currentPurchase"
                           @viewPres="viewPres"></purchase-order-info>
    </peace-dialog>
  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'

import PresInfo from './components/PrescriptionOrderDetail'
import PurchaseOrderInfo from './components/DrugPurchaseOrderDetail'

export default {
  name: 'drug-purchase-order',
  data() {
    return {
      channels: [],
      search: {
        orgName: '', // 渠道机构名称
        drugstore: '', // 药店名称
        orderType: '', // 取货方式
        orderStatus: '', // 订单状态
        orderPayStatus: '', // 订单支付状态
        payType: '', // 支付类型：1：医保支付  2：微信支付|
        orderNo: '', // 订单编号
        time: [],
        startTime: '', // 下单开始时间
        endTime: '', // 下单结束时间
        p: 1,
        size: 10
      },
      orgNameList: [],
      drugstoreList: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      currentAdvisoryInfo: '',
      currentInquiry: '',
      currentRecord: '',
      currentPres: '',
      currentPurchase: '',
      infoDialogVisible: false,
      inquiryDialogVisible: false,
      recordDialogVisible: false,
      presDialogVisible: false,
      purchaseDialogVisible: false,
      exportDialogVisible: false,

      source: {
        ShippingMethod: [],
        DistributionOrderStatus: [],
        SelfOrderStatus: [],
        payTypeList: Constant.PAYMENT_STATUS,
        orderPayStatus: Constant.ORDER_PAY_STATUS
      }
    }
  },
  filters: {
    getEnumLable: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  watch: {
    ['search.time']() {
      this.search.startTime = this.search.time ? this.search.time[0] : ''
      this.search.endTime = this.search.time ? this.search.time[1] : ''
    }
  },
  methods: {
    getOrderStatusText(row) {
      if (row.orderType.toString() === '0') {
        return this.source.SelfOrderStatus.find((item) => item.value === row.orderStatus.toString())?.label
      } else {
        return this.source.DistributionOrderStatus.find((item) => item.value === row.orderStatus.toString())?.label
      }
    },
    fetch() {
      const fetch = Service.getOrderDrugList
      const params = this.search

      this.$refs.table.reloadData({ fetch, params })
    },

    //获取渠道信息
    getCannel() {
      Service.getChannel({}).then((res) => {
        this.channels = res.data
      })
    },
    // 获取筛选条件数据
    getCondition() {
      Service.getCondition({}).then((res) => {
        this.orgNameList = res.data.orgInfo || []
        this.drugstoreList = res.data.drugData || []
      })
    },
    // 用药建议（处方）
    getPres(id) {
      const params = { prescribeId: id }
      Service.getPresInfo(params)
        .then((res) => {
          this.presDialogVisible = true
          this.currentPres = res.data
          this.currentPres.prescriptionId = id
        })
        .catch((res) => {
          this.$message.error(res.msg)
          this.presDialogVisible = false
        })
    },
    // 查看处方（购药订单子组件触发）
    viewPres(param) {
      return this.getPres(param.ids, param.idx)
    },
    // 购药订单
    getPurchaseOrder(data, orderNo, index) {
      const params = { orderNo }
      Service.getPurchases(params).then((res) => {
        this.purchaseDialogVisible = true
        this.currentPurchase = Object.assign({}, res.data, {
          presIds: data.prescribeId,
          $index: index
        })
      })
    },

    exportExcel() {
      this.exportDialogVisible = true
    }
  },

  async created() {
    this.getCondition()

    // 获取字典
    // 配送方式
    this.source.ShippingMethod = await Peace.identity.dictionary.getList('ShippingMethod')

    // 订单状态
    this.source.DistributionOrderStatus = await Peace.identity.dictionary.getList('distribution_order_status')
    this.source.SelfOrderStatus = await Peace.identity.dictionary.getList('self_extraction_order_status')
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  components: {
    PresInfo,
    PurchaseOrderInfo
  }
}
</script>
<style lang="scss" scoped>
</style>
