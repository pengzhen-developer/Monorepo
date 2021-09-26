<template>
  <div class="relative">

    <!-- 订单信息 -->
    <div class="q-mb-lg">
      <div class="title q-mb-md">
        <span class="before before-vertical-line text-subtitle1 text-weight-bold">订单信息</span>
      </div>

      <div class="content q-gutter-x-xl q-gutter-y-sm">
        <div class="row">
          <div class="col-4">
            <span class="label-text">订单来源</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.MedicalInstitutionName }}</span>
          </div>
          <div class="col-4">
            <span class="label-text">取货方式</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.ShippingMethod | filterDictionaryFuzzy(source.ShippingMethod) }}</span>
          </div>
          <div class="col-4">
            <span class="label-text">医院订单编号</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.CustOrderKey || '-' }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <span class="label-text">开方医生</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.DoctorName }}</span>
          </div>

          <div class="col-4">
            <span class="label-text">科室</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.MedicalDepartmentName||'-' }}</span>
          </div>

        </div>
      </div>
    </div>

    <el-divider></el-divider>

    <!-- 客户信息 -->
    <div class="q-mb-lg">
      <div class="title q-mb-md">
        <span class="before before-vertical-line text-subtitle1 text-weight-bold">客户信息</span>
      </div>

      <div class="content label-text">
        <span class="q-mr-md">{{ data.UserName }}</span>
        <span class="q-mr-md">{{ data.UserPhone }}</span>
        <span class="q-mr-md">{{ data.Detailed }}</span>
      </div>
    </div>

    <el-divider></el-divider>

    <!-- 订单详情 -->
    <div class="q-mb-lg">
      <div class="title q-mb-md">
        <span class="before before-vertical-line text-subtitle1 text-weight-bold">订单详情</span>
      </div>

      <div class="content">
        <div class="q-mb-md">
          <span class="label-text">商品件数</span>
          <span class="label-text">:</span>
          <span class="label-text">{{ data.TotalNumber }}</span>
        </div>

        <peace-table v-bind:data="data.Drugs">
          <el-table-column label="药品名称"
                           prop="DrugName"></el-table-column>
          <el-table-column label="规格"
                           prop="DrugSpecification">
            <template slot-scope="scope">
              {{scope.row.DrugSpecification||'-'}}
            </template>
          </el-table-column>
          <el-table-column label="厂家"
                           prop="EnterpriseName">
            <template slot-scope="scope">
              {{scope.row.EnterpriseName||'-'}}
            </template>
          </el-table-column>
          <el-table-column label="单价/数量">
            <template slot-scope="scope">
              ￥{{ scope.row.DrugAmount }} x {{ scope.row.DrugNumber }}
            </template>
          </el-table-column>
          <el-table-column label="单位"
                           prop="PackUnit"></el-table-column>
        </peace-table>
      </div>
    </div>

    <el-divider></el-divider>

    <!-- 支付信息 -->
    <div class="q-mb-lg">
      <div class="title q-mb-md">
        <span class="before before-vertical-line text-subtitle1 text-weight-bold">支付信息</span>
      </div>

      <div class="content q-gutter-x-xl q-gutter-y-sm">
        <div class="row">
          <div class="col-4">
            <span class=" label-text">支付方式</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.PayMode | filterDictionaryFuzzy(source.PayMode) }}</span>
          </div>
          <div class="col-4">
            <span class=" label-text">支付状态</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.IsPay | filterDictionaryFuzzy(source.PayStatus) }}</span>
          </div>
          <div class="col-4">
            <span class=" label-text">支付时间</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.PayTime ? data.PayTime : '-'  }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <span class=" label-text">药品总金额</span>
            <span class="label-text">：</span>
            <span class="label-value">￥{{ data.TotalAmount }}</span>
          </div>
          <div class="col-4">
            <span class=" label-text">订单总金额</span>
            <span class="label-text">：</span>
            <span class="label-value">￥{{ data.OrderAmount }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <span class=" label-text">医保抵扣</span>
            <span class="label-text">：</span>
            <span class="label-value"
                  v-if="data.YbDetails">-￥{{ data.YbDetails.reduce((accumulator, currentValue) => accumulator + currentValue.Amount ,0) | formatCurrency }}
              <span v-html="getReduceText(data.YbDetails)"></span></span>
            <span class="label-value"
                  v-else>
              -
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <span class=" label-text">商保抵扣</span>
            <span class="label-text">：</span>
            <span class="label-value"
                  v-if="data.SbDetails">-￥{{ data.SbDetails.reduce((accumulator, currentValue) => accumulator + currentValue.Amount ,0) | formatCurrency }}
              <span v-html="getReduceText(data.SbDetails)"></span></span>
            <span class="label-value"
                  v-else>
              -
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <span class=" label-text">实付金额</span>
            <span class="label-text">：</span>
            <span class="label-value">￥{{ data.PayAmount }}</span>
          </div>
          <div class="col-8">
            <span class=" label-text">流水号</span>
            <span class="label-text">：</span>
            <span class="label-value">{{ data.PaySerialNumber || '-' }}</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AbnormalOrderDetail',
  props: {
    data: {
      type: Object,
      default() {
        return {
          OrderTime: '',
          OrderDetail: [],
          SbDetails: [],
          YbDetails: [],
          DiseaseOrderType: null,
          VarietiesOrderType: null,
          PatientIDNumber: '',
          PatientName: '',
          PatientSex: '',
          PatientAge: '',
          OrderStatusStr: '',
          ID: null,
          DeductionDetailed: '',
          TotalNumber: null,
          OrderStatus: null,
          ShippingMethod: null,
          OrderType: null,
          GetStatus: null,
          UserId: '',
          OrderId: '',
          UserName: '',
          UserPhone: '',
          JZTClaimNo: '',
          DrugNames: null,
          PayMode: null,
          IsPay: null,
          PayChannel: null,
          PaySerialNumber: '',
          Note: null,
          SendWarehouseStatus: null,
          SendWarehouseResult: null,
          CustOrderKey: null,
          IsSysAutoComplete: null,
          IsKuaidiSysReceiptGoods: null,
          TotalAmoun_Yuan: null,
          PayAmount: null,
          PromotionsCut_Yuan: null,
          Freight_Yuan: null,
          OrderAmount: null,
          SourcePlatformCode: '',
          SourceCustCode: '',
          TargetPlatformCode: '',
          TargetCustCode: '',
          CreateOrderTime: '',
          ReceiptOrderTime: '',
          DeliverGoodsTime: '',
          ReceiptGoodsTime: '',
          CancelTime: null,
          CompleteTime: null,
          CreateTime: '',
          LastModifyTime: '',
          PayTime: '',
          ReceiverState: '',
          ReceiverCity: '',
          ReceiverDistrict: '',
          Detailed: '',
          PickUpCode: '',
          ExpressName: '',
          CourierName: null,
          CourierPhone: null,
          HospitalCode: '',
          MedicalInstitutionName: '',
          MedicalDepartmentCode: null,
          MedicalDepartmentName: '',
          DoctorCode: '',
          DoctorName: '',
          DrugStoreName: '',
          DrugStoreCode: '',
          DrugStoreLogo: '',
          AccessCode: '',
          Longitude: '',
          Latitude: '',
          DrugStoreDetailed: '',
          MappingDrugUserId: '',
          MappingDrugUserName: null,
          DispensingUserId: '',
          DispensingUserName: ''
        }
      }
    }
  },
  async mounted() {
    this.source.OrderType = await Peace.identity.dictionary.getList('OrderType')
    this.source.OrderType.map((item) => {
      item.value = parseInt(item.value)
    })
    this.source.SendWarehouseStatus = await Peace.identity.dictionary.getList('SendWarehouseStatus')
    this.source.PayStatus = await Peace.identity.dictionary.getList('PayStatus')
  },
  data() {
    return {
      source: {
        // 按病症
        DiseaseOrderType: [
          { label: '其它', value: 0 },
          { label: '普通', value: 10 },
          { label: '重症', value: 20 }
        ],
        // 按品种
        VarietiesOrderType: [
          { label: '院内', value: 30 },
          { label: '外延', value: 40 }
        ],
        // 配送方式
        ShippingMethod: [
          { label: '自提', value: 0 },
          { label: '配送', value: 1 }
        ],
        // 订单状态 => 见 watch 'data.ShippingMethod'
        OrderStatus: [],
        // 流转状态 => 见 created 获取字典
        SendWarehouseStatus: [],
        PayMode: [
          { label: '在线支付', value: 1 },
          { label: '到店支付', value: 2 },
          { label: '货到付款', value: 3 }
        ],

        OrderType: [],
        PayStatus: []
      }
    }
  },
  watch: {
    'data.ShippingMethod': {
      async handler() {
        //DistributionOrderStatus  配送订单状态    1
        //SelfOrderStatus  自提订单状态  0
        const requestKey =
          this.data.ShippingMethod?.toString() === this.source.ShippingMethod.find((item) => item.label === '自提')?.value?.toString()
            ? 'SelfOrderStatus'
            : 'DistributionOrderStatus'
        this.source.OrderStatus = await peace.identity.dictionary.getList(requestKey)
      },
      immediate: true
    }
  },
  methods: {
    getReduceText(data) {
      if (!data || !Array.isArray(data) || data.length == 0) {
        return ''
      }

      let txt = '【'
      data.forEach((item, index) => {
        if (index > 0) {
          txt += '&emsp;&emsp;'
        }
        txt += `${item.Name}（-￥${item.Amount.toFixed(2)}）`
      })
      return (txt += '】')
    }
  },
  filters: {
    formatCurrency(value) {
      /* eslint-disable no-useless-escape */
      value = value.toString().replace(/\$|\,/g, '')
      if (isNaN(value)) value = '0'
      let sign = value == (value = Math.abs(value))
      value = Math.floor(value * 100 + 0.50000000001)
      let cents = value % 100
      value = Math.floor(value / 100).toString()
      if (cents < 10) cents = '0' + cents
      for (var i = 0; i < Math.floor((value.length - (1 + i)) / 3); i++)
        value = value.substring(0, value.length - (4 * i + 3)) + ',' + value.substring(value.length - (4 * i + 3))
      return (sign ? '' : '-') + value + '.' + cents
    }
  }
}
</script>

<style lang="scss" scoped>
.before-vertical-line {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #000;

  &::before {
    content: ' ';
    border-radius: 5px;
    width: 4px;
    height: 16px;
    line-height: 100%;
    background: var(--q-color-primary);
    margin: 0 10px 0 0;
  }
}

.logistics-code {
  display: inline-block;
  vertical-align: middle;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.label-text {
  font-size: 14px;
  color: #333;
}

.label-value {
  font-size: 14px;
  color: #666;
}

.store-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #333;
}

.store-logo {
  flex: none;
  width: 60px;
  height: 60px;
  margin-right: 12px;
  border-radius: 50%;
  background-color: #eee;
}

.store-logo-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  // object-fit: contain;
}

.el-timeline {
  padding: 0 0 0 50px;

  .el-timeline-title {
    text-align: right;
    position: absolute;
    top: -2px;
    margin: 0 0 0 -48px;
  }

  .el-timeline-item__tail {
    left: 9px;
    margin: 0 0 0 16px;
  }

  .el-timeline-item__node--large,
  .el-timeline-item__node--normal {
    margin: 0 0 0 16px;

    width: 24px;
    height: 24px;

    .el-timeline-item__icon {
      font-size: 24px;
    }
  }

  .el-timeline-item__wrapper {
    margin: 0 0 0 48px;
  }

  .el-timeline-item__timestamp {
    line-height: 22px;
  }
}
</style>