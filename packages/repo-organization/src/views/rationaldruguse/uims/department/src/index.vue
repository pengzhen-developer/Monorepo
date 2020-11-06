<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span>部门名称</span>
            <span class="text-center">：</span>
          </div>
          <el-input v-model="model.name"
                    placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
          <el-button v-on:click="view"
                     style="border-color:#3099A6;color:#3099A6;">查看部门结构</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <el-button type="primary"
                 icon="el-icon-plus"
                 style="margin-bottom: 20px;"
                 v-on:click="toRole('add', {})">新增</el-button>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column type="index"
                         fixed
                         align="center"
                         label=" "
                         width="60"></el-table-column>
        <el-table-column prop="DepartName"
                         label="部门名称"></el-table-column>
        <el-table-column prop="ParentDepartName"
                         label="上级部门">
          <template slot-scope="scope">
            {{scope.row.ParentDepartName||'——'}}
          </template>
        </el-table-column>

        <el-table-column prop="CreateTime"
                         label="创建时间">
        </el-table-column>
        <el-table-column min-width="100px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toRole('update', scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>
    <!--新增、修改部门 -->
    <PeaceDialog append-to-body
                 width="334px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title">
      <departmentModel v-if="dialog.visible"
                       ref="departModel"
                       v-on:close="dialog.visible = false"
                       v-on:refresh="get"></departmentModel>
    </PeaceDialog>

    <!-- 查看部门结构 -->
    <PeaceDialog width="334px"
                 v-bind:visible.sync="structDialog.visible"
                 title="部门结构">
      <structureModel v-if="structDialog.visible"
                      ref="roleModel"></structureModel>
    </PeaceDialog>
  </div>

</template>

<script>
import departmentModel from './components/departmentModel'
import structureModel from './components/structureModel'
import Service from './service'

export default {
  name: 'DepartManagement',
  components: {
    departmentModel,
    structureModel
  },
  data() {
    return {
      model: {
        name: ''
      },

      dialog: {
        visible: false,
        title: ''
      },
      structDialog: {
        visible: false
      }
    }
  },

  filters: {},

  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getDepartList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    toRole(type, row) {
      this.dialog.visible = true
      this.dialog.title = type == 'add' ? '新建部门' : '修改部门'
      this.$nextTick(() => {
        this.$refs.departModel.init(row ? row.Id : '')
      })
    },
    view() {
      this.structDialog.visible = true
    }
  }
}
</script>

<style scoped>
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
</style>