<template>
  <div class="row q-gutter-md q-mb-20">
    <div class="col"
         v-if="canShowcard('DASHBOARD_A')"
         v-on:click="gotoPage('DASHBOARD_A',{})">
      <div class="card-style">
        <div class="card-title">未审处方</div>
        <div class="uncheckNum">{{data.uncheckedCount}}</div>
      </div>
    </div>
    <div class="col"
         v-if="canShowcard('DASHBOARD_B')"
         v-on:click="gotoPage('DASHBOARD_B',{})">
      <div class="card-style">
        <div class="card-title">已审处方</div>
        <div class="checkedNum">{{data.checkedCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Observable from '@src/layouts/side/src/observable/index'
import Util from '@src/util'

export default {
  props: {
    data: {
      type: Object
    },
    controlledMenuList: {
      type: Array
    }
  },

  methods: {
    canShowcard(controlledSign) {
      return Util.control.canShowcard(controlledSign, this.controlledMenuList)
    },
    async gotoPage(controlledSign) {
      const accountMenu = await Peace.identity.auth.getAccountMenu()
      const controlledItem = this.controlledMenuList?.find((menu) => menu.controlledSign == controlledSign)
      const menu = Peace.util.deepClone(accountMenu.find((item) => item.id == controlledItem.menuId))

      Observable.mutations.addTab(menu)
      Observable.mutations.setTab(menu)
    }
  }
}
</script>

<style scoped>
.col {
  cursor: pointer;
}
.card-style {
  height: 72px;
  background: #ffffff;
  padding: 0 32px 0 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.card-title:before {
  content: '';
  display: inline-block;
  position: relative;
  top: 3px;
  margin-right: 10px;
  width: 4px;
  height: 16px;
  background: rgba(48, 153, 166, 1);
  border-radius: 2px;
}
.card-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
}
.uncheckNum {
  height: 32px;
  font-size: 28px;
  font-weight: bold;
  color: #06c3a2;
  line-height: 32px;
}
.checkedNum {
  height: 32px;
  font-size: 28px;
  font-weight: bold;
  color: #1391ff;
  line-height: 32px;
}
</style>