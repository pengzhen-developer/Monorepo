<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="auto"
             label-position="right"
             label-suffix=""
             size="mini">
      <!-- <el-form-item label="业务系统：">
        <el-select v-model="model.businessSystem"
                   placeholder="全部"
                   clearable>
          <el-option v-for="(value, label) in source.ENUM_BUSINESSSYSTEM_STATUS"
                     v-bind:key="value"
                     v-bind:label="label"
                     v-bind:value="value"></el-option>
        </el-select>
      </el-form-item> -->
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
                          style="width: 180px;"></el-date-picker>
          <div class="q-mx-md mid-line"></div>
          <el-date-picker placeholder="结束时间"
                          v-model="model.endTime"
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
      <el-table-column min-width="100px"
                       label="序号"
                       align="center"
                       type="index"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="业务模块"
                       prop="businessModule"></el-table-column>
      <!-- <el-table-column min-width="100px"
                       label="表名"
                       prop="createdTime"></el-table-column> -->
      <!-- <el-table-column min-width="120px"
                       label="业务主键值"
                       prop="hospitalName"></el-table-column> -->
      <el-table-column min-width="150px"
                       align="center"
                       label="操作类型"
                       prop="operationType"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="操作人"
                       prop="operator"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="操作时间"
                       prop="operationTime"></el-table-column>
      <!-- <el-table-column min-width="80px"
                       align="center"
                       fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </PeaceTable>

    <!-- <logger-detail v-model="dialog.visible"
                   v-bind:title="dialog.title"
                   v-bind:data="dialog.data"
                   v-on:refresh="get"></logger-detail> -->
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'
import CONSTANT from './constant'
// import LoggerDetail from './components/LoggerDetail'

export default {
  // components: {
  //   LoggerDetail
  // },

  data() {
    return {
      model: {
        businessModule: '',
        operationType: '',
        operator: '',
        startTime: '',
        endTime: ''
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
      this.$refs.table.loadData({ fetch, params }).then(res => {
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
    }
    // detail(row) {
    //   this.dialog.title = '医院信息审核详情'
    //   this.dialog.visible = true
    //   this.dialog.data = row
    // }
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
