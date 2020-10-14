<template>
  <div class=" flex full-width">
    <div class="layout-route full-width">
      <div class="bg-white full-height q-pa-lg">
        <h2 class="cust-Name">{{list.CustName}}</h2>
        <!-- 流向配置 -->
        <div>
          <div class="item-title">
            <div class="title-left"></div>
            <p class="title">流向配置</p>
          </div>
          <div class="no-dispose"
               v-if="visible">
            <img src="./assets/image/noSet.png" />
            <p>尚未配置</p>
          </div>
          <div v-else>
            <DrugFlowView v-bind:data="list.confLists"
                          v-bind:type="list.TypeStr"></DrugFlowView>
          </div>
        </div>
        <!-- 订单统计 -->
        <div>
          <div class="item-title">
            <div class="title-left"></div>
            <p class="title">订单统计</p>
          </div>
          <OrderStatistic v-bind:data="list.orderStatistics"
                          v-bind:name="list.CustName"></OrderStatistic>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatistic from './components/OrderStatistic'
import DrugFlowView from './components/DrugFlowView'

import Service from './service/index'
export default {
  components: {
    OrderStatistic,
    DrugFlowView
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  data() {
    return {
      list: {
        CustName: '',
        confLists: [],
        TypeStr: '',
        orderStatistics: {}
      },
      visible: true
    }
  },

  computed: {},

  methods: {
    fetch() {
      const Code = Peace.cache.sessionStorage.get('10533-custcode')
      Service.HosConfigDatas({ Code: Code }).then((res) => {
        this.list = res.data.list
        if (res.data.list.confLists !== null) {
          this.visible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.cust-Name {
  margin: 0;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #333333;
  text-align: center;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.title-left {
  width: 4px;
  height: 18px;
  background: #3099a6;
  border-radius: 2px 2px 0px 2px;
}
.title {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
  margin-left: 10px;
  height: 28px;
  font-size: 20px;
}
.no-dispose {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px 0;
}
.no-dispose p {
  margin-top: 11px;
  line-height: 24px;
  color: rgba(137, 137, 137, 0.85);
  font-size: 18px;
}
</style>
