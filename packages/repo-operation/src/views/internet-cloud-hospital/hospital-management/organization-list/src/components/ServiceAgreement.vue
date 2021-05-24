<template>
  <div class="full-width bg-white q-py-lg">
    <div class="q-px-lg  q-pb-lg q-mb-lg"
         style="border-bottom:1px solid #efefef">
      <el-button plain
                 v-on:click="back">
        <div>
          <i class="el-icon-arrow-left"></i>
          <span>返回上一页</span>
        </div>
      </el-button>
    </div>
    <div class="q-px-lg">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="operate('add',{})">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="协议名称"
                          min-width="200"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="版本"
                          min-width="120"
                          prop="version"></PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          min-width="180"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn label="最近一次修改时间"
                          min-width="180"
                          prop="updatedTime"></PeaceTableColumn>
        <PeaceTableColumn label="修改人"
                          prop="operator"></PeaceTableColumn>
        <PeaceTableColumn label="已签订人数"
                          prop="agreeNum"></PeaceTableColumn>
        <PeaceTableColumn label="状态"
                          min-width="140">
          <template slot-scope="scope"
                    class="row items-center">
            <span class="q-mr-4"> {{scope.row.status == 'yes' ? '启用' : '禁用'}} </span>
            <el-switch :active-value="'yes'"
                       :inactive-value="'no'"
                       v-model="scope.row.status"
                       @change="modify(scope.row)"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="160"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="signedList(scope.row)">已签约列表</el-button>
            <el-button type="text"
                       v-on:click="operate('edit',scope.row)">编辑</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

      <!-- 新增、编辑 -->
      <PeaceDialog :visible.sync="addModelDialog.visible"
                   :title="addModelDialog.type==='add'?'新增协议':'编辑协议'"
                   v-if="addModelDialog.visible"
                   width="720px">
        <AddAgreement v-bind:data="dataObj"
                      v-on:onClose="close"
                      v-on:onFresh="fetch"></AddAgreement>
      </PeaceDialog>
    </div>

  </div>
</template>

<script>
import Service from '../service'
import Observable from '../observable'
import AddAgreement from './AddAgreement'
export default {
  components: {
    AddAgreement
  },
  computed: {
    props() {
      return Observable.state.props
    }
  },
  data() {
    return {
      addModelDialog: {
        visible: false,
        type: 'add'
      },
      dataObj: {
        hosId: '',
        serviceId: ''
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
      const fetch = Service.getServiceList
      const params = { hosId: this.props.hosId }
      this.$refs.table.reloadData({ fetch, params })
    },
    operate(type, row) {
      this.addModelDialog.visible = true
      this.addModelDialog.type = type
      this.dataObj.hosId = this.props.hosId
      this.dataObj.serviceId = this.addModelDialog.type === 'add' ? '' : row.serviceId
    },
    close() {
      this.addModelDialog.visible = false
    },
    modify(row) {
      const params = {
        status: row.status,
        hosId: row.hosId,
        serviceId: row.serviceId
      }
      Service.operateStatus(params)
        .then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
        .catch((res) => {
          row.status = row.status == 'yes' ? 'no' : 'yes'
          if (res.data.code == 203) {
            this.$confirm('已存在正在使用的协议，请禁用后再操作', '提示', { confirmButtonText: '知道了', showCancelButton: false, closeOnClickModal: false })
          }
        })
    },
    signedList(row) {
      Observable.mutations.setProps({ serviceId: row.serviceId })
      Observable.mutations.changeView(Observable.constants.view.DETAIL)
    },
    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style>
</style>