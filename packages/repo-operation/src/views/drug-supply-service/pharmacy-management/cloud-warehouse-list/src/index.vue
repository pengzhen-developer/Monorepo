<template>
  <div class="flex full-width">
    <div class="layout-route full-width">
      <!-- 云仓详情 -->
      <div v-if="visible"
           class="bg-white full-height q-pa-32">
        <el-button type="primary"
                   plain
                   class="q-mb-lg"
                   v-on:click="back"
                   style="margin-bottom:24px">
          <div>
            <i class="el-icon-arrow-left"></i>
            <span>返回上一页</span>
          </div>
        </el-button>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息"
                       name="base"
                       class="q-px-32 q-py-10">
            <div class="item-content">
              <div class="item-title">
                <div class="title-left"></div>
                <p class="title">云仓信息</p>
              </div>
              <div class="item-wrap">
                <div class="item-child item-block">
                  <div class="child-key">云仓名称：</div>
                  <div class="child-value">{{warehouseInfo.Name}}</div>
                </div>
                <div class="item-child item-inline">
                  <div class="child-key">云仓系统：</div>
                  <div class="child-value">{{currentSystemForm.Name}}</div>
                </div>
                <div class="item-child item-inline"
                     v-for="item in currentSystemForm.item"
                     :key="item.Label">
                  <div class="child-key">{{item.Label}}：</div>
                  <div class="child-value">{{warehouseInfo[item.Name]}}</div>
                </div>
              </div>
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
          </el-tab-pane>
          <el-tab-pane label="运营信息"
                       name="operate"
                       class="q-px-32 q-py-10">
            <div class="item-title">
              <div class="title-left"></div>
              <p class="title">取药知情同意书</p>
            </div>
            <div style="white-space:pre;"
                 v-html="operationInfo.InformedConsent"></div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <template v-else>
        <!-- 云仓列表 -->
        <WarehouseList v-on:onShowDetail="goDetail"></WarehouseList>
      </template>

    </div>
  </div>
</template>

<script>
import Service from './service/index'
import WarehouseList from './components/WarehouseList'
import OrgList from './components/OrgList'

export default {
  name: 'CloudWarehouseList',
  components: {
    WarehouseList,
    OrgList
  },

  data() {
    return {
      activeName: 'base',
      visible: false,
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
      operationInfo: {
        InformedConsent: '' //取药知情同意书
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

  created() {},

  methods: {
    goDetail(code) {
      this.visible = true
      Service.getDetail({ Code: code }).then((res) => {
        this.systemDict = res.data.CloudStructure
        this.orgDict = res.data.CustomerStructure
        if (res.data.GetCustIn3PartRes !== null) {
          this.warehouseInfo = res.data.GetCustIn3PartRes
          this.operationInfo = res.data.OperationInfo
          // 根据当前系统取对应配置
          this.currentSystemForm = this.systemDict.find((item) => item.SystemCode === this.warehouseInfo.SystemCode)
        }
      })
    },
    back() {
      this.visible = false
      this.warehouseInfo = {}
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
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
  color: #333333;
  line-height: 24px;
  margin-left: 10px;
  height: 24px;
  font-size: 16px;
}
.noInfo {
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding: 10px 0 20px 0;
}
.line {
  width: 100%;
  margin: 4px 0 20px 0;
  height: 1px;
  background: #e9e9e9;
}

.item-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 50%;
}

.item-child {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding-right: 16px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
  &.item-block {
    width: 100%;
  }
  &.item-inline {
    width: 50%;
  }
}

.item-child:last-child {
  margin-bottom: 0;
}
.child-key {
  flex: none;
  width: auto;
  margin-right: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
.child-value {
  flex: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  word-break: break-all;
  word-wrap: break-word;
}
</style>