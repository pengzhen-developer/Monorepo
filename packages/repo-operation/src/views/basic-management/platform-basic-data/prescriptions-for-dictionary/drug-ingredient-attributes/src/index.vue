<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="药品名称">
          <el-input v-model.trim="model.drugName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <PeaceDatePicker type="daterange"
                           v-model="pickDate"
                           value-format="yyyy-MM-dd"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="平台药品编码"
                          width="150px"
                          prop="platformDrugCode">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          width="200px"
                          show-overflow-tooltip
                          prop="drugName">
        </PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          show-overflow-tooltip
                          prop="drugSpecifications">
          <template slot-scope="scope">
            {{scope.row.drugSpecifications||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          show-overflow-tooltip
                          prop="enterpriseCnName">
          <template slot-scope="scope">
            {{scope.row.enterpriseCnName||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品成分"
                          show-overflow-tooltip
                          prop="ingredient">
          <template slot-scope="scope">
            {{scope.row.ingredient||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          width="180px"
                          prop="updateTime">
        </PeaceTableColumn>

        <PeaceTableColumn width="150px"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="editItem(scope.row)">编辑</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="addDialog.visible"
                 width="500px"
                 v-bind:visible.sync="addDialog.visible"
                 title="编辑药品成分">
      <EditDrugIngredientAttributesDialog v-bind:data="addDialog.itemData"
                                          v-on:onSuccess="addSuccess"
                                          v-on:onClose="addDialog.visible = false"></EditDrugIngredientAttributesDialog>
    </PeaceDialog>

  </div>
</template>

<script>
import EditDrugIngredientAttributesDialog from './components/EditDrugIngredientAttributesDialog'
import Service from './service'

export default {
  name: 'DrugIngredientAttributes',

  components: {
    EditDrugIngredientAttributesDialog
  },

  data() {
    return {
      model: {
        drugName: '',
        beginTime: '',
        endTime: ''
      },
      pickDate: [],
      addDialog: {
        visible: false,
        itemData: {}
      }
    }
  },

  watch: {
    pickDate(value) {
      this.model.beginTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.platformDrugIngredientPage
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    // 修改
    editItem(row) {
      this.addDialog.itemData = row
      this.addDialog.visible = true
    },

    addSuccess() {
      this.addDialog.visible = false
      this.get()
    }
  }
}
</script>

<style lang="scss" scoped></style>
