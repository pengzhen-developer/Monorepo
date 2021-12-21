// 添加常用药品

<template>
  <div class="q-px-lg q-py-sm">

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
      <PeaceTable height="300"
                  size="small"
                  ref="table"
                  pagination
                  v-bind:show-header="false">
        <PeaceTableColumn>
          <template slot-scope="scope">
            <span class="medical_tags"
                  v-if="scope.row.isMedical === 1">医保</span>
            <span class="text-grey-333">{{ scope.row.drugName }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="specification"></PeaceTableColumn>
        <PeaceTableColumn prop="companyName"></PeaceTableColumn>
        <PeaceTableColumn width="60">
          <template slot-scope="scope">
            <span class="cursor-pointer"
                  v-if="!scope.row.isAdded">
              <i @click="dddCommonlyDrug(scope.row)"
                 class="el-icon-circle-plus text-h6 text-primary"></i>
            </span>
            <span v-else>已添加</span>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
const UniqueKey = 'ADD_COMMONLY_DRUG'

import Service from './../service'

export default {
  data() {
    return {
      showHistory: true,

      queryString: '',

      historyList: [],

      drugList: []
    }
  },

  created() {
    this.historyList = this.getCacheHistory()
  },

  methods: {
    search(item) {
      this.showHistory = false
      this.drugList = []
      this.queryString = item || this.queryString

      this.$refs.searchInput.blur()

      if (this.queryString) {
        const fetch = Service.getDrugList
        const params = {
          drugName: this.queryString
        }

        this.$refs.table
          .loadData({ fetch, params })
          .then((res) => {
            this.drugList = res.data.list
          })
          .finally(() => {
            this.addCacheHistory(this.queryString)
          })
      } else {
        this.showHistory = true
      }
    },

    dddCommonlyDrug(row) {
      Peace.util.confirm('确定添加到常用药品', '提示', {}, () => {
        const params = {
          drugId: row.drugId
        }

        Service.addCommonlyDrug(params).then((res) => {
          Peace.util.success(res.msg)

          this.$emit('success')
        })
      })
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
.medical_tags {
  font-size: 12px;
  color: #ffffff;
  padding: 1px 4px;
  background: #3099a6;
  border-radius: 2px;
  text-align: center;
  margin-right: 8px;
  max-height: 16px;
}
</style>
