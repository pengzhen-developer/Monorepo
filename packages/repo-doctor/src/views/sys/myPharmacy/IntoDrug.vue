<template>
  <div class="into-drug">
    <div class="search">
      <el-input @keyup.enter.native="search(drugname)" class="search-input" clearable placeholder="请输入药品名称或拼音字母" v-model="drugname"></el-input>
      <el-button @click="search(drugname)" class="search-btn" round type="primary">搜索</el-button>
    </div>
    <div class="content">
      <div class="history" v-if="!list.length">
        <div>
          <span>历史记录</span>
          <span @click="clear">
            <i class="el-icon-delete primary"></i>
          </span>
        </div>
        <div :key="'history_' + item" class="history-item" v-for="item in historyList">
          <span @click="search(item)" class="pointer">{{ item }}</span>
        </div>
      </div>
      <div v-else>
        <el-table :data="list" :show-header="false" height="300" size="small">
          <el-table-column label prop="drug_name"></el-table-column>
          <el-table-column label prop="drug_spec"></el-table-column>
          <el-table-column label prop="drug_factory"></el-table-column>
          <el-table-column align="center" width="60">
            <template slot-scope="scope">
              <i @click="intoDrugList(scope.row)" class="el-icon-circle-plus" v-if="scope.row.status !== '正常'"></i>
              <span v-else>已添加</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import peace from '@src/library'
import config from './config'
// 药品搜索记录
const CACHE_KEY = 'drugSearchHistorys'

export default {
  name: 'IntoDrug',
  data() {
    return {
      drugname: '',
      config: config,
      showHistory: true,
      historyList: [],
      list: []
    }
  },
  watch: {
    drugname(val) {
      if (!val) {
        this.list = []
      }
    }
  },
  methods: {
    // 查询药品
    search(drugname) {
      if (this.drugname !== drugname) {
        this.drugname = drugname
      }

      if (!drugname) {
        return (this.list = [])
      }
      const api = this.config.api.getDrugs

      this.http.get(api, { params: { drugname } }).then(res => {
        this.list = res.data || []
        this.addToCache(drugname)
      })
    },
    // 添加到常用药品
    intoDrugList(row) {
      this.$confirm('添加到常用药品？', '提示', {
        type: 'success'
      }).then(() => {
        row.status = '正常'
        this.$emit('into', row.id)
      })
    },
    // 获取历史 Search 记录
    getByCache() {
      this.historyList = peace.cache.get(CACHE_KEY)
    },
    // 搜索记录添加到缓存
    addToCache(_history) {
      this.historyList.unshift(_history)

      this.historyList = [...new Set(this.historyList)]

      peace.cache.set(CACHE_KEY, this.historyList)
    },
    // 清空历史 Search 记录
    clear() {
      if (!this.historyList.length) return

      peace.cache.remove(CACHE_KEY)
      this.historyList = []
    }
  },
  created() {
    this.getByCache()
  }
}
</script>
<style lang="scss" scoped>
.into-drug {
  padding: 10px 20px;
  .el-icon-delete.primary {
    margin-left: 10px;
    color: $--color-primary;
    cursor: pointer;
  }
  .el-icon-circle-plus {
    font-size: 14px;
    color: $--color-primary;
    cursor: pointer;
  }
}

.search {
  /deep/ &-input {
    margin-right: 10px;
    width: calc(100% - 80px);
  }
}
.content {
  margin-top: 10px;
  min-height: 300px;
  .history {
    &-item {
      margin: 10px;
      margin-left: 0;
      padding: 1px 8px;
      font-size: 12px;
      line-height: 17px;
      border-radius: 10px;
      background-color: #efefef;
      display: inline-block;
    }
  }
}
.pointer {
  cursor: pointer;
}
</style>
