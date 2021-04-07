<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="机构名称">
          <el-select v-model.trim="model.CodeName"
                     value-key="custCode"
                     clearable=""
                     placeholder="请选择">
            <el-option v-bind:key="index"
                       v-bind:label="item.CodeName"
                       v-bind:value="item.CustCode"
                       v-for="(item, index) in source.organizationList">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="药品名称">
          <el-input v-model="model.ProductName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="配码状态">
          <el-select v-model="model.MappingStatus"
                     placeholder="全部"
                     clearable>
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.drugCodingStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配码更新日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.timeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button v-on:click="openImportDialog">导入</el-button>
        <el-button v-on:click="exportFile">导出</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  :tableProps="{
                            pageIndex: 'PageIndex',
                            pageSize: 'PageSize'
                          }">
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="机构名称"
                          prop="CodeName"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="药品编码"
                          prop="CustDrugsCode"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="平台药品编码"
                          prop="DrugStandardCode"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="药品名称"
                          prop="ProductName"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="剂型"
                          prop="DrugDosageForm"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="规格"
                          prop="DrugSpecifications"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="厂家"
                          prop="EnterpriseName"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="配码状态"
                          prop="MappingStatus"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="审核状态"
                          prop="MappingExamineStatus"></PeaceTableColumn>
        <PeaceTableColumn width="180px"
                          label="配码更新时间"
                          prop="LastModifyTime"></PeaceTableColumn>
        <PeaceTableColumn width="180px"
                          label="药品添加时间"
                          prop="CreateTime"></PeaceTableColumn>

      </PeaceTable>
    </div>

    <!-- 药品导入 -->
    <PeaceDialog width="500px"
                 :visible.sync="importDialog.visible"
                 title="批量导入药品"
                 v-if="importDialog.visible">
      <DrugImport v-on:close="closeImportDialog"
                  v-on:success="get()"></DrugImport>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service/index'

import DrugImport from './components/DrugImport'
export default {
  name: 'DrugCatalogue',
  components: { DrugImport },
  data() {
    return {
      model: {
        CodeName: '',
        MappingStatus: '',
        ProductName: '',
        timeRange: [],
        StarUpdateDate: '',
        EndUpdateDate: '',
        IsPaging: true
      },

      source: {
        drugCodingStatus: [],
        organizationList: []
      },

      importDialog: {
        visible: false
      }
    }
  },
  watch: {
    'model.timeRange'(timeRange) {
      this.model.StarUpdateDate = timeRange?.[0] ?? ''
      this.model.EndUpdateDate = timeRange?.[1] ?? ''
    }
  },
  async mounted() {
    this.source.drugCodingStatus = await Peace.identity.dictionary.getList('MappingStatus')
    this.getOrganizationList()
    this.$nextTick().then(() => {
      this.get()
    })
  },
  methods: {
    get() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    getOrganizationList() {
      Service.getDrugCodeName().then((res) => {
        this.source.organizationList = res.data.list
      })
    },
    exportFile() {
      if (!this.model.CodeName) {
        return Peace.util.warning('请选择指定机构导出目录')
      }
      Service.outputExcelByDrug(this.model)
    },
    openImportDialog() {
      this.importDialog.visible = true
    },
    closeImportDialog() {
      this.importDialog.visible = false
    }
  }
}
</script>

<style>
</style>