<template>
  <div>
    <PeaceDialog title="添加条件"
                 append-to-body
                 v-bind:visible.sync="visible"
                 width="800px">
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
                   size="mini"
                   v-on:row-click="isCanCheck">
        <peace-table-column width="50px">
          <template slot-scope="scope">
            <el-radio name="radio"
                      v-bind:label="scope.row.code"
                      :disabled="scope.row.mapperStatus != 'success' || scope.row.auditStatus != 'pass'"
                      v-bind:value="multipleSelection.code"><span></span></el-radio>
          </template>
        </peace-table-column>
        <peace-table-column label="频次编码"
                            min-width="120px"
                            prop="code">
        </peace-table-column>
        <peace-table-column label="频次名称"
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
        <peace-table-column label="平台频次名称"
                            min-width="120px"
                            prop="platformName">
          <template slot-scope="scope">
            {{ scope.row.platformName || '--' }}
          </template>
        </peace-table-column>
        <peace-table-column label="系数"
                            min-width="80px"
                            prop="coefficient">
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
  name: 'ChoiceDrugUseFrequencyThreeDialog',
  props: {
    joinType: {
      required: true,
      type: Number
    },
    value: {
      required: true,
      type: Boolean
    },
    model: {
      required: false,
      type: Object
    }
  },

  data() {
    return {
      isLoading: false,
      visible: this.value,
      searchWord: '',
      multipleSelection: {},
      reserveSelected: false,
      currentTableData: [],
      source: {
        MapperStatus: [],
        AuditStatus: []
      }
    }
  },

  created() {
    if (this.model.name) {
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
      const fetch = Service.getPageByCondition
      const params = {
        name: this.searchWord
      }
      this.$refs.table.reloadData({ fetch, params })
    },

    cancel() {
      this.visible = false
    },

    isCanCheck(row) {
      if (row.mapperStatus === 'success' && row.auditStatus === 'pass') {
        this.multipleSelection = row
      }
    },

    save() {
      if (!this.multipleSelection.name) {
        Peace.util.warning('请先选择')
        return
      }
      if (!this.multipleSelection.coefficient) {
        Peace.util.warning('数据异常，系数为空')
        return
      }
      if (this.model.otherCoefficient) {
        if (
          Number(this.joinType) === 0 &&
          parseFloat(this.multipleSelection.coefficient) > parseFloat(this.model.otherCoefficient)
        ) {
          Peace.util.warning('最小频次系数不得大于最大频次系数')
          return
        }

        if (
          Number(this.joinType) === 1 &&
          parseFloat(this.multipleSelection.coefficient) < parseFloat(this.model.otherCoefficient)
        ) {
          Peace.util.warning('最大频次系数不得小于最小频次系数')
          return
        }
      }

      this.multipleSelection.type = this.joinType
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
