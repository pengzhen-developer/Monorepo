<template>
  <div>
    <el-form :model="mechanism"
             :rules="rules"
             inline
             label-width="180px"
             class="element-ui-default"
             ref="mechanism">
      <el-form-item label="服务凭证主体属性："
                    prop="mechanismType">
        <el-select v-model="mechanism.mechanismType"
                   @change="typeChange"
                   placeholder="请选择">
          <el-option :key="item.label"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in typeData"></el-option>
        </el-select>
      </el-form-item>

      <template v-if="mechanismChoiceType">
        <el-form-item label="主体名称："
                      prop="name2">
          <el-select v-model="mechanism.name2"
                     filterable
                     placeholder="请选择">
            <el-option :key="item.Name"
                       :label="item.Name"
                       :value="item.Name"
                       v-for="item in custNameList"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item label="主体名称："
                      prop="name">
          <el-input v-model.trim="mechanism.name"
                    maxlength="20"
                    placeholder="请输入主体名称"></el-input>
        </el-form-item>
      </template>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onCreate('mechanism')">创建凭证</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'AddMechanismDialog',
  props: {
    typeData: Array
  },
  data() {
    return {
      mechanism: {
        mechanismType: '0',
        name: '',
        name2: ''
      },
      custNameList: [],
      rules: {
        mechanismType: [
          {
            required: true,
            message: '请选择服务凭证主体属性',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入主体名称',
            trigger: 'blur'
          }
        ],
        name2: [
          {
            required: true,
            message: '请选择主体名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    mechanismChoiceType() {
      return this.mechanism.mechanismType == '0'
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getCustByVoucher()
    })
  },

  methods: {
    getCustByVoucher() {
      const params = {
        Name: this.mechanism.name2
      }
      Service.getCustByVoucher(params).then((res) => {
        this.custNameList = res.data.list
      })
    },
    onCancel() {
      this.$emit('onCancel')
    },
    onCreate(mechanism) {
      this.$refs[mechanism].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    typeChange(value) {
      this.$refs['mechanism'].clearValidate()
      if (value == 0) {
        this.mechanism.name = ''
      } else {
        this.mechanism.name2 = ''
      }
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
::v-deep .el-select {
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