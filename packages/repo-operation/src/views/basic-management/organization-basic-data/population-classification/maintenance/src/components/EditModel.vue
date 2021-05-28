
<template>
  <div class="flex items-center column">
    <el-form :model="model"
             :rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="：">
      <el-form-item label="系统编码">
        <div>dddddd</div>
      </el-form-item>
      <el-form-item label="分类标签"
                    prop="mainCode">
        <el-input v-model.trim="model.mainCode"
                  placeholder="请输入"></el-input>
      </el-form-item>

    </el-form>
    <div class="flex justify-end full-width q-pt-32">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary"
                 @click="submit">{{type==='add'?'提交':'保存'}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModel',
  props: {
    info: Object,
    type: String
  },

  data() {
    return {
      model: {
        mainCode: ''
      },

      rules: {
        mainCode: [{ required: true, message: '请输入分类标签', tragger: 'blur' }]
      }
    }
  },

  methods: {
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    saveData() {
      this.$emit('complete')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>