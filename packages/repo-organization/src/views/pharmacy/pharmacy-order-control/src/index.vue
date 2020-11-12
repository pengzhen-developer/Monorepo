
<template>
  <div>
    <el-button class="block full-width"
               size="medium"
               type="primary"
               v-if="canShowReceiveOrder()"
               v-on:click="receiveOrder">
      接单
    </el-button>

    <el-button class="block full-width"
               size="medium"
               type="primary"
               v-if="canShowPrepareMedicine()"
               v-on:click="prepareMedicine">
      备药
    </el-button>

    <el-button class="block full-width"
               size="medium"
               type="primary"
               v-if="canShowDispensingMedicine()"
               v-on:click="dispensingMedicine">
      发药
    </el-button>

    <el-button class="block full-width"
               size="medium"
               type="primary"
               v-if="canShowConfirmDelivery()"
               v-on:click="confirmDelivery">
      确认发货
    </el-button>

    <el-button class="block full-width"
               size="medium"
               type="primary"
               v-if="canShowConfirmReceipt()"
               v-on:click="confirmReceipt">
      已签收
    </el-button>

    <el-button class="block full-width"
               size="medium"
               type="primary"
               v-if="canShowEditPickUpCode()"
               v-on:click="editPickUpCode">
      修改单号
    </el-button>

    <PeaceDialog title="确认发货"
                 width="400px"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="dialog.model"
               v-bind:rules="dialog.rules">
        <el-form-item>
          <template slot="label">
            <span>物流配送方式</span>
            <span>：</span>
          </template>
          <div>
            <el-radio-group v-on:change="changeLogisticsType"
                            v-model="dialog.logisticsType">
              <el-radio label="logisticsCompany">
                <span class="text-subtitle2"
                      style="line-height: 28px;">物流公司配送</span>
              </el-radio>
              <br>
              <el-radio label="drugstore">
                <span class="text-subtitle2"
                      style="line-height: 28px;">门店配送</span>
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>

        <!-- 物流公司配送 -->
        <template v-if="dialog.logisticsType === 'logisticsCompany'">
          <el-form-item prop="ExpressName">
            <template slot="label">
              <span>物流公司名称</span>
              <span>：</span>
            </template>

            <el-input v-model="dialog.model.ExpressName"></el-input>
          </el-form-item>
          <el-form-item prop="PickUpCode">
            <template slot="label">
              <span>物流单号</span>
              <span>：</span>
            </template>

            <el-input v-model="dialog.model.PickUpCode"></el-input>
          </el-form-item>
        </template>

        <!-- 门店配送 -->
        <template v-if="dialog.logisticsType === 'drugstore'">
          <el-form-item prop="CourierName">
            <template slot="label">
              <span>配送人姓名</span>
              <span>：</span>
            </template>

            <el-input v-model="dialog.model.CourierName"></el-input>
          </el-form-item>
          <el-form-item prop="CourierPhone">
            <template slot="label">
              <span>联系电话</span>
              <span>：</span>
            </template>

            <el-input v-model="dialog.model.CourierPhone"></el-input>
          </el-form-item>
        </template>
      </el-form>

      <div slot="footer"
           class="text-center">
        <el-button style="min-width: 120px;"
                   type="primary"
                   v-on:click="confirmDeliveryAgain">确定</el-button>
        <el-button style="min-width: 120px;"
                   v-on:click="closeDialog">取消</el-button>
      </div>
    </PeaceDialog>

    <PeaceDialog title="修改单号"
                 width="400px"
                 v-if="dialog2.visible"
                 v-bind:visible.sync="dialog2.visible">
      <el-form ref="form"
               label-width="100px"
               v-bind:model="dialog2.model"
               v-bind:rules="dialog2.rules">
        <el-form-item prop="PickUpCode">
          <template slot="label">
            <span>物流单号</span>
            <span>：</span>
          </template>
          <el-input v-model="dialog2.model.PickUpCode"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="text-center">
        <el-button style="min-width: 120px;"
                   type="primary"
                   v-on:click="editPickUpCodeAgain">确定</el-button>
        <el-button style="min-width: 120px;"
                   v-on:click="closeDialog2">取消</el-button>
      </div>
    </PeaceDialog>
  </div>
</template>


<script>
import Service from './service'

export default {
  props: {
    model: Object
  },

  data() {
    return {
      dialog: {
        visible: false,
        logisticsType: 'logisticsCompany',
        data: {},
        model: {
          ExpressName: '',
          PickUpCode: '',
          CourierName: '',
          CourierPhone: ''
        },
        rules: {
          ExpressName: [{ required: true, message: '请输入物流公司名称', trigger: 'change' }],
          PickUpCode: [{ required: true, message: '请输入物流单号', trigger: 'change' }],
          CourierName: [{ required: true, message: '请输入配送人姓名', trigger: 'change' }],
          CourierPhone: [{ required: true, message: '请输入联系电话', trigger: 'change' }]
        }
      },

      dialog2: {
        visible: false,
        data: {},
        model: {
          ExpressName: '',
          PickUpCode: '',
          CourierName: '',
          CourierPhone: ''
        },
        rules: {
          PickUpCode: [{ required: true, message: '请输入物流单号', trigger: 'change' }]
        }
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

  methods: {
    // 是否显示【接单】
    canShowReceiveOrder() {
      const OrderStatusValue = this.source.OrderStatus.find((item) => item.label === '等待接单')?.value?.toString()

      return this.model.OrderStatus?.toString() === OrderStatusValue
    },

    // 是否显示【备药】
    canShowPrepareMedicine() {
      const ShippingMethodValue = this.source.ShippingMethod.find((item) => item.label === '自提订单')?.value?.toString()
      const OrderStatusValue = this.source.OrderStatus.find((item) => item.label === '已接单')?.value?.toString()

      return this.model.ShippingMethod?.toString() === ShippingMethodValue && this.model.OrderStatus?.toString() === OrderStatusValue
    },

    // 是否显示【发药】
    canShowDispensingMedicine() {
      const ShippingMethodValue = this.source.ShippingMethod.find((item) => item.label === '自提订单')?.value?.toString()
      const OrderStatusValue = this.source.OrderStatus.find((item) => item.label === '已备药')?.value?.toString()

      return this.model.ShippingMethod?.toString() === ShippingMethodValue && this.model.OrderStatus?.toString() === OrderStatusValue
    },

    // 是否显示【确认发货】
    canShowConfirmDelivery() {
      const ShippingMethodValue = this.source.ShippingMethod.find((item) => item.label === '配送订单')?.value?.toString()
      const OrderStatusValue = this.source.OrderStatus.find((item) => item.label === '已接单')?.value?.toString()

      return this.model.ShippingMethod?.toString() === ShippingMethodValue && this.model.OrderStatus?.toString() === OrderStatusValue
    },

    // 是否显示【已签收】
    canShowConfirmReceipt() {
      const ShippingMethodValue = this.source.ShippingMethod.find((item) => item.label === '配送订单')?.value?.toString()
      const OrderStatusValue = this.source.OrderStatus.find((item) => item.label === '已发货')?.value?.toString()
      const CourierName = this.model.CourierName
      const CourierPhone = this.model.CourierPhone

      return (
        this.model.ShippingMethod?.toString() === ShippingMethodValue && this.model.OrderStatus?.toString() === OrderStatusValue && CourierName && CourierPhone
      )
    },

    // 是否显示【修改单号】
    canShowEditPickUpCode() {
      const ShippingMethodValue = this.source.ShippingMethod.find((item) => item.label === '配送订单')?.value?.toString()
      const OrderStatusValue = this.source.OrderStatus.find((item) => item.label === '已发货')?.value?.toString()
      const ExpressName = this.model.ExpressName
      const PickUpCode = this.model.PickUpCode

      return (
        this.model.ShippingMethod?.toString() === ShippingMethodValue && this.model.OrderStatus?.toString() === OrderStatusValue && ExpressName && PickUpCode
      )
    },

    // 接单
    // DATA - FLOW
    // 等待接单 => 已接单
    receiveOrder() {
      this.$confirm('是否确认接单？', ' ', {
        center: true,
        showClose: false,
        closeOnClickModal: false,
        customClass: 'el-message-box-text el-message-box-no-header',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            Id: this.model.Id,
            OrderStatus: this.source.OrderStatus.find((item) => item.label === '已接单')?.value?.toString()
          }

          Service.UpdateOrderStatus(params).then((res) => {
            Peace.util.success('成功')

            this.$emit('success', res)
          })
        })
        .catch(() => {})
    },

    // 备药
    // DATA - FLOW
    // 已接单 => 已备药
    prepareMedicine() {
      this.$confirm('确定备货后将通知客户前来取货，是否确认已备货？', ' ', {
        center: true,
        showClose: false,
        closeOnClickModal: false,
        customClass: 'el-message-box-text el-message-box-no-header',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            Id: this.model.Id,
            OrderStatus: this.source.OrderStatus.find((item) => item.label === '已备药')?.value?.toString()
          }

          Service.UpdateOrderStatus(params).then((res) => {
            Peace.util.success('成功')

            this.$emit('success', res)
          })
        })
        .catch(() => {})
    },

    // 发药
    // DATA - FLOW
    // 已备药 => 已自提
    dispensingMedicine() {
      // 自提订单，发药提醒
      this.$confirm('是否确认客户已自提？', ' ', {
        center: true,
        showClose: false,
        closeOnClickModal: false,
        customClass: 'el-message-box-text el-message-box-no-header',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            Id: this.model.Id,
            OrderStatus: this.source.OrderStatus.find((item) => item.label === '已自提')?.value?.toString()
          }

          Service.UpdateOrderStatus(params).then((res) => {
            Peace.util.success('成功')

            this.$emit('success', res)
          })
        })
        .catch(() => {})
    },

    // 确认发货
    // DATA - FLOW
    // 已接单 => 已发货
    confirmDelivery() {
      this.resetDialogModel()

      this.dialog.data = this.model
      this.dialog.visible = true
    },

    // 弹框确认发货
    // DATA - FLOW
    // 已接单 => 已发货
    confirmDeliveryAgain() {
      this.$refs.form.validate().then(() => {
        const params = {
          Id: this.dialog.data.Id,
          OrderStatus: this.source.OrderStatus.find((item) => item.label === '已发货')?.value?.toString(),
          ExpressName: this.dialog.model.ExpressName,
          PickUpCode: this.dialog.model.PickUpCode,
          CourierName: this.dialog.model.CourierName,
          CourierPhone: this.dialog.model.CourierPhone
        }

        Service.UpdateOrderStatus(params).then((res) => {
          Peace.util.success('成功')

          this.closeDialog()

          this.$emit('success', res)
        })
      })
    },

    // 修改快递单号
    // DATA - FLOW
    // 已发货 => 已发货
    editPickUpCode() {
      this.resetDialog2Model()

      this.dialog2.data = this.model
      this.dialog2.model.PickUpCode = this.model.PickUpCode
      this.dialog2.visible = true
    },

    // 弹框确认修改快递单号
    // DATA - FLOW
    // 已发货 => 已发货
    editPickUpCodeAgain() {
      this.$refs.form.validate().then(() => {
        const params = {
          Id: this.dialog2.data.Id,
          ExpressName: this.dialog2.data.ExpressName,
          // 只允许修改单号，单号从 model 获取
          PickUpCode: this.dialog2.model.PickUpCode,
          CourierName: this.dialog2.data.CourierName,
          CourierPhone: this.dialog2.data.CourierPhone
        }

        Service.UpdateOrderExpressInfo(params).then((res) => {
          Peace.util.success('成功')

          this.closeDialog2()

          this.$emit('success', res)
        })
      })
    },

    // 已签收
    // DATA - FLOW
    // 已发货 => 已签收
    confirmReceipt() {
      this.$confirm('是否确认已签收？', ' ', {
        center: true,
        showClose: false,
        closeOnClickModal: false,
        customClass: 'el-message-box-text el-message-box-no-header',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            Id: this.model.Id,
            OrderStatus: this.source.OrderStatus.find((item) => item.label === '已签收')?.value?.toString()
          }

          Service.UpdateOrderStatus(params).then((res) => {
            Peace.util.success('成功')

            this.$emit('success', res)
          })
        })
        .catch(() => {})
    },

    // 修改配送方式
    changeLogisticsType() {
      this.$refs.form.clearValidate()

      this.resetDialogModel()
    },

    resetDialogModel() {
      this.dialog.model = {
        ExpressName: '',
        PickUpCode: '',
        CourierName: '',
        CourierPhone: ''
      }
    },

    resetDialog2Model() {
      this.dialog2.model = {
        PickUpCode: ''
      }
    },

    closeDialog() {
      this.dialog.visible = false
    },

    closeDialog2() {
      this.dialog2.visible = false
    }
  }
}
</script>

<style>
</style>