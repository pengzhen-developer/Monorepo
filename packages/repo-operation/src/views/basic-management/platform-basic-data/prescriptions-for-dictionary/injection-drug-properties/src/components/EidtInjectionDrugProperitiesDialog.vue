<template>
  <div>
    <div class="el-dialog__body">
      <el-form ref="model"
               label-position="right"
               label-width="120px"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">
        <div class="info-list">

          <el-form-item label="平台药品编码">
            <span>{{model.code}}</span>
          </el-form-item>

          <el-form-item label="药品名称">
            <span>{{model.name}}</span>
          </el-form-item>

          <el-form-item label="剂型">
            <span>{{model.jixing}}</span>
          </el-form-item>

          <el-form-item label="抗菌属性">
            <el-select v-model.trim="model.attributes"
                       value-key="custCode"
                       clearable
                       class="block"
                       placeholder="--">
              <el-option v-bind:key="index"
                         v-bind:label="item.label"
                         v-bind:value="item.value"
                         v-for="(item, index) in source.attributesTypes">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="注射剂"
                        prop="injection">
            <el-radio-group v-model="model.injection">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="el-dialog__footer">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave('model')">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EidtInjectionDrugProperitiesDialog',
  props: {
    data: Object,
    isEdit: Boolean
  },

  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.code = this.data.code
          this.model.label = this.data.label
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        code: '编码',
        name: '名称',
        jixing: '机型',
        attributes: '',
        injection: 0
      },
      source: {
        attributesTypes: [
          { value: '1', label: '非限制使用级抗菌药物' },
          { value: '2', label: '限制使用级抗菌药物' },
          { value: '3', label: '特殊使用级抗菌药物' }
        ]
      },
      rules: {
        injection: [
          {
            required: true,
            message: '请选中是否是注射剂',
            trigger: 'change'
          }
        ]
      }
    }
  },

  methods: {
    onCancel() {
      this.$emit('onClose', {})
    },
    onSave(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>