<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-suffix="："
               size="mini"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="科室名称">
          <el-input v-model.trim="model.platDeptName"
                    placeholder="请输入科室名称"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="展示位置">
          <el-select v-model.trim="model.displayPosition"
                     placeholder="请输入"
                     clearable>
            <el-option v-for="item in source.DepartmentPosition"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="add">新增</el-button>

        <el-button plain
                   v-on:click="openDraggableDialog"
                   type="primary">拖拽排序</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>

        <peace-table-column label="科室ID"
                            min-width="120px"
                            prop="id"></peace-table-column>

        <peace-table-column label="科室名称"
                            min-width="140px"
                            prop="deptName"></peace-table-column>

        <peace-table-column label="科室图标">
          <template slot-scope="scope">
            <img :src="imageSrc(scope.row.deptIcon)"
                 :alt="scope.row.deptName"
                 class="dept-image">
          </template>
        </peace-table-column>

        <peace-table-column label="属性" min-width="80px">
          <template slot-scope="scope">
            <div>{{ scope.row.attribute | filterDictionary(source.DisplayAttrForDepartment) }}</div>
          </template>
        </peace-table-column>

        <peace-table-column label="展示位置" min-width="120px">
          <template slot-scope="scope">
            <div>{{ scope.row.displayPosition | filterDictionary(source.DepartmentPosition) }}</div>
          </template>
        </peace-table-column>

        <peace-table-column label="排序"
                            min-width="80px"
                            prop="sort">
          <template slot-scope="scope">
            <div>{{ scope.row.sort || '-' }}</div>
          </template>
        </peace-table-column>

        <peace-table-column label="扫码查看">
          <div class="ewm"></div>
        </peace-table-column>

        <peace-table-column fixed="right"
                            label="操作">
          <template slot-scope="scope">
            <el-button @click="openDeptModelDialog('编辑科室', scope.row)"
                       type="text">修改</el-button>
          </template>
        </peace-table-column>


      </PeaceTable>
    </div>

    <edit-department v-model="dialog.visible"
                     v-if="dialog.visible"
                     v-bind:title = "dialog.title"
                     v-bind:data="dialog.data"
                     v-on:refresh="search">

    </edit-department>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="draggableDialogVisible"
                  append-to-body
                  class="scroll-body"
                  title="科室排序"
                  v-if="draggableDialogVisible"
                  width="500px">
      <dept-draggable :isSingle="false"
                     :list="dragList"
                     @getSorts="getSorts" />
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service/index'
import CONSTANT from './constant'
import EditDepartment from "./components/EditDepartment"
import DeptDraggable from "./components/DeptDraggable"

export default {
  components: {
    EditDepartment,
    DeptDraggable
  },
  data() {
    return {
      dialog: {
        visible: false,
        title: undefined,
        data: {
          attribute: 0,
          displayPosition: 0
        },
      },

      total: 10,
      draggableDialogVisible: false,
      dragList: [],

      model: {
        platDeptName: "",
        displayPosition: "",
      },

      source: {
        DisplayAttrForDepartment: CONSTANT.DisplayAttrForDepartment,
        DepartmentPosition:  CONSTANT.DepartmentPosition,
      }
    }
  },
  async mounted() {
    this.$nextTick().then(() => {
      this.search()
    })
  },
  methods: {
    search() {
      const fetch = Service.getDepartments
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        this.total = res.data.total ?? 10
        return res
      })
    },
    // 打开 新增/编辑科室 Dialog
    openDeptModelDialog(title, dept) {
      this.dialog.title = title
      this.dialog.data = {
        deptId: dept.id,
        deptName: dept.deptName,
        attribute: dept.attribute,
        displayPosition: dept.displayPosition,
        imgUrl: dept.deptIcon
      }
      this.dialog.visible = true
    },

    add() {
      this.dialog.title = "新增科室"
      this.dialog.data = {
        attribute: 0,
        displayPosition: 1
      }
      this.dialog.visible = true
    },

    // 进入拖拽排序
    openDraggableDialog() {
      Service.getDepartments({
        platDeptName: "",
        displayPosition: "",
        p: 1,
        size: this.total
      }).then((res) => {
        const list = res.data.list
        // 过滤不展示的科室
        this.dragList = list.filter((item) => {
          item.isCurrent = true
          return !item.attribute
        })
        this.draggableDialogVisible = true
      })
    },

    // 获取排序
    getSorts(param) {
      const list = param
      const newSort = []
      list.forEach((element, index) => {
        newSort.push({
          id: element.id,
          displayPosition: index < 7 ? 0 : element.displayPosition || 1,
          sort: index + 1
        })
      })
      const data = new FormData()
      data.append('platDeptList', JSON.stringify(newSort))

      Service.updateSorts(data)
          .then(() => {
            Peace.util.success('科室排序已更新！')
            this.search()
          })
          .finally(() => {
            this.draggableDialogVisible = false
          })
    },

    imageSrc(path) {
      `${process.env.VUE_APP_API_BASE}nethospital${path}`
    }
  }
}
</script>

<style>
</style>
