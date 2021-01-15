<template>
  <div>
    <el-form :model="model"
             :rules="rules"
             inline
             label-width="100px"
             class="element-ui-default"
             ref="model">
      <el-form-item label="凭证来源："
                    prop="sourceName">
        <el-input v-model.trim="model.sourceName"
                  maxlength="20"
                  placeholder="请输入凭证来源"></el-input>
      </el-form-item>
      <el-form-item label="凭证详情："
                    prop="configDetails">
        <el-input v-model.trim="model.configDetails"
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
                 v-on:click="onSave('model')">提交</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'AddCredentialDialog',
  props: {
    dataInfo: Object
  },
  watch: {
    dataInfo: {
      handler() {
        if (this.dataInfo != null) {
          this.model.id = this.dataInfo.id
          this.model.sourceName = this.dataInfo.sourceName
          this.model.configDetails = this.dataInfo.configDetails
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        id: 0,
        sourceName: '',
        configDetails: ''
      },
      rules: {
        sourceName: [
          {
            required: true,
            message: '请输入凭证来源',
            trigger: 'blur'
          }
        ],
        configDetails: [
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
    },

    onSave(model) {
      this.$refs[model].validate((valid) => {
        if (valid) {
          const params = this.model
          Service.configuretoselfSave(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('onSucess')
          })
        } else {
          return false
        }
      })
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