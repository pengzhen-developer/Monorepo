<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>

        <el-form-item v-bind:prop="model.id ? null : 'account'">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">账号名称</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input v-bind:disabled="!!model.id"
                    v-model.trim="model.account"
                    maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">密码</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input type="password"
                    show-password
                    maxlength="20"
                    v-model.trim="model.password"></el-input>
        </el-form-item>

        <el-form-item prop="realName">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">姓名</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input v-model.trim="model.realName"
                    maxlength="10"></el-input>
        </el-form-item>

        <el-form-item prop="roleId">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.roleId">
              <el-option v-for="item in source.roles"
                         v-bind:key="item.id"
                         v-bind:label="item.name"
                         v-bind:value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="sectorId">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">所属部门</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <div class="flex">
            <el-select class="col"
                       clearable
                       v-model.trim="model.sectorId">
              <el-option v-for="item in source.options"
                         v-bind:key="item.id"
                         v-bind:label="item.name"
                         v-bind:value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="status">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">账号状态</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-radio-group v-model="model.status">
            <el-radio v-bind:label="true">启用</el-radio>
            <el-radio v-bind:label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <div class="text-center">
      <el-button style="width: 80px;"
                 v-on:click="cancel">取消</el-button>
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service/index'
import Peace from '@src/library'
export default {
  props: {
    data: Object
  },

  data() {
    return {
      model: {
        id: null,
        account: '',
        password: '',
        realName: '',
        roleId: '',
        sectorId: '',
        status: true
      },

      rulesAdd: {
        account: [
          { required: true, message: '请输入账号名称' },
          { pattern: Peace.validate.pattern.username, message: '支持输入字母、数字，最长限制20位字符' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { pattern: Peace.validate.pattern.password, message: '支持输入字母、数字、下划线，6-20位字符' }
        ],
        realName: [
          { required: true, message: '请输入姓名' },
          { pattern: Peace.validate.pattern.chinese, message: '仅支持输入中文' },
          { max: 10, message: '最长限制10个字符' }
        ],
        roleId: [{ required: true, message: '请选择角色' }],
        sectorId: [{ required: true, message: '请选择部门' }],
        status: [{ required: true, message: '请选择状态' }]
      },

      rulesEdit: {
        account: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
        sectorId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },

      source: {
        roles: [],
        options: []
      }
    }
  },

  created() {
    this.sectorDictionary()
    this.roleDictionary()
    this.setPropsToModel()
  },

  computed: {
    rules() {
      return Peace.validate.isEmpty(this.model.id) ? this.rulesAdd : this.rulesEdit
    }
  },

  methods: {
    setPropsToModel() {
      this.model = Object.assign({}, this.model, this.data)
    },

    sectorDictionary() {
      const params = Peace.validate.isEmpty(this.data.id) ? { tag: 'sector' } : { tag: 'sector', adminId: this.data.id }
      Service.getQueryDictionary(params).then((res) => {
        this.source.options = res.data.list || []
      })
    },

    roleDictionary() {
      const params = Peace.validate.isEmpty(this.data.id) ? { tag: 'role' } : { tag: 'role', adminId: this.data.id }
      Service.getQueryDictionary(params).then((res) => {
        this.source.roles = res.data.list || []
      })
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const request = Peace.validate.isEmpty(this.model.id) ? Service.addUseAccount : Service.editUseAccount
          const params = this.model
          request(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('save')
          })
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