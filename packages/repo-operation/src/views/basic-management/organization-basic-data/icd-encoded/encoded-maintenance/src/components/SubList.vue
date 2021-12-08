// 编码管理

<template>
  <div class="full-width bg-white"
       v-loading="loading">
    <div class="card card-search">
      <div class="q-mb-lg">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-12">编码管理-{{props.orgName}}</div>
      <div class="icdVersion-style">
        <span>ICD版本：</span>
        <span class="q-mr-8"
              v-if="icdInfo.icdVersionName">{{icdInfo.icdVersionName}}</span>
        <i class="zyy-icon zyy-xiugai1 "
           v-on:click="addIcdVersion"></i>
      </div>

      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="主要编码">
          <peace-input placeholder="请输入"
                       v-model.trim="model.icd10Code"></peace-input>
        </el-form-item>
        <el-form-item label="疾病名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.name"></peace-input>
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

    <peace-dialog v-bind:visible.sync="addModelDialog.visible"
                  title="请选择ICD版本"
                  v-if="addModelDialog.visible"
                  append-to-body
                  width="416px">
      <AddModel v-on:close="close"
                v-on:finish="finish"
                v-bind:info="addModelDialog.data" />
    </peace-dialog>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import EditModel from './EditModel'
import AddModel from './AddModel'
export default {
  name: 'SubList',
  components: { EditModel, AddModel },
  data() {
    return {
      loading: true,
      icdInfo: {
        icdVersionName: '',
        icdVersion: ''
      },
      model: {
        icd10Code: '',
        name: ''
      },

      editModelDialog: {
        visible: false,
        data: {},
        type: ''
      },
      addModelDialog: {
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

  mounted() {
    this.$nextTick(() => {
      this.fetch()
      this.getIcdVersion()
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
    getIcdVersion() {
      const params = { code: this.props.orgCode }
      Service.getIcdVersionByCode(params).then((res) => {
        this.icdInfo.icdVersionName = res.data.icdVersionName
        this.icdInfo.icdVersion = res.data.icdVersion
      })
    },
    openEditlDialog(data, type = 'add') {
      this.editModelDialog.visible = true
      this.editModelDialog.data = data
      this.editModelDialog.data.orgCode = this.props.orgCode
      this.editModelDialog.data.orgName = this.props.orgName
      this.editModelDialog.type = type
    },
    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
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
    },
    addIcdVersion() {
      this.addModelDialog.data.orgCode = this.props.orgCode
      this.addModelDialog.data.icdInfo = this.icdInfo
      this.addModelDialog.visible = true
    },
    finish() {
      this.addModelDialog.visible = false
      this.getIcdVersion()
    },
    close() {
      this.addModelDialog.visible = false
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

.icdVersion-style {
  padding-bottom: 16px;
  border-bottom: 1px dashed #eaeaea;
  margin-bottom: 24px;
}
.zyy-icon {
  cursor: pointer;
  color: rgba(51, 51, 51, 0.4) !important;
}
</style>