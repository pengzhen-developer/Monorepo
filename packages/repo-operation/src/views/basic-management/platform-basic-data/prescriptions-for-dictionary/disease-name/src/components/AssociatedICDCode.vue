<template>
  <div class="layout-route">
    <el-form v-bind:model="model"
             inline="inline"
             label-suffix="："
             size="mini">

      <el-form-item label="主要编码">
        <el-input v-model.trim="model.hospitalName"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="ICD疾病名称">
        <el-input v-model.trim="model.hospitalName"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="q-mb-lg">
      <el-button type="primary"
                 v-on:click="associated">关联</el-button>
      <el-button type="primary"
                 v-on:click="enAssociated">取消关联</el-button>
    </div>

    <PeaceTable ref="table"
                size="mini"
                @selection-change="handleSelectionChange"
                pagination>
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <PeaceTableColumn label="主要编码"
                        prop="orderNumber">
      </PeaceTableColumn>
      <PeaceTableColumn label="附加编码"
                        prop="hospitalName">
      </PeaceTableColumn>
      <PeaceTableColumn label="ICD疾病名称"
                        prop="hospitalName">
      </PeaceTableColumn>
      <PeaceTableColumn label="级别"
                        prop="hospitalName">
      </PeaceTableColumn>
      <PeaceTableColumn label="父节点编码"
                        prop="hospitalName">
      </PeaceTableColumn>
      <PeaceTableColumn label="关联状态"
                        prop="hospitalName">
      </PeaceTableColumn>

    </PeaceTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      multipleSelection: []
    }
  },

  methods: {
    get() {},

    associated() {},
    enAssociated() {},
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>


<style lang="scss" scoped>
</style>