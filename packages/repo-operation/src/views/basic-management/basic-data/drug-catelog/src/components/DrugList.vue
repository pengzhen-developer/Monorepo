<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model"
               label-width="auto">
        <el-form-item label="平台药品编码">
          <peace-input placeholder="请输入"
                       v-model.trim="model.DrugStandardCode"></peace-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.ProductName"></peace-input>
        </el-form-item>
        <el-form-item label="批准文号">
          <peace-input placeholder="请输入"
                       v-model.trim="model.ApprovalNo"></peace-input>
        </el-form-item>
        <el-form-item label="生产厂家">
          <peace-input placeholder="请输入"
                       v-model.trim="model.EnterpriseChineseName"></peace-input>
        </el-form-item>
        <el-form-item label="NMPA状态">
          <peace-select v-model="model.CatalogStatus"
                        placeholder="全部">
            <el-option v-for="item in source.CatalogStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="更新日期">
          <peace-date-picker type="daterange"
                             v-model="timeRange"
                             value-format="yyyy-MM-dd"></peace-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="平台药品编码"
                          prop="DrugStandardCode"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="主数据ID"
                          prop="MainDataID"
                          min-width="130px"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="ProductName"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn label="规格"
                          prop="DrugSpecifications"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          prop="EnterpriseChineseName"
                          min-width="200px"></PeaceTableColumn>

        <PeaceTableColumn label="包装规格"
                          prop="packaging_specifications"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="批准文号"
                          prop="ApprovalNo"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="LastModifyTime"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="90px;">
          <template slot-scope="scope">
            <el-button type="text"
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
        ProductName: '',
        ApprovalNo: '',
        EnterpriseChineseName: '',
        CatalogStatus: '',
        StartDate: '',
        EndDate: ''
      },

      source: {
        CatalogStatus: [
          {
            label: '可查询',
            value: false
          },
          {
            label: '不可查询',
            value: true
          }
        ]
      },
      timeRange: []
    }
  },
  watch: {
    timeRange(timeRange) {
      this.model.StartDate = timeRange?.[0] ?? ''
      this.model.EndDate = timeRange?.[1] ?? ''
    }
  },
  created() {},

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.GetJntDrugsInfos
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    showDrugDetail(row) {
      this.$emit('showDrugDetail', row.ID)
    }
  }
}
</script>

<style>
</style>