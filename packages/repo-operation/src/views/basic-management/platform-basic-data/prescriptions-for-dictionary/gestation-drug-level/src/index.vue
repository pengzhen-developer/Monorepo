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
                      prop="componentCode">
          <el-input maxlength="50"
                    clearable
                    placeholder="请输入"
                    v-model.trim="model.componentCode"></el-input>
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
                            min-width="120">
            <template slot-scope="scope">
              {{ formatComponentCode(scope.row.componentCode) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="妊娠期用药级别"
                            prop="grade"
                            min-width="140"></PeaceTableColumn>
          <PeaceTableColumn label="使用时间"
                            prop="useTime"
                            min-width="180">
            <template slot-scope="scope">
              {{ scope.row.useTime }} 周
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="给药途径"
                            prop="useDrugRoute"
                            min-width="120">
            <template slot-scope="scope">
              {{ formatUseDrugRoute(scope.row.useDrugRoute) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            prop="updateTime"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            width="80"
                            fixed="right">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="edit(scope.row)">修改</el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>
    </div>

    <PeaceDialog width="576px"
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
          <el-form-item v-if="dialog.model.id"
                        label="系统编码">
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
          <el-form-item label="妊娠期用药级别"
                        prop="grade">
            <el-select class="full-width"
                       clearable
                       placeholder="请选择"
                       v-model="dialog.model.grade">
              <el-option v-for="item in source.listGestationalInfoEnum"
                         v-bind:key="item.code"
                         v-bind:label="item.msg"
                         v-bind:value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用时间"
                        prop="useTimes">
            <div class="row">
              <div class="col">
                <el-select class="inline-block full-width"
                           clearable
                           filterable
                           placeholder="请选择"
                           v-model="dialog.model.useTime">
                  <el-option v-for="item in source.useTimes"
                             v-bind:key="item.value"
                             v-bind:label="item.label"
                             v-bind:value="item.value"></el-option>
                </el-select>
              </div>
              <div class="q-mx-sm">-</div>
              <div class="col">
                <el-select class="full-width"
                           clearable
                           filterable
                           placeholder="请选择"
                           v-model="dialog.model.useTimeSuffix">
                  <el-option v-for="item in source.useTimes"
                             v-bind:key="item.value"
                             v-bind:label="item.label"
                             v-bind:value="item.value"></el-option>
                </el-select>
              </div>
              <div class="q-ml-sm">周</div>
            </div>

          </el-form-item>
          <el-form-item label="给药途径"
                        prop="useDrugRoute">
            <el-select class="full-width"
                       clearable
                       filterable
                       placeholder="请选择"
                       v-model="dialog.model.useDrugRoute">
              <el-option v-for="item in source.listRouteEnum"
                         v-bind:key="item.code"
                         v-bind:label="item.name"
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
        componentCode: '',
        times: []
      },

      source: {
        useTimes: [],
        listRouteEnum: [],
        listGestationalInfoEnum: [],
        listPlatformDrugChemicalCompositionEnum: []
      },

      dialog: {
        visible: false,

        title: '',

        model: {},

        rules: {
          componentCode: [{ required: true, message: '请选择成分名称' }],
          grade: [{ required: true, message: '请选择妊娠期用药级别' }],
          useTimes: [
            {
              validator: (rule, value, callback) => {
                this.dialog.model.useTimes = [this.dialog.model.useTime, this.dialog.model.useTimeSuffix]

                if (Peace.validate.isEmail(this.dialog.model.useTime) || Peace.validate.isEmail(this.dialog.model.useTimeSuffix)) {
                  callback(new Error('请选择使用时间'))
                } else if (this.dialog.model.useTimeSuffix < this.dialog.model.useTime) {
                  callback(new Error('开始时间不能大于结束时间'))
                } else {
                  callback()
                }
              }
            },
            { required: true, message: ' 请选择使用时间' }
          ],
          useDrugRoute: [{ required: true, message: '请选择给药途径' }]
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
    async getDictionary() {
      this.source.useTimes = new Array(40).fill().map((item, index) => {
        return { label: (index + 1).toString(), value: (index + 1).toString() }
      })

      this.source.listRouteEnum = (await Service.platformUseDrugRoute.listRoute({ name: '' })).data
      this.source.listGestationalInfoEnum = (await Service.listGestationalInfoEnum.GET()).data
      this.source.listPlatformDrugChemicalCompositionEnum = (await Service.platformDrugChemicalComposition.listAll({ cnName: '' })).data
    },

    formatComponentCode(code) {
      return this.source.listPlatformDrugChemicalCompositionEnum.find((item) => item.code === code)?.cnName
    },

    formatUseDrugRoute(code) {
      return this.source.listRouteEnum.find((item) => item.code === code)?.name
    },

    fetch() {
      const fetch = Service.platformGestational.page
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    add() {
      this.dialog.visible = true
      this.dialog.title = '新增妊娠期用药级别'
      this.dialog.model = {}
    },

    async edit(row) {
      this.dialog.visible = true
      this.dialog.title = '修改妊娠期用药级别'
      this.dialog.model = (await Service.platformGestational.GET({ id: row.id })).data

      this.dialog.model.useTimes = [this.dialog.model.useTime, this.dialog.model.useTimeSuffix]
    },

    save() {
      this.$refs.form.validate().then(() => {
        if (this.dialog.model.id) {
          Service.platformGestational.PUT(this.dialog.model).then(() => {
            Peace.util.success('保存成功')

            this.cancel()
            this.fetch()
          })
        } else {
          Service.platformGestational.POST(this.dialog.model).then(() => {
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