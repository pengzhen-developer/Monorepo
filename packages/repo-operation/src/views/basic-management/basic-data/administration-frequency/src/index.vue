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
                       v-model.trim="model.DrugStandardCode"></peace-input>
        </el-form-item>

        <el-form-item label="给药频次">
          <peace-input placeholder="请输入"
                       v-model.trim="model.ProductName"></peace-input>
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
                          prop="DrugStandardCode"
                          min-width="130px"></PeaceTableColumn>
        <PeaceTableColumn label="频次名称"
                          prop="ProductName"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn label="缩写"
                          prop="DrugSpecifications"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="服用频次"
                          prop="EnterpriseChineseName"
                          min-width="200px"></PeaceTableColumn>

        <PeaceTableColumn label="服用间隔"
                          prop="packaging_specifications"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="备注"
                          prop="ApprovalNo"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="90px;">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDrugDetail(scope.row)">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <AddFrequency v-model="addDialog.visible"
                  v-if="addDialog.visible"
                  v-bind:isEdit="addDialog.isEdit"
                  v-on:refresh="fetch"></AddFrequency>

  </div>
</template>

<script>
import AddFrequency from './components/AddFrequency'

export default {
  name: 'AdministrationFrequency',

  components: { AddFrequency },

  data() {
    return {
      model: {},
      addDialog: {
        visible: false,
        isEdit: false,
        data: {}
      }
    }
  },

  methods: {
    add() {
      this.addDialog.isEdit = false
      this.addDialog.visible = true
    }
  }
}
</script>

<style>
</style>