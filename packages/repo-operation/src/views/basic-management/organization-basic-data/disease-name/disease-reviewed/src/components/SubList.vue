// 审核管理

<template>
  <div class="full-width bg-white"
       v-loading="loading">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">审核管理-{{props.orgName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="疾病名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.name"></peace-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <peace-select v-model="model.auditStatus"
                        placeholder="全部">
            <el-option v-for="item in source.AuditStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
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
        <el-button v-on:click="openEditlDialog({},'examine')"
                   type="primary">审核</el-button>
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
                          prop="platformDiseaseName"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.platformDiseaseName ||'--'}}
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
        <PeaceTableColumn label="操作"
                          prop=""
                          min-width="160px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-if="['pass'].includes(scope.row.auditStatus)"
                       v-on:click="openEditlDialog(scope.row,'edit')">修改</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-if="['pass','reject'].includes(scope.row.auditStatus)"
                       v-on:click="openRecordDialog(scope.row)">审核记录</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog v-bind:visible.sync="editModelDialog.visible"
                  v-bind:title="editModelDialog.type==='examine'?'审核':'修改'"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="1000px">
      <EditModel v-bind:info="editModelDialog.data"
                 v-bind:type="editModelDialog.type"
                 v-on:cancel="cancel"
                 v-on:refresh="refresh"
                 v-on:clear="clear" />
    </peace-dialog>
    <peace-dialog v-bind:visible.sync="recordDialog.visible"
                  title="审核记录"
                  v-if="recordDialog.visible"
                  append-to-body
                  width="376px">
      <RecordModel v-bind:info="recordDialog.data" />
    </peace-dialog>
  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import EditModel from './EditModel'
import RecordModel from './RecordModel'
export default {
  name: 'SubList',
  components: { EditModel, RecordModel },
  data() {
    return {
      loading: true,
      radioId: '',
      model: {
        name: '',
        mapperStatus: 'success',
        auditStatus: ''
      },

      editModelDialog: {
        visible: false,
        data: {},
        type: ''
      },
      recordDialog: {
        visible: false,
        data: {}
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
    this.model.auditStatus = 'check'
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
    openEditlDialog(info, type) {
      let data = type === 'examine' ? this.editModelDialog.data : info
      if (Object.keys(data).length === 0) {
        return Peace.util.warning('请选择需要审核的数据')
      }
      if (type === 'examine' && data.auditStatus !== 'check') {
        return Peace.util.warning('请选择待审核的数据进行操作')
      }
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.type = type
    },
    openRecordDialog(data) {
      //业务所属模块给药频次(10)，人群(20)，过敏(30)，给药途径(40)，ICD编码(50)，疾病名称(60)
      const params = {
        operaModule: '60',
        parentId: data.code
      }
      Service.getPageByCondition(params).then((res) => {
        this.recordDialog.visible = true
        this.recordDialog.data = res.data
      })
    },
    selectItems(data) {
      this.editModelDialog.data = data
      this.editModelDialog.data.orgCode = this.props.orgCode
    },
    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    },
    openImportDialog() {},
    cancel() {
      this.editModelDialog.visible = false
    },
    refresh() {
      this.fetch()
    },
    clear() {
      this.radioId = ''
      this.editModelDialog.data = {}
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