<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="85px"
             label-position="left"
             label-suffix=""
             size="mini">
      <el-form-item label="联系人：">
        <el-input v-model="model.linkman"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="model.tel"></el-input>
      </el-form-item>
      <el-form-item label="所属医院：">
        <el-input v-model="model.hospitalName"></el-input>
      </el-form-item>
      <el-form-item label="申请状态：">
        <el-select v-model="model.checkStatus"
                   clearable>
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
      <el-table-column min-width="100px"
                       label="联系人"
                       prop="linkman"></el-table-column>
      <el-table-column min-width="120px"
                       label="手机号"
                       prop="tel"></el-table-column>
      <el-table-column min-width="120px"
                       label="用户名"
                       prop="username"></el-table-column>
      <el-table-column min-width="140px"
                       label="邮箱"
                       prop="email"></el-table-column>
      <el-table-column min-width="140px"
                       label="注册时间"
                       prop="createdTime"></el-table-column>
      <el-table-column min-width="200px"
                       label="所属医院"
                       prop="hospitalName"></el-table-column>
      <el-table-column min-width="160px"
                       label="统一社会信用代码"
                       prop="socialCreditCode"></el-table-column>
      <el-table-column min-width="140px"
                       label="申请时间"
                       prop="applyTime"></el-table-column>
      <el-table-column min-width="120px"
                       label="申请状态"
                       prop="checkStatus">
        <template slot-scope="scope">
          <span class="dot"
                v-bind:class="getColorType(scope.row)"></span>
          <span>{{ scope.row.checkStatus | getEnumLabel(source.ENUM_CHECK_STATUS) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px"
                       fixed="right"
                       label="账号状态"
                       prop="isOpen">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isOpen"
                     v-bind:active-value="1"
                     v-bind:inactive-value="2"
                     v-on:change="changeOpenState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="80px"
                       align="center"
                       fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="canShowAduit(scope.row)"
                     v-on:click="aduit(scope.row)">审核</el-button>
          <el-button type="text"
                     v-if="canShowDetail(scope.row)"
                     v-on:click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </PeaceTable>

    <AduitDetail v-model="aduitDialog.visible"
                 v-bind:data="aduitDialog.data"
                 v-on:refresh="get"></AduitDetail>
  </div>
</template>

<script>
import AduitDetail from './components/AduitDetail'

import Peace from '@src/library'
import Service from './service'
import Constant from './constant'

export default {
  components: {
    AduitDetail
  },

  data() {
    return {
      model: {
        linkman: '',
        tel: '',
        hospitalName: '',
        checkStatus: ''
      },

      aduitDialog: {
        visible: false,
        data: {}
      },

      source: {
        ENUM_CHECK_STATUS: Constant.ENUM_CHECK_STATUS
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

      this.$refs.table.loadData({ fetch, params })
    },

    canShowAduit(row) {
      return row.checkStatus === Constant.ENUM_CHECK_STATUS.待审核
    },

    canShowDetail(row) {
      return (
        row.checkStatus === Constant.ENUM_CHECK_STATUS.已通过 || row.checkStatus === Constant.ENUM_CHECK_STATUS.未通过
      )
    },

    aduit(row) {
      this.aduitDialog.visible = true
      this.aduitDialog.data = row
    },

    detail(row) {
      this.aduitDialog.visible = true
      this.aduitDialog.data = row
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