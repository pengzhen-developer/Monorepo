<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="审核状态">
          <el-select clearable=""
                     filterable=""
                     v-model.trim="model.mappingExamineStatus"
                     placeholder="全部">
            <el-option v-for="item in source.mappingExamineStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="匹配状态">
          <el-select clearable=""
                     filterable=""
                     placeholder="全部"
                     v-model.trim="model.mappingStatus">
            <el-option v-for="item in source.mappingStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input clearable=""
                    filterable=""
                    placeholder="请输入药品名称"
                    v-model.trim="model.productName"></el-input>
        </el-form-item>
        <el-form-item label="药品本位码">
          <el-input v-model.trim="model.cscStandardCode"
                    placeholder="请输入药品本位码"></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input v-model.trim="model.enterpriseName"
                    placeholder="请输入厂家"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button v-bind:disabled="!checked.drugStandardCode"
                   v-on:click="showCommomRule">查看通用规则</el-button>
        <el-button v-bind:disabled="!checked.drugStandardCode"
                   v-on:click="showOrgRule">查看机构规则</el-button>
      </div>

      <PeaceTable ref="tableRef"
                  pagination
                  v-on:row-click="(row) => checked = row">
        <PeaceTableColumn width="50px">
          <template slot-scope="scope">
            <el-radio name="radio"
                      v-bind:label="scope.row.custDrugsCode"
                      v-bind:value="checked.custDrugsCode"><span></span></el-radio>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="序号"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品编码"
                          prop="custDrugsCode"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="药品本位码"
                          prop="drugStandardCode"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="productName"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="drugSpecifications"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="厂家"
                          prop="enterpriseName"
                          min-width="240px"></PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          prop="mappingExamineStatus"
                          min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.mappingExamineStatus | filterDictionary(source.mappingExamineStatus) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="匹配状态"
                          prop="mappingStatus"
                          min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.mappingStatus | filterDictionary(source.mappingStatus) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="通用规则数量"
                          prop="ruleCount"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="自定义规则数量"
                          prop="ruleOrganCount"
                          min-width="130px"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-if="scope.row.mappingExamineStatus === '20' && scope.row.drugStandardCode"
                       v-on:click="edit(scope.row)">编辑药品规则</el-button>
            <el-button type="text"
                       disabled
                       v-else
                       v-on:click="edit(scope.row)">禁用</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Serivce from './../service'

export default {
  data() {
    return {
      checked: {},

      model: {},

      source: {
        logType: []
      }
    }
  },

  async created() {
    this.source.mappingStatus = await Peace.identity.dictionary.getList('mappingStatus')
    this.source.mappingExamineStatus = await Peace.identity.dictionary.getList('mappingExamineStatus')

    this.fetch()
  },

  methods: {
    fetch() {
      const fetch = Serivce.getList
      const params = this.model

      this.$refs.tableRef.reloadData({ fetch, params })
      this.checked = {}
    },

    showCommomRule() {
      this.$emit('showCommomRule', this.checked)
    },

    showOrgRule() {
      this.$emit('showOrgRule', this.checked)
    },

    edit(data) {
      this.$emit('edit', data)
    }
  }
}
</script>

<style>
</style>