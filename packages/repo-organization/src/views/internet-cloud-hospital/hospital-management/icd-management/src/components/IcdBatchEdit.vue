<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             ref="drugModel">
      <el-form-item label="状态："
                    prop="status"
                    label-width="100px">
        <el-select v-model="model.status"
                   placeholder="请选择"
                   style="width:100%;">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in source.ENUM_ICD_STATUS"></el-option>
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
  name: 'IcdBatchEdit',
  props: {
    selection: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      source: {
        ENUM_ICD_STATUS: CONSTANT.ENUM_ICD_STATUS
      },
      model: {
        status: ''
      },
      rules: {
        status: [
          {
            required: true,
            message: '请选择状态',
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
            status: this.model.status
          }
          Service.editDiagnose(params).then((res) => {
            Peace.util.success(res.msg || '保存成功')
            this.$emit('success')
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
  margin-bottom: 0 !important;
  padding-top: 24px;
}
</style>
