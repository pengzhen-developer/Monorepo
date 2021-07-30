<template>
  <div class="layout-route">
    <div class="card">
      <div>
        <el-button @click="openDraggableDialog()"
                   :disabled="parentDeptList.length==0"
                   type="primary">科室排序</el-button>
        <el-button @click="openDepartmentDialog('一级')"
                   type="default">新增一级科室</el-button>

      </div>
      <el-collapse class="q-mt-24"
                   v-if="list && list.length"
                   v-model="activeName">

        <el-collapse-item :key="depart.id"
                          :name="depart.id"
                          :title="depart.netdept_name"
                          v-for="depart in list">
          <div class="title"
               slot="title">
            <i @click.stop="openEditDepartmentDialog('一级', depart.id, depart.netdept_name)"
               class="el-icon-edit-outline"></i>
            <span> {{ depart.netdept_name }}</span>
            <el-button @click.stop="openDepartmentDialog('二级', depart.id, depart.netdept_name)"
                       class="title-btn"
                       type="text">新增二级科室</el-button>
          </div>

          <div class="child-dept"
               v-if="depart.children && depart.children.length">
            <div class="child-dept-item">
              <div class="item-child">
                <span>二级科室</span>
              </div>
              <div class="item-child">科室编号(HIS)</div>
              <div class="item-child">特色科室</div>
            </div>
            <div :key="childDept.id"
                 class="child-dept-item"
                 v-for="childDept in depart.children">
              <div class="item-child">
                <i @click.stop="openEditDepartmentDialog('二级', childDept.id, childDept.netdept_name, depart.id, depart.netdept_name,childDept.his_dept_code)"
                   class="el-icon-edit-outline"></i>
                <span> {{ childDept.netdept_name }}</span>
              </div>
              <div class="item-child">{{childDept.his_dept_code}}</div>
              <div class="item-child">
                <el-checkbox :false-label="0"
                             :true-label="1"
                             @change="setSpecDepartment(childDept)"
                             v-model="childDept.characteristicDept"></el-checkbox>
              </div>
            </div>
          </div>

        </el-collapse-item>
      </el-collapse>

      <PeaceDialog :visible.sync="draggableDialogVisible"
                   append-to-body
                   class="scroll-body"
                   title="科室排序"
                   v-if="draggableDialogVisible"
                   width="500px">
        <DeptDraggable :isSingle="false"
                       :list="parentDeptList"
                       @getSorts="getSorts" />
      </PeaceDialog>

      <PeaceDialog :visible.sync="editDeptDialogVisible"
                   append-to-body
                   :title="'编辑'+ currentDeptLevel +'科室'"
                   v-if="editDeptDialogVisible"
                   width="300px">
        <OrgDetailsDepartmentModel :departmentId="currentDeptId"
                                   :departmentName="currentDeptName"
                                   :departmentPid="currentDeptPid"
                                   :parentDeptName="currentParentDeptName"
                                   :hisDeptCode="hisDeptCode"
                                   :isEdit="true"
                                   @success="editDepartmentSuccess" />
      </PeaceDialog>

      <PeaceDialog :visible.sync="createDeptDialogVisible"
                   append-to-body
                   :title="'新增'+ currentDeptLevel +'科室'"
                   v-if="createDeptDialogVisible"
                   width="300px">
        <OrgDetailsDepartmentModel :departmentPid="currentDeptPid"
                                   :parentDeptName="currentParentDeptName"
                                   :isEdit="false"
                                   @success="createDepartmentSuccess" />
      </PeaceDialog>

    </div>
  </div>
</template>
<script>
import Service from './service'
import DeptDraggable from './components/DepartmentSort'
import OrgDetailsDepartmentModel from './components/DepartmentModel'

export default {
  name: 'DepartmentInformation',
  data() {
    return {
      draggableDialogVisible: false,
      list: [],
      activeName: [],
      parentDeptList: [],
      currentDeptLevel: '',
      currentDeptId: '',
      currentDeptName: '',
      currentDeptPid: '',
      currentParentDeptName: '',
      hisDeptCode: '',
      createDeptDialogVisible: false,
      editDeptDialogVisible: false
    }
  },
  components: { DeptDraggable, OrgDetailsDepartmentModel },
  created() {
    this.getDepartments()
    this.getParentDeptList()
  },
  methods: {
    getDepartments() {
      Service.getDepartment().then((res) => {
        const data = res.data
        this.list = data
        if (data.length > 0) {
          this.activeName = data.map((item) => item.id)
        }
      })
    },
    //获取一级科室列表
    getParentDeptList() {
      let params = {
        p: 1,
        size: 1000
      }
      Service.getParentDeptList(params).then((res) => {
        this.parentDeptList = res.data.list
      })
    },
    //打开拖拽排序 Dialog
    openDraggableDialog() {
      this.draggableDialogVisible = true
    },
    // 获取排序
    getSorts(param) {
      const list = param
      const newSort = []
      list.forEach((element, index) => {
        newSort.push({
          id: element.id,
          sort: index + 1
        })
      })
      const data = new FormData()
      data.append('deptList', JSON.stringify(newSort))
      Service.editParentDeptSort(data)
        .then(() => {
          Peace.util.success('科室排序已更新！')
          this.getDepartments()
          this.getParentDeptList()
        })
        .finally(() => {
          this.draggableDialogVisible = false
        })
    },
    // 打开编辑科室 Dialog
    openEditDepartmentDialog(level, id, name, pid, pname, hisDeptCode) {
      this.currentDeptLevel = level
      this.currentDeptId = id
      this.currentDeptName = name
      this.currentDeptPid = pid || '0'
      this.currentParentDeptName = pname || ''
      this.editDeptDialogVisible = true
      this.hisDeptCode = hisDeptCode
    },

    editDepartmentSuccess(close) {
      if (close) {
        this.closeEditDepartmentDialog()
      }
      this.getDepartments()
    },

    // 关闭编辑科室 Dialog
    closeEditDepartmentDialog() {
      this.editDeptDialogVisible = false
    },

    // 打开新增科室 Dialog
    openDepartmentDialog(level, pid, pname) {
      this.currentDeptLevel = level
      this.currentDeptPid = pid || '0'
      this.currentParentDeptName = pname || ''
      this.createDeptDialogVisible = true
    },
    // 关闭新增科室Dialog
    closeDepartmentDialog() {
      this.createDeptDialogVisible = false
    },

    createDepartmentSuccess(close) {
      if (close) {
        this.closeDepartmentDialog()
      }
      this.getDepartments()
      this.getParentDeptList()
    },

    /* 设置特色科室 */
    setSpecDepartment(data) {
      const id = data.id
      const number = data.characteristicDept ? 1 : 0

      Service.setSpecDepartment({ deptId: id, characteristicDept: number }).then((res) => {
        Peace.util.success(res.msg || '特色科室设置成功！')
        this.getDepartments()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-collapse {
  border: 0;
  &-item {
    margin-bottom: 24px;
    border: 1px solid #ebeef5;
    background: #fff;
    padding: 16px;
    border-radius: 2px;
    &__wrap {
      border-bottom: 0;
    }
    &__header {
      position: relative;
      padding: 0 20px;
      height: 36px;
      line-height: 36px;
      border: 0;
      color: #778899;
    }
    &__content {
      padding: 0 20px;
    }
  }
  &-item__arrow {
    margin: 0;
    margin-left: 10px;
    &:before {
      font-weight: bold;
      font-weight: 600;
      color: #778899;
    }
  }
}
.child-dept {
  padding: 12px 0;
  border-top: 1px solid #eee;
  &-item {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    .item-child {
      flex: 1;
      width: 33.3%;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    i.el-icon-edit-outline {
      cursor: pointer;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
    &:nth-child(odd) {
      background-color: #f5f7fa;
    }
    ::v-deep .el-checkbox {
      &__input {
        vertical-align: sub;
      }
      &__label {
        padding-left: 4px;
        line-height: 14px;
        font-weight: normal;
        font-weight: 400;
        font-size: 12px;
      }
    }
  }
}
.title {
  i,
  span {
    vertical-align: middle;
  }
  &-btn {
    position: absolute;
    right: 20px;
    padding: 0;
    line-height: 34px;
  }
}
i.el-icon-edit-outline {
  font-size: 18px;
  color: var(--q-color-primary);
  cursor: pointer;
  vertical-align: middle;
}
</style>
