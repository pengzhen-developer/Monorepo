<template>
  <!-- 订单统计 -->
  <div class="order-mess">
    <div class="order-item"
         v-bind:class="clickOrderCount?'pointer':'default'"
         v-on:click="clickOrderCount && goOrderList(0)">
      <p class="item-num">{{data.OrderCount}}</p>
      <p class="item-tit">订单总量</p>
    </div>
    <div class="order-item"
         v-bind:class="clickOrderCount?'pointer':'default'"
         v-on:click="clickCancelCount && goOrderList(1)">
      <p class="item-num">{{data.CancelCount}}</p>
      <p class="item-tit">已取消</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderStatistic',
  inject: ['provideAddTab', 'provideGetTab'],
  props: {
    data: Object,
    name: String
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    addTab() {
      return this.provideAddTab
    },

    getTab() {
      return this.provideGetTab
    },

    clickOrderCount() {
      return this.data.OrderCount > 0
    },
    clickCancelCount() {
      return this.data.CancelCount > 0
    }
  },
  created() {},
  methods: {
    goOrderList(type) {
      const tab = this.getTab('订单明细')
      tab.menuPath = tab.menuPath + `?name=${this.name}&type=${type}`
      this.addTab(tab)
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.order-mess {
  padding: 0 14px;
  display: flex;
  flex-direction: row;
}
.order-item {
  margin-right: 19px;
  background: rgba(48, 153, 166, 0.06);
  border-radius: 4px;
  width: 200px;
  padding: 28px 10px 32px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pointer {
  cursor: pointer;
}
.default {
  cursor: default;
}
.item-num {
  font-size: 34px;
  font-weight: 800;
  line-height: 48px;
  color: #3099a6;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}
.item-tit {
  height: 22px;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.85);
}
</style>
