<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               v-bind:model="model">
        <el-form-item label="药品名称"
                      prop="drugName">
          <el-input clearable
                    placeholder="请输入"
                    v-model.trim="model.drugName"></el-input>
        </el-form-item>

        <el-form-item label="药品类别"
                      prop="drugAttr">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.drugAttr">
            <el-option v-for="item in source.listDrugAttrEnum"
                       v-bind:key="item.code"
                       v-bind:label="item.msg"
                       v-bind:value="item.code"></el-option>
          </el-select>
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
          <PeaceTableColumn label="平台药品编码"
                            prop="platformDrugCode"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            prop="drugName"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="药品类别"
                            prop="drugAttr"
                            min-width="180">
            <template slot-scope="scope">
              {{ formatDrugAttr(scope.row.drugAttr) || '--' }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            prop="updateTime"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            width="120">
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
                 v-bind:model="dialog.model">
          <el-form-item label="平台药品编码"
                        prop="platformDrugCode">
            <span>{{ dialog.model.platformDrugCode }}</span>
          </el-form-item>
          <el-form-item label="药品名称"
                        prop="drugName">
            <span>{{ dialog.model.drugName }}</span>
          </el-form-item>
          <el-form-item label="药品类别"
                        prop="drugAttr">
            <el-select class="full-width"
                       clearable
                       placeholder="请选择"
                       v-model="dialog.model.drugAttr">
              <el-option v-for="item in source.listDrugAttrEnum"
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
        drugName: '',
        times: []
      },

      source: {
        listDrugAttrEnum: []
      },

      dialog: {
        visible: false,

        title: '',

        model: {}
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
      this.source.listDrugAttrEnum = (await Service.platformDrugBaseInfo.listDrugAttrEnum()).data
    },

    fetch() {
      const fetch = Service.platformDrugBaseInfo.pageAnaesthesiaAndSpirit
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    formatDrugAttr(code) {
      return this.source.listDrugAttrEnum.find((item) => item.code === code)?.msg
    },

    async edit(row) {
      this.dialog.visible = true
      this.dialog.title = '修改'
      this.dialog.model = (await Service.platformDrugBaseInfo.getBaseAndExtInfoById({ id: row.id })).data
    },

    save() {
      this.$refs.form.validate().then(() => {
        Service.platformDrugBaseInfo.updatePlatformDrugExtInfo({ id: this.dialog.model.id, drugAttr: this.dialog.model.drugAttr }).then(() => {
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