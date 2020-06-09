// 药品说明书列表

<template>
  <el-table v-bind:data="data">
    <el-table-column label="药品名称"
                     prop="name"></el-table-column>
    <el-table-column label="生产厂家"
                     prop="scqy"></el-table-column>
    <el-table-column label="批准文号"
                     prop="pzwh"></el-table-column>
    <el-table-column label="规格"
                     min-width="80"
                     prop="gg"></el-table-column>
    <el-table-column fixed="right"
                     width="120">
      <template slot-scope="scope">
        <el-button v-on:click="$emit('showInstructions', scope.row)"
                   type="text">查看说明书</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'DrugSynopsisList',
  props: {
    data: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>
