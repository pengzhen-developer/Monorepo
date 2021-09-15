<template>
  <div>
    <div class="card card-search">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="诊断编码">
          <peace-input placeholder="请输入"
                       v-model.trim="model.code"></peace-input>
        </el-form-item>
        <el-form-item label="诊断名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.name"></peace-input>
        </el-form-item>
        <el-form-item label="配码状态">
          <peace-select v-model="model.mapperStatus"
                        placeholder="全部">
            <el-option v-for="item in source.MapperStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
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
        <el-button v-on:click="openEditlDialog({},'add')"
                   type="primary">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="诊断编码"
                          prop="code"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn label="诊断名称"
                          prop="name"
                          min-width="160px"></PeaceTableColumn>
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
                          min-width="160px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="openEditlDialog(scope.row,'edit')">修改</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog v-bind:visible.sync="editModelDialog.visible"
                  v-bind:title="editModelDialog.type==='add'?'新增诊断':'修改诊断'"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="445px">
      <EditModel v-bind:info="editModelDialog.data"
                 v-bind:type="editModelDialog.type"
                 v-on:cancel="cancel"
                 v-on:complate="complate"
                 v-on:refresh="refresh" />
    </peace-dialog>

  </div>
</template>

<script>
import Util from '@src/util'
import Service from './service'
import EditModel from './components/EditModel'
export default {
  name: 'DiseaseMaintain',
  components: { EditModel },

  data() {
    return {
      model: {
        name: '',
        code: '',
        mapperStatus: '',
        auditStatus: ''
      },
      editModelDialog: {
        visible: false,
        data: {},
        type: ''
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
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      params.orgCode = Util.user.getUserInfo().custCode
      const fetch = Service.getDiseaseList
      this.$refs.table.reloadData({ fetch, params })
    },
    openEditlDialog(data, type = 'add') {
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.data.orgCode = Util.user.getUserInfo().custCode
      this.editModelDialog.data.orgName = Util.user.getUserInfo().hospitalName
      this.editModelDialog.type = type
    },
    cancel() {
      this.editModelDialog.visible = false
    },
    complate() {
      this.editModelDialog.visible = false
    },
    refresh() {
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>