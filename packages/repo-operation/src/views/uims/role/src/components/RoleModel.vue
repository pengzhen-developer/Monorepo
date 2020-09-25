<template>
  <div class="full-width full-height">
    <div class="q-mb-lg">
      <el-form ref="form"
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="save"
               v-on:submit.native.prevent>
        <el-form-item prop="roleName">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色名称</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-input maxlength="10"
                    v-model.trim="model.roleName"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色备注</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input maxlength="10"
                    v-model.trim="model.remark"></el-input>
        </el-form-item>

        <el-form-item prop="status">
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">角色状态</span>
            <span class="text-center q-ml-sm">：</span>
          </div>

          <el-radio-group v-model="model.status">
            <el-radio v-bind:label="true">启用</el-radio>
            <el-radio v-bind:label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="select-menu">
          <div class="title">可选菜单</div>
          <div class="menu-tree">
            <el-input size="larger"
                      placeholder="输入关键字进行过滤"
                      v-model="filterText">
            </el-input>
            <q-scroll-area v-bind:thumb-style="thumbStyle"
                           v-bind:style="scrollAreaStyle">
              <el-tree ref="tree"
                       node-key="id"
                       show-checkbox
                       default-expand-all
                       highlight-current
                       v-bind:default-checked-keys="defaultChecked"
                       v-bind:filter-node-method="filterNode"
                       v-bind:props="{ children: 'children', label: 'menuName' }"
                       v-bind:data="menuTree">
              </el-tree>
            </q-scroll-area>
          </div>
        </div>
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
import Peace from '@src/library'
import Service from './../service'

export default {
  props: {
    data: Object
  },

  data() {
    return {
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
      filterText: '',

      model: {
        roleName: '',
        remark: '',
        status: true
      },

      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { pattern: Peace.validate.pattern.chinese, message: '仅支持输入中文', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {
    this.setPropsToModel()

    this.getMenuList()

    if (this.model.id) {
      this.getRoleMenuList()
    }
  },

  methods: {
    setPropsToModel() {
      this.model = Object.assign({}, this.model, this.data)
    },

    getMenuList() {
      Service.getMenuList().then((res) => {
        // 标识 virtual
        res.data.list.forEach((menu) => {
          menu.menuName = menu.virtual ? menu.menuName + '(*)' : menu.menuName
        })

        this.menuTree = Peace.util.arrayToTree(res.data.list, 'id', 'parentId', 'children')
      })
    },

    getRoleMenuList() {
      const params = {
        roleId: this.model.id
      }

      Service.getRoleMenuList(params).then((res) => {
        this.defaultChecked = res.data.menuList
      })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.menuName.indexOf(value) !== -1
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const request = this.model.id ? Service.editRole : Service.addRole
          const params = this.model

          // 取全选
          params.menuList = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          // 取半选
          params.menuListHalf = this.$refs.tree.getHalfCheckedKeys()

          request(params).then((res) => {
            Peace.util.success(res.msg)

            this.$emit('save')
          })
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
.select-menu {
  width: 360px;
  margin-bottom: 30px;
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