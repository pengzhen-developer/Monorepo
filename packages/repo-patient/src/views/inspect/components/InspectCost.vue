<template>
  <div class="inspection">
    <div v-for="(item,index) in inspect"
         v-bind:key="index">
      <div class="header">{{item.comboName}}</div>
      <div class="content">
        <div class="item"
             v-for="(sitem, sindex) in item.itemList"
             v-bind:key="sindex">
          <span>{{sitem.itemName}}</span>
          <peace-price v-bind:price="sitem.itemPrice"
                       v-bind:transformOrigin="'right'"></peace-price>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectCost',
  props: {
    inspect: {
      type: Array,
      default() {
        return []
      }
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
}
</style>