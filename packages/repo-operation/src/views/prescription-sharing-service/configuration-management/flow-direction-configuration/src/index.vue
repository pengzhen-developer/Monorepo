<template>
  <div class="layout-route">
    <!-- 返回列表 -->
    <div class="q-mb-lg"
         v-if="displayView === '编辑' || displayView === '详情'">
      <el-button type="primary"
                 plain
                 v-on:click="back">
        <div>
          <i class="el-icon-arrow-left"></i>
          <span>返回上一页</span>
        </div>
      </el-button>
    </div>

    <template v-if="displayView === '列表'">
      <!-- 药品流向列表 -->
      <DrugFlowList v-on:on-edit="goEdit"
                    v-on:on-preview="goPreview"></DrugFlowList>
    </template>

    <template v-if="displayView === '编辑'">
      <!-- 编辑药品流向 -->
      <DrugFlowEditor v-bind:custName="custName"
                      v-bind:pharmacyRule.sync="pharmacyRule"
                      v-bind:pharmacyConf.sync="pharmacyConf"
                      v-bind:data.sync="data"></DrugFlowEditor>

      <q-separator class="q-my-xl bg-primary"></q-separator>

      <!-- 预览药品流向 -->
      <DrugFlowView v-bind:custName="custName"
                    v-bind:pharmacyRule="pharmacyRule"
                    v-bind:pharmacyConf="pharmacyConf"
                    v-bind:data="data"></DrugFlowView>

      <div class="text-center">
        <el-button type="primary"
                   v-on:click="save">
          <div class="q-py-xs q-px-xl">保存</div>
        </el-button>

        <el-button v-on:click="back">
          <div class="q-py-xs q-px-xl">取消</div>
        </el-button>
      </div>
    </template>

    <template v-if="displayView === '详情'">
      <!-- 预览药品流向 -->
      <DrugFlowView v-bind:custName="custName"
                    v-bind:pharmacyRule="pharmacyRule"
                    v-bind:pharmacyConf="pharmacyConf"
                    v-bind:data="data"></DrugFlowView>
    </template>
  </div>
</template>

<script>
import Service from './service'

import CONSTANT from './../constant'
import DrugFlowList from './components/DrugFlowList'
import DrugFlowEditor from './components/DrugFlowEditor'
import DrugFlowView from './components/DrugFlowView'

import { IPharmacyRuleModel, IPharmacyConfModel } from './model/IPharmacyModel'

export default {
  provide() {
    return {
      provideStoreList: () => this.storeList,
      provideCloudStoreList: () => this.cloudStoreList,

      provideCustCode: () => this.custCode,
      provideCustName: () => this.custName,
      provideGetStoreList: () => this.getStore,
      provideGetCloudStoreList: () => this.getCloudStore
    }
  },

  components: {
    DrugFlowList,
    DrugFlowEditor,
    DrugFlowView
  },

  data() {
    return {
      CONSTANT,

      displayView: CONSTANT.DISPLAY_VIEW.列表,

      custCode: '',
      custName: '',

      storeList: [],
      cloudStoreList: [],

      pharmacyRule: new IPharmacyRuleModel(),
      pharmacyConf: new IPharmacyConfModel(),
      data: []
    }
  },

  created() {},

  methods: {
    getStore() {
      return Service.SimpleStoreList2().then((res) => {
        const formatData = []

        res.data.list.forEach((item) => {
          item.label = item.Name
          item.value = item.DrugStoreKeyId

          if (item.SimpleStoreSon) {
            item.SimpleStoreSon.forEach((item) => {
              item.label = item.SonName + ` (${item.Address})`
              item.value = item.DrugStoreKeyId
            })

            item.children = item.SimpleStoreSon
          }

          formatData.push(item)
        })

        this.storeList = formatData
      })
    },

    getCloudStore() {
      const params = {
        custCode: this.custCode
      }

      return Service.CloudStoreList(params).then((res) => {
        this.cloudStoreList = res.data.list
      })
    },

    back() {
      // 重置数据
      this.storeList = []
      this.cloudStoreList = []

      this.pharmacyRule = new IPharmacyRuleModel()
      this.pharmacyConf = new IPharmacyConfModel()
      this.data = []

      this.displayView = CONSTANT.DISPLAY_VIEW.列表
    },

    save() {
      const cloneData = Peace.util.deepClone(this.data)
      const params = cloneData.filter((item) => item.RuleFlag === this.pharmacyRule.RuleFlag)

      params.forEach((item) => {
        item.CustCode = item.CustCode || this.custCode
        item.DisplayImg = item.DisplayImg && item.DisplayImg.split('?')[0]
      })

      Service.save(params).then(() => {
        this.back()
      })
    },

    goEdit(custCode, custName) {
      this.custCode = custCode
      this.custName = custName
      this.displayView = CONSTANT.DISPLAY_VIEW.编辑

      this.getStore()
      this.getCloudStore()

      Service.getDetail({ custCode: custCode }).then((res) => {
        this.pharmacyRule.RuleFlag = res.data.RuleFlag
        this.data = res.data.List
      })
    },

    goPreview(custCode, custName) {
      this.custCode = custCode
      this.custName = custName
      this.displayView = CONSTANT.DISPLAY_VIEW.详情

      this.getStore()
      this.getCloudStore()

      Service.getDetail({ custCode: custCode }).then((res) => {
        this.pharmacyRule.RuleFlag = res.data.RuleFlag
        this.data = res.data.List
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px 0 0;

  &.primary {
    background: #e4e4e4;
  }
  &.info {
    background: var(--q-color-warning);
  }
  &.success {
    background: var(--q-color-primary);
  }
  &.danger {
    background: var(--q-color-negative);
  }
}
</style>