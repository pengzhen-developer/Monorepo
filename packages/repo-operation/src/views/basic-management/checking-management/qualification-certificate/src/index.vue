<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">
        <el-form-item label="机构名称">
          <el-input v-model.trim="model.hospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select v-model="model.role"
                     placeholder="全部"
                     clearable>
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_ORGANIZATION_TYPE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="model.checkStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_CHECK_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="机构名称"
                          prop="hospitalName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="机构类型"
                          prop="roleName">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="联系人"
                          prop="linkman"></PeaceTableColumn>
        <PeaceTableColumn width="140px"
                          label="手机号码"
                          prop="tel"></PeaceTableColumn>
        <PeaceTableColumn min-width="110px"
                          label="认证状态"
                          prop="checkStatus">
          <template slot-scope="scope">
            <span class="dot"
                  v-bind:class="getColorType(scope.row)"></span>
            <span>{{ scope.row.checkStatus | getEnumLabel(source.ENUM_CHECK_STATUS) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="申请时间"
                          prop="applyTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="审核时间"
                          prop="checkTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="80px"
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
        </PeaceTableColumn>
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
  name: 'QualificationCertificate',

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
        hospitalName: '',
        role: '',
        checkStatus: ''
      },

      aduitDialog: {
        visible: false,
        title: '',
        data: {}
      },

      source: {
        ENUM_CHECK_STATUS: CONSTANT.ENUM_CHECK_STATUS,
        ENUM_ORGANIZATION_TYPE: []
      }
    }
  },

  async mounted() {
    this.source.ENUM_ORGANIZATION_TYPE = await Peace.identity.dictionary.getList('hos_role_type')
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

    canShowAduit(row) {
      return row.checkStatus === CONSTANT.ENUM_CHECK_STATUS.待审核
    },

    canShowDetail(row) {
      return (
        row.checkStatus === CONSTANT.ENUM_CHECK_STATUS.已通过 || row.checkStatus === CONSTANT.ENUM_CHECK_STATUS.未通过
      )
    },

    aduit(row) {
      this.aduitDialog.title = '审核'
      this.aduitDialog.visible = true
      this.aduitDialog.data = row
    },

    detail(row) {
      this.aduitDialog.title = '查看详情'
      this.aduitDialog.visible = true
      this.aduitDialog.data = row
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