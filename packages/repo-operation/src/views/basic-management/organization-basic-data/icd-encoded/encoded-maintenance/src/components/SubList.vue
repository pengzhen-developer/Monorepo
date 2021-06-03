// 编码管理

<template>
  <div class="full-width bg-white"
       v-loading="loading">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">编码管理-{{hospitalName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="主要编码">
          <el-input placeholder="请输入"
                    v-model.trim="model.icd10Code"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称">
          <el-input placeholder="请输入"
                    v-model.trim="model.name"></el-input>
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
        <!-- <el-button v-on:click="openImportDialog"
                   type="primary">批量导入</el-button> -->
        <el-button v-on:click="openEditlDialog({},'add')"
                   type="primary">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="主要编码"
                          prop="icd10Code"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="附加编码"
                          prop="extCode"
                          min-width="160px"></PeaceTableColumn>

        <PeaceTableColumn label="疾病名称"
                          prop="name"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="添加时间"
                          prop="createTime"
                          min-width="200px"></PeaceTableColumn>
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
                  v-bind:title="editModelDialog.type==='add'?'新增ICD编码':'修改ICD编码'"
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
      loading: true,
      model: {
        icd10Code: '',
        name: ''
      },

      editModelDialog: {
        visible: false,
        data: {},
        type: ''
      }
    }
  },
  computed: {
    hospitalName() {
      return this.info.orgName
    },
    hospitalId() {
      return this.info.orgCode
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      params.orgCode = this.hospitalId
      const fetch = Service.getListByOrganizationId
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    openEditlDialog(data, type = 'add') {
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.data.orgCode = this.hospitalId
      this.editModelDialog.data.orgName = this.hospitalName
      this.editModelDialog.type = type
    },
    back() {
      this.$emit('onBack')
    },
    openImportDialog() {},
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
.title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}
</style>