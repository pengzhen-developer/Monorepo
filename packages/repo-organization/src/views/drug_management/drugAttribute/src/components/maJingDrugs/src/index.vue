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

        <el-form-item label="编码：">
          <el-input v-model.trim="model.drugCode"
                    placeholder="请输入编码"></el-input>
        </el-form-item>

        <el-form-item label="厂家：">
          <el-input v-model.trim="model.drugFactory"
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
                         type="index"
                         align="center"
                         width="80px">
        </el-table-column>
        <el-table-column label="药品名称"
                         prop="StoreName"
                         min-width="180px"></el-table-column>
        <el-table-column label="规格"
                         prop="CustomerType"
                         min-width="80px">
          <template slot-scope="scope">
            {{ scope.row.CustomerType == 0 ? '院内药房' : '门店' }}
          </template>
        </el-table-column>
        <el-table-column label="厂家"
                         prop="CustName"
                         min-width="80px"></el-table-column>
        <el-table-column label="麻醉药物"
                         prop="CustName1"
                         min-width="80px"></el-table-column>
        <el-table-column label="一精药物"
                         prop="CustName1"
                         min-width="80px"></el-table-column>
        <el-table-column label="二精药物"
                         prop="CustName1"
                         min-width="80px"></el-table-column>
        <el-table-column label="更新时间"
                         prop="CustName1"
                         min-width="80px"></el-table-column>
      </peace-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        drugName: '',
        drugCode: '',
        drugFactory: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>