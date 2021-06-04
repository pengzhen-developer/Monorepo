// 配码管理

<template>
  <div class="full-width bg-white"
       v-loading="loading">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">配码管理-{{props.orgName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="疾病名称">
          <el-input placeholder="请输入"
                    v-model.trim="model.name"></el-input>
        </el-form-item>
        <el-form-item label="配码状态">
          <el-select v-model="model.mapperStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.MapperStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="model.auditStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.AuditStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="borderTop:16px solid #f5f5f5;"></div>

    <div class="card">

      <div class="q-mb-md">
        <el-button v-on:click="openEditlDialog()"
                   type="primary">配码</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label=""
                          width="60px">
          <template slot-scope="scope">
            <el-radio v-model="radioId"
                      v-on:change="selectItems(scope.row)"
                      v-bind:label="scope.row.name"><span></span></el-radio>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="系统编码"
                          prop="code"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="疾病名称"
                          prop="name"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="平台系统编码"
                          prop="platformDiseaseCode"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.platformDiseaseCode ||'--'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="平台疾病名称"
                          prop="patformDiseaseName"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.patformDiseaseName ||'--'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="配码状态"
                          prop="mapperStatus"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.mapperStatus | filterDictionary(source.MapperStatus,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          prop="auditStatus"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.auditStatus | filterDictionary(source.AuditStatus,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="配码更新时间"
                          prop="updateTime"
                          min-width="200px"></PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog v-bind:visible.sync="editModelDialog.visible"
                  title="配码"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="1000px">
      <EditModel v-bind:info="editModelDialog.data"
                 v-on:refresh="refresh"
                 v-on:clear="clear" />
    </peace-dialog>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import EditModel from './EditModel'
export default {
  name: 'SubList',
  components: { EditModel },
  data() {
    return {
      loading: true,
      radioId: '',
      model: {
        name: '',
        mapperStatus: '',
        auditStatus: ''
      },

      editModelDialog: {
        visible: false,
        data: {},
        type: ''
      },
      source: {
        AuditStatus: [],
        MapperStatus: []
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
    this.source.AuditStatus = await Peace.identity.dictionary.getList('mapper_audit_status')
    this.source.MapperStatus = await Peace.identity.dictionary.getList('mapper_status')
    this.model.mapperStatus = 'wait'
    this.$nextTick(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      params.orgCode = this.props.orgCode
      const fetch = Service.getListByOrganizationId
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    openEditlDialog() {
      if (Object.keys(this.editModelDialog.data).length > 0) {
        this.editModelDialog.visible = true
      } else {
        Peace.util.warning('请选择需要配码的数据')
      }
    },
    selectItems(data) {
      this.editModelDialog.data = data
      this.editModelDialog.data.orgCode = this.props.orgCode
    },
    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    },
    refresh() {
      this.fetch()
    },
    clear() {
      this.editModelDialog.data = {}
      this.radioId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}
</style>