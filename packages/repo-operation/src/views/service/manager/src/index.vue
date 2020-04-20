<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="85px"
             label-position="left"
             label-suffix=""
             size="mini">
      <el-form-item label="所属医院：">
        <el-input v-model="model.hospitalName"
                  placeholder="请输入所属医院"></el-input>
      </el-form-item>
      <el-form-item label="开通服务：">
        <el-select v-model="model.serviceId"
                   clearable
                   placeholder="请选择开通服务">
          <el-option v-for="service in source.SERVICE_LIST"
                     v-bind:key="service.serviceId"
                     v-bind:label="service.serviceName"
                     v-bind:value="service.serviceId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请状态：">
        <el-select v-model="model.checkStatus"
                   clearable
                   placeholder="请选择申请状态">
          <el-option v-for="(value, label) in source.ENUM_CHECK_STATUS"
                     v-bind:key="value"
                     v-bind:label="label"
                     v-bind:value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary"
                   icon="el-icon-search"
                   v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                size="mini"
                pagination>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column min-width="160px"
                       label="所属医院"
                       prop="hospitalName"></el-table-column>
      <el-table-column min-width="120px"
                       label="开通服务"
                       prop="serviceName"></el-table-column>
      <el-table-column width="140px"
                       label="申请时间"
                       prop="applyTime"></el-table-column>
      <el-table-column width="100px"
                       label="申请状态"
                       prop="checkStatus">
        <template slot-scope="scope">
          <span class="dot"
                v-bind:class="getColorType(scope.row)"></span>
          <span>{{ scope.row.checkStatus | getEnumLabel(source.ENUM_CHECK_STATUS) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px"
                       label="审核时间"
                       prop="checkTime"></el-table-column>
      <el-table-column width="120px"
                       header-align="center"
                       fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="canShowAudit(scope.row)"
                     v-on:click="auditApproved(scope.row)">审核通过</el-button>
        </template>
      </el-table-column>
    </PeaceTable>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'
import Constant from './constant'

export default {
  data() {
    return {
      model: {
        hospitalName: '',
        serviceId: '',
        checkStatus: ''
      },

      source: {
        SERVICE_LIST: [],
        ENUM_CHECK_STATUS: Constant.ENUM_CHECK_STATUS
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getServiceList().then(() => {
        this.get()
      })
    })
  },

  methods: {
    canShowAudit(row) {
      return row.checkStatus === Constant.ENUM_CHECK_STATUS.待审核
    },

    getServiceList() {
      return Service.getServiceList().then(res => {
        this.source.SERVICE_LIST = res.data
      })
    },

    get() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.loadData({ fetch, params })
    },

    auditApproved(row) {
      this.$confirm('审核通过后，医院管理者可使用对应产品和服务，确认通过？', '提示').then(() => {
        const params = {
          accountServiceId: row.id,
          checkStatus: Constant.ENUM_CHECK_STATUS.已通过
        }

        Service.doCheck(params).then(res => {
          Peace.util.success(res.msg)

          this.get()
        })
      })
    },

    auditUnApproved(row) {
      this.$confirm('审核未通过，医院管理者将无法使用对应产品和服务，确认未通过？', '提示').then(() => {
        const params = {
          accountServiceId: row.id,
          checkStatus: Constant.ENUM_CHECK_STATUS.未通过
        }

        Service.doCheck(params).then(res => {
          Peace.util.success(res.msg)

          this.get()
        })
      })
    },

    changeOpenState(row) {
      const message = row.isOpen === 1 ? '确定启用该账号？' : '确定禁用该账号？'

      this.$confirm(message, '提示')
        .then(() => {
          const params = {
            accountId: row.id,
            isOpen: row.isOpen
          }

          Service.updateAccountStatus(params).then(res => {
            Peace.util.success(res.msg)

            this.get()
          })
        })
        .catch(() => {
          row.isOpen = row.isOpen === 1 ? 2 : 1
        })
    },

    getColorType(row) {
      const dict = {
        1: 'primary',
        2: 'info',
        3: 'success',
        4: 'danger'
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
    background: $--color-primary;
  }
  &.info {
    background: $--color-info;
  }
  &.success {
    background: $--color-success;
  }
  &.danger {
    background: $--color-danger;
  }
}
</style>