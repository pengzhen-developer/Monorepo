<template>
  <div>
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
    <div class="dialog-foot">
      <el-button type="primary"
                 v-bind:loading="isLoading"
                 v-on:click="submit">更 新</el-button>
      <el-button v-on:click="close">取 消</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  data() {
    return {
      isLoading: false,

      roleId: '',

      allMenu: [],
      roleMenu: [],

      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {
        height: '400px'
      }
    }
  },

  mounted() {},

  methods: {
    init(id) {
      this.roleId = id
      this.$nextTick(() => {
        this.getAllMenu().then(() => {
          this.getRoleMenu()
        })
      })
    },

    getAllMenu() {
      let params = {
        clientId: this.$store.state.info.role.clientId,
        productCode: this.$store.state.info.role.productCode || ''
      }
      return Service.menu()
        .allMenuTree(params)
        .then((res) => {
          this.allMenu = res.data
        })
    },

    getRoleMenu() {
      return Service.menu()
        .roleMenu({ roleId: this.roleId })
        .then((res) => {
          let checked = this.resolveAllEunuchNodeId(this.allMenu, res.data, [])
          this.roleMenu = checked
        })
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
          temp.push(idArr.filter((id) => id === item.id))
        }
      }
      return temp
    },

    submit() {
      this.isLoading = true

      // 取全选
      let menuList = this.$refs.tree.getCheckedKeys()
      // 取半选
      let menuListHalf = this.$refs.tree.getHalfCheckedKeys()

      let params = {
        menuIds: menuList.concat(menuListHalf).join(','),
        roleId: this.roleId
      }

      Service.role()
        .updateMenu(params)
        .then(() => {
          Peace.util.success('更新成功')
          this.$emit('close')
        })
    },

    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.select-menu {
  width: 320px;
  margin-bottom: 20px;
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

.dialog-foot {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
