<template>
  <div v-show="type">
    <el-form ref="form"
             label-width="96px"
             v-bind:model="model"
             v-bind:rules="type === 'detail' ? {}:rules">
      <el-form-item prop="roleName">
        <span slot="label"
              class="form-label">角色名称</span>
        <div v-if="type === 'detail'">{{model.roleName}}</div>
        <el-input v-else
                  v-model.trim="model.roleName"
                  min="1"
                  maxlength="20"
                  placeholder="请输入"></el-input>

      </el-form-item>
      <el-form-item prop="roleDesc">
        <span slot="label"
              class="form-label">角色标识</span>
        <div v-if="type === 'detail'">{{model.roleCode}}</div>
        <el-input v-else
                  v-model.trim="model.roleCode"
                  minlength="3"
                  maxlength="20"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="roleDesc">
        <span slot="label"
              class="form-label">角色描述</span>
        <div v-if="type === 'detail'">{{model.roleDesc}}</div>
        <el-input v-else
                  v-model.trim="model.roleDesc"
                  type="textarea"
                  :rows="2"
                  maxlength="50"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="service">
        <span slot="label"
              class="form-label">角色类型</span>
        <div v-if="type === 'detail'">{{model.roleType | formatRoleType(dictList)}}</div>
        <el-select v-else
                   v-model="model.roleType"
                   placeholder="请选择"
                   style="width: 100%;">
          <el-option v-for="item in dictList"
                     v-bind:key="item.code"
                     v-bind:label="item.name"
                     v-bind:value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type !== 'detail'"
                    label=" ">
        <el-button type="primary"
                   v-bind:loading="isLoading"
                   v-on:click="submit">提 交</el-button>
        <el-button v-on:click="close">取 消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Peace from '@src/library'
import Service from '../service'

export default {
  data() {
    let validateCode = (rule, value, callback) => {
      let pattern = /^[A-Z_]*$/
      if (pattern.test(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    return {
      isLoading: false,

      type: '',

      // 角色类型字典
      dictList: [],

      model: {
        roleId: '',
        roleName: '',
        roleCode: '',
        roleDesc: '',
        roleType: ''
      },

      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '角色名称最多输入20个字符', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 20, message: '角色标识最多输入10个字符', trigger: 'blur' },
          { validator: validateCode, message: '角色标识仅支持大写英文、下划线', trigger: 'blur' }
        ],
        roleType: [{ required: true, message: '请选择角色类型', trigger: 'change' }]
      }
    }
  },

  filters: {
    formatRoleType(type, dictList) {
      return dictList.find((item) => item.code === type)?.name
    }
  },

  created() {
    this.getDict()
  },

  methods: {
    init(type, id) {
      this.type = type
      this.model.roleId = id || ''
      this.$nextTick(() => {
        if (this.type !== 'detail') {
          this.$refs.form.resetFields()
        }

        if (this.model.roleId) {
          Service.role()
            .get({ id: this.model.roleId })
            .then((res) => {
              this.model = res.data
            })
        }
      })
    },

    getDict() {
      Service.role()
        .dict()
        .then((res) => {
          this.dictList = res.data
        })
    },

    submit() {
      this.validateForm().then(() => {
        this.isLoading = true
        let params = Object.assign({}, this.model, {
          clientId: this.$store.state.info.role.clientId,
          productCode: this.$store.state.info.role.productCode || ''
        })

        if (this.model.roleId) {
          Service.role()
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
          Service.role()
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
