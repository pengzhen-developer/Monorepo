<template>
  <div>
    <PeaceDialog title="添加条件"
                 append-to-body
                 v-bind:visible.sync="visible"
                 width="900px">

      <div v-show="multipleSelection.length > 0"
           class="q-mb-40">
        <span>已选药品：</span>
        <div class="q-mt-md">
          <el-tag v-for="item in multipleSelection"
                  v-bind:key="item.drugCode"
                  closable
                  @close="handleClose(item)"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.drugName }}
          </el-tag>
        </div>
      </div>

      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>药品编码</span>
            <span>：</span>
          </span>
          <el-input v-model.trim="searchModel.drugCode"
                    style="width:150px"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>药品名称</span>
            <span>：</span>
          </span>
          <el-input v-model.trim="searchModel.drugName"
                    style="width:150px"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>生产厂家</span>
            <span>：</span>
          </span>
          <el-input v-model.trim="searchModel.manufacturer"
                    style="width:150px"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="fetch()">查询</el-button>
        </el-form-item>

      </el-form>

      <peace-table ref="table"
                   pagination
                   row-key="drugCode"
                   size="mini">

        <peace-table-column width="50px">
          <template #header>
            <el-checkbox v-model="checkAll"
                         v-bind:indeterminate="isIndeterminate"
                         v-on:change="handleCheckAllChange"></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-bind:label="scope.row.drugCode"
                         v-bind:value="multipleSelection.some(item => item.drugCode === scope.row.drugCode)"
                         v-on:change="e => handleCheckedItemChange(e, scope.row)"><span></span></el-checkbox>
          </template>
        </peace-table-column>
        <peace-table-column label="药品编码"
                            min-width="120px"
                            prop="drugCode">
        </peace-table-column>
        <peace-table-column label="药品名称"
                            min-width="120px"
                            prop="drugName">
        </peace-table-column>
        <peace-table-column label="药品规格"
                            min-width="120px"
                            prop="drugSpecifications">
          <template slot-scope="scope">
            {{scope.row.drugSpecifications||"——"}}
          </template>
        </peace-table-column>
        <peace-table-column label="生产厂家"
                            min-width="120px"
                            prop="manufacturer">
          <template slot-scope="scope">
            {{scope.row.manufacturer||"——"}}
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
  name: 'ChoiceDoctorDialog',
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
      searchModel: {
        drugCode: '',
        drugName: '',
        manufacturer: ''
      },
      multipleSelection: [],
      isIndeterminate: false,
      checkAll: false
    }
  },

  created() {
    if (this.model && this.model.length > 0) {
      this.multipleSelection = this.model.map((item) => {
        return { drugCode: item.code, drugName: item.name }
      })
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
      const fetch = Service.drugDictListByFilter
      const params = Peace.util.deepClone(this.searchModel)
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
      const index = this.multipleSelection.findIndex((item) => item.drugCode === b.drugCode)
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
          return this.multipleSelection.some((aa) => aa.drugCode === item.drugCode)
        }) &&
        this.multipleSelection.length > 0 &&
        this.$refs.table.internalData.length > 0

      this.isIndeterminate =
        this.$refs.table.internalData.some((item) => {
          return this.multipleSelection.some((aa) => aa.drugCode === item.drugCode)
        }) && !this.checkAll
    },

    cancel() {
      this.visible = false
    },

    handleClose(val) {
      const index = this.multipleSelection.findIndex((tmp) => val.drugCode === tmp.drugCode)
      this.multipleSelection.splice(index, 1)
      const table = this.$refs.table.$children[1]
      const tmp = this.$refs.table.internalData.find((item) => {
        return val.drugCode === item.drugCode // 注意这里寻找的字段要唯一，示例仅参考
      })
      table.toggleRowSelection(tmp, false)
    },

    save() {
      const map = this.multipleSelection.map((item) => {
        return { code: item.drugCode, name: item.drugName }
      })
      this.$emit('onSuccess', map)
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
