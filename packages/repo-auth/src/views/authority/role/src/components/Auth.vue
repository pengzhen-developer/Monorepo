<template>
  <div>
    <div class="el-dialog__body custom-tree-container">
      <el-input v-show="false"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
      </el-input>

      <div class="block">
        <div class="header flex justify-between items-center q-py-md bg-grey-2 text-bold">
          <div class="col q-px-md">可选菜单</div>
          <div style="width: 800px;">可选元素</div>
        </div>

        <!-- 使用 tree 模拟 tree table -->
        <!-- 支持父子节点联动选择 -->
        <!-- 支持父子节点联动选择 -->
        <el-tree :data="allMenu"
                 show-checkbox
                 node-key="id"
                 default-expand-all
                 ref="tree"
                 v-on:check-change="checkChange"
                 v-bind:expand-on-click-node="false"
                 v-bind:filter-node-method="filterNode">
          <span class="flex col justify-between items-center"
                slot-scope="{ data }">
            <span class="col">{{ data.label }}</span>

            <div style="width: 800px;">
              <el-checkbox-group class="flex wrap"
                                 v-model="roleElement">
                <el-checkbox v-for="item in data.menuElements"
                             v-bind:key="item.elementId"
                             v-bind:label="data.id + '-' + item.elementId">{{ item.elementName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </span>
        </el-tree>
      </div>
    </div>

    <div class="el-dialog__footer">
      <el-button type="primary"
                 v-on:click="submit">更 新</el-button>
      <el-button v-on:click="close">取 消</el-button>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  data() {
    return {
      filterText: '',

      allMenu: [],
      roleMenu: [],
      roleElement: []
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    async init(id) {
      this.roleId = id

      // 获取全量角色菜单、元素
      await this.getAllMenu()
      // 获取当前角色菜单、元素
      await this.getRoleMenu()
      // 勾选菜单（元素通过 v-model 勾选）
      this.$refs.tree.setCheckedKeys(this.roleMenu)
    },

    getAllMenu() {
      let params = {
        clientId: this.$store.state.info.role.clientId,
        productCode: this.$store.state.info.role.productCode || '',
        whole: true
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
          this.roleMenu = this.resolveAllEunuchNodeId(this.allMenu, res.data, [])
            .flat()
            .map((item) => item.menuId)

          this.roleElement = res.data.map((item1) => item1.elementIds?.split(',').map((item2) => item1.menuId + '-' + item2)).flat()
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
          const checked = idArr.filter((temp) => temp.menuId === item.id)
          if (checked.length) {
            temp.push(checked)
          }
        }
      }
      return temp
    },

    async submit() {
      let params = {
        roleId: this.roleId,
        roleDetail: []
      }

      this.roleMenu.forEach((roleMenuValue) => {
        const temp = {
          menuId: roleMenuValue,
          elementIds: []
        }

        this.roleElement.forEach((roleElementValue) => {
          if (roleElementValue?.split('-')?.[1] && roleMenuValue.toString() === roleElementValue?.split('-')?.[0]?.toString()) {
            temp.elementIds.push(roleElementValue?.split('-')?.[1].toString())
          }
        })

        // 应服务端要求，以字符串数组传递
        temp.elementIds = temp.elementIds.toString()

        params.roleDetail.push(temp)
      })

      await Service.role().updateMenu(params)
      this.close()
    },

    close() {
      this.$emit('close')
    },

    checkChange() {
      this.roleMenu = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
    }
  }
}
</script>

<style>
.el-tree:not(.element-ui-default) {
  border: 1px solid #eeeeee;
  border-bottom: unset;
}
</style>