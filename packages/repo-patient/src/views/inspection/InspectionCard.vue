<template>
  <div class="inspection">
    <div class="header">检验单</div>
    <div class="content">
      <div class="item"
           v-for="(item,index) in list"
           v-bind:key="index">
        <span>{{item.itemName}}</span>
        <peace-price v-bind:price="item.itemPrice"
                     v-bind:transformOrigin="'right'"></peace-price>
      </div>
      <div class="item">
        <span></span>
        <span> <span style="margin-right:-24px;">合计：</span>
          <peace-price class="money"
                       v-bind:price="totalPrice"
                       v-bind:transformOrigin="'right'"></peace-price>
        </span>
      </div>
    </div>
    <template v-if="showFooter">
      <div class="footer before"
           v-if="!orderNo">完成挂号缴费后，可支付检查项目</div>
      <div class="footer"
           v-on:click="goToInspectionPage"
           v-else>
        立即查看 >
      </div>
    </template>

  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'InspectionCard',
  props: {
    list: Array,
    totalPrice: String,
    orderNo: String,
    orderId: String,
    showFooter: Boolean
  },
  methods: {
    goToInspectionPage() {
      const json = peace.util.encode({ orderId: this.orderId })
      if (this.orderNo) {
        this.gotoOrderDetail(json)
      } else {
        this.gotoOrderBefore(json)
      }
    },
    gotoOrderBefore(json) {
      this.$router.push(`/inspectionBeforeDetail/${json}`)
    },
    gotoOrderDetail(json) {
      this.$router.push(`/inspectionDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.inspection {
  background: #ffffff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 0 16px;
  .header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    padding-top: 12px;
    margin-bottom: 14px;
  }
  .content {
    padding-bottom: 1px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 24px;
    margin-bottom: 12px;
    &:first-child {
      margin-bottom: 8px;
    }
    &:last-child {
      margin-bottom: 11px;
    }
    > span {
      &:first-child {
        max-width: 230px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .money {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .footer {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #00ccb3;
    line-height: 22px;
    padding: 8px 0;
    border-top: 1px dashed #ddd;
    text-align: center;
    &.before {
      font-size: 12px;
      color: #ff3a30;
      line-height: 17px;
      border-top: 0;
      margin-top: -8px;
      text-align: right;
      padding-bottom: 12px;
      padding-top: 0;
    }
  }
}
</style>