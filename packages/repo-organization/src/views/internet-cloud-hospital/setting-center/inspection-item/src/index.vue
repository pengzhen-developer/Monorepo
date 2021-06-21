<template>
  <div class="layout-route full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               label-width="auto">
        <el-form-item label="项目编码">
          <peace-input placeholder="请输入"
                       v-model.trim="model.itemNo"></peace-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.itemName"
                       maxlength="100"></peace-input>
        </el-form-item>
        <el-form-item label="执行科室">
          <peace-select v-model="model.deptId"
                        placeholder="全部">
            <el-option v-for="item in source.dept"
                       v-bind:key="item.deptId"
                       v-bind:label="item.netdeptChild"
                       v-bind:value="item.deptId"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="状态">
          <peace-select v-model="model.status"
                        placeholder="全部">
            <el-option v-for="item in source.status"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="add">关联项目</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn type="index"
                          label="序号"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="组套名称"
                          prop="comboName"
                          min-width="180px">
          <template slot-scope="scope">
            <div class="row items-center no-wrap full-width">
              <img v-on:click="toogleExpand(scope.row)"
                   class="q-mr-8 cursor-pointer"
                   v-bind:src="scope.row.expansion?require('./image/fold.png'):require('./image/unfold.png')" />
              <div>{{scope.row.comboName}}</div>
            </div>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn type="expand"
                          width="1">
          <template slot-scope="props">
            <PeaceTable :data="props.row.checkList">
              <PeaceTableColumn label=""
                                prop=""
                                width="104px"></PeaceTableColumn>
              <PeaceTableColumn label="项目名称"
                                prop="itemName"
                                min-width="180px"></PeaceTableColumn>
              <PeaceTableColumn label="项目编码"
                                prop="itemNo"
                                min-width="160px"></PeaceTableColumn>
              <PeaceTableColumn label="单价"
                                prop="price"
                                min-width="100px"></PeaceTableColumn>
              <PeaceTableColumn label="单位"
                                prop="unit"
                                min-width="100px"></PeaceTableColumn>
              <PeaceTableColumn label="操作"
                                min-width="80px">
                <template slot-scope="scope">
                  <el-button type="text"
                             v-on:click="remove(props.row,scope.row)">移除</el-button>
                </template>
              </PeaceTableColumn>
            </PeaceTable>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="执行科室"
                          min-width="100px"
                          prop="deptName">
        </PeaceTableColumn>
        <PeaceTableColumn label="价格"
                          prop="totalPrice"
                          min-width="100px"></PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          prop="createdTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="updatedTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="120">
          <template slot-scope="scope"
                    class="row items-center">
            <span class="q-mr-4"> {{scope.row.status == 'yes' ? '启用' : '停用'}} </span>
            <el-switch :active-value="'yes'"
                       :inactive-value="'no'"
                       v-model="scope.row.status"
                       v-on:change="modify(scope.row)"></el-switch>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="addModelDialog.visible"
                  title="关联项目"
                  v-if="addModelDialog.visible"
                  append-to-body
                  width="576px">
      <AddModel v-on:complete="complete"
                v-on:cancel="cancel" />
    </peace-dialog>
  </div>
</template>

<script>
import Service from './service'
import AddModel from './components/AddModel.vue'
export default {
  name: 'InspectionItem',
  components: { AddModel },
  data() {
    return {
      model: {
        itemNo: '',
        itemName: '',
        deptId: '',
        status: ''
      },
      tableData: [],
      source: {
        status: [
          { label: '启用', value: 'yes' },
          { label: '停用', value: 'no' }
        ],
        dept: []
      },
      addModelDialog: {
        visible: false
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDeptList()
      this.fetch()
    })
  },
  methods: {
    getDeptList() {
      Service.getDeptList().then((res) => {
        this.source.dept = res.data.list
      })
    },
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getComboItemList
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        this.tableData = res.data.list
        this.tableData.map((item) => (item.expansion = false))
      })
    },
    toogleExpand(row) {
      let $table = this.$refs.table
      this.tableData.map((item) => {
        if (item.comboNo === row.comboNo) {
          item.expansion = !item.expansion
        }
      })
      $table.$children[1].toggleRowExpansion(row)
    },
    add() {
      this.addModelDialog.visible = true
    },
    remove(data, row) {
      if (data.checkList.length > 1) {
        const params = { comboNo: data.comboNo, itemNo: row.itemNo }
        Service.removeComboItem(params).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      } else {
        Peace.util.warning('当前检验项目下需至少有一个子项目')
      }
    },
    modify(row) {
      const params = { comboNo: row.comboNo, status: row.status }
      if (row.status == 'no') {
        this.$confirm('当前操作将停用组套，是否继续操作？', '提示', { closeOnClickModal: false })
          .then(() => {
            Service.operateComboItem(params).then((res) => {
              Peace.util.success(res.msg)
              this.fetch()
            })
          })
          .catch(() => {
            row.status = row.status === 'no' ? 'yes' : 'no'
          })
      } else {
        Service.operateComboItem(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.fetch()
          })
          .catch(() => {
            row.status = row.status === 'yes' ? 'no' : 'yes'
          })
      }
    },
    complete() {
      this.addModelDialog.visible = false
      this.fetch()
    },
    cancel() {
      this.addModelDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__expand-column {
  .el-table__expand-icon {
    color: transparent;
  }
}

::v-deep .el-table__expanded-cell {
  padding: 0;
  .el-table tr,
  .el-table th {
    background: #f9f9f9;
  }
  .el-table tr:last-child {
    td {
      border-bottom: 0;
    }
  }
  .el-table:before {
    height: 0;
  }
}
</style>