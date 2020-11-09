<template>
  <div class="bg-white q-pa-lg">

    <div class="item-content">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">云仓信息</p>
      </div>
      <div v-if="!warehouseInfo.Id">
        <p class="noInfo">您还未创建云仓~</p>
      </div>
      <template v-else>
        <div class="item-child">
          <p class="child-key">云仓名称</p>
          <p>：</p>
          <p class="child-value">{{warehouseInfo.Name}}</p>
        </div>
        <div class="item-child">
          <p class="child-key">系统名称</p>
          <p>：</p>
          <p class="child-value">{{currentSystemForm.Name}}</p>
        </div>
        <div class="item-child"
             v-for="item in currentSystemForm.item"
             :key="item.Label">
          <p class="child-key">{{item.Label}}</p>
          <p>：</p>
          <p class="child-value">{{warehouseInfo[item.Name]}}</p>
        </div>
      </template>
    </div>
    <div class="line"></div>
    <div class="item-content">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">机构开户信息</p>
      </div>
      <p class="noInfo"
         v-if="warehouseInfo.PrentCustList && warehouseInfo.PrentCustList.length === 0">暂无机构开户信息</p>
      <OrgList v-bind:prentCustList="warehouseInfo.PrentCustList"
               v-bind:orgDict="orgDict"
               v-bind:systemCode="warehouseInfo.SystemCode"></OrgList>
    </div>
  </div>

</template>

<script>
import Service from '../service/index'
import OrgList from './OrgList'
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
    OrgList
  },

  data() {
    return {
      // 云仓详情
      warehouseInfo: {
        Id: '', // 云仓唯一标识
        Name: '', // 名称
        SystemCode: '', // 系统编码
        Type: '', // 系统类型 0 ERP  2 九州云仓
        CodeIn3PartPlatform: '', // 物流中心ID  / branchid
        IDIn3PartPlatform: '', // 运营方ID
        PrentCustList: [] // 机构数据信息
      },
      // 云仓-系统 字典 （返回表单配置）
      systemDict: [],
      // 云仓-系统 对应机构 字典（返回表单配置）
      orgDict: [],
      // 当前云仓使用的表单配置
      currentSystemForm: {
        Code: '',
        Name: '',
        Type: '',
        item: []
      }
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
        this.systemDict = res.data.CloudStructure
        this.orgDict = res.data.CustomerStructure
        if (res.data.GetCustIn3PartRes !== null) {
          this.warehouseInfo = res.data.GetCustIn3PartRes

          // 根据当前系统取对应配置
          this.currentSystemForm = this.systemDict.find((item) => item.SystemCode === this.warehouseInfo.SystemCode)
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
