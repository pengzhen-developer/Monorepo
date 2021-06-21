<template>
  <div class="card">
    <el-form inline
             label-suffix="："
             v-on:keyup.enter.native="fetch"
             v-on:submit.native.prevent
             v-bind:model="model"
             label-width="auto">
      <el-form-item label="组套编码">
        <peace-input placeholder="请输入"
                     v-model.trim="model.comboNo"></peace-input>
      </el-form-item>
      <el-form-item label="组套名称">
        <peace-input placeholder="请输入"
                     v-model.trim="model.comboName"
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
        <el-button v-on:click="fetch"
                   type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div class="q-mb-lg">
      <el-button type="primary"
                 v-on:click="add('add',{})">新增</el-button>
    </div>

    <PeaceTable ref="table"
                pagination>
      <PeaceTableColumn label="序号"
                        prop="orderNumber"
                        width="80px"></PeaceTableColumn>
      <PeaceTableColumn label="组套编码"
                        prop="comboNo"
                        min-width="160px"></PeaceTableColumn>
      <PeaceTableColumn label="组套名称"
                        prop="comboName"
                        min-width="180px"></PeaceTableColumn>
      <PeaceTableColumn label="简码"
                        min-width="160px"
                        prop="abbreviation">
      </PeaceTableColumn>
      <PeaceTableColumn label="组套类型"
                        min-width="80px"
                        prop="typeText">
      </PeaceTableColumn>
      <PeaceTableColumn label="执行科室"
                        prop="deptName"
                        min-width="100px ">
      </PeaceTableColumn>
      <PeaceTableColumn label="状态"
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
      <PeaceTableColumn label="操作"
                        min-width="100"
                        fixed="right">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="edit('edit',scope.row)">编辑</el-button>

        </template>
      </PeaceTableColumn>
    </PeaceTable>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="addModelDialog.visible"
                  :title="addModelDialog.type==='add'?'新建组套':'修改组套'"
                  v-if="addModelDialog.visible"
                  append-to-body
                  width="576px">
      <AddGroupDictionary v-bind:info="addModelDialog.data"
                          v-bind:type="addModelDialog.type"
                          v-on:complete="complete"
                          v-on:cancel="cancel" />
    </peace-dialog>
  </div>
</template>

<script>
import Service from '../service'
import AddGroupDictionary from './AddGroupDictionary'
export default {
  components: { AddGroupDictionary },
  data() {
    return {
      model: {
        comboNo: '',
        comboName: '',
        deptId: '',
        status: ''
      },
      source: {
        status: [
          { label: '启用', value: 'yes' },
          { label: '停用', value: 'no' }
        ],
        dept: []
      },
      addModelDialog: {
        visible: false,
        data: {},
        type: 'add'
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
      const fetch = Service.getCheckComboList
      this.$refs.table.reloadData({ fetch, params })
    },
    add(type, data) {
      this.addModelDialog.visible = true
      this.addModelDialog.type = type
      this.addModelDialog.data = data
    },
    modify(row) {
      const params = { comboNo: row.comboNo, status: row.status }
      if (row.status == 'no') {
        this.$confirm('停用组套后当前项目不可开具检验单，是否继续停用？', '提示', { closeOnClickModal: false })
          .then(() => {
            Service.operateCheckComboStatus(params)
              .then((res) => {
                Peace.util.success(res.msg)
                this.fetch()
              })
              .catch(() => {
                row.status = row.status === 'no' ? 'yes' : 'no'
              })
          })
          .catch(() => {
            row.status = row.status === 'no' ? 'yes' : 'no'
          })
      } else {
        Service.operateCheckComboStatus(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.fetch()
          })
          .catch(() => {
            row.status = row.status === 'yes' ? 'no' : 'yes'
          })
      }
    },
    edit(type, data) {
      this.addModelDialog.visible = true
      this.addModelDialog.type = type
      this.addModelDialog.data = data
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
::v-deep .el-divider--horizontal {
  margin: 0 0 24px 0;
}
</style>