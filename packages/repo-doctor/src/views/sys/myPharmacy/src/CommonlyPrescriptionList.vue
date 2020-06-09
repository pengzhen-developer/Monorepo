<template>
  <div>
    <el-form inline=""
             v-bind:model="model"
             v-on:keyup.enter.native="getCommonlyPrescriptionList">
      <el-form-item label=临床诊断>
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary"
                   icon="el-icon-search"
                   v-on:click="getCommonlyPrescriptionList">查询</el-button>
      </el-form-item>

      <br>

      <el-form-item label="">
        <el-button type="primary"
                   icon="el-icon-circle-plus-outline"
                   v-on:click="addCommonlyPrescription">添加处方</el-button>
      </el-form-item>
    </el-form>

    <hr>

    <peace-table pagination
                 ref="table">
      <peace-table-column label="疾病诊断"
                          min-width="200px"
                          prop="diagnosis"></peace-table-column>

      <peace-table-column label="性别"
                          prop="sex"></peace-table-column>
      <peace-table-column label="年龄"
                          width="200px"
                          prop="age"></peace-table-column>
      <peace-table-column align="left"
                          label="处方药品"
                          min-width="300px"
                          prop="drugjson">
        <template slot-scope="scope">
          <div v-for="drug in scope.row.drugList"
               v-bind:key="drug.durgId"
               class="q-mb-sm">
            <div>
              <el-tag class="q-mr-sm"
                      effect="dark"
                      type="warning"
                      v-if="drug.drugStatus === 'disable'">停用</el-tag>
              <span class="text-weight-bold">{{ drug.drugName }}</span>
            </div>
            <span>用法用量：</span>
            <span>每次{{ drug.singleDose }}{{ drug.drugUnit }}</span>
            <span>，{{ drug.drugFrequency }}</span>
            <span>，{{ drug.drugRoute }}</span>
            <span v-if="drug.useDrugDays">，{{ drug.useDrugDays }}天</span>
          </div>
        </template>
      </peace-table-column>
      <peace-table-column :show-overflow-tooltip="false"
                          fixed="right"
                          label="操作"
                          width="180px">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="showCommonlyPrescription(scope.row)">查看详情</el-button>
          <el-button type="text"
                     v-on:click="editCommonlyPrescription(scope.row)">修改</el-button>
          <el-button type="text"
                     v-on:click="removeCommonlyPrescription(scope.row)">删除</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <peace-dialog title="添加处方"
                  v-if="addDialog.visible"
                  v-bind:visible.sync="addDialog.visible">
      <CommonlyPrescriptionAdd v-bind:data="addDialog.data"
                               v-on:success="onAddSuccess"
                               v-on:cancel="onAddCancel"></CommonlyPrescriptionAdd>
    </peace-dialog>

    <peace-dialog title="处方详情"
                  v-if="detailedlyDialog.visible"
                  v-bind:visible.sync="detailedlyDialog.visible">
      <CommonlyPrescriptionAdd detailedly
                               v-bind:data="detailedlyDialog.data"></CommonlyPrescriptionAdd>
    </peace-dialog>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './../service'

import CommonlyPrescriptionAdd from './CommonlyPrescriptionAdd'

export default {
  components: {
    CommonlyPrescriptionAdd
  },

  data() {
    return {
      model: {},

      addDialog: {
        visible: false,
        data: {}
      },

      detailedlyDialog: {
        visible: false,
        data: {}
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getCommonlyPrescriptionList()
    })
  },

  methods: {
    getCommonlyPrescriptionList() {
      const fetch = Service.getCommonlyPrescriptionList
      const params = this.model

      this.$refs.table.loadData({ fetch, params })
    },

    showCommonlyPrescription(row) {
      this.detailedlyDialog.visible = true

      this.detailedlyDialog.data = Peace.util.deepClone(row)
    },

    addCommonlyPrescription() {
      this.addDialog.visible = true

      this.addDialog.data = {}
    },

    editCommonlyPrescription(row) {
      this.addDialog.visible = true

      this.addDialog.data = Peace.util.deepClone(row)
    },

    removeCommonlyPrescription(row) {
      Peace.util.confirm('确认删除此处方吗？', '提示', {}, () => {
        Service.removeCommonlyPrescription(row).then((res) => {
          Peace.util.success(res.msg)
          this.getCommonlyPrescriptionList()
        })
      })
    },

    onAddSuccess() {
      this.addDialog.visible = false

      this.getCommonlyPrescriptionList()
    },

    onAddCancel() {
      this.addDialog.visible = false
    }
  }
}
</script>

<style>
</style>