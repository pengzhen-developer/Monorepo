<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               v-bind:model="model">
        <el-form-item label="成分名称"
                      prop="component">
          <el-input clearable
                    placeholder="请输入"
                    v-model.trim="model.component"></el-input>
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
      <div class="q-mb-md">
        <el-button type="primary"
                   v-on:click="add">新增</el-button>
      </div>

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
          <PeaceTableColumn label="系统编码"
                            prop="code"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="成分名称"
                            prop="componentCode"
                            min-width="180">
            <template slot-scope="scope">
              {{ formatComponentCode(scope.row.componentCode) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="哺乳期用药级别"
                            prop="grade"
                            min-width="180">
            <template slot-scope="scope">
              {{ formatLactationInfoEnum(scope.row.grade) }}
            </template>
          </PeaceTableColumn>
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
          <el-form-item v-if="dialog.model.id"
                        label="系统编码"
                        prop="code">
            <span>{{ dialog.model.code }}</span>
          </el-form-item>
          <el-form-item label="成分名称"
                        prop="componentCode">
            <el-select class="full-width"
                       clearable
                       filterable
                       placeholder="请选择"
                       v-model="dialog.model.componentCode">
              <el-option v-for="item in source.listPlatformDrugChemicalCompositionEnum"
                         v-bind:key="item.code"
                         v-bind:label="item.cnName"
                         v-bind:value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="哺乳期用药级别"
                        prop="grade">
            <el-select class="full-width"
                       clearable
                       filterable
                       placeholder="请选择"
                       v-model="dialog.model.grade">
              <el-option v-for="item in source.listLactationInfoEnum"
                         v-bind:key="item.code"
                         v-bind:label="item.msg"
                         v-bind:value="item.code"></el-option>
            </el-select>
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
        component: '',
        times: []
      },

      source: {
        listLactationInfoEnum: [],
        listPlatformDrugChemicalCompositionEnum: []
      },

      dialog: {
        visible: false,

        title: '',

        model: {},

        rules: {
          componentCode: [{ required: true, message: '请选择成分名称' }],
          grade: [{ required: true, message: '请选择哺乳期用药级别' }]
        }
      }
    }
  },

  watch: {
    'model.times'(timeRange) {
      this.model.beginTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
    }
  },

  mounted() {
    this.$nextTick().then(async () => {
      await this.getDictionary()
      await this.fetch()
    })
  },

  methods: {
    async getDictionary() {
      this.source.listLactationInfoEnum = (await Service.listLactationInfoEnum.GET()).data
      this.source.listPlatformDrugChemicalCompositionEnum = (await Service.platformDrugChemicalComposition.listAll({ cnName: '' })).data
    },

    formatComponentCode(code) {
      return this.source.listPlatformDrugChemicalCompositionEnum.find((item) => item.code === code)?.cnName
    },

    formatLactationInfoEnum(code) {
      return this.source.listLactationInfoEnum.find((item) => item.code === code)?.msg
    },

    fetch() {
      const fetch = Service.platformLactationInfo.page
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    add() {
      this.dialog.visible = true
      this.dialog.title = '新增哺乳期用药级别'
      this.dialog.model = {}
    },

    async edit(row) {
      this.dialog.visible = true
      this.dialog.title = '修改哺乳期用药级别'
      this.dialog.model = (await Service.platformLactationInfo.GET({ id: row.id })).data
    },

    save() {
      this.$refs.form.validate().then(() => {
        if (this.dialog.model.id) {
          Service.platformLactationInfo.PUT(this.dialog.model).then(() => {
            Peace.util.success('保存成功')

            this.cancel()
            this.fetch()
          })
        } else {
          Service.platformLactationInfo.POST(this.dialog.model).then(() => {
            Peace.util.success('保存成功')

            this.cancel()
            this.fetch()
          })
        }
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