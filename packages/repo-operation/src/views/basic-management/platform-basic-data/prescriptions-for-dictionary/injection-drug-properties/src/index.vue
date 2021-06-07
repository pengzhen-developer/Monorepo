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
                          min-width="150px"
                          prop="platformDrugCode">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          min-width="200px"
                          prop="drugName">
        </PeaceTableColumn>
        <PeaceTableColumn label="剂型"
                          min-width="100px"
                          prop="drugDosageForm">
          <template slot-scope="scope">
            {{scope.row.drugDosageForm||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="抗菌药物属性"
                          min-width="150px"
                          prop="antiLevel">
          <template slot-scope="scope">
            {{scope.row.antiLevel | getLabel(source.ATTRIBUTES_TAYPES)}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="注射剂"
                          min-width="100px"
                          prop="isInjection">
          <template slot-scope="scope">
            {{scope.row.isInjection == "yes" ? "是":"否"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="150px"
                          prop="updateTime">
        </PeaceTableColumn>

        <PeaceTableColumn width="150px"
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
                 width="550px"
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
import Service from './service'

export default {
  name: 'InjectionDrugProperities',

  components: {
    EidtInjectionDrugProperitiesDialog
  },

  data() {
    return {
      model: {
        beginTime: '',
        drugName: '',
        endTime: ''
      },
      pickDate: [],
      source: {
        ATTRIBUTES_TAYPES: []
      },
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
  filters: {
    getLabel: function(value, list) {
      const labelData = list?.find((item) => item.value == value)?.label
      return labelData == undefined ? '——' : labelData
    }
  },

  async created() {
    this.source.ATTRIBUTES_TAYPES = await Peace.identity.dictionary.getList('antiLevel')
    this.get()
  },

  methods: {
    get() {
      const fetch = Service.pageInjectionAndAntibacterials
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    // 修改
    editItem(row) {
      this.addDialog.itemData = row
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
