<template>
  <div>
    <PeaceDialog title="添加条件"
                 v-bind:visible.sync="visible"
                 width="715px">

      <div v-show="multipleSelection.length > 0"
           class="q-mb-40">
        <span>已选过敏：</span>
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

      <el-input v-model="searchWord"
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
                   size="mini"
                   @selection-change="handleSelectionChange">

        <peace-table-column :reserve-selection="true"
                            type="selection"
                            width="55">
        </peace-table-column>
        <peace-table-column label="过敏信息编码"
                            min-width="120px"
                            prop="code">
        </peace-table-column>
        <peace-table-column label="过敏名称"
                            min-width="120px"
                            prop="name">
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
  name: 'ChoiceAllergyDialog',
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
      isLoading: false,
      visible: this.value,
      searchWord: '',
      multipleSelection: [],
      reserveSelected: false,
      currentTableData: []
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

  computed: {},

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
      const fetch = Service.getPlatformAllergyInfoPage
      const params = {
        name: this.searchWord
      }

      const filter = (res) => {
        this.$nextTick(() => this.toggleSelection())
        this.currentTableData = res.data.records
        return res
      }

      this.$refs.table.reloadData({ fetch, params, filter })
    },

    toggleSelection() {
      const table = this.$refs.table.$children[1]
      const tmpSelections = [...this.multipleSelection]
      this.reserveSelected = true
      tmpSelections.forEach((row) => {
        const selectData = this.currentTableData.find((item) => {
          return row.code === item.code // 注意这里寻找的字段要唯一，示例仅参考
        })
        if (selectData) {
          table.toggleRowSelection(selectData, true)
        }
      })
      this.reserveSelected = false
    },

    handleSelectionChange(val) {
      if (!this.reserveSelected) {
        this.multipleSelection = val
      }
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
      if (this.multipleSelection.length > 0) {
        this.$emit('onSuccess', this.multipleSelection)
      } else {
        Peace.util.warning('请先选择')
      }
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
