<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               v-bind:model="model">
        <el-form-item label="剂型名称"
                      prop="name">
          <el-input clearable
                    placeholder="请输入"
                    v-model.trim="model.name"></el-input>
        </el-form-item>

        <el-form-item label="更新时间"
                      prop="times">
          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="yyyy-MM-dd"
                           v-model.trim="model.times"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="card">
      <div>
        <PeaceTable ref="table"
                    pagination>
          <PeaceTableColumn label="序号"
                            type="index"
                            width="80px">
            <template slot-scope="{ $index, _self }">
              {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="剂型编码"
                            prop="code"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="剂型名称"
                            prop="name"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            prop="updateTime"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            width="120"
                            fixed="right">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="edit(scope.row)">修改</el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>
    </div>

    <PeaceDialog width="376px"
                 v-if="dialog.visible"
                 v-on:close="cancel"
                 v-bind:visible.sync="dialog.visible"
                 v-bind:model="dialog.model"
                 v-bind:title="dialog.title">
      <div class="q-px-md">
        <el-form ref="form"
                 label-width="auto"
                 label-suffix="："
                 v-on:submit.native.prevent
                 v-on:keyup.enter.native="save"
                 v-bind:model="dialog.model"
                 v-bind:rules="dialog.rules">
          <el-form-item label="剂型编码"
                        prop="code">
            <span>{{ dialog.model.code }}</span>
          </el-form-item>
          <el-form-item label="剂型名称"
                        prop="name">
            <el-input placeholder="请输入"
                      v-model="dialog.model.name"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save">保存</el-button>
      </div>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      model: {
        name: '',
        times: []
      },

      source: {
        dictionary: []
      },

      dialog: {
        visible: false,

        title: '',

        model: {},

        rules: {
          name: [{ required: true, message: '请输入剂型名称' }]
        }
      }
    }
  },

  watch: {
    'model.times': {
      handler(timeRange) {
        this.model.beginTime = timeRange?.[0] ?? ''
        this.model.endTime = timeRange?.[1] ?? ''
      },
      immediate: true
    }
  },

  mounted() {
    this.$nextTick().then(async () => {
      await this.getDictionary()
      await this.fetch()
    })
  },

  methods: {
    async getDictionary() {},

    fetch() {
      const fetch = Service.platformDosageForm.page
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    async edit(row) {
      this.dialog.visible = true
      this.dialog.title = '修改'
      this.dialog.model = (await Service.platformDosageForm.GET({ id: row.id })).data
    },

    save() {
      this.$refs.form.validate().then(() => {
        Service.platformDosageForm.PUT(this.dialog.model).then(() => {
          Peace.util.success('保存成功')

          this.cancel()
          this.fetch()
        })
      })
    },

    cancel() {
      this.dialog.visible = false
      this.dialog.title = ''
      this.dialog.model = {}
    }
  }
}
</script>

<style>
</style>