<template>
  <div>
    <div class="card card-search q-mb-10">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="药品名称：">
          <el-input v-model.trim="model.drugName"
                    placeholder="请输入药品名称"></el-input>
        </el-form-item>

        <el-form-item label="编号：">
          <el-input v-model.trim="model.drugCode"
                    placeholder="请输入编号"></el-input>
        </el-form-item>

        <el-form-item label="厂家：">
          <el-input v-model.trim="model.enterpriseName"
                    placeholder="请输入厂家"></el-input>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button type="primary"
                     v-on:click="fetch">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <peace-table ref="table"
                   pagination
                   size="mini">
        <el-table-column label="编号"
                         prop="custdrugscode"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="药品名称"
                         prop="productname"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="规格"
                         prop="drugspecifications"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="厂家"
                         prop="enterprisename"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="批准文号"
                         prop="approvalnumber"
                         align="center"
                         min-width="80px"></el-table-column>

        <el-table-column label="更新日期"
                         prop="lastmodifytime"
                         align="center"
                         min-width="80px"></el-table-column>
      </peace-table>
    </div>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      model: {
        drugName: '',
        drugCode: '',
        enterpriseName: ''
      }
    }
  },

  beforeMount() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getDrugList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>