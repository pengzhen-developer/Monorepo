<template>
  <div>
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
                  maxlength="10"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="roleDesc">
        <span slot="label"
              class="form-label">备注</span>
        <div v-if="type === 'detail'">{{model.roleDesc}}</div>
        <el-input v-else
                  v-model.trim="model.roleDesc"
                  maxlength="10"
                  placeholder="请输入"></el-input>
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
                     v-bind:default-checked-keys="roleMenu"
                     v-bind:filter-node-method="filterNode"
                     v-bind:data="menuTree">
            </el-tree>
          </q-scroll-area>
        </div>
      </div>
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
import Service from '../service'

export default {
  props: {
    menus: Object
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
      isLoading: false,
      type: '',

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
      roleMenu: [],
      filterText: '',

      model: {
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
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
        menuIds: [{ required: true, message: '请选择菜单', trigger: 'change' }]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    init(type, roleId) {
      this.type = type
      this.model.roleId = roleId || ''

      this.$nextTick(() => {
        if (this.type !== 'detail') {
          this.$refs.form.resetFields()
        }
        const param = {}
        if (this.model.roleId) {
          //roleId有则为修改，根据roleId获取对应菜单
          param.id = this.model.roleId

          Service.role()
            .get(param)
            .then((res) => {
              this.model = res.data

              this.model.menuIds = res.data.menuIds ? res.data.menuIds.split(',') : []
              this.getMenuList().then(() => {
                if (this.type !== 'detail') {
                  let checked = this.resolveAllEunuchNodeId(this.menuTree, this.model.menuIds, [])
                  this.roleMenu = checked
                } else {
                  let selected = this.resolveAllSelectNodeId(this.menuTree, this.model.menuIds, [])
                  this.menuTree = selected
                  this.roleMenu = Peace.util.deepClone(this.model.menuIds)
                }
              })
            })
        } else {
          //roleId无则为新增，获取当前终端全量菜单
          this.getMenuList().then(() => {
            let checked = this.resolveAllEunuchNodeId(this.menuTree, this.model.menuIds, [])
            this.roleMenu = checked
          })
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    // 获取产品对应菜单
    getMenuList() {
      let params = {
        lazy: false,
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID
      }
      return Service.menu()
        .menuTree(params)
        .then((res) => {
          this.menuTree = this.filterMenuTree(res.data)
          this.roleMenu = []
        })
    },
    filterMenuTree(tree) {
      const menuBefore = []
      menuBefore.map((temp) => {
        tree.map((menu, index) => {
          if (temp == menu.name) {
            tree.splice(index, 1)
          }
        })
      })
      return tree
    },

    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter((id) => id == item.id))
        }
      }
      return temp
    },

    /**
     * 解析出已选节点树
     * @param data 待解析节点树
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 已选节点树
     */
    resolveAllSelectNodeId(data, idArr, temp = []) {
      if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          if (idArr.find((n) => n == item.id)) {
            item.disabled = true
            if (item.children && item.children.length !== 0) {
              let arr = []
              let subItem = this.resolveAllSelectNodeId(item.children, idArr, arr)
              item.children = subItem
            }
            temp.push(item)
          }
        }
      }
      return temp
    },

    submit() {
      this.validateForm().then(() => {
        this.isLoading = true

        // 取全选
        let menuList = this.$refs.tree.getCheckedKeys()
        // 取半选
        let menuListHalf = this.$refs.tree.getHalfCheckedKeys()
        this.model.menuIds = menuList.concat(menuListHalf).join(',')

        const params = Peace.util.deepClone(this.model)

        if (!params.menuIds) {
          Peace.util.warning('请选择菜单')
          this.isLoading = false
          return false
        }

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
