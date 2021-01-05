<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="85px"
             v-bind:model="model"
             v-bind:rules="rules"
             class="q-pl-20 form-padding">
      <el-form-item prop="pwd">
        <span slot="label"
              class="form-label">原密码</span>
        <el-input v-bind:show-password="showPassword"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入原密码"
                  v-model="model.pwd"
                  v-on:focus="showPassword=true"></el-input>
      </el-form-item>
      <el-form-item prop="newPwd">
        <span slot="label"
              class="form-label">新密码</span>
        <el-input v-bind:show-password="showPassword"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入新密码"
                  v-model="model.newPwd"
                  v-on:focus="showPassword=true"></el-input>
      </el-form-item>
      <div class="text-center q-pt-14">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:disabled="canSave"
                   v-bind:loading="isLoading">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Service from '../service/index'
import Util from '@src/util'
export default {
  data() {
    return {
      isLoading: false,
      showPassword: false,

      model: {
        pwd: '',
        newPwd: ''
      },

      rules: {
        pwd: [
          { required: true, message: '请输入原始密码' },
          {
            validator: (rule, value, cb) => {
              if (value.length == 0) {
                cb(new Error('请输入原始密码'))
              }

              cb()
            }
          }
        ],
        newPwd: [
          { required: true, message: '请输入6-20位数字或字母', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (value.length < 6) {
                cb(new Error('请输入6-20位数字或字母'))
              }

              cb()
            }
          }
        ]
      }
    }
  },

  created() {},

  computed: {
    canSave() {
      return Peace.validate.isEmpty(this.model.pwd) || Peace.validate.isEmpty(this.model.newPwd)
    }
  },

  methods: {
    cancel() {
      this.$emit('close')
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            Pwd: this.model.pwd,
            NewPwd: this.model.newPwd
          }
          Service.modifyAccount(params)
            .then(() => {
              Peace.util.success('密码修改成功')
              this.$emit('close')
              //this.$emit('refresh')
              this.logout()
            })
            .finally(() => {
              this.isLoading = false
            })
        } else {
          return false
        }
      })
    },
    logout() {
      Peace.identity.auth.logout().then(() => {
        Util.user.removeUserInfo()
        Util.location.redirectToLogin()
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

::v-deep .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  margin-right: 5px;
}

.form-padding {
  padding-right: 40px;
}
</style>
<style>
.accountDialog .el-form-item__label {
  padding-right: 0px;
}
</style>
