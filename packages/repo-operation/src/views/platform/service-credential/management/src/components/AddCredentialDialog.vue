<template>
  <div>
    <el-form :model="drug"
             :rules="rules"
             inline
             label-width="100px"
             class="element-ui-default"
             ref="drug">
      <el-form-item label="凭证来源："
                    prop="drugUse">
        <el-input v-model.trim="drugUseData.drugUse"
                  maxlength="20"
                  placeholder="请输入凭证来源"></el-input>
      </el-form-item>
      <el-form-item label="凭证详情："
                    prop="code">
        <el-input v-model.trim="drugUseData.code"
                  maxlength="200"
                  v-bind:rows="4"
                  type="textarea"
                  show-word-limit
                  placeholder="请输入凭证详情"></el-input>
      </el-form-item>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave('drug')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drugUseData: {
        drugUse: '',
        code: ''
      },
      rules: {
        drugUse: [
          {
            required: true,
            message: '请输入凭证来源',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入凭证详情',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    onCancel() {
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  display: flex;
}
::v-deep .el-form-item__content {
  width: calc(100% - 125px);
  display: flex;
  align-items: center;
}
::v-deep .el-input {
  width: 100%;
}

.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;

  .el-button {
    width: 120px;
    height: 32px;
  }
}
</style>