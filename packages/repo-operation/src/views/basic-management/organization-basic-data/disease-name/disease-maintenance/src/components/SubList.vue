// 疾病管理

<template>
  <div class="full-width bg-white"
       v-loading="loading">
    <div class="card card-search">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="title q-mb-lg">疾病管理-{{props.orgName}}</div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
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
        <PeaceTableColumn label="系统编码"
                          prop="code"
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
                  v-bind:title="editModelDialog.type==='add'?'新增疾病名称':'修改疾病名称'"
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
import Observable from '../observable'
import Service from '../service'

import EditModel from './EditModel'
export default {
  name: 'SubList',
  components: { EditModel },

  data() {
    return {
      loading: true,
      model: {
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