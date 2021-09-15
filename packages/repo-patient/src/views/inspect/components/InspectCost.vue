<template>
  <div class="inspection">
    <div v-for="(item,index) in inspect"
         v-bind:key="index">
      <div class="content">
        <div class="item">
          <span>{{item.comboName}}</span>
          <peace-price v-bind:price="sumComboPrice(item.itemList)"
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
  },
  methods: {
    sumComboPrice(itemList) {
      let sum = 0
      if (itemList && itemList.length > 0) {
        sum = itemList.reduce((sum, cur) => {
          return Number(sum) + Number(cur.itemPrice)
        }, 0)
      }
      return sum
    }
  }
}
</script>

<style lang="scss" scoped>
.inspection {
  background: #ffffff;
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
    &:last-child {
      margin-bottom: 0;
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