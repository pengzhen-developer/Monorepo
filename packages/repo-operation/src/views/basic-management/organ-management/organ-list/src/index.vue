<template>
  <div class="layout-route">
    <div v-show="!serviceDialog.visible">
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
            <el-select clearable
                       v-model.trim="model.orgType"
                       placeholder="全部">
              <el-option v-for="(value, label) in CONSTANT.ENUM_ORGANIZATION_TYPE"
                         v-bind:key="value"
                         v-bind:label="label"
                         v-bind:value="value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用中的服务">
            <el-select clearable
                       multiple
                       v-model.trim="model.serviceType">
              <el-option v-for="(value, label) in CONSTANT.ENUM_ORGANIZATION_SERVICE"
                         v-bind:key="value"
                         v-bind:label="label"
                         v-bind:value="value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary"
                       v-on:click="get">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <div class="q-mb-lg">
          <el-button type="primary"
                     v-on:click="addOrganization">新增</el-button>
        </div>

        <PeaceTable ref="table"
                    size="mini"
                    pagination>
          <PeaceTableColumn label="序号"
                            width="80px"
                            prop="orderNumber">
          </PeaceTableColumn>
          <PeaceTableColumn min-width="180px"
                            label="机构名称"
                            prop="hospitalName">
            <template slot-scope="scope">
              {{scope.row.hospitalName || '—'}}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn min-width="120px"
                            label="机构类型"
                            prop="role"></PeaceTableColumn>
          <PeaceTableColumn min-width="100px"
                            label="入驻方式"
                            prop="source"></PeaceTableColumn>
          <PeaceTableColumn min-width="160px"
                            label="使用中的服务">
            <template slot-scope="scope">
              <div v-html="formatServiceName(scope.row)"></div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn min-width="160px"
                            label="认证时间"
                            prop="checkTime">
            <template slot-scope="scope">
              {{ 
                scope.row.source == '运营添加' ? scope.row.createdTime : 
                scope.row.source == '机构注册' ? scope.row.checkTime : '—'
              }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn width="240px"
                            fixed="right"
                            label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="toDetail(scope.row)">基本信息</el-button>
              <el-button type="text"
                         v-on:click="toService(scope.row)">服务管理</el-button>
              <el-button v-if="showDocking(scope.row)"
                         type="text"
                         v-on:click="dockingConfig(scope.row)">对接配置</el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>

      <!-- 机构基本信息 -->
      <PeaceDialog width="520px"
                   v-bind:visible.sync="detailDialog.visible"
                   title="基本信息">
        <OrganizationDetail v-if="detailDialog.visible"
                            ref="orgDetail"
                            v-on:close="detailDialog.visible = false"
                            v-on:refresh="get"></OrganizationDetail>
      </PeaceDialog>

      <!-- 对接配置 -->
      <PeaceDialog width="450px"
                   v-bind:visible.sync="dockingDialog.visible"
                   title="对接配置">
        <DockingConfig v-if="dockingDialog.visible"
                       v-bind:data="dockingDialog.data"
                       v-on:close="dockingDialog.visible = false"
                       v-on:refresh="get"></DockingConfig>
      </PeaceDialog>

      <!-- 新增机构 -->
      <PeaceDialog width="520px"
                   v-bind:visible.sync="addDialog.visible"
                   title="新增机构">
        <OrganizationModel v-if="addDialog.visible"
                           ref="addOrg"
                           v-on:close="addDialog.visible = false"
                           v-on:refresh="get"></OrganizationModel>
      </PeaceDialog>
    </div>

    <!-- 已选服务 -->
    <ServiceList v-if="serviceDialog.visible"
                 v-bind:data="serviceDialog.data"></ServiceList>
  </div>
</template>

<script>
import CONSTANT from './constant'

import OrganizationDetail from './components/OrganizationDetail'
import ServiceList from './components/ServiceList'
import OrganizationModel from './components/OrganizationModel'
import DockingConfig from './components/DockingConfig'

import Service from './service'

export default {
  name: 'OrganList',

  components: {
    OrganizationDetail,
    ServiceList,
    OrganizationModel,
    DockingConfig
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    return {
      CONSTANT,
      model: {
        hospitalName: '',
        orgType: '',
        serviceType: []
      },

      detailDialog: {
        visible: false,
        data: {}
      },

      serviceDialog: {
        visible: false,
        data: {}
      },

      dockingDialog: {
        visible: false,
        data: {}
      },

      addDialog: {
        visible: false
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },

    // 基本信息
    toDetail(row) {
      this.detailDialog.visible = true
      this.$nextTick(() => {
        this.$refs.orgDetail.init(row.id)
      })
    },

    // 已选服务
    toService(row) {
      this.serviceDialog.visible = true
      this.serviceDialog.data = row
    },

    // 是否显示对接配置
    showDocking(row) {
      let hasPrescription = row.serviceTypes.find((item) => item == CONSTANT.ENUM_ORGANIZATION_SERVICE.处方共享服务)
      let hasDrug = row.serviceTypes.find((item) => item == CONSTANT.ENUM_ORGANIZATION_SERVICE.药品供应服务)
      return hasPrescription || hasDrug
    },

    // 对接配置
    dockingConfig(row) {
      this.dockingDialog.visible = true
      this.dockingDialog.data = row
    },

    // 新增机构
    addOrganization() {
      this.addDialog.visible = true
      this.$nextTick(() => {
        this.$refs.addOrg.init()
      })
    },
    toggleServiceDialog() {
      this.serviceDialog.visible = false
    },
    indexMethod(index) {
      const { internalCurrentPage, internalPageSize } = this.$refs.table.Pagination
      return index + (internalCurrentPage - 1) * internalPageSize + 1
    },

    formatServiceName(row) {
      return row.serviceNames.join('<br/>')
    }
  }
}
</script>

<style lang="scss" scoped></style>
