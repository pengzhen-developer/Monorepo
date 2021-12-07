<template>
  <div>
    <div class="card">
      <el-button type="primary"
                 v-on:click="onOpenMenuModel('create',{})">新增</el-button>
    </div>

    <div class="card">
      <el-input placeholder="输入关键字进行过滤"
                v-model="keyword"></el-input>
      <el-table row-key="id"
                default-expand-all
                v-bind:tree-props="{children: 'children', hasChildren: 'hasChildrens'}"
                v-bind:data="filterData"
                size="mini">
        <PeaceTableColumnTree label="菜单名称"
                              min-width="120px"
                              prop="id"
                              align="left">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </PeaceTableColumnTree>
        <PeaceTableColumn label="菜单编码"
                          width="100px"
                          prop="id"></PeaceTableColumn>
        <PeaceTableColumn label="排序字段"
                          width="100px"
                          prop="sort"></PeaceTableColumn>
        <PeaceTableColumn label="是否角色控制"
                          width="140px"
                          prop="isDisplay">
          <template slot="header">
            <span>依赖角色控制</span>
            <el-tooltip>
              <div slot="content">
                依赖角色控制时，该菜单的显示根据《角色管理》控制
                <br />
                脱离角色控制时，该菜单永远显示！！！！
              </div>
              <i class="el-icon-question cursor-pointer"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            {{ scope.row.isDisplay === '1' ? '是' : '否' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="菜单管理"
                          align="left"
                          width="160px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="onOpenMenuModel('child',scope.row)">新增</el-button>
            <el-button type="text"
                       v-on:click="onOpenMenuModel('update',scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="路由管理"
                          width="90px"
                          prop="type"
                          align="left">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="onOpenMenuRouteModel(scope.row)">路由管理</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="元素管理"
                          width="90px"
                          prop="type"
                          align="left">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="onOpenMenuElementsModel(scope.row)">元素管理</el-button>
          </template>
        </PeaceTableColumn>
      </el-table>
    </div>
    <el-dialog v-if="dialogMenu.visible"
               width="450px"
               v-bind:visible.sync="dialogMenu.visible"
               :title="dialogMenu.type!=='update'?'新建菜单':'编辑菜单'">
      <MenuModel v-on:onClose="onClose"
                 v-bind:info="dialogMenu.data"></MenuModel>
    </el-dialog>
    <el-dialog v-if="dialogMenuElementsRoute.visible"
               :close-on-click-modal="false"
               v-bind:visible.sync="dialogMenuElementsRoute.visible"
               title="元素管理">
      <MenuElementsModel v-on:onClose="onClose"
                         v-bind:info="dialogMenuElementsRoute.data"></MenuElementsModel>
    </el-dialog>
    <el-dialog v-if="dialogMenuRoute.visible"
               :close-on-click-modal="false"
               width="1200px"
               v-bind:visible.sync="dialogMenuRoute.visible"
               title="路由管理">
      <MenuRouteModel v-on:onClose="onClose"
                      v-bind:info="dialogMenuRoute.data"></MenuRouteModel>
    </el-dialog>
  </div>

</template>

<script>
import Service from '../service'
import MenuModel from './MenuModel.vue'
import MenuElementsModel from './MenuElementsModel.vue'
import MenuRouteModel from './MenuRouteModel.vue'
export default {
  name: 'MenuMain',
  components: { MenuModel, MenuElementsModel, MenuRouteModel },
  data() {
    return {
      keyword: '',

      list: [],
      dialogMenu: {
        type: 'create',
        visible: false,
        data: {}
      },
      dialogMenuElementsRoute: {
        visible: false,
        data: {}
      },
      dialogMenuRoute: {
        type: 'create',
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    filterData: function() {
      let keyword = this.keyword
      let treeData = this.list

      if (keyword) {
        let handleTreeData = this.handleTreeData(treeData, keyword)
        return handleTreeData
      } else {
        return treeData
      }
    }
  },

  watch: {
    '$store.state.info.menu.clientId'() {
      this.getList()
    },
    '$store.state.info.menu.productId'(val) {
      if (val) {
        this.getList()
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    handleTreeData(treeData, searchValue) {
      if (!treeData || treeData.length === 0) {
        return []
      }
      const array = []
      for (let i = 0; i < treeData.length; i += 1) {
        if (this.handleTreeData(treeData[i].children, searchValue).length > 0 || treeData[i].name.includes(searchValue)) {
          array.push({
            ...treeData[i],
            children: this.handleTreeData(treeData[i].children, searchValue)
          })
        }
      }
      return array
    },

    getList() {
      const params = {
        clientId: this.$store.state.info.menu.clientId,
        productCode: this.$store.state.info.menu.productCode,
        whole: true
      }
      Service.menu()
        .getList(params)
        .then((res) => {
          this.list = res.data
        })
    },

    onOpenMenuModel(type, data) {
      this.dialogMenu.visible = true
      this.dialogMenu.type = type
      data.clientId = this.$store.state.info.menu.clientId
      data.productCode = this.$store.state.info.menu.productCode
      switch (type) {
        case 'create':
          data.parentId = -1
          break
        case 'child':
          data.parentId = data.id
          break
        default:
          break
      }

      data.mode = type
      data.menuId = data.id
      this.dialogMenu.data = data
    },

    onOpenMenuElementsModel(data) {
      this.dialogMenuElementsRoute.visible = true
      this.dialogMenuElementsRoute.data = data
    },

    onOpenMenuRouteModel(data) {
      this.dialogMenuRoute.visible = true
      this.dialogMenuRoute.data = data
    },

    onClose() {
      this.dialogMenu.visible = false
      this.dialogMenuRoute.visible = false
      this.getList()
    },

    deleteItem(data) {
      const params = { id: data.id }
      this.$confirm('确定删除吗？').then(() => {
        Service.menu()
          .delete(params)
          .then((res) => {
            Peace.util.success(res.msg)

            this.getList()
          })
      })
    }
  }
}
</script>

