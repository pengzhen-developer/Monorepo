<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               size="mini">

        <el-form-item label="药品名称">
          <PeaceInput v-model.trim="model.drugName"
                      maxlength="50"
                      placeholder="请输入"></PeaceInput>
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
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="主数据ID"
                          min-width="150px"
                          prop="skuId">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          min-width="150px"
                          prop="drugName">
        </PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          min-width="150px"
                          prop="drugSpecifications">
          <template slot-scope="scope">
            {{scope.row.drugSpecifications||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          min-width="200px"
                          prop="enterpriseCnName">
          <template slot-scope="scope">
            {{scope.row.enterpriseCnName||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品成分"
                          min-width="150px"
                          show-overflow-tooltip
                          prop="ingredient">
          <template slot-scope="scope">
            {{scope.row.ingredient||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="180px"
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
      this.fetch()
    })
  },

  methods: {
    fetch() {
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
      this.fetch()
    }
  }
}
</script>

<style lang="scss" >
.el-tooltip__popper {
  max-width: 1200px;
}
</style>
