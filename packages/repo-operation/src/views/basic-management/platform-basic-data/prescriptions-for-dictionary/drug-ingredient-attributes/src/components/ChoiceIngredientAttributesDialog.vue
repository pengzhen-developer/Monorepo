<template>
  <div class="layout-route">
    <el-form v-bind:model="model"
             inline="inline"
             label-suffix="："
             size="mini">

      <el-form-item label="成分名称">
        <el-input v-model.trim="model.cnName"
                  placeholder="请输入成分名称搜索"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                pagination>
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <PeaceTableColumn label="成分编码"
                        prop="code">
      </PeaceTableColumn>
      <PeaceTableColumn label="成分名称"
                        prop="cnName">
      </PeaceTableColumn>

    </PeaceTable>

    <div class="flex justify-between items-center q-mt-24">
      <div>
        已选择 {{ multipleSelection.length }} 条数据
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
import Service from '../service/index'

export default {
  name: 'ChoiceIngredientAttributesDialog',

  data() {
    return {
      model: {
        cnName: ''
      },
      multipleSelection: []
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getPlatformDrugChemicalCompositionListAll
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    onCancel() {
      this.$emit('onClose', {})
    },
    onSave() {
      if (this.multipleSelection.length > 0) {
        this.$emit('onSuccess', this.multipleSelection)
      } else {
        Peace.util.warning('请选择药品成分')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>