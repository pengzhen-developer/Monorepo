// 药品说明书列表

<template>
  <PeaceTable v-bind:data="data">
    <PeaceTableColumn label="药品名称"
                      prop="name"></PeaceTableColumn>
    <PeaceTableColumn label="生产厂家"
                      prop="scqy"></PeaceTableColumn>
    <PeaceTableColumn label="批准文号"
                      prop="pzwh"></PeaceTableColumn>
    <PeaceTableColumn label="规格"
                      min-width="80"
                      prop="gg"></PeaceTableColumn>
    <PeaceTableColumn fixed="right"
                      width="120">
      <template slot-scope="scope">
        <el-button v-on:click="$emit('showInstructions', scope.row)"
                   type="text">查看说明书</el-button>
      </template>
    </PeaceTableColumn>
  </PeaceTable>
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
