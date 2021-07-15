<template>
  <div>
    <div class="card card-search">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="ICD编码">
          <peace-input placeholder="请输入"
                       v-model.trim="model.icd10Code"></peace-input>
        </el-form-item>
        <el-form-item label="ICD名称">
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

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="ICD编码"
                          prop="icd10Code"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="附加编码"
                          min-width="160px">
          <template slot-scope="scope">
            {{scope.row.extCode||'--'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="ICD名称"
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
      </PeaceTable>
    </div>

  </div>
</template>
<script>
import Service from './service'
import Util from '@src/util'

export default {
  name: 'ICD',
  data() {
    return {
      model: {
        name: '',
        icd10Code: '',
        mapperStatus: '',
        auditStatus: ''
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
      const fetch = Service.getICDList
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>
<style lang="scss" scoped>
.status-item {
  display: flex;
  align-items: center;
}

.statusColor1 {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  margin-right: 8px;
  background: #faad14;
}
.statusColor2 {
  width: 6px;
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: #dddddd;
}
.statusColor3 {
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: var(--q-color-primary);
}

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.em-4 {
  width: 4em;
}

.top-menu {
  margin-bottom: 20px;
}
.date-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  .date-separator {
    width: 14px;
    margin: 0 9px;
    border-top: 1px solid #e7e7e1;
  }
}
</style>