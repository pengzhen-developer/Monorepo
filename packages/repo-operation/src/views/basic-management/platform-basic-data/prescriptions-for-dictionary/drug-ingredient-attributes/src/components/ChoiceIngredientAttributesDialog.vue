<template>
  <div class="layout-route">
    <el-form v-bind:model="model"
             inline="inline"
             label-suffix="："
             size="mini">

      <el-form-item label="成分名称">
        <el-input v-model.trim="model.hospitalName"
                  placeholder="请输入成分名称搜索"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                size="mini"
                @selection-change="handleSelectionChange"
                pagination>
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <PeaceTableColumn label="成分编码"
                        prop="orderNumber">
      </PeaceTableColumn>
      <PeaceTableColumn label="成分名称"
                        prop="hospitalName">
      </PeaceTableColumn>

    </PeaceTable>

    <div class="flex justify-between items-center q-mt-24">
      <div>
        已选择{{ 4 }}条数据
      </div>
      <div>
        <el-button v-on:click="onCancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="onSave">确定</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ChoiceIngredientAttributesDialog',

  data() {
    return {
      model: {},
      multipleSelection: []
    }
  },

  methods: {
    get() {},

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    onCancel() {
      this.$emit('onClose', {})
    },
    onSave() {}
  }
}
</script>


<style lang="scss" scoped>
</style>