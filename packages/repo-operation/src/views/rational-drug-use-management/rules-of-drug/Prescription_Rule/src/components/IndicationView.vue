<template>
  <div>
    <PeaceDialog title="添加条件：疾病诊断"
                 append-to-body
                 v-bind:visible.sync="visible"
                 width="715px">

      <div v-show="multipleSelection.length > 0"
           class="q-mb-40">
        <span>已选适应症：</span>
        <div class="q-mt-md">
          <el-tag v-for="item in multipleSelection"
                  v-bind:key="item.code"
                  closable
                  @close="handleClose(item)"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.name }}
          </el-tag>
        </div>
      </div>

      <el-input v-model.trim="searchWord"
                class="q-mb-md"
                placeholder="请输入内容"
                style="width: 288px;"
                clearable>
        <el-button slot="append"
                   class="input-button-style element-ui-default"
                   icon="el-icon-search"
                   v-on:click="fetch"></el-button>
      </el-input>

      <peace-table ref="table"
                   pagination
                   row-key="code"
                   size="mini">

        <peace-table-column width="50px">
          <template #header>
            <el-checkbox v-model="checkAll"
                         v-bind:indeterminate="isIndeterminate"
                         v-on:change="handleCheckAllChange"></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-bind:label="scope.row.code"
                         v-bind:value="multipleSelection.some(item => item.code === scope.row.code)"
                         v-on:change="e => handleCheckedItemChange(e, scope.row)"><span></span></el-checkbox>
          </template>
        </peace-table-column>

        <peace-table-column label="疾病编码"
                            min-width="120px"
                            prop="code">
        </peace-table-column>
        <peace-table-column label="疾病名称"
                            min-width="120px"
                            prop="name">
        </peace-table-column>
        <peace-table-column label="ICD名称"
                            min-width="200px"
                            show-overflow-tooltip
                            prop="diagnosisName">
          <template slot-scope="scope">
            {{scope.row.diagnosisName||"——"}}
          </template>
        </peace-table-column>
      </peace-table>

      <div class="el-dialog__footer">
        <el-button class="btn"
                   v-on:click="cancel">取消
        </el-button>
        <el-button class="btn"
                   type="primary"
                   v-on:click="save">保存
        </el-button>
      </div>

    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  name: 'IndicationView',
  props: {
    value: {
      required: true,
      type: Boolean
    },
    model: {
      required: false,
      type: Array
    }
  },

  data() {
    return {
      visible: this.value,
      searchWord: '',
      multipleSelection: [],
      isIndeterminate: false,
      checkAll: false
    }
  },

  created() {
    if (this.model && this.model.length > 0) {
      this.multipleSelection = this.model
    }

    this.$nextTick(() => {
      this.fetch()
    })
  },

  watch: {
    value(value) {
      this.visible = value
    },
    visible(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    fetch() {
      const fetch = Service.getPageContainsDiagnosisList
      const params = {
        name: this.searchWord
      }

      this.$refs.table.reloadData({
        fetch,
        params,
        filter: (res) => {
          setTimeout(this.setCheckAllState)
          return res
        }
      })
    },

    handleCheckAllChange(val) {
      this.$refs.table.internalData.forEach((item) => {
        this.handleCheckedItemChange(val, item)
      })
      this.isIndeterminate = false
    },

    handleCheckedItemChange(a, b) {
      const index = this.multipleSelection.findIndex((item) => item.code === b.code)
      if (a) {
        if (index === -1) {
          this.multipleSelection.push(b)
        }
      } else {
        if (index !== -1) {
          this.multipleSelection.splice(index, 1)
        }
      }
      this.setCheckAllState()
    },

    setCheckAllState() {
      this.checkAll =
        this.$refs.table.internalData.every((item) => {
          return this.multipleSelection.some((aa) => aa.code === item.code)
        }) &&
        this.multipleSelection.length > 0 &&
        this.$refs.table.internalData.length > 0

      this.isIndeterminate =
        this.$refs.table.internalData.some((item) => {
          return this.multipleSelection.some((aa) => aa.code === item.code)
        }) && !this.checkAll
    },

    cancel() {
      this.visible = false
    },
    handleClose(val) {
      const index = this.multipleSelection.findIndex((tmp) => val.code === tmp.code)
      this.multipleSelection.splice(index, 1)
      const table = this.$refs.table.$children[1]
      const tmp = this.$refs.table.internalData.find((item) => {
        return val.code === item.code // 注意这里寻找的字段要唯一，示例仅参考
      })
      table.toggleRowSelection(tmp, false)
    },
    save() {
      this.$emit('onSuccess', this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-button-style {
  background-color: var(--q-color-primary) !important;
  border: none;
  border-radius: 0 3px 3px 0;

  ::v-deep .el-icon-search {
    color: white !important;
  }
}
</style>
