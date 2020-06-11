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
                  v-on:keyup.enter.native="search()"></el-input>
      </div>
      <div class="">
        <el-button style="width: 80px;"
                   size="mini"
                   type="primary"
                   round
                   v-on:click="search()">搜索</el-button>
      </div>
    </div>

    <!-- 搜索历史 -->
    <div v-if="showHistory">
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
    <div v-show="showQueryList">
      <div class="q-mb-lg">
        <peace-table size="small"
                     height="300px"
                     ref="table"
                     pagination
                     v-bind:row-class-name="rowClass"
                     v-bind:show-header="false"
                     v-on:row-click="rowSelect">
          <el-table-column type="selection"
                           width="50"></el-table-column>
          <peace-table-column align="left">
            <template slot-scope="scope">
              <el-tag class="q-mr-sm"
                      effect="dark"
                      type="warning"
                      v-if="scope.row.drugStatus === 'disable'">停用</el-tag>
              <span>{{ scope.row.drugName }}</span>
            </template>
          </peace-table-column>
          <el-table-column prop="specification"></el-table-column>
          <el-table-column prop="companyName"></el-table-column>
        </peace-table>
      </div>

      <div class="text-center">
        <el-button style="width: 80px;"
                   v-on:click="cancel">取消</el-button>
        <el-button style="width: 80px;"
                   v-bind:disabled="!nextable"
                   v-on:click="next"
                   type="primary">下一步</el-button>
      </div>
    </div>

    <!-- 添加药品用法 -->
    <peace-dialog title="药品用法"
                  append-to-body
                  v-if="drugUsageDialog.visible"
                  v-bind:visible.sync="drugUsageDialog.visible">
      <CommonlyPrescriptionDrugUsageAdd v-bind:data="prescriptionDrug"
                                        v-on:success="onDrugUsageSuccess"
                                        v-on:cancel="onDrugUsageCancel"></CommonlyPrescriptionDrugUsageAdd>
    </peace-dialog>
  </div>
</template>

<script>
const UniqueKey = 'ADD_COMMONLY_PRESCRIPTION_DRUG'

import Peace from '@src/library'
import Service from './../service'

import CommonlyPrescriptionDrugUsageAdd from './CommonlyPrescriptionDrugUsageAdd'

export default {
  components: {
    CommonlyPrescriptionDrugUsageAdd
  },

  data() {
    return {
      queryString: '',

      historyList: [],

      prescriptionDrugList: [],

      prescriptionDrug: {},

      drugUsageDialog: {
        visible: false
      }
    }
  },

  computed: {
    nextable() {
      return this.prescriptionDrug?.drugId && this.prescriptionDrug?.drugStatus !== 'disable'
    },

    showHistory() {
      return this.prescriptionDrugList?.length <= 0
    },

    showQueryList() {
      return this.prescriptionDrugList?.length > 0
    }
  },

  created() {
    this.historyList = this.getCacheHistory()
  },

  methods: {
    search(item) {
      if (item || this.queryString) {
        const fetch = Service.getDrugList
        const params = {
          drugName: item || this.queryString
        }

        this.$refs.table
          .loadData({ fetch, params })
          .then((res) => {
            this.prescriptionDrugList = res.data.list
          })
          .finally(() => {
            this.addCacheHistory(item || this.queryString)
          })
      } else {
        const fetch = Service.getCommonlyDrugList

        this.$refs.table.loadData({ fetch }).then((res) => {
          this.prescriptionDrugList = res.data.list
        })
      }
    },

    rowClass({ row }) {
      if (row.drugStatus === 'disable') {
        return 'disabled cursor-pointer'
      }

      return 'cursor-pointer'
    },

    rowSelect(row) {
      if (row.drugStatus === 'disable') {
        return
      }

      this.prescriptionDrug = Peace.util.deepClone(row)
      this.$refs.table.$children[1].clearSelection()
      this.$refs.table.$children[1].toggleRowSelection(row, true)
    },

    cancel() {
      this.$emit('cancel')
    },

    next() {
      this.drugUsageDialog.visible = true
    },

    onDrugUsageSuccess(drug) {
      this.drugUsageDialog.visible = false

      this.$emit('success', drug)
    },

    onDrugUsageCancel() {
      this.drugUsageDialog.visible = false
    },

    getCacheHistory() {
      return Peace.cache.get(UniqueKey) ?? []
    },

    addCacheHistory(queryString) {
      this.historyList.unshift(queryString)

      this.historyList = [...new Set(this.historyList)]

      Peace.cache.set(UniqueKey, this.historyList)
    },

    removeCacheHistory() {
      this.historyList = []
      Peace.cache.remove(UniqueKey)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-checkbox__inner {
  border-radius: 50%;
}
</style>