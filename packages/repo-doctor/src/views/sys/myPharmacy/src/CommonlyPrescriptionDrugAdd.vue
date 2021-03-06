// 添加处方药品

<template>
  <div class="q-px-lg q-py-sm"
       style="min-height: 400px">

    <!-- 搜索 -->
    <div class="flex items-center q-mb-md">
      <div class="col q-mr-md">
        <el-input size="medium"
                  placeholder="请输入药品名称或拼音字母"
                  v-model="queryString"
                  ref="searchInput"
                  v-on:focus="() => this.showHistory = true"
                  v-on:keyup.enter.native="search()"></el-input>
      </div>
      <div class="">
        <el-button size="mini"
                   type="primary"
                   v-on:click="search()">搜索</el-button>
      </div>
    </div>

    <!-- 搜索历史 -->
    <div v-show="showHistory">
      <div class="q-mb-md">
        <span class="q-mr-md text-subtitle2">历史记录</span>
        <span class="cursor-pointer"
              v-on:click="removeCacheHistory">
          <i class="text-primary el-icon-delete"></i>
        </span>
      </div>

      <div class="q-mb-md">
        <div v-for="(item, index) in historyList"
             v-bind:key="index"
             v-on:click="search(item)"
             class="inline-block cursor-pointer bg-grey-3 q-px-md q-py-xs q-mr-md q-mb-md"
             style="border-radius: 16px;">
          <span class="text-caption">{{ item }}</span>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-show="!showHistory">
      <div class="q-mb-lg">
        <PeaceTable size="small"
                    height="300px"
                    ref="table"
                    pagination
                    v-bind:row-class-name="rowClass"
                    v-bind:show-header="false">
          <PeaceTableColumn>
            <template slot-scope="scope">
              <el-tag class="q-mr-sm"
                      effect="dark"
                      type="warning"
                      v-if="scope.row.drugStatus === 'disable'">停用</el-tag>
              <span>{{ scope.row.drugName }}</span>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn prop="specification"></PeaceTableColumn>
          <PeaceTableColumn prop="companyName"></PeaceTableColumn>
          <PeaceTableColumn width="60">
            <template slot-scope="scope">
              <span v-if="inAddedList(scope.row)">已添加</span>
              <span v-else-if="isDisabled(scope.row)">已停用</span>
              <i v-else
                 v-on:click="next(scope.row)"
                 class="el-icon-circle-plus text-h6 text-primary"></i>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>
    </div>

    <!-- 添加药品用法 -->
    <PeaceDialog title="药品用法"
                 append-to-body
                 v-if="drugUsageDialog.visible"
                 v-bind:visible.sync="drugUsageDialog.visible">
      <CommonlyPrescriptionDrugUsageAdd v-bind:data="prescriptionDrug"
                                        v-on:success="onDrugUsageSuccess"
                                        v-on:cancel="onDrugUsageCancel"></CommonlyPrescriptionDrugUsageAdd>
    </PeaceDialog>
  </div>
</template>

<script>
const UniqueKey = 'ADD_COMMONLY_PRESCRIPTION_DRUG'

import Service from './../service'

import CommonlyPrescriptionDrugUsageAdd from './CommonlyPrescriptionDrugUsageAdd.vue'

export default {
  components: {
    CommonlyPrescriptionDrugUsageAdd
  },

  props: {
    /** 已添加 */
    addedList: {
      type: Array,
      default() {
        return []
      }
    },
    prescriptionTag: {
      type: Number,
      default() {
        return 1
      }
    }
  },

  data() {
    return {
      showHistory: true,

      queryString: '',

      historyList: [],

      prescriptionDrugList: undefined,

      prescriptionDrug: {},

      drugUsageDialog: {
        visible: false
      }
    }
  },

  created() {
    this.historyList = this.getCacheHistory()
  },

  methods: {
    search(item) {
      this.showHistory = false
      this.prescriptionDrugList = []
      this.queryString = item || this.queryString

      this.$refs.searchInput.blur()

      if (this.queryString) {
        const fetch = Service.getDrugList
        const params = {
          drugName: this.queryString,
          prescriptionTag: this.prescriptionTag
        }

        this.$refs.table
          .loadData({ fetch, params })
          .then((res) => {
            this.prescriptionDrugList = res.data.list
          })
          .finally(() => {
            this.addCacheHistory(this.queryString)
          })
      } else {
        const fetch = Service.getCommonlyDrugList
        const params = {
          drugName: this.queryString
        }

        this.$refs.table.loadData({ fetch, params }).then((res) => {
          this.prescriptionDrugList = res.data.list
        })
      }
    },

    rowClass({ row }) {
      if (row.drugStatus === 'disable' || this.addedList.findIndex((item) => item.drugId === row.drugId) !== -1) {
        return 'disabled cursor-pointer'
      }

      return 'cursor-pointer'
    },

    inAddedList(row) {
      return this.addedList.findIndex((item) => item.drugId === row.drugId) !== -1
    },

    isDisabled(row) {
      return row.drugStatus === 'disable'
    },

    cancel() {
      this.$emit('cancel')
    },

    next(row) {
      this.drugUsageDialog.visible = true
      this.prescriptionDrug = Peace.util.deepClone(row)
      this.prescriptionDrug.singleDose = undefined
    },

    onDrugUsageSuccess(drug) {
      this.drugUsageDialog.visible = false

      this.$emit('success', drug)
    },

    onDrugUsageCancel() {
      this.drugUsageDialog.visible = false
    },

    getCacheHistory() {
      return Peace.cache.sessionStorage.get(UniqueKey) ?? []
    },

    addCacheHistory(queryString) {
      this.historyList.unshift(queryString)

      this.historyList = [...new Set(this.historyList)]

      Peace.cache.sessionStorage.set(UniqueKey, this.historyList)
    },

    removeCacheHistory() {
      this.historyList = []
      Peace.cache.sessionStorage.remove(UniqueKey)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-checkbox__inner {
  border-radius: 50%;
}
</style>