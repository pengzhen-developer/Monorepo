<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="dictModel">
        <el-form-item label="字典类型">
          <el-input v-model="dictModel.type"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="字典描述">
          <el-input v-model="dictModel.description"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="fetchDict">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <div class="q-mb-sm">
        <el-button style="min-width: 80px;"
                   v-on:click="addDict">新增</el-button>
      </div>

      <PeaceTable ref="dictTable"
                  pagination
                  v-bind:data="[{}]">
        <PeaceTableColumn label="dictId"
                          prop="id"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="字典类型"></PeaceTableColumn>
        <PeaceTableColumn label="字典描述"></PeaceTableColumn>
        <PeaceTableColumn label="备注"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120px">
          <template>
            <el-button type="text"
                       v-on:click="editDict">编辑</el-button>
            <el-button type="text"
                       v-on:click="showDictItem">详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <div class="card q-mb-md"
         v-if="dictItemModel.visible">
      <div class="q-mb-sm">
        <el-button style="min-width: 80px;"
                   v-on:click="addDictItem">新增</el-button>
      </div>

      <PeaceTable ref="dictItemTable"
                  pagination
                  v-bind:data="[{}, {}, {}]">
        <PeaceTableColumn label="dictId"
                          prop="dictId"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="label"></PeaceTableColumn>
        <PeaceTableColumn label="value"></PeaceTableColumn>
        <PeaceTableColumn label="字典描述"></PeaceTableColumn>
        <PeaceTableColumn label="备注"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120px">
          <template>
            <el-button type="text"
                       v-on:click="editDictItem">编辑</el-button>
            <el-button type="text"
                       v-on:click="deleteDictItem">删除</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="字典维护"
                 width="360px"
                 v-if="dictDialog.visible"
                 v-bind:visible.sync="dictDialog.visible">
      <el-form ref="dictForm"
               label-width="auto"
               v-bind:model="dictDialog.model"
               v-bind:rules="dictDialog.rules">
        <el-form-item label="字典类型"
                      prop="type">
          <el-input v-model="dictDialog.model.type"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="字典描述"
                      prop="description">
          <el-input v-model="dictDialog.model.description"
                    placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="dictDialog.model.remarks"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button style="min-width: 80px"
                   type=""
                   v-on:click="closeDictDialog">取消</el-button>
        <el-button style="min-width: 80px"
                   type="primary"
                   v-on:click="saveDict">保存</el-button>
      </div>
    </PeaceDialog>

    <PeaceDialog title="字典项维护"
                 width="360px"
                 v-if="dictItemDialog.visible"
                 v-bind:visible.sync="dictItemDialog.visible">
      <el-form ref="dictFormItem"
               label-width="auto"
               v-bind:model="dictItemDialog.model"
               v-bind:rules="dictItemDialog.rules">
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
export default {
  name: 'DictionaryManager',

  data() {
    return {
      showDetail: false,

      dictModel: {
        type: '',
        description: ''
      },

      dictItemModel: {
        visible: false
      },

      dictDialog: {
        visible: false,

        model: {
          id: '',
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
          id: '',
          dictId: '',
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
    this.$nextTick().then(() => this.fetchDict())
  },

  methods: {
    fetchDict() {
      // 查询字典类型时，隐藏字典项
      this.dictItemModel.visible = false

      const fetch = () => Peace.http.get('mock')
      const params = this.model

      this.$refs.dictTable.reloadData({ fetch, params })
    },

    fetchDictItem() {
      const fetch = () => Peace.http.get('mock')
      const params = this.model

      this.$refs.dictItemTable.reloadData({ fetch, params })
    },

    addDict() {
      this.showDictDialog()
    },

    editDict() {
      this.showDictDialog()
    },

    saveDict() {
      this.$refs.dictForm.validate(() => {
        if (this.dictDialog.model.id) {
          // edit
        } else {
          // add
        }
      })
    },

    showDictDialog() {
      this.dictDialog.visible = true
    },

    closeDictDialog() {
      this.dictDialog.visible = false
    },

    showDictItem() {
      this.dictItemModel.visible = true

      this.$nextTick().then(() => this.fetchDictItem())
    },

    addDictItem() {
      this.showDictItemDialog()
    },

    editDictItem() {
      this.showDictItemDialog()
    },

    deleteDictItem() {},

    saveDictItem() {
      this.$refs.dictFormItem.validate((valid) => {
        if (valid) {
          if (this.dictItemDialog.model.id) {
            // edit
          } else {
            // add
          }
        }
      })
    },

    showDictItemDialog() {
      this.dictItemDialog.visible = true
    },

    closeDictItemDialog() {
      this.dictItemDialog.visible = false
    }
  }
}
</script>

<style>
</style>