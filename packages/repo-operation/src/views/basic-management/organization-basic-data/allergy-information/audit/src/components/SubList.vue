// 审核管理

<template>
  <div class="full-width bg-white">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">审核管理-{{info.orgName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="过敏信息">
          <peace-input placeholder="请输入"
                       v-model.trim="model.name"></peace-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <peace-select v-model="model.auditStatus"
                        placeholder="全部">
            <el-option v-for="item in source.MapperAuditStatus"
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
        <el-button v-on:click="openExamineDialog"
                   type="primary">审核</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn label=""
                          width="60px">
          <template slot-scope="scope">
            <el-radio v-model="radioId"
                      v-bind:label="scope.row.code"
                      v-on:change="selectItem(scope.row)"><span></span></el-radio>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="系统编码"
                          prop="code"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="过敏信息"
                          prop="name"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="平台系统编码"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.platformAllergyCode || '--' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="平台过敏信息"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.platformAllergyName || '--' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="配码状态"
                          prop="mapperStatus"
                          min-width="100px">
          <template slot-scope="scope">
            {{scope.row.mapperStatus | filterDictionary(source.MapperStatus,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          prop="auditStatus"
                          min-width="100px">
          <template slot-scope="scope">
            {{scope.row.auditStatus | filterDictionary(source.MapperAuditStatus,'--')}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right"
                          min-width="160px">
          <template slot-scope="scope">
            <div v-if="scope.row.auditStatus!=='pass'&&scope.row.auditStatus!=='reject'">--</div>
            <div v-else>
              <el-button class="q-px-none"
                         type="text"
                         v-on:click="openEditlDialog(scope.row)"
                         v-if="scope.row.auditStatus==='pass'">修改</el-button>
              <el-button class="q-px-none"
                         type="text"
                         v-on:click="openRecordDialog(scope.row)"
                         v-if="scope.row.auditStatus==='pass'||scope.row.auditStatus==='reject'">审核记录</el-button>
            </div>

          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="editModelDialog.visible"
                  title="修改"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="1000px">
      <EditModel :info="editModelDialog.data"
                 v-on:cancel="cancel"
                 v-on:complete="complete" />
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="examineModelDialog.visible"
                  title="审核"
                  v-if="examineModelDialog.visible"
                  append-to-body
                  width="1000px">
      <ExamineModel :info="examineModelDialog.data"
                    v-on:examineComplete="examineComplete" />
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="recordDialog.visible"
                  title="审核记录"
                  v-if="recordDialog.visible"
                  append-to-body
                  width="376px">
      <RecordModel :info="recordDialog.data" />
    </peace-dialog>
  </div>
</template>

<script>
import Service from '../service'
import ExamineModel from './ExamineModel'
import EditModel from './EditModel'
import RecordModel from './RecordModel'
export default {
  name: 'SubList',
  components: { ExamineModel, EditModel, RecordModel },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: true,
      radioId: '',
      model: {
        name: '',
        auditStatus: ''
      },

      editModelDialog: {
        visible: false,
        data: {}
      },
      examineModelDialog: {
        visible: false,
        data: {}
      },
      recordDialog: {
        visible: false,
        data: {}
      },
      source: {
        MapperStatus: [],
        MapperAuditStatus: []
      }
    }
  },
  async mounted() {
    this.source.MapperStatus = await Peace.identity.dictionary.getList('mapper_status')
    this.source.MapperAuditStatus = await Peace.identity.dictionary.getList('mapper_audit_status')
    this.$nextTick().then(() => {
      this.model.auditStatus = 'check'
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      params.orgCode = this.info.orgCode
      const fetch = Service.getAllergyInfoList
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
      this.radioId = ''
      this.examineModelDialog.data = {}
    },
    openEditlDialog(row) {
      this.editModelDialog.data = row
      this.editModelDialog.visible = true
    },
    openExamineDialog() {
      if (!(Object.keys(this.examineModelDialog.data).length > 0)) {
        return Peace.util.warning('请选择需要审核的数据')
      }
      if (this.examineModelDialog.data.auditStatus !== 'check') {
        return Peace.util.warning('请选择待审核的数据进行操作')
      }
      this.examineModelDialog.visible = true
    },
    selectItem(row) {
      this.examineModelDialog.data = row
    },
    openRecordDialog(data) {
      this.recordDialog.visible = true
      this.recordDialog.data = data
    },
    back() {
      this.$emit('onBack')
    },
    cancel() {
      this.editModelDialog.visible = false
    },
    examineComplete() {
      this.fetch()
    },
    complete() {
      this.editModelDialog.visible = false
      this.fetch()
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