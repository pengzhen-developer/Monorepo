<template>
  <div class="card">
    <el-form inline
             label-suffix="："
             v-on:keyup.enter.native="fetch"
             v-on:submit.native.prevent
             v-bind:model="model"
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
      <PeaceTableColumn label="项目编码"
                        prop="itemNo"
                        min-width="160px"></PeaceTableColumn>
      <PeaceTableColumn label="项目名称"
                        prop="itemName"
                        min-width="180px"></PeaceTableColumn>
      <PeaceTableColumn label="简码"
                        min-width="160px"
                        prop="abbreviation">
      </PeaceTableColumn>
      <PeaceTableColumn label="单价"
                        min-width="80px"
                        prop="price">
      </PeaceTableColumn>
      <PeaceTableColumn label="单位"
                        prop="unit"
                        min-width="80px ">
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
      <PeaceTableColumn label="创建时间"
                        prop="createdTime"
                        min-width="200px"></PeaceTableColumn>
      <PeaceTableColumn label="更新时间"
                        prop="updatedTime"
                        min-width="200px"></PeaceTableColumn>
      <PeaceTableColumn label="操作"
                        min-width="100"
                        fixed="right">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="edit('edit',scope.row)">修改</el-button>

        </template>
      </PeaceTableColumn>
    </PeaceTable>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="addModelDialog.visible"
                  :title="addModelDialog.type==='add'?'新建项目':'修改项目'"
                  v-if="addModelDialog.visible"
                  append-to-body
                  width="576px">
      <AddItemDictionary v-bind:info="addModelDialog.data"
                         v-bind:type="addModelDialog.type"
                         v-on:complete="complete"
                         v-on:cancel="cancel" />
    </peace-dialog>
  </div>
</template>

<script>
import Service from '../service'
import AddItemDictionary from './AddItemDictionary'
export default {
  components: { AddItemDictionary },
  data() {
    return {
      model: {
        itemNo: '',
        itemName: '',
        status: ''
      },
      source: {
        status: [
          { label: '启用', value: 'yes' },
          { label: '停用', value: 'no' }
        ]
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
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getCheckItemList
      this.$refs.table.reloadData({ fetch, params })

      Peace.a = this.$refs.table
    },
    add(type, data) {
      this.addModelDialog.visible = true
      this.addModelDialog.type = type
      this.addModelDialog.data = data
    },
    modify(row) {
      const params = { itemNo: row.itemNo, status: row.status }
      if (row.status == 'no') {
        this.$confirm('停用项目后当前项目不可开具检验单，是否继续停用？', '提示', { closeOnClickModal: false })
          .then(() => {
            Service.operateStatus(params)
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
        Service.operateStatus(params)
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