<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="q-mb-24 org-name">
        频次管理 - {{props.orgName}}
      </div>
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="给药频次编码">
          <PeaceInput v-model.trim="model.extCode"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="给药频次名称">
          <PeaceInput v-model.trim="model.name"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <!-- <el-button type="primary"
                   v-on:click="batch()">批量导入</el-button> -->
        <el-button type="primary"
                   v-on:click="add()">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn min-width="200px"
                          label="给药频次编码"
                          prop="extCode">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="给药频次名称"
                          prop="name">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="给药频次缩写名"
                          prop="abbreviation">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="100px">
          <template slot="header">
            <div class="table-heder-frequency">
              <div class="table-heder-frequency-text">系数</div>
              <img v-popover:popover
                   src="../assets/images/ic_warning.png" />
              <el-popover ref="popover"
                          placement="bottom-start"
                          width="270"
                          trigger="hover"
                          content="系数：指每日平均用药次数。用于开处方时药品数量的计算公式。">
              </el-popover>
            </div>
          </template>
          <template slot-scope="scope">
            {{scope.row.coefficient}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="200px"
                          label="添加时间"
                          prop="createTime">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="状态"
                          prop="status">
          <template slot-scope="scope">
            <span class="q-mr-md">{{scope.row.status | filterDictionary(CONSTANT.ENUM_STATUS)}}</span>
            <el-switch v-model="scope.row.status"
                       active-value="yes"
                       inactive-value="no"
                       @change="changeStatus(scope.row)"></el-switch>
          </template>
        </PeaceTableColumn>
        <el-table-column min-width="100px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="edit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <PeaceDialog width="450px"
                 v-bind:visible.sync="modelDialog.visible"
                 :title="modelDialog.title">
      <Model v-if="modelDialog.visible"
             v-bind:org="props"
             v-bind:data="modelDialog.data"
             v-on:close="modelDialog.visible = false"
             v-on:refresh="fetch"></Model>
    </PeaceDialog>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import Model from './Model'
import CONSTANT from '../constant'

export default {
  name: 'Management',

  components: {
    Model
  },

  data() {
    return {
      loading: true,
      CONSTANT,
      model: {
        orgCode: '',
        extCode: '',
        name: ''
      },
      modelDialog: {
        visible: false,
        title: '',
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
    this.$nextTick().then(() => {
      if (this.props.orgCode) {
        this.model.orgCode = this.props.orgCode
        this.fetch()
      }
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getManagementList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },

    changeStatus(row) {
      const message = row.status === 'yes' ? '确定启用？' : '确定停用？'

      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            id: row.id,
            status: row.status
          }
          Service.edit(params).then((res) => {
            Peace.util.success(res.data.message || '操作成功')
            this.fetch()
          })
        })
        .catch(() => {
          row.status = row.status === 'yes' ? 'no' : 'yes'
        })
    },

    batch() {},

    add() {
      this.modelDialog.title = '新增给药频次'
      this.modelDialog.data = {}
      this.modelDialog.visible = true
    },

    edit(row) {
      this.modelDialog.title = '修改给药频次'
      this.modelDialog.data = row
      this.modelDialog.visible = true
    },

    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}

.table-heder-frequency {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.table-heder-frequency-text {
  margin-right: 4px;
}
</style>