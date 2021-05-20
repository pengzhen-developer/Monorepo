// 编码管理

<template>
  <div class="full-width bg-white">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   @click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">配码管理-{{hospitalName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="主要编码">
          <el-input placeholder="请输入"
                    v-model.trim="model.mainCode"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称">
          <el-input placeholder="请输入"
                    v-model.trim="model.diseaseName"></el-input>
        </el-form-item>
        <el-form-item label="配码状态">
          <el-select v-model="model.codingStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.CodingStatus"
                       v-bind:key="item.CustCode"
                       v-bind:label="item.CustName"
                       v-bind:value="item.CustCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="model.auditStatus"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in source.AuditStatus"
                       v-bind:key="item.CustCode"
                       v-bind:label="item.CustName"
                       v-bind:value="item.CustCode"></el-option>
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
        <el-button v-on:click="openEditlDialog({})"
                   type="primary">配码</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label=""
                          width="35"
                          @row-click="rowClick">
          <template slot-scope="scope">
            <el-radio v-model="radioId"
                      :label="scope.row.name"></el-radio>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="主要编码"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="疾病名称"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="平台主要编码"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="平台疾病名称"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="配码状态"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="配码更新时间"
                          prop=""
                          min-width="180px"></PeaceTableColumn>
      </PeaceTable>

    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="editModelDialog.visible"
                  title="配码"
                  v-if="editModelDialog.visible"
                  append-to-body
                  width="1000px">
      <EditModel :info="editModelDialog.data"
                 v-on:cancel="cancel"
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
        mainCode: '',
        diseaseName: '',
        codingStatus: '',
        auditStatus: ''
      },

      editModelDialog: {
        visible: false,
        data: {},
        type: ''
      },
      source: {
        CodingStatus: [],
        AuditStatus: []
      }
    }
  },
  computed: {
    hospitalName() {
      return this.info.hospitalName || '北辰医院'
    },
    hospitalId() {
      return this.info.hospitalId
    }
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getSyncStatusList
      this.$refs.table.reloadData({ fetch, params })
    },
    openEditlDialog(data, type = 'add') {
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.type = type
    },
    back() {
      this.$emit('onBack')
    },
    cancel() {
      this.editModelDialog.visible = false
    },
    complete() {
      this.editModelDialog.visible = false
    },
    rowClick(row) {
      this.radioId = row.name
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