<template>
  <div class="layout-route">
    <div v-show="!serviceDialog.visible">
      <div class="card card-search q-mb-md">
        <el-form v-bind:model="model"
                 inline="inline"
                 label-width="auto"
                 label-position="right"
                 label-suffix
                 size="mini">

          <el-form-item>
            <template slot="label">
              <span class="em-4-justify">机构名称</span>
              <span>：</span>
            </template>
            <el-input v-model.trim="model.hospitalName"
                      placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span class="em-4-justify">机构类型</span>
              <span>：</span>
            </template>

            <el-select clearable
                       v-model.trim="model.orgType"
                       placeholder="全部">
              <el-option v-for="item in source.serviceType"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span class="em-4-justify">对接系统</span>
              <span>：</span>
            </template>

            <el-select v-model="model.dockSystem"
                       placeholder="全部"
                       clearable>
              <el-option v-for="item in dockingSystemDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <br>

          <el-form-item>

            <template slot="label">
              <span class="em-6-justify">使用中的服务</span>
              <span>：</span>
            </template>

            <el-select style="width: 515px;"
                       clearable
                       multiple
                       v-model.trim="model.serviceType">
              <el-option v-for="item in source.serviceType"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary"
                       style="width: 80px;"
                       v-on:click="get">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <div class="q-mb-lg">
          <el-button type="primary"
                     style="width: 80px;"
                     v-on:click="addOrganization">新增</el-button>
        </div>

        <PeaceTable ref="table"
                    size="mini"
                    v-bind:page-size="5"
                    pagination>
          <el-table-column type="index"
                           width="60px"
                           label="序号"
                           align="center"
                           :index="indexMethod"></el-table-column>
          <el-table-column min-width="180px"
                           align="left"
                           label="机构名称"
                           prop="hospitalName">
            <template slot-scope="scope">
              {{scope.row.hospitalName || '——'}}
            </template>
          </el-table-column>
          <el-table-column min-width="120px"
                           label="机构类型"
                           prop="role"
                           align="center"></el-table-column>
          <el-table-column min-width="100px"
                           label="入驻方式"
                           align="center"
                           prop="source"></el-table-column>
          <el-table-column min-width="100px"
                           label="对接系统"
                           align="center"
                           prop="dockSystem">
            <template slot-scope="scope">
              {{scope.row.dockSystem || '——'}}
            </template>
          </el-table-column>
          <el-table-column min-width="100px"
                           label="系统属性"
                           align="center"
                           prop="systemProperties">
            <template slot-scope="scope">
              {{scope.row.systemProperties || '——'}}
            </template>
          </el-table-column>
          <el-table-column min-width="160px"
                           label="使用中的服务"
                           align="center"
                           prop="source">
            <template slot-scope="scope">
              <div v-html="formatServiceName(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column min-width="160px"
                           label="认证时间"
                           align="center"
                           prop="checkTime">
            <template slot-scope="scope">
              {{ 
                scope.row.source == '运营添加' ? scope.row.createdTime : 
                scope.row.source == '机构注册' ? scope.row.checkTime : '——'
              }}
            </template>
          </el-table-column>
          <el-table-column width="240px"
                           align="center"
                           fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="toDetail(scope.row)">基本信息</el-button>
              <el-button type="text"
                         v-on:click="toService(scope.row)">服务管理</el-button>
              <el-button type="text"
                         v-on:click="dockingConfig(scope.row)">对接配置</el-button>
            </template>
          </el-table-column>
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
      <PeaceDialog width="370px"
                   v-bind:visible.sync="dockingDialog.visible"
                   title="对接配置">
        <DockingConfig v-if="dockingDialog.visible"
                       ref="dockingConfig"
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
import OrganizationDetail from './components/OrganizationDetail'
import ServiceList from './components/ServiceList'
import OrganizationModel from './components/OrganizationModel'
import DockingConfig from './components/DockingConfig'

import Service from './service'

export default {
  name: 'Organization',

  components: {
    OrganizationDetail,
    ServiceList,
    OrganizationModel,
    DockingConfig
  },

  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  data() {
    return {
      model: {
        hospitalName: '',
        orgType: '',
        serviceType: [],
        dockSystem: ''
      },

      source: {
        orgType: [
          { label: '全部', value: '' },
          { label: '医疗机构', value: 1 },
          { label: '店配机构', value: 2 },
          { label: '仓配机构', value: 3 }
        ],
        serviceType: [
          { label: '互联网云医院', value: 1 },
          { label: '合理用药管理', value: 2 },
          { label: '处方共享服务', value: 3 },
          { label: '药品供应服务', value: 4 }
        ]
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
      },

      dockingSystemDict: []
    }
  },

  async mounted() {
    this.dockingSystemDict = await Peace.identity.dictionary.getList('sysdocking')
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

    // 对接配置
    dockingConfig(row) {
      this.dockingDialog.visible = true
      this.$nextTick(() => {
        this.$refs.dockingConfig.init(row.custCode)
      })
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
