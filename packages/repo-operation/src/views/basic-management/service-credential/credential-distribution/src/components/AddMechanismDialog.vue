<template>
  <div>
    <el-form :model="mechanism"
             :rules="rules"
             inline
             label-width="180px"
             class="element-ui-default"
             ref="mechanism">
      <el-form-item label="系统名称："
                    prop="nameCode">
        <el-select v-model="mechanism.nameCode"
                   filterable
                   placeholder="请选择">
          <el-option :key="item.value"
                     :label="item.label"
                     :value="item.value"
                     v-for="item in sysDockingDict"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统属性："
                    prop="attrCode">
        <el-radio-group v-model="mechanism.attrCode">
          <el-radio v-for="item in sysAttributeDict"
                    :key="item.value"
                    :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onCreate">创建凭证</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'AddMechanismDialog',
  props: {},

  data() {
    return {
      mechanism: {
        nameCode: '',
        attrCode: ''
      },
      // 系统名称
      sysDockingDict: [],
      // 系统属性
      sysAttributeDict: [],
      rules: {
        nameCode: [
          {
            required: true,
            message: '请选择系统名称',
            trigger: 'change'
          }
        ],
        attrCode: [
          {
            required: true,
            message: '请选择系统属性',
            trigger: 'change'
          }
        ]
      }
    }
  },

  async created() {
    this.sysDockingDict = await Peace.identity.dictionary.getList('sysdocking')
    this.sysAttributeDict = await Peace.identity.dictionary.getList('sysattribute')
  },

  methods: {
    onCancel() {
      this.$emit('onCancel')
    },
    onCreate() {
      this.$refs['mechanism'].validate((valid) => {
        if (valid) {
          var params = {
            attributeCode: this.mechanism.attrCode,
            attributeName: this.sysAttributeDict.find((item) => item.value === this.mechanism.attrCode).label,
            code: this.mechanism.nameCode,
            name: this.sysDockingDict.find((item) => item.value == this.mechanism.nameCode).label
          }
          Service.configureSave(params).then((res) => {
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