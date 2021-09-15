<template>
  <div class="full-width">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               label-width="auto"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               inline>
        <region-selector :defaultArea="false"
                         :selected="false"
                         clearable
                         ref="regionSelector"></region-selector>
        <el-form-item label="医疗机构">
          <peace-input placeholder="输入医院名字"
                       v-model="model.netHospital_name"></peace-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          width="80"
                          prop="code"></PeaceTableColumn>
        <PeaceTableColumn label="医疗机构"
                          min-width="200"
                          prop="netHospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="社会信用代码"
                          width="200"
                          prop="org_id"></PeaceTableColumn>
        <PeaceTableColumn label="医院等级"
                          min-width="100"
                          prop="level"></PeaceTableColumn>
        <PeaceTableColumn label="医院地址"
                          min-width="200"
                          prop="address"></PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          min-width="100">
          <template slot-scope="scope">
            <el-switch @change="changeStatus(scope.row)"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#3099a6"
                       v-model="scope.row.status"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="160"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="serviceAgreement(scope.row)">服务协议</el-button>
            <el-button type="text"
                       v-on:click="servicePhone(scope.row)">客服电话</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 新增、编辑 -->
    <PeaceDialog :visible.sync="addModelDialog.visible"
                 title="客服电话"
                 v-if="addModelDialog.visible"
                 width="376px">
      <AddPhone v-bind:info="addModelDialog.data"
                v-on:onClose="close"
                v-on:onFresh="fetch"></AddPhone>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from '../service'
import Observable from '../observable'

import AddPhone from './AddPhone.vue'
export default {
  components: { AddPhone },
  data() {
    return {
      model: {
        netHospital_name: '',
        p: 1,
        size: 10
      },
      addModelDialog: {
        data: {},
        visible: false
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
      let region = {}
      if (this.$refs.regionSelector) {
        region = this.$refs.regionSelector.getSelected()
      }
      const { province, city } = region
      let params = Peace.util.deepClone(this.model)
      params.province_id = province
      params.city_id = city
      const fetch = Service.getOrgList

      this.$refs.table.reloadData({ fetch, params })
    },
    changeStatus(row) {
      const handle = () => {
        const params = new FormData()
        params.append('orgId', row.id)
        params.append('status', row.status)

        Service.upOrgStatus(params).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      }

      if (row.status === 0) {
        this.$confirm('停用后医院将不再对患者展示，是否确认停用？', '提示', { closeOnClickModal: false, closeOnPressEscape: false })
          .then(() => {
            handle()
          })
          .catch(() => {
            row.status = row.status === 1 ? 0 : 1
          })
      } else {
        this.$confirm('启用后医院将对患者展示，是否确认启用？', '提示', { closeOnClickModal: false, closeOnPressEscape: false })
          .then(() => {
            handle()
          })
          .catch(() => {
            row.status = row.status === 1 ? 0 : 1
          })
      }
    },
    serviceAgreement(row) {
      Observable.mutations.setProps({ hosId: row.id })
      Observable.mutations.changeView(Observable.constants.view.ADD)
    },
    servicePhone(row) {
      this.addModelDialog.data = {
        nethospitalId: row.id,
        serviceTel: row.service_tel
      }
      this.addModelDialog.visible = true
    },
    close() {
      this.addModelDialog.visible = false
    }
  }
}
</script>

<style>
</style>