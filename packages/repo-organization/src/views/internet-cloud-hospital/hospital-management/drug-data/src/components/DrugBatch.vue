<template>
  <div>
    <el-form :model="drug"
             :rules="rules"
             ref="drugModel">
      <el-form-item label="药品来源："
                    prop="source"
                    label-width="100px">
        <el-select v-model="drug.source"
                   placeholder="请选择"
                   style="width:100%;">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_DRUG_SOURCE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button @click="cancel"
                   type="default">取消</el-button>
        <el-button @click="save"
                   type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'

export default {
  name: 'DrugBatch',
  props: {
    selection: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      source: {
        ENUM_DRUG_SOURCE: CONSTANT.ENUM_DRUG_SOURCE
      },
      drug: {
        source: ''
      },
      rules: {
        source: [
          {
            required: true,
            message: '请选择药品来源',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('close')
    },
    save() {
      this.$refs.drugModel.validate((valid) => {
        if (valid) {
          let params = {
            ids: this.selection.map((item) => item.id),
            source: this.drug.source
          }
          Service.batchDrug(params).then((res) => {
            Peace.util.success(res.msg || '保存成功')
            this.$emit('success')
            this.$emit('close')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
