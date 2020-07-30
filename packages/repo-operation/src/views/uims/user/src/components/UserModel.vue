<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>

        <el-form-item v-bind:prop="model.id ? null : '__账号名称'">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">账号名称</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input v-bind:disabled="!!model.id"
                    v-model.trim="model.__账号名称"></el-input>
        </el-form-item>

        <el-form-item prop="__密码">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">密码</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input type="password"
                    show-password
                    v-model.trim="model.__密码"></el-input>
        </el-form-item>

        <el-form-item prop="__姓名">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">姓名</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input v-model.trim="model.__姓名"></el-input>
        </el-form-item>

        <el-form-item prop="__角色">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <div class="flex">
            <el-select class=" col"
                       v-model.trim="model.__角色">
              <el-option v-for="item in source.__角色"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="__所属部门">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">所属部门</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <div class="flex">
            <el-select class="col"
                       v-model.trim="model.__所属部门">
              <el-option v-for="item in source.__所属部门"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="__账号状态">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">账号状态</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-radio-group v-model="model.__账号状态">
            <el-radio v-bind:label="true">启用</el-radio>
            <el-radio v-bind:label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <div class="text-center">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="save">保存</el-button>
      <el-button style="width: 80px;"
                 v-on:click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },

  data() {
    return {
      model: {
        id: null,
        __账号名称: '',
        __密码: '',
        __姓名: '',
        __角色: '',
        __所属部门: '',
        __账号状态: true
      },

      rules: {
        __账号名称: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
        __密码: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        __姓名: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        __角色: [{ required: true, message: '请选择角色', trigger: 'change' }],
        __所属部门: [{ required: true, message: '请选择部门', trigger: 'change' }],
        __账号状态: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },

      source: {
        __角色: [{ label: '角色', value: 1 }],
        __所属部门: [{ label: '部门', value: 1 }]
      }
    }
  },

  created() {
    this.setPropsToModel()
  },

  methods: {
    setPropsToModel() {
      this.model = Object.assign({}, this.model, this.data)
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // const request = this.model.id ? Service.edit : Service.add
          // const params = this.model
          // request(params).then((res) => {
          //   Peace.util.success(res.msg)
          //   this.$emit('save')
          // })

          this.$emit('save')
        } else {
          return false
        }
      })
    },

    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.em-4 {
  width: 4em;
  text-align: justify;
  text-align-last: justify;
}
</style>