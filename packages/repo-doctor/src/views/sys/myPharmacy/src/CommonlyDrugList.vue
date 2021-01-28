<template>
  <div>
    <el-form inline>
      <el-form-item label=" ">
        <el-button type="primary"
                   icon="el-icon-circle-plus-outline"
                   v-on:click="addCommonlyDrug">添加药品</el-button>
      </el-form-item>
    </el-form>

    <hr>

    <PeaceTable pagination
                ref="table">
      <PeaceTableColumn type="index"
                        width="60px"
                        label="序号"></PeaceTableColumn>
      <PeaceTableColumn width="60px">
        <template slot-scope="scope">
          <el-tag effect="dark"
                  type="warning"
                  v-if="scope.row.drugStatus === 'disable'">停用</el-tag>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="药品名称"
                        min-width="200"
                        align="left"
                        prop="drugName"> </PeaceTableColumn>
      <PeaceTableColumn label="药品规格"
                        prop="specification"></PeaceTableColumn>
      <PeaceTableColumn label="厂家"
                        min-width="200"
                        prop="companyName"></PeaceTableColumn>
      <PeaceTableColumn label="添加时间"
                        prop="createdTime"
                        width="160"></PeaceTableColumn>
      <PeaceTableColumn fixed="right"
                        label="操作"
                        width="150">
        <template slot-scope="scope">
          <el-button @click="showInstructionsList(scope.row)"
                     type="text">查看说明书</el-button>
          <el-button @click="removeCommonlyDrug(scope.row)"
                     type="text">删除</el-button>
        </template>
      </PeaceTableColumn>
    </PeaceTable>

    <peace-dialog title="添加药品"
                  v-if="addCommonlyDrugDialog.visible"
                  v-bind:visible.sync="addCommonlyDrugDialog.visible">
      <CommonlyDrugAdd v-on:success="onCommonlyDrugAddSuccess"></CommonlyDrugAdd>
    </peace-dialog>

    <peace-dialog title="药品说明书列表"
                  width="800px"
                  v-if="instructionsListDialog.visible"
                  v-bind:visible.sync="instructionsListDialog.visible">
      <DrugInstructionsList v-on:showInstructions="showInstructions"
                            v-bind:data="instructionsListDialog.data"></DrugInstructionsList>
    </peace-dialog>

    <peace-dialog title="药品说明书"
                  v-if="instructionsDialog.visible"
                  v-bind:visible.sync="instructionsDialog.visible">
      <DrugInstructions v-bind:data="instructionsDialog.data"></DrugInstructions>
    </peace-dialog>

  </div>
</template>

<script>
import Service from './../service'

import CommonlyDrugAdd from './CommonlyDrugAdd'
import DrugInstructions from './DrugInstructions'
import DrugInstructionsList from './DrugInstructionsList'

export default {
  components: {
    CommonlyDrugAdd,
    DrugInstructions,
    DrugInstructionsList
  },

  data() {
    return {
      addCommonlyDrugDialog: {
        visible: false
      },

      instructionsListDialog: {
        visible: false,
        data: []
      },

      instructionsDialog: {
        visible: false,
        data: {}
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getCommonlyDrugList()
    })
  },

  methods: {
    getCommonlyDrugList() {
      const fetch = Service.getCommonlyDrugList

      this.$refs.table.loadData({ fetch })
    },

    showInstructionsList(row) {
      const params = {
        name: row.drugName,
        factory: row.companyName
      }

      Service.getDrugBookList(params).then((res) => {
        if (res.data?.length === 1) {
          // 只有 1 条，直接跳转详情
          this.showInstructions(res.data[0])
        } else if (res.data?.length > 1) {
          this.instructionsListDialog.visible = true
          this.instructionsListDialog.data = res.data
        } else {
          Peace.util.warning('没有查询到药品相关说明书！')
        }
      })
    },

    showInstructions(row) {
      const params = {
        pzwh: row.pzwh
      }

      Service.getDrugbookinfo(params).then((res) => {
        this.instructionsListDialog.visible = false

        this.instructionsDialog.visible = true
        this.instructionsDialog.data = res.data
      })
    },

    addCommonlyDrug() {
      this.addCommonlyDrugDialog.visible = true
    },

    onCommonlyDrugAddSuccess() {
      this.addCommonlyDrugDialog.visible = false

      this.getCommonlyDrugList()
    },

    removeCommonlyDrug(row) {
      Peace.util.confirm('确认删除此药品吗？', '提示', {}, () => {
        const params = {
          drugId: row.drugId
        }

        Service.removeCommonlyDrug(params).then((res) => {
          Peace.util.success(res.msg)

          this.getCommonlyDrugList()
        })
      })
    }
  }
}
</script>

<style>
</style>