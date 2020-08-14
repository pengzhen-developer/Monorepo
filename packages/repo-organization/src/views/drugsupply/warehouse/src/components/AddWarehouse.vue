<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="92px"
             label-suffix="："
             v-bind:model="model"
             v-bind:rules="rules">
      <div class="info-content">
        <el-form-item label="云仓名称"
                      prop="Name">
          <el-input placeholder="请输入"
                    v-model.trim="model.Name "></el-input>
        </el-form-item>
        <el-form-item label="branchid"
                      prop="CodeIn3PartPlatform">
          <el-input placeholder="请输入"
                    v-model.trim="model.CodeIn3PartPlatform"
                    maxlength="40"></el-input>
        </el-form-item>
      </div>
      <div class="text-center">
        <el-button type="primary"
                   class="large hasmargin "
                   v-bind:disabled="saveing"
                   v-on:click="save">确 定</el-button>
        <el-button class="large"
                   v-on:click="cancelDialog">取 消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from '../service'

export default {
  components: {},

  data() {
    return {
      saveing: false,
      model: {
        Name: '', //云仓名称
        NameIn3PartPlatform: '', //云仓名称
        CodeIn3PartPlatform: '', // branchid
        Type: 0, //类型
        Effective: 1 //是否启用，默认传1
      },

      rules: {
        Name: [
          {
            required: true,
            message: '请填写云仓名称',
            trigger: 'blur'
          }
        ],
        CodeIn3PartPlatform: [
          {
            required: true,
            message: '请填写branchid',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created() {},

  computed: {},

  methods: {
    save() {
      this.validateForm().then(() => {
        this.saveing = true
        const params = Peace.util.deepClone(this.model)
        params.NameIn3PartPlatform = params.Name
        Service.InsertCircconfig(params)
          .then(() => {
            Peace.util.alert('新建成功')
            this.cancelDialog()
          })
          .finally(() => {
            this.saveing = false
          })
      })
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },
    cancelDialog() {
      this.$emit('onCloseWare')
    }
  }
}
</script>

<style lang="scss" scoped>
.large {
  width: 120px;
  height: 34px;
}
.hasmargin {
  margin-right: 40px;
}
.info-content {
  padding: 15px 18px 32px 18px;
}
</style>