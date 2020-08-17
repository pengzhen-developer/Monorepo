<template>
  <div class="layout-route">
    <!-- 云仓详情 -->
    <div v-if="visible"
         class="bg-white full-height q-pa-lg">
      <el-button type="primary"
                 class="q-mb-lg"
                 v-on:click="back"
                 style="margin-bottom:24px">
        <div class="q-px-md q-py-sm">
          <i class="el-icon-arrow-left"></i>
          <span>返回上一页</span>
        </div>
      </el-button>
      <div class="item-content">
        <div class="item-title">
          <div class="title-left"></div>
          <p class="title">云仓信息</p>
        </div>
        <div class="item-child">
          <p class="child-key">云仓名称</p>
          <p>：</p>
          <p class="child-value">{{warehoseInfo.Name}}</p>
        </div>
        <div class="item-child">
          <p class="child-key">branchid</p>
          <p>：</p>
          <p class="child-value">{{warehoseInfo.BranchId}}</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="item-content">
        <div class="item-title">
          <div class="title-left"></div>
          <p class="title">机构开户信息</p>
        </div>
        <AccountDetail v-bind:prentCustList="warehoseInfo.PrentCustList"></AccountDetail>
      </div>
    </div>

    <template v-else>
      <!-- 云仓列表 -->
      <WarehouseList v-on:onShowDetail="goDetail"></WarehouseList>
    </template>

  </div>
</template>

<script>
import Service from './service/index'
import WarehouseList from './components/WarehouseList'
import AccountDetail from './components/AccountDetail'

export default {
  name: 'Warehouse',
  components: {
    WarehouseList,
    AccountDetail
  },

  data() {
    return {
      visible: false,
      warehoseInfo: {}
    }
  },

  created() {},

  methods: {
    goDetail(code) {
      this.visible = true
      Service.getDetail({ code: code }).then((res) => {
        this.warehoseInfo = res.data.list
      })
    },
    back() {
      this.visible = false
      this.warehoseInfo = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.q-pa-lg {
  padding: 30px;
}
p {
  margin: 0;
  padding: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 1px 4px !important;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px 2px 0px 2px;
}
.title {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  margin-left: 10px;
  height: 24px;
  font-size: 16px;
}
.line {
  width: 100%;
  margin: 30px 0 30px 0;
  height: 1px;
  background: #e9e9e9;
}
.item-child {
  margin-bottom: 20px;
  display: flex;
}
.item-child:last-child {
  margin-bottom: 0;
}
.child-key {
  width: 4em;
  font-size: 14px;
  color: var(--q-color-grey-333);
  text-align: justify;
  text-align-last: justify;
}
.child-value {
  font-size: 14px;
  color: var(--q-color-grey-666);
}
</style>