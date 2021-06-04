// 编码管理

<template>
  <div class="full-width bg-white">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   @click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">配码管理-{{info.orgName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="过敏信息">
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
            <el-option v-for="item in source.MapperAuditStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="borderTop:16px solid #f5f5f5;"></div>

    <div class="card">

      <div class="q-mb-md">
        <el-button v-on:click="openEditlDialog"
                   type="primary">配码</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn label=""
                          width="60px">
          <template slot-scope="scope">
            <el-radio v-model="radioId"
                      v-bind:label="scope.row.id"
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
            {{ scope.row.platformClassCode || '--' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="平台过敏信息"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.platformClassName || '--' }}
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
        <PeaceTableColumn label="配码更新时间"
                          prop="updateTime"
                          min-width="200px"></PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="editModelDialog.visible"
                  title="配码"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="1000px">
      <EditModel v-bind:info="editModelDialog.data"
                 v-on:complete="complete" />
    </peace-dialog>

  </div>
</template>

<script>
import Service from '../service'

import EditModel from './EditModel'
export default {
  name: 'SubList',
  components: { EditModel },
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
      radioId: '',
      model: {
        name: '',
        mapperStatus: '',
        auditStatus: ''
      },

      editModelDialog: {
        visible: false,
        data: {}
      },
      source: {
        MapperStatus: [],
        MapperAuditStatus: []
      },
      loading: true
    }
  },
  async mounted() {
    this.source.MapperStatus = await Peace.identity.dictionary.getList('mapper_status')
    this.source.MapperAuditStatus = await Peace.identity.dictionary.getList('mapper_audit_status')
    this.$nextTick().then(() => {
      this.model.mapperStatus = 'wait'
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
      this.editModelDialog.data = {}
    },
    openEditlDialog() {
      if (Object.keys(this.editModelDialog.data).length > 0) {
        this.editModelDialog.visible = true
      } else {
        Peace.util.warning('请选择需要配码的数据')
      }
    },
    back() {
      this.$emit('onBack')
    },
    complete() {
      this.fetch()
    },
    selectItem(row) {
      this.editModelDialog.data = row
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