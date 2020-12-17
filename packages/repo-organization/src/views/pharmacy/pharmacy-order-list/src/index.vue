<template>
  <div class="layout-route bg-grey-3">

    <div>
      <el-tabs class="tab-header-1 bg-grey-3"
               type="card"
               v-on:tab-click="reFetch"
               v-model="model.ShippingMethod">
        <el-tab-pane v-for="item in source.ShippingMethod"
                     v-bind:key="item.value"
                     v-bind:name="item.value.toString()">
          <el-badge slot="label"
                    v-bind:value="item.unprocessCount"
                    v-bind:hidden="item.unprocessCount === 0">
            <span style="min-width: 80px;"
                  class="inline block text-center">{{ item.label }}</span>
          </el-badge>
        </el-tab-pane>
      </el-tabs>

      <div class="bg-white">
        <el-tabs class="tab-header-2"
                 v-on:tab-click="reFetch"
                 v-model="model.OrderStatus">
          <el-tab-pane v-for="item in source.OrderStatus"
                       v-bind:key="item.value"
                       v-bind:name="item.value.toString()">
            <el-badge slot="label"
                      v-bind:value="item.unprocessCount"
                      v-bind:hidden="item.unprocessCount === 0">
              <span style="min-width: 80px;"
                    class="inline block text-center">{{ item.label }}</span>
            </el-badge>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-model="model"
               v-on:keyup.enter.native="fetch">

        <el-form-item>
          <span slot="label">
            <span class="em-5-justify">订单编号</span>
            <span>：</span>
          </span>

          <el-input v-model="model.OrderId"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span class="em-5-justify">
              {{ model.ShippingMethod === '0' ? '取件人姓名' : '收件人姓名' }}
            </span>
            <span>：</span>
          </span>

          <el-input v-model="model.UserName"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span class="em-5-justify">
              {{ model.ShippingMethod === '0' ? '取件人电话' : '收件人电话' }}
            </span>
            <span>：</span>
          </span>

          <el-input v-model="model.UserPhone"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span class="em-5-justify">下单时间</span>
            <span>：</span>
          </span>

          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             placeholder=""
                             v-model="TimeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button style="min-width: 80px;"
                     type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <peace-table ref="table"
                   border
                   pagination
                   v-bind:pageSize="5"
                   v-bind:key="model.ShippingMethod">
        <peace-table-column>
          <template slot="header">
            <div class="flex items-start">
              <!-- 单列实现伪表格，为保持样式统一，表头布局与内容布局必须保持一致 (** 宽度) -->
              <div class="q-px-md q-py-sm col">订单信息</div>
              <div class="q-px-md q-py-sm"
                   style="width: 240px;">
                {{ model.ShippingMethod === '0' ? '取货信息' : '收获信息' }}
              </div>
              <div class="q-px-md q-py-sm"
                   style="width: 200px;">操作</div>
            </div>
          </template>

          <template slot="default"
                    slot-scope="scope">
            <div class="flex column">
              <!-- 订单抬头 -->
              <div class="flex justify-between bg-grey-3 q-pa-md">
                <div>
                  <span class="q-mr-lg text-caption text-grey-6">订单编号：{{ scope.row.OrderId }}</span>
                  <span class="q-mr-lg text-caption text-grey-6">下单时间：{{ scope.row.CreateOrderTime }}</span>
                  <span class="q-mr-lg text-caption">支付方式：{{ scope.row.PayMode | formatDictionary(source.PayMode) }}</span>
                </div>
                <div>
                  <span v-bind:class="orderStatusTextClass(scope.row.OrderStatus)">
                    {{ scope.row.OrderStatus | formatDictionary(source.OrderStatus) }}
                  </span>
                </div>
              </div>

              <!-- 订单明细 -->
              <div class="flex"
                   style="border-bottom: 1px solid #f2f2f2; ">

                <!-- 订单信息 -->
                <div class="col q-px-md q-py-sm"
                     style="border: 1px solid #f2f2f2; ">
                  <div class="flex justify-between q-mb-md"
                       v-for="item in scope.row.OrderDetail"
                       v-bind:key="item.DrugName">
                    <div class="q-px-xs"
                         style="width: 80px; min-width: 80px;">
                      <el-image v-bind:src="item.DrugImage"></el-image>
                    </div>
                    <div class="q-px-xs flex column col">
                      <span class="inline-block q-mb-xs text-subtitle2 text-weight-bold">{{ item.DrugName }}</span>
                      <span class="inline-block q-mb-xs text-body2 text-grey-6">{{ item.DrugSpecification }}</span>
                      <span class="inline-block q-mb-xs text-body2 text-grey-6">{{ item.EnterpriseName }}</span>
                    </div>
                    <div class="q-px-xs"
                         style="min-width: 80px; width: 80;">￥ {{ item.DrugPrice }}</div>
                    <div class="q-px-xs"
                         style="min-width: 40px; width: 40;">x {{ item.DrugNumber }}</div>
                    <div class="q-px-xs"
                         style="min-width: 80px; width: 80;">￥ {{ item.DrugPrice * item.DrugNumber | formatCurrency }}</div>
                  </div>
                </div>

                <!-- 取货信息 -->
                <div class="flex column items-start q-px-md q-py-sm"
                     style="border: 1px solid #f2f2f2;  width: 240px;"
                     v-if="scope.row.ShippingMethod === 0">
                  <span>取件人：{{ scope.row.UserName }}</span>
                  <span>电话：{{ scope.row.UserPhone }}</span>
                </div>

                <!-- 收获信息 -->
                <div class="flex column items-start q-px-md q-py-sm"
                     style="border: 1px solid #f2f2f2;  width: 240px;"
                     v-if="scope.row.ShippingMethod === 1">
                  <span>收件人：{{ scope.row.UserName }}</span>
                  <span>电话：{{ scope.row.UserPhone }}</span>
                  <span>收件地址：{{ scope.row.ReceiverState  + scope.row.ReceiverCity + scope.row.ReceiverDistrict + scope.row.Detailed }}</span>
                </div>

                <!-- 操作 -->
                <div class="q-px-md q-py-sm"
                     style="border: 1px solid #f2f2f2; width: 200px;">

                  <div class="q-mb-md">
                    <PharmacyOrderControl v-bind:model="scope.row"
                                          v-on:success="fetch"></PharmacyOrderControl>
                  </div>

                  <div class="text-center">
                    <el-button type="text"
                               v-on:click="gotoPharmacyOrderDetail(scope.row)">订单详情</el-button>
                    <el-button type="text"
                               v-on:click="gotoPrescriptionDetail(scope.row)">处方详情</el-button>
                  </div>
                </div>
              </div>

              <!-- 订单合计 -->
              <div class="flex justify-between q-px-md q-pt-md q-pb-none">
                <div>
                  <span>{{ scope.row.DrugStoreName }}</span>
                </div>
                <div>
                  <span class="q-mr-xl">
                    共 {{ scope.row.TotalNumber }} 件商品
                  </span>
                  <span class="q-mr-xl">
                    商品价格 ￥{{ scope.row.TotalAmount }}
                  </span>
                  <span class="q-mr-xl text-red"
                        v-if="scope.row.YbDetails && scope.row.YbDetails.length > 0">
                    医保抵扣 -￥{{ scope.row.YbDetails.reduce((accumulator, currentValue) => accumulator + currentValue.Amount ,0) | formatCurrency }}
                  </span>
                  <span class="q-mr-xl text-red"
                        v-if="scope.row.SbDetails && scope.row.SbDetails.length > 0">
                    商保抵扣 -￥{{ scope.row.SbDetails.reduce((accumulator, currentValue) => accumulator + currentValue.Amount ,0) | formatCurrency }}
                  </span>
                  <span class="text-weight-bold text-subtitle1">
                    {{ scope.row.IsPay ? '实付金额' : '应付金额' }} ￥{{ scope.row.PayAmount }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </peace-table-column>
      </peace-table>
    </div>
  </div>
</template>

<script>
import PharmacyOrderControl from './../../pharmacy-order-control'

import Service from './service'

export default {
  name: 'PharmacyOrderList',

  inject: ['provideAddTab', 'provideGetTab'],

  components: {
    PharmacyOrderControl
  },

  filters: {
    formatDictionary(value, source) {
      return source.find((item) => item.value === value)?.label
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
      TimeRange: [],

      model: {
        ShippingMethod: '0',
        OrderStatus: '',
        OrderId: '',
        UserName: '',
        UserPhone: '',
        StartTime: '',
        EndTime: ''
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
    TimeRange(value) {
      this.model.StartTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    },

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

  activated() {
    this.reFetch()
  },

  mounted() {
    this.$nextTick().then(this.fetch)
  },

  methods: {
    fetch() {
      this.getReceiveOrderList()
      this.getBubbleInfo()
    },

    reFetch() {
      this.$nextTick().then(this.fetch)
    },

    getReceiveOrderList() {
      const fetch = Service.getReceiveOrderList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },

    getBubbleInfo() {
      const params = Peace.util.deepClone(this.model)

      Service.getBubbleInfo(params).then((res) => {
        this.source.ShippingMethod.forEach((item) => {
          switch (item.label) {
            case '自提订单':
              item.unprocessCount = res.data.StorePickupCount
              break
            case '配送订单':
              item.unprocessCount = res.data.DeliveryCount
              break
          }
        })

        this.source.OrderStatus.forEach((item) => {
          switch (item.label) {
            case '等待接单':
              item.unprocessCount = res.data.WaitCount
              break
            case '已接单':
              item.unprocessCount = res.data.ReceiveCount
              break
            case '已备药':
            case '已发货':
              item.unprocessCount = res.data.PrepareCount
              break
          }
        })
      })
    },

    orderStatusTextClass(orderStatus) {
      const orderStatusTextClassMap = {
        1: 'text-red',
        2: 'text-red',
        3: 'text-red'
      }

      return orderStatusTextClassMap[orderStatus]
    },

    gotoPharmacyOrderDetail(row) {
      // TODO
      // 带优化项，参数应该使用 route/:id 形式传递，因标签页问题，暂时使用缓存处理
      Peace.cache.sessionStorage.set('6-6-98-Id', row.Id)

      const menu = this.provideGetTab('订单详情')
      this.provideAddTab(menu)
    },

    gotoPrescriptionDetail(row) {
      // TODO
      // 带优化项，参数应该使用 route/:id 形式传递，因标签页问题，暂时使用缓存处理
      Peace.cache.sessionStorage.set('6-6-99-OrderId', row.OrderId)

      const menu = this.provideGetTab('处方详情')
      this.provideAddTab(menu)
    }
  }
}
</script>


<style lang="scss" scoped>
::v-deep .tab-header-1.el-tabs {
  .el-tabs__header {
    margin: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item {
    border: 1px solid #fafafa;
    background: #fafafa;
    margin: 0 8px 0 0;
    border-radius: 8px 8px 0 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: 1px solid #fff;
    background: #fff;
  }
}

::v-deep .tab-header-2 {
  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    display: inline-flex;
    align-items: center;
    height: 60px;
  }

  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 60px;
  }
}

::v-deep .el-badge__content.is-fixed {
  z-index: 1;
  top: 10px;
}

::v-deep .el-table .cell,
::v-deep .el-table--border td:first-child .cell,
::v-deep .el-table--border th:first-child .cell {
  padding: 0;
}
</style>