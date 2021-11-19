<template>
  <div>

    <el-form label-width="90px"
             label-suffix="：">
      <el-form-item label="科室名称">
        <DeptSelector :parentDeptName="parentDeptName"
                      v-model="deptName" />
      </el-form-item>

      <el-form-item label="平台科室"
                    v-if="departmentPid!='0'">
        <el-select :filter-method="getPlatList"
                   filterable
                   placeholder="请选择科室名称"
                   v-model="platDept">
          <el-option :key="item.platId"
                     :label="item.platdeptName"
                     :value="item.platId"
                     v-for="item in options"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="el-dialog__footer"
         v-if="departmentPid!='0'">
      <el-button :disabled="!deptName||!platDept "
                 @click="submit(false)"
                 type="primary"
                 v-if="!departmentId">保存并新增</el-button>
      <el-button :disabled="!deptName||!platDept"
                 @click="submit(true)"
                 type="primary">保存</el-button>
    </div>

    <div class="el-dialog__footer"
         v-else>
      <el-button :disabled="!deptName "
                 @click="submit(false)"
                 type="primary"
                 v-if="!departmentId">保存并新增</el-button>
      <el-button :disabled="!deptName"
                 @click="submit(true)"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import DeptSelector from './DeptSelector.vue'
import Service from '../service'

export default {
  name: 'OrgDetailsDepartmentModel',
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
    platDeptName: {
      type: String,
      default: ''
    },
    platDeptId: {
      type: String,
      default: ''
    }
  },

  mounted() {
    this.getPlatList(this.platDeptName)
  },
  data() {
    return {
      deptName: this.departmentName,
      options: [],
      platDept: ''
    }
  },
  methods: {
    getPlatList(val) {
      val = val || ''
      Service.getPlatList().then((res) => {
        this.options = res.data
        if (val) {
          this.platDept = this.options.filter((item) => item.platdeptName == val)[0].platId
        }
      })
    },

    submit(close) {
      let currentPlatdept = ''
      if (this.platDept) {
        currentPlatdept = this.options.filter((item) => item.platId == this.platDept)[0]
      }

      const params = {
        departmentId: this.departmentId || undefined,
        departmentPid: this.departmentPid,
        departmentName: this.deptName,
        platdeptName: currentPlatdept.platdeptName,
        platDeptId: this.platDept
      }

      this.$emit('submit', params, close)
      this.deptName = ''
      this.platDept = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.info-row-label {
  &::before {
    content: '*';
    display: inline-block;
    color: #f00;
    font-size: 14px;
    margin-right: 2px;
  }
}
</style>
