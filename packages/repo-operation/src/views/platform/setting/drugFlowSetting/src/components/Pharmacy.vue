/** 药房（实体店） */

<template>
  <div class="relative-position">

    <el-checkbox v-bind:checked="pharmacyList.length > 0"
                 v-model="checked"
                 label="药店"> </el-checkbox>

    <div v-if="checked"
         class="absolute"
         style="top: 0px; left: 70px">
      <span class="cursor-pointer text-primary text-caption"
            v-on:click="showDialog">请选择</span>
    </div>

    <div v-if="pharmacyList.length"
         class="row q-col-gutter-x-md">
      <div class="q-my-md"
           style="max-width: 240px;"
           v-for="pharmacy in pharmacyList"
           v-bind:key="pharmacy.DisplayName">
        <q-card>
          <q-card-section style="min-height: 100px; min-width: 200px;"
                          class="bg-white">
            <el-image style="height: 100px; width: 100%;"
                      v-bind:src="pharmacy.DisplayImg"
                      v-bind:preview-src-list="[pharmacy.DisplayImg]">
            </el-image>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <span> {{ pharmacy.DisplayName }} </span>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <peace-dialog title="选择药店"
                  v-if="dialog.visible"
                  v-bind:visible.sync="dialog.visible">
      <el-tree style="height: 600px; overflow: auto;"
               class="q-mb-md"
               node-key="DrugStoreKeyId"
               ref="tree"
               show-checkbox
               v-bind:data="storeList"
               v-bind:default-checked-keys="checkList"
               v-bind:default-expand-all="false"
               v-bind:check-on-click-node="true"
               v-on:check-change="checkChange">
      </el-tree>

      <div class="q-mb-lg">
        <span>已选择：</span>
        <span class="text-primary">{{ checkCount }}</span>
      </div>

      <div class="text-center">
        <el-button style="min-width: 120px;"
                   type=""
                   v-on:click="closeDialog">
          <div class="q-py-xs q-px-xl">取消</div>
        </el-button>
        <el-button style="min-width: 120px;"
                   type="primary"
                   v-on:click="check">
          <div class="q-py-xs q-px-xl">提交</div>
        </el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import { IPharmacyModel } from './../model/IPharmacyModel'

export default {
  inject: ['provideStoreList'],

  props: {
    pharmacyRule: Object,
    pharmacyConf: Object,
    data: Array
  },

  data() {
    return {
      checked: false,

      pharmacyList: [],

      checkList: [],
      checkCount: undefined,

      dialog: {
        visible: false
      }
    }
  },

  computed: {
    storeList() {
      return this.provideStoreList()
    }
  },

  watch: {
    checked() {
      if (this.checked === false) {
        this.pharmacyList = []
        this.checkList = []
        this.checkCount = undefined

        for (let i = this.data.length - 1; i >= 0; i--) {
          const item = this.data[i]

          if (item.RuleFlag === this.pharmacyRule.value && item.ConfType === this.pharmacyConf.value && item.CustomerType !== 50) {
            this.data.splice(i, 1)
          }
        }
      }
    }
  },

  created() {
    this.pharmacyList = this.data.filter(
      (item) => item.RuleFlag === this.pharmacyRule.value && item.ConfType === this.pharmacyConf.value && item.CustomerType !== 50
    )

    this.checkList = this.pharmacyList.map((item) => item.DrugStoreId)
    this.checkCount = this.checkList.length
  },

  methods: {
    showDialog() {
      this.dialog.visible = true
    },

    closeDialog() {
      this.dialog.visible = false
    },

    checkChange() {
      const keys = this.$refs.tree.getCheckedNodes()

      this.checkCount = keys.length
    },

    check() {
      // 移除药店
      for (let i = this.data.length - 1; i >= 0; i--) {
        const item = this.data[i]

        if (item.RuleFlag === this.pharmacyRule.value && item.ConfType === this.pharmacyConf.value && item.CustomerType !== 50) {
          this.data.splice(i, 1)
        }
      }

      const nodes = this.$refs.tree.getCheckedNodes()
      this.pharmacyList = []
      this.checkList = []

      nodes.forEach((node) => {
        const pharmacy = new IPharmacyModel()

        // set pharmacy
        // 只需要加载子结构

        if (node.SonName) {
          pharmacy.RuleFlag = this.pharmacyRule.value
          pharmacy.ConfType = this.pharmacyConf.value
          pharmacy.CustCode = ''
          pharmacy.CustomerType = 10
          pharmacy.DrugStoreId = node.DrugStoreKeyId
          pharmacy.DisplayName = node.SonName
          pharmacy.DisplayImg = node.DrugStoreLogo

          this.data.push(pharmacy)
          this.pharmacyList.push(pharmacy)

          this.checkList.push(pharmacy.DrugStoreId)
        }
      })

      this.dialog.visible = false
    },

    resetCheck() {
      this.pharmacyList = this.data.filter(
        (item) => item.RuleFlag === this.pharmacyRule.RuleFlag && item.ConfType === this.pharmacyConf.ConfType && item.CustomerType !== 50
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.pharmacy {
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 160px;
}

::v-deep .el-tree-node__content {
  height: 40px;
}

::v-deep .el-tree > .el-tree-node > .el-tree-node__content {
  height: 48px;
  background: #fafafa;
}
</style>