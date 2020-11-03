<template>
  <div>
    <el-form ref="form"
             label-width="96px"
             v-bind:model="model"
             v-bind:rules="model.userId ? editRules : addRules">
      <el-form-item :prop="model.userId ? '' : 'username'">
        <span slot="label"
              class="form-label">账号</span>
        <el-input v-model.trim="model.username"
                  :disabled="model.userId ? true : false"
                  maxlength="11"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <!-- <el-form-item v-if="!model.userId"
                    prop="password">
        <span slot="label"
              class="form-label">密码</span>
        <el-input v-model.trim="model.password"
                  show-password
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入"></el-input>
      </el-form-item> -->
      <el-form-item prop="name">
        <span slot="label"
              class="form-label">姓名</span>
        <el-input v-model.trim="model.name"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <span slot="label"
              class="form-label">角色</span>
        <el-select v-model="model.role"
                   multiple
                   placeholder="请选择"
                   style="width: 100%;">
          <el-option v-for="item in roleList"
                     v-bind:key="item.roleId"
                     v-bind:label="item.roleName"
                     v-bind:value="item.roleId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!model.userId"
                    prop="lockFlag">
        <span slot="label"
              class="form-label">账号状态</span>
        <el-radio-group v-model="model.lockFlag">
          <el-radio label="0">启用</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary"
                   v-bind:loading="isLoading"
                   v-on:click="submit">提 交</el-button>
        <el-button v-on:click="close">取 消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service'

export default {
  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    // 校验数字和字母
    // let validateNumberCharacter = (rule, value, callback) => {
    //   let pattern = /^[a-zA-Z0-9]*$/
    //   if (pattern.test(value)) {
    //     callback()
    //   } else {
    //     return callback(new Error())
    //   }
    // }
    // 校验中英文
    let validateChineseEnglish = (rule, value, callback) => {
      let pattern = /^[\u4e00-\u9fa5_a-zA-Z]*$/
      if (pattern.test(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    // 校验电话
    // let validateTel = (rule, value, callback) => {
    //   if (Peace.validate.isMobile(value)) {
    //     callback()
    //   } else {
    //     return callback(new Error())
    //   }
    // }
    return {
      CONSTANT,
      isLoading: false,

      roleList: [],

      model: {
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
        userId: '',
        username: '',
        password: '',
        name: '',
        role: [],
        lockFlag: ''
      },

      addRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          // { validator: validateTel, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请填写密码', trigger: 'blur' },
        //   { min: 6, max: 20, message: '密码长度为6 - 20位', trigger: 'blur' },
        //   { validator: validateNumberCharacter, message: '密码仅支持字母、数字组合', trigger: 'blur' }
        // ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '姓名长度为1 - 10位', trigger: 'blur' },
          { validator: validateChineseEnglish, message: '姓名仅支持中英文字符', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
        lockFlag: [{ required: true, message: '请选择账号状态', trigger: 'change' }]
      },
      editRules: {
        // password: [
        //   { required: true, message: '请填写密码', trigger: 'blur' },
        //   { min: 6, max: 20, message: '密码长度为6 - 20位', trigger: 'blur' },
        //   { validator: validateNumberCharacter, message: '密码仅支持字母、数字组合', trigger: 'blur' }
        // ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '姓名长度为1 - 10位', trigger: 'blur' },
          { validator: validateChineseEnglish, message: '姓名仅支持中英文字符', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      }
    }
  },

  computed: {},

  methods: {
    init(userId) {
      this.model.userId = userId || ''

      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.getRoleList().then(() => {
          if (this.model.userId) {
            Service.user()
              .get({ id: this.model.userId })
              .then((res) => {
                this.model.clientId = res.data.clientId
                this.model.userId = res.data.userId
                this.model.username = res.data.username
                this.model.name = res.data.name
                this.model.role = res.data.roleList.map((item) => item.roleId)
                this.model.lockFlag = res.data.lockFlag
              })
          }
        })
      })
    },

    getRoleList() {
      let params = {
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID
      }
      return Service.role()
        .list(params)
        .then((res) => {
          this.roleList = res.data
        })
    },

    submit() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)

        if (this.model.userId) {
          Service.user()
            .edit(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        } else {
          Service.user()
            .add(params)
            .then(() => {
              Peace.util.success('保存成功')
              this.$emit('close')
              this.$emit('refresh')
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        }
      })
    },

    close() {
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
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #fafafa;
  border-color: #dcdfe6;
  color: #333333;
  opacity: 1 !important;
}

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
</style>
