<template>
  <div>
    <el-form label-width="auto">
      <el-form-item label="科室名称"
                    class="is-required">
        <DeptSelector :parentDeptName="parentDeptName"
                      v-model="deptName" />
      </el-form-item>

      <el-form-item v-if="departmentPid!='0'"
                    label="科室编号">
        <el-input placeholder="请输入HIS中的编号"
                  maxlength="20"
                  v-model="hisCode">
        </el-input>
      </el-form-item>

      <el-form-item label-width="0px"
                    class="bottom">
        <el-button :disabled="!deptName "
                   @click="submit(false)"
                   type="primary"
                   v-if="!departmentId">保存并新增</el-button>
        <el-button :disabled="!deptName"
                   @click="submit(true)"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import DeptSelector from './DepartmentSelector'
import Service from '../service'

export default {
  name: 'DepartmentModel',
  components: { DeptSelector },
  props: {
    departmentId: {
      type: String
    },
    departmentPid: {
      type: String,
      default: '0'
    },
    departmentName: {
      type: String,
      default: ''
    },
    parentDeptName: {
      type: String
    },
    hisDeptCode: {
      type: String
    },
    isEdit: {
      type: Boolean
    }
  },

  data() {
    return {
      deptName: this.departmentName,
      hisCode: this.hisDeptCode
    }
  },
  methods: {
    submit(close) {
      const params = {
        departmentId: this.departmentId || undefined,
        departmentPid: this.departmentPid,
        departmentName: this.deptName,
        hisDeptCode: this.hisCode
      }
      if (this.isEdit) {
        this.editDepartment(params, close)
      } else {
        this.createDepartment(params, close)
      }
    },

    // 编辑科室
    editDepartment(params, close) {
      const departmentId = params.departmentId
      const pid = params.departmentPid
      const name = params.departmentName
      const hisDeptCode = params.hisDeptCode

      Service.editDepartment({ netdeptPid: pid, netdeptId: departmentId, netdeptName: name, hisDeptCode: hisDeptCode }).then((res) => {
        this.$emit('success', close)
        Peace.util.success(res.msg || '科室编辑成功')
        this.deptName = ''
        this.hisCode = ''
      })
    },

    // 新增科室
    createDepartment(params, close) {
      const pid = params.departmentPid
      const name = params.departmentName
      const hisDeptCode = params.hisDeptCode
      Service.addDepartment({ netdeptPid: pid, netdeptName: name, hisDeptCode: hisDeptCode }).then((res) => {
        this.$emit('success', close)
        Peace.util.success(res.msg || '科室新增成功')
        this.deptName = ''
        this.hisCode = ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0 !important;
  padding-top: 24px;
}

.row-name {
  .info-row-label {
    &::before {
      content: '*';
      display: inline-block;
      color: #ff3a30;
      font-size: 14px;
      margin-right: 2px;
    }
  }
}
.row-num {
  .info-row-label {
    &::before {
      content: '*';
      display: inline-block;
      color: #333333;
      font-size: 14px;
      margin-right: 2px;
    }
  }
}
</style>
