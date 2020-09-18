<template>
  <el-form ref="form"
           size="larger"
           label-width="auto"
           v-bind:model="model"
           v-bind:rules="rules">

    <el-form-item prop="password">
      <div class="flex inline label-color"
           slot="label">
        <span class="text-justify em-4">原密码</span>
        <span class="text-center q-ml-sm">：</span>
      </div>

      <el-input type="text"
                minlength="6"
                maxlength="20"
                placeholder="请输入原密码"
                v-model="model.password">
      </el-input>
    </el-form-item>

    <el-form-item prop="newpassword1">
      <div class="flex inline label-color"
           slot="label">
        <span class="text-justify em-4">新密码</span>
        <span class="text-center q-ml-sm">：</span>
      </div>

      <el-input :type="showNewPwd ? 'text':'password'"
                minlength="6"
                maxlength="20"
                placeholder="请输入新密码"
                @focus="showNewPwdIcon = true"
                @blur="showNewPwdIcon = false"
                v-model="model.newpassword1">
        <i v-show="showNewPwdIcon || model.newpassword1"
           @click="showNewPwd = !showNewPwd"
           slot="suffix"
           :class="{'zyy-icon': true, 'zyy-xianshimima1': showNewPwd && model.newpassword1, 'zyy-yincangmima': !showNewPwd && model.newpassword1}"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="newpasswordAgain">
      <div class="flex inline label-color"
           slot="label">
        <span class="text-justify em-4">新密码</span>
        <span class="text-center q-ml-sm">：</span>
      </div>

      <el-input :type="showNewPwdAgain ? 'text':'password'"
                minlength="6"
                maxlength="20"
                placeholder="请再次输入新密码"
                @focus="showNewPwdIconAgain = true"
                @blur="showNewPwdIconAgain = false"
                v-model="model.newpasswordAgain">
        <i v-show="showNewPwdIconAgain || model.newpasswordAgain"
           @click="showNewPwdAgain = !showNewPwdAgain"
           slot="suffix"
           :class="{'zyy-icon': true, 'zyy-xianshimima1': showNewPwdAgain && model.newpasswordAgain, 'zyy-yincangmima': !showNewPwdAgain && model.newpasswordAgain}"></i>
      </el-input>
    </el-form-item>

    <div class="text-center q-pt-md">
      <el-button style="min-width: 140px;margin-right: 30px;"
                 size="large"
                 type="primary"
                 v-on:click="save">确定</el-button>
      <el-button style="min-width: 140px;"
                 size="large"
                 v-on:click="cancelDialog">取消</el-button>
    </div>

  </el-form>
</template>

<script>
import Peace from '@src/library'
import Service from '../service'
import Util from '@/src/util'
export default {
  name: 'ChangePassword',
  data() {
    return {
      showNewPwdIcon: false,
      showNewPwd: false,
      showNewPwdIconAgain: false,
      showNewPwdAgain: false,
      model: {
        password: '',
        newpassword1: '',
        newpasswordAgain: ''
      },

      rules: {
        password: [
          { required: true, message: '请输入原密码' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符' },
          { pattern: Peace.validate.pattern.password, message: '支持输入字母、数字、下划线' }
        ],

        newpassword1: [
          { required: true, message: '请输入新密码' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符' },
          { pattern: Peace.validate.pattern.password, message: '支持输入字母、数字、下划线' }
        ],
        newpasswordAgain: [
          { required: true, message: '请再次输入新密码' },
          {
            validator: (rule, value, cb) => {
              if (value == '') {
                cb(new Error('请再次输入新密码'))
              } else if (value != this.model.newpassword1) {
                cb(new Error('两次输入密码不一致！'))
              } else {
                cb()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            newpassword1: this.model.newpassword1,
            password: this.model.password,
            clientId: Util?.user?.getUserInfo()?.clientId,
            userId: Util?.user?.getUserInfo()?.id
          }
          Service.userEdit(params).then((res) => {
            Peace.util.success(res.msg)
            this.cancelDialog()
          })
        }
      })
    },
    cancelDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style>
</style>