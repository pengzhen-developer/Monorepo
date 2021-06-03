<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="q-mb-24 org-name">
        审核管理 - {{props.orgName}}
      </div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="给药频次名称">
          <el-input v-model.trim="model.name"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="平台给药频次名称">
          <el-input v-model.trim="model.platformName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="model.auditStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.ENUM_AUDIT_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="audit()">审核</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn width="60px"
                          label="">
          <template slot-scope="scope">
            <el-radio v-model="checkedId"
                      v-on:change="selectData(scope.row)"
                      v-bind:label="scope.row.id"><span></span></el-radio>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="给药频次编码"
                          prop="extCode">
        </PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="给药频次名称"
                          prop="name">
        </PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="平台编码"
                          prop="platformCode">
          <template slot-scope="scope">
            {{scope.row.platformCode || '-'}}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="平台给药频次名称"
                          prop="platformName">
          <template slot-scope="scope">
            {{scope.row.platformName || '-'}}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="配码状态"
                          prop="mapperStatus">
          <template slot-scope="scope">
            {{scope.row.mapperStatus | filterDictionary(source.ENUM_MATCH_STATUS, '-')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="审核状态"
                          prop="auditStatus">
          <template slot-scope="scope">
            {{scope.row.auditStatus | filterDictionary(source.ENUM_AUDIT_STATUS, '-')}}
          </template>
        </PeaceTableColumn>

        <el-table-column min-width="160px"
                         align="left"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button v-if="['pass'].includes(scope.row.auditStatus)"
                       type="text"
                       v-on:click="edit(scope.row)">修改</el-button>
            <el-button v-if="['pass', 'reject'].includes(scope.row.auditStatus)"
                       type="text"
                       v-on:click="record(scope.row)">审核记录</el-button>
          </template>
        </el-table-column>

      </PeaceTable>
    </div>

    <PeaceDialog width="1000px"
                 v-bind:visible.sync="modelDialog.visible"
                 :title="modelDialog.title">
      <Model v-if="modelDialog.visible"
             v-bind:type="modelDialog.type"
             v-bind:data="modelDialog.data"
             v-on:close="modelDialog.visible = false"
             v-on:refresh="fetch"
             v-on:clear="clear"></Model>
    </PeaceDialog>

    <PeaceDialog width="380px"
                 v-bind:visible.sync="recordlDialog.visible"
                 title="审核记录">
      <Record v-if="recordlDialog.visible"
              v-bind:data="recordlDialog.data"
              v-on:close="recordlDialog.visible = false"></Record>
    </PeaceDialog>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import Model from './Model'
import Record from './Record'

export default {
  name: 'Management',

  components: {
    Model,
    Record
  },

  data() {
    return {
      loading: true,
      source: {
        ENUM_MATCH_STATUS: [],
        ENUM_AUDIT_STATUS: []
      },
      checkedId: '',
      checkedData: {},
      model: {
        orgCode: '',
        name: '',
        platformName: '',
        auditStatus: ''
      },
      modelDialog: {
        visible: false,
        title: '',
        type: '',
        data: {}
      },
      recordlDialog: {
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    props() {
      return Observable.state.props
    },
    view() {
      return Observable.state.view
    }
  },

  watch: {
    view(value) {
      if (value === Observable.constants.view.DETAIL) {
        this.fetch()
      }
    }
  },

  async mounted() {
    this.source.ENUM_MATCH_STATUS = await Peace.identity.dictionary.getList('mapper_status')
    this.source.ENUM_AUDIT_STATUS = await Peace.identity.dictionary.getList('mapper_audit_status')
    this.$nextTick().then(() => {
      if (this.props.orgCode) {
        this.model.orgCode = this.props.orgCode
        this.model.auditStatus = 'check'
        this.fetch()
      }
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getManagementList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },

    selectData(data) {
      this.checkedData = data
    },

    audit() {
      if (this.checkedData.id) {
        if (this.checkedData.auditStatus === 'check') {
          this.modelDialog.title = '审核'
          this.modelDialog.type = 'audit'
          this.modelDialog.data = this.checkedData
          this.modelDialog.visible = true
        } else {
          Peace.util.warning('请选择待审核的数据进行操作')
        }
      } else {
        Peace.util.warning('请选择需要审核的数据')
      }
    },

    edit(row) {
      this.modelDialog.title = '修改'
      this.modelDialog.type = 'edit'
      this.modelDialog.data = row
      this.modelDialog.visible = true
    },

    clear() {
      this.checkedId = ''
      this.checkedData = {}
    },

    record(row) {
      this.recordlDialog.data = row
      this.recordlDialog.visible = true
    },

    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}
</style>