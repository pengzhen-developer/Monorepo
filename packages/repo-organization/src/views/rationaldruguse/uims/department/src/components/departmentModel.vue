<template>
  <div>
    <el-form ref="form"
             label-width="96px"
             v-bind:model="model"
             v-bind:rules="rules">
      <div class="info-title">药房基本信息</div>
      <el-form-item prop="Name">
        <span slot="label"
              class="form-label">部门名称</span>
        <el-input v-model.trim="model.Name"
                  maxlength="10"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label"
              class="form-label">上级部门</span>
        <el-cascader placeholder="请选择上级部门"
                     :options="options"
                     :props="{ checkStrictly: true ,emitPath:false}"
                     filterable
                     clearable
                     v-model="model.ParentDepartId"></el-cascader>
      </el-form-item>
      <div class="text-center">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:loading="isLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
export default {
  data() {
    return {
      isLoading: false,
      Id: '',
      model: {
        Name: '',
        ParentDepartId: ''
      },
      rules: {
        Name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          }
        ]
      },
      options: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTree()
    })
  },
  methods: {
    getTree() {
      Service.getDepartTree().then((res) => {
        this.options = res.data.list
      })
    },
    init(Id) {
      if (Id) {
        this.Id = Id
        const params = { Id: Id }
        Service.getDepartInfo(params).then((res) => {
          this.model.Name = res.data.Name
          this.model.ParentDepartId = res.data.ParentDepartId
        })
      }
    },
    save() {
      this.validateForm().then(() => {
        this.isLoading = true
        if (this.Id) {
          this.model.Id = this.Id
          Service.UpdateDepart(this.model)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
            })
            .finally(() => {
              this.isLoading = false
            })
        } else {
          Service.CreateDepart(this.model)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      })
    },
    cancel() {
      this.$emit('close')
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-label {
  position: relative;
  display: inline-block;
  width: 70px;
  padding-right: 12px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 0;
  }
}

.el-cascader {
  width: 100%;
}

.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
}
</style>