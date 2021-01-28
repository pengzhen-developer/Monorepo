<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="机构名称：">
          <el-input v-model.trim="model.hospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构类型：">
          <el-select v-model="model.role"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_ORGANIZATION_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态：">
          <el-select v-model="model.checkStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_APPLY_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item l-form-item
                      label="申请时间：">
          <PeaceDatePicker type="daterange"
                           value-format="yyyy-MM-dd"
                           v-model="model.timeRange"></PeaceDatePicker>
        </el-form-item>
        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column min-width="180px"
                         label="机构名称"
                         prop="hospitalName"></el-table-column>
        <el-table-column min-width="130px"
                         label="机构类型"
                         align="center"
                         prop="role">
          <template slot-scope="scope">{{ scope.row.role | getEnumLabel(source.ENUM_ORGANIZATION_TYPE) }}</template>
        </el-table-column>
        <el-table-column min-width="120px"
                         label="服务名称"
                         prop="serviceName"></el-table-column>
        <el-table-column min-width="160px"
                         align="center"
                         label="申请时间"
                         prop="applyTime"></el-table-column>
        <el-table-column min-width="110px"
                         align="center"
                         label="申请状态"
                         prop="checkStatus">
          <template slot-scope="scope">
            <span class="dot"
                  v-bind:class="getColorType(scope.row)"></span>
            <span>{{ scope.row.checkStatus | getEnumLabel(source.ENUM_APPLY_STATUS) }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="160px"
                         align="center"
                         label="审核时间"
                         prop="checkTime"></el-table-column>
        <el-table-column min-width="80px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-if="canShowCheck(scope.row)"
                       v-on:click="check(scope.row)">审核</el-button>
            <el-button type="text"
                       v-if="canShowDetail(scope.row)"
                       v-on:click="detail(scope.row)">查看详情</el-button>
            <span v-if="!canShowCheck(scope.row) && !canShowDetail(scope.row)">——</span>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <CheckDetail v-model="checkDialog.visible"
                 v-bind:title="checkDialog.title"
                 v-bind:data="checkDialog.data"
                 v-on:refresh="get"></CheckDetail>
  </div>
</template>

<script>
import CheckDetail from './components/CheckDetail'

import Service from './service'
import CONSTANT from './constant'

export default {
  name: 'ServiceOpening',

  components: {
    CheckDetail
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    return {
      model: {
        hospitalName: '',
        role: '',
        checkStatus: '',
        timeRange: [],
        startTime: '',
        endTime: ''
      },

      checkDialog: {
        visible: false,
        title: '',
        data: {}
      },

      source: {
        ENUM_ORGANIZATION_TYPE: CONSTANT.ENUM_ORGANIZATION_TYPE,
        ENUM_APPLY_STATUS: CONSTANT.ENUM_APPLY_STATUS
      }
    }
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.startTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
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
        res?.data?.list?.forEach((row) => {
          row.hospitalName = Peace.validate.isEmpty(row.hospitalName) ? '——' : row.hospitalName
          row.checkTime = Peace.validate.isEmpty(row.checkTime) ? '——' : row.checkTime
        })
        return res
      })
    },

    search() {},

    canShowCheck(row) {
      return row.checkStatus === CONSTANT.ENUM_APPLY_STATUS.待审核
    },

    canShowDetail(row) {
      return row.checkStatus === CONSTANT.ENUM_APPLY_STATUS.未通过 || row.checkStatus === CONSTANT.ENUM_APPLY_STATUS.已通过
    },

    check(row) {
      this.checkDialog.title = '审核'
      this.checkDialog.visible = true
      this.checkDialog.data = row
    },

    detail(row) {
      this.checkDialog.title = '审核详情'
      this.checkDialog.visible = true
      this.checkDialog.data = row
    },

    getColorType(row) {
      const dict = {
        1: 'info',
        2: 'danger',
        3: 'success'
      }

      return dict[row.checkStatus]
    }
  }
}
</script>

<style lang="scss" scoped>
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

.date-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .date-separator {
    width: 20px;
    margin: 0 10px;
    border-top: 1px solid #dddddd;
  }
}
</style>