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
                   v-on:click="edit">修改</el-button>
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
        <PeaceTableColumn label="剂型"
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="抗菌药物属性"
                          prop="hospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn label="注射剂"
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
                       v-on:click="editItem(scope.row)">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="addDialog.visible"
                 width="445px"
                 v-bind:visible.sync="addDialog.visible"
                 title="修改">
      <EidtInjectionDrugProperitiesDialog v-bind:data="addDialog.itemData"
                                          v-on:onSuccess="addSuccess"
                                          v-on:onClose="onClose"></EidtInjectionDrugProperitiesDialog>
    </PeaceDialog>

  </div>
</template>

<script>
import EidtInjectionDrugProperitiesDialog from './components/EidtInjectionDrugProperitiesDialog'

export default {
  name: 'InjectionDrugProperities',

  components: {
    EidtInjectionDrugProperitiesDialog
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
      this.addDialog.itemData = null
      this.addDialog.visible = true
    },
    // 关闭
    onClose() {
      this.addDialog.visible = false
    },
    //新增成功
    addSuccess() {
      this.addDialog.visible = false
      this.get()
    }
  }
}
</script>

<style lang="scss" scoped></style>
