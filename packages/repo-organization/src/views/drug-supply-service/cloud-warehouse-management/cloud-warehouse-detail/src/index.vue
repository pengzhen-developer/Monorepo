<template>
  <div class="flex full-width">
    <div class="layout-route full-width"
         v-loading="loading">
      <div class="bg-white full-height q-pt-16 q-pb-32">

        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="基础信息"
                       name="base"
                       class="q-px-32 q-py-10">
            <div class="item-content">
              <div class="item-title">
                <div class="title-left"></div>
                <p class="title">云仓信息</p>
              </div>
              <div v-if="!isHasWare">
                <el-button type="primary"
                           icon="el-icon-plus"
                           v-on:click="wareVisible = true">新增云仓</el-button>
                <p class="noInfo">您还未创建云仓，赶紧新建一个吧~</p>
              </div>
              <div v-else>
                <div class="item-child">
                  <p class="child-key">云仓名称</p>
                  <p>：</p>
                  <p class="child-value">{{warehouseInfo.Name}}</p>
                  <el-image :src="require('./assets/img/zyy-icon-xiugai.png')"
                            v-on:click="wareVisible = true"></el-image>
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
              </div>
            </div>
            <div class="line"></div>
            <div class="item-content">
              <div class="item-title">
                <div class="title-left"></div>
                <p class="title">机构开户信息</p>
              </div>
              <div v-if="isHasWare">
                <el-button type="primary"
                           icon="el-icon-plus"
                           v-on:click="orgVisible = true">新增开户机构</el-button>
              </div>
              <p class="noInfo"
                 v-if="!isHasOrg">暂无机构开户信息</p>
              <OrgList v-bind:prentCustList="warehouseInfo.PrentCustList"
                       v-bind:orgDict="orgDict"
                       v-bind:systemCode="warehouseInfo.SystemCode"
                       v-on:onUpdateOrgan="getInfo()"></OrgList>

            </div>
          </el-tab-pane>
          <el-tab-pane label="运营信息"
                       name="operate"
                       class="q-px-32 q-py-10">
            <div v-if="!isHasWare">
              <el-button type="primary"
                         icon="el-icon-plus"
                         v-on:click="wareVisible = true">新增云仓</el-button>
              <p class="noInfo">您还未创建云仓，赶紧新建一个吧~</p>
            </div>
            <div v-else>
              <div class="content-item q-mb-24">
                <!-- <div class="item-title">
                <div class="title-left"></div>
                <p class="title">取药知情同意书</p>
              </div> -->
                <el-input type="textarea"
                          style="width: 802px;"
                          rows="7"
                          maxlength="500"
                          show-word-limit
                          placeholder="请输入内容"
                          v-model="InformedConsent">
                </el-input>
              </div>
              <el-button type="primary"
                         v-on:click="saveInformed"
                         v-bind:loading="saveLoading">保存</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <PeaceDialog v-if="wareVisible"
                 width="400px"
                 v-bind:visible.sync="wareVisible"
                 :title="isHasWare?'修改云仓信息':'新建云仓'">
      <AddWarehouse v-on:onCloseWare="oncloseWare"
                    v-bind:data="warehouseInfo"
                    v-bind:config="systemDict"></AddWarehouse>
    </PeaceDialog>
    <PeaceDialog v-if="orgVisible"
                 width="516px"
                 v-bind:visible.sync="orgVisible"
                 title="新增机构">
      <AddOrgan v-on:onCloseOrgan="oncloseOrgan"
                v-bind:data="currentOrg"
                v-bind:systemCode="warehouseInfo.systemCode"
                v-bind:config="currentOrgForm"></AddOrgan>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'

import OrgList from './components/OrgList'
import AddWarehouse from './components/AddWarehouse'
import AddOrgan from './components/AddOrgan'

export default {
  name: 'CloudWarehouseDetail',
  components: {
    OrgList,
    AddWarehouse,
    AddOrgan
  },

  data() {
    return {
      loading: true,
      activeName: 'base',
      // 是否开通云仓
      isHasWare: false,
      // 是否有机构
      isHasOrg: false,
      // 是否显示云仓信息
      wareVisible: false,
      // 是否显示机构信息
      orgVisible: false,
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

      // 选中的机构
      currentOrg: {
        PrentId: '', // 云仓唯一标识
        Id: '', // 机构唯一标识
        Name: '', // 机构名称
        Code: '', // 机构编码
        IDIn3PartPlatform: '', // 内码 / 委托方ID
        Type: '', // 类型  1 erp   4 九州云仓
        CodeIn3PartPlatform: '', // 编码
        Effective: '' // 启用状态 1 已启用 0已禁用
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
      },
      // 当前机构使用的表单配置
      currentOrgForm: {
        Code: '',
        Name: '',
        Type: '',
        item: []
      },

      saveLoading: false,
      InformedConsent: '',
      operationInfo: {
        ID: '',
        CustID: '',
        InformedConsent: ''
      }
    }
  },

  created() {
    this.getInfo()
  },

  methods: {
    getInfo() {
      Service.getInfo()
        .then((res) => {
          this.systemDict = res.data.CloudStructure
          this.orgDict = res.data.CustomerStructure
          if (res.data.GetCustIn3PartRes !== null) {
            this.isHasWare = true
            this.warehouseInfo = res.data.GetCustIn3PartRes
            this.isHasOrg = res.data.GetCustIn3PartRes.PrentCustList.length > 0 ? true : false
            this.currentOrg.PrentId = res.data.GetCustIn3PartRes.Id

            this.operationInfo = res.data.OperationInfo
            this.InformedConsent = res.data.OperationInfo.InformedConsent || ''

            // 根据当前系统取对应配置
            this.currentSystemForm = this.systemDict.find((item) => item.SystemCode === this.warehouseInfo.SystemCode)
            this.currentOrgForm = this.orgDict.find((item) => item.SystemCode === this.warehouseInfo.SystemCode)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    oncloseWare() {
      this.wareVisible = false
      this.getInfo()
    },
    oncloseOrgan() {
      this.orgVisible = false
      this.getInfo()
    },
    handleClick() {
      if (this.activeName == 'operate') {
        this.InformedConsent = this.operationInfo.InformedConsent || ''
      }
    },
    saveInformed() {
      this.saveLoading = true

      let params = {
        InformedConsent: this.InformedConsent
      }
      Service.saveInformedConsentInfo(params)
        .then(() => {
          Peace.util.success('保存成功')
          this.getInfo()
        })
        .finally(() => {
          this.saveLoading = false
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
  align-items: center;
  .el-image {
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
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

::v-deep .el-textarea:not(.element-ui-default).el-input--mini .el-textarea__inner {
  padding: 16px;
}
</style>