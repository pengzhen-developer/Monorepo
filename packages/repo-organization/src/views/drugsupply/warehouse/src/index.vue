<template>
  <div class="q-pa-lg  bg-white">
    <div class="item-content">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">云仓信息</p>
      </div>
      <div v-if="!ishasWare">
        <el-button type="primary"
                   icon="el-icon-plus"
                   v-on:click="bulidWarehouse">新增云仓</el-button>
        <p class="noInfo">您还未创建云仓，赶紧新建一个吧~</p>
      </div>
      <div v-else>
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
    </div>
    <div class="line"></div>
    <div class="item-content">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">机构开户信息</p>
      </div>
      <div v-if="ishasWare">
        <el-button type="primary"
                   icon="el-icon-plus"
                   v-on:click="bulidOrgan">新增开户机构</el-button>
      </div>
      <p class="noInfo"
         v-if="!ishasOrgan">暂无机构开户信息</p>
      <AccountDetail v-bind:prentCustList="warehoseInfo.PrentCustList"
                     v-on:on-updateOrgan="updateOrgan"></AccountDetail>
      <el-dialog v-if="wareVisible"
                 width="470px"
                 v-bind:visible.sync="wareVisible"
                 title="新建云仓">
        <AddWarehouse v-on:onCloseWare="oncloseWare"></AddWarehouse>
      </el-dialog>
      <el-dialog v-if="oragnVisible"
                 width="516px"
                 v-bind:visible.sync="oragnVisible"
                 title="新增机构">
        <AddOrgan v-on:onCloseOrgan="oncloseOrgan"
                  v-bind:data="custItem"></AddOrgan>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//import Peace from '@src/library'
import Service from './service'

import AccountDetail from './components/AccountDetail'
import AddWarehouse from './components/AddWarehouse'
import AddOrgan from './components/AddOrgan'

export default {
  name: 'Warehouse',
  components: {
    AccountDetail,
    AddWarehouse,
    AddOrgan
  },

  data() {
    return {
      oragnVisible: false,
      wareVisible: false,
      ishasOrgan: false,
      ishasWare: false,
      warehoseInfo: {},
      custItem: {
        Code: '',
        CodeIn3PartPlatform: '',
        Effective: '',
        IDIn3PartPlatform: '',
        Id: 0,
        Name: '',
        Type: 1,
        PrentId: ''
      }
    }
  },

  created() {
    this.getInfo()
  },

  computed: {},

  methods: {
    getInfo() {
      Service.getInfo().then((res) => {
        if (res.data.list !== null) {
          this.ishasWare = true
          this.warehoseInfo = res.data.list
          this.ishasOrgan = res.data.list.PrentCustList.length > 0 ? true : false
          this.custItem.PrentId = res.data.list.Id
        }
      })
    },
    bulidWarehouse() {
      this.wareVisible = true
    },
    bulidOrgan() {
      this.oragnVisible = true
    },
    oncloseWare() {
      this.wareVisible = false
      this.getInfo()
    },
    oncloseOrgan() {
      this.oragnVisible = false
      this.getInfo()
    },
    updateOrgan() {
      this.getInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 9px 16px !important;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
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
.noInfo {
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
  margin-top: 10px;
}
.line {
  width: 100%;
  margin: 30px 0 20px 0;
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