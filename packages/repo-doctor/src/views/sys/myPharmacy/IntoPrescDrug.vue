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
        <div :key="'history_' + item" class="history-item" v-for="item in history.slice(0, 20)">
          <span @click="search(item)" class="pointer">{{ item }}</span>
        </div>
      </div>
      <div v-else>
        <el-table :data="list" :show-header="false" @row-click="handleSelect" height="286" ref="singleTable" size="small">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="drug_name"></el-table-column>
          <el-table-column prop="drug_spec" width="100"></el-table-column>
          <el-table-column prop="drug_factory"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button :disabled="!selected" @click="nextStep" type="primary">下一步</el-button>
      <el-button @click="$emit('cancel')" plain type="primary">取消</el-button>
    </div>
  </div>
</template>
<script>
import peace from '@src/library'
import config from './config'
// 药品搜索记录
const CACHE_KEY = 'prescDrugSearchHistorys'

export default {
  name: 'IntoPrescDrug',
  data() {
    return {
      drugname: '',
      config: config,
      showHistory: true,
      history: [],
      list: [],
      selected: ''
    }
  },
  watch: {
    drugname(val) {
      if (!val) {
        this.list = []
      }
    }
  },
  computed: {
    renderHistory() {
      const history = [].concat(this.history)
      return history.reverse().slice(0, 20)
    }
  },
  methods: {
    // 查询药品
    search(drugname) {
      if (!drugname) {
        return
      }

      if (this.drugname !== drugname) {
        this.drugname = drugname
      }

      const api = this.config.api.getPrescDrugList
      const params = {
        hospitalId: this.$store.state.user.userInfo.list.docInfo.netHospital_id,
        drugname
      }

      this.http.get(api, { params }).then(res => {
        setTimeout(() => {
          if (res.data && res.data.length) {
            this.list = [].concat(res.data)
          }
        }, 0)
        this.addToCache(drugname)
      })
    },
    nextStep() {
      const { drug_factory, drug_name, drug_spec, drug_unit, id, license_number } = this.selected
      const obj = {
        drug_factory,
        drug_name,
        drug_spec,
        drug_unit,
        id,
        drugid: id,
        license_number
      }
      this.$emit('nextStep', obj)
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
    handleSelect(row) {
      this.$refs.singleTable.clearSelection()
      this.$refs.singleTable.toggleRowSelection(row, true)
      this.selected = row
    },
    // 获取历史 Search 记录
    getByCache() {
      this.history = peace.cache.get(CACHE_KEY) || []
    },
    // 搜索记录添加到缓存
    addToCache(_history) {
      this.history.unshift(_history)

      this.history = [...new Set(this.history)]

      peace.cache.set(CACHE_KEY, this.history)
    },
    // 清空历史 Search 记录
    clear() {
      if (!this.history.length) return

      peace.cache.remove(CACHE_KEY)
      this.history = []
    }
  },
  created() {
    this.getByCache()
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-table {
  &__row {
    cursor: pointer;
  }
}
.el-button {
  &--primary.is-plain {
    color: $--color-primary;
    background: transparent;
  }
}
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
/deep/ .el-checkbox {
  pointer-events: none;
  &__inner {
    border-radius: 100%;
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
