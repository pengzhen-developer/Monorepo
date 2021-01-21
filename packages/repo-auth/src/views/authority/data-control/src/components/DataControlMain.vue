<template>
  <div>
    <div class="card">
      <el-button type="primary"
                 v-on:click="onOpenMenuModel('create',{})">新增受控项</el-button>
    </div>
    <div class="card">
      <peace-table pagination
                   ref="table"
                   size="mini">

        <PeaceTableColumn label="控制类型"
                          min-width="180px"
                          prop="controlledType"
                          align="left">
          <template slot-scope="scope">
            {{ scope.row.controlledType | filterDictionary(controlledType) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="控制标识"
                          min-width="120px"
                          prop="controlledSign"></PeaceTableColumn>
        <PeaceTableColumn label="控制菜单"
                          width="140px"
                          prop="menuId">
          <template slot-scope="scope">
            {{ formatMenuName(scope.row) }} - {{ scope.row.menuId }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="描述"
                          min-width="180px"
                          prop="description"></PeaceTableColumn>
        <PeaceTableColumn label="排序"
                          width="80px"
                          prop="sort"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          align="left"
                          width="120px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenMenuModel('update',scope.row)">修改</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </peace-table>
    </div>
    <el-dialog width="450px"
               v-if="dialogDataControl.visible"
               v-bind:visible.sync="dialogDataControl.visible"
               v-bind:title="dialogDataControl.type !== 'update' ? '新建受控项' : '编辑受控项' ">
      <DataControlModel v-on:onClose="onClose"
                        v-bind:info="dialogDataControl.data"></DataControlModel>
    </el-dialog>
  </div>

</template>

<script>
import Service from '../service'
import DataControlModel from './DataControlModel'

export default {
  name: 'DataControlMain',

  components: {
    DataControlModel
  },

  data() {
    return {
      list: [],

      controlledType: [],

      dialogDataControl: {
        type: 'create',
        visible: false,
        data: {}
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

  async created() {
    this.controlledType = await Peace.identity.dictionary.getList('base_data_control')
  },

  methods: {
    formatMenuName(row) {
      return this.menuList?.data.find((item) => item.menuId === row.menuId)?.name
    },

    async getList() {
      const fetch = Service.controlledMenu().page
      const params = {
        clientId: this.$store.state.info.menu.clientId,
        productCode: this.$store.state.info.menu.productCode
      }

      this.menuList = await Service.menu().menuList(params)
      this.$refs.table.reloadData({ fetch, params })
    },

    onOpenMenuModel(type, data) {
      this.dialogDataControl.visible = true
      this.dialogDataControl.type = type
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
      this.dialogDataControl.data = data
    },

    onClose() {
      this.dialogDataControl.visible = false
      this.getList()
    },

    deleteItem(data) {
      const params = { id: data.id }
      this.$confirm('确定删除吗？').then(() => {
        Service.controlledMenu()
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

