<template>
  <div>
    <el-form ref="form"
             label-width="96px"
             v-bind:model="model"
             v-bind:rules="rules">
      <el-form-item prop="roleName">
        <span slot="label"
              class="form-label">角色名称</span>
        <el-input v-model.trim="model.roleName"
                  maxlength="10"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="roleDesc">
        <span slot="label"
              class="form-label">备注</span>
        <el-input v-model.trim="model.roleDesc"
                  maxlength="10"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="service">
        <span slot="label"
              class="form-label">产品名称</span>
        <el-select v-model="model.service"
                   placeholder="请选择"
                   style="width: 100%;">
          <el-option v-for="item in productDict"
                     v-bind:key="item.code"
                     v-bind:label="item.name"
                     v-bind:value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <div class="select-menu">
        <div class="title">可选菜单</div>
        <div class="menu-tree">
          <q-scroll-area v-bind:thumb-style="thumbStyle"
                         v-bind:style="scrollAreaStyle">
            <el-tree ref="tree"
                     node-key="id"
                     show-checkbox
                     default-expand-all
                     highlight-current
                     v-bind:default-checked-keys="roleMenu"
                     v-bind:data="allMenu">
            </el-tree>
          </q-scroll-area>
        </div>
      </div>
      <el-form-item label=" ">
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
import Peace from '@src/library'
import Util from '@src/util'
import Service from '../service'

export default {
  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    // 校验中文
    let validateChinese = (rule, value, callback) => {
      let pattern = /^[\u4e00-\u9fa5]*$/
      if (pattern.test(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    return {
      CONSTANT,
      isLoading: false,

      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {
        height: '400px'
      },

      menuTree: [],
      defaultChecked: [],

      allMenu: [],
      roleMenu: [],

      // 产品字典
      productDict: [],

      model: {
        clientId: Util.user.getUserInfo().clientId,
        organCode: Util.user.getUserInfo().custCode,
        productCode: '',

        roleId: '',
        roleName: '',
        roleDesc: '',
        menuIds: []
      },

      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '角色名称最多输入10个字符', trigger: 'blur' },
          { validator: validateChinese, message: '角色名称仅支持中文字符', trigger: 'blur' }
        ],
        roleDesc: [{ min: 0, max: 10, message: '备注最多输入10个字符', trigger: 'blur' }],
        productCode: [{ required: true, message: '请选择产品', trigger: 'change' }],
        menuIds: [{ required: true, message: '请选择菜单', trigger: 'change' }]
      }
    }
  },

  computed: {},

  created() {
    this.getProductDict()
    this.getMenuList()
  },

  methods: {
    init(id) {
      this.model.id = id || 0
      this.$nextTick(() => {
        this.$refs.form.resetFields()

        if (this.model.id) {
          Service.getRoleInfo({ accountId: this.model.id }).then((res) => {
            this.model = res.data
          })
        }
      })
    },
    // 获取产品字典列表
    getProductDict() {
      return Service.product()
        .dict()
        .then((res) => {
          this.productDict = res.data
        })
    },

    getMenuList() {
      let res = []
      // Service.getMenuList().then((res) => {
      // 标识 virtual
      res.data.list.forEach((menu) => {
        menu.menuName = menu.virtual ? menu.menuName + '(*)' : menu.menuName
      })

      this.menuTree = Peace.util.arrayToTree(res.data.list, 'id', 'parentId', 'children')
      // })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.menuName.indexOf(value) !== -1
    },

    submit() {
      this.validateForm().then(() => {
        this.isLoading = true

        const params = Peace.util.deepClone(this.model)

        if (this.model.id) {
          Service.editRole(params)
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
          Service.addRole(params)
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

.select-menu {
  width: 320px;
  margin: 30px 0;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  .title {
    padding: 12px 14px;
    height: 48px;
    background: #f5f5f5;
    border-radius: 4px 4px 0px 0px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }
}

::v-deep {
  .el-tree-node__content {
    height: 50px;
  }

  .el-tree-node__content > label.el-checkbox {
    margin-right: 24px;
  }

  .el-tree-node__label {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
}
</style>
