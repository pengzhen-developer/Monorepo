<template>
  <div class="layout-route">
    <div class="card q-mb-md">
      <span class="q-mr-lg">订单编号：{{ model.OrderId }}</span>
      <span class="q-mr-lg">下单时间：{{ model.CreateOrderTime }}</span>
      <span class="q-mr-lg">订单来源：{{ model.OrderSourceName }}</span>
    </div>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-6">
        <div class="card full-height">
          <div class="card-title">
            <span class="title text-subtitle1">{{ model.DrugStoreName }}</span>
          </div>
          <div class="card-content">
            <div class="q-mb-md">
              <span class="text-grey-333">订单类型</span>
              <span>：</span>
              <span class="text-grey-666 q-mr-lg">{{ model.ShippingMethod | formatDictionary(source.ShippingMethod) }}</span>

              <span class="text-grey-333">支付方式</span>
              <span>：</span>
              <span class="text-grey-666">{{ model.PayMode | formatDictionary(source.PayMode) }}</span>
            </div>

            <div class="q-mb-md">
              <span class="text-h6 text-weight-bold">{{ model.OrderStatus | formatDictionary(source.OrderStatus) }}</span>
              <span class="q-ml-lg"
                    v-if="showPickUpCode()">
                <span>取件码：</span>
                <span class="text-red text-subtitle1">{{ model.PickUpCode }}</span>
              </span>
            </div>

            <div style="width: 166px">
              <PharmacyOrderControl v-bind:model="model"
                                    v-on:success="fetch"></PharmacyOrderControl>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card full-height">
          <div class="card-title">
            <span class="title text-subtitle1">接单流水</span>
          </div>
          <div class="card-content">
            <q-scroll-area v-bind:thumb-style="{
                                                 right: '0px',
                                                 borderRadius: '5px',
                                                 backgroundColor: '#ccc',
                                                 width: '5px',
                                                 opacity: 0.75
                                               }"
                           v-bind:style="{ height: '120px' }">
              <div class="q-mb-xs"
                   v-for="timeline in model.Timeline"
                   v-bind:key="timeline.key">
                <span class="text-grey-666 q-mr-lg">{{ timeline.time }}</span>
                <span class="text-grey-333">{{ timeline.label }}</span>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-6">
        <div class="card full-height">
          <div class="card-title">
            <span class="title text-subtitle1">客户信息</span>
          </div>
          <div class="card-content">
            <div class="q-mb-sm">
              <span class="text-grey-333">客户姓名</span>
              <span>：</span>
              <span class="text-grey-666 q-mr-lg">{{ model.UserName }}</span>
            </div>
            <div class="q-mb-sm">
              <span class="text-grey-333">联系电话</span>
              <span>：</span>
              <span class="text-grey-666 q-mr-lg">{{ model.UserPhone }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card full-height">
          <div class="card-title">
            <span class="title text-subtitle1">支付信息</span>
          </div>
          <div class="card-content">
            <div class="q-mb-sm">
              <span class="text-grey-333">支付状态</span>
              <span>：</span>
              <span class="text-grey-666 q-mr-lg">{{ model.IsPay ? '已支付' : '未支付' }}</span>
            </div>
            <div class="q-mb-sm">
              <span class="text-grey-333">支付时间</span>
              <span>：</span>
              <span class="text-grey-666 q-mr-lg">{{ model.PayTime ? model.PayTime : '--' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card q-mb-md">
      <div class="card-title flex justify-between">
        <div>
          <span class="title text-subtitle1">订单详情</span>
        </div>
        <div>
          <el-button plain
                     type="primary"
                     v-on:click="gotoPrescriptionDetail">查看处方</el-button>
        </div>
      </div>

      <div class="card-content">
        <PeaceTable v-bind:data="model.OrderDetail">
          <el-table-column label="商品信息"
                           prop="DrugName"
                           min-width="200px">
            <template slot-scope="scope">
              <div class="flex justify-between q-mb-md">
                <div class="q-px-xs"
                     style="width: 80px; min-width: 80px;">
                  <el-image v-bind:src="scope.row.DrugImage"></el-image>
                </div>
                <div class="q-px-xs flex column col">
                  <span class="inline-block q-mb-xs text-subtitle2 text-weight-bold">{{ scope.row.DrugName }}</span>
                  <span class="inline-block q-mb-xs text-body2 text-grey-6">{{ scope.row.DrugSpecification }}</span>
                  <span class="inline-block q-mb-xs text-body2 text-grey-6">{{ scope.row.EnterpriseName }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价"
                           prop="DrugPrice">
            <template slot-scope="scope">
              ￥{{ scope.row.DrugPrice }}
            </template>
          </el-table-column>
          <el-table-column label="数量"
                           prop="DrugNumber"></el-table-column>
          <el-table-column label="小计"
                           prop="DrugNumber">
            <template slot-scope="scope">
              ￥{{ scope.row.DrugPrice * scope.row.DrugNumber | formatCurrency }}
            </template>
          </el-table-column>
        </PeaceTable>
      </div>

      <div class="flex column items-end q-pa-md"
           style="background: #FAFCFE;">
        <div class="q-mb-sm">
          <span>合计数量</span>
          <span>：</span>
          <span class="q-mr-xl">{{ model.TotalNumber }}</span>
          <span>合计金额</span>
          <span>：</span>
          <span class="inline-block text-right"
                style="width: 80px">￥{{ model.TotalAmount }}</span>
        </div>
        <div class="q-mb-sm"
             v-if="model.YbDetails && model.YbDetails.length > 0">
          <span>医保抵扣</span>
          <span>：</span>
          <span class="inline-block text-right text-red-4"
                style="width: 80px">-￥{{ model.YbDetails.reduce((accumulator, currentValue) => accumulator + currentValue.Amount ,0) | formatCurrency }}</span>
        </div>
        <div class="q-mb-sm"
             v-if="model.SbDetails && model.SbDetails.length > 0">
          <span>商保抵扣</span>
          <span>：</span>
          <span class="inline-block text-right text-red-4"
                style="width: 80px">-￥{{ model.SbDetails.reduce((accumulator, currentValue) => accumulator + currentValue.Amount ,0) | formatCurrency }}</span>
        </div>
        <div class="q-mb-sm">
          <span class="text-subtitle1">{{ model.IsPay ? '实付金额' : '应付金额' }}</span>
          <span>：</span>
          <span class="inline-block text-right text-subtitle1 text-red text-weight-bold"
                style="width: 80px">￥{{ model.PayAmount }}</span>
        </div>
      </div>
    </div>

    <div class="card q-mb-lg"
         v-if="LogisticsTimeline.Number">
      <div class="card-title flex justify-between">
        <span class="title text-subtitle1">物流信息</span>
      </div>

      <div class="q-mb-32">
        <span class="text-grey-7">物流配送方式：</span>
        <span class="text-grey-7 q-mr-xl">快递公司配送</span>
        <span class="text-grey-7">物流公司名称：</span>
        <span class="text-grey-7 q-mr-xl">{{ LogisticsTimeline.Name }}</span>
        <span class="text-grey-7">物流单号：</span>
        <span class="text-grey-7">{{ LogisticsTimeline.Number }}</span>
      </div>

      <ul class="el-timeline">
        <li class="el-timeline-item"
            v-for="(timeline, index) in LogisticsTimeline.Stream"
            v-bind:key="timeline.Time">
          <div class="el-timeline-title">
            <div class="text-subtitle2">{{ timeline.MonthVisible }}</div>
            <div class="text-caption text-grey-5">{{ timeline.TimeVisible }}</div>
          </div>
          <div class="el-timeline-item__tail">
          </div>
          <div v-show="index !== 0"
               class="el-timeline-item__node el-timeline-item__node--large">
            <!-- <i class="el-timeline-item__icon el-icon-more"></i> -->
          </div>
          <div v-show="index === 0"
               class="el-timeline-item__node el-timeline-item__node--large el-timeline-item__node--primary">
            <i v-if="LogisticsTimeline.State === 3"
               class="el-timeline-item__icon el-icon-circle-check"></i>
            <i v-else
               class="el-timeline-item__icon el-icon-more"></i>
          </div>
          <!---->
          <div class="el-timeline-item__wrapper">
            <!---->
            <div class="el-timeline-item__content text-subtitle1"> {{ timeline.Status }} </div>
            <div class="el-timeline-item__timestamp text-grey-6 text-caption is-bottom">
              {{ timeline.Content }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'

import PharmacyOrderControl from './../../order-control'

import Service from './service'

export default {
  components: {
    PharmacyOrderControl
  },

  filters: {
    formatDictionary(value, source) {
      if (!Peace.validate.isEmpty(value)) {
        return source.find((item) => item.value.toString() === value.toString())?.label
      }
    },

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
  },

  data() {
    return {
      model: {
        OrderId: '',
        CreateOrderTime: '',
        OrderSourceName: '',
        DrugStoreName: '',
        ShippingMethod: '',

        Timeline: []
      },

      LogisticsTimeline: {
        Number: '',
        Name: '',
        Stream: []
      },

      source: {
        // 配送方式
        ShippingMethod: [
          { label: '自提订单', value: 0, unprocessCount: 0 },
          { label: '配送订单', value: 1, unprocessCount: 0 }
        ],
        // 订单状态 => 见 watch 'model.ShippingMethod'
        OrderStatus: [],
        PayMode: [
          { label: '在线支付', value: 1 },
          { label: '到店支付', value: 2 },
          { label: '货到付款', value: 3 }
        ]
      }
    }
  },

  watch: {
    'model.ShippingMethod': {
      handler() {
        if (this.model.ShippingMethod?.toString() === this.source.ShippingMethod.find((item) => item.label === '自提订单')?.value?.toString()) {
          this.source.OrderStatus = [
            { label: '全部', value: '', unprocessCount: 0 },
            { label: '等待接单', value: 1, unprocessCount: 0 },
            { label: '已接单', value: 2, unprocessCount: 0 },
            { label: '已备药', value: 3, unprocessCount: 0 },
            { label: '已自提', value: 4, unprocessCount: 0 },
            { label: '已完成', value: 6, unprocessCount: 0 },
            { label: '已取消', value: 5, unprocessCount: 0 }
          ]
        } else {
          this.source.OrderStatus = [
            { label: '全部', value: '', unprocessCount: 0 },
            { label: '等待接单', value: 1, unprocessCount: 0 },
            { label: '已接单', value: 2, unprocessCount: 0 },
            { label: '已发货', value: 3, unprocessCount: 0 },
            { label: '已签收', value: 4, unprocessCount: 0 },
            { label: '已完成', value: 6, unprocessCount: 0 },
            { label: '已取消', value: 5, unprocessCount: 0 }
          ]
        }
      },
      immediate: true
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      const Id = this.$route.query.Id
      const params = {
        Id
      }

      Service.getOrderInfo(params)
        .then((res) => {
          res.data.Timeline = this.setDataToTimeline(res.data)

          this.model = res.data

          return res
        })
        .then((res) => {
          const params = {
            orderId: res.data.OrderId
          }

          Service.GQuery(params).then((res) => {
            if (res.data) {
              this.LogisticsTimeline = this.setDataToLogisticsTimeline(res.data)
            }
          })
        })
    },

    showPickUpCode() {
      return this.model.OrderStatus === this.source.OrderStatus.find((item) => item.label === '已备药')?.value
    },

    setDataToTimeline(model) {
      // 1， 系统已完成 / 客户手动完成
      // 2， 客户已签收
      // 3， 门店已发货，等待客户验收
      // 4， 门店已接单，等待发货
      // 5， 订单下单成功，等待接单
      // 6， 已取消
      const timelineDictionary = [
        {
          field: 'CreateOrderTime',
          description: '下单时间',
          label: (/** model */) => {
            return '订单下单成功，等待接单'
          }
        },
        {
          field: 'ReceiptOrderTime',
          description: '接单时间',
          label: (model) => {
            if (model.ShippingMethod?.toString() === this.source.ShippingMethod.find((item) => item.label === '自提订单')?.value?.toString()) {
              return '门店已接单，等待备货'
            } else {
              return '门店已接单，等待发货'
            }
          }
        },
        {
          field: 'DeliverGoodsTime',
          description: '已备药时间/已发货时间',
          label: (model) => {
            if (model.ShippingMethod?.toString() === this.source.ShippingMethod.find((item) => item.label === '自提订单')?.value?.toString()) {
              return '门店已备药，等待客户自提'
            } else {
              return '门店已发货，等待客户签收'
            }
          }
        },
        {
          field: 'ReceiptGoodsTime',
          description: '已自提时间/已签收时间',
          label: (model) => {
            if (model.ShippingMethod?.toString() === this.source.ShippingMethod.find((item) => item.label === '自提订单')?.value?.toString()) {
              return '门店已发药，客户完成自提'
            } else {
              return '客户已签收'
            }
          }
        },
        {
          field: 'CancelTime',
          description: '取消时间',
          label: (/** model */) => {
            return '客户已取消订单'
          }
        },
        {
          field: 'CompleteTime',
          description: '确认收货时间/已完成时间',
          label: (model) => {
            if (model.IsSysAutoComplete) {
              return '系统自动完成订单'
            } else {
              return '客户已完成订单'
            }
          }
        }
      ]
      const timelineList = []

      timelineDictionary.forEach((timeline, index) => {
        const time = model[timeline.field]

        if (!Peace.validate.isEmpty(time)) {
          timelineList.push({ key: index, time: time, label: timeline.label(model) })
        }
      })

      timelineList.sort((a, b) => {
        if (a.time < b.time) {
          return 1
        } else {
          return -1
        }
      })

      return timelineList
    },

    setDataToLogisticsTimeline(model) {
      model?.Stream.forEach((item) => {
        item.MonthVisible = date.formatDate(item.Time, 'MM-DD')
        item.TimeVisible = date.formatDate(item.Time, 'HH:mm')
      })

      return model
    },

    gotoPrescriptionDetail() {
      // TODO
      const name = '处方详情'
      const query = { OrderId: this.model.OrderId }
      this.$router.push({ name, query })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-title {
  margin: 0 0 16px 0;

  .title {
    &::before {
      content: ' ';
      display: inline-block;
      position: relative;
      top: 2px;
      margin: 0 10px 0 0;

      width: 4px;
      height: 16px;
      line-height: 16px;
      border-radius: 20px;

      background: var(--q-color-primary);
    }
  }
}

.el-timeline {
  padding: 0 0 0 60px;

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
}
</style>