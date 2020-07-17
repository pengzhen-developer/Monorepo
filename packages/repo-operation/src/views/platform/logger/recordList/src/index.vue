<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="auto"
             label-position="right"
             label-suffix=""
             size="mini">
      <el-form-item label="业务模块：">
        <el-input v-model="model.businessModule"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="操作类型：">
        <el-select v-model="model.operationType"
                   placeholder="全部"
                   clearable>
          <el-option v-for="(value, label) in source.ENUM_ACTIONTYPE_STATUS"
                     v-bind:key="value"
                     v-bind:label="label"
                     v-bind:value="value"></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="业务主键值：">
        <el-input v-model="model.primaryKey"
                  placeholder="请输入"></el-input>
      </el-form-item> -->

      <el-form-item label="操作日期：">
        <div class="row items-center">
          <el-date-picker type="date"
                          placeholder="开始时间"
                          v-model="model.startTime"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :pickerOptions="startPickerOptions"
                          style="width: 180px;"></el-date-picker>
          <div class="q-mx-md mid-line"></div>
          <el-date-picker placeholder="结束时间"
                          v-model="model.endTime"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :pickerOptions="endPickerOptions"
                          style="width: 180px;"></el-date-picker>
        </div>
      </el-form-item>

      <el-form-item class="q-ml-md">
        <el-button type="primary"
                   v-on:click="get">查询</el-button>

        <el-button type="primary"
                   plain
                   v-on:click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                size="mini"
                pagination>
      <el-table-column width="60px"
                       label="序号"
                       align="center"
                       type="index"
                       :index="indexMethod"></el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="业务模块"
                       prop="businessModule"></el-table-column>
      <el-table-column width="160px"
                       align="center"
                       label="操作类型"
                       prop="operationType"></el-table-column>
      <el-table-column width="160px"
                       align="center"
                       label="操作人"
                       prop="operator"></el-table-column>
      <el-table-column width="160px"
                       align="center"
                       label="操作时间"
                       prop="operationTime"></el-table-column>
      <el-table-column min-width="130px"
                       label="备注"
                       align="center"
                       prop="remarks"></el-table-column>
    </PeaceTable>

  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'
import CONSTANT from './constant'

export default {
  data() {
    return {
      model: {
        businessModule: '',
        operationType: '',
        operator: '',
        startTime: '',
        endTime: ''
      },

      startPickerOptions: {
        disabledDate: (time) => {
          if (this.model.endTime) {
            return time.getTime() > new Date(this.model.endTime).getTime()
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.model.startTime) {
            return time.getTime() < new Date(this.model.startTime).setDate(new Date(this.model.startTime).getDate() - 1) || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now()
          }
        }
      },

      dialog: {
        visible: false,
        title: '',
        data: {}
      },

      source: {
        ENUM_ACTIONTYPE_STATUS: CONSTANT.ENUM_ACTIONTYPE_STATUS
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    reset() {
      Object.assign(this.model, {
        businessModule: '',
        operationType: '',
        operator: '',
        startTime: '',
        endTime: ''
      })
      this.get()
    },
    indexMethod(index) {
      const { internalCurrentPage, internalPageSize } = this.$refs.table.Pagination
      return index + (internalCurrentPage - 1) * internalPageSize + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.mid-line {
  width: 20px;
  height: 1px;
  background-color: #dddddd;
}
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px 0 0;

  &.primary {
    background: #e4e4e4;
  }
  &.info {
    background: var(--q-color-warning);
  }
  &.success {
    background: var(--q-color-primary);
  }
  &.danger {
    background: var(--q-color-negative);
  }
}
::v-deep .el-form-item__label {
  padding: 0;
}
</style>
