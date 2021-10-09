<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model"
               label-width="auto">

        <el-form-item label="系统编码">
          <peace-input placeholder="请输入"
                       v-model.trim="model.code"></peace-input>
        </el-form-item>

        <el-form-item label="给药频次">
          <peace-input placeholder="请输入"
                       v-model.trim="model.name"></peace-input>
        </el-form-item>

        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="add">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination>

        <PeaceTableColumn label="系统编码"
                          prop="code"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="频次名称"
                          prop="name"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn label="缩写"
                          prop="abbreviation"
                          min-width="150px"></PeaceTableColumn>
        <PeaceTableColumn label="服用频次"
                          prop="frequency"
                          min-width="150px"></PeaceTableColumn>

        <PeaceTableColumn label="服用间隔"
                          prop="duration"
                          min-width="150px"></PeaceTableColumn>
        <PeaceTableColumn label="备注"
                          prop="remarks"
                          min-width="200px"></PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="90px;">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="edit(scope.row)">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <AddFrequency v-model="addDialog.visible"
                  v-if="addDialog.visible"
                  v-bind:isEdit="addDialog.isEdit"
                  v-bind:data="addDialog.data"
                  v-on:refresh="fetch"></AddFrequency>

  </div>
</template>

<script>
import AddFrequency from './components/AddFrequency'
import Service from './service'

export default {
  name: 'AdministrationFrequency',

  components: { AddFrequency },

  data() {
    return {
      model: {
        name: '',
        code: ''
      },
      addDialog: {
        visible: false,
        isEdit: false,
        data: {}
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
      const fetch = Service.getPlatformUseDrugFrequencyPage
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },

    add() {
      this.addDialog.data = {}
      this.addDialog.isEdit = false
      this.addDialog.visible = true
    },
    edit(res) {
      this.addDialog.data = res
      this.addDialog.isEdit = true
      this.addDialog.visible = true
    }
  }
}
</script>

<style>
</style>