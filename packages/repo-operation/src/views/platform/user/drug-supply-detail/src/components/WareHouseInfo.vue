<template>
  <div class="bg-white q-pa-lg">
    <div class="item-content">
      <h2 class="cust-Name ">{{warehoseInfo.CustName}}</h2>
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

</template>

<script>
import Service from '../service/index'
import AccountDetail from './AccountDetail'
export default {
  name: 'WareHouseInfo',
  props: {
    data: {
      type: Object,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'custcode')
      }
    }
  },
  components: {
    AccountDetail
  },

  data() {
    return {
      warehoseInfo: {}
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      Service.getDetail({ code: this.data.custcode }).then((res) => {
        if (res.data.list !== null) {
          this.warehoseInfo = res.data.list
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
