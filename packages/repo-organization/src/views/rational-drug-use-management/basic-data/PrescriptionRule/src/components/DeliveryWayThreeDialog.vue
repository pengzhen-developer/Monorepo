<template>
  <div>
    <PeaceDialog title="添加条件"
                 v-bind:visible.sync="visible"
                 width="715px">

      <div v-show="multipleSelection.length > 0"
           class="q-mb-40">
        <span>已选给药途径：</span>
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
                            :selectable="isSelect"
                            width="55">
        </peace-table-column>

        <peace-table-column label="给药途径编码"
                            min-width="120px"
                            prop="code">
        </peace-table-column>
        <peace-table-column label="给药途径名称"
                            min-width="120px"
                            prop="name">
        </peace-table-column>
        <peace-table-column label="配码状态"
                            min-width="120px"
                            prop="mapperStatus">
          <template slot-scope="scope">
            {{scope.row.mapperStatus | filterDictionary(source.MapperStatus,'--')}}
          </template>
        </peace-table-column>
        <peace-table-column label="审核状态"
                            min-width="120px"
                            prop="auditStatus">
          <template slot-scope="scope">
            {{scope.row.auditStatus | filterDictionary(source.AuditStatus,'--')}}
          </template>
        </peace-table-column>
        <peace-table-column label="平台途径名称"
                            min-width="200px"
                            prop="platformName">
          <template slot-scope="scope">
            {{scope.row.platformName || '--'}}
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
  name: 'DeliveryWayThreeDialog',
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
      currentTableData: [],
      source: {
        MapperStatus: [],
        AuditStatus: []
      }
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
  async mounted() {
    this.source.MapperStatus = await Peace.identity.dictionary.getList('mapper_status')
    this.source.AuditStatus = await Peace.identity.dictionary.getList('mapper_audit_status')
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
      const fetch = Service.getOrgUseDrugRoute
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
    isSelect(row) {
      return row.mapperStatus === 'success' && row.auditStatus === 'pass'
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
