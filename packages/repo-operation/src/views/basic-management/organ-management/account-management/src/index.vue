<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="联系人：">
          <el-input v-model.trim="model.linkman"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model.trim="model.tel"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属机构：">
          <el-input v-model.trim="model.hospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="认证状态：">
          <el-select v-model="model.checkStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_CHECK_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态：">
          <el-select v-model="model.isOpen"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_IS_OPEN"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     style="width: 80px;"
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
        <el-table-column min-width="100px"
                         label="联系人"
                         prop="linkman"></el-table-column>
        <el-table-column min-width="120px"
                         label="手机号码"
                         prop="tel"
                         align="center"></el-table-column>
        <el-table-column min-width="180px"
                         label="邮箱"
                         prop="email"></el-table-column>
        <el-table-column min-width="160px"
                         label="注册时间"
                         prop="createdTime"
                         align="center"></el-table-column>
        <el-table-column min-width="100px"
                         label="认证状态"
                         prop="checkStatus">
          <template slot-scope="scope">
            <span class="dot"
                  v-bind:class="getColorType(scope.row)"></span>
            <span>{{ scope.row.checkStatus | getEnumLabel(source.ENUM_CHECK_STATUS) }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180px"
                         label="所属机构"
                         prop="hospitalName"></el-table-column>
        <el-table-column min-width="120px"
                         align="center"
                         fixed="right"
                         label="账号状态"
                         prop="isOpen">
          <template slot-scope="scope">
            <div style="display: flex">
              <el-switch v-model="scope.row.isOpen"
                         v-bind:active-value="1"
                         v-bind:inactive-value="2"
                         v-on:change="changeOpenState(scope.row)"></el-switch>

              <span style="margin-left: 5px;">{{ scope.row.isOpen | getEnumLabel(source.ENUM_IS_OPEN) }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="80px"
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
          <span v-if="!canShowAduit(scope.row) && !canShowDetail(scope.row)">——</span>
        </template>
      </el-table-column>-->
      </PeaceTable>
    </div>

    <AduitDetail v-model="aduitDialog.visible"
                 v-bind:title="aduitDialog.title"
                 v-bind:data="aduitDialog.data"
                 v-on:refresh="get"></AduitDetail>
  </div>
</template>

<script>
import AduitDetail from './components/AduitDetail'

import Service from './service'
import CONSTANT from './constant'

export default {
  name: 'AccountManagement',

  components: {
    AduitDetail
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    return {
      model: {
        linkman: '',
        tel: '',
        hospitalName: '',
        checkStatus: '',
        isOpen: ''
      },

      aduitDialog: {
        visible: false,
        title: '',
        data: {}
      },

      source: {
        ENUM_CHECK_STATUS: CONSTANT.ENUM_CHECK_STATUS,
        ENUM_IS_OPEN: CONSTANT.ENUM_IS_OPEN
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
        res?.data?.list?.forEach((row) => {
          row.hospitalName = Peace.validate.isEmpty(row.hospitalName) ? '——' : row.hospitalName
          row.socialCreditCode = Peace.validate.isEmpty(row.socialCreditCode) ? '——' : row.socialCreditCode
          row.applyTime = Peace.validate.isEmpty(row.applyTime) ? '——' : row.applyTime
        })
        return res
      })
    },

    canShowAduit(row) {
      return row.checkStatus === CONSTANT.ENUM_CHECK_STATUS.待审核
    },

    canShowDetail(row) {
      return row.checkStatus === CONSTANT.ENUM_CHECK_STATUS.已通过 || row.checkStatus === CONSTANT.ENUM_CHECK_STATUS.未通过
    },

    aduit(row) {
      this.aduitDialog.title = '医院信息审核'
      this.aduitDialog.visible = true
      this.aduitDialog.data = row
    },

    detail(row) {
      this.aduitDialog.title = '医院信息审核详情'
      this.aduitDialog.visible = true
      this.aduitDialog.data = row
    },

    changeOpenState(row) {
      const message = row.isOpen === 1 ? '确定启用该账号？' : '确定禁用该账号？'

      this.$confirm(message, '提示', { closeOnClickModal: false, closeOnPressEscape: false })
        .then(() => {
          const params = {
            accountId: row.id,
            isOpen: row.isOpen
          }

          Service.updateAccountStatus(params).then((res) => {
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
</style>