<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="q-mb-24 org-name">
        频次管理 - {{props.orgName}}
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
        <el-form-item label="配码状态">
          <el-select v-model="model.mapperStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.ENUM_MATCH_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
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
                   v-on:click="match()">配码</el-button>
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
                          prop="code">
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

        <PeaceTableColumn min-width="200px"
                          label="配码更新时间"
                          prop="updateTime">
        </PeaceTableColumn>

      </PeaceTable>
    </div>

    <PeaceDialog width="1000px"
                 v-bind:visible.sync="modelDialog.visible"
                 title="配码">
      <Model v-if="modelDialog.visible"
             v-bind:data="modelDialog.data"
             v-on:close="modelDialog.visible = false"
             v-on:refresh="fetch"
             v-on:clear="clear"></Model>
    </PeaceDialog>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import Model from './Model'

export default {
  name: 'Management',

  components: {
    Model
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
        mapperStatus: '',
        auditStatus: ''
      },
      modelDialog: {
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
        this.model.mapperStatus = 'wait'
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

    match() {
      if (this.checkedData.id) {
        this.modelDialog.data = this.checkedData
        this.modelDialog.visible = true
      } else {
        Peace.util.warning('请选择需要配码的数据')
      }
    },

    clear() {
      this.checkedId = ''
      this.checkedData = {}
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