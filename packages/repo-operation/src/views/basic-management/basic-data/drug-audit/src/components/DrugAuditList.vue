<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model">
        <el-form-item label="主数据ID">
          <el-input placeholder="请输入"
                    v-model="model.DrugStandardCode"></el-input>
        </el-form-item>
        <el-form-item label="批准文号">
          <el-input placeholder="请输入"
                    v-model="model.ApprovalNo"></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input placeholder="请输入"
                    v-model="model.ProductName"></el-input>
        </el-form-item>
        <el-form-item label="提交机构">
          <el-input placeholder="请输入"
                    v-model="model.SubmitCodeName">
          </el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.SpecificationsStatus">
            <el-option v-for="item in source.SpecificationsStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          prop="__序号"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="主数据ID"
                          prop="DrugStandardCode"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="ProductName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="批准文号"
                          prop="ApprovalNo"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="DrugSpecifications"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="剂型"
                          prop="DrugDosageForm"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          prop="EnterpriseChineseName"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="包装规格"
                          prop="packaging_specifications"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          prop="SpecificationsStatus"
                          min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.SpecificationsStatus | filterDictionary(source.SpecificationsStatus)}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="提交机构"
                          prop="SubmitCodeName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="提交时间"
                          prop="CreateTime"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="账号"
                          prop="SubmitUserName"
                          min-width="130px"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="90px;">
          <template slot-scope="scope">
            <el-button type="text"
                       v-if="shouldDisplayAudit(scope.row)"
                       v-on:click="showDrugAudit(scope.row)">审核</el-button>
            <el-button type="text"
                       v-else
                       v-on:click="showDrugDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  data() {
    return {
      model: {
        DrugStandardCode: '',
        ApprovalNo: '',
        ProductName: '',
        SubmitCodeName: '',
        SpecificationsStatus: ''
      },

      source: {
        SpecificationsStatus: []
      }
    }
  },

  created() {
    this.getDictionary()
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    async getDictionary() {
      this.source.SpecificationsStatus = await Peace.identity.dictionary.getList('SpecificationsStatus')
    },

    fetch() {
      const fetch = Service.GetJntDrugsInfo
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    shouldDisplayAudit(row) {
      return row.SpecificationsStatus === '0'
    },

    showDrugAudit({ DrugStandardCode }) {
      this.$emit('showDrugAudit', { DrugStandardCode })
    },

    showDrugDetail({ DrugStandardCode }) {
      this.$emit('showDrugDetail', { DrugStandardCode })
    }
  }
}
</script>

<style>
</style>