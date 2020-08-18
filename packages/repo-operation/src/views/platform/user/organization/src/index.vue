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
              <span class="em-6-justify">机构名称</span>
              <span>：</span>
            </template>
            <el-input v-model.trim="model.hospitalName"
                      placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <span class="em-6-justify">机构类型</span>
              <span>：</span>
            </template>

            <el-select clearable
                       v-model.trim="model.orgType"
                       placeholder="请选择">
              <el-option v-for="item in source.orgType"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>

            <template slot="label">
              <span class="em-6-justify">使用中的服务</span>
              <span>：</span>
            </template>

            <el-select style="width: 510px;"
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
                       v-on:click="get">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <div class="q-mb-lg">
          <el-button type="primary"
                     icon="el-icon-plus"
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
                           prop="hospitalName"></el-table-column>
          <el-table-column min-width="120px"
                           label="机构类型"
                           prop="role"
                           align="center"></el-table-column>
          <el-table-column min-width="100px"
                           label="入驻方式"
                           align="center"
                           prop="source"></el-table-column>
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
          <el-table-column width="200px"
                           align="center"
                           fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="toDetail(scope.row)">基本信息</el-button>
              <el-button type="text"
                         v-on:click="toService(scope.row)">服务管理</el-button>
            </template>
          </el-table-column>
        </PeaceTable>
      </div>

      <!-- 机构基本信息 -->
      <el-dialog width="520px"
                 v-bind:visible.sync="detailDialog.visible"
                 title="基本信息">
        <OrganizationDetail v-if="detailDialog.visible"
                            ref="orgDetail"
                            v-on:close="detailDialog.visible = false"
                            v-on:refresh="get"></OrganizationDetail>
      </el-dialog>

      <!-- 新增机构 -->
      <el-dialog width="520px"
                 v-bind:visible.sync="addDialog.visible"
                 title="新增机构">
        <OrganizationModel v-if="addDialog.visible"
                           ref="addOrg"
                           v-on:close="addDialog.visible = false"
                           v-on:refresh="get"></OrganizationModel>
      </el-dialog>
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

import Peace from '@src/library'
import Service from './service'

export default {
  name: 'Organization',

  components: {
    OrganizationDetail,
    ServiceList,
    OrganizationModel
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
        serviceType: []
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

      addDialog: {
        visible: false
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
        })
        return res
      })
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
