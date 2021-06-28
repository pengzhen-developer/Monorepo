<template>
  <div class="layout-route"
       v-bind:style="scrollAreaStyle">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               class="card-search"
               label-width="auto"
               label-suffix="："
               inline>
        <RegionSelector :defaultArea="false"
                        :selected="false"
                        clearable
                        ref="regionSelector"></RegionSelector>
        <el-form-item label="医疗机构">
          <el-input clearable
                    placeholder="输入医院名称"
                    v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="getList(1)"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card content">
      <div class="hospital-list">
        <peace-table :data="list"
                     @row-click="setDefaultRow(currentRow)"
                     highlight-current-row
                     ref="list"
                     size="medium">

          <peace-table-column label="序号"
                              prop="id"
                              width="80">
            <template slot-scope="scope">
              <span>{{(search.pageNumber - 1) * search.pageSize + scope.$index + 1}}</span>
            </template>
          </peace-table-column>
          <peace-table-column label="医疗机构"
                              prop="name"></peace-table-column>
          <peace-table-column fixed="right"
                              label="操作"
                              width="100">
            <template slot-scope="scope">
              <el-button @click="getDepartInfo(scope.row)"
                         type="text">查看详情</el-button>
            </template>
          </peace-table-column>
        </peace-table>
      </div>
      <div class="depart-list"
           v-if="departs && departs.length">
        <el-collapse accordion
                     v-model="activeNames">
          <el-collapse-item :key="'depart_' + depart.id"
                            :name="depart.id"
                            v-for="depart in departs">
            <div class="title"
                 slot="title">
              <span>{{ depart.name }}</span>
            </div>
            <div :key="'departChild_' + departChild.id"
                 class="depart-item"
                 v-for="departChild in depart.children">
              <i @click.stop="openEditDepartmentDialog(departChild.id, departChild.name, depart.id, depart.name)"
                 class="el-icon-edit-outline mr-sm"></i>
              <span>{{ departChild.name }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-pagination :current-page.sync="search.pageNumber"
                     :page-size.sync="search.pageSize"
                     :total="count"
                     @current-change="getList"
                     @size-change="getList(1)"
                     background
                     class="q-mt-10"
                     layout="total, sizes ,->, prev, pager,  next"></el-pagination>
    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="editDeptDialogVisible"
                  append-to-body
                  title="编辑科室"
                  v-if="editDeptDialogVisible"
                  width="300px">
      <OrgDetailsDepartmentModel :departmentId="currentDeptId"
                                 :departmentName="currentDeptName"
                                 :departmentPid="currentDeptPid"
                                 :parentDeptName="currentParentDeptName"
                                 @submit="editDepartment" />
    </peace-dialog>
  </div>
</template>
<script>
import RegionSelector from './components/RegionSelector'
import OrgDetailsDepartmentModel from './components/OrgDetailsDepartmentModel'
import Service from './service/index'
import { dom } from 'quasar'

export default {
  name: 'DepartmentDictionary',
  components: { RegionSelector, OrgDetailsDepartmentModel },
  data() {
    return {
      list: [],
      departs: [],
      search: {
        province: '',
        city: '',
        name: '',
        pageNumber: 1,
        pageSize: 10
      },
      count: 0,
      currentRow: '',
      currentDeptId: '',
      currentDeptName: '',
      currentDeptPid: '',
      currentParentDeptName: '',
      editDeptDialogVisible: false,
      activeNames: [],
      citys: [],
      scrollAreaStyle: {}
    }
  },
  watch: {
    currentRow() {
      this.activeNames = []
    }
  },
  methods: {
    getList(number) {
      this.departs = []
      if (number && this.search.pageNumber !== number) {
        this.search.pageNumber = number
      } else {
        this.currentRow = ''
      }
      let region = {}
      if (this.$refs.regionSelector) {
        region = this.$refs.regionSelector.getSelected()
      }
      const { province, city } = region
      const { name, pageNumber, pageSize } = this.search

      Service.getHospitals({ province: province, city: city, name: name, p: pageNumber, size: pageSize }).then(
        (res) => {
          const rs = res.data
          this.list = rs.list
          this.count = rs.count

          if (!this.currentRow) {
            this.getDepartInfo(rs.list[0])
          }
        }
      )
    },
    // 打开编辑科室 Dialog
    openEditDepartmentDialog(id, name, pid, pname) {
      this.currentDeptId = id
      this.currentDeptName = name
      this.currentDeptPid = pid || '0'
      this.currentParentDeptName = pname || ''

      this.editDeptDialogVisible = true
    },
    // 关闭编辑科室 Dialog
    closeEditDepartmentDialog() {
      this.editDeptDialogVisible = false
    },
    // 编辑科室
    editDepartment(params) {
      const id = this.currentRow.id
      const deptId = params.departmentId
      const deptName = params.departmentName

      Service.editDepartmentInfo({ id: deptId, hospitalId: id, deptName: deptName }).then((res) => {
        const msg = res.msg || '科室编辑成功'
        Peace.util.success(msg)

        this.closeEditDepartmentDialog()

        this.getDepartInfo(this.currentRow)
      })
    },

    setDefaultRow(row) {
      this.$refs.list.$children[0].setCurrentRow(row)
    },

    getDepartInfo(row) {
      this.setDefaultRow(row)
      this.currentRow = row

      Service.getDepartmentInfo({ id: row.id }).then((res) => {
        const rs = res.data
        this.departs = rs
        if (rs.length && !this.activeNames.length) {
          this.activeNames = [rs[0].id]
        }
      })
    },

    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
      // 设定滚动区域样式
      this.setScrollAreaStyle()
    })
  }
}
</script>


<style lang="scss" scoped>
.content {
  height: calc(100% - 75px);
  min-height: 300px;
  overflow: auto;
}
.hospital-list,
.depart-list {
  height: calc(100% - 52px);
  min-height: 200px;
  width: 50%;
  font-size: 0;
  border: 1px solid #eee;
  border-radius: 4px;
  display: inline-block;
  vertical-align: top;
  overflow-y: auto;
}

.hospital-list {
  ::v-deep .current-row {
    & > td:nth-child(2) {
      color: var(--q-color-primary);
    }
  }
}
.depart-list {
  margin-left: 20px;
  padding: 20px;
  width: calc(50% - 20px);
  border: 1px solid var(--q-color-primary);
  .el-collapse {
    border: 0;
  }
  ::v-deep .el-collapse-item__header {
    padding: 10px 15px;
    height: auto;
    line-height: 20px;
    font-weight: normal;
    font-weight: 400;
    border: 0;
    background-color: #f5f7fa;
  }
  ::v-deep .el-collapse-item__content {
    padding: 0;
    text-align: center;
    .depart-item {
      line-height: 32px;
      cursor: pointer;
      &:hover {
        background-color: #fbfbfb;
      }
      & > span {
        vertical-align: middle;
      }
    }
  }
  ::v-deep .el-collapse-item__wrap {
    border-bottom: 0;
  }
}
i.el-icon-edit-outline {
  font-size: 18px;
  color: var(--q-color-primary);
  cursor: pointer;
  vertical-align: middle;
}
</style>