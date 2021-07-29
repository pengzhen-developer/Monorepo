<template>
  <div class="layout-route">

    <div class="card q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="dictTypeModel">
        <el-form-item label="字典类型">
          <el-input v-model="dictTypeModel.type"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="字典描述">
          <el-input v-model="dictTypeModel.description"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="fetchDictType">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="row q-col-gutter-md  bg-grey-2">

      <div class="col">
        <div class="card">

          <div class="q-mb-md">
            <el-button style="min-width: 80px;"
                       v-on:click="addDictType">新增</el-button>
          </div>

          <PeaceTable layout="pager"
                      v-bind:page-size="5"
                      ref="dictTypeTable"
                      v-bind:tableProps="{ pageIndex: 'current', pageSize: 'size' }"
                      @row-click="selectDict"
                      highlight-current-row
                      pagination>
            <PeaceTableColumn label="ID"
                              prop="id"
                              width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="字典类型"
                              prop="type"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="字典描述"
                              prop="description"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="备注"
                              prop="remarks"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="操作"
                              width="80px">
              <template slot-scope="scope">
                <el-button type="text"
                           v-on:click="editDictType(scope.row)">编辑</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>
      </div>

      <div class="col">
        <div class="card"
             v-if="dictItemList.visible">
          <div class="q-mb-md">
            <el-button style="min-width: 80px;"
                       v-on:click="addDictItem">新增</el-button>
          </div>

          <PeaceTable layout="pager"
                      v-bind:page-size="5"
                      ref="dictItemTable"
                      v-bind:tableProps="{ pageIndex: 'current', pageSize: 'size' }"
                      pagination>
            <PeaceTableColumn label="ID"
                              prop="id"
                              width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="label"
                              prop="label"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="value"
                              prop="value"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="字典描述"
                              prop="description"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="备注"
                              prop="remarks"
                              min-width="80px"></PeaceTableColumn>
            <PeaceTableColumn label="操作"
                              width="120px">
              <template slot-scope="scope">
                <el-button type="text"
                           v-on:click="editDictItem(scope.row)">编辑</el-button>
                <el-button type="text"
                           v-on:click="deleteDictItem(scope.row)">删除</el-button>
              </template>
            </PeaceTableColumn>
          </PeaceTable>
        </div>

        <div class="card q-mb-md"
             v-else>
          <div class="q-mb-md"></div>
          <p class="text-subtitle1 flex items-center content-center">
            点击查看明细
          </p>
          <p class="text-subtitle1 flex items-center content-center">
            👈
          </p>
        </div>
      </div>
    </div>

    <PeaceDialog title="字典类型维护"
                 width="360px"
                 v-if="dictTypeDialog.visible"
                 v-bind:visible.sync="dictTypeDialog.visible">
      <el-form ref="dictTypeForm"
               label-width="auto"
               v-bind:model="dictTypeDialog.model"
               v-bind:rules="dictTypeDialog.rules"
               label-suffix="：">
        <el-form-item label="字典类型"
                      prop="type">
          <el-input v-bind:disabled="dictTypeDialog.model.id !== null"
                    v-model="dictTypeDialog.model.type"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="字典描述"
                      prop="description">
          <el-input v-model="dictTypeDialog.model.description"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="dictTypeDialog.model.remarks"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button style="min-width: 80px"
                   type=""
                   v-on:click="closeDictTypeDialog">取消</el-button>
        <el-button style="min-width: 80px"
                   type="primary"
                   v-on:click="saveDictType">保存</el-button>
      </div>
    </PeaceDialog>

    <PeaceDialog title="字典项维护"
                 width="360px"
                 v-if="dictItemDialog.visible"
                 v-bind:visible.sync="dictItemDialog.visible">
      <el-form ref="dictItemForm"
               label-width="auto"
               v-bind:model="dictItemDialog.model"
               v-bind:rules="dictItemDialog.rules"
               label-suffix="：">
        <el-form-item label="label"
                      prop="label">
          <el-input v-model="dictItemDialog.model.label"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="value"
                      prop="label">
          <el-input v-model="dictItemDialog.model.value"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="字典项描述"
                      prop="description">
          <el-input v-model="dictItemDialog.model.description"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="dictItemDialog.model.remarks"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button style="min-width: 80px"
                   type=""
                   v-on:click="closeDictItemDialog">取消</el-button>
        <el-button style="min-width: 80px"
                   type="primary"
                   v-on:click="saveDictItem">保存</el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service/index'

export default {
  name: 'DictionaryManager',

  data() {
    return {
      dictTypeModel: {
        type: '',
        description: ''
      },

      dictItemList: {
        visible: false,
        dictId: '',
        type: ''
      },

      dictTypeDialog: {
        visible: false,

        model: {
          id: null,
          type: '',
          description: '',
          remarks: ''
        },

        rules: {
          type: [{ required: true, message: '字典类型必填' }],
          description: [{ required: true, message: '字典描述必填' }]
        }
      },

      dictItemDialog: {
        visible: false,

        model: {
          id: 0,
          dictId: '',
          type: '',
          label: '',
          value: '',
          description: '',
          remarks: ''
        },

        rules: {
          label: [{ required: true, message: 'label 必填' }],
          value: [{ required: true, message: 'value 必填' }],
          description: [{ required: true, message: '字典描述必填' }]
        }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.fetchDictType()
    })
  },

  methods: {
    // 查询字典类型
    fetchDictType() {
      // 查询字典类型时，隐藏字典项
      this.dictItemList.visible = false

      const params = this.dictTypeModel
      const fetch = Service.dict().pageType

      this.$refs.dictTypeTable.reloadData({ fetch, params })
    },
    // 查询
    fetchDictItem(dictId, type) {
      const fetch = Service.dict().pageItem
      const params = { dictId: dictId, type: type }

      this.$refs.dictItemTable.reloadData({ fetch, params })
    },

    addDictType() {
      this.showDictTypeDialog()
    },

    editDictType(item) {
      this.showDictTypeDialog(item)
    },

    showDictTypeDialog(item) {
      if (item && item.id) {
        this.dictTypeDialog.model = item
      } else {
        this.resetDictTypeDialog()
      }

      this.dictTypeDialog.visible = true
    },

    resetDictTypeDialog() {
      this.dictTypeDialog.model = {
        id: null,
        type: '',
        description: '',
        remarks: ''
      }
    },

    closeDictTypeDialog() {
      this.dictTypeDialog.visible = false
      this.resetDictTypeDialog()
    },

    saveDictType() {
      this.$refs.dictTypeForm.validate((valid) => {
        if (valid) {
          if (this.dictTypeDialog.model.id) {
            Service.dict()
              .editType(this.dictTypeDialog.model)
              .then((res) => {
                Peace.util.success(res.msg)
                this.closeDictTypeDialog()
                this.fetchDictType()
              })
          } else {
            Service.dict()
              .addType(this.dictTypeDialog.model)
              .then((res) => {
                Peace.util.success(res.msg)
                this.closeDictTypeDialog()
                this.fetchDictType()
              })
          }
        } else {
          return false
        }
      })
    },

    selectDict(row) {
      console.log(row)
      this.dictItemList.visible = true
      this.dictItemList.dictId = row.id
      this.dictItemList.type = row.type

      this.$nextTick().then(() => this.fetchDictItem(row.id, row.type))
    },

    addDictItem() {
      this.showDictItemDialog()
    },

    editDictItem(item) {
      this.showDictItemDialog(item)
    },

    showDictItemDialog(item) {
      if (item && item.id) {
        this.dictItemDialog.model = item
      } else {
        this.resetDictItemDialog()
      }

      this.dictItemDialog.visible = true
    },

    resetDictItemDialog() {
      this.dictItemDialog.model = {
        id: 0,
        dictId: this.dictItemList.dictId || '',
        type: this.dictItemList.type || '',
        label: '',
        value: '',
        description: '',
        remarks: ''
      }
    },

    closeDictItemDialog() {
      this.dictItemDialog.visible = false
      this.resetDictItemDialog()
    },
    deleteDictItem(item) {
      const params = { id: item.id }
      this.$confirm('确定删除吗？').then(() => {
        Service.dict()
          .deleteItem(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.fetchDictItem(this.dictItemList.dictId, this.dictItemList.type)
          })
      })
    },

    saveDictItem() {
      this.$refs.dictItemForm.validate((valid) => {
        if (valid) {
          if (this.dictItemDialog.model.id) {
            Service.dict()
              .editItem(this.dictItemDialog.model)
              .then((res) => {
                Peace.util.success(res.msg)
                this.closeDictItemDialog()
                this.fetchDictItem(this.dictItemList.dictId, this.dictItemList.type)
              })
          } else {
            Service.dict()
              .addItem(this.dictItemDialog.model)
              .then((res) => {
                Peace.util.success(res.msg)
                this.closeDictItemDialog()
                this.fetchDictItem(this.dictItemList.dictId, this.dictItemList.type)
              })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>