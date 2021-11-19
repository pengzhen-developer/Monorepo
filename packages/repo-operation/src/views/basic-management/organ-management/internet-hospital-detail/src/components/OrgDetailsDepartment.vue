<template>
  <div class="org-details">
    <div class="pl-lg">
      <el-button @click="openDepartmentDialog()"
                 class="pl-lg pr-lg"
                 type="primary">新增一级科室</el-button>
    </div>
    <el-collapse class="pl-table"
                 v-if="list && list.length"
                 v-model="activeName">
      <el-collapse-item :key="depart.id"
                        :name="depart.id"
                        :title="depart.netdept_name"
                        v-for="depart in list">
        <div class="title"
             slot="title">
          <i @click.stop="openEditDepartmentDialog(depart.id, depart.netdept_name)"
             class="el-icon-edit-outline mr-sm"></i>
          <span>{{ depart.netdept_name }}</span>
          <el-button @click.stop="openDepartmentDialog(depart.id, depart.netdept_name)"
                     class="title-btn"
                     type="text">新增二级科室</el-button>
        </div>
        <div class="child-dept"
             v-if="depart._child && depart._child.length">
          <div class="child-dept-item">
            <div class="item-child">
              <span>二级科室</span>
            </div>
            <div class="item-child">平台分类</div>
            <div class="item-child">特色科室</div>
          </div>
          <div :key="childDept.id"
               class="child-dept-item"
               v-for="childDept in depart._child">
            <div class="item-child">
              <i @click.stop="openEditDepartmentDialog(childDept.id, childDept.netdept_name, depart.id, depart.netdept_name,childDept.platdeptId,childDept.platdeptName)"
                 class="el-icon-edit-outline mr-sm"></i>
              <span>{{ childDept.netdept_name }}</span>
            </div>
            <div class="item-child">{{childDept.platdeptName}}</div>
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

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="createDeptDialogVisible"
                  title="新增科室"
                  v-if="createDeptDialogVisible"
                  append-to-body
                  width="350px">
      <OrgDetailsDepartmentModel :departmentPid="currentDeptPid"
                                 :parentDeptName="currentParentDeptName"
                                 @submit="createDepartment" />
    </peace-dialog>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="editDeptDialogVisible"
                  title="编辑科室"
                  v-if="editDeptDialogVisible"
                  append-to-body
                  width="350px">
      <OrgDetailsDepartmentModel :departmentId="currentDeptId"
                                 :departmentName="currentDeptName"
                                 :departmentPid="currentDeptPid"
                                 :parentDeptName="currentParentDeptName"
                                 :platDeptName="platDeptName"
                                 :platDeptId="platDeptId"
                                 @submit="editDepartment" />
    </peace-dialog>
  </div>
</template>
<script>
import Service from '../service'
import OrgDetailsDepartmentModel from './OrgDetailsDepartmentModel'

export default {
  name: 'department',
  data() {
    return {
      id: '',
      pid: '',
      activeName: [],
      list: [],
      currentDeptId: '',
      currentDeptName: '',
      currentDeptPid: '',
      currentParentDeptName: '',
      platDeptName: '',
      platDeptId: '',
      createDeptDialogVisible: false,
      editDeptDialogVisible: false
    }
  },
  components: { OrgDetailsDepartmentModel },

  created() {
    this.id = Peace.cache.sessionStorage.get('196-hospitalId')
    if (this.id) {
      this.getDepartments()
    }
  },

  methods: {
    // 获取科室列表
    getDepartments() {
      const id = this.id

      Service.getDepartList({ netHospital_id: id }).then((res) => {
        const data = res.data
        this.list = data.list
        this.activeName = data.list.map((item) => item.id)
      })
    },

    // 打开新增科室 Dialog
    openDepartmentDialog(pid, pname) {
      this.currentDeptPid = pid || '0'
      this.currentParentDeptName = pname || ''

      this.createDeptDialogVisible = true
    },

    // 关闭新增科室Dialog
    closeDepartmentDialog() {
      this.createDeptDialogVisible = false
    },

    // 新增科室
    createDepartment(data, close) {
      const params = {
        netHospital_id: this.id,
        netdept_pid: data.departmentPid,
        netdept_name: data.departmentName,
        platdeptName: data.platdeptName,
        platdeptId: data.platdeptId
      }
      Service.addDepartment(params).then((res) => {
        const msg = res.msg || '科室新增成功'
        if (close) {
          this.closeDepartmentDialog()
        }
        Peace.util.success(msg)
        this.getDepartments()
      })
    },

    // 打开编辑科室 Dialog
    openEditDepartmentDialog(id, name, pid, pname, platDeptId, platDeptName) {
      this.currentDeptId = id
      this.currentDeptName = name
      this.currentDeptPid = pid || '0'
      this.currentParentDeptName = pname || ''
      this.platDeptName = platDeptName || ''
      this.platDeptId = platDeptId || ''
      this.editDeptDialogVisible = true
    },

    // 关闭编辑科室 Dialog
    closeEditDepartmentDialog() {
      this.editDeptDialogVisible = false
    },

    // 编辑科室
    editDepartment(data) {
      const params = {
        netHospital_id: this.id,
        netdept_pid: data.departmentPid,
        netdept_id: data.departmentId,
        netdept_name: data.departmentName,
        platdeptName: data.platdeptName,
        platdeptId: data.platdeptId
      }
      Service.editDepartment(params).then((res) => {
        const msg = res.msg || '科室编辑成功'
        this.closeEditDepartmentDialog()
        Peace.util.success(msg)
        this.getDepartments()
      })
    },

    /* 设置特色科室 */
    setSpecDepartment(data) {
      const params = {
        deptId: data.id,
        characteristicDept: data.characteristicDept ? 1 : 0
      }
      Service.setSpecDepartment(params).then((res) => {
        const msg = res.msg || '特色科室设置成功！'
        Peace.util.success(msg)
        this.getDepartments()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-center {
  white-space: nowrap;
  overflow: hidden;
}
.org-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  .pl-lg，.pl-table {
    width: 100%;
  }
  .pl-lg {
    margin-bottom: 10px;
  }
}
::v-deep .el-collapse {
  border: 0;
  &-item {
    margin-bottom: 10px;
    border: 1px solid #ebeef5;
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
    // text-align: center;
    display: flex;
    align-items: center;
    .item-child {
      flex: 1;
      // display: inline-block;
      width: 33.3%;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    i.el-icon-edit-outline {
      cursor: pointer;
      vertical-align: text-top;
    }
    &:nth-child(odd) {
      background-color: #f5f7fa;
    }
    ::v-deep .el-checkbox {
      // float: right;
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
