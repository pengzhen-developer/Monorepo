<template>
  <div class="layout-route">
    <div class="card">
      <div class="top-menu">
        <el-button @click="add"
                   type="primary">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn width="120px"
                          label="序号">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="云仓名称"
                          prop="Name">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="云仓系统"
                          prop="SysName">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="创建时间"
                          prop="CreateTime">
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          header-align="left"
                          align="left"
                          label="操作"
                          width="320">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)"
                       type="text">云仓详情</el-button>
            <el-button @click="gotoOrganView(scope.row)"
                       type="text">机构开户</el-button>
            <el-button @click="gotoOperateView(scope.row)"
                       type="text">运营信息</el-button>
            <el-button @click="gotoGoodsView(scope.row)"
                       type="text">商品管理</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog width="450px"
                 v-bind:visible.sync="cloudVisible"
                 :title="isEdit?'云仓详情':'新建云仓'">
      <CloudModel v-if="cloudVisible"
                  v-on:onCloseWare="onCloseWare"
                  v-bind:edit="isEdit"
                  v-bind:data="cloudInfo"
                  v-bind:config="systemDict"></CloudModel>
    </PeaceDialog>
  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import CloudModel from './CloudModel'

let CLOUD_MODEL = {
  Id: '', // 云仓唯一标识
  Name: '', // 名称
  SystemCode: '', // 系统编码
  Type: '', // 系统类型 0 ERP  2 九州云仓
  CodeIn3PartPlatform: '', // 物流中心ID  / branchid
  IDIn3PartPlatform: '', // 运营方ID
  PrentCustList: [] // 机构数据信息
}

export default {
  components: {
    CloudModel
  },
  data() {
    return {
      loading: true,

      // 是否显示云仓模型
      cloudVisible: false,
      // 是否修改
      isEdit: false,

      // 云仓详情
      cloudInfo: Object.assign({}, CLOUD_MODEL),

      // 云仓-系统 字典 （返回表单配置）
      systemDict: []
    }
  },

  computed: {
    view() {
      return Observable.state.view
    }
  },

  watch: {
    view(value) {
      if (value === Observable.constants.view.LIST) {
        this.fetch()
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      this.loading = true
      const fetch = Service.getCloudList

      this.$refs.table.reloadData({ fetch }).finally(() => {
        this.loading = false
      })
    },

    add() {
      Service.getInfo().then((res) => {
        this.systemDict = res.data.CloudStructure
        this.cloudInfo = Object.assign({}, CLOUD_MODEL)

        this.isEdit = false
        this.cloudVisible = true
      })
    },

    detail(row) {
      let params = {
        ID: row.Id
      }
      Service.getInfo(params).then((res) => {
        this.systemDict = res.data.CloudStructure
        this.cloudInfo = res.data.GetCustIn3PartRes || Object.assign({}, CLOUD_MODEL)

        this.isEdit = true
        this.cloudVisible = true
      })
    },

    onCloseWare() {
      this.cloudVisible = false
      this.fetch()
    },

    gotoOrganView(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.ORGAN)
    },

    gotoOperateView(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.OPERATE)
    },

    gotoGoodsView(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.GOODS)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}
</style>
