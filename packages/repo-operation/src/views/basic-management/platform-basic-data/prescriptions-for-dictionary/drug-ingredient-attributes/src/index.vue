<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="药品名称">
          <el-input v-model.trim="model.hospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <PeaceDatePicker type="daterange"
                           v-model="model.pickDate"
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
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="edit">编辑</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="平台药品编码"
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          prop="hospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品成分"
                          prop="hospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="hospitalName">
        </PeaceTableColumn>

        <PeaceTableColumn width="240px"
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
                                          v-on:onClose="onClose"></EditDrugIngredientAttributesDialog>
    </PeaceDialog>

  </div>
</template>

<script>
import EditDrugIngredientAttributesDialog from './components/EditDrugIngredientAttributesDialog'

export default {
  name: 'DrugIngredientAttributes',

  components: {
    EditDrugIngredientAttributesDialog
  },

  data() {
    return {
      model: {
        hospitalName: '',
        orgType: '',
        serviceType: []
      },
      addDialog: {
        visible: false,
        itemData: {}
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {},

    // 修改
    editItem(row) {
      this.addDialog.itemData = row
      this.addDialog.visible = true
    },

    edit() {
      this.addDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
